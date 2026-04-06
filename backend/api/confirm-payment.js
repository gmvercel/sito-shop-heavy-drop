import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // CORS headers espliciti
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { paymentIntentId } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({
                success: false,
                error: 'Payment Intent ID richiesto'
            });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({
                success: false,
                error: `Pagamento non confermato. Status: ${paymentIntent.status}`,
                status: paymentIntent.status
            });
        }

        res.status(200).json({
            success: true,
            orderId: `ORDER-${Date.now()}`,
            message: 'Pagamento confermato',
            totalAmount: paymentIntent.amount / 100
        });

    } catch (error) {
        console.error('Errore:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
