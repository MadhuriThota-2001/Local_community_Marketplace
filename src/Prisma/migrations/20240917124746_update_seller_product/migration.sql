/*
  Warnings:

  - The primary key for the `SellerProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `SellerProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SellerProduct" DROP CONSTRAINT "SellerProduct_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SellerProduct_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SellerProduct_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "SellerProduct_id_key" ON "SellerProduct"("id");
