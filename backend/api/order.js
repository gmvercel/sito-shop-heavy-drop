import fs from 'fs';
import path from 'path';
import { handleCorsRequest, setCorsHeaders } from './cors.js';

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

export default function handler(req, res) {
    // Gestisci CORS
    if (handleCorsRequest(req, res)) return;
    setCorsHeaders(res);

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
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
                    name: order.customer.name,
                    email: order.customer.email
                }
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
