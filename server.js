const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// --- CONFIGURAÇÃO DE ACESSO (CORS) ATUALIZADA ---
// Isso garante que o teu INDEX.html consiga falar com o Render sem bloqueios.
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// --- NOME ESTILIZADO DO DONO ---
const OWNER_TAG = "4L1550NX-X792-B488";

// --- DATABASE DE 40 CÓDIGOS ULTRA-DIFÍCEIS ---
const codesDB = {
    // 🎫 20 Códigos de CODIGUIN DO MÊS
    "ALISSON-C0D-X9F2-K88P": "Codiguin do Mês 🎫",
    "ALISSON-C0D-Z1B9-Q44W": "Codiguin do Mês 🎫",
    "ALISSON-C0D-L7V3-M00X": "Codiguin do Mês 🎫",
    "ALISSON-C0D-R5T1-B99S": "Codiguin do Mês 🎫",
    "ALISSON-C0D-H2N6-G33D": "Codiguin do Mês 🎫",
    "ALISSON-C0D-J8K4-P11A": "Codiguin do Mês 🎫",
    "ALISSON-C0D-U0M7-F66Y": "Codiguin do Mês 🎫",
    "ALISSON-C0D-D4S2-W88Z": "Codiguin do Mês 🎫",
    "ALISSON-C0D-G9T5-H22K": "Codiguin do Mês 🎫",
    "ALISSON-C0D-B3V1-R44N": "Codiguin do Mês 🎫",
    "ALISSON-C0D-P7Q9-L11X": "Codiguin do Mês 🎫",
    "ALISSON-C0D-X6M4-K55W": "Codiguin do Mês 🎫",
    "ALISSON-C0D-V0B2-J99Z": "Codiguin do Mês 🎫",
    "ALISSON-C0D-F4R8-N33S": "Codiguin do Mês 🎫",
    "ALISSON-C0D-H1W5-T77G": "Codiguin do Mês 🎫",
    "ALISSON-C0D-M9K2-Y44D": "Codiguin do Mês 🎫",
    "ALISSON-C0D-L0V3-X88P": "Codiguin do Mês 🎫",
    "ALISSON-C0D-S2R4-B11Q": "Codiguin do Mês 🎫",
    "ALISSON-C0D-Z7N9-W55F": "Codiguin do Mês 🎫",
    "ALISSON-C0D-K3J1-T66M": "Codiguin do Mês 🎫",

    // 💎 20 Códigos de PASSE BOOYAH
    "ALISSON-P55-E9R2-T00X": "Passe Booyah 💎",
    "ALISSON-P55-Q7W1-L33B": "Passe Booyah 💎",
    "ALISSON-P55-V4N8-K99Z": "Passe Booyah 💎",
    "ALISSON-P55-B1M5-F22D": "Passe Booyah 💎",
    "ALISSON-P55-G0S6-R77W": "Passe Booyah 💎",
    "ALISSON-P55-X8J3-H44P": "Passe Booyah 💎",
    "ALISSON-P55-T2V9-N11S": "Passe Booyah 💎",
    "ALISSON-P55-K5L7-D88Q": "Passe Booyah 💎",
    "ALISSON-P55-Y3B1-M66G": "Passe Booyah 💎",
    "ALISSON-P55-P9F4-X22A": "Passe Booyah 💎",
    "ALISSON-P55-W0R2-K77V": "Passe Booyah 💎",
    "ALISSON-P55-L6N8-B33H": "Passe Booyah 💎",
    "ALISSON-P55-M1S4-T55J": "Passe Booyah 💎",
    "ALISSON-P55-D9V2-Z88K": "Passe Booyah 💎",
    "ALISSON-P55-G4T7-F00N": "Passe Booyah 💎",
    "ALISSON-P55-R2W5-Y33C": "Passe Booyah 💎",
    "ALISSON-P55-K8L1-P44M": "Passe Booyah 💎",
    "ALISSON-P55-U0B3-S99X": "Passe Booyah 💎",
    "ALISSON-P55-Z7Q9-J11W": "Passe Booyah 💎",
    "ALISSON-P55-X4M6-D22S": "Passe Booyah 💎"
};

let usedCodesHistory = {};

app.post('/api/validate', (req, res) => {
    const { code } = req.body;
    const cleanCode = code ? code.trim().toUpperCase() : "";
    
    if (!codesDB[cleanCode]) return res.status(400).json({ success: false, message: 'CÓDIGO FALSO OU INVÁLIDO!' });
    if (usedCodesHistory[cleanCode]) return res.status(400).json({ success: false, message: `ERRO: Já resgatado em ${usedCodesHistory[cleanCode].data}` });

    res.json({ success: true, reward: codesDB[cleanCode] });
});

app.post('/api/register', (req, res) => {
    const { code, name, id } = req.body;
    const cleanCode = code ? code.trim().toUpperCase() : "";
    
    usedCodesHistory[cleanCode] = {
        user: name,
        playerId: id,
        data: new Date().toLocaleString('pt-BR')
    };
    res.json({ success: true });
});

app.get('/api/admin/history', (req, res) => res.json(usedCodesHistory));

// Porta configurada para o Render (process.env.PORT) ou 3000 localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API Rodando - Canal: ${OWNER_TAG}`));