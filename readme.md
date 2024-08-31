# Nome do Projeto
Versão 1.0 - Test Shopper

## Pré-requisitos

- [Node.js](https://nodejs.org/) - versão 14 ou superior
- [MongoDB](https://www.mongodb.com/) - para armazenar as informações das leituras
- Conta no [Cloudinary](https://cloudinary.com/) para o armazenamento de imagens
- Chave de API para o Google LLM (Gemini)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Instale dependências
    npm install

3. Configure variáveis de ambiente, criando arquivo .env na raiz do projeto
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/seu-database
    GEMINI_API_KEY=sua-chave-de-api-gemini
    CLOUDINARY_CLOUD_NAME=seu-cloudinary-cloud-name
    CLOUDINARY_API_KEY=sua-chave-de-api-cloudinary
    CLOUDINARY_API_SECRET=seu-cloudinary-api-secret

4. Execute a aplicação
    npm start