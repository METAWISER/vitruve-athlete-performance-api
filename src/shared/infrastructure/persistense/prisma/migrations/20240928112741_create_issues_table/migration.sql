-- CreateEnum
CREATE TYPE "IssueLevel" AS ENUM ('INFO', 'ERROR', 'WARN');

-- CreateTable
CREATE TABLE "issues" (
    "id" TEXT NOT NULL,
    "level" "IssueLevel" NOT NULL,
    "message" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "status_code_idx" ON "issues"("statusCode");

-- CreateIndex
CREATE INDEX "issue_level_idx" ON "issues"("level");
