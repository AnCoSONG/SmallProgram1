
use drinkcapcap;

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

LOCK TABLES `drink_control` WRITE;
/*!40000 ALTER TABLE `drink_control` DISABLE KEYS */;
INSERT INTO `drink_control` VALUES (2,1,1,20),(3,1,2,10),(4,2,3,15),(5,2,4,8),(6,3,5,20),(7,3,6,15),(8,4,7,15),(9,4,8,15),(10,5,9,10),(11,5,10,5),(12,6,11,10),(13,6,12,5),(14,7,13,15);
/*!40000 ALTER TABLE `drink_control` ENABLE KEYS */;
UNLOCK TABLES;
