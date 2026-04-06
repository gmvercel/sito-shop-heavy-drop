import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import paymentRoutes from './routes/payments.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
// Aggiungi CORS headers PRIMA di tutto
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Configura CORS per permettere frontend locali e Netlify
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== ROUTES =====
app.use('/api', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error('[ERROR]', err.message);
    res.status(500).json({
        success: false,
        error: err.message || 'Errore interno del server',
        timestamp: new Date().toISOString()
    });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🚀 Heavy Drop Payment Server Running    ║
║   📍 http://localhost:${PORT}               ║
║   ✅ Ready for payment processing         ║
╚════════════════════════════════════════════╝
    `);
    console.log(`📌 Make sure STRIPE_SECRET_KEY is set in .env file`);
});

export default app;
