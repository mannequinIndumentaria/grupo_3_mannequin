-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mannequin_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mannequin_db` ;

-- -----------------------------------------------------
-- Schema mannequin_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mannequin_db` DEFAULT CHARACTER SET utf8 ;
USE `mannequin_db` ;

-- -----------------------------------------------------
-- Table `mannequin_db`.`genders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`genders` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`genders` (
  `idgenders` INT(1) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idgenders`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`countries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`countries` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`countries` (
  `idcountries` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcountries`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`users` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`users` (
  `idusers` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `birth_date` DATE NULL DEFAULT NULL,
  `document` VARCHAR(45) NULL DEFAULT NULL,
  `avatar` VARCHAR(150) NULL DEFAULT NULL,
  `address_street` VARCHAR(45) NULL DEFAULT NULL,
  `address_number` INT(5) NULL DEFAULT NULL,
  `address_floor` INT(2) NULL DEFAULT NULL,
  `address_dept` VARCHAR(10) NULL DEFAULT NULL,
  `address_post_code` VARCHAR(10) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `telephone` INT(11) NULL DEFAULT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  `genders_idgenders` INT(1) NOT NULL,
  `countries_idcountries` INT(11) NOT NULL,
  `discontinued` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idusers`),
  INDEX `fk_users_genders1_idx` (`genders_idgenders` ASC) ,
  INDEX `fk_users_countries1_idx` (`countries_idcountries` ASC) ,
  CONSTRAINT `fk_users_genders1`
    FOREIGN KEY (`genders_idgenders`)
    REFERENCES `mannequin_db`.`genders` (`idgenders`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_countries1`
    FOREIGN KEY (`countries_idcountries`)
    REFERENCES `mannequin_db`.`countries` (`idcountries`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`cart` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`cart` (
  `idcart` INT(11) NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `users_idusers` INT(11) NOT NULL,
  PRIMARY KEY (`idcart`),
  INDEX `fk_cart_users1_idx` (`users_idusers` ASC) ,
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `mannequin_db`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`product_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`product_categories` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`product_categories` (
  `idproduct_categories` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `active` INT(1) NOT NULL DEFAULT 1,
  `parent` INT(11) NULL DEFAULT 0,
  PRIMARY KEY (`idproduct_categories`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`products` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`products` (
  `idproducts` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) UNSIGNED NOT NULL,
  `creation_timestamp` DATETIME NOT NULL,
  `discontinued_timpestamp` DATETIME NOT NULL,
  `active` INT(1) NOT NULL DEFAULT 1,
  `group` INT(11) NULL DEFAULT NULL,
  `color` VARCHAR(45) NULL DEFAULT NULL,
  `sale` TINYINT(1) NOT NULL DEFAULT 0,
  `new_season` TINYINT(1) NOT NULL DEFAULT 0,
  `discount` INT(3) NOT NULL DEFAULT 0,
  `product_categories_idproduct_categories` INT(11) NOT NULL,
  PRIMARY KEY (`idproducts`),
  INDEX `fk_products_product_categories1_idx` (`product_categories_idproduct_categories` ASC) ,
  CONSTRAINT `fk_products_product_categories1`
    FOREIGN KEY (`product_categories_idproduct_categories`)
    REFERENCES `mannequin_db`.`product_categories` (`idproduct_categories`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`favorites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`favorites` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`favorites` (
  `products_idproducts` INT(11) NOT NULL,
  `users_idusers` INT(11) NOT NULL,
  PRIMARY KEY (`products_idproducts`, `users_idusers`),
  INDEX `fk_favorites_products1_idx` (`products_idproducts` ASC) ,
  INDEX `fk_favorites_users1_idx` (`users_idusers` ASC) ,
  CONSTRAINT `fk_favorites_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `mannequin_db`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorites_users1`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `mannequin_db`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`images` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`images` (
  `idimage` INT(11) NOT NULL,
  `file_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idimage`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`products_has_images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`products_has_images` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`products_has_images` (
  `products_idproducts` INT(11) NOT NULL,
  `images_idimage` INT(11) NOT NULL,
  PRIMARY KEY (`products_idproducts`, `images_idimage`),
  INDEX `fk_products_has_images_images1_idx` (`images_idimage` ASC) ,
  INDEX `fk_products_has_images_products1_idx` (`products_idproducts` ASC) ,
  CONSTRAINT `fk_products_has_images_images1`
    FOREIGN KEY (`images_idimage`)
    REFERENCES `mannequin_db`.`images` (`idimage`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_images_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `mannequin_db`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`sizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`sizes` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`sizes` (
  `idsizes` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idsizes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`subscribers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`subscribers` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`subscribers` (
  `idsubscribers` INT(11) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `active` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idsubscribers`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`products_has_sizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`products_has_sizes` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`products_has_sizes` (
  `products_idproducts` INT(11) NOT NULL,
  `sizes_idsizes` INT(11) NOT NULL,
  `stock` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`products_idproducts`, `sizes_idsizes`),
  INDEX `fk_products_has_sizes_sizes1_idx` (`sizes_idsizes` ASC) ,
  INDEX `fk_products_has_sizes_products1_idx` (`products_idproducts` ASC) ,
  CONSTRAINT `fk_products_has_sizes_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `mannequin_db`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_sizes_sizes1`
    FOREIGN KEY (`sizes_idsizes`)
    REFERENCES `mannequin_db`.`sizes` (`idsizes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mannequin_db`.`cart_has_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mannequin_db`.`cart_has_products` ;

CREATE TABLE IF NOT EXISTS `mannequin_db`.`cart_has_products` (
  `cart_idcart` INT(11) NOT NULL,
  `products_idproducts` INT(11) NOT NULL,
  `sizes_idsizes` INT(11) NOT NULL,
  `purchase_date` DATE NULL,
  `purchase_time` TIME NULL,
  PRIMARY KEY (`cart_idcart`, `products_idproducts`, `sizes_idsizes`),
  INDEX `fk_cart_has_products_products1_idx` (`products_idproducts` ASC) ,
  INDEX `fk_cart_has_products_cart1_idx` (`cart_idcart` ASC) ,
  INDEX `fk_cart_has_products_sizes1_idx` (`sizes_idsizes` ASC) ,
  CONSTRAINT `fk_cart_has_products_cart1`
    FOREIGN KEY (`cart_idcart`)
    REFERENCES `mannequin_db`.`cart` (`idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_has_products_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `mannequin_db`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_has_products_sizes1`
    FOREIGN KEY (`sizes_idsizes`)
    REFERENCES `mannequin_db`.`sizes` (`idsizes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
