/*
  Warnings:

  - You are about to drop the column `Estado` on the `endereco` table. All the data in the column will be lost.
  - Added the required column `estado` to the `endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "Estado",
ADD COLUMN     "estado" "Estados" NOT NULL;
