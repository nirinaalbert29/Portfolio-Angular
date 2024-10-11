FROM node:20.16.0 AS angular

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration production

# Étape 2 : Copier les fichiers construits dans l'image httpd
FROM httpd:alpine3.15 AS stage-1

WORKDIR /usr/local/apache2/htdocs

COPY --from=angular /app/dist/basic1 .
