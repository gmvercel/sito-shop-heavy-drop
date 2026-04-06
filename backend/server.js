require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
// Configura CORS per permettere frontend locali e Netlify
const allowedOrigins = [
    'http://localhost',
    'http://127.0.0.1',
    'https://heavydropsshop.netlify.app'
];

app.use(cors({
    origin: function(origin, callback) {
        // Se non c'è origin (richieste server-to-server), permetti
        if (!origin) {
            return callback(null, true);
        }
        
        // Controlla se è localhost su qualunque porta
        if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
            return callback(null, true);
        }
        
        // Controlla l'elenco di origini permesse
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        callback(new Error('CORS not allowed'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
