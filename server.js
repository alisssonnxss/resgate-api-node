const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const OWNER_TAG = "4L1550NX-X792-B488"; 

const codesDB = {
    // Codiguin do Mês (20 novos códigos)
    "ALISSON-C0D-H7X1-K22P": "Codiguin do Mês 🎫",
    "ALISSON-C0D-W4R9-M11N": "Codiguin do Mês 🎫",
    "ALISSON-C0D-B2V6-T55S": "Codiguin do Mês 🎫",
    "ALISSON-C0D-L9N3-Q88D": "Codiguin do Mês 🎫",
    "ALISSON-C0D-J1K8-Y44Z": "Codiguin do Mês 🎫",
    "ALISSON-C0D-F5S2-G00X": "Codiguin do Mês 🎫",
    "ALISSON-C0D-P3M7-W66B": "Codiguin do Mês 🎫",
    "ALISSON-C0D-V0R4-K99L": "Codiguin do Mês 🎫",
    "ALISSON-C0D-X7T5-H33C": "Codiguin do Mês 🎫",
    "ALISSON-C0D-G2W1-F11A": "Codiguin do Mês 🎫",
    "ALISSON-C0D-M8V4-S99R": "Codiguin do Mês 🎫",
    "ALISSON-C0D-K6L2-N55T": "Codiguin do Mês 🎫",
    "ALISSON-C0D-U1B9-P33J": "Codiguin do Mês 🎫",
    "TITANOFC-C0D-Z5N8-D77V": "Passe Do Titan 🎫",
    "TITANOFC-C0D-Q0M3-X44G": "Passe Do Titan 🎫",
    "TITANOFC-C0D-T4R6-Y22W": "Passe Do Titan 🎫",
    "TITANOFC-C0D-S9K1-B11M": "Passe Do Titan 🎫",
    "TITANOFC-C0D-R3V7-Z88Q": "Passe Do Titan 🎫",
    "TITANOFC-C0D-N2H5-L00F": "Passe Do Titan 🎫",
    "TITANOFC-C0D-D6W9-P22K": "Passe Do Titan🎫",

    // Passe Booyah (20 novos códigos)
    "ALISSON-P55-H4N1-W88X": "Passe Booyah 💎",
    "ALISSON-P55-R7K9-T33V": "Passe Booyah 💎",
    "ALISSON-P55-M0S2-L66B": "Passe Booyah 💎",
    "ALISSON-P55-Z5V4-P11D": "Passe Booyah 💎",
    "ALISSON-P55-G9Q3-N77K": "Passe Booyah 💎",
    "ALISSON-P55-L1J8-F44S": "Passe Booyah 💎",
    "ALISSON-P55-Y3B6-G99M": "Passe Booyah 💎",
    "ALISSON-P55-W5R2-X00P": "Passe Booyah 💎",
    "ALISSON-P55-D7N5-C22Q": "Passe Booyah 💎",
    "ALISSON-P55-K2M9-T88Z": "Passe Booyah 💎",
    "ALISSON-P55-V4S1-H55W": "Passe Booyah 💎",
    "ALISSON-P55-B8L6-R33N": "Passe Booyah 💎",
    "ALISSON-P55-T0X3-P44J": "Passe Booyah 💎",
    "ALISSON-P55-U6W2-Y11G": "Passe Booyah 💎",
    "ALISSON-P55-N9V7-M55C": "Passe Booyah 💎",
    "ALISSON-P55-J1K4-B77H": "Passe Booyah 💎",
    "ALISSON-P55-S5R8-D99A": "Passe Booyah 💎",
    "ALISSON-P55-E2M0-K33L": "Passe Booyah 💎",
    "ALISSON-P55-F6G1-Z22X": "Passe Booyah 💎",
    "ALISSON-P55-Q4N9-W00S": "Passe Booyah 💎"
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
