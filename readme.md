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
Deixei previamente cadastrado um usuario (login: joao@email.com, senha: imobia).
Enviei meu .env por email para nao ter que criar novamente as keys.
Email: Eu criei um meu somente para essa aplicação, 1 semana depois vou apagar.
Vue: Tive problemas para usar o Nuxt, em algumas requisições eu consegui, outras não. Não consegui descobrir o porque, talvez algo de diretorio.
Ultilizei o reddis e o bull o envio de email depois de 30 minutos da criação do cliente(que chamei de pessoa na aplicação), para mudar o tempo, tem a propriedade no .env.
Documentação dos endpoints: http://localhost:3333/api#/ ou http://localhost:3333/api-json(se quiser exportar para o postman/insomnia)

