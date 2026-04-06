import fs from 'fs';
import path from 'path';

function readOrders() {
    try {
        const ordersPath = path.join(process.cwd(), 'orders.json');
        if (!fs.existsSync(ordersPath)) {
            return [];
        }
        const data = fs.readFileSync(ordersPath, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error('Errore lettura ordini:', error);
        return [];
    }
}

export default function handler(req, res) {
    // CORS headers espliciti
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                error: 'Order ID richiesto'
            });
        }

        const orders = readOrders();
        const order = orders.find(o => o.id === orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Ordine non trovato'
            });
        }

        res.status(200).json({
            success: true,
            order: {
                id: order.id,
                timestamp: order.timestamp,
                status: order.status,
                totalAmount: order.totalAmount,
                currency: order.currency,
                customer: {
                    name: order.customer?.name || 'Unknown',
                    email: order.customer?.email || 'unknown@example.com',
                    address: order.customer?.address || 'N/A',
                    city: order.customer?.city || 'N/A',
                    postalCode: order.customer?.postalCode || 'N/A',
                    country: order.customer?.country || 'N/A'
                },
                itemsCount: order.cart?.length || 0
            }
        });

    } catch (error) {
        console.error('Errore:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
