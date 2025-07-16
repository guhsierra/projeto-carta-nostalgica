// server.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON vindo do frontend
app.use(express.json());

// Middleware para servir os arquivos estáticos (HTML, CSS, JS, etc.) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// --- Nossa "Lista Secreta" de Nomes e Cartas ---
// As chaves (nomes) estão em minúsculo para facilitar a verificação
const cartasSecretas = {
    'clara': '/cartas/clara.html',
    
};

// --- Nosso Endpoint da API para Verificar o Nome ---
app.post('/verificar-nome', (req, res) => {
    // Pegamos o nome enviado no corpo da requisição
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: 'O nome não pode estar vazio.' });
    }

    // Limpamos o nome (removemos espaços e convertemos para minúsculo)
    const nomeLimpo = name.trim().toLowerCase();

    // Verificamos se o nome limpo existe em nosso objeto de cartas
    if (cartasSecretas[nomeLimpo]) {
        // Se existir, respondemos com sucesso e o link para a carta
        res.json({
            success: true,
            redirectUrl: cartasSecretas[nomeLimpo]
        });
    } else {
        // Se não existir, respondemos com um erro e uma mensagem melancólica
        res.status(403).json({
            success: false,
            message: 'Este nome não evoca memórias por aqui...'
        });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor dos sussurros escutando em http://localhost:${PORT}`);
});