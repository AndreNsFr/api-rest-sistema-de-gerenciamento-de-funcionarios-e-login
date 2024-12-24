# Instalação / Installation

- yarn install

# Utilização em maquina local/on local machine:

- yarn dev

URL: http://localhost:3000/


# API de Gestão de Funcionários / Employee Management API

Esta API permite o gerenciamento de funcionários, incluindo a criação, pesquisa, atualização e exclusão de dados, com autenticação via JWT. A seguir, estão as rotas e suas funcionalidades.

This API allows the management of employees, including creation, search, update, and deletion of data, with JWT authentication. Below are the routes and their functionalities.

## Autenticação JWT / JWT Authentication

Todas as rotas que manipulam dados de funcionários exigem autenticação via **Token JWT** e **Refresh Token**. O middleware `authMiddleware` será responsável por verificar a validade dos tokens. Caso o **Token JWT** tenha expirado, o middleware verificará o **Refresh Token** e retornará novos tokens, se válido. Se ambos os tokens forem inválidos, a API retornará erro **405** com a mensagem `{ erro: "não autorizado" }`.

All routes handling employee data require **JWT Token** and **Refresh Token** authentication. The `authMiddleware` will verify the validity of the tokens. If the **JWT Token** has expired, the middleware will check the **Refresh Token** and return new tokens if valid. If both tokens are invalid, the API will return a **405** error with the message `{ erro: "not authorized" }`.

### Estrutura de resposta / Response Structure

- **token**: O JWT gerado para autenticação. / The JWT generated for authentication.
- **refreshToken**: O Refresh Token para renovação do JWT. / The Refresh Token for renewing the JWT.
- **status**: Indica o sucesso do login. Valor `true` para login bem-sucedido. / Indicates the success of the login. `true` value for successful login.

---

## Endpoints

### 1. Criar Funcionário / Create Employee

**Método / Method**: `POST`  
**Endpoint**: `/funcionarios`  
**Autenticação / Authentication**: Requer Token JWT e Refresh Token / Requires JWT Token and Refresh Token  

**Corpo da requisição (JSON) / Request Body (JSON)**:

```json
{
  "imagem": "string",
  "nome": "string",
  "senha": "string",
  "departamento": "string",
  "cpf": "string",
  "email": "string",
  "data": "string"  // Data de nascimento / Birthdate
}
```

**Descrição / Description**: Cria um novo funcionário com os dados fornecidos. Todos os campos são obrigatórios. Se algum campo estiver ausente, a API retornará erro. / Creates a new employee with the provided data. All fields are required. If any field is missing, the API will return an error.

**Resposta (Sucesso) / Response (Success)**:

```json
{
  "status": "success",
  "message": "Funcionário criado com sucesso / Employee created successfully"
}
```

**Resposta (Erro) / Response (Error)**:

```json
{
  "erro": "Campo 'nome' é obrigatório / 'name' field is required"
}
```

---

### 2. Pesquisar Funcionário Específico / Search Specific Employee

**Método / Method**: `GET`  
**Endpoint**: `/funcionarios/?cpf={cpf}`  
**Autenticação / Authentication**: Requer Token JWT e Refresh Token / Requires JWT Token and Refresh Token  

**Parâmetro / Parameter**: `cpf` (via URL)

**Descrição / Description**: Retorna os dados de um funcionário específico com base no CPF / Returns the data of a specific employee based on CPF.

**Resposta (Sucesso) / Response (Success)**:

```json
{
  "imagem": "string",
  "nome": "string",
  "departamento": "string",
  "cpf": "string",
  "email": "string",
  "data": "string"  // Data de nascimento / Birthdate
}
```

**Resposta (Erro) / Response (Error)**:

```json
{
  "erro": "Usuário não encontrado / User not found"
}
```

---

### 3. Pesquisar Todos os Funcionários / Search All Employees

**Método / Method**: `GET`  
**Endpoint**: `/funcionarios`  
**Autenticação / Authentication**: Requer Token JWT e Refresh Token / Requires JWT Token and Refresh Token  

**Descrição / Description**: Retorna todos os funcionários cadastrados no banco de dados. / Returns all employees registered in the database.

**Resposta (Sucesso) / Response (Success)**:

```json
[
  {
    "imagem": "string",
    "nome": "string",
    "departamento": "string",
    "cpf": "string",
    "email": "string",
    "data": "string"  // Data de nascimento / Birthdate
  },
  ...
]
```

