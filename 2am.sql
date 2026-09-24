-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 25 sep. 2026 à 01:36
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `2am`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `certificats`
--

CREATE TABLE `certificats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `cour_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prof_id` bigint(20) UNSIGNED NOT NULL,
  `instrument_id` bigint(20) UNSIGNED NOT NULL,
  `niveau_id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `duree` varchar(255) NOT NULL,
  `statut` enum('brouillon','publié') NOT NULL DEFAULT 'brouillon',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `prof_id`, `instrument_id`, `niveau_id`, `titre`, `description`, `image`, `duree`, `statut`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 1, 'Cour test', 'test 2 modifier', 'cours/tFXp7DDFUPiwXMRpChm6ZlbURyvlVsuMfhYqW4qB.jpg', '15 min', 'publié', '2026-09-14 05:41:42', '2026-09-23 11:26:53'),
(2, 3, 1, 1, 'Cour de guitare prof 3', 'test 2', 'cours/N3uvA4gZNbX76CXREAXQtljhPr2CJ1vWZzZX5dZ9.png', '2 heures', 'publié', '2026-09-14 05:50:14', '2026-09-14 17:02:26'),
(3, 14, 1, 1, 'Cour Mandresy', 'Test', 'cours/IdY6bSpBFXE2nDpM3IzjacrLEv2o44nkzLHt8rq8.png', '2 heures', 'publié', '2026-09-24 19:03:18', '2026-09-24 20:29:43');

-- --------------------------------------------------------

--
-- Structure de la table `exercices`
--

CREATE TABLE `exercices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lesson_id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `exercices`
--

INSERT INTO `exercices` (`id`, `lesson_id`, `titre`, `description`, `created_at`, `updated_at`) VALUES
(6, 2, 'Exercice leçon 1', 'Test', '2026-09-22 05:13:32', '2026-09-22 05:13:32');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

CREATE TABLE `favoris` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `cour_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscriptions`
--

CREATE TABLE `inscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `niveau_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `statut` enum('en attente','validé','échoué') NOT NULL DEFAULT 'en attente',
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `inscriptions`
--

INSERT INTO `inscriptions` (`id`, `niveau_id`, `user_id`, `montant`, `statut`, `date_debut`, `date_fin`, `created_at`, `updated_at`) VALUES
(2, 1, 4, 100000.00, 'en attente', NULL, NULL, '2026-09-14 06:25:20', '2026-09-14 06:25:20'),
(3, 1, 5, 200000.00, 'en attente', NULL, NULL, '2026-09-15 14:12:46', '2026-09-15 14:12:46'),
(15, 1, 6, 200000.00, 'validé', '2026-09-19', '2027-06-19', '2026-09-15 17:45:42', '2026-09-19 16:28:59'),
(17, 1, 8, 150000.00, 'validé', '2026-09-19', '2027-06-19', '2026-09-19 03:37:53', '2026-09-19 06:16:13'),
(18, 1, 1, 150000.00, 'validé', '2025-12-26', '2026-09-26', '2026-09-22 04:54:16', '2026-09-22 04:55:29'),
(19, 1, 12, 200000.00, 'en attente', NULL, NULL, '2026-09-24 18:16:43', '2026-09-24 18:16:43'),
(20, 1, 11, 200000.00, 'en attente', NULL, NULL, '2026-09-24 18:34:42', '2026-09-24 18:34:42'),
(21, 1, 9, 150000.00, 'en attente', NULL, NULL, '2026-09-24 19:00:35', '2026-09-24 19:00:35');

-- --------------------------------------------------------

--
-- Structure de la table `inscription_instrument`
--

CREATE TABLE `inscription_instrument` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inscription_id` bigint(20) UNSIGNED NOT NULL,
  `instrument_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `inscription_instrument`
--

INSERT INTO `inscription_instrument` (`id`, `inscription_id`, `instrument_id`, `created_at`, `updated_at`) VALUES
(3, 2, 1, '2026-09-14 06:25:20', '2026-09-14 06:25:20'),
(4, 2, 2, '2026-09-14 06:25:20', '2026-09-14 06:25:20'),
(5, 3, 1, '2026-09-15 14:12:46', '2026-09-15 14:12:46'),
(6, 3, 3, '2026-09-15 14:12:46', '2026-09-15 14:12:46'),
(19, 15, 1, '2026-09-15 17:45:42', '2026-09-15 17:45:42'),
(20, 15, 2, '2026-09-15 17:45:42', '2026-09-15 17:45:42'),
(23, 17, 1, '2026-09-19 03:37:53', '2026-09-19 03:37:53'),
(24, 18, 1, '2026-09-22 04:54:16', '2026-09-22 04:54:16'),
(25, 19, 1, '2026-09-24 18:16:43', '2026-09-24 18:16:43'),
(26, 19, 2, '2026-09-24 18:16:43', '2026-09-24 18:16:43'),
(27, 20, 1, '2026-09-24 18:34:42', '2026-09-24 18:34:42'),
(28, 20, 2, '2026-09-24 18:34:42', '2026-09-24 18:34:42'),
(29, 21, 2, '2026-09-24 19:00:35', '2026-09-24 19:00:35');

-- --------------------------------------------------------

--
-- Structure de la table `instruments`
--

CREATE TABLE `instruments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `instruments`
--

