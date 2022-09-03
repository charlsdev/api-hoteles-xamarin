/*
 Navicat Premium Data Transfer

 Source Server         : MySQL XAMPP
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : hoteles-xamarin

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 03/09/2022 01:22:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for hoteles
-- ----------------------------
DROP TABLE IF EXISTS `hoteles`;
CREATE TABLE `hoteles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `cedula` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nameCompleto` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `numPersonas` int NOT NULL,
  `tipoHabitacion` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `numHabitacion` int NOT NULL,
  `lugar` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `precioDia` int NOT NULL,
  `diasEstadia` int NOT NULL,
  `precioReserva` double(5, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
