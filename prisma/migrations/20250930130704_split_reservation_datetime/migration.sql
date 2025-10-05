-- AlterTable
ALTER TABLE "public"."Equipement" ADD COLUMN     "price" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "state" TEXT DEFAULT 'AVAILABLE';

-- CreateTable
CREATE TABLE "public"."ReservationEquipement" (
    "reservationId" INTEGER NOT NULL,
    "equipementId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION,
    "state" TEXT,

    CONSTRAINT "ReservationEquipement_pkey" PRIMARY KEY ("reservationId","equipementId")
);

-- AddForeignKey
ALTER TABLE "public"."ReservationEquipement" ADD CONSTRAINT "ReservationEquipement_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "public"."Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReservationEquipement" ADD CONSTRAINT "ReservationEquipement_equipementId_fkey" FOREIGN KEY ("equipementId") REFERENCES "public"."Equipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
