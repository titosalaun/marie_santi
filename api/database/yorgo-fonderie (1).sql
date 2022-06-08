-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 01, 2022 at 06:56 PM
-- Server version: 5.7.25
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yorgo-fonderie`
--

-- --------------------------------------------------------

--
-- Table structure for table `font`
--

DROP TABLE IF EXISTS `font`;
CREATE TABLE `font` (
  `id_font` int(11) NOT NULL,
  `id_designer` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float(10,2) NOT NULL,
  `price_style` float(10,2) NOT NULL,
  `price_by_style` float(10,2) NOT NULL,
  `specimen_text` text NOT NULL,
  `specimen_file` varchar(255) NOT NULL,
  `bundle_text` text NOT NULL,
  `bundle_file` varchar(255) NOT NULL,
  `text_website` varchar(255) NOT NULL,
  `character_set` text NOT NULL,
  `position` tinyint(4) NOT NULL,
  `online` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `font`
--

INSERT INTO `font` (`id_font`, `id_designer`, `titre`, `description`, `price`, `price_style`, `price_by_style`, `specimen_text`, `specimen_file`, `bundle_text`, `bundle_file`, `text_website`, `character_set`, `position`, `online`) VALUES
(2, 0, 'aaaaavtoto', 'vvv', 0.00, 0.00, 0.00, '', 'file-1646060463352.pdf', '', 'file-1646060472583.pdf', '', '', 1, 0),
(4, 0, 'pppp', 'www', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(5, 0, 'sqdqs', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(6, 0, 'qS', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 5, 0),
(7, 0, 'xxxxa', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 5, 0),
(8, 0, 'cc', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 99, 0),
(9, 1, 'aaaaaaaaqqqq', 'desc', 1.00, 2.00, 3.00, 'spe1', 'file-1646056794951.pdf', 'bundle1', 'file-1646056799567.pdf', 'The quick brown fox jumps over a lazy dog, testxx', 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\na b c d e f g h i j k l m n o p q r s t u v w x y zxx', 5, 1),
(10, 0, 'allo', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 5, 0),
(11, 0, 'titolast', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(12, 0, 'qSSQ', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(13, 0, 'vv', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(14, 0, 'bbbb', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(15, 0, 'ww', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(16, 0, 'sqDSQd', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(17, 0, 'qSSQs', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(19, 0, 'dsqS', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(20, 0, 'x34', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 100, 0),
(22, 0, 'xxq', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(23, 0, 'xx', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(24, 0, 'qS', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(25, 0, 'Q', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(26, 0, 'qs', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(27, 0, 'q', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(28, 0, 'qs', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(29, 0, 'q', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(30, 0, 'q', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(31, 0, 'ww', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(32, 0, 'lastX', 'dddd', 0.00, 0.00, 0.00, '', '', '', '', '', '', 101, 0),
(33, 0, 'tito last', 'cc', 0.00, 0.00, 0.00, '', '', '', '', '', '', 1, 0),
(34, 0, 'ccc', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 102, 0),
(35, 0, 'last_font', 'd last', 10.00, 20.00, 30.00, '', '', '', '', '', '', 103, 0),
(36, 0, 'xxxxx', '', 0.00, 0.00, 0.00, '', '', '', '', '', '', 104, 0);

-- --------------------------------------------------------

--
-- Table structure for table `font_designer`
--

DROP TABLE IF EXISTS `font_designer`;
CREATE TABLE `font_designer` (
  `id_designer` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `font_designer`
--

INSERT INTO `font_designer` (`id_designer`, `nom`, `prenom`) VALUES
(1, 'ABCY', '');

-- --------------------------------------------------------

--
-- Table structure for table `font_style`
--

DROP TABLE IF EXISTS `font_style`;
CREATE TABLE `font_style` (
  `id_style` int(11) NOT NULL,
  `id_font` int(11) NOT NULL,
  `id_type` tinyint(4) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `text_website` varchar(255) NOT NULL,
  `position` tinyint(4) NOT NULL,
  `online` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `font_style`
--

INSERT INTO `font_style` (`id_style`, `id_font`, `id_type`, `titre`, `description`, `text_website`, `position`, `online`) VALUES
(1, 9, 0, 'style 111111', 'aaaa', '', 1, 1),
(2, 9, 0, 'style2', '', '', 2, 0),
(3, 9, 0, 'AAAaa', 'bbb', '', 3, 0),
(4, 9, 0, 'sdq', 'XXX', '', 4, 0),
(5, 9, 0, 'mimi', 'undefined', '', 5, 0),
(6, 9, 0, 'qqq', 'undefined', '', 6, 0),
(7, 9, 3, 'aaaa', 'a', 'The quick brown fox jumps over a lazy dog, testaaa', 7, 0),
(8, 9, 0, 'ww', 'undefined', '', 8, 0),
(9, 9, 0, 'c', 'c', '', 9, 0);

-- --------------------------------------------------------

--
-- Table structure for table `font_style_file`
--

DROP TABLE IF EXISTS `font_style_file`;
CREATE TABLE `font_style_file` (
  `id_file` int(11) NOT NULL,
  `id_style` int(11) NOT NULL,
  `file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `font_style_file`
