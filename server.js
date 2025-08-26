// curriculo-ia-backend/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis do arquivo .env
const OpenAI = require('openai'); // Importa a nova biblioteca

// Configuração da API da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/improve-text', async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Recebi este texto para melhorar com OpenAI:", text);

    // O "Prompt" é o mesmo, a instrução não muda
    const prompt = `Você é um especialista em recrutamento e seleção com foco em tecnologia. Sua tarefa é reescrever a descrição de experiência profissional a seguir para torná-la mais impactante para um currículo. Transforme o texto em 3 a 4 bullet points concisos, cada um começando com um verbo de ação forte. Foque em resultados e tecnologias, se mencionados. Texto do usuário: "${text}"`;

    // A chamada para a API da OpenAI é um pouco diferente
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Modelo rápido e muito capaz
      messages: [{ role: "user", content: prompt }],
    });

    const improvedText = completion.choices[0].message.content.trim();

    console.log("Texto gerado pela OpenAI:", improvedText);
    res.json({ improvedText });

  } catch (error) {
    console.error("Erro na API da OpenAI:", error);
    res.status(500).json({ error: "Ocorreu um erro ao processar sua solicitação com a IA." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});