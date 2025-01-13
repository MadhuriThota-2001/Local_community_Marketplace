/*
  Warnings:

  - You are about to drop the column `payment_intent` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_url` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payment_intent",
DROP COLUMN "receipt_url";
