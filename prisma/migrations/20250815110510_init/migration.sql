-- CreateTable
CREATE TABLE "public"."Entity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "couleur" TEXT,
    "avatar" TEXT,
    "domaine" TEXT,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "entitiesId" INTEGER,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "roleId" INTEGER,
    "entitiesId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Espace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surface" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "validation" BOOLEAN NOT NULL DEFAULT false,
    "entitiesId" INTEGER,
    "typeEspacesId" INTEGER,

    CONSTRAINT "Espace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TypeEspace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TypeEspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Equipement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imgCover" TEXT,
    "entitiesId" INTEGER,

    CONSTRAINT "Equipement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EquipementsOnEspaces" (
    "equipementsId" INTEGER NOT NULL,
    "espacesId" INTEGER NOT NULL,

    CONSTRAINT "EquipementsOnEspaces_pkey" PRIMARY KEY ("equipementsId","espacesId")
);

-- CreateTable
CREATE TABLE "public"."Reservation" (
    "id" SERIAL NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "espacesId" INTEGER,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" SERIAL NOT NULL,
    "reservationsId" INTEGER NOT NULL,
    "paymentmodeId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PaymentMode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentMode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "public"."User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_reservationsId_key" ON "public"."Transaction"("reservationsId");

-- AddForeignKey
ALTER TABLE "public"."Role" ADD CONSTRAINT "Role_entitiesId_fkey" FOREIGN KEY ("entitiesId") REFERENCES "public"."Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_entitiesId_fkey" FOREIGN KEY ("entitiesId") REFERENCES "public"."Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Espace" ADD CONSTRAINT "Espace_entitiesId_fkey" FOREIGN KEY ("entitiesId") REFERENCES "public"."Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Espace" ADD CONSTRAINT "Espace_typeEspacesId_fkey" FOREIGN KEY ("typeEspacesId") REFERENCES "public"."TypeEspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Equipement" ADD CONSTRAINT "Equipement_entitiesId_fkey" FOREIGN KEY ("entitiesId") REFERENCES "public"."Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EquipementsOnEspaces" ADD CONSTRAINT "EquipementsOnEspaces_equipementsId_fkey" FOREIGN KEY ("equipementsId") REFERENCES "public"."Equipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EquipementsOnEspaces" ADD CONSTRAINT "EquipementsOnEspaces_espacesId_fkey" FOREIGN KEY ("espacesId") REFERENCES "public"."Espace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_espacesId_fkey" FOREIGN KEY ("espacesId") REFERENCES "public"."Espace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_reservationsId_fkey" FOREIGN KEY ("reservationsId") REFERENCES "public"."Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_paymentmodeId_fkey" FOREIGN KEY ("paymentmodeId") REFERENCES "public"."PaymentMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
