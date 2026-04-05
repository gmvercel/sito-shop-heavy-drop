# 🚀 Guida Setup: Sistema di Pagamento Heavy Drop

Benvenuto! Questa guida ti aiuterà a configurare completamente il sistema di pagamento Stripe per il tuo negozio online Heavy Drop.

---

## 📋 Checklist di Setup

- [ ] **Registrazione Stripe** - Creare account Stripe
- [ ] **Configurazione Backend** - Installare dipendenze Node.js
- [ ] **API Keys** - Aggiungere le credenziali nel file .env
- [ ] **Test Mode** - Testare con le carte di prova
- [ ] **Go Live** - Passare alle credenziali di produzione

---

## 🎯 Step 1: Iscrizione a Stripe

1. Vai su **https://dashboard.stripe.com/register** (oppure accedi se hai già un account)
2. Registrati con email e password
3. Completa il profilo aziendale (nome, città, paese)
4. Verifica l'email

### Ottenere le API Keys:

1. Nel dashboard di Stripe, vai a **"Developers"** → **"API keys"** (in alto a destra)
2. Assicurati di essere in **Test Mode** (switch in alto a sinistra)
3. Copia le due chiavi:
   - **Publishable Key** (inizia con `pk_test_...`)
   - **Secret Key** (inizia con `sk_test_...`)

⚠️ **IMPORTANTE**: Mantieni il Secret Key privato - mai condividerlo pubblicamente!

---

## ⚙️ Step 2: Configurazione Backend (Node.js)

### 2a) Verificare Node.js installato

Apri PowerShell e verifica:

```powershell
node --version
npm --version
```

Se non le vedi, scarica Node.js da https://nodejs.org/ (versione LTS)

### 2b) Installare Dipendenze

Vai nella cartella `backend`:

```powershell
cd "c:\Users\gabri\OneDrive\Desktop\sito shop Heavy Drop\backend"
npm install
```

L'output dovrebbe mostrare qualcosa tipo:
```
added 50 packages in 5s
```

### 2c) Creare il file .env

Rinomina il file `backend\.env.example` in `backend\.env`:

```powershell
Rename-Item .env.example .env
```

Apri `backend\.env` con un editor di testo e **sostituisci** con i tuoi dati:

```
# Stripe API Keys - Ottenere da https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE

# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:3000
```

**Esempio (fittizio):**
```
STRIPE_PUBLIC_KEY=pk_test_51KpxxxxxxxxxxxxxxxxxxxxxZy
STRIPE_SECRET_KEY=sk_test_51KpxxxxxxxxxxxZy
PORT=3000
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 Step 3: Avviare il Backend

Dalla cartella `backend`, avvia il server:

```powershell
npm start
```

Dovresti vedere output simile a:
```
╔════════════════════════════════════════════╗
║   🚀 Heavy Drop Payment Server Running    ║
║   📍 http://localhost:3000               ║
║   ✅ Ready for payment processing         ║
╚════════════════════════════════════════════╝

📌 Make sure STRIPE_SECRET_KEY is set in .env file
```

✅ **Il server è online!** Non chiudere questo terminale.

---

## 🧪 Step 4: Test con Stripe

### Carte di Prova (Test Mode)

Usa queste carte fittizie per testare il pagamento:

| Tipo | Numero Carta | Scadenza | CVC |
|------|--------------|----------|-----|
| **Visa Valida** | 4242 4242 4242 4242 | 12/25 | 123 |
| **Visa Rifiutata** | 4000 0000 0000 0002 | 12/25 | 123 |
| **Mastercard** | 5555 5555 5555 4444 | 12/25 | 123 |
| **American Express** | 3782 822463 10005 | 12/25 | 1234 |

### Test Flow Completo:

1. **Apri il sito**: http://localhost:3000
   - Se non hai un server frontend, apri semplicemente `index.html` dal browser

2. **Aggiungi prodotti al carrello**
   - Clicca su "Aggiungi" su alcuni prodotti

3. **Vai al carrello**
   - Clicca su "🛒 Carrello"

4. **Procedi al pagamento**
   - Clicca su "PROCEDI AL PAGAMENTO"

5. **Compila il form**
   - Nome: `Test User`
   - Email: `test@example.com`
   - Indirizzo: `Via Milano 123`
   - Città: `Milano`
   - CAP: `20100`
   - Paese: `Italia`

6. **Inserisci la carta di prova**
   - Numero: `4242 4242 4242 4242`
   - Scadenza: `12/25`
   - CVC: `123`
   - Nome: `Test User`

7. **Paga**
   - Clicca "🔒 Paga Adesso"
   - Dovresti vedere: "✅ Ordine Confermato!"

### Visualizzare gli Ordini (Dati Salvati)

Gli ordini sono salvati in `backend/orders.json`. Puoi:

1. Aprire `backend/orders.json` con un editor di testo
2. Vedere tutti gli ordini elaborati (nome, email, totale, etc.)

---

## 🔐 Sicurezza: Passare a Produzione

Una volta testato, quando vuoi andare dal vivo:

### 1. Ottenere le Chiavi Live su Stripe

1. Nel dashboard Stripe, spegni il **Test Mode** (switch in alto a sinistra)
2. Vai a **"Developers"** → **"API keys"**
3. Copia le nuove chiavi (iniziano con `pk_live_` e `sk_live_`)

### 2. Aggiornare .env

```
STRIPE_PUBLIC_KEY=pk_live_YOUR_LIVE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY_HERE
```

### 3. Riavviare il server

```powershell
# Ferma il server (Ctrl+C nel terminale)
# Riavvia
npm start
```

⚠️ **ATTENZIONE**: Con le chiavi LIVE, i pagamenti sono VERI. Assicurati di testare prima con Test Mode!

---

## 📞 Risoluzione Problemi

### "Errore: Cannot find module 'stripe'"

**Soluzione**: Assicurati di aver fatto `npm install` nella cartella backend:
```powershell
cd backend
npm install
```

### "Errore: Stripe Public Key non configurata"

**Soluzione**: 
- Verifica che `backend/.env` esista (non `backend/.env.example`)
- Assicurati che le chiavi siano copiate correttamente (senza spazi)
- Riavvia il server: `npm start`

### "Errore: Impossibile raggiungere http://localhost:3000"

**Soluzione**:
- Verifica che il server sia parto (`npm start` in `backend`)
- Cambia il PORT in `.env` se 3000 è già in uso
- Riavvia il server con il nuovo PORT

### "La pagella di pagamento non carica"

**Soluzione**:
- Verifica che Stripe.js sia caricato (apri DevTools F12)
- Controlla che il public key sia corretto
- Guarda la console browser per errori

### Pagamento completato ma non vedo l'ordine in order-confirmation.html

**Soluzione**:
- Controlla che il backend sia online
- Apri DevTools (F12) → Network, guarda se `/api/order/{orderId}` restituisce dati
- Verifica che `orders.json` sia stato creato in `backend/`

---

## 📁 Struttura File

```
sito shop Heavy Drop/
├── index.html                 (Homepage)
├── product.html              (Pagina prodotti)
├── cart.html                 (Carrello) ✅ AGGIORNATO
├── checkout.html             (Checkout) ✨ NUOVO
├── order-confirmation.html   (Conferma ordine) ✨ NUOVO
├── script.js                 (JS) ✅ AGGIORNATO
├── style.css                 (CSS)
├── assets/                   (Immagini)
└── backend/                  (NUOVO - Server Stripe)
    ├── server.js             (Express server)
    ├── package.json          (Dipendenze)
    ├── .env                  (Chiavi Stripe - NON CONDIVIDERE!)
    ├── .env.example          (Template .env)
    ├── orders.json           (Ordini salvati)
    └── routes/
        └── payments.js       (Endpoints API)
