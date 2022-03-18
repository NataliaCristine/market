# Market

"Uma API para compras e cadastramento de produtos"

## Como rodar e instalar

Para instalar o sistema, é necessário seguir alguns passos, como baixar o projeto e realizar algumas instalações. Para isso, é necessário abrir uma aba do terminal e digitar o seguinte código.

### Esse passo é baixar o projeto

https://github.com/NataliaCristine/market.git

### Entrar na pasta

market

### Copiar o env.example

Copiar o arquivo .env.example e renomear com .env. Nele devem ser colocadas suas credenciais

Instalar as depedências deve rodar:

docker-compose up

Rodar as futuras migrações
docker exec nomedocker yarn typeorm migration:generate -n nome
docker exec nomedocker yarn typeorm migration:run

## Utilização

Para utilizar deve utilizar um API Client como Insomnia. No localhost:3000.
A documentação vc pode acessar com o localhost:3000//api-documentation

### Exemplos de uso

### Rotas

POST /user
Esta rota cadastra o usuário

REQUEST:

{
"name": "nome",
"email": "nome@mail.com",
"password": "senha de seis numeros",
"isAdmin": booleano
}

RESPONSE STATUS -> HTTP 201 (created)

{
"name": "nome,
"email": "nome@mail.com",
"isAdmin": false,
"recoverPass": null,
"uuid": "df7a7885-01d4-4f70-91a6-49876b60ed2d",
"createdOn": "2022-02-09T20:16:20.221Z",
"updatedOn": "2022-02-09T20:16:20.221Z"
}

GET /user
Esta rota retorna o usuário apenas o Administradores tem acesso.
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 200 (ok)
[
{
"name": "nome,
"email": "nome@mail.com",
"isAdmin": false,
"uuid": "df7a7885-01d4-4f70-91a6-49876b60ed2d",
"createdOn": "2022-02-09T20:16:20.221Z",
"updatedOn": "2022-02-09T20:16:20.221Z"
}
]

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Unauthorized"
}

GET /user/uuids
Esta rota retorna o usuário apenas o próprio usuário e o Administradores tem acesso.O Parâmetro após product é o uuid do usuário.
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 200 (ok)

{
"name": "nome,
"email": "nome@mail.com",
"isAdmin": false,
"uuid": "df7a7885-01d4-4f70-91a6-49876b60ed2d",
"createdOn": "2022-02-09T20:16:20.221Z",
"updatedOn": "2022-02-09T20:16:20.221Z"
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Unauthorized"
}

POST /product
Esta rota cadastra produtos apenas o Administradores tem acesso.
Necessário token no header.

Authorization: Bearer Token

RESQUEST

{
"name":"casaco",
"price": 3
}

RESPONSE STATUS -> HTTP 201 (created)

{
"name":"casaco",
"price": 3,
"uuid": "a44a45b7-338e-4367-ac36-770219fe42a8"
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Unauthorized"
}

GET /product
Esta rota retorna os produtos.
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 200 (ok)
[
{
"uuid": "423ab97f-0293-4217-91bd-3d8f6c29f9b8",
"name": "casaco",
"price": 3
}
]

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

GET /product/uuids
Esta rota retorna os produtos. O Parâmetro após product é o uuid do produto.
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 200 (ok)
[
{
"uuid": "423ab97f-0293-4217-91bd-3d8f6c29f9b8",
"name": "casaco",
"price": 3
}
]

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

POST /cart
Esta rota cadastra produtos no carrinho.
Necessário token no header.

Authorization: Bearer Token

REQUEST

Deve ser passado o uuid do produto.

{
"product_uuid":"a44a45b7-338e-4367-ac36-770219fe42a8"
}

