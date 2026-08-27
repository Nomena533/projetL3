-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 28 août 2026 à 00:59
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
-- Base de données : `projetl3`
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
  `titre` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `prix` decimal(8,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `duree` varchar(255) NOT NULL,
  `statut` enum('brouillon','publié') NOT NULL DEFAULT 'brouillon',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `prof_id`, `instrument_id`, `titre`, `description`, `prix`, `image`, `duree`, `statut`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 'Cour de guitare', 'test', 50000.00, NULL, '6 mois', 'brouillon', '2026-08-25 16:44:33', '2026-08-25 16:44:33'),
(2, 7, 2, 'kjhkjh', 'khkjhkj', 20000.00, 'cours/U2dkMmrkRhjl8YJ1kkAUOfxmmAyOvJl5ibvkVgjr.png', '2 heures', 'brouillon', '2026-08-27 18:53:06', '2026-08-27 18:53:06'),
(3, 7, 2, 'Les bases de la guitare', 'Débuter sur l\'instrument de guitare depuis la base', 20000.00, 'cours/UmcARN000TaIIFgnBYHn0tt8NUUw5sCEqoWBtfKF.png', '2 heures', 'brouillon', '2026-08-27 19:32:14', '2026-08-27 19:32:14');

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
  `cour_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `progression` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `statut` enum('pending','confirmed','canceled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(1, 'Guitare', NULL, NULL, '2026-08-25 16:18:45', '2026-08-25 16:18:45'),
(2, 'Guitare', 'test', NULL, '2026-08-25 16:23:02', '2026-08-25 16:23:02');

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

-- --------------------------------------------------------

--
-- Structure de la table `levels`
--

CREATE TABLE `levels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(7, '2026_07_21_164946_create_cours_table', 1),
(8, '2026_07_21_164947_create_lessons_table', 1),
(9, '2026_07_21_165049_create_exercices_table', 1),
(10, '2026_07_21_172728_add_columns_to_users_table', 1),
(11, '2026_07_23_112921_create_soumissions_table', 1),
(12, '2026_07_23_113534_create_inscriptions_table', 1),
(13, '2026_07_23_115636_create_paiements_table', 1),
(14, '2026_07_23_120526_add_statut_to_users_table', 1),
(15, '2026_07_23_121425_create_certificats_table', 2),
(16, '2026_07_23_122058_create_favoris_table', 2),
(17, '2026_07_28_172546_create_resources_table', 2),
(18, '2026_07_28_173425_add_role_to_users_table', 2),
(19, '2026_07_28_215354_create_personal_access_tokens_table', 3),
(20, '2026_08_10_211433_add_firstname_to_users_table', 4),
(21, '2026_08_25_164946_create_cours_table', 5);

-- --------------------------------------------------------

--
-- Structure de la table `paiements`
--

