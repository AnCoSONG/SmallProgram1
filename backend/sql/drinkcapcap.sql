-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: drinkcapcap
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `battery_order`
--

DROP TABLE IF EXISTS `battery_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `battery_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `battery_num` int(11) NOT NULL,
  `openid` varchar(255) NOT NULL,
  `done` tinyint(1) NOT NULL,
  `done_time` datetime DEFAULT NULL,
  `free_time` varchar(255) DEFAULT NULL,
  `user_location` varchar(255) DEFAULT NULL,
  `real_location` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battery_order`
--

LOCK TABLES `battery_order` WRITE;
/*!40000 ALTER TABLE `battery_order` DISABLE KEYS */;
INSERT INTO `battery_order` VALUES (1,'2019-03-16 00:00:00',13,'test_openid_1',1,'2019-03-16 17:50:35',NULL,NULL,NULL,NULL,NULL),(2,'2019-03-16 00:00:00',3,'test_openid_2',1,'2019-03-16 00:00:00',NULL,NULL,NULL,NULL,NULL),(3,'2019-03-16 00:00:00',20,'test_openid_2',0,NULL,NULL,NULL,NULL,NULL,NULL),(4,'2019-03-16 00:00:00',50,'test_openid_4',1,'2019-03-16 00:00:00',NULL,NULL,NULL,NULL,NULL),(5,'2019-03-16 00:00:00',50,'test_openid_5',1,'2019-03-16 00:00:00',NULL,NULL,NULL,NULL,NULL),(6,'2019-03-16 00:00:00',56,'test_openid_6',1,'2019-03-16 00:00:00',NULL,NULL,NULL,NULL,NULL),(7,'2019-03-16 17:08:21',9,'test_openid_7',1,'2019-03-16 17:49:43',NULL,NULL,NULL,NULL,NULL),(8,'2019-03-21 08:42:45',12,'oi-1',0,'2019-04-04 20:33:33',NULL,NULL,NULL,NULL,NULL),(9,'2019-03-21 16:33:54',12,'oid2',0,NULL,'2019-03-04 18-19','7-201','17,18','15145050156','something'),(10,'2019-03-21 16:35:00',12,'oid2',1,'2019-03-23 19:31:01','2019-03-04 18-19','7-201','17,18','15145050156','something'),(11,'2019-03-23 21:01:49',12,'string',0,NULL,'string','string','string','string','string'),(12,'2019-03-23 21:04:16',12,'string',0,NULL,'string','string','string','string','string'),(13,'2019-03-23 21:09:04',12,'string',0,NULL,'string','string','string','string','string'),(14,NULL,12,'string',0,NULL,'string','string','string','string','string'),(15,'2019-04-03 20:30:40',12,'string',0,NULL,'string','string','string','string','string');
/*!40000 ALTER TABLE `battery_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battery_point`
--

DROP TABLE IF EXISTS `battery_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `battery_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `battery_val` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battery_point`
--

LOCK TABLES `battery_point` WRITE;
/*!40000 ALTER TABLE `battery_point` DISABLE KEYS */;
INSERT INTO `battery_point` VALUES (1,'test_openid_1',12),(2,'test_openid_2',2),(3,'test_openid_3',0),(6,'test_openid_4',0),(7,'oid2',1);
/*!40000 ALTER TABLE `battery_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data_log`
--

DROP TABLE IF EXISTS `data_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `data_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `do_time` datetime NOT NULL,
  `do_name` varchar(255) NOT NULL,
  `do_type` varchar(255) DEFAULT NULL,
  `interface_id` int(11) NOT NULL,
  `do_result` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据流水';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_log`
--

LOCK TABLES `data_log` WRITE;
/*!40000 ALTER TABLE `data_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `data_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doll_paper`
--

DROP TABLE IF EXISTS `doll_paper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `doll_paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `doll_paper_val` int(11) DEFAULT '0',
  `create_time` datetime DEFAULT NULL,
  `effect_time` int(11) DEFAULT NULL,
  `valid` tinyint(1) DEFAULT '1',
  `done` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doll_paper`
--

LOCK TABLES `doll_paper` WRITE;
/*!40000 ALTER TABLE `doll_paper` DISABLE KEYS */;
/*!40000 ALTER TABLE `doll_paper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drink_control`
--

DROP TABLE IF EXISTS `drink_control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `drink_control` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drink_control`
--

LOCK TABLES `drink_control` WRITE;
/*!40000 ALTER TABLE `drink_control` DISABLE KEYS */;
INSERT INTO `drink_control` VALUES (2,1,1,20),(3,1,2,10),(4,2,3,15),(5,2,4,8),(6,3,5,20),(7,3,6,15),(8,4,7,15),(9,4,8,15),(10,5,9,10),(11,5,10,5),(12,6,11,10),(13,6,12,5),(14,7,13,15);
/*!40000 ALTER TABLE `drink_control` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drink_order`
--

DROP TABLE IF EXISTS `drink_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `drink_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cup_id` int(11) DEFAULT NULL,
  `openid` varchar(255) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `done` tinyint(1) NOT NULL DEFAULT '0',
  `done_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drink_order`
--

LOCK TABLES `drink_order` WRITE;
/*!40000 ALTER TABLE `drink_order` DISABLE KEYS */;
INSERT INTO `drink_order` VALUES (1,123,'oid-1','2019-03-20 11:50:53','https://pixboost.art/img/id/1.jpg',1,1,'2019-03-23 19:39:25');
/*!40000 ALTER TABLE `drink_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drink_point`
--

DROP TABLE IF EXISTS `drink_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `drink_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `point` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drink_point`
--

LOCK TABLES `drink_point` WRITE;
/*!40000 ALTER TABLE `drink_point` DISABLE KEYS */;
INSERT INTO `drink_point` VALUES (1,'oid1',1,7),(2,'oid2',2,2),(3,'oid2',1,3),(4,'oid-1',1,1);
/*!40000 ALTER TABLE `drink_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drink_ticket`
--

DROP TABLE IF EXISTS `drink_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `drink_ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `effect_time` int(11) DEFAULT NULL,
  `done` tinyint(1) NOT NULL,
  `valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drink_ticket`
--

LOCK TABLES `drink_ticket` WRITE;
/*!40000 ALTER TABLE `drink_ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `drink_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'__any__',1),(2,'四季奶青',1),(3,'__any__',2),(4,'牛奶烧仙草',2),(5,'__any__',3),(6,'小芋圆烧仙草',3),(7,'__any__',4),(8,'蜂蜜柚子茶',4),(9,'__any__',5),(10,'幽兰拿铁',5),(11,'__any__',6),(12,'熊猫奶盖茶',6),(13,'__any__',7);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(255) DEFAULT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'益禾堂','中南大学店'),(2,'益禾堂','后湖小区店'),(3,'书亦烧仙草','中南大学店'),(4,'蜜雪冰城','中南大学店'),(5,'茶颜悦色','青年路步行街店'),(6,'阿里山贡茶','中南大学店'),(7,'甘茗城','后湖小区店');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-24  1:51:21
