-- CreateTable
CREATE TABLE "public"."Invitation" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "entitiesId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_entitiesId_key" ON "public"."Invitation"("email", "entitiesId");

-- AddForeignKey
ALTER TABLE "public"."Invitation" ADD CONSTRAINT "Invitation_entitiesId_fkey" FOREIGN KEY ("entitiesId") REFERENCES "public"."Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
