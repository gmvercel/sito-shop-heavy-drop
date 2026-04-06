import stripe from 'stripe';
import { handleCorsRequest, setCorsHeaders } from './cors.js';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // Gestisci CORS
    if (handleCorsRequest(req, res)) return;
    setCorsHeaders(res);

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { amount, currency, customer } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Importo non valido'
            });
        }

        if (!customer || !customer.email) {
            return res.status(400).json({
                success: false,
                error: 'Email cliente richiesta'
            });
        }

        console.log(`[PAYMENT] Creazione PaymentIntent - Importo: €${(amount / 100).toFixed(2)}, Email: ${customer.email}`);

        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Math.round(amount),
            currency: currency || 'eur',
            metadata: {
                customerEmail: customer.email,
                customerName: customer.name || 'Unknown',
                orderData: JSON.stringify(customer.cart || [])
            },
            receipt_email: customer.email,
            description: `Ordine Heavy Drop - ${customer.email}`
        });

        console.log(`✅ PaymentIntent creato: ${paymentIntent.id}`);

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: amount,
            currency: currency || 'eur'
        });

    } catch (error) {
        console.error('❌ Errore create-payment-intent:', error.message);
        res.status(500).json({
            success: false,
            error: error.message || 'Errore nella creazione del pagamento'
        });
    }
}