--

INSERT INTO `font_style_file` (`id_file`, `id_style`, `file`) VALUES
(12, 7, 'file-1645988728674.woff2'),
(13, 7, 'file-1645988004419.woff'),
(14, 7, 'file-1645988004420.otf');

-- --------------------------------------------------------

--
-- Table structure for table `font_style_type`
--

DROP TABLE IF EXISTS `font_style_type`;
CREATE TABLE `font_style_type` (
  `id_type` tinyint(4) NOT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `font_style_type`
--

INSERT INTO `font_style_type` (`id_type`, `titre`) VALUES
(1, 'normal'),
(2, 'italic'),
(3, 'bold'),
(4, 'strong'),
(5, 'heavy');

-- --------------------------------------------------------

--
-- Table structure for table `font_use`
--

DROP TABLE IF EXISTS `font_use`;
CREATE TABLE `font_use` (
  `id_use` int(11) NOT NULL,
  `id_font` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `visuel` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `online` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `font_use`
--

INSERT INTO `font_use` (`id_use`, `id_font`, `titre`, `visuel`, `url`, `online`) VALUES
(1, 10, 'vvvv1', 'file-1646074548863.png', 'gggg2', 0);

-- --------------------------------------------------------

--
-- Table structure for table `seo`
--

DROP TABLE IF EXISTS `seo`;
CREATE TABLE `seo` (
  `id_seo` int(11) NOT NULL,
  `source` varchar(50) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seo`
--

INSERT INTO `seo` (`id_seo`, `source`, `id_parent`, `titre`, `description`, `url`) VALUES
(1, 'font-style', 1, 'aaaa111tito', 'bbb1', 'ccc1'),
(2, 'font-style', 7, 'aaa', 'xxx', 'aaa'),
(3, 'font-style', 0, 'sdq', 'xxx', 'sdq'),
(4, 'font-style', 0, 'mimi', 'xxx', 'mimi'),
(5, 'font-style', 0, 'qqq', 'xxx', 'qqq'),
(6, 'font-style', 0, 'a', 'xxx', 'a'),
(7, 'font-style', 0, 'ww', 'xxx', 'ww'),
(8, 'font-style', 0, 'c', 'xxx', 'c'),
(9, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(10, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(11, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(12, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(13, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(14, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(15, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(16, 'font', 2, 'a', 'b', 'c'),
(17, 'font_use', 1, 'aaaaa', 'bbb', 'aaaaa'),
(18, 'font_use', 1, 'aaa', 'bbb', 'aaa'),
(19, 'font_use', 1, 'aaa', 'bbb', 'aaa'),
(20, 'font_use', 1, 'vvvv', 'bbb', 'vvvv'),
(21, 'font_use', 1, 'vvvv1', 'bbb', 'vvvv1'),
(22, 'font_use', 1, 'aaaaa', 'bbb', 'aaaaa'),
(23, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(24, 'font_style', 7, 'aaaa', 'www', 'aaaa'),
(25, 'font_style', 7, 'aaaa', 'www', 'aaaa'),
(26, 'setting', 1, 'ABCY Type foundry', 'description...', 'home'),
(27, 'setting', 1, 'ABCY Type foundry', 'description...', 'home'),
(28, 'setting', 1, 'ABCY Type foundry', 'description...', 'home'),
(29, 'setting', 1, 'ABCY Type foundry', 'description...', 'home'),
(30, 'setting', 1, 'ABCY Type foundry', 'description...', 'home'),
(31, 'setting', 1, 'ABCY Type foundry', 'description...', 'home'),
(32, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(33, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3'),
(34, 'font_style', 7, 'aaaa', 'www', 'aaaa'),
(35, 'font_style', 7, 'aaaa', 'www', 'aaaa'),
(36, 'font', 9, 'aaaaaaaaqqqq1', 'sseo2', 'aaaaaaaaqqqq3');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting` (
  `id_setting` tinyint(4) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `email_contact` varchar(255) NOT NULL,
  `email_shop` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `instagram` varchar(255) NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `visuel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id_setting`, `titre`, `address`, `email_contact`, `email_shop`, `phone`, `instagram`, `facebook`, `visuel`) VALUES
(1, 'ABCY Type foundry', '44 bis rue Lucien Sampaix 75010 Paris, France', 'contact@yorgo.co', 'contact@yorgo.co', '+33(0)1 40 38 81 85', 'https://www.instagram.com/yorgoandco/?hl=fr', 'https://www.facebook.com/YorgoCo/', 'file-1646132441702.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL DEFAULT '',
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_creation` date NOT NULL DEFAULT '0000-00-00',
  `id_droit` int(11) NOT NULL DEFAULT '0',
  `id_status` tinyint(4) NOT NULL,
  `invitation` tinyint(4) NOT NULL,
  `notification` tinyint(4) NOT NULL,
  `token` text NOT NULL,
  `online` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nom`, `prenom`, `email`, `password`, `date_creation`, `id_droit`, `id_status`, `invitation`, `notification`, `token`, `online`) VALUES
(128, 'Salaun1', 'Christophe', 'salaun@onoci.net', 'f1f9804293a3976e80f88b16a44698a2', '2020-07-24', 1, 2, 1, 1, '', 1),
(163, 'Salaün', 'Christophe', 'salaun.christophe@gmail.com', '47bce5c74f589f4867dbd57e9ca9f808', '2022-01-17', 0, 2, 1, 0, '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `font`
--
ALTER TABLE `font`
  ADD PRIMARY KEY (`id_font`),
  ADD KEY `id_designer` (`id_designer`);

--
-- Indexes for table `font_designer`
--
ALTER TABLE `font_designer`
  ADD PRIMARY KEY (`id_designer`);

--
-- Indexes for table `font_style`
--
ALTER TABLE `font_style`
  ADD PRIMARY KEY (`id_style`),
  ADD KEY `id_font` (`id_font`);

--
-- Indexes for table `font_style_file`
--
ALTER TABLE `font_style_file`
  ADD PRIMARY KEY (`id_file`),
  ADD KEY `id_style` (`id_style`);

--
-- Indexes for table `font_style_type`
--
ALTER TABLE `font_style_type`
  ADD PRIMARY KEY (`id_type`);

--
-- Indexes for table `font_use`
--
ALTER TABLE `font_use`
  ADD PRIMARY KEY (`id_use`),
  ADD KEY `id_font` (`id_font`);

--
-- Indexes for table `seo`
--
ALTER TABLE `seo`
  ADD PRIMARY KEY (`id_seo`),
  ADD KEY `id_parent` (`id_parent`),
  ADD KEY `source` (`source`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id_setting`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `notification` (`notification`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `font`
--
ALTER TABLE `font`
  MODIFY `id_font` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `font_designer`
--
ALTER TABLE `font_designer`
  MODIFY `id_designer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `font_style`
--
ALTER TABLE `font_style`
  MODIFY `id_style` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `font_style_file`
--
ALTER TABLE `font_style_file`
  MODIFY `id_file` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `font_style_type`
--
ALTER TABLE `font_style_type`
  MODIFY `id_type` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `font_use`
--
ALTER TABLE `font_use`
  MODIFY `id_use` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `seo`
--
ALTER TABLE `seo`
  MODIFY `id_seo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id_setting` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
