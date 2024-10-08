/*
  Warnings:

  - The primary key for the `athletes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `athletes` table. All the data in the column will be lost.
  - The required column `uid` was added to the `athletes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "athletes" DROP CONSTRAINT "athletes_pkey",
DROP COLUMN "id",
ADD COLUMN     "uid" TEXT NOT NULL,
ADD CONSTRAINT "athletes_pkey" PRIMARY KEY ("uid");
