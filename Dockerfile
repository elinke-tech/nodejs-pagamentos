FROM node:latest
LABEL author="Felipe Miranda <felipemiranda@outlook.com>"
WORKDIR /app
COPY ./app /app
RUN npm install