INSERT INTO `instruments` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Guitare', NULL, NULL, NULL, NULL),
(2, 'Piano', NULL, NULL, NULL, NULL),
(3, 'Violon', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `lessons`
--

CREATE TABLE `lessons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cour_id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `duree` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lessons`
--

INSERT INTO `lessons` (`id`, `cour_id`, `titre`, `description`, `duree`, `created_at`, `updated_at`) VALUES
(1, 1, 'Leçon 1', 'Test', '12 min', '2026-09-14 05:45:12', '2026-09-14 05:45:12'),
(2, 2, 'Leçon 1', 'test', '10 min', '2026-09-14 05:50:36', '2026-09-14 05:50:36');

-- --------------------------------------------------------

--
-- Structure de la table `lessonsbackup`
--

CREATE TABLE `lessonsbackup` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cour_id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `duree` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `levels`
--

CREATE TABLE `levels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `duree` varchar(255) NOT NULL,
  `prix_mensuel` decimal(8,2) NOT NULL,
  `droit_inscription` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `levels`
--

INSERT INTO `levels` (`id`, `name`, `description`, `duree`, `prix_mensuel`, `droit_inscription`, `created_at`, `updated_at`) VALUES
(1, 'initiation', NULL, '9 mois', 50000.00, 100000.00, NULL, NULL),
(2, 'debutant', NULL, '9 mois', 60000.00, 120000.00, NULL, NULL),
(3, 'intermediare', NULL, '10 mois', 70000.00, 140000.00, NULL, NULL),
(4, 'avance', NULL, '10 mois', 80000.00, 150000.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 4, 3, 'Bonjour !', 1, '2026-09-17 15:48:21', '2026-09-18 19:45:49'),
(2, 4, 7, 'Bonjour !', 0, '2026-09-17 16:04:05', '2026-09-17 16:04:05'),
(3, 5, 3, 'Bonjour Mr !', 1, '2026-09-17 16:34:34', '2026-09-18 19:45:41'),
(4, 5, 3, 'Rebonjour Mr !', 1, '2026-09-17 18:41:11', '2026-09-18 19:45:41'),
(5, 3, 5, 'jjj', 1, '2026-09-18 19:26:51', '2026-09-18 19:45:12'),
(6, 5, 3, 'Bonjour', 1, '2026-09-18 19:45:24', '2026-09-18 19:45:41'),
(7, 3, 5, 'Bonjour', 1, '2026-09-18 19:46:13', '2026-09-18 19:46:43'),
(8, 5, 3, 'Bonjour', 1, '2026-09-18 20:17:51', '2026-09-18 20:18:33');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_07_21_164409_create_roles_table', 1),
(5, '2026_07_21_164738_create_levels_table', 1),
(6, '2026_07_21_164945_create_instruments_table', 1),
(7, '2026_07_21_172728_add_columns_to_users_table', 2),
(8, '2026_07_23_120526_add_statut_to_users_table', 3),
(9, '2026_07_28_173425_add_role_to_users_table', 3),
(10, '2026_07_28_215354_create_personal_access_tokens_table', 3),
(11, '2026_08_10_211433_add_firstname_to_users_table', 3),
(12, '2026_09_01_164737_add_duree_to_levels_table', 3),
(13, '2026_09_02_104738_create_cours_table', 3),
(14, '2026_09_02_114947_create_lessonsBackup_table', 4),
(15, '2026_09_02_115049_create_exercices_table', 4),
(16, '2026_09_02_116921_create_soumissions_table', 5),
(17, '2026_09_02_121425_create_certificats_table', 5),
(18, '2026_09_02_122058_create_favoris_table', 5),
(19, '2026_09_02_172546_create_resources_table', 5),
(20, '2026_09_03_174955_add_titre_to_resources_table', 5),
(21, '2026_09_07_113534_create_inscriptions_table', 5),
(22, '2026_09_08_124833_create_inscription_instrument_table', 5),
(23, '2026_09_08_135303_add_prix_to_levels_table', 5),
(24, '2026_09_09_115636_create_paiements_table', 6),
(25, '2026_09_09_162359_add_droit_inscription_to_levels_table', 7),
(26, '2026_09_15_194517_add_nombre_mois_to_paiements_table', 8),
(27, '2026_09_17_095211_create_messages_table', 9),
(28, '2026_09_17_230552_add_bio_to_users_table', 10),
(29, '2026_09_18_123325_add_columns_to_inscription_table', 11),
(31, '2026_09_18_195819_add_description_to_paiement_table', 12),
(32, '2026_09_19_000000_add_card_fields_to_paiements_table', 13),
(35, '2026_09_22_111704_add_description_to_soumissions_table', 14),
(36, '2026_09_22_165735_add_statut_to_soumissions_table', 15),
(37, '2026_09_23_070534_add_type_to_soumissions_table', 16),
(38, '2026_09_24_114939_create_notifications_table', 17);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('0cb07727-392b-480d-874e-13cf696f37e5', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 6, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('100e72d3-6256-400f-8381-b1de1cd61fe5', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 4, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('12824f2d-63e4-48f0-b8d0-51b5cecde84a', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 12, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('1de30806-ec9e-4629-b5aa-62a2451c6861', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":14}', NULL, '2026-09-24 16:51:54', '2026-09-24 16:51:54'),
('38a1f8d5-3014-46f1-93b7-f64a43260d9a', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Nomenjanahary Santaniaina vient d\\u2019effectuer son paiement.\",\"paiement_id\":17}', NULL, '2026-09-24 18:31:36', '2026-09-24 18:31:36'),
('5211c60a-d5a8-42ec-bd97-df3b5c4f56c6', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 9, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('629b7bfc-4af5-4760-a871-47821a9e119d', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 5, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('6ad50ff9-82e7-4105-843d-42ac9e8bb263', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Ratovonarivo Sitraka s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', NULL, '2026-09-24 19:00:36', '2026-09-24 19:00:36'),
('7119a4fe-79e6-4dee-b0d5-52ef35ad739d', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 1, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('862b1e45-e247-4ff1-84ac-9acedef1d43b', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau \\u00e9l\\u00e8ve inscrit \\u00e0 la formation\",\"message\":\"Un nouveau utilisateur s\'est inscrit \\u00e0 la formation.\",\"niveau\":\"initiation\"}', NULL, '2026-09-24 18:16:43', '2026-09-24 18:16:43'),
('ac171e89-54c5-436d-82cd-67733dcfd37c', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 11, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('ad0e7596-505a-4f49-b972-fe765c65cf6d', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Andrianantenaina Marinah s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', NULL, '2026-09-24 18:34:43', '2026-09-24 18:34:43'),
('b79eb732-efe3-4a3f-824f-d3dedeae4259', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":13}', NULL, '2026-09-24 11:02:16', '2026-09-24 11:02:16'),
('bdfbb917-bcaf-4d03-b0b0-5e26e120861b', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Ratovonarivo Sitraka vient d\\u2019effectuer son paiement.\",\"paiement_id\":19}', NULL, '2026-09-24 19:01:07', '2026-09-24 19:01:07'),
('eb67566f-acbe-4896-998c-a21003744cd0', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 8, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-24 20:29:44', '2026-09-24 20:29:44'),
('ebfa4a0e-9379-48bc-8502-84c5221924ea', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Andrianantenaina Marinah vient d\\u2019effectuer son paiement.\",\"paiement_id\":18}', NULL, '2026-09-24 18:57:27', '2026-09-24 18:57:27');

-- --------------------------------------------------------

--
-- Structure de la table `paiements`
--

CREATE TABLE `paiements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inscription_id` bigint(20) UNSIGNED NOT NULL,
  `nombre_mois` varchar(255) NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `description` longtext DEFAULT NULL,
  `numero_carte` varchar(255) DEFAULT NULL,
  `expiration_carte` varchar(5) DEFAULT NULL,
  `cvv_carte` varchar(4) DEFAULT NULL,
  `mode_paiement` varchar(255) NOT NULL,
  `statut` enum('en attente','validé','échoué') NOT NULL DEFAULT 'en attente',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `paiements`
--

INSERT INTO `paiements` (`id`, `inscription_id`, `nombre_mois`, `montant`, `description`, `numero_carte`, `expiration_carte`, `cvv_carte`, `mode_paiement`, `statut`, `created_at`, `updated_at`) VALUES
(1, 15, '3', 250000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-15 18:20:55', '2026-09-19 16:28:59'),
(3, 15, '2', 100000.00, NULL, NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-16 15:55:18', '2026-09-18 18:26:21'),
(8, 15, '1', 50000.00, NULL, NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-17 06:30:36', '2026-09-17 06:30:36'),
(9, 3, '1', 50000.00, NULL, NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-17 18:11:10', '2026-09-17 18:11:10'),
(10, 3, '1', 50000.00, NULL, NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-17 18:14:06', '2026-09-18 18:09:11'),
(11, 3, '1', 50000.00, NULL, NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-17 18:15:39', '2026-09-17 18:15:39'),
(12, 3, '1', 50000.00, NULL, NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-17 18:16:50', '2026-09-17 18:16:50'),
(13, 17, '2', 200000.00, 'Premier paiement', '2131231231212312313', '11/22', '1233', 'carte', 'validé', '2026-09-19 03:55:38', '2026-09-19 06:15:15'),
(14, 17, '2', 100000.00, 'Paiement par tranche', '1231231231231231231', '12/12', '1212', 'carte', 'en attente', '2026-09-19 14:03:46', '2026-09-19 14:03:46'),
(15, 18, '1', 150000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-22 04:55:00', '2026-09-22 04:55:29'),
(16, 17, '1', 50000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-23 16:50:29', '2026-09-23 16:50:29'),
(17, 19, '2', 200000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-24 18:31:32', '2026-09-24 18:31:32'),
(18, 20, '2', 300000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-24 18:57:26', '2026-09-24 18:57:26'),
(19, 21, '1', 150000.00, 'Premier paiement', '1231231121231231231', '11/11', '1231', 'carte', 'en attente', '2026-09-24 19:01:06', '2026-09-24 19:01:06');

-- --------------------------------------------------------

--
-- Structure de la table `paiementsbackup`
--

CREATE TABLE `paiementsbackup` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inscription_id` bigint(20) UNSIGNED NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `mode_paiement` varchar(255) NOT NULL,
  `statut` enum('pending','successful','failed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'react-app', 'f3044cafcae068c8d7cbad939fa3acca35ae1da6421a052a1b10f9bb78ac8956', '[\"*\"]', NULL, NULL, '2026-09-14 05:31:54', '2026-09-14 05:31:54'),
(3, 'App\\Models\\User', 2, 'react-app', '228bb392f95e8d03467d09853b4afaa63dda65946d74a5c01bec585ea061d2af', '[\"*\"]', NULL, NULL, '2026-09-14 05:33:00', '2026-09-14 05:33:00'),
(6, 'App\\Models\\User', 3, 'react-app', '1e48bd02eefe1da3552694c12556c44f785f25aeb2bb1ea23657a2aecc9da125', '[\"*\"]', NULL, NULL, '2026-09-14 05:36:09', '2026-09-14 05:36:09'),
(10, 'App\\Models\\User', 4, 'react-app', '7373f4a04941e288cf462bb436954cbe24afb4ddfe1d24c0323460d9a990bcc0', '[\"*\"]', NULL, NULL, '2026-09-14 06:21:53', '2026-09-14 06:21:53'),
(17, 'App\\Models\\User', 3, 'react-app', '1ce6b83ae6503406123202bb97a97677dfade7b94965f691a594686ccab82e80', '[\"*\"]', NULL, NULL, '2026-09-14 13:08:02', '2026-09-14 13:08:02'),
(18, 'App\\Models\\User', 4, 'react-app', 'adc993a1a1ec2ab1fa8cefdcb0551539a1f1f8ae8479cba3335520b5041d299f', '[\"*\"]', NULL, NULL, '2026-09-14 16:01:36', '2026-09-14 16:01:36'),
(19, 'App\\Models\\User', 2, 'react-app', '1ea1ab471fd5845599a01b69edcbcc1bc210a5e6468ad475ce8e61aaf5de0cbd', '[\"*\"]', NULL, NULL, '2026-09-14 16:43:12', '2026-09-14 16:43:12'),
(22, 'App\\Models\\User', 5, 'react-app', '0eacc9f6c961c0dc1fcf979094ca9b5dbe633d433b3b540ba73107935ab657c8', '[\"*\"]', NULL, NULL, '2026-09-15 13:50:52', '2026-09-15 13:50:52'),
(25, 'App\\Models\\User', 6, 'react-app', '01c5d384e99e15093f2913d6c6ac2329a9f328847da191c14e32f28b7edd74a2', '[\"*\"]', NULL, NULL, '2026-09-15 17:24:32', '2026-09-15 17:24:32'),
(30, 'App\\Models\\User', 2, 'react-app', '66dfe7cfa609c0dc391c6d8cf90b1145563739d670a233893424bd38e795695f', '[\"*\"]', '2026-09-23 14:27:15', NULL, '2026-09-16 16:44:16', '2026-09-23 14:27:15'),
(32, 'App\\Models\\User', 7, 'react-app', '4795c2a8734dd2a577b26fa8796b1889f69b5a73f8e3bea90e10ffec39fe2161', '[\"*\"]', NULL, NULL, '2026-09-17 07:36:45', '2026-09-17 07:36:45'),
(37, 'App\\Models\\User', 8, 'react-app', '1909ccd68653f638d11cbdc7d4b0f3fcc198d508019a4a5df8ccc84d006f48b3', '[\"*\"]', NULL, NULL, '2026-09-19 03:36:55', '2026-09-19 03:36:55'),
(49, 'App\\Models\\User', 3, 'react-app', '4d09b7259d9a2450567eb6a5aec358fb0b28d34fc937591f3aa556410ed44152', '[\"*\"]', NULL, NULL, '2026-09-23 14:46:08', '2026-09-23 14:46:08'),
(53, 'App\\Models\\User', 9, 'react-app', 'aa62760b4bd81d7ceadf56db3bfbc4ac129298789b3df748ae82129dbe9d7fc5', '[\"*\"]', NULL, NULL, '2026-09-24 09:32:21', '2026-09-24 09:32:21'),
(55, 'App\\Models\\User', 10, 'react-app', 'f3371bf949d5d3472631d2f8c37b5ad4d8f35e0d7f4aa94d8a9e4a5bdbdf2f70', '[\"*\"]', NULL, NULL, '2026-09-24 09:39:49', '2026-09-24 09:39:49'),
(56, 'App\\Models\\User', 11, 'react-app', '4d1397b9a072fef225b1028bc67b0f329aa8a4be083e0e946b8a0233d8479f11', '[\"*\"]', NULL, NULL, '2026-09-24 10:58:51', '2026-09-24 10:58:51'),
(57, 'App\\Models\\User', 12, 'react-app', 'fff201a08a2df540f10a170d42f2b40180f15822ba4cbf9e5d958ed1ba9d4ed7', '[\"*\"]', NULL, NULL, '2026-09-24 11:00:51', '2026-09-24 11:00:51'),
(58, 'App\\Models\\User', 13, 'react-app', '3089552056a6a689756820030c17d7e2997c46c0f6b24b2ee61657b908feb91a', '[\"*\"]', NULL, NULL, '2026-09-24 11:02:10', '2026-09-24 11:02:10'),
(59, 'App\\Models\\User', 14, 'react-app', '3688312c0825a7d7232381ee8b73d7303723371e9412ab107f5231479f57de07', '[\"*\"]', NULL, NULL, '2026-09-24 16:51:50', '2026-09-24 16:51:50'),
(63, 'App\\Models\\User', 9, 'react-app', 'd9f60a41909583cbc6282261a7cf7d2028cf640673841563788cde96cb21537b', '[\"*\"]', '2026-09-24 20:17:42', NULL, '2026-09-24 19:00:22', '2026-09-24 20:17:42'),
(64, 'App\\Models\\User', 14, 'react-app', '644d25b50d15e46d94aa7e8bf42aea579c097517f1216fc700400eef0201c2e5', '[\"*\"]', '2026-09-24 20:19:51', NULL, '2026-09-24 19:02:19', '2026-09-24 20:19:51'),
(65, 'App\\Models\\User', 2, 'react-app', '4fdfa69cfd4014c4e50655f91e18277aa6d5769df8e20c51e9d99ea5d5a4e74d', '[\"*\"]', '2026-09-24 20:29:42', NULL, '2026-09-24 19:03:54', '2026-09-24 20:29:42');

-- --------------------------------------------------------

--
-- Structure de la table `resources`
--

CREATE TABLE `resources` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lesson_id` bigint(20) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `type` enum('video','audio','pdf') NOT NULL,
  `fichier` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `resources`
--

INSERT INTO `resources` (`id`, `lesson_id`, `titre`, `type`, `fichier`, `created_at`, `updated_at`) VALUES
(2, 1, 'Canva projet', 'pdf', 'ressources/bY82n1kOFRyy9OCgKxXAArS2fK97xWTgrRsBZgaA.pdf', '2026-09-14 05:48:17', '2026-09-14 05:48:17'),
(3, 2, 'PLAN-DAFFAIRE-IM', 'pdf', 'ressources/DdOPGJdnJzXYCuAYMQqimdQfpDy2in1ihghuBoI3.pdf', '2026-09-14 05:52:03', '2026-09-14 05:52:03'),
(4, 2, 'Créer un flyer', 'pdf', 'ressources/d11FWozW9f8x5TdvJbzyJKv3hDtlPKf9kP6kANqR.pdf', '2026-09-14 05:52:03', '2026-09-14 05:52:03'),
(5, 2, 'hallelujah-aleluya-haendel', 'audio', 'ressources/C19hIUpkKnOkYVKeMavPlA26poTSviGt4kYGQhQL.mp3', '2026-09-14 05:52:04', '2026-09-14 05:52:04'),
(6, 1, 'Les Bases du FingerPicking pour les DÉBUTANTS !', 'video', 'ressources/I8Up3ygL7Jv1EWx9hEuMiZzN0IJAyenc9mZhwC4B.mkv', '2026-09-16 16:38:01', '2026-09-16 16:38:01');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', NULL, NULL, NULL),
(2, 'eleve', NULL, NULL, NULL),
(3, 'professeur', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('6w8BOCr9GlP656QR4MoOdQyr6UsppX2oDuAL6ulp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSjBmODVsVldQa3dxOVlWMGdlTnhzNjVNM052M2VoZXQ1aXlHQlVHOCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1790093654);

-- --------------------------------------------------------

--
-- Structure de la table `soumissions`
--

CREATE TABLE `soumissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `exercice_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `fichier` varchar(255) NOT NULL,
  `type` enum('video','audio','document') NOT NULL,
  `description` longtext DEFAULT NULL,
  `note` tinyint(3) UNSIGNED DEFAULT 0,
  `commentaire` longtext DEFAULT NULL,
  `statut` enum('en attente','corriger') NOT NULL DEFAULT 'en attente',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soumissions`
--

INSERT INTO `soumissions` (`id`, `exercice_id`, `user_id`, `fichier`, `type`, `description`, `note`, `commentaire`, `statut`, `created_at`, `updated_at`) VALUES
(4, 6, 1, 'soumissions/Q7iO3OVBRGKk1adi1dCaKvRouDTxoZvU041jfNGH.txt', 'video', NULL, 18, 'Bien joué', 'corriger', '2026-09-22 11:14:40', '2026-09-23 11:24:07'),
(5, 6, 5, 'soumissions/GMpszV5DZFFzR06O6WogSj6sCwwBC7x3kdAueU0z.txt', 'video', 'Soumission Harena', 14, 'A améliorer', 'corriger', '2026-09-23 04:29:04', '2026-09-23 11:28:18'),
(6, 6, 6, 'soumissions/5yILkyHp6Cv3lO9qKV8FwpCHJUsW8dAEWiv341qK.mkv', 'video', 'Soumission Sarobidy', 15, 'Bien joué', 'corriger', '2026-09-23 04:37:07', '2026-09-23 11:16:01'),
(7, 6, 8, 'soumissions/UNwypjIX3WABOauVAL3ZZY4eakrdKSjUAn6YACMq.docx', 'document', 'Soumission Manavotra', 0, NULL, 'en attente', '2026-09-23 04:41:37', '2026-09-23 04:41:37');

-- --------------------------------------------------------

--
-- Structure de la table `soumissionsbackup`
--

CREATE TABLE `soumissionsbackup` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `exercice_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `fichier` varchar(255) NOT NULL,
  `note` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `commentaire` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `bio` longtext DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `statut` enum('actif','inactif','suspendu','bloqué') NOT NULL DEFAULT 'actif',
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `firstname`, `bio`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `photo`, `telephone`, `statut`, `role_id`) VALUES
(1, 'Razafindralambo', 'Valisoa', NULL, 'valisoarazafindralambo@gmail.com', NULL, '$2y$12$XROKGQD9BQqmxGZgF4UPP.R7FZwuB3OfQ8WXMaIzD5U/exV2cMTEC', NULL, '2026-09-14 05:31:54', '2026-09-22 04:54:16', NULL, '0383456734', 'actif', 2),
(2, 'admin', 'admin', NULL, 'admin@gmail.com', NULL, '$2y$12$hCA192AHk4fhRsRLj8ofTOH/BN3ekVMt8E3T0skNA1zk6bHirvh5O', NULL, '2026-09-14 05:33:00', '2026-09-14 05:33:00', NULL, NULL, 'actif', 1),
(3, 'Razafindralambo', 'Heriniaina', NULL, 'heriniaina@gmail.com', NULL, '$2y$12$qbNpO6AcoN4MJ45H4.8mw.HWmWfx1yEwurSlxESza17uCclissf0e', NULL, '2026-09-14 05:36:09', '2026-09-14 05:36:09', NULL, NULL, 'actif', 3),
(4, 'Razafindralambo', 'Nono', NULL, 'nono@gmail.com', NULL, '$2y$12$GXJoO82hDtF8xVrMZMbwOOPytszj5yQ3wlevACzQEVjCSqFU2D2ma', NULL, '2026-09-14 06:21:53', '2026-09-14 06:25:20', NULL, '0383456734', 'actif', 2),
(5, 'Razafiarison', 'Harena', NULL, 'harenarazafiarison@gmail.com', NULL, '$2y$12$35XThGLjFShVm8A2P9eOHOLOpVNOOmf6QNBNEQooqAoiZ4c4APnXm', NULL, '2026-09-15 13:50:52', '2026-09-15 14:12:46', NULL, '0326746200', 'actif', 2),
(6, 'Razafiarison', 'Sarobidy', NULL, 'sarobidyrazafiarison@gmail.com', NULL, '$2y$12$rdLDuwL8y59cMEdXSVP4pOAC3m6.DQfcgPayhOgU/cpMXx3RXgVQm', NULL, '2026-09-15 17:24:32', '2026-09-16 09:07:56', NULL, '0326746200', 'actif', 2),
(7, 'Razafindralambo', 'Anysia', NULL, 'anysiarazafindralamabi@gmail.com', NULL, '$2y$12$4poD01Df5QpfofpN4a7K6uDGAQVibQiKDhXfg3duCaEK0vTJnE.h.', NULL, '2026-09-17 07:36:45', '2026-09-17 07:36:45', NULL, NULL, 'actif', 3),
(8, 'Razafindralambo', 'Manavotra', NULL, 'manavotrarazafindralambo@gmail.com', NULL, '$2y$12$OkQ.UIKI8xwdZuZ2Y0ePLe8qj6mqDgJPDIxG8hRZMCPkvgz4LUSUu', NULL, '2026-09-19 03:36:54', '2026-09-19 03:37:53', NULL, '0326746200', 'actif', 2),
(9, 'Ratovonarivo', 'Sitraka', NULL, 'sitrakaratovonarivo@gmail.com', NULL, '$2y$12$lH.eXkPGFHQPbFwvcANZBuZFbqWGafg0loaURhTYrk73lusG2/nYO', NULL, '2026-09-24 09:32:20', '2026-09-24 19:00:35', NULL, '0386789098', 'actif', 2),
(10, 'Razafindralambo', 'Felix', NULL, 'felixrazafindralambo@gmail.com', NULL, '$2y$12$7vgg8gk/ieJp13SY.07Yj.rPlkQEd9R4Mrv16uDQLrZu1wTLSVScO', NULL, '2026-09-24 09:39:49', '2026-09-24 09:39:49', NULL, NULL, 'actif', 3),
(11, 'Andrianantenaina', 'Marinah', NULL, 'marinahandrianantenaina@gmail.com', NULL, '$2y$12$nuVPcejLd05qEYJKWVV9hem7AnxuIXI6BZHHoeIwDsZjVyPAj5vjm', NULL, '2026-09-24 10:58:50', '2026-09-24 18:34:42', NULL, '0346062701', 'actif', 2),
(12, 'Nomenjanahary', 'Santaniaina', NULL, 'santaniainanomenjanahary@gmail.com', NULL, '$2y$12$95qRnMRlRaENQHttUuk0NuatTaMxgCnf2K.tzQyXrIAVPCtxtrDsu', NULL, '2026-09-24 11:00:51', '2026-09-24 18:16:43', NULL, '0386789098', 'actif', 2),
(13, 'Andriambololona', 'Miaritsiory', NULL, 'miaritsioryandriambololona@gmail.com', NULL, '$2y$12$/WOq.5.pqwlYWxTR5j1YkO6Dt6iO9z8UTSXwTP3bnn1DrXJ.bpV8u', NULL, '2026-09-24 11:02:09', '2026-09-24 11:02:09', NULL, NULL, 'actif', 3),
(14, 'Rajoelison', 'Mandresy', NULL, 'mandresyrajoelison@gmail.com', NULL, '$2y$12$o6VYTAnC7VEiRoaxJ69BWeb3WsE1c25WiFQapqYEewAZD6OF7I9ba', NULL, '2026-09-24 16:51:49', '2026-09-24 16:51:49', NULL, NULL, 'actif', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Index pour la table `certificats`
--
ALTER TABLE `certificats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `certificats_user_id_foreign` (`user_id`),
  ADD KEY `certificats_cour_id_foreign` (`cour_id`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cours_prof_id_foreign` (`prof_id`),
  ADD KEY `cours_instrument_id_foreign` (`instrument_id`),
  ADD KEY `cours_niveau_id_foreign` (`niveau_id`);

--
-- Index pour la table `exercices`
--
ALTER TABLE `exercices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exercices_lesson_id_foreign` (`lesson_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favoris_user_id_foreign` (`user_id`),
  ADD KEY `favoris_cour_id_foreign` (`cour_id`);

--
-- Index pour la table `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inscriptions_niveau_id_foreign` (`niveau_id`),
  ADD KEY `inscriptions_user_id_foreign` (`user_id`);

--
-- Index pour la table `inscription_instrument`
--
ALTER TABLE `inscription_instrument`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inscription_instrument_inscription_id_foreign` (`inscription_id`),
  ADD KEY `inscription_instrument_instrument_id_foreign` (`instrument_id`);

--
-- Index pour la table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lessonsbackup`
--
ALTER TABLE `lessonsbackup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessonsbackup_cour_id_foreign` (`cour_id`);

--
-- Index pour la table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_sender_id_foreign` (`sender_id`),
  ADD KEY `messages_receiver_id_foreign` (`receiver_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Index pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paiementsbackup`
--
ALTER TABLE `paiementsbackup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paiementsbackup_inscription_id_foreign` (`inscription_id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Index pour la table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resources_lesson_id_foreign` (`lesson_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `soumissions`
--
ALTER TABLE `soumissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `soumissionsbackup`
--
ALTER TABLE `soumissionsbackup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soumissionsbackup_exercice_id_foreign` (`exercice_id`),
  ADD KEY `soumissionsbackup_user_id_foreign` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `certificats`
--
ALTER TABLE `certificats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `exercices`
--
ALTER TABLE `exercices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `favoris`
--
ALTER TABLE `favoris`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inscriptions`
--
ALTER TABLE `inscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `inscription_instrument`
--
ALTER TABLE `inscription_instrument`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `lessonsbackup`
--
ALTER TABLE `lessonsbackup`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `paiementsbackup`
--
ALTER TABLE `paiementsbackup`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT pour la table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `soumissions`
--
ALTER TABLE `soumissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `soumissionsbackup`
--
ALTER TABLE `soumissionsbackup`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `certificats`
--
ALTER TABLE `certificats`
  ADD CONSTRAINT `certificats_cour_id_foreign` FOREIGN KEY (`cour_id`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `certificats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `cours_instrument_id_foreign` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cours_niveau_id_foreign` FOREIGN KEY (`niveau_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cours_prof_id_foreign` FOREIGN KEY (`prof_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `exercices`
--
ALTER TABLE `exercices`
  ADD CONSTRAINT `exercices_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `favoris_cour_id_foreign` FOREIGN KEY (`cour_id`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoris_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD CONSTRAINT `inscriptions_niveau_id_foreign` FOREIGN KEY (`niveau_id`) REFERENCES `levels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `inscription_instrument`
--
ALTER TABLE `inscription_instrument`
  ADD CONSTRAINT `inscription_instrument_inscription_id_foreign` FOREIGN KEY (`inscription_id`) REFERENCES `inscriptions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscription_instrument_instrument_id_foreign` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `lessonsbackup`
--
ALTER TABLE `lessonsbackup`
  ADD CONSTRAINT `lessonsbackup_cour_id_foreign` FOREIGN KEY (`cour_id`) REFERENCES `cours` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `paiementsbackup`
--
ALTER TABLE `paiementsbackup`
  ADD CONSTRAINT `paiementsbackup_inscription_id_foreign` FOREIGN KEY (`inscription_id`) REFERENCES `inscriptions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `soumissionsbackup`
--
ALTER TABLE `soumissionsbackup`
  ADD CONSTRAINT `soumissionsbackup_exercice_id_foreign` FOREIGN KEY (`exercice_id`) REFERENCES `exercices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `soumissionsbackup_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
