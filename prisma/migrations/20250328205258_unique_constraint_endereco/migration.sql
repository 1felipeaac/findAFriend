/*
  Warnings:

  - A unique constraint covering the columns `[logradouro,numero]` on the table `endereco` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "endereco_logradouro_numero_key" ON "endereco"("logradouro", "numero");
