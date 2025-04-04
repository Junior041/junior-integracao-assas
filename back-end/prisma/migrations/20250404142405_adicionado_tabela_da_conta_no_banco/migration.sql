-- CreateTable
CREATE TABLE `BankAccount` (
    `idBankAccount` VARCHAR(191) NOT NULL,
    `idAccount` VARCHAR(191) NOT NULL,
    `bank` VARCHAR(191) NOT NULL,
    `fkPessoa` VARCHAR(191) NOT NULL,
    `incomeValue` DOUBLE NOT NULL,
    `agency` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `accountDigit` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fkUserCreate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idBankAccount`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BankAccount` ADD CONSTRAINT `BankAccount_fkPessoa_fkey` FOREIGN KEY (`fkPessoa`) REFERENCES `Pessoa`(`id_pessoa`) ON DELETE RESTRICT ON UPDATE CASCADE;