CREATE TABLE `paiements` (
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
(1, 'App\\Models\\User', 2, 'react-app', '91f8a805f2a99344532e110c0f9fc7639f25d9f8e41b00a9d2f21ef0c237cf76', '[\"*\"]', NULL, NULL, '2026-08-10 21:33:58', '2026-08-10 21:33:58'),
(2, 'App\\Models\\User', 3, 'react-app', '0cfb7c3ce8c9467f39514d0a77983649cc8f76f283812e6e35cbbde57f9f5f51', '[\"*\"]', NULL, NULL, '2026-08-10 21:36:43', '2026-08-10 21:36:43'),
(3, 'App\\Models\\User', 4, 'react-app', 'd50c395b0b637dcc41c858211f20bf08fff8fb365a47f48e8ec6062dd2ccb856', '[\"*\"]', NULL, NULL, '2026-08-10 21:40:14', '2026-08-10 21:40:14'),
(4, 'App\\Models\\User', 4, 'react-app', '389a4c0f205a99728c39624d75dade56836e05bd799f37397168f7571d78fe86', '[\"*\"]', NULL, NULL, '2026-08-10 22:23:16', '2026-08-10 22:23:16'),
(5, 'App\\Models\\User', 5, 'react-app', '691ffb5762f2c8bb4367aeeb4d827d4e54e88250f321a6fd3889fd58491d755c', '[\"*\"]', NULL, NULL, '2026-08-10 22:25:13', '2026-08-10 22:25:13'),
(6, 'App\\Models\\User', 5, 'react-app', '793976ffec383ba4f6099fbff5ab20a814c15166fe7eea7f87ee409e9b1a2ad4', '[\"*\"]', NULL, NULL, '2026-08-10 22:25:33', '2026-08-10 22:25:33'),
(7, 'App\\Models\\User', 5, 'react-app', 'fd474217ff883874fcd547a9be8339eb4397d3f717305132d9a3405f2893d0c3', '[\"*\"]', NULL, NULL, '2026-08-10 22:32:11', '2026-08-10 22:32:11'),
(8, 'App\\Models\\User', 5, 'react-app', '707d7cb6c5f217bb0930707d599a2acb188ab4442fe0877a700806092fd69676', '[\"*\"]', NULL, NULL, '2026-08-10 22:50:27', '2026-08-10 22:50:27'),
(9, 'App\\Models\\User', 5, 'react-app', '84181317fc8dc860f9e0509ba3f3ad98a8a7714bca18cd2670ec6e37a4218c65', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:00', '2026-08-10 22:51:00'),
(10, 'App\\Models\\User', 5, 'react-app', 'b6601d1f3a18e7b72eabb437867f0ca4a76928dfc89bc5d0cf51ee9366c9b39f', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:02', '2026-08-10 22:51:02'),
(11, 'App\\Models\\User', 5, 'react-app', '34318f80cb2811bcf988e9441c501968e91e1d6f21ab77c1f88ed503a587e9f1', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:03', '2026-08-10 22:51:03'),
(12, 'App\\Models\\User', 5, 'react-app', 'a69cf331fab07ca3a046654c9a1f7d84686c5a886943adb3b0a148995d4333f7', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:05', '2026-08-10 22:51:05'),
(13, 'App\\Models\\User', 5, 'react-app', '2844f289eb2cb6ad1d32c81978bea3ee31cca08446cbd0d84f0bc753e6919d2a', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:08', '2026-08-10 22:51:08'),
(14, 'App\\Models\\User', 5, 'react-app', 'cf45473e41259a56db39296d0b7eabb3114c1b42e2de7eff2313b68ede05362c', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:09', '2026-08-10 22:51:09'),
(15, 'App\\Models\\User', 5, 'react-app', 'af384a71d93d13810e118b413fd729eea0aa65f3463b04191bb9789ec73a0dcf', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:10', '2026-08-10 22:51:10'),
(16, 'App\\Models\\User', 5, 'react-app', 'bcd44c430dd01a5792dad2775289d8175cfe636ac4d39bbd220cd53751809181', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:11', '2026-08-10 22:51:11'),
(17, 'App\\Models\\User', 5, 'react-app', '32e811b06e8db93a938f5f3cb3bf4572a498a0d5458d0e714839671c16a1fd98', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:13', '2026-08-10 22:51:13'),
(18, 'App\\Models\\User', 5, 'react-app', 'ae298afb37bd181fe4f502900ef2bc43db13105b720c317a63cf859dc0bd2c09', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:14', '2026-08-10 22:51:14'),
(19, 'App\\Models\\User', 5, 'react-app', '1f46c57885fe79c3de911fa06c6d13b34aff7a05f2e4cc5b37766bcd66e5b10e', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:16', '2026-08-10 22:51:16'),
(20, 'App\\Models\\User', 5, 'react-app', '600952322d7dab020d2a7bf949bcdfe626e63a33296a707b35c4e1a35e22a01c', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:17', '2026-08-10 22:51:17'),
(21, 'App\\Models\\User', 5, 'react-app', '78f9b8af39d8e2323ac0da29cb99ae969570244935d1c1cabfa8c49bb294275f', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:19', '2026-08-10 22:51:19'),
(22, 'App\\Models\\User', 5, 'react-app', 'c261e7f7fe13914342d34b78cc730ea697cdbea56b32658c659ce4f02ed19b6b', '[\"*\"]', NULL, NULL, '2026-08-10 22:51:20', '2026-08-10 22:51:20'),
(23, 'App\\Models\\User', 5, 'react-app', '00a880bb2a65ee29fa5d463c1c08bf85f95f6ca405b1cdfb58e02d3f050c3751', '[\"*\"]', NULL, NULL, '2026-08-11 15:14:01', '2026-08-11 15:14:01'),
(24, 'App\\Models\\User', 4, 'react-app', '58706e8d2a079e53f13b25ae1b8fb737618aad18a23aaebef64d02251a84d0f1', '[\"*\"]', NULL, NULL, '2026-08-11 15:14:59', '2026-08-11 15:14:59'),
(25, 'App\\Models\\User', 5, 'react-app', 'd18d4bad898f50bfb718da3d52a33851f516360fda8fea530ce7285db779b37b', '[\"*\"]', NULL, NULL, '2026-08-11 15:26:16', '2026-08-11 15:26:16'),
(26, 'App\\Models\\User', 5, 'react-app', '2781f3f739d3809913e885a8bf0fcec6cf2b1fb096c16928d59af0f95af53aad', '[\"*\"]', NULL, NULL, '2026-08-11 15:31:19', '2026-08-11 15:31:19'),
(27, 'App\\Models\\User', 5, 'react-app', 'c994543f396c2dd432bb3383b1c13ab716306afeb819f86797faa797d46e59c4', '[\"*\"]', NULL, NULL, '2026-08-11 15:50:56', '2026-08-11 15:50:56'),
(28, 'App\\Models\\User', 5, 'react-app', 'b131da9a771337e9300cff3d24a4a1ce3887d16b19721c391e4b3c9a25dc2a6a', '[\"*\"]', NULL, NULL, '2026-08-11 15:52:54', '2026-08-11 15:52:54'),
(29, 'App\\Models\\User', 5, 'react-app', 'e11b6a2828c52238309e0ba2c332af744f17f479e7c9053db520c1e36ffe619b', '[\"*\"]', NULL, NULL, '2026-08-11 19:03:41', '2026-08-11 19:03:41'),
(33, 'App\\Models\\User', 6, 'react-app', '01fd41a74ae07de34980aad7a4164c6ce20bb48f95e29bd925f4ef8b1e86d064', '[\"*\"]', NULL, NULL, '2026-08-11 19:19:05', '2026-08-11 19:19:05'),
(39, 'App\\Models\\User', 7, 'react-app', '89f2afb60ac84b7afdfc39a707eb2e6789ec3091ba7bd36b9d47697fadfb9850', '[\"*\"]', NULL, NULL, '2026-08-11 20:33:06', '2026-08-11 20:33:06'),
(40, 'App\\Models\\User', 7, 'react-app', '9c20778e4259c86293b468e1dd848461d6fb19c6532f1a21396c2e35bccb7f30', '[\"*\"]', NULL, NULL, '2026-08-11 20:33:21', '2026-08-11 20:33:21'),
(41, 'App\\Models\\User', 7, 'react-app', '1fa00ba34f696a714f17e8d77442650370c269f9275450afcbd799be13e0b542', '[\"*\"]', NULL, NULL, '2026-08-26 18:29:45', '2026-08-26 18:29:45'),
(42, 'App\\Models\\User', 7, 'react-app', 'f19de1612dad071eb7b2285d20935a63234c92b968e273a24aee7ef5f5cd6450', '[\"*\"]', '2026-08-27 19:32:12', NULL, '2026-08-27 18:26:46', '2026-08-27 19:32:12');

-- --------------------------------------------------------

--
-- Structure de la table `resources`
--

CREATE TABLE `resources` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lesson_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('video','audio','pdf') NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(1, 'eleve', NULL, NULL, NULL),
(2, 'professeur', NULL, NULL, NULL),
(3, 'admin', NULL, NULL, NULL);

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

-- --------------------------------------------------------

--
-- Structure de la table `soumissions`
--

CREATE TABLE `soumissions` (
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

INSERT INTO `users` (`id`, `name`, `firstname`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `photo`, `telephone`, `statut`, `role_id`) VALUES
(1, 'Rakoto', '', 'rakoto@gmail.com', NULL, '$2y$12$stb75ASanAxWnSP86pqqbutZTWgP85W884vEPzW2fMCU915vWdMPO', NULL, '2026-07-28 18:42:30', '2026-07-28 18:42:30', NULL, NULL, 'actif', 2),
(2, 'Razafindralambo', 'Anjaranomena', 'anjaranomenarazafindralambo@gmail.com', NULL, '$2y$12$KU5AqvVAzl6jc2.RZazGnuEJxfU7F6UKpceSIz3oLyRaZY774S6Ve', NULL, '2026-08-10 21:33:57', '2026-08-10 21:33:57', NULL, NULL, 'actif', 1),
(3, 'Razafindralambo', 'Anjaranekena', 'anjaranekenarazafindralambo@gmail.com', NULL, '$2y$12$L46/3apssHniqI4TkcV4Xe0JwSg4lXRtu4DVkkydjLWYULs.5S8f.', NULL, '2026-08-10 21:36:42', '2026-08-10 21:36:42', NULL, NULL, 'actif', 1),
(4, 'Razafindralambo', 'Miotisoa', 'miotisoarazafindralambo@gmail.com', NULL, '$2y$12$HdC7N9ZEjqHvqQzOwx9/O.fzsMxh5RgGxMThu.Id.R.ZS9RVF3EPS', NULL, '2026-08-10 21:40:14', '2026-08-10 21:40:14', NULL, NULL, 'actif', 1),
(5, 'Razafindralambo', 'Manavotra', 'manavotrarazafindralambo@gmail.com', NULL, '$2y$12$H3DJ8xiMqWRKMx6/ModPTeQTNnfUnOFdDm2q3RUrClZ70cfOQbUyS', NULL, '2026-08-10 22:25:12', '2026-08-10 22:25:12', NULL, NULL, 'actif', 1),
(6, 'Razafindralambo', 'Valisoa', 'valisoa@gmail.com', NULL, '$2y$12$nsx.V4lofPwOw.3su4ODse8Z29sBuCkIBd8cQ5kVkm9RJEdXS73Oi', NULL, '2026-08-11 19:19:04', '2026-08-11 19:19:04', NULL, NULL, 'actif', 1),
(7, 'Razafindralambo', 'Heriniaina', 'heriniaina@gmail.com', NULL, '$2y$12$tyPWYii7MQYQUZt6PzvIfestq2AxEM0ZhoX8L2C8EZz02EqSZrxxe', NULL, '2026-08-11 20:33:03', '2026-08-11 20:33:03', NULL, NULL, 'actif', 2);

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
  ADD KEY `cours_instrument_id_foreign` (`instrument_id`);

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
  ADD KEY `inscriptions_cour_id_foreign` (`cour_id`),
  ADD KEY `inscriptions_user_id_foreign` (`user_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessons_cour_id_foreign` (`cour_id`);

--
-- Index pour la table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paiements_inscription_id_foreign` (`inscription_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `soumissions_exercice_id_foreign` (`exercice_id`),
  ADD KEY `soumissions_user_id_foreign` (`user_id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `soumissions`
--
ALTER TABLE `soumissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  ADD CONSTRAINT `inscriptions_cour_id_foreign` FOREIGN KEY (`cour_id`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_cour_id_foreign` FOREIGN KEY (`cour_id`) REFERENCES `cours` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD CONSTRAINT `paiements_inscription_id_foreign` FOREIGN KEY (`inscription_id`) REFERENCES `inscriptions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `soumissions`
--
ALTER TABLE `soumissions`
  ADD CONSTRAINT `soumissions_exercice_id_foreign` FOREIGN KEY (`exercice_id`) REFERENCES `exercices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `soumissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
