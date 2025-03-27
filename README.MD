# APP

Find a Friend

### Install / Libs

> Preparar projeto para trabalhar com Typescript; Executar diretamente com .ts

```javascript
npm i typescript @types/node tsx tsup -D
npm i -D tsx
```

Instalar Framework para criar API e servidores HTTP; Plugins para Token JWT e Cookies

```javascript
npm i fastify
npm i @fastify/jwt
npm i @fastify/cookie
```

> Carregar Vaariáveis de Ambiente

```javascript
npm i dotenv
```

> Validação de esquemas

```javascript
npm i zod
```

> ORM para integração e gerenciamento do banco de dados

```javascript
npm i prisma -D
npm i @prisma/client
```

> Criptografar senha; Definir tipagem

```javascript
npm i bcryptjs
npm i -D @types/bcryptjs
```

> Framework de testes; Simular Requisições HTTP em testes

```javascript
npm i vitest vite-tsconfig-paths -D
npm i -D @vitest/ui
npm i supertest -D
npm i --save-dev @types/supertest
```

### Executar pacotes

> Gerar arquico de configuração 

```javascript
npx tsc --init
```

> Inicializa o Prisma e cria os arquivos de configuração; Prisma Client; Executa a migração de banco de dados

```javascript
npx prisma init 
npx prisma generate
npx prisma migrate dev
```
