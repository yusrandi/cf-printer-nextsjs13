/*
  Warnings:

  - Added the required column `perbaikan` to the `Kerusakan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Kerusakan` ADD COLUMN `perbaikan` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Diagnosa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kerusakanId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `nilai` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diagnosa` ADD CONSTRAINT `Diagnosa_kerusakanId_fkey` FOREIGN KEY (`kerusakanId`) REFERENCES `Kerusakan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosa` ADD CONSTRAINT `Diagnosa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
