const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');
const path = require('path');

const router = express.Router();

// File per salvare gli ordini (MVP - non è un database vero)
const ORDERS_FILE = path.join(__dirname, '../orders.json');

// ===== HELPER FUNCTIONS =====

/**
 * Legge gli ordini salvati da file JSON
 */
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

/**
 * Salva un nuovo ordine nel file JSON
 */
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

// ===== STRIPE ENDPOINTS =====

/**
 * POST /api/create-payment-intent
 * Crea un PaymentIntent Stripe per iniziare il pagamento
 */
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, customer } = req.body;

        // Validazione input
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

        // Crea il PaymentIntent con Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe usa centesimi
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

        res.json({
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
});

/**
 * POST /api/confirm-payment
 * Verifica che il pagamento sia stato confermato e salva l'ordine
 */
router.post('/confirm-payment', async (req, res) => {
    try {
        const { paymentIntentId, customerData, cartData } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({
                success: false,
                error: 'Payment Intent ID richiesto'
            });
        }

        console.log(`[PAYMENT] Confermando pagamento: ${paymentIntentId}`);

        // Recupera il PaymentIntent da Stripe per verificare lo status
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        // Verifica che il pagamento sia riuscito
        if (paymentIntent.status !== 'succeeded') {
            console.log(`⚠️  Pagamento non riuscito. Status: ${paymentIntent.status}`);
            return res.status(400).json({
                success: false,
                error: `Pagamento non confermato. Status: ${paymentIntent.status}`,
                status: paymentIntent.status
            });
        }

        console.log(`✅ Pagamento confermato: ${paymentIntentId}`);

        // Salva l'ordine
        const order = saveOrder({
            paymentIntentId: paymentIntentId,
            status: 'completed',
            customer: customerData,
            cart: cartData,
            totalAmount: paymentIntent.amount / 100, // Converti da centesimi a euro
            currency: paymentIntent.currency.toUpperCase()
        });

        console.log(`💾 Ordine salvato: ${order.id}`);

        res.json({
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
});

/**
 * GET /api/order/:orderId
 * Recupera i dettagli di un ordine (per la pagina di conferma)
 */
router.get('/order/:orderId', (req, res) => {
    try {
        const { orderId } = req.params;
        const orders = readOrders();
        const order = orders.find(o => o.id === orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Ordine non trovato'
            });
        }

        res.json({
            success: true,
            order: {
                id: order.id,
                timestamp: order.timestamp,
                status: order.status,
                totalAmount: order.totalAmount,
                currency: order.currency,
                customer: {
                    name: order.customer.name,
                    email: order.customer.email,
                    address: order.customer.address,
                    city: order.customer.city,
                    postalCode: order.customer.postalCode,
                    country: order.customer.country
                },
                itemsCount: order.cart?.length || 0
            }
        });

    } catch (error) {
        console.error('❌ Errore get-order:', error.message);
        res.status(500).json({
            success: false,
            error: error.message || 'Errore nel recupero dell\'ordine'
        });
    }
});

/**
 * GET /api/stripe-public-key
 * Ritorna la public key Stripe per il frontend
 */
router.get('/stripe-public-key', (req, res) => {
    const publicKey = process.env.STRIPE_PUBLIC_KEY;
    if (!publicKey) {
        return res.status(500).json({
            success: false,
            error: 'Stripe Public Key non configurata'
        });
    }
    res.json({
        success: true,
        publicKey: publicKey
    });
});

module.exports = router;
