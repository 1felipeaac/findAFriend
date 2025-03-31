/*
  Warnings:

  - Added the required column `especie` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('CACHORRO', 'GATO');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "especie" "Especie" NOT NULL;
