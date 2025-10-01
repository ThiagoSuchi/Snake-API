# Snake API

## Descrição

A Snake API é uma aplicação backend desenvolvida em Node.js com Express, projetada para gerenciar jogadores e pontuações de um jogo da cobra (Snake Game). Ela permite o cadastro e login de jogadores, atualização de pontuações e consulta de rankings.

## Funcionalidades

- **Cadastro e Login de Jogadores**: Permite criar uma conta ou fazer login com nome e senha.
- **Atualização de Pontuações**: Atualiza a pontuação do jogador apenas se a nova pontuação for maior que a atual.
- **Ranking**: Exibe o top 10 jogadores com as maiores pontuações.
- **Documentação da API**: Utiliza Swagger para documentar os endpoints.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL para armazenar dados dos jogadores.
- **Mongoose**: ODM para MongoDB.
- **CORS**: Para permitir requisições de origens diferentes (configurado para `http://localhost:3000`).
- **Swagger**: Para documentação interativa da API.

## Instalação

1. Clone o repositório:
   ```
   git clone <url-do-repositorio>
   cd snake-api
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure o banco de dados:
   - Certifique-se de ter uma instância do MongoDB rodando.
   - A conexão está configurada para um cluster MongoDB Atlas. Substitua a string de conexão em `src/app.js` se necessário.

4. Execute o servidor:
   ```
   node server.js
   ```

   O servidor será iniciado na porta 4000 (ou a definida na variável de ambiente `PORT`).

## Endpoints da API

### POST /jogadores
- **Descrição**: Cadastra um novo jogador ou faz login se já existir.
- **Corpo da Requisição**:
  ```json
  {
    "name": "Nome do Jogador",
    "password": "Senha"
  }
  ```
- **Resposta de Sucesso**:
  - Cadastro: `201 Created` com mensagem e dados do jogador.
  - Login: `200 OK` com mensagem e dados do jogador.

### PUT /jogadores/:id/score
- **Descrição**: Atualiza a pontuação do jogador se a nova pontuação for maior.
- **Parâmetros**: `id` (ID do jogador na URL).
- **Corpo da Requisição**:
  ```json
  {
    "score": 150
  }
  ```
- **Resposta de Sucesso**: `200 OK` com mensagem, dados do jogador e ranking atualizado.

### GET /ranking
- **Descrição**: Retorna o top 10 jogadores com as maiores pontuações.
- **Resposta de Sucesso**: `200 OK` com lista de jogadores ordenados por pontuação decrescente.

### GET /teste
- **Descrição**: Endpoint de teste para verificar se a API está funcionando.
- **Resposta**: `200 OK` com mensagem "API funcionando!".

## Documentação Completa

A documentação interativa da API pode ser acessada via Swagger em `http://localhost:4000/api-docs` (se configurado).

## Estrutura do Projeto

```
snake-api/
├── package.json
├── server.js
├── swagger.yaml
└── src/
    ├── app.js
    ├── models/
    │   └── jogador.js
    └── routes/
        └── scoreRoutes.js
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a ISC License.