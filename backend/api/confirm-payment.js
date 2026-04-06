import stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import { handleCorsRequest, setCorsHeaders } from './cors.js';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const ORDERS_FILE = path.join(process.cwd(), 'orders.json');

function readOrders() {
    try {
        if (!fs.existsSync(ORDERS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(ORDERS_FILE, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error('Errore lettura ordini:', error);
        return [];
    }
}

function saveOrder(orderData) {
    try {
        const orders = readOrders();
        const newOrder = {
            id: `ORDER-${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...orderData
        };
        orders.push(newOrder);
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
        return newOrder;
    } catch (error) {
        console.error('Errore salvataggio ordine:', error);
        throw error;
    }
}

export default async function handler(req, res) {
    // Gestisci CORS
    if (handleCorsRequest(req, res)) return;
    setCorsHeaders(res);

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { paymentIntentId, customerData, cartData } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({
                success: false,
                error: 'Payment Intent ID richiesto'
            });
        }

        console.log(`[PAYMENT] Confermando pagamento: ${paymentIntentId}`);

        const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            console.log(`⚠️  Pagamento non riuscito. Status: ${paymentIntent.status}`);
            return res.status(400).json({
                success: false,
                error: `Pagamento non confermato. Status: ${paymentIntent.status}`,
                status: paymentIntent.status
            });
        }

        console.log(`✅ Pagamento confermato: ${paymentIntentId}`);

        const order = saveOrder({
            paymentIntentId: paymentIntentId,
            status: 'completed',
            customer: customerData,
            cart: cartData,
            totalAmount: paymentIntent.amount / 100,
            currency: paymentIntent.currency.toUpperCase()
        });

        console.log(`💾 Ordine salvato: ${order.id}`);

        res.status(200).json({
            success: true,
            orderId: order.id,
            message: 'Pagamento confermato e ordine creato',
            order: {
                id: order.id,
                timestamp: order.timestamp,
                totalAmount: order.totalAmount,
                currency: order.currency,
                customerEmail: customerData.email
            }
        });

    } catch (error) {
        console.error('❌ Errore confirm-payment:', error.message);
        res.status(500).json({
            success: false,
            error: error.message || 'Errore nella conferma del pagamento'
        });
    }
}
