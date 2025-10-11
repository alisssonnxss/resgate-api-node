const express = require('express');
const cors = require('cors');

const app = express();

// --- CONFIGURAÇÃO DE SEGURANÇA E PORTA ---
const PORT = process.env.PORT || 3000; 
// CRÍTICO: Não use 3000 em produção. O Render (nuvem) define a porta via process.env.PORT.

// Você precisa de uma "lista negra" de códigos usados. 
// Em produção, isso seria um banco de dados (MongoDB, PostgreSQL, etc.).
// Para o teste inicial no Render, usamos um array simples (não persistente).
const usedCodes = ["FFCP001", "FFCP002", "TESTE123"]; 
const validCodes = [
    "B9R3K7L1", "4A8Z2V6T", "C5X9W3Q7", "J2H6N1M5", "P8G4D0F2",
    "D1F5H9J3", "K7L0M4N8", "Q3R7S1T5", "V9W2X6Y0", "Z4A8B2C6",
    "E0G4I8K2", "L6O1P5S9", "T2U6V0X4", "Y8Z3A7C1", "F5J9L3N7",
    "H4I8J2K6", "M0N3P7Q1", "R5S9T3U7", "W1X5Y9Z3", "B7C0D4E8",
    "G3H7I1J5", "N9P2Q6R0", "S4T8U2V6", "X0Y4Z8A2", "C6D9E3F7",
    "A2B6C0D4", "P5Q9R3S7", "U1V5W9X3", "Z7A1B5C9", "I4J8K2L6",
    "B6C0D4E8", "Q0R3S7T1", "W5X9Y3Z7", "A1B5C9D3", "K0L4M8N2",
    "C9D3E7F0", "S4T8U2V6", "Y2Z6A0B4", "E8F2G6H0", "M6N1P5Q9",
    "F1G5H9J3", "T8U2V6X0", "Z6A0B4D8", "H4I8J2K6", "P2Q6R0S4",
    "J5K9L3M7", "V4W8X2Y6", "C7D1E5G9", "K0L4M8N2", "R8S2T6U0",
    "L0M4N8P2", "X9Y3Z7A1", "G3H7I1J5", "N6P1Q5R9", "T4U8V2W6",
    "P6Q0R4S8", "Z5A9B3C7", "I8K2L6M0", "Q2R6S0T4", "V0X4Y8Z2",
    "R2S6T0U4", "C1D5E9F3", "M4N8P2Q6", "S8T2U6V0", "A7B1C5D9",
    "T8U2V6W0", "E7F1G5H9", "P0Q4R8S2", "V4W8X2Y6", "F3G7H1I5",
    "W4X8Y2Z6", "I3J7K1L5", "R6S0T4U8", "Y0Z4A8B2", "I9J3K7L1",
    "Y0Z4A8B2", "K9L3M7N1", "V2W6X0Y4", "B6C0D4E8", "M5N9P3Q7",
    "B5C9D3E7", "M5N9P3Q7", "X8Y2Z6A0", "D0F4H8J2", "Q1R5S9T3",
    "D9F3H7J1", "Q1R5S9T3", "A4B8C2D6", "G6I0K4M8", "S7T1U5V9",
    "I5K9M3N7", "S7T1U5V9", "C0D4E8F2", "L2N6P0R4", "U3V7W1X5",
    "M1N5P9Q3", "U3V7W1X5", "F6G0H4I8", "Q8R2S6T0", "Y9Z3A7B1"
]; // Códigos válidos

// --- MIDDLEWARE ---
app.use(cors()); // Permite que seu frontend (Vercel) se comunique com o backend (Render)
app.use(express.json()); // Permite que a API receba dados JSON

// --- ROTA DE LOGIN PRINCIPAL ---
app.post('/api/login', (req, res) => {
    const { code } = req.body;
    const inputCode = (code || "").trim().toUpperCase();

    if (!inputCode) {
        return res.status(400).json({ message: "O código não pode estar vazio." });
    }

    if (usedCodes.includes(inputCode)) {
        return res.status(401).json({ message: "❌ Código já utilizado ou expirado." });
    }
    
    if (!validCodes.includes(inputCode)) {
        return res.status(401).json({ message: "❌ Código de acesso inválido." });
    }

    // --- LÓGICA DE SUCESSO ---
    
    // 1. Marca o código como usado (ADICIONANDO À LISTA NEGRA TEMPORÁRIA)
    // ATENÇÃO: Em um banco de dados real, você faria um UPDATE. Aqui, é apenas uma simulação.
    // O Render Free reinicia periodicamente, limpando este array.
    usedCodes.push(inputCode);
    
    // 2. Retorna um token de sessão (poderia ser JWT, mas simplificamos para esta string)
    // O token não é usado neste frontend, mas é uma boa prática retornar algo.
    res.status(200).json({ 
        message: "✅ Acesso liberado!", 
        sessionToken: `token-${Date.now()}` 
    });
});

// --- ROTA DE STATUS (APENAS PARA VERIFICAR SE O SERVIDOR ESTÁ ATIVO) ---
app.get('/', (req, res) => {
    res.send('API de Resgate funcionando. Use /api/login para o login.');
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);

});
