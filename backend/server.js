require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
// Configura CORS per permettere localhost e Netlify frontend
const allowedOrigins = [
    'http://localhost',
    'http://127.0.0.1',
    'https://heavydropsshop.netlify.app',
    'http://localhost:3000',
    'http://localhost:5500',
    'http://localhost:8000'
];

app.use(cors({
    origin: function(origin, callback) {
        // Permetti localhost su qualunque porta e il dominio Netlify
        if (!origin || allowedOrigins.some(allowed => origin && origin.includes(allowed))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
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

module.exports = app;
