# Integração Assas - Projeto Full Stack

Este projeto é composto por:

- **Backend (NestJS)** - `back-end/`
  - API principal (`yarn dev`)
  - Worker separado (`yarn start:worker`)
- **Frontend (Vue/Nuxt)** - `front-end/`
- **Serviços** via Docker:
  - MySQL
  - Redis

---

## Requisitos

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)


## Back-End (/back-end)
- [Aplicação] - yarn dev - para iniciar aplicação
- [Aplicação] - yarn start:worker - para iniciar o bull
- [Prisma] - yarn prisma migrate deploy


## Front-end (/front-end)
- [Vue] - yarn dev



## Considerações

- Deixei previamente cadastrado um usuário para testes:  
  **Login:** `joao@email.com`  
  **Senha:** `imobia`

- Enviei o arquivo `.env` por e-mail para evitar a necessidade de recriar as chaves.

- **E-mail:** Criei uma conta de e-mail específica apenas para essa aplicação. Pretendo apagá-la uma semana após a entrega.

- **Vue/Nuxt:** Tive dificuldades ao usar o Nuxt. Algumas requisições funcionaram corretamente, outras não. Não consegui identificar o motivo, mas pode estar relacionado à estrutura de diretórios.

- **Envio de e-mail:** Utilizei Redis e Bull para agendar o envio de e-mails 30 minutos após a criação de um cliente (chamado de "pessoa" na aplicação). Esse tempo pode ser configurado pela variável no `.env`.

- **Documentação dos endpoints:**  
  - Visualização via Swagger: [http://localhost:3333/api#/](http://localhost:3333/api#/)  
  - JSON da API (para importar no Postman/Insomnia): [http://localhost:3333/api-json](http://localhost:3333/api-json)


