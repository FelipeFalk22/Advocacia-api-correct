SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema advocacia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `advocacia` ;
USE `advocacia` ;

-- -----------------------------------------------------
-- Table `advocacia`.`advogado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advocacia`.`advogado` ;

CREATE TABLE IF NOT EXISTS `advocacia`.`advogado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `oab` VARCHAR(50) NOT NULL,
  `especialidade` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advocacia`.`processo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advocacia`.`processo` ;

CREATE TABLE IF NOT EXISTS `advocacia`.`processo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_advogado` INT NOT NULL,
  `numero` VARCHAR(50) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `status` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_processo_advogado_idx` (`id_advogado` ASC),
  CONSTRAINT `fk_processo_advogado`
    FOREIGN KEY (`id_advogado`)
    REFERENCES `advocacia`.`advogado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Dados iniciais (opcional)
-- -----------------------------------------------------
START TRANSACTION;
USE `advocacia`;

INSERT INTO `advocacia`.`advogado` (`id`, `nome`, `oab`, `especialidade`)
VALUES (DEFAULT, 'Dr. Felipe Almeida', '12345-DF', 'Trabalhista');

INSERT INTO `advocacia`.`processo` (`id`, `id_advogado`, `numero`, `descricao`, `status`)
VALUES 
(DEFAULT, 1, 'PROC-2025-001', 'Ação trabalhista contra Empresa X', 'Em andamento'),
(DEFAULT, 1, 'PROC-2025-002', 'Recurso de indenização', 'Concluído');

COMMIT;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
