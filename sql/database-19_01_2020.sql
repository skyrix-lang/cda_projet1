-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: db_cda_bank
-- ------------------------------------------------------
-- Server version	5.6.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bank_Account`
--

DROP TABLE IF EXISTS `Bank_Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bank_Account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) unsigned NOT NULL,
  `openingDate` datetime NOT NULL,
  `balance` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `owner_id_UNIQUE` (`owner_id`),
  CONSTRAINT `fk_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bank_Account`
--

LOCK TABLES `Bank_Account` WRITE;
/*!40000 ALTER TABLE `Bank_Account` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bank_Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Beneficiary_Demand`
--

DROP TABLE IF EXISTS `Beneficiary_Demand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Beneficiary_Demand` (
  `account_id` int(10) unsigned NOT NULL,
  `beneficiary_id` int(10) unsigned NOT NULL,
  `banker_id` int(10) unsigned NOT NULL,
  `openedDate` datetime NOT NULL,
  `closedDate` datetime DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`account_id`,`beneficiary_id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  UNIQUE KEY `beneficiary_id_UNIQUE` (`beneficiary_id`),
  UNIQUE KEY `banker_id_UNIQUE` (`banker_id`),
  CONSTRAINT `fk_demand_account_id` FOREIGN KEY (`account_id`) REFERENCES `Bank_Account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_demand_banker_id` FOREIGN KEY (`banker_id`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_demand_beneficiary_id` FOREIGN KEY (`beneficiary_id`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Beneficiary_Demand`
--

LOCK TABLES `Beneficiary_Demand` WRITE;
/*!40000 ALTER TABLE `Beneficiary_Demand` DISABLE KEYS */;
/*!40000 ALTER TABLE `Beneficiary_Demand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Delete_Account_Demand`
--

DROP TABLE IF EXISTS `Delete_Account_Demand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Delete_Account_Demand` (
  `account_id` int(10) unsigned NOT NULL,
  `banker_id` int(10) unsigned NOT NULL,
  `demandDate` datetime NOT NULL,
  `reason` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`account_id`,`banker_id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  UNIQUE KEY `beneficiary_id_UNIQUE` (`banker_id`),
  CONSTRAINT `fk_account_id` FOREIGN KEY (`account_id`) REFERENCES `Bank_Account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_banker_id` FOREIGN KEY (`banker_id`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Delete_Account_Demand`
--

LOCK TABLES `Delete_Account_Demand` WRITE;
/*!40000 ALTER TABLE `Delete_Account_Demand` DISABLE KEYS */;
/*!40000 ALTER TABLE `Delete_Account_Demand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `birthDate` datetime NOT NULL,
  `phone` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `zipCode` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users_Pending`
--

DROP TABLE IF EXISTS `Users_Pending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_Pending` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `birthDate` datetime DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `zipCode` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_Pending`
--

LOCK TABLES `Users_Pending` WRITE;
/*!40000 ALTER TABLE `Users_Pending` DISABLE KEYS */;
INSERT INTO `Users_Pending` VALUES (22,'pending-awaiting','$2b$10$alMMJu5vnoOUhScaKQKPBe4KfkeuoV/eKJv.BBof.aF8sEmppcbCK','Elliot','Ben Soussan','elliot.bensoussan@gmail.com','1998-01-23 00:00:00','0760967314','3 rue de la paix','91700','Sainte-Geneviève-des-Bois','France'),(23,'pending-awaiting','$2b$10$Uv081wyJqAla7kRlNSqs3.mmNt0vDBWZNNZYrxFmGonJOLFX51en2','Ben','Harper','ben.harper@gmail.com','1998-01-23 00:00:00','0760967314','3 rue de la paix','91700','Sainte-Geneviève-des-Bois','France'),(24,'pending','$2b$10$DaCxINf.bRxu6ZmNFLlvCOZld6sEW/tEJICY9DRrR.SO99BT4jpE2','Tony','Montana','tony.montana@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL),(25,'pending','$2b$10$EQhhUkw42KjQvgiD4H3O3.EtJxzBhNxwVkoiVBsZ/U5NTjD4QK25W','William','Peel','willypipi@zizinedinezizidane.fr',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Users_Pending` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-22 14:58:49
