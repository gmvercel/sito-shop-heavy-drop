/**
 * Helper per gestire il CORS su Vercel
 */
export function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
}

export function handleCorsRequest(req, res) {
    setCorsHeaders(res);
    
    // Gestisci le preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    return false;
}
