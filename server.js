const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações Middleware
app.use(cors()); // CRÍTICO: Permite requisições do seu Frontend no Netlify
app.use(bodyParser.json());

// --- DADOS EM MEMÓRIA ---

// ⚠️ CÓDIGOS VÁLIDOS (SUA LISTA COMPLETA)
const validCodes = [
  "G2P8R-B5W9Z",
  "J7L4F-T0X3H",
  "C6M1K-V9A5D",
  "H3Q9E-S7Y4U",
  "Z4B0X-R6J1P",
  "F1W5H-D8N2L",
  "K9P3V-G0M7Z",
  "A0R4S-C2T6Q",
  "E5U7Y-J1B8D",
  "L6X2Z-H3K9F",
  "P7A1T-M4C5W",
  "B8Q6D-Y0S2J",
  "I3N9R-F5L7V",
  "O4Z0G-U8X6K",
  "V1H5J-Q9M3T",
  "W0D2B-E4P6Y",
  "M5L7N-I8R3O",
  "T9F4A-X1S0C",
  "D2J6K-V5B7H",
  "S8G3U-Z9W1Q",
  "Y0C7P-F4R2E",
  "K1H8L-M6N0X",
  "A3D9E-T7G5J",
  "U4V0W-P1R3S",
  "X2Y6Z-Q5B9C",
  "L7M1N-K3H8J",
  "O0P4Q-R2S6T",
  "F5G9H-I1J3K",
  "V6W2X-Y4Z8A",
  "E3D7C-B9A5Z",
  "P8Q0R-S2T6U",
  "M4N8P-Q0R4S",
  "T9V3W-X7Y1Z",
  "H1J5K-L9M3N",
  "B5C9D-E3F7G",
  "R0S4T-U8V2W",
  "Z7A1B-C5D9E",
  "I2J6K-L0M4N",
  "Q6R0S-T4U8V",
  "W9X3Y-Z7A1B",
  "G1H5I-J9K3L",
  "O8P2Q-R6S0T",
  "A7B1C-D5E9F",
  "K4L8M-N2P6Q",
  "U3V7W-X1Y5Z",
  "B0C4D-E8F2G",
  "T5U9V-W3X7Y",
  "H6I0J-K4L8M",
  "R9S3T-U7V1W",
  "D1E5F-G9H3I",
  "X0Y4Z-A8B2C",
  "J5K9L-M3N7P",
  "Q4R8S-T2U6V",
  "C3D7E-F1G5H",
  "M9N3P-Q7R1S",
  "W2X6Y-Z0A4B",
  "K8L2M-N6P0Q",
  "Y1Z5A-B9C3D",
  "G4H8I-J2K6L",
  "P0Q4R-S8T2U",
  "V5W9X-Y3Z7A",
  "F3G7H-I1J5K",
  "Z6A0B-C4D8E",
  "T7U1V-W5X9Y",
  "D0E4F-G8H2I",
  "S1T5U-V9W3X",
  "B4C8D-E2F6G",
  "M3N7P-Q1R5S",
  "H9I3J-K7L1M",
  "O2P6Q-R0S4T",
  "J0K4L-M8N2P",
  "R7S1T-U5V9W",
  "V3W7X-Y1Z5A",
  "E6F0G-H4I8J",
  "P9Q3R-S7T1U",
  "L5M9N-P3Q7R",
  "Y7Z1A-B5C9D",
  "F0G4H-I8J2K",
  "W8X2Y-Z6A0B",
  "U4V8W-X2Y6Z",
  "G9H3I-J7K1L",
  "C5D9E-F3G7H",
  "M1N5P-Q9R3S",
  "K6L0M-N4P8Q",
  "A4B8C-D2E6F",
  "I7J1K-L5M9N",
  "Z3A7B-C1D5E",
  "R8S2T-U6V0W",
  "O9P3Q-R7S1T",
  "L4M8N-P2Q6R",
  "B6C0D-E4F8G",
  "V0W4X-Y8Z2A"
];

// CÓDIGOS JÁ RESGATADOS (Esta lista é apagada quando o Render reinicia)
let usedCodes = [];

// CÓDIGO DE ACESSO MESTRE (MANTENHA ISSO SECRETO!)
const MASTER_CODE = "CODIGO998052"; 


// --- ROTA PRINCIPAL DE LOGIN ---
app.post('/api/login', (req, res) => {
    const { code } = req.body;
    
    // Adiciona o cabeçalho CORS para garantir a compatibilidade
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // 1. CHECAGEM DE CÓDIGO VAZIO
    if (!code) {
        return res.status(400).json({ success: false, message: 'O código não pode estar vazio.' });
    }

    // 2. CHECAGEM DE CÓDIGO MESTRE
    if (code === MASTER_CODE) {
        // Não adiciona à lista de usados e não verifica uso anterior
        console.log('[LOG] Acesso Mestre utilizado.');
        return res.status(200).json({ success: true, message: 'Acesso Mestre Liberado! (Ignorando uso único)' });
    }

    // 3. CHECAGEM DE CÓDIGO INVÁLIDO
    if (!validCodes.includes(code)) {
        return res.status(400).json({ success: false, message: 'Código inválido ou não registrado.' });
    }

    // 4. CHECAGEM DE USO ÚNICO (Para códigos comuns)
    if (usedCodes.includes(code)) {
        return res.status(400).json({ success: false, message: 'Este código já foi resgatado e está indisponível.' });
    }

    // 5. SUCESSO E MARCAÇÃO DE USO
    usedCodes.push(code); 
    console.log(`[LOG] Novo código usado: ${code}`);

    return res.status(200).json({ success: true, message: 'Código validado! Acesso Liberado.' });
});


// --- ROTA DE HISTÓRICO ---
app.get('/api/history', (req, res) => {
    // Retorna a lista de códigos usados para o modal do Frontend
    const historyData = usedCodes.map(code => ({ code: code }));
    res.status(200).json({ history: historyData });
});


// ROTA DE TESTE (Health Check)
app.get('/', (req, res) => {
    res.send(`API de Resgate funcionando na porta ${PORT}. Total de códigos usados: ${usedCodes.length}`);
});


// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});




