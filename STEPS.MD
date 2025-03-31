1. Iniciar Projeto
   * `npm init -y`
2. Variaveis de Ambiente
   * src/env/index.ts
     * validar (zod)
3. Banco de Dados
   1. Iniciar Prisma

      * `npx prisma init`
      * Criar schemas (models, relations)
        * `npx prisma generate`
   2. Iniciar Banco de Dados

      * `docker compose up -d`
   3. Criar tabelas

      * `npx prisma migrate dev`
   4. Services (Inicio)

      * Org
        * Register (Cadastrar Org)
          * Testes Unitarios
      * Pet
   5. Controllers

      * Register (Cadastrar ORG)