```

---

## 📊 Flusso Pagamento Completo

```
1. UTENTE AGGIUNGE PRODOTTI AL CARRELLO
   ↓
2. UTENTE CLICCA "PROCEDI AL PAGAMENTO" → checkout.html
   ↓
3. UTENTE COMPILA FORM (nome, email, indirizzo)
   ↓
4. UTENTE INSERISCE DATI CARTA (via Stripe Elements)
   ↓
5. UTENTE CLICCA "PAGA ADESSO"
   ↓
6. FRONTEND CHIAMA: POST /api/create-payment-intent (backend)
   ↓
7. BACKEND CREA PaymentIntent con Stripe
   ↓
8. FRONTEND USA stripe.confirmCardPayment() CON CLIENT SECRET
   ↓
9. STRIPE ELABORA IL PAGAMENTO
   ↓
   ├─ ✅ PAGAMENTO RIUSCITO
   │  ↓
   │  10. FRONTEND CHIAMA: POST /api/confirm-payment
   │  ↓
   │  11. BACKEND VERIFICA PAGAMENTO E SALVA ORDINE
   │  ↓
   │  12. UTENTE VEDE: order-confirmation.html con dettagli ordine
   │
   └─ ❌ PAGAMENTO FALLITO
      ↓
      UTENTE VEDE MESSAGGIO DI ERRORE E RIPROVARE

```

---

## ✅ Checklist Pre-Go-Live

Prima di mettere il sito online:

- [ ] Backend funziona in locale
- [ ] Pagamenti test funzionano con carta 4242 4242 4242 4242
- [ ] Gli ordini vengono salvati in `orders.json`
- [ ] Pagina di conferma ordine carica i dati
- [ ] Le chiavi Stripe sono in `.env` (non nel codice)
- [ ] Email di notifica funziona (opzionale - attualmente non implementato)
- [ ] Hai testato con diversi browser (Chrome, Firefox, Safari)
- [ ] Backend è hostato su un server esterno (Heroku, Vercel, DigitalOcean, etc.)

---

## 🎓 Prossimi Passi

**MVP completato!** Funzionalità future da considerare:

1. **Email di Conferma**: Inviare email automatica al cliente con numero ordine
2. **Admin Panel**: Dashboard per visualizzare ordini e gestirli
3. **Shipping Integration**: Collegare con servizi di spedizione (DHL, UPS)
4. **Database Vero**: Migrare da `orders.json` a MongoDB/PostgreSQL
5. **PayPal**: Aggiungere PayPal come metodo di pagamento alternativo
6. **Bonifico Bancario**: Opzione di pagamento non online per clienti che preferiscono

---

## 📞 Supporto Stripe

- **Centro Aiuto**: https://support.stripe.com
- **Documentazione**: https://stripe.com/docs
- **Dashboard Test**: https://dashboard.stripe.com/test/payments

---

**Fatto! Il sistema di pagamento è pronto. Buona fortuna!** 🎉

Se hai problemi, controlla:
1. Console browser (F12 → Console tab)
2. Terminal dove è stato avviato il backend
3. Che le API keys siano copiate correctly in `.env`
