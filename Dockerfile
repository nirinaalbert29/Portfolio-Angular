# FROM node:20.16.0 as angular


# WORKDIR /app

# COPY . .

# RUN npm install  

# # Installer Angular CLI globalement
# RUN npm install -g @angular/cli

# RUN ng build

# FROM httpd:alpine3.15

# WORKDIR usr/local/apache2/htdocs
# COPY --from=angular /app/dist/basic1 .

# Étape 1 : Construire l'application Angular
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
