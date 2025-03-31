/*
  Warnings:

  - You are about to drop the `requisitos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "requisitos" DROP CONSTRAINT "requisitos_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "requisitos" TEXT[];

-- DropTable
DROP TABLE "requisitos";
