-- CreateTable
CREATE TABLE "performanceMetrics" (
    "id" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,
    "metricType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "performanceMetrics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "performanceMetrics" ADD CONSTRAINT "performanceMetrics_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
