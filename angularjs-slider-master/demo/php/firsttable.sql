-- phpMyAdmin SQL Dump
-- version 3.1.2deb1ubuntu0.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 19, 2010 at 02:44 PM
-- Server version: 5.0.75
-- PHP Version: 5.2.6-3ubuntu4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `firsttable`
--

CREATE TABLE IF NOT EXISTS `firsttable` (
  `cdReference` int(10) unsigned NOT NULL auto_increment,
  `cdTitle` varchar(50) NOT NULL,
  `cdArtist` varchar(50) NOT NULL,
  `cdPrice` decimal(10,2) unsigned NOT NULL,
  `cdLabel` varchar(25) NOT NULL,
  PRIMARY KEY  (`cdReference`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `firsttable`
--

INSERT INTO `firsttable` (`cdReference`, `cdTitle`, `cdArtist`, `cdPrice`, `cdLabel`) VALUES
(1, 'Youth And Young Manhood', 'Kings Of Leon', '9.99', ''),
(2, 'Guns Don''t Kill People...Lazers Do', 'Major Lazer', '1.99', ''),
(3, 'Killswitch Engage', 'Killswitch Engage', '8.99', '');
