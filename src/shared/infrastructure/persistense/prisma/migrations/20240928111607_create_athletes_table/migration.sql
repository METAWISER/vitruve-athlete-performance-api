/*
  Warnings:

  - You are about to drop the `Athlete` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Athlete";

-- CreateTable
CREATE TABLE "athletes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "athletes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "athletes_email_key" ON "athletes"("email");