RESPONSE STATUS -> HTTP 201 (CREATED)
{
"uuid": "0cddd774-bf94-461c-9e20-4f74bdc0ee0d",
"product": [
{
"uuid": "423ab97f-0293-4217-91bd-3d8f6c29f9b8",
"name": "casaco",
"price": 3
}
]
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

GET /cart
Esta rota retorna carrinho e seus produtos.
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 200 (ok)

[
{
"uuid": "0cddd774-bf94-461c-9e20-4f74bdc0ee0d",
"product": [
{
"uuid": "423ab97f-0293-4217-91bd-3d8f6c29f9b8",
"name": "casaco",
"price": 3
}
]
}
]

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

GET /cart/uuids
Esta rota retorna carrinho e seus produtos.O Parâmetro após cart é o uuid do cart.
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 200 (ok)

{
"uuid": "0cddd774-bf94-461c-9e20-4f74bdc0ee0d",
"product": [
{
"uuid": "423ab97f-0293-4217-91bd-3d8f6c29f9b8",
"name": "casaco",
"price": 3
}
]
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

DELETE /cart/uuids
Esta rota retorna carrinho e seus produtos.O Parâmetro após cart é o uuid do produto.
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 204 (ok)
No body returned for response

POST /buy
Esta rota deleta os produtos do carrinho. Apenas o proprio usuário pode adicionar ao carrinho.
Necessário token no header.

Authorization: Bearer Token

REQUISIÇAO: Está rota não tem requisição.

RESPONSE STATUS -> HTTP 201 (created)

{
"user": {
"uuid": "89c6b374-b122-4ed2-8yyed-b9446becc2c",
"name": "nome",
"email": "nome@mail.com",
"password": "$2b$06$weDLtlwPcJ9/dmHjkdskjhfsdkjhfT/Vmpj2vMFmJ8MfPt4mL4DybjCa",
"isAdmin": true,
"createdOn": "2022-02-08T23:19:30.004Z",
"updatedOn": "2022-02-08T23:19:30.004Z",
"recoverPass": null
},
"product": [
{
"uuid": "a44a45b7-338e-4367-ac36-770219fe42a8",
"name": "casaco",
"price": 3
}
],
"uuid": "c148798f-2ec1-4dc6-94ec-eea50ao0349f"
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

GET /buy
Esta rota retorna compras do carrinho. Apenas o administrador tem acesso
Necessário token no header.

Authorization: Bearer Token

RESPONSE STATUS -> HTTP 200 (ok)

[{
"user": {
"uuid": "89c6b374-b122-4ed2-8yyed-b9446becc2c",
"name": "nome",
"email": "nome@mail.com",
"password": "$2b$06$weDLtlwPcJ9/dmHjkdskjhfsdkjhfT/Vmpj2vMFmJ8MfPt4mL4DybjCa",
"isAdmin": true,
"createdOn": "2022-02-08T23:19:30.004Z",
"updatedOn": "2022-02-08T23:19:30.004Z",
"recoverPass": null
},
"product": [
{
"uuid": "a44a45b7-338e-4367-ac36-770219fe42a8",
"name": "casaco",
"price": 3
}
],
"uuid": "c148798f-2ec1-4dc6-94ec-eea50ao0349f"
}
]

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

GET /buy/uuids
Esta rota retorna compras do carrinho. Apenas o dono tem acesso tem acesso.O Parâmetro após buy é o uuid da compra.
Necessário token no header.

Authorization: Bearer Token

Está rota não tem requisição.

RESPONSE STATUS -> HTTP 200 (ok)

{
"user": {
"uuid": "89c6b374-b122-4ed2-8yyed-b9446becc2c",
"name": "nome",
"email": "nome@mail.com",
"password": "$2b$06$weDLtlwPcJ9/dmHjkdskjhfsdkjhfT/Vmpj2vMFmJ8MfPt4mL4DybjCa",
"isAdmin": true,
"createdOn": "2022-02-08T23:19:30.004Z",
"updatedOn": "2022-02-08T23:19:30.004Z",
"recoverPass": null
},
"product": [
{
"uuid": "a44a45b7-338e-4367-ac36-770219fe42a8",
"name": "casaco",
"price": 3
}
],
"uuid": "c148798f-2ec1-4dc6-94ec-eea50ao0349f"
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing admin permissions"
}

POST /email
Esta rota envia email
Necessário token no header.

Authorization: Bearer Token

REQUEST STATUS -> HTTP 201 (created)

{
"email":"nana@gmail.com",
"subject":"olá",
"mensagem":"haha"
}

RESPONSE STATUS -> HTTP 201 (created)

{
"messagem": "Send email"
}

RESPONSE STATUS -> HTTP 401 (Unauthorized)

{
"message": "Missing authorization headers"
}

POST /recuperar
Esta rota envia email com o codigo

REQUEST STATUS -> HTTP 201 (created)

{
"email":"nana@gmail.com"

}

RESPONSE STATUS -> HTTP 201 (created)

{
"messagem": "Send email"
}

POST /alterar_senha
Esta rota altera senha do usuario através do código

REQUEST STATUS -> HTTP 201 (created)

{
"codigo":"34f38c66-cad6-4821-bf13-c7d3bff44cf5",
"email":"nana@gmail.com"

}

RESPONSE STATUS -> HTTP 201 (created)

{
"messagem": "Send email"
}
