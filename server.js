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
const validCodes = ["ACESSOUNICO456", "RESGATEFREEFIRE"]; // Códigos válidos

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