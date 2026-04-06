import { handleCorsRequest, setCorsHeaders } from './cors.js';

export default function handler(req, res) {
    // Gestisci CORS
    if (handleCorsRequest(req, res)) return;
    setCorsHeaders(res);

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const publicKey = process.env.STRIPE_PUBLIC_KEY;

        if (!publicKey) {
            console.error('STRIPE_PUBLIC_KEY non è configurata');
            return res.status(500).json({
                success: false,
                error: 'Stripe Public Key non configurata'
            });
        }

        console.log('✅ Public key caricata');
        res.status(200).json({
            success: true,
            publicKey: publicKey
        });
    } catch (error) {
        console.error('Errore:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
