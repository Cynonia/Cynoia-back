/*
  Warnings:

  - You are about to drop the column `endAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ReservationStatus" AS ENUM ('EN_ATTENTE', 'CONFIRMEE', 'REJETEE', 'ANNULEE');

-- AlterTable
ALTER TABLE "public"."Espace" ADD COLUMN     "capacity" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "pricePerHour" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Reservation" DROP COLUMN "endAt",
DROP COLUMN "startAt",
ADD COLUMN     "endTime" TIME NOT NULL,
ADD COLUMN     "reservationDate" DATE NOT NULL,
ADD COLUMN     "startTime" TIME NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
