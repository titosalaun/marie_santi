-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  mer. 03 août 2022 à 16:20
-- Version du serveur :  5.7.25
-- Version de PHP :  5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ampersound`
--

-- --------------------------------------------------------

--
-- Structure de la table `document`
--

CREATE TABLE `document` (
  `id_document` int(11) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `source` varchar(255) NOT NULL,
  `fichier` varchar(255) NOT NULL,
  `embed` text NOT NULL,
  `poster` varchar(255) NOT NULL,
  `autoplay` tinyint(4) NOT NULL,
  `legende` text NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `document_display`
--

CREATE TABLE `document_display` (
  `id` tinyint(4) NOT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `document_display`
--

INSERT INTO `document_display` (`id`, `titre`) VALUES
(1, '100%'),
(2, '75%'),
(3, '66%'),
(4, '50%'),
(5, '33%'),
(6, '25%');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_effet` tinyint(4) NOT NULL,
  `color_text` varchar(50) NOT NULL,
  `color_bg` varchar(50) NOT NULL,
  `font_size` int(11) NOT NULL,
  `interlignage` int(11) NOT NULL,
  `interlettrage` int(11) NOT NULL,
  `texte` text NOT NULL,
  `fichier` blob NOT NULL,
  `duree` float(10,2) NOT NULL,
  `isPoster` tinyint(4) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `seo`
--

CREATE TABLE `seo` (
  `id_seo` int(11) NOT NULL,
  `source` varchar(50) NOT NULL,
  `id_parent` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `setting`
--

CREATE TABLE `setting` (
  `id_setting` tinyint(4) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `instagram` varchar(255) NOT NULL,
  `spotify` varchar(255) NOT NULL,
  `visuel` varchar(255) NOT NULL,
  `visuel_home` varchar(255) NOT NULL,
  `about` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `setting`
--

INSERT INTO `setting` (`id_setting`, `titre`, `address`, `email`, `instagram`, `spotify`, `visuel`, `visuel_home`, `about`) VALUES
(1, 'ampersound', '', 'marie.santi@penninghen.fr', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `sound`
--

CREATE TABLE `sound` (
  `id_sound` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `fichier` varchar(255) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

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
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `nom`, `prenom`, `email`, `password`, `date_creation`, `id_droit`, `id_status`, `invitation`, `notification`, `token`, `online`) VALUES
(128, 'salaun', 'Christophe', 'salaun@onoci.net', 'd279a9dbabd8242b9a708f89851182c5', '2020-07-24', 1, 2, 1, 1, '', 1),
(163, 'Santi', 'Marie', 'marie.santi@penninghen.fr', '865cd060a264c75aa29928c5db3de9c3', '2022-01-17', 1, 2, 1, 0, '', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id_document`),
  ADD KEY `id_parent` (`id_parent`),
  ADD KEY `source` (`source`),
  ADD KEY `position` (`position`);

--
-- Index pour la table `document_display`
--
ALTER TABLE `document_display`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `seo`
--
ALTER TABLE `seo`
  ADD PRIMARY KEY (`id_seo`),
  ADD KEY `id_parent` (`id_parent`),
  ADD KEY `source` (`source`);

--
-- Index pour la table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id_setting`);

--
-- Index pour la table `sound`
--
ALTER TABLE `sound`
  ADD PRIMARY KEY (`id_sound`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `notification` (`notification`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `document`
--
ALTER TABLE `document`
  MODIFY `id_document` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `document_display`
--
ALTER TABLE `document_display`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `seo`
--
ALTER TABLE `seo`
  MODIFY `id_seo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT pour la table `setting`
--
ALTER TABLE `setting`
  MODIFY `id_setting` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `sound`
--
ALTER TABLE `sound`
  MODIFY `id_sound` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
