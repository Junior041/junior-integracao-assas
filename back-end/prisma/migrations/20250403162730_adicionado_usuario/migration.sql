-- CreateTable
CREATE TABLE `Usuario` (
    `fk_pessoa` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_fk_pessoa_key`(`fk_pessoa`),
    UNIQUE INDEX `Usuario_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_fk_pessoa_fkey` FOREIGN KEY (`fk_pessoa`) REFERENCES `Pessoa`(`id_pessoa`) ON DELETE RESTRICT ON UPDATE CASCADE;
