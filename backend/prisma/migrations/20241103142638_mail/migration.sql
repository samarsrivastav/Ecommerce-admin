/*
  Warnings:

  - Added the required column `mail` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "mail" TEXT NOT NULL;
