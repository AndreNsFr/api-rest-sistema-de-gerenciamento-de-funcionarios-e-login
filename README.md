
# Instalação / Instalation

yarn install

# Utilização em maquina local/ Use on local machine:

yarn dev

URL: http://localhost:3000/


# API de Gestão de Funcionários

Esta API permite o gerenciamento de funcionários, incluindo a criação, pesquisa, atualização e exclusão de dados, com autenticação via JWT. A seguir, estão as rotas e suas funcionalidades.

## Autenticação JWT

Todas as rotas que manipulam dados de funcionários exigem autenticação via **Token JWT** e **Refresh Token**. O middleware `authMiddleware` será responsável por verificar a validade dos tokens. Caso o **Token JWT** tenha expirado, o middleware verificará o **Refresh Token** e retornará novos tokens, se válido. Se ambos os tokens forem inválidos, a API retornará erro **405** com a mensagem `{ erro: "não autorizado" }`.

### Estrutura de resposta

- **token**: O JWT gerado para autenticação.
- **refreshToken**: O Refresh Token para renovação do JWT.
- **status**: Indica o sucesso do login. Valor `true` para login bem-sucedido.

---

## Endpoints

### 1. Criar Funcionário

**Método**: `POST`  
**Endpoint**: `/funcionarios`  
**Autenticação**: Requer Token JWT e Refresh Token  

**Corpo da requisição (JSON)**:

```json
{
  "imagem": "string",
  "nome": "string",
  "senha": "string",
  "departamento": "string",
  "cpf": "string",
  "email": "string",
  "data": "string"  // Data de nascimento
}
```

**Descrição**: Cria um novo funcionário com os dados fornecidos. Todos os campos são obrigatórios. Se algum campo estiver ausente, a API retornará erro.

**Resposta (Sucesso)**:

```json
{
  "status": "success",
  "message": "Funcionário criado com sucesso"
}
```

**Resposta (Erro)**:

```json
{
  "erro": "Campo 'nome' é obrigatório"
}
```

---

### 2. Pesquisar Funcionário Específico

**Método**: `GET`  
**Endpoint**: `/funcionarios/?cpf={cpf}`  
**Autenticação**: Requer Token JWT e Refresh Token  

**Parâmetro**: `cpf` (via URL)

**Descrição**: Retorna os dados de um funcionário específico com base no CPF.

**Resposta (Sucesso)**:

```json
{
  "imagem": "string",
  "nome": "string",
  "departamento": "string",
  "cpf": "string",
  "email": "string",
  "data": "string"  // Data de nascimento
}
```

**Resposta (Erro)**:

```json
{
  "erro": "Usuário não encontrado"
}
```

---

### 3. Pesquisar Todos os Funcionários

**Método**: `GET`  
**Endpoint**: `/staff`  
**Autenticação**: Requer Token JWT e Refresh Token  

**Descrição**: Retorna todos os funcionários cadastrados no banco de dados.

**Resposta (Sucesso)**:

```json
[
  {
    "imagem": "string",
    "nome": "string",
    "departamento": "string",
    "cpf": "string",
    "email": "string",
    "data": "string"  // Data de nascimento
  },
  ...
]
```

---

### 4. Atualizar Dados de Funcionário

**Método**: `PUT`  
**Endpoint**: `/funcionarios/?cpf={cpf}`  
**Autenticação**: Requer Token JWT e Refresh Token  

**Parâmetros (via URL)**:  
`cpf`: CPF do funcionário a ser atualizado.

**Corpo da requisição (JSON)** (Campos que podem ser alterados):

```json
{
  "nome": "nome novo",
  "departamento": "departamento novo",
  "email": "novo-email@dominio.com",
  "senha": "nova-senha",
  "imagem": "nova-imagem"
}
```

**Descrição**: Atualiza os dados de um funcionário com base no CPF fornecido. Apenas os campos enviados no corpo da requisição serão alterados. Os campos são:

- `nome`
- `departamento`
- `email`
- `senha`
- `imagem`

**Resposta (Sucesso)**:

```json
{
  "status": "success",
  "message": "Funcionário atualizado com sucesso"
}
```

**Resposta (Erro)**:

```json
{
  "erro": "Funcionário não encontrado"
}
```

---

### 5. Deletar Funcionário

**Método**: `DELETE`  
**Endpoint**: `/funcionarios/?cpf={cpf}`  
**Autenticação**: Requer Token JWT e Refresh Token  

**Parâmetro**: `cpf` (via URL)

**Descrição**: Deleta o funcionário com o CPF especificado.

**Resposta (Sucesso)**:

```json
{
  "status": "success",
  "message": "Funcionário deletado com sucesso"
}
```

**Resposta (Erro)**:

```json
{
  "erro": "Funcionário não encontrado"
}
```

---

### 6. Login

**Método**: `POST`  
**Endpoint**: `/auth`  

**Corpo da requisição (JSON)**:

```json
{
  "nome": "string",
  "email": "string",
  "cpf": "string"
}
```

**Descrição**: Realiza o login do usuário e retorna os tokens de autenticação (Token JWT e Refresh Token).

**Resposta (Sucesso)**:

```json
{
  "token": "string",
  "refreshToken": "string",
  "status": true
}
```

**Resposta (Erro)**:

```json
{
  "erro": "Credenciais inválidas"
}
```

---

## Middlewares

### `authMiddleware`

Este middleware é responsável por garantir que o Token JWT e o Refresh Token sejam válidos para acessar as rotas protegidas. O fluxo de verificação é o seguinte:

1. Se o Token JWT for válido, o fluxo continua normalmente.
2. Se apenas o Refresh Token for válido, novos tokens serão emitidos nos headers de resposta e o fluxo continuará.
3. Se ambos os tokens forem inválidos, a API retornará um erro 405 com a mensagem `{ erro: "não autorizado" }`.

---

## Considerações Finais

A API está protegida por autenticação JWT para garantir a segurança dos dados de funcionários. É essencial enviar os tokens corretos para acessar as rotas protegidas. Caso tenha alguma dúvida ou queira contribuir, sinta-se à vontade para abrir uma issue ou um pull request!
