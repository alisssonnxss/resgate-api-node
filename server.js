const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const OWNER_TAG = "4L1550NX-X792-B488"; 

const codesDB = {
    // Codiguin do Mês (Renovados)
    "ALISSON-C0D-R8K2-X11N": "Uma foice molada 🎫",
    "ALISSON-C0D-M5V9-Z44P": "Codiguin do Mês 🎫",
    "ALISSON-C0D-B3S7-W88D": "Codiguin do Mês 🎫",
    "ALISSON-C0D-L0N6-Q22C": "Codiguin do Mês 🎫",
    "ALISSON-C0D-J4H1-G55B": "Codiguin do Mês 🎫",
    "ALISSON-C0D-F9X2-Y00M": "Codiguin do Mês 🎫",
    "ALISSON-C0D-P1K8-V66R": "Codiguin do Mês 🎫",
    "ALISSON-C0D-V7R3-S99L": "Codiguin do Mês 🎫",
    "ALISSON-C0D-X2M5-H44T": "Codiguin do Mês 🎫",
    "ALISSON-C0D-G8W0-F11K": "Codiguin do Mês 🎫",
    "ALISSON-C0D-M3N4-P99J": "Codiguin do Mês 🎫",
    "ALISSON-C0D-K7V2-D55X": "Codiguin do Mês 🎫",
    "ALISSON-C0D-U9B1-L33S": "Codiguin do Mês 🎫",
    "TITANOFC-C0D-Z2R8-X77W": "Passe Do Titan 🎫",
    "TITANOFC-C0D-Q5M3-N44G": "Passe Do Titan 🎫",
    "TITANOFC-C0D-T1K6-V22P": "Passe Do Titan 🎫",
    "TITANOFC-C0D-S8N1-B11L": "Passe Do Titan 🎫",
    "TITANOFC-C0D-R4V7-Z88K": "Passe Do Titan 🎫",
    "TITANOFC-C0D-N0H5-M00D": "Passe Do Titan 🎫",
    "TITANOFC-C0D-D3W9-S22R": "Passe Do Titan 🎫",

    // Passe Booyah (Renovados)
    "ALISSON-P55-H2K1-W88V": "Passe Booyah 💎",
    "ALISSON-P55-R5N9-T33X": "Passe Booyah 💎",
    "ALISSON-P55-M1S2-L66D": "Passe Booyah 💎",
    "ALISSON-P55-Z7V4-P11B": "Passe Booyah 💎",
    "ALISSON-P55-G0Q3-N77M": "Passe Booyah 💎",
    "ALISSON-P55-L4J8-F44K": "Passe Booyah 💎",
    "ALISSON-P55-Y1B6-G99S": "Passe Booyah 💎",
    "ALISSON-P55-W8R2-X00Z": "Passe Booyah 💎",
    "ALISSON-P55-D3N5-C22H": "Passe Booyah 💎",
    "ALISSON-P55-K9M9-T88L": "Passe Booyah 💎",
    "ALISSON-P55-V1S1-H55G": "Passe Booyah 💎",
    "ALISSON-P55-B2L6-R33P": "Passe Booyah 💎",
    "ALISSON-P55-T7X3-P44M": "Passe Booyah 💎",
    "ALISSON-P55-U4W2-Y11N": "Passe Booyah 💎",
    "ALISSON-P55-N0V7-M55K": "Passe Booyah 💎",
    "ALISSON-P55-J3K4-B77D": "Passe Booyah 💎",
    "ALISSON-P55-S1R8-D99X": "Passe Booyah 💎",
    "ALISSON-P55-E6M0-K33V": "Passe Booyah 💎",
    "ALISSON-P55-F2G1-Z22B": "Passe Booyah 💎",
    "ALISSON-P55-Q9N9-W00L": "Passe Booyah 💎",
    
    // Extras (Renovados)
    "ITALOFF-P55-K4X1-Z99S": "PACK DE OTIMIZAÇÃO 💎"
};
let usedCodesHistory = [];

app.post('/api/validate', (req, res) => {
    const { code } = req.body;
    const cleanCode = code ? code.trim().toUpperCase() : "";
    if (!codesDB[cleanCode]) return res.status(400).json({ success: false, message: 'INVÁLIDO' });
    
    const jaUsado = usedCodesHistory.find(item => item.code === cleanCode);
    if (jaUsado) return res.status(400).json({ success: false, message: `USADO POR ${jaUsado.user}` });

    res.json({ success: true, reward: codesDB[cleanCode] });
});

app.post('/api/register', (req, res) => {
    const { code, name, id } = req.body;
    const cleanCode = code ? code.trim().toUpperCase() : "";
    const dataCompleta = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const dataCurta = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const index = usedCodesHistory.findIndex(item => item.code === cleanCode);
    const logEntry = { code: cleanCode, user: name, id, reward: codesDB[cleanCode], data: name === "RESGATANDO..." ? "" : dataCurta, hora: dataCompleta };

    if (index !== -1) usedCodesHistory[index] = logEntry;
    else usedCodesHistory.push(logEntry);

    res.json({ success: true });
});

app.get('/api/public/history', (req, res) => res.json(usedCodesHistory));

app.get('/api/reset/:tag', (req, res) => {
    if (req.params.tag === OWNER_TAG) {
        usedCodesHistory = [];
        return res.send("RESETADO");
    }
    res.status(403).send("NEGADO");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));



