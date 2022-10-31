-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "github_token" TEXT NOT NULL,
    "github_token_expires" INTEGER NOT NULL,
    "github_user" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
