-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.19-log - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para clinica
CREATE DATABASE IF NOT EXISTS `clinica` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `clinica`;

-- Volcando estructura para tabla clinica.dias_laborales
CREATE TABLE IF NOT EXISTS `dias_laborales` (
  `id_diasLaborales` int(11) NOT NULL AUTO_INCREMENT,
  `id_medico` int(11) NOT NULL DEFAULT '0',
  `fecha_laboral` date DEFAULT NULL,
  PRIMARY KEY (`id_diasLaborales`),
  KEY `FK_dias_libres_medico` (`id_medico`),
  CONSTRAINT `FK_dias_libres_medico` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.dias_laborales: ~0 rows (aproximadamente)
DELETE FROM `dias_laborales`;
/*!40000 ALTER TABLE `dias_laborales` DISABLE KEYS */;
/*!40000 ALTER TABLE `dias_laborales` ENABLE KEYS */;

-- Volcando estructura para tabla clinica.especialidad
CREATE TABLE IF NOT EXISTS `especialidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.especialidad: ~3 rows (aproximadamente)
DELETE FROM `especialidad`;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` (`id`, `nombre`) VALUES
	(1, 'Medicina Interna'),
	(2, 'Urgencias'),
	(3, 'Traumatologia');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;

-- Volcando estructura para tabla clinica.horario
CREATE TABLE IF NOT EXISTS `horario` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `id_h_medico` int(11) DEFAULT '0',
  `id_h_turno` int(11) DEFAULT '0',
  PRIMARY KEY (`id_horario`),
  KEY `FK_horario_medico` (`id_h_medico`),
  KEY `FK_horario_turno` (`id_h_turno`),
  CONSTRAINT `FK_horario_medico` FOREIGN KEY (`id_h_medico`) REFERENCES `medico` (`id`),
  CONSTRAINT `FK_horario_turno` FOREIGN KEY (`id_h_turno`) REFERENCES `turno` (`id_turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.horario: ~0 rows (aproximadamente)
DELETE FROM `horario`;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;

-- Volcando estructura para tabla clinica.informacion
CREATE TABLE IF NOT EXISTS `informacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `telefono` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL DEFAULT '0',
  `direccion` varchar(50) NOT NULL DEFAULT '0',
  `localidad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.informacion: ~0 rows (aproximadamente)
DELETE FROM `informacion`;
/*!40000 ALTER TABLE `informacion` DISABLE KEYS */;
INSERT INTO `informacion` (`id`, `nombre`, `telefono`, `email`, `direccion`, `localidad`) VALUES
	(1, 'Clinica Atom', '629950722', 'clinicaatom@medicina.com', 'plaza mayor 30 ', 'Pozo-Lorente');
/*!40000 ALTER TABLE `informacion` ENABLE KEYS */;

-- Volcando estructura para tabla clinica.medico
CREATE TABLE IF NOT EXISTS `medico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `id_especialidad` int(11) NOT NULL DEFAULT '0',
  `foto` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_especialidad` (`id_especialidad`),
  CONSTRAINT `id_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.medico: ~6 rows (aproximadamente)
DELETE FROM `medico`;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` (`id`, `nombre`, `id_especialidad`, `foto`) VALUES
	(1, 'Dra.Antonia Perez', 1, 'images/1.jpg'),
	(2, 'Dra.Monica Lopez', 2, 'images/3.jpg'),
	(3, 'Dr.Felix Ferran', 3, 'images/4.jpg'),
	(4, 'Dr.Ivan Iñiguez', 1, 'images/2.jpg'),
	(6, 'Dr.David Ozoño', 2, 'images/5.jpg'),
	(7, 'Dr.Lucas Carrion', 3, 'images/6.jpg');
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;

-- Volcando estructura para tabla clinica.tramo
CREATE TABLE IF NOT EXISTS `tramo` (
  `id_tramo` int(11) NOT NULL AUTO_INCREMENT,
  `tramo_inicio` time NOT NULL DEFAULT '00:00:00',
  `tramo_final` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id_tramo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.tramo: ~0 rows (aproximadamente)
DELETE FROM `tramo`;
/*!40000 ALTER TABLE `tramo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tramo` ENABLE KEYS */;

-- Volcando estructura para tabla clinica.turno
CREATE TABLE IF NOT EXISTS `turno` (
  `id_turno` int(11) NOT NULL AUTO_INCREMENT,
  `dia_turno` varchar(50) NOT NULL DEFAULT '0',
  `horario_inicio` time NOT NULL DEFAULT '00:00:00',
  `horario_final` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`id_turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.turno: ~0 rows (aproximadamente)
DELETE FROM `turno`;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;

-- Volcando estructura para tabla clinica.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nif` varchar(9) NOT NULL,
  `pass` varchar(200) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nif` (`nif`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla clinica.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
