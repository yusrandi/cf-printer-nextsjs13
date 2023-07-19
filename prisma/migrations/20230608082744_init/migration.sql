-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'PAKAR', 'USER') NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kerusakan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kerusakanCode` VARCHAR(191) NULL,
    `kerusakanName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Kerusakan_kerusakanCode_key`(`kerusakanCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evidence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `evidenceCode` VARCHAR(191) NOT NULL,
    `evidenceName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Evidence_evidenceCode_key`(`evidenceCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengetahuan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kerusakanId` INTEGER NOT NULL,
    `evidenceId` INTEGER NOT NULL,
    `bobot` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengetahuan` ADD CONSTRAINT `Pengetahuan_kerusakanId_fkey` FOREIGN KEY (`kerusakanId`) REFERENCES `Kerusakan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengetahuan` ADD CONSTRAINT `Pengetahuan_evidenceId_fkey` FOREIGN KEY (`evidenceId`) REFERENCES `Evidence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
