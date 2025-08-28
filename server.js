const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/improve-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "O campo 'text' é obrigatório." });
    }

    console.log("Recebi este texto para melhorar com Gemini:", text);

    const prompt = `Você é um especialista em recrutamento e seleção com foco em tecnologia. Reescreva a descrição de experiência profissional a seguir para ser mais impactante em um currículo. Transforme o texto em 3 ou 4 bullet points, cada um começando com um verbo de ação forte. Foque em resultados e tecnologias. Texto original: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedText = response.text();

    console.log("Texto gerado pelo Gemini:", improvedText);
    res.json({ improvedText });

  } catch (error) {
    console.error("Erro na API do Gemini:", error);
    res.status(500).json({ error: "Ocorreu um erro ao processar sua solicitação com a IA." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Gemini rodando na porta ${PORT}`);
});