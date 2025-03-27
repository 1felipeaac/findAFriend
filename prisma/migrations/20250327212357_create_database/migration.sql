-- CreateEnum
CREATE TYPE "Idade" AS ENUM ('FILHOTE', 'ADULTO', 'IDOSO');

-- CreateEnum
CREATE TYPE "Porte" AS ENUM ('PEQUENINO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "Energina" AS ENUM ('BAIXA', 'ALTA');

-- CreateEnum
CREATE TYPE "Independencia" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "Ambiente" AS ENUM ('RESTRITO', 'AMPLO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ORG');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'ORG',

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "idade" "Idade" NOT NULL,
    "porte" "Porte" NOT NULL,
    "energia" "Energina" NOT NULL,
    "independencia" "Independencia" NOT NULL,
    "ambiente" "Ambiente" NOT NULL,
    "fotos" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requisitos" (
    "id" TEXT NOT NULL,
    "requisito" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "requisitos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_whatsapp_key" ON "orgs"("whatsapp");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requisitos" ADD CONSTRAINT "requisitos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
