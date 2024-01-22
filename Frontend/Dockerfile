# Use a imagem oficial do Node.js LTS como base
FROM node:14

# Instale o Angular CLI globalmente
RUN npm install -g @angular/cli

# Defina o diretório de trabalho para o diretório do aplicativo Angular
WORKDIR /app

# Copie os arquivos do aplicativo Angular para o contêiner
COPY . .

# Instale as dependências do projeto
RUN npm install

# Exponha a porta 4200 (ou a porta que você deseja usar para o servidor de desenvolvimento)
EXPOSE 4200

# Comando padrão para iniciar o servidor de desenvolvimento
CMD ["ng", "serve", "--host", "0.0.0.0"]
