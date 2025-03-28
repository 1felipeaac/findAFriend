/*
  Warnings:

  - You are about to drop the column `cep` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgId]` on the table `endereco` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "endereco" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "cep",
DROP COLUMN "endereco";

-- CreateIndex
CREATE UNIQUE INDEX "endereco_orgId_key" ON "endereco"("orgId");

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
