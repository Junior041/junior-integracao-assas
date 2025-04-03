-- CreateTable
CREATE TABLE `Pessoa` (
    `id_pessoa` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `cpf_cnpj` VARCHAR(14) NOT NULL,
    `fk_user_create` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Pessoa_cpf_cnpj_key`(`cpf_cnpj`),
    PRIMARY KEY (`id_pessoa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