---

### 4. Atualizar Dados de Funcionário / Update Employee Data

**Método / Method**: `PUT`  
**Endpoint**: `/funcionarios/?cpf={cpf}`  
**Autenticação / Authentication**: Requer Token JWT e Refresh Token / Requires JWT Token and Refresh Token  

**Parâmetros (via URL) / Parameters (via URL)**:  
`cpf`: CPF do funcionário a ser atualizado / CPF of the employee to be updated.

**Corpo da requisição (JSON) / Request Body (JSON)** (Campos que podem ser alterados / Fields that can be changed):

```json
{
  "nome": "nome novo / new name",
  "departamento": "departamento novo / new department",
  "email": "novo-email@dominio.com / new-email@domain.com",
  "senha": "nova-senha / new-password",
  "imagem": "nova-imagem / new-image"
}
```

**Descrição / Description**: Atualiza os dados de um funcionário com base no CPF fornecido. Apenas os campos enviados no corpo da requisição serão alterados. Os campos são: / Updates the data of an employee based on the provided CPF. Only the fields sent in the request body will be changed. The fields are:

- `nome / name`
- `departamento / department`
- `email`
- `senha / password`
- `imagem / image`

**Resposta (Sucesso) / Response (Success)**:

```json
{
  "status": "success",
  "message": "Funcionário atualizado com sucesso / Employee updated successfully"
}
```

**Resposta (Erro) / Response (Error)**:

```json
{
  "erro": "Funcionário não encontrado / Employee not found"
}
```

---

### 5. Deletar Funcionário / Delete Employee

**Método / Method**: `DELETE`  
**Endpoint**: `/funcionarios/?cpf={cpf}`  
**Autenticação / Authentication**: Requer Token JWT e Refresh Token / Requires JWT Token and Refresh Token  

**Parâmetro / Parameter**: `cpf` (via URL)

**Descrição / Description**: Deleta o funcionário com o CPF especificado. / Deletes the employee with the specified CPF.

**Resposta (Sucesso) / Response (Success)**:

```json
{
  "status": "success",
  "message": "Funcionário deletado com sucesso / Employee deleted successfully"
}
```

**Resposta (Erro) / Response (Error)**:

```json
{
  "erro": "Funcionário não encontrado / Employee not found"
}
```

---

### 6. Login

**Método / Method**: `POST`  
**Endpoint**: `/auth`  

**Corpo da requisição (JSON) / Request Body (JSON)**:

```json
{
  "nome": "string",
  "email": "string",
  "cpf": "string"
}
```

**Descrição / Description**: Realiza o login do usuário e retorna os tokens de autenticação (Token JWT e Refresh Token). / Performs user login and returns authentication tokens (JWT Token and Refresh Token).

**Resposta (Sucesso) / Response (Success)**:

```json
{
  "token": "string",
  "refreshToken": "string",
  "status": true
}
```

**Resposta (Erro) / Response (Error)**:

```json
{
  "erro": "Credenciais inválidas / Invalid credentials"
}
```

---

## Middlewares

### `authMiddleware`

Este middleware é responsável por garantir que o Token JWT e o Refresh Token sejam válidos para acessar as rotas protegidas. O fluxo de verificação é o seguinte: / This middleware ensures that the JWT Token and Refresh Token are valid to access protected routes. The verification flow is as follows:

1. Se o Token JWT for válido, o fluxo continua normalmente. / If the JWT Token is valid, the flow continues normally.
2. Se apenas o Refresh Token for válido, novos tokens serão emitidos nos headers de resposta e o fluxo continuará. / If only the Refresh Token is valid, new tokens will be issued in the response headers and the flow will continue.
3. Se ambos os tokens forem inválidos, a API retornará um erro 405 com a mensagem `{ erro: "não autorizado" }`. / If both tokens are invalid, the API will return a 405 error with the message `{ erro: "not authorized" }`.

---

## Considerações Finais / Final Considerations

A API está protegida por autenticação JWT para garantir a segurança dos dados de funcionários. É essencial enviar os tokens corretos para acessar as rotas protegidas. Caso tenha alguma dúvida ou queira contribuir, sinta-se à vontade para abrir uma issue ou um pull request!

The API is protected by JWT authentication to ensure the security of employee data. It is essential to send the correct tokens to access protected routes. If you have any questions or would like to contribute, feel free to open an issue or a pull request!
