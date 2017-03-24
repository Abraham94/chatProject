-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 24 Mars 2017 à 16:45
-- Version du serveur :  10.1.13-MariaDB
-- Version de PHP :  7.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projetangular`
--
CREATE DATABASE IF NOT EXISTS `projetangular` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `projetangular`;

-- --------------------------------------------------------

--
-- Structure de la table `channel`
--

CREATE TABLE `channel` (
  `id` int(11) NOT NULL,
  `cle` varchar(200) NOT NULL,
  `intitule` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `channel`
--

INSERT INTO `channel` (`id`, `cle`, `intitule`) VALUES
(1, 'travail', 'Travail'),
(2, 'ecole', 'Ecole'),
(3, 'insta', 'Insta Promo');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `client`
--

INSERT INTO `client` (`id`, `nom`, `prenom`, `age`) VALUES
(1, 'Attoumani', 'Abraham', 22),
(2, 'Rozotte', 'Flo', 23),
(3, 'Djayet', 'Imane', 21),
(4, 'Harou', 'rou', 23),
(6, 'Vildeui', 'Yann', 26),
(7, 'Bagga', 'Islem', 24),
(8, 'Hernadez', 'Juan', 22);

-- --------------------------------------------------------

--
-- Structure de la table `interaction`
--

CREATE TABLE `interaction` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `objet` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `id_client` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `interaction`
--

INSERT INTO `interaction` (`id`, `date`, `objet`, `description`, `id_client`) VALUES
(1, '2017-03-01 17:25:35', 'Telephone', 'Probleme de réseau', 1);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `expediteur` varchar(50) NOT NULL,
  `destinataire` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `message`
--

INSERT INTO `message` (`id`, `message`, `expediteur`, `destinataire`) VALUES
(1, 'mon travail', 'Abraham', 'travail'),
(2, 'Hello', 'Anonyme : ', 'ecole'),
(3, 'Salut', 'Anonyme', 'insta'),
(4, 'salut', 'Anonyme', 'travail'),
(5, 'ouai', 'Anonyme', 'travail');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `login`, `pass`) VALUES
(1, 'user', 'userpass'),
(2, 'insta', 'instapass');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `interaction`
--
ALTER TABLE `interaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_client` (`id_client`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `channel`
--
ALTER TABLE `channel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `interaction`
--
ALTER TABLE `interaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `interaction`
--
ALTER TABLE `interaction`
  ADD CONSTRAINT `interaction_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
