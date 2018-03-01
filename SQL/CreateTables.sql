-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema scheduledb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema scheduledb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scheduledb` DEFAULT CHARACTER SET utf8 ;
USE `scheduledb` ;

-- -----------------------------------------------------
-- Table `scheduledb`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduledb`.`USER` (
  `USERID` INT NOT NULL AUTO_INCREMENT,
  `USERNAME` VARCHAR(45) NULL,
  `USERPASSWORD` VARCHAR(255) NULL,
  `USERTOKEN` VARCHAR(45) NULL,
  PRIMARY KEY (`USERID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduledb`.`SCHEDULE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduledb`.`SCHEDULE` (
  `SCHEDULEID` INT NOT NULL AUTO_INCREMENT,
  `SCHEDULENAME` VARCHAR(45) NULL,
  `USERID` INT NOT NULL,
  PRIMARY KEY (`SCHEDULEID`, `USERID`),
  INDEX `fk_SCHEDULE_USER1_idx` (`USERID` ASC),
  CONSTRAINT `fk_SCHEDULE_USER1`
    FOREIGN KEY (`USERID`)
    REFERENCES `scheduledb`.`USER` (`USERID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduledb`.`WEEK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduledb`.`WEEK` (
  `WEEKID` INT NOT NULL AUTO_INCREMENT,
  `WEEKNUMBER` INT NULL,
  `WEEKNAME` VARCHAR(45) NULL,
  `SCHEDULEID` INT NOT NULL,
  PRIMARY KEY (`WEEKID`, `SCHEDULEID`),
  INDEX `fk_WEEK_SCHEDULE_idx` (`SCHEDULEID` ASC),
  CONSTRAINT `fk_WEEK_SCHEDULE`
    FOREIGN KEY (`SCHEDULEID`)
    REFERENCES `scheduledb`.`SCHEDULE` (`SCHEDULEID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduledb`.`DAY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduledb`.`DAY` (
  `DAYID` INT NOT NULL AUTO_INCREMENT,
  `DAYNAME` VARCHAR(45) NULL,
  `WEEKID` INT NOT NULL,
  `SCHEDULEID` INT NOT NULL,
  PRIMARY KEY (`DAYID`, `WEEKID`, `SCHEDULEID`),
  INDEX `fk_DAY_WEEK1_idx` (`WEEKID` ASC, `SCHEDULEID` ASC),
  CONSTRAINT `fk_DAY_WEEK1`
    FOREIGN KEY (`WEEKID` , `SCHEDULEID`)
    REFERENCES `scheduledb`.`WEEK` (`WEEKID` , `SCHEDULEID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scheduledb`.`PAIR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scheduledb`.`PAIR` (
  `PAIRID` INT NOT NULL AUTO_INCREMENT,
  `PAIRNAME` VARCHAR(45) NULL,
  `PAIRAUDITORY` VARCHAR(45) NULL,
  `PAIRTEACHER` VARCHAR(45) NULL,
  `PAIRCOLOR` VARCHAR(45) NULL,
  `PAIRTYPE` VARCHAR(45) NULL,
  `SYSTEMTYPE` VARCHAR(45) NULL,
  `DAYID` INT NOT NULL,
  `WEEKID` INT NOT NULL,
  `SCHEDULEID` INT NOT NULL,
  PRIMARY KEY (`PAIRID`, `DAYID`, `WEEKID`, `SCHEDULEID`),
  INDEX `fk_PAIR_DAY1_idx` (`DAYID` ASC, `WEEKID` ASC, `SCHEDULEID` ASC),
  CONSTRAINT `fk_PAIR_DAY1`
    FOREIGN KEY (`DAYID` , `WEEKID` , `SCHEDULEID`)
    REFERENCES `scheduledb`.`DAY` (`DAYID` , `WEEKID` , `SCHEDULEID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
