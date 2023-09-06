-- CreateTable
CREATE TABLE `products` (
    `code` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `costprice` DECIMAL(9, 2) NOT NULL,
    `salesprice` DECIMAL(9, 2) NOT NULL,

    UNIQUE INDEX `products_name_key`(`name`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
