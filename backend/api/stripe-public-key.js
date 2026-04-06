export default function handler(req, res) {
    // CORS headers espliciti
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const publicKey = process.env.STRIPE_PUBLIC_KEY;

        if (!publicKey) {
            return res.status(500).json({
                success: false,
                error: 'Stripe Public Key non configurata'
            });
        }

        res.status(200).json({
            success: true,
            publicKey: publicKey
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
