/*
  Warnings:

  - Changed the type of `energia` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Energia" AS ENUM ('BAIXA', 'ALTA');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energia",
ADD COLUMN     "energia" "Energia" NOT NULL;

-- DropEnum
DROP TYPE "Energina";
