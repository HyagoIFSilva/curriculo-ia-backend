# API do Projeto Currículo HF ⚙️

## 📄 Descrição

Este repositório contém o código-fonte do servidor back-end para a aplicação **[Currículo HF - Suíte de Candidatura com IA](https://github.com/HyagoIFSilva/curriculo-ia-frontend)**.

Construído com Node.js e Express, este servidor atua como um proxy seguro para a API do Google Gemini. Sua principal responsabilidade é receber solicitações do front-end, processá-las com a inteligência artificial para otimização de texto e geração de cartas de apresentação, e retornar os resultados, tudo isso sem expor chaves de API sensíveis no lado do cliente.

---

## 🌐 Endpoints da API

A URL base para a API em ambiente de desenvolvimento é `http://localhost:3001`.

### 1. Otimizar Texto de Experiência
-   **Rota:** `POST /api/improve-text`
-   **Descrição:** Recebe um texto simples e retorna uma versão otimizada em formato de *bullet points* para currículos, gerada pela IA.
-   **Corpo da Requisição (Body):**
    ```json
    {
      "text": "No meu último trabalho, eu fiz o design de várias telas e programei o front-end usando React."
    }
    ```
-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "improvedText": "- Projetei e implementei interfaces de usuário responsivas utilizando React.\n- Desenvolvi componentes reutilizáveis que aumentaram a produtividade do time.\n- Colaborei com a equipe de design para garantir a fidelidade visual das telas."
    }
    ```

### 2. Gerar Carta de Apresentação
-   **Rota:** `POST /api/generate-cover-letter`
-   **Descrição:** Recebe um objeto JSON com todos os dados do currículo do usuário, mais o cargo e a empresa desejada, e retorna uma carta de apresentação completa e personalizada.
-   **Corpo da Requisição (Body):**
    ```json
    {
      "resumeData": { "nome": "João da Silva", "experiencias": [...] },
      "targetJob": "Desenvolvedor React Pleno",
      "targetCompany": "TechCorp"
    }
    ```
-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "coverLetter": "Prezados recrutadores da TechCorp,\n\nEscrevo para expressar meu grande interesse na vaga de Desenvolvedor React Pleno..."
    }
    ```

---

## 🛠️ Tecnologias Utilizadas
-   **Node.js**
-   **Express.js**
-   **Google Gemini API**
-   **dotenv** (para gerenciamento de variáveis de ambiente)
-   **cors** (para permitir a comunicação com o front-end)

---

## 🚀 Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone [https://github.com/HyagoIFSilva/curriculo-ia-backend.git](https://github.com/HyagoIFSilva/curriculo-ia-backend.git)
cd curriculo-ia-backend

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de variáveis de ambiente
# Crie um arquivo .env na raiz e adicione sua chave da API do Gemini
# GEMINI_API_KEY="SUA_CHAVE_SECRETA_AQUI"

# 4. Inicie o servidor
node server.js
```

---

## 👨‍💻 Autor

Desenvolvido com dedicação por **[Hyago Inacio]**.

* **LinkedIn:** [[meu-linkedin-aqui](https://www.linkedin.com/in/hyagoinaciofarias/)]
* **GitHub:** @HyagoIFSilva-github