-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: pokedex
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'ad424999-f23a-11f0-b9f8-3e0d920c07a8:1-365';

--
-- Table structure for table `pocket`
--

DROP TABLE IF EXISTS `pocket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pocket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainer_id` int DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainer_id` (`trainer_id`),
  CONSTRAINT `pocket_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pocket`
--

LOCK TABLES `pocket` WRITE;
/*!40000 ALTER TABLE `pocket` DISABLE KEYS */;
INSERT INTO `pocket` VALUES (1,1,'default'),(2,1,'laboratory'),(3,2,'default'),(4,2,'laboratory');
/*!40000 ALTER TABLE `pocket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pocket_content`
--

DROP TABLE IF EXISTS `pocket_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pocket_content` (
  `pocket_id` int DEFAULT NULL,
  `trainer_id` int DEFAULT NULL,
  `pokemon_id` int DEFAULT NULL,
  `slot_number` int DEFAULT NULL,
  `moves` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT 'none,none,none,none',
  `rm_moves` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT 'none',
  `full_hp` int DEFAULT '0',
  `curr_hp` int DEFAULT '0',
  `attack` int DEFAULT '0',
  `defense` int DEFAULT '0',
  `curr_xp` int DEFAULT '0',
  `level` int DEFAULT '1',
  KEY `trainer_id` (`trainer_id`),
  KEY `pokemon_id` (`pokemon_id`),
  KEY `pocket_id` (`pocket_id`),
  CONSTRAINT `pocket_content_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`),
  CONSTRAINT `pocket_content_ibfk_2` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`),
  CONSTRAINT `pocket_content_ibfk_3` FOREIGN KEY (`pocket_id`) REFERENCES `pocket` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pocket_content`
--

LOCK TABLES `pocket_content` WRITE;
/*!40000 ALTER TABLE `pocket_content` DISABLE KEYS */;
INSERT INTO `pocket_content` VALUES (2,1,1,1,'none,none,none,none','none',45,45,49,49,7,1),(2,1,4,2,'none,none,none,none','none',39,39,52,43,6,1),(2,1,7,3,'none,none,none,none','none',44,44,48,65,5,1),(2,1,16,4,'none,none,none,none','none',40,40,45,40,3,1),(2,1,10,5,'none,none,none,none','none',45,45,30,35,3,1),(2,1,25,6,'none,none,none,none','none',35,35,55,40,4,1),(4,2,1,1,'none,none,none,none','none',45,45,49,49,7,1),(4,2,4,2,'none,none,none,none','none',39,39,52,43,6,1),(4,2,7,3,'none,none,none,none','none',44,44,48,65,5,1),(4,2,10,4,'none,none,none,none','none',45,45,30,35,3,1),(4,2,16,5,'none,none,none,none','none',40,40,45,40,3,1),(4,2,25,6,'none,none,none,none','none',35,35,55,40,4,1),(1,1,52,1,'none,none,none,none','none',40,40,45,35,4,1),(1,1,23,2,'none,none,none,none','none',35,35,60,44,20,1),(1,1,129,3,'none,none,none,none','none',20,20,10,55,9,1),(1,1,109,4,'none,none,none,none','none',40,40,65,95,6,1),(1,1,71,5,'none,none,none,none','none',80,80,105,65,17,1),(1,1,108,6,'none,none,none,none','none',90,90,55,75,12,1),(3,2,120,1,'none,none,none,none','none',30,30,45,55,8,1),(3,2,121,2,'none,none,none,none','none',60,60,75,85,11,1),(3,2,54,3,'none,none,none,none','none',50,50,52,48,8,1),(3,2,118,4,'none,none,none,none','none',45,45,67,60,6,1),(3,2,116,5,'none,none,none,none','none',30,30,40,70,4,1),(3,2,72,6,'none,none,none,none','none',40,40,40,35,9,1);
/*!40000 ALTER TABLE `pocket_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon`
--

LOCK TABLES `pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon` DISABLE KEYS */;
INSERT INTO `pokemon` VALUES (1,'bulbasaur'),(4,'charmander'),(7,'squirtle'),(10,'caterpie'),(16,'pidgey'),(23,'ekans'),(25,'pikachu'),(52,'meowth'),(54,'psyduck'),(71,'victreebel'),(72,'tentacool'),(108,'lickitung'),(109,'koffing'),(116,'horsea'),(118,'goldeen'),(120,'staryu'),(121,'starmie'),(129,'magikarp');
/*!40000 ALTER TABLE `pokemon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_base_info`
--

DROP TABLE IF EXISTS `pokemon_base_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_base_info` (
  `pokemon_id` int DEFAULT NULL,
  `base_exp` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  KEY `pokemon_id` (`pokemon_id`),
  CONSTRAINT `pokemon_base_info_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_base_info`
--

LOCK TABLES `pokemon_base_info` WRITE;
/*!40000 ALTER TABLE `pokemon_base_info` DISABLE KEYS */;
INSERT INTO `pokemon_base_info` VALUES (1,7,69,64),(4,6,85,62),(7,5,90,63),(16,3,18,50),(10,3,29,39),(25,4,60,112),(52,4,42,58),(23,20,69,58),(129,9,100,40),(109,6,10,68),(71,17,155,221),(108,12,655,77),(120,8,345,68),(121,11,800,182),(54,8,196,64),(118,6,150,64),(116,4,80,59),(72,9,455,67);
/*!40000 ALTER TABLE `pokemon_base_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_evolution`
--

DROP TABLE IF EXISTS `pokemon_evolution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_evolution` (
  `pokemon_id` int DEFAULT NULL,
  `evolutions` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `pokemon_id` (`pokemon_id`),
  CONSTRAINT `pokemon_evolution_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_evolution`
--

LOCK TABLES `pokemon_evolution` WRITE;
/*!40000 ALTER TABLE `pokemon_evolution` DISABLE KEYS */;
/*!40000 ALTER TABLE `pokemon_evolution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_move`
--

DROP TABLE IF EXISTS `pokemon_move`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_move` (
  `pokemon_id` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  `moves` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `pokemon_id` (`pokemon_id`),
  CONSTRAINT `pokemon_move_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_move`
--

LOCK TABLES `pokemon_move` WRITE;
/*!40000 ALTER TABLE `pokemon_move` DISABLE KEYS */;
/*!40000 ALTER TABLE `pokemon_move` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_names`
--

DROP TABLE IF EXISTS `pokemon_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_names` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_names`
--

LOCK TABLES `pokemon_names` WRITE;
/*!40000 ALTER TABLE `pokemon_names` DISABLE KEYS */;
INSERT INTO `pokemon_names` VALUES (1,'bulbasaur'),(2,'ivysaur'),(3,'venusaur'),(4,'charmander'),(5,'charmeleon'),(6,'charizard'),(7,'squirtle'),(8,'wartortle'),(9,'blastoise'),(10,'caterpie'),(11,'metapod'),(12,'butterfree'),(13,'weedle'),(14,'kakuna'),(15,'beedrill'),(16,'pidgey'),(17,'pidgeotto'),(18,'pidgeot'),(19,'rattata'),(20,'raticate'),(21,'spearow'),(22,'fearow'),(23,'ekans'),(24,'arbok'),(25,'pikachu'),(26,'raichu'),(27,'sandshrew'),(28,'sandslash'),(29,'nidoran♀'),(30,'nidorina'),(31,'nidoqueen'),(32,'nidoran♂'),(33,'nidorino'),(34,'nidoking'),(35,'clefairy'),(36,'clefable'),(37,'vulpix'),(38,'ninetales'),(39,'jigglypuff'),(40,'wigglytuff'),(41,'zubat'),(42,'golbat'),(43,'oddish'),(44,'gloom'),(45,'vileplume'),(46,'paras'),(47,'parasect'),(48,'venonat'),(49,'venomoth'),(50,'diglett'),(51,'dugtrio'),(52,'meowth'),(53,'persian'),(54,'psyduck'),(55,'golduck'),(56,'mankey'),(57,'primeape'),(58,'growlithe'),(59,'arcanine'),(60,'poliwag'),(61,'poliwhirl'),(62,'poliwrath'),(63,'abra'),(64,'kadabra'),(65,'alakazam'),(66,'machop'),(67,'machoke'),(68,'machamp'),(69,'bellsprout'),(70,'weepinbell'),(71,'victreebel'),(72,'tentacool'),(73,'tentacruel'),(74,'geodude'),(75,'graveler'),(76,'golem'),(77,'ponyta'),(78,'rapidash'),(79,'slowpoke'),(80,'slowbro'),(81,'magnemite'),(82,'magneton'),(83,'farfetch\'d'),(84,'doduo'),(85,'dodrio'),(86,'seel'),(87,'dewgong'),(88,'grimer'),(89,'muk'),(90,'shellder'),(91,'cloyster'),(92,'gastly'),(93,'haunter'),(94,'gengar'),(95,'onix'),(96,'drowzee'),(97,'hypno'),(98,'krabby'),(99,'kingler'),(100,'voltorb'),(101,'electrode'),(102,'exeggcute'),(103,'exeggutor'),(104,'cubone'),(105,'marowak'),(106,'hitmonlee'),(107,'hitmonchan'),(108,'lickitung'),(109,'koffing'),(110,'weezing'),(111,'rhyhorn'),(112,'rhydon'),(113,'chansey'),(114,'tangela'),(115,'kangaskhan'),(116,'horsea'),(117,'seadra'),(118,'goldeen'),(119,'seaking'),(120,'staryu'),(121,'starmie'),(122,'mr. mime'),(123,'scyther'),(124,'jynx'),(125,'electabuzz'),(126,'magmar'),(127,'pinsir'),(128,'tauros'),(129,'magikarp'),(130,'gyarados'),(131,'lapras'),(132,'ditto'),(133,'eevee'),(134,'vaporeon'),(135,'jolteon'),(136,'flareon'),(137,'porygon'),(138,'omanyte'),(139,'omastar'),(140,'kabuto'),(141,'kabutops'),(142,'aerodactyl'),(143,'snorlax'),(144,'articuno'),(145,'zapdos'),(146,'moltres'),(147,'dratini'),(148,'dragonair'),(149,'dragonite'),(150,'mewtwo'),(151,'mew');
/*!40000 ALTER TABLE `pokemon_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_stat`
--

DROP TABLE IF EXISTS `pokemon_stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_stat` (
  `pokemon_id` int DEFAULT NULL,
  `hp` int DEFAULT NULL,
  `attack` int DEFAULT NULL,
  `defense` int DEFAULT NULL,
  KEY `pokemon_id` (`pokemon_id`),
  CONSTRAINT `pokemon_stat_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_stat`
--

LOCK TABLES `pokemon_stat` WRITE;
/*!40000 ALTER TABLE `pokemon_stat` DISABLE KEYS */;
INSERT INTO `pokemon_stat` VALUES (1,45,49,49),(4,39,52,43),(7,44,48,65),(16,40,45,40),(10,45,30,35),(25,35,55,40),(52,40,45,35),(23,35,60,44),(129,20,10,55),(109,40,65,95),(71,80,105,65),(108,90,55,75),(120,30,45,55),(121,60,75,85),(54,50,52,48),(118,45,67,60),(116,30,40,70),(72,40,40,35);
/*!40000 ALTER TABLE `pokemon_stat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_state`
--

DROP TABLE IF EXISTS `pokemon_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_state` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_state`
--

LOCK TABLES `pokemon_state` WRITE;
/*!40000 ALTER TABLE `pokemon_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `pokemon_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_type`
--

DROP TABLE IF EXISTS `pokemon_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_type` (
  `pokemon_id` int DEFAULT NULL,
  `type` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `pokemon_id` (`pokemon_id`),
  CONSTRAINT `pokemon_type_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_type`
--

LOCK TABLES `pokemon_type` WRITE;
/*!40000 ALTER TABLE `pokemon_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `pokemon_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES (1,'felipedie'),(2,'machine');
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-16 21:03:33
