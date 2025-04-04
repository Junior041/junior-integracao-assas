-- CreateTable
CREATE TABLE `enderecos` (
    `id_endereco` VARCHAR(191) NOT NULL,
    `fk_pessoa` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `rua` VARCHAR(255) NOT NULL,
    `numero` VARCHAR(20) NULL,
    `complemento` VARCHAR(255) NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,
    `pais` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `enderecos_fk_pessoa_fkey` FOREIGN KEY (`fk_pessoa`) REFERENCES `Pessoa`(`id_pessoa`) ON DELETE RESTRICT ON UPDATE CASCADE;
