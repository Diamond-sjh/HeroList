/*
Navicat MySQL Data Transfer

Source Server         : league of legends
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : heroes

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2019-08-16 17:43:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for boy
-- ----------------------------
DROP TABLE IF EXISTS `boy`;
CREATE TABLE `boy` (
  `name` varchar(3) DEFAULT NULL,
  `flower` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of boy
-- ----------------------------
INSERT INTO `boy` VALUES ('犀利哥', '百合');
INSERT INTO `boy` VALUES ('周杰伦', '桃花');
INSERT INTO `boy` VALUES ('小沈阳', '梅花');
INSERT INTO `boy` VALUES ('张三丰', '荷花');
INSERT INTO `boy` VALUES ('刘德华', '狗尾巴花');

-- ----------------------------
-- Table structure for girl
-- ----------------------------
DROP TABLE IF EXISTS `girl`;
CREATE TABLE `girl` (
  `name` varchar(4) DEFAULT NULL,
  `flower` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of girl
-- ----------------------------
INSERT INTO `girl` VALUES ('凤姐', '仙人掌');
INSERT INTO `girl` VALUES ('林志玲', '荷花');
INSERT INTO `girl` VALUES ('大S', '梅花');
INSERT INTO `girl` VALUES ('西施', '桃花');
INSERT INTO `girl` VALUES ('芙蓉姐姐', '百合');

-- ----------------------------
-- Table structure for heroes
-- ----------------------------
DROP TABLE IF EXISTS `heroes`;
CREATE TABLE `heroes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `skill` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of heroes
-- ----------------------------
INSERT INTO `heroes` VALUES ('1', '赵信', '德邦总管', 'uploads\\35dd2acbc15fd982b2e58ec1593169b0', '新月护卫');
INSERT INTO `heroes` VALUES ('2', '嘉文四世', '德玛西亚皇子', 'uploads\\cb2364b69a8b78cb34da063d1e28e729', '天崩地裂');
INSERT INTO `heroes` VALUES ('3', '盖伦', '德玛西亚之力', 'uploads\\c26e64e2b4ed756a17f7c91d2738e6c8', '德玛西亚正义');
INSERT INTO `heroes` VALUES ('4', '菲奥娜', '无双剑姬', 'uploads\\9b48f7aff28da66a1ab6d5bf8e3d30e1', '无双挑战');
INSERT INTO `heroes` VALUES ('5', '亚索', '疾风剑豪', 'uploads\\b69cad2228c4017eb9a7bac2bc40ddbb', '狂风绝息斩');
INSERT INTO `heroes` VALUES ('6', '易', '无极剑圣', 'uploads\\9891d99f0d4e3c8fbb246d73f5ea4856', '高原血统');
INSERT INTO `heroes` VALUES ('7', '德莱文', '荣耀行刑官', 'uploads\\96ba4c63bfaebb997f57b13166c21b77', '冷血追命');
INSERT INTO `heroes` VALUES ('8', '泰隆', '刀锋之影', 'uploads\\03978d6ee47356dd0c86c1c94569ddef', '暗影突袭');
INSERT INTO `heroes` VALUES ('9', '锐雯', '放逐之刃', 'uploads\\c9ad71c0b26a0ef6e6b447b1e428bb40', '放逐之锋');
INSERT INTO `heroes` VALUES ('10', '乐芙兰', '诡术妖姬', 'uploads\\7619c4c2b5f966187ab1c41de5b69485', '故技重施');
INSERT INTO `heroes` VALUES ('11', '金克丝', '暴走萝莉', 'uploads\\3a3d71fbe92a04bb433bda2603327a25', '超究极死神飞弹');
INSERT INTO `heroes` VALUES ('12', '迦娜', '风暴之怒', 'uploads\\3de58424c28474f8e9911074ff785db9', '复苏季风');
INSERT INTO `heroes` VALUES ('13', '吉格斯', '爆破鬼才', 'uploads\\349cb0c0d403652a5857026f63ed414e', '科学的地狱火炮');
INSERT INTO `heroes` VALUES ('14', '凯特琳', '皮城女警', 'uploads\\74f95f09ed94a9bec928064ce1fca08a', '让子弹飞');
INSERT INTO `heroes` VALUES ('15', '卡莉斯塔', '复仇之矛', 'uploads\\7687c415c6ad9cc17f610eb766f4ec35', '命运的召唤');
INSERT INTO `heroes` VALUES ('16', '卡尔萨斯', '死亡颂唱者', 'uploads\\7da6fc6c58b4b0d2e9e7df478eaf95d6', '安魂曲');
INSERT INTO `heroes` VALUES ('17', '潘森', '战争之王', 'uploads\\edb6d1b67c5473c7d7e4e23faeeb6fb0', '堕天一击');
INSERT INTO `heroes` VALUES ('18', '拉莫斯', '披甲龙龟', 'uploads\\a0052790bdcb0d368e1caf4714ef70d9', '地动山摇');
INSERT INTO `heroes` VALUES ('19', '内瑟斯', '沙漠死神', 'uploads\\83fb65e876ddf6daef0ae2d46cd69a9a', '死神降临');
INSERT INTO `heroes` VALUES ('20', '崔斯特', '卡牌大师', 'uploads\\66c215a05fb2ed6e658fcbeb4b4275a3', '命运');
INSERT INTO `heroes` VALUES ('21', '艾希', '寒冰射手', 'uploads\\9bf9541d1d5bc2536c7cc0745fd8e237', '魔法水晶箭');
INSERT INTO `heroes` VALUES ('22', '泰达米尔', '蛮族之王', 'uploads\\3a52bfddfcb856a004188c3e209396ed', '无尽怒火');
INSERT INTO `heroes` VALUES ('23', '崔斯塔娜', '麦林炮手', 'uploads\\702ecbaf0a3e7dfe574c074a576c5640', '毁灭射击');
INSERT INTO `heroes` VALUES ('24', '雷克塞', '虚空遁地兽', 'uploads\\c36cc9c344e88290b85f860af2a262f4', '虚空猛冲');
INSERT INTO `heroes` VALUES ('25', '亚托克斯', '暗裔剑魔', 'uploads\\ec440ece5e47fcc29fa2d24c9824d218', '大灭');
INSERT INTO `heroes` VALUES ('26', '卡特琳娜', '不祥之刃', 'uploads\\502f152cf8c7c93496d9e3c46e137b93', '死亡莲华');
INSERT INTO `heroes` VALUES ('27', '希维尔', '战争女神', 'uploads\\ce62e7fb65474733002af4e3e3292feb', '狩猎');
INSERT INTO `heroes` VALUES ('28', '莫甘娜', '堕落女王', 'uploads\\5e83548f567a86db07869ebc49a0e1e7', '灵魂镣铐');
INSERT INTO `heroes` VALUES ('29', '李青', '盲僧', 'uploads\\7b857df81431f30f9266f85ea4bf41f8', '猛龙摆尾');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '123@123.com', '202cb962ac59075b964b07152d234b70');
INSERT INTO `user` VALUES ('3', '456@456.com', '250cf8b51c773f3f8dc8b4be867a9a02');
INSERT INTO `user` VALUES ('4', '789@789.com', '68053af2923e00204c3ca7c6a3150cf7');
INSERT INTO `user` VALUES ('5', 'sjh', '14db62200d8bf46551aa214accafe1df');
INSERT INTO `user` VALUES ('6', '123', '202cb962ac59075b964b07152d234b70');
