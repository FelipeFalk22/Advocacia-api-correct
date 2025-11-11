-- -----------------------------------------------------
-- Banco de Dados: advocacia
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `advocacia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `advocacia`;

-- -----------------------------------------------------
-- Tabela: usuario
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(80) NOT NULL UNIQUE,
  `senha` VARCHAR(64) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: advogado
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advogado`;

CREATE TABLE `advogado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `oab` VARCHAR(30) NOT NULL UNIQUE,
  `especialidade` VARCHAR(100) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: processo
-- -----------------------------------------------------
DROP TABLE IF EXISTS `processo`;

CREATE TABLE `processo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_advogado` INT NOT NULL,
  `numero_processo` VARCHAR(100) NOT NULL UNIQUE,
  `descricao` TEXT NULL,
  `status` VARCHAR(50) NULL DEFAULT 'em andamento',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_processo_advogado_idx` (`id_advogado` ASC),
  CONSTRAINT `fk_processo_advogado`
    FOREIGN KEY (`id_advogado`)
    REFERENCES `advogado` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Dados iniciais (opcional)
-- -----------------------------------------------------
START TRANSACTION;

INSERT INTO `usuario` (`nome`, `email`, `senha`)
VALUES ('Felipe', 'felipe123@gmail.com', 'teste123');

INSERT INTO `advogado` (`nome`, `oab`, `especialidade`)
VALUES ('Edinilson', '111222', 'Trabalhista');

INSERT INTO `processo` (`id_advogado`, `numero_processo`, `descricao`, `status`)
VALUES
  (1, 'PROC-001', 'Reclamação trabalhista contra empresa XPTO', 'em andamento'),
  (1, 'PROC-002', 'Ação de horas extras', 'arquivado');

COMMIT;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
