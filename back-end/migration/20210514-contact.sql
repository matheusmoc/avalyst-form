CREATE TABLE IF NOT EXISTS `contact` (
    `contactId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `dateCreated` DATETIME NOT NULL,
    `dateUpdated` DATETIME NOT NULL,
    PRIMARY KEY (`contactId`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `contact_phone` (
    `contactPhoneId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `contactId` INT UNSIGNED NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`contactPhoneId`),
    INDEX (`contactId`),
    CONSTRAINT `fk_contact_phone_contact` FOREIGN KEY (`contactId`) REFERENCES `contact`(`contactId`) ON DELETE CASCADE
) ENGINE=InnoDB;