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
    const prompt = `Você é um especialista em recrutamento. Reescreva a descrição de experiência a seguir para ser mais impactante em um currículo. Transforme o texto em 3 ou 4 bullet points, cada um começando com um verbo de ação forte. Foque em resultados e tecnologias. Texto original: "${text}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ improvedText: response.text() });
  } catch (error) {
    console.error("Erro na API do Gemini:", error);
    res.status(500).json({ error: "Ocorreu um erro ao processar sua solicitação." });
  }
});

app.post('/api/generate-cover-letter', async (req, res) => {
  try {
    const { resumeData, targetJob, targetCompany } = req.body;
    if (!resumeData || !targetJob || !targetCompany) {
      return res.status(400).json({ error: "Dados insuficientes para gerar a carta." });
    }
    
    const resumeString = JSON.stringify(resumeData, null, 2);
    console.log("Gerando carta para a vaga:", targetJob);

    const prompt = `
      Você é um coach de carreira e especialista em RH altamente qualificado.
      Sua tarefa é escrever uma carta de apresentação profissional, concisa e convincente.
      Use os dados do currículo do candidato, fornecidos em formato JSON, para embasar a carta.
      
      O candidato está se aplicando para a vaga de "${targetJob}" na empresa "${targetCompany}".

      Instruções:
      1. Comece com uma saudação profissional.
      2. No primeiro parágrafo, mencione a vaga e a empresa, e expresse entusiasmo.
      3. No segundo parágrafo, use as informações de "experiencias" e "habilidades" do JSON para destacar 2 ou 3 pontos fortes do candidato que são DIRETAMENTE RELEVANTES para a vaga de "${targetJob}". Conecte as habilidades do candidato com as necessidades da empresa.
      4. No terceiro parágrafo, reforce o interesse na "${targetCompany}" e mencione como os valores ou produtos da empresa se conectam com o perfil do candidato.
      5. Finalize com uma chamada para ação (sugerindo uma entrevista) e uma despedida formal.
      6. Mantenha um tom confiante e profissional. A carta não deve ultrapassar 4 parágrafos.

      Dados do Currículo (JSON):
      ${resumeString}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ coverLetter: response.text() });

  } catch (error) {
    console.error("Erro ao gerar carta de apresentação:", error);
    res.status(500).json({ error: "Ocorreu um erro ao gerar a carta." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Gemini rodando na porta ${PORT}`);
});