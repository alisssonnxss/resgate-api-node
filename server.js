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
    "Q3R7S1T5", "V9W2X6Y0", "Z4A8B2C6", "E0G4I8K2", "L6O1P5S9",
    "T2U6V0X4", "Y8Z3A7C1", "F5J9L3N7", "H4I8J2K6", "M0N3P7Q1",
    "R5S9T3U7", "W1X5Y9Z3", "B7C0D4E8", "G3H7I1J5", "N9P2Q6R0",
    "S4T8U2V6", "X0Y4Z8A2", "C6D9E3F7", "A2B6C0D4", "P5Q9R3S7",
    "U1V5W9X3", "Z7A1B5C9", "I4J8K2L6", "B6C0D4E8", "Q0R3S7T1",
    "W5X9Y3Z7", "A1B5C9D3", "K0L4M8N2", "C9D3E7F0", "S4T8U2V6",
    "Y2Z6A0B4", "E8F2G6H0", "M6N1P5Q9", "F1G5H9J3", "T8U2V6X0",
    "Z6A0B4D8", "H4I8J2K6", "P2Q6R0S4", "J5K9L3M7", "V4W8X2Y6",
    "C7D1E5G9", "K0L4M8N2", "R8S2T6U0", "L0M4N8P2", "X9Y3Z7A1",
    "G3H7I1J5", "N6P1Q5R9", "T4U8V2W6", "P6Q0R4S8", "Z5A9B3C7",
    "I8K2L6M0", "Q2R6S0T4", "V0X4Y8Z2", "R2S6T0U4", "C1D5E9F3",
    "M4N8P2Q6", "S8T2U6V0", "A7B1C5D9", "T8U2V6W0", "E7F1G5H9",
    "P0Q4R8S2", "V4W8X2Y6", "F3G7H1I5", "W4X8Y2Z6", "I3J7K1L5",
    "R6S0T4U8", "Y0Z4A8B2", "I9J3K7L1", "B5C9D3E7", "M5N9P3Q7",
    "V2W6X0Y4", "D0F4H8J2", "M5N9P3Q7", "D9F3H7J1", "Q1R5S9T3",
    "X8Y2Z6A0", "G6I0K4M8", "S7T1U5V9", "I5K9M3N7", "S7T1U5V9",
    "C0D4E8F2", "L2N6P0R4", "U3V7W1X5", "M1N5P9Q3", "U3V7W1X5",
    "F6G0H4I8", "Q8R2S6T0", "Y9Z3A7B1", "D9F3H7J1", "M5N9P3Q7",
    "Q1R5S9T3", "U3V7W1X5"
];

// CÓDIGOS JÁ RESGATADOS (Esta lista é apagada quando o Render reinicia)
let usedCodes = [];

// CÓDIGO DE ACESSO MESTRE (MANTENHA ISSO SECRETO!)
const MASTER_CODE = "CODIGO_SECRETO_ADMIN"; 


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


