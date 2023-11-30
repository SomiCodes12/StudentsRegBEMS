-- CreateTable
CREATE TABLE "infoModel" (
    "id" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "avatarID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "infoModel_pkey" PRIMARY KEY ("id")
);
