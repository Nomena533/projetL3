-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 12 oct. 2026 à 20:45
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
(3, 14, 1, 1, 'Cour Mandresy', 'Test', 'cours/IdY6bSpBFXE2nDpM3IzjacrLEv2o44nkzLHt8rq8.png', '2 heures', 'publié', '2026-09-24 19:03:18', '2026-09-25 16:36:37');

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
-- Structure de la table `experiences_professeurs`
--

CREATE TABLE `experiences_professeurs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prof_id` bigint(20) UNSIGNED NOT NULL,
  `poste` varchar(255) NOT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `periode_debut` date DEFAULT NULL,
  `periode_fin` date DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `experiences_professeurs`
--

INSERT INTO `experiences_professeurs` (`id`, `prof_id`, `poste`, `lieu`, `periode_debut`, `periode_fin`, `description`, `created_at`, `updated_at`) VALUES
(1, 14, 'Professeur de guitare', 'EGM', '2026-01-01', '2026-08-06', 'Test avec : \"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, magni similique sit ipsa id possimus?\"', '2026-10-11 22:27:25', '2026-10-11 22:27:25'),
(2, 14, 'Professeur de chant', 'EGM', '2025-01-01', '2026-07-16', 'Test avec : \"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, magni similique sit ipsa id possimus?\"', '2026-10-11 22:27:25', '2026-10-11 22:27:25');

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

--
-- Déchargement des données de la table `failed_jobs`
--

INSERT INTO `failed_jobs` (`id`, `uuid`, `connection`, `queue`, `payload`, `exception`, `failed_at`) VALUES
(1, '9c821825-a799-43ba-8765-cae00c9aef76', 'database', 'default', '{\"uuid\":\"9c821825-a799-43ba-8765-cae00c9aef76\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:3;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790366562,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(377): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->runNextJob(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 17:02:43'),
(2, '7738614f-2f0f-48aa-9586-019c91bc11f4', 'database', 'default', '{\"uuid\":\"7738614f-2f0f-48aa-9586-019c91bc11f4\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:20;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790368006,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(212): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 17:26:48'),
(3, '4a25a25d-8845-4a79-a40e-cf798ddf8620', 'database', 'default', '{\"uuid\":\"4a25a25d-8845-4a79-a40e-cf798ddf8620\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:20;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790368006,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(377): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->runNextJob(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 17:26:48'),
(4, '102bd4da-dc16-43fb-96cd-9bd8cf63a928', 'database', 'default', '{\"uuid\":\"102bd4da-dc16-43fb-96cd-9bd8cf63a928\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:19;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790368249,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(212): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 17:30:50'),
(5, 'cc1fc40d-0eea-49df-afe6-f4c7ba6bf402', 'database', 'default', '{\"uuid\":\"cc1fc40d-0eea-49df-afe6-f4c7ba6bf402\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:19;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790368249,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(212): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 17:30:50');
INSERT INTO `failed_jobs` (`id`, `uuid`, `connection`, `queue`, `payload`, `exception`, `failed_at`) VALUES
(6, '7f2b1a35-2b56-42ee-a622-f17305e77068', 'database', 'default', '{\"uuid\":\"7f2b1a35-2b56-42ee-a622-f17305e77068\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:21;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790368631,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(212): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 17:37:14'),
(7, '3cd4c9d6-8237-4d34-935f-cf2786f4ec8d', 'database', 'default', '{\"uuid\":\"3cd4c9d6-8237-4d34-935f-cf2786f4ec8d\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:22;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790369012,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:32\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(377): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->runNextJob(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 17:43:35'),
(8, '5c8681ba-afb1-40e9-885d-24650a369d29', 'database', 'default', '{\"uuid\":\"5c8681ba-afb1-40e9-885d-24650a369d29\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:23;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790371195,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(212): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 18:19:57'),
(9, '89b3afe5-1e71-410f-8eb7-8ed3e9ee89c5', 'database', 'default', '{\"uuid\":\"89b3afe5-1e71-410f-8eb7-8ed3e9ee89c5\",\"displayName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\",\"command\":\"O:47:\\\"App\\\\Jobs\\\\SendInscriptionValidateNotificationJob\\\":1:{s:11:\\\"inscription\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:22:\\\"App\\\\Models\\\\Inscription\\\";s:2:\\\"id\\\";i:23;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"level\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\",\"batchId\":null},\"createdAt\":1790371807,\"delay\":null}', 'Error: Class \"App\\Notifications\\InscriptionValidateNoitification\" not found in D:\\Dev\\projetL3\\projet\\backend\\app\\Jobs\\SendInscriptionValidateNotificationJob.php:33\nStack trace:\n#0 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): App\\Jobs\\SendInscriptionValidateNotificationJob->handle()\n#1 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#2 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#3 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#4 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#5 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(129): Illuminate\\Container\\Container->call(Array)\n#6 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#7 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#8 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(133): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#9 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(136): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\SendInscriptionValidateNotificationJob), false)\n#10 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(180): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#11 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(137): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#12 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(129): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#13 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(70): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\SendInscriptionValidateNotificationJob))\n#14 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#15 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(504): Illuminate\\Queue\\Jobs\\Job->fire()\n#16 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(454): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#17 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(212): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#18 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(149): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#19 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(132): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#20 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#21 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#22 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#23 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#24 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(799): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#25 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#26 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Command\\Command.php(341): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#27 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#28 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(1117): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#29 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(356): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#30 D:\\Dev\\projetL3\\projet\\backend\\vendor\\symfony\\console\\Application.php(195): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#31 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(198): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\Dev\\projetL3\\projet\\backend\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1235): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\Dev\\projetL3\\projet\\backend\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#34 {main}', '2026-09-25 18:30:08');

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
(3, 1, 5, 200000.00, 'validé', '2026-09-25', '2027-06-25', '2026-09-15 14:12:46', '2026-09-25 17:02:40'),
(15, 1, 6, 200000.00, 'validé', '2026-09-19', '2027-06-19', '2026-09-15 17:45:42', '2026-09-19 16:28:59'),
(17, 1, 8, 150000.00, 'validé', '2026-09-19', '2027-06-19', '2026-09-19 03:37:53', '2026-09-19 06:16:13'),
(18, 1, 1, 150000.00, 'validé', '2025-12-26', '2026-09-26', '2026-09-22 04:54:16', '2026-09-22 04:55:29'),
(19, 1, 12, 200000.00, 'validé', '2026-09-25', '2027-06-25', '2026-09-24 18:16:43', '2026-09-25 17:30:49'),
(20, 1, 11, 200000.00, 'validé', '2026-09-25', '2027-06-25', '2026-09-24 18:34:42', '2026-09-25 17:26:44'),
(21, 1, 9, 150000.00, 'validé', '2026-09-25', '2027-06-25', '2026-09-24 19:00:35', '2026-09-25 17:37:11'),
(22, 1, 15, 150000.00, 'validé', '2026-09-25', '2027-06-25', '2026-09-25 17:42:07', '2026-09-25 17:43:32'),
(23, 1, 16, 200000.00, 'validé', '2026-09-25', '2027-06-25', '2026-09-25 18:19:09', '2026-09-25 19:08:05'),
(24, 1, 4, 200000.00, 'validé', '2026-09-29', '2027-06-29', '2026-09-29 11:20:40', '2026-09-29 11:21:33'),
(25, 1, 18, 200000.00, 'validé', '2026-10-12', '2027-07-12', '2026-10-12 07:55:34', '2026-10-12 09:07:45');

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
(29, 21, 2, '2026-09-24 19:00:35', '2026-09-24 19:00:35'),
(30, 22, 1, '2026-09-25 17:42:07', '2026-09-25 17:42:07'),
(31, 23, 2, '2026-09-25 18:19:09', '2026-09-25 18:19:09'),
(32, 23, 1, '2026-09-25 18:19:09', '2026-09-25 18:19:09'),
(33, 24, 1, '2026-09-29 11:20:40', '2026-09-29 11:20:40'),
(34, 24, 2, '2026-09-29 11:20:40', '2026-09-29 11:20:40'),
(35, 25, 2, '2026-10-12 07:55:34', '2026-10-12 07:55:34'),
(36, 25, 3, '2026-10-12 07:55:34', '2026-10-12 07:55:34');

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
(1, 'Guitare acoustique', NULL, NULL, NULL, NULL),
(2, 'Piano', NULL, NULL, NULL, NULL),
(3, 'Violon', NULL, NULL, NULL, NULL),
(4, 'Saxophone', NULL, NULL, NULL, NULL),
(5, 'Batterie', NULL, NULL, NULL, NULL),
(6, 'Guitare éléctirque', NULL, NULL, NULL, NULL),
(7, 'Guitare basse', NULL, NULL, NULL, NULL),
(8, 'Flutte', NULL, NULL, NULL, NULL);

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
(8, 5, 3, 'Bonjour', 1, '2026-09-18 20:17:51', '2026-09-18 20:18:33'),
(9, 16, 14, 'Bonjour Mr', 1, '2026-09-25 19:11:53', '2026-09-25 19:12:44'),
(10, 14, 16, 'Bonjour', 0, '2026-09-25 19:12:49', '2026-09-25 19:12:49'),
(11, 18, 3, 'Bonjour Mr, puis-je avoir plus d\'info sur la leçon 2 ?', 0, '2026-10-12 10:23:08', '2026-10-12 10:23:08');

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
(38, '2026_09_24_114939_create_notifications_table', 17),
(47, '2026_10_11_213143_create_profils_professeurs_table', 18),
(48, '2026_10_11_233417_create_professeur_instrument_table', 18),
(49, '2026_10_11_233523_create_experiences_professeurs_table', 18),
(50, '2026_10_11_233538_create_parcours_professeurs_table', 18),
(51, '2026_10_12_000000_align_professor_profile_schema', 18);

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
('0572a7cd-7340-459c-b77e-03557cd9e8b3', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Razafindralambo Nono vient d\\\\\'effectuer son paiement.\",\"paiement_id\":25}', NULL, '2026-09-29 11:21:01', '2026-09-29 11:21:01'),
('0c520b8f-55ad-4c2e-9ba6-fcc7060c1349', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Razafindralambo Nono s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', NULL, '2026-09-29 11:20:41', '2026-09-29 11:20:41'),
('13a209c1-f9c0-4ed0-ba5a-fbc1b8884231', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Rakotoarison Avotra s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', NULL, '2026-10-12 07:55:36', '2026-10-12 07:55:36'),
('14355fdb-71a3-46fc-b97a-4f0c5cbc07e8', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Ramamonjisoa Sitraka s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', '2026-09-25 18:16:26', '2026-09-25 17:42:10', '2026-09-25 18:16:26'),
('173f6d86-b8a8-4ecb-9fcb-9daf20f9032a', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":16}', NULL, '2026-09-25 18:18:15', '2026-09-25 18:18:15'),
('1de30806-ec9e-4629-b5aa-62a2451c6861', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":14}', '2026-09-25 09:11:36', '2026-09-24 16:51:54', '2026-09-25 09:11:36'),
('2649bb87-dc0c-475b-89a2-0d5541b734e3', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 1, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-25 16:36:38', '2026-09-25 16:36:38'),
('27687598-e06e-4def-8b81-f30e30fed850', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Andrianoromiraho Cedrico vient d\\\\\'effectuer son paiement.\",\"paiement_id\":22}', NULL, '2026-09-25 18:19:24', '2026-09-25 18:19:24'),
('30e27983-5a8e-48fe-a5c6-94ad1ea48cff', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":18}', NULL, '2026-10-12 07:46:18', '2026-10-12 07:46:18'),
('330e0ca3-535c-4b50-9103-4be62b98d488', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Andrianoromiraho Cedrico s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', NULL, '2026-09-25 18:19:10', '2026-09-25 18:19:10'),
('38a1f8d5-3014-46f1-93b7-f64a43260d9a', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Nomenjanahary Santaniaina vient d\\u2019effectuer son paiement.\",\"paiement_id\":17}', '2026-09-25 09:11:36', '2026-09-24 18:31:36', '2026-09-25 09:11:36'),
('3f5fab01-d1ea-4fb9-8f7b-edcf55a9c7ea', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Razafiarison Harena vient d\\\\\'effectuer son paiement.\",\"paiement_id\":20}', '2026-09-25 17:19:14', '2026-09-25 17:18:09', '2026-09-25 17:19:14'),
('48672196-f28f-48a9-815f-78729120d5fc', 'App\\Notifications\\InscriptionValidateNotification', 'App\\Models\\User', 4, '{\"titre\":\"Inscription valid\\u00e9\",\"message\":\"Votre inscription \\u00e0 la niveau initiation a \\u00e9t\\u00e9 valid\\u00e9\",\"niveau\":\"initiation\"}', NULL, '2026-09-29 11:21:37', '2026-09-29 11:21:37'),
('571a3de1-c4ee-4577-a105-f5710410bb3e', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":15}', '2026-09-25 18:16:26', '2026-09-25 17:41:25', '2026-09-25 18:16:26'),
('59566feb-02f8-4121-ba86-a3d3cea61851', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":17}', NULL, '2026-09-25 19:21:00', '2026-09-25 19:21:00'),
('66e40813-2c0d-4ea7-8621-174367b625e8', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Razafindralambo Nono vient d\\\\\'effectuer son paiement.\",\"paiement_id\":26}', NULL, '2026-09-29 11:23:19', '2026-09-29 11:23:19'),
('67cfaa74-e18c-4c17-aec6-c84c638f13c8', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Rakotoarison Avotra vient d\\\\\'effectuer son paiement.\",\"paiement_id\":27}', NULL, '2026-10-12 08:00:07', '2026-10-12 08:00:07'),
('6ad50ff9-82e7-4105-843d-42ac9e8bb263', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Ratovonarivo Sitraka s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', '2026-09-25 09:11:36', '2026-09-24 19:00:36', '2026-09-25 09:11:36'),
('862b1e45-e247-4ff1-84ac-9acedef1d43b', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau \\u00e9l\\u00e8ve inscrit \\u00e0 la formation\",\"message\":\"Un nouveau utilisateur s\'est inscrit \\u00e0 la formation.\",\"niveau\":\"initiation\"}', '2026-09-25 09:11:36', '2026-09-24 18:16:43', '2026-09-25 09:11:36'),
('86dccf8c-00fc-4943-9130-642f3326f355', 'App\\Notifications\\InscriptionValidateNotification', 'App\\Models\\User', 16, '{\"titre\":\"Inscription valid\\u00e9\",\"message\":\"Votre inscription \\u00e0 la niveau initiation a \\u00e9t\\u00e9 valid\\u00e9\",\"niveau\":\"initiation\"}', NULL, '2026-09-25 19:08:05', '2026-09-25 19:08:05'),
('883010a7-99dc-4603-a145-ef04d0ce86eb', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 9, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-25 16:36:38', '2026-09-25 16:36:38'),
('9f4036b9-98ab-4652-8901-3ba6ddf75fbe', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 6, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-25 16:36:38', '2026-09-25 16:36:38'),
('a6d3d74b-91ea-404b-8d03-e836ace2fda4', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Razafindralambo Valisoa vient d\\\\\'effectuer son paiement.\",\"paiement_id\":24}', NULL, '2026-09-29 10:53:10', '2026-09-29 10:53:10'),
('a8fec665-4033-4889-b934-c6ad56696c2a', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 12, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-25 16:36:38', '2026-09-25 16:36:38'),
('ad0e7596-505a-4f49-b972-fe765c65cf6d', 'App\\Notifications\\NewInscriptionEleveNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau eleve inscrit a la formation\",\"message\":\"Andrianantenaina Marinah s\'est inscrit a la formation initiation.\",\"niveau\":\"initiation\"}', '2026-09-25 09:11:36', '2026-09-24 18:34:43', '2026-09-25 09:11:36'),
('b078a042-1bf7-47d8-98f0-df772115b739', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Ramamonjisoa Sitraka vient d\\\\\'effectuer son paiement.\",\"paiement_id\":21}', '2026-09-25 18:16:26', '2026-09-25 17:42:25', '2026-09-25 18:16:26'),
('b79eb732-efe3-4a3f-824f-d3dedeae4259', 'App\\Notifications\\NewUserNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau utilisateur\",\"message\":\"Un nouveau utilisateur s\'est inscrit au plateforme.\",\"user_id\":13}', '2026-09-25 09:11:36', '2026-09-24 11:02:16', '2026-09-25 09:11:36'),
('bdfbb917-bcaf-4d03-b0b0-5e26e120861b', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Ratovonarivo Sitraka vient d\\u2019effectuer son paiement.\",\"paiement_id\":19}', '2026-09-25 09:11:19', '2026-09-24 19:01:07', '2026-09-25 09:11:19'),
('c29010fa-3e10-418c-8889-9df9eafbfb6e', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 8, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-25 16:36:38', '2026-09-25 16:36:38'),
('c91ea960-c0f0-4c09-9aaa-b54ad2852c77', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 5, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', '2026-09-25 17:20:23', '2026-09-25 16:36:38', '2026-09-25 17:20:23'),
('ca8129d2-1101-43f5-8f49-6d21f588ca95', 'App\\Notifications\\NewSoumissionSentNotification', 'App\\Models\\User', 3, '{\"titre\":\"Nouvelle soumission\",\"message\":\"Andrianantenaina Marinah a envoy\\u00e9 sa soumission pour l\'exercice Exercice le\\u00e7on 1\",\"exercice\":\"Exercice le\\u00e7on 1\"}', NULL, '2026-09-25 18:48:30', '2026-09-25 18:48:30'),
('d7f0e768-6d51-412b-bc33-1a9945a3ab58', 'App\\Notifications\\InscriptionValidateNotification', 'App\\Models\\User', 18, '{\"titre\":\"Inscription valid\\u00e9\",\"message\":\"Votre inscription \\u00e0 la niveau initiation a \\u00e9t\\u00e9 valid\\u00e9\",\"niveau\":\"initiation\"}', NULL, '2026-10-12 09:07:48', '2026-10-12 09:07:48'),
('e8ec848c-ddb2-4ce1-bf39-6ad975ed8703', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 4, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', NULL, '2026-09-25 16:36:38', '2026-09-25 16:36:38'),
('ebfa4a0e-9379-48bc-8502-84c5221924ea', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Andrianantenaina Marinah vient d\\u2019effectuer son paiement.\",\"paiement_id\":18}', '2026-09-25 09:11:36', '2026-09-24 18:57:27', '2026-09-25 09:11:36'),
('f146ad5c-7068-4f19-a8cb-898118c4524e', 'App\\Notifications\\CourPublieNotification', 'App\\Models\\User', 11, '{\"titre\":\"Nouveau cour publi\\u00e9\",\"message\":\"Un nouveau cour a \\u00e9t\\u00e9 publi\\u00e9 dans votre formation\",\"niveau\":\"initiation\",\"intrument\":\"Guitare\"}', '2026-09-25 18:17:11', '2026-09-25 16:36:38', '2026-09-25 18:17:11'),
('fed78d15-2e73-4dd0-b04b-0a07187efbe6', 'App\\Notifications\\NewPaiementNotification', 'App\\Models\\User', 2, '{\"titre\":\"Nouveau paiement\",\"message\":\"Razafindralambo Valisoa vient d\\\\\'effectuer son paiement.\",\"paiement_id\":23}', NULL, '2026-09-29 10:52:12', '2026-09-29 10:52:12');

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
(9, 3, '1', 50000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-17 18:11:10', '2026-09-25 17:02:40'),
(10, 3, '1', 50000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-17 18:14:06', '2026-09-18 18:09:11'),
(11, 3, '1', 50000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-17 18:15:39', '2026-09-17 18:15:39'),
(12, 3, '1', 50000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-17 18:16:50', '2026-09-17 18:16:50'),
(13, 17, '2', 200000.00, 'Premier paiement', '2131231231212312313', '11/22', '1233', 'carte', 'validé', '2026-09-19 03:55:38', '2026-09-19 06:15:15'),
(14, 17, '2', 100000.00, 'Paiement par tranche', '1231231231231231231', '12/12', '1212', 'carte', 'en attente', '2026-09-19 14:03:46', '2026-09-19 14:03:46'),
(15, 18, '1', 150000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-22 04:55:00', '2026-09-22 04:55:29'),
(16, 17, '1', 50000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-23 16:50:29', '2026-09-23 16:50:29'),
(17, 19, '2', 200000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-24 18:31:32', '2026-09-25 17:30:49'),
(18, 20, '2', 300000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-24 18:57:26', '2026-09-25 17:26:44'),
(19, 21, '1', 150000.00, 'Premier paiement', '1231231121231231231', '11/11', '1231', 'carte', 'validé', '2026-09-24 19:01:06', '2026-09-25 17:37:11'),
(20, 3, '1', 50000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-25 17:18:06', '2026-09-25 17:18:06'),
(21, 22, '1', 150000.00, 'Premier paiement', NULL, NULL, NULL, 'orange_money', 'validé', '2026-09-25 17:42:22', '2026-09-25 17:43:32'),
(22, 23, '1', 200000.00, 'Premier paiement', NULL, NULL, NULL, 'airtel_money', 'validé', '2026-09-25 18:19:23', '2026-09-25 19:08:05'),
(23, 18, '2', 100000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-29 10:52:07', '2026-09-29 10:52:07'),
(24, 18, '1', 50000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-29 10:53:09', '2026-09-29 10:53:09'),
(25, 24, '2', 300000.00, 'Premier paiement', NULL, NULL, NULL, 'airtel_money', 'validé', '2026-09-29 11:20:56', '2026-09-29 11:21:33'),
(26, 24, '1', 100000.00, 'Paiement par tranche', NULL, NULL, NULL, 'orange_money', 'en attente', '2026-09-29 11:23:17', '2026-09-29 11:23:17'),
(27, 25, '1', 200000.00, 'Premier paiement', NULL, NULL, NULL, 'airtel_money', 'validé', '2026-10-12 08:00:05', '2026-10-12 09:07:45');

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
-- Structure de la table `parcours_professeurs`
--

CREATE TABLE `parcours_professeurs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prof_id` bigint(20) UNSIGNED NOT NULL,
  `diplome` varchar(255) NOT NULL,
  `etablissement` varchar(255) DEFAULT NULL,
  `periode_debut` date DEFAULT NULL,
  `periode_fin` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `parcours_professeurs`
--

INSERT INTO `parcours_professeurs` (`id`, `prof_id`, `diplome`, `etablissement`, `periode_debut`, `periode_fin`, `created_at`, `updated_at`) VALUES
(1, 14, 'Licence en musicologie', 'EGM', '2022-01-01', '2025-10-12', '2026-10-11 22:27:25', '2026-10-11 22:27:25');

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
(68, 'App\\Models\\User', 15, 'react-app', 'ee69f9fa2bf52a34df762042153748f735dd0b0b0c7ce196491253dc67ab0be6', '[\"*\"]', NULL, NULL, '2026-09-25 17:41:24', '2026-09-25 17:41:24'),
(72, 'App\\Models\\User', 16, 'react-app', '33606749a09c64b191625eeceb7555af5e79cd07276cf938dfa091f5a30fdf69', '[\"*\"]', NULL, NULL, '2026-09-25 18:18:13', '2026-09-25 18:18:13'),
(76, 'App\\Models\\User', 17, 'react-app', '9c3998a09574115570c577056259a4b1ad47432e1e5943dcdc4fcded24bc94c8', '[\"*\"]', NULL, NULL, '2026-09-25 19:20:58', '2026-09-25 19:20:58'),
(81, 'App\\Models\\User', 2, 'react-app', '260c014cbe9642e63e40d52ecd4d462d6fbfc17bfad659f041453aba3cd30e6a', '[\"*\"]', '2026-10-12 14:00:07', NULL, '2026-09-29 11:12:46', '2026-10-12 14:00:07'),
(83, 'App\\Models\\User', 14, 'react-app', '939c1d8832cc8a64884f3ef2d535d99c7432512c350fd81cc8297ed732b80a25', '[\"*\"]', '2026-10-12 13:56:31', NULL, '2026-10-12 05:16:20', '2026-10-12 13:56:31'),
(85, 'App\\Models\\User', 18, 'react-app', '1788b8523ed060fb6e3537e9fe93c55422af2017880325c68a4a9a85f7fa2d67', '[\"*\"]', NULL, NULL, '2026-10-12 07:46:15', '2026-10-12 07:46:15'),
(87, 'App\\Models\\User', 16, 'react-app', '66fc3693f58e9467304285d1e48f9b995c0e69feec369cb87fb781592e713faf', '[\"*\"]', '2026-10-12 13:56:42', NULL, '2026-10-12 10:47:12', '2026-10-12 13:56:42');

-- --------------------------------------------------------

--
-- Structure de la table `professeur_instrument`
--

CREATE TABLE `professeur_instrument` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prof_id` bigint(20) UNSIGNED NOT NULL,
  `instrument_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `professeur_instrument`
--

INSERT INTO `professeur_instrument` (`id`, `prof_id`, `instrument_id`, `created_at`, `updated_at`) VALUES
(1, 14, 1, '2026-10-11 22:27:25', '2026-10-11 22:27:25'),
(2, 14, 6, '2026-10-11 22:27:25', '2026-10-11 22:27:25'),
(3, 14, 7, '2026-10-11 22:27:25', '2026-10-11 22:27:25');

-- --------------------------------------------------------

--
-- Structure de la table `profils_professeurs`
--

CREATE TABLE `profils_professeurs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prof_id` bigint(20) UNSIGNED NOT NULL,
  `specialite` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `annees_experiences` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `profils_professeurs`
--

INSERT INTO `profils_professeurs` (`id`, `prof_id`, `specialite`, `ville`, `annees_experiences`, `created_at`, `updated_at`) VALUES
(1, 14, 'Professeur de guitare acoustique', 'Antananarivo', 5, '2026-10-11 22:27:23', '2026-10-11 22:27:23');

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
(7, 6, 8, 'soumissions/UNwypjIX3WABOauVAL3ZZY4eakrdKSjUAn6YACMq.docx', 'document', 'Soumission Manavotra', 0, NULL, 'en attente', '2026-09-23 04:41:37', '2026-09-23 04:41:37'),
(8, 6, 15, 'soumissions/r65ZfxaNlz60Lyz6feX23no4afpKFqmYFawVoU6j.pdf', 'document', 'Réponse exercice leçon 1', 0, NULL, 'en attente', '2026-09-25 17:46:20', '2026-09-25 17:46:20'),
(9, 6, 12, 'soumissions/Oiz4rZegqFuGewXFa4VK7txsa4K0nmBuOculXNKz.pdf', 'document', 'Réponse Santa exo leçon 1', 0, NULL, 'en attente', '2026-09-25 17:51:03', '2026-09-25 17:51:03'),
(14, 6, 11, 'soumissions/hS0shbWaIDGsiQM4J6PpYiJncSBQITectriVhDrt.pdf', 'document', 'Réponse Marinah exo leçon 1', 0, NULL, 'en attente', '2026-09-25 18:48:29', '2026-09-25 18:48:29');

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
  `role_id` bigint(20) UNSIGNED NOT NULL,
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
  `statut` enum('actif','inactif','suspendu','bloqué') NOT NULL DEFAULT 'actif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `firstname`, `bio`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `photo`, `telephone`, `statut`) VALUES
(1, 2, 'Razafindralambo', 'Valisoa', NULL, 'valisoarazafindralambo@gmail.com', NULL, '$2y$12$XROKGQD9BQqmxGZgF4UPP.R7FZwuB3OfQ8WXMaIzD5U/exV2cMTEC', NULL, '2026-09-14 05:31:54', '2026-09-22 04:54:16', NULL, '0383456734', 'actif'),
(2, 1, 'admin', 'admin', NULL, 'admin@gmail.com', NULL, '$2y$12$hCA192AHk4fhRsRLj8ofTOH/BN3ekVMt8E3T0skNA1zk6bHirvh5O', NULL, '2026-09-14 05:33:00', '2026-09-14 05:33:00', NULL, NULL, 'actif'),
(3, 3, 'Razafindralambo', 'Heriniaina', NULL, 'heriniaina@gmail.com', NULL, '$2y$12$qbNpO6AcoN4MJ45H4.8mw.HWmWfx1yEwurSlxESza17uCclissf0e', NULL, '2026-09-14 05:36:09', '2026-09-14 05:36:09', NULL, NULL, 'actif'),
(4, 2, 'Razafindralambo', 'Nono', NULL, 'nono@gmail.com', NULL, '$2y$12$GXJoO82hDtF8xVrMZMbwOOPytszj5yQ3wlevACzQEVjCSqFU2D2ma', NULL, '2026-09-14 06:21:53', '2026-09-29 11:20:40', NULL, '0383456734', 'actif'),
(5, 2, 'Razafiarison', 'Harena', NULL, 'harenarazafiarison@gmail.com', NULL, '$2y$12$35XThGLjFShVm8A2P9eOHOLOpVNOOmf6QNBNEQooqAoiZ4c4APnXm', NULL, '2026-09-15 13:50:52', '2026-09-15 14:12:46', NULL, '0326746200', 'actif'),
(6, 2, 'Razafiarison', 'Sarobidy', NULL, 'sarobidyrazafiarison@gmail.com', NULL, '$2y$12$rdLDuwL8y59cMEdXSVP4pOAC3m6.DQfcgPayhOgU/cpMXx3RXgVQm', NULL, '2026-09-15 17:24:32', '2026-09-16 09:07:56', NULL, '0326746200', 'actif'),
(7, 3, 'Razafindralambo', 'Anysia', NULL, 'anysiarazafindralamabi@gmail.com', NULL, '$2y$12$4poD01Df5QpfofpN4a7K6uDGAQVibQiKDhXfg3duCaEK0vTJnE.h.', NULL, '2026-09-17 07:36:45', '2026-09-17 07:36:45', NULL, NULL, 'actif'),
(8, 2, 'Razafindralambo', 'Manavotra', NULL, 'manavotrarazafindralambo@gmail.com', NULL, '$2y$12$OkQ.UIKI8xwdZuZ2Y0ePLe8qj6mqDgJPDIxG8hRZMCPkvgz4LUSUu', NULL, '2026-09-19 03:36:54', '2026-09-19 03:37:53', NULL, '0326746200', 'actif'),
(9, 2, 'Ratovonarivo', 'Sitraka', NULL, 'sitrakaratovonarivo@gmail.com', NULL, '$2y$12$lH.eXkPGFHQPbFwvcANZBuZFbqWGafg0loaURhTYrk73lusG2/nYO', NULL, '2026-09-24 09:32:20', '2026-09-24 19:00:35', NULL, '0386789098', 'actif'),
(10, 3, 'Razafindralambo', 'Felix', NULL, 'felixrazafindralambo@gmail.com', NULL, '$2y$12$7vgg8gk/ieJp13SY.07Yj.rPlkQEd9R4Mrv16uDQLrZu1wTLSVScO', NULL, '2026-09-24 09:39:49', '2026-09-24 09:39:49', NULL, NULL, 'actif'),
(11, 2, 'Andrianantenaina', 'Marinah', NULL, 'marinahandrianantenaina@gmail.com', NULL, '$2y$12$nuVPcejLd05qEYJKWVV9hem7AnxuIXI6BZHHoeIwDsZjVyPAj5vjm', NULL, '2026-09-24 10:58:50', '2026-09-24 18:34:42', NULL, '0346062701', 'actif'),
(12, 2, 'Nomenjanahary', 'Santaniaina', NULL, 'santaniainanomenjanahary@gmail.com', NULL, '$2y$12$95qRnMRlRaENQHttUuk0NuatTaMxgCnf2K.tzQyXrIAVPCtxtrDsu', NULL, '2026-09-24 11:00:51', '2026-09-24 18:16:43', NULL, '0386789098', 'actif'),
(13, 3, 'Andriambololona', 'Miaritsiory', NULL, 'miaritsioryandriambololona@gmail.com', NULL, '$2y$12$/WOq.5.pqwlYWxTR5j1YkO6Dt6iO9z8UTSXwTP3bnn1DrXJ.bpV8u', NULL, '2026-09-24 11:02:09', '2026-09-24 11:02:09', NULL, NULL, 'actif'),
(14, 3, 'Rajoelison', 'Mandresy', 'Test avec : \"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, magni similique sit ipsa id possimus?\"', 'mandresyrajoelison@gmail.com', NULL, '$2y$12$o6VYTAnC7VEiRoaxJ69BWeb3WsE1c25WiFQapqYEewAZD6OF7I9ba', NULL, '2026-09-24 16:51:49', '2026-10-11 22:27:23', 'avatar/vSWIpCamqiadxHus9hEjD1jDtj8OPws8b0zwQUi4.jpg', '0326746200', 'actif'),
(15, 2, 'Ramamonjisoa', 'Sitraka', NULL, 'sitrakaramamonjisoa@gmail.com', NULL, '$2y$12$Ojn8.dFW1j8iMd/2POJPQOzuNDsTsiVwwJbS09Xi8pBtj1fT1U6Re', NULL, '2026-09-25 17:41:23', '2026-09-25 17:42:07', NULL, '0386789098', 'actif'),
(16, 2, 'Andrianoromiraho', 'Cedrico', 'Test avec : \"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati non minima amet, nam eos quis.\"', 'cedricoandrianoromiraho@gmail.com', NULL, '$2y$12$M4H2cK0h3CAx.CuuwkLViecD5.lRMfDKYLQY8hHDp4fyrbAcn2XGC', NULL, '2026-09-25 18:18:13', '2026-10-12 10:51:24', 'avatar/E5hmFkrAbGYZE45NODk7hZyWVC4p5aTpX0C2TaCL.jpg', '0383456734', 'actif'),
(17, 2, 'Tahinjanahary', 'Kevin', NULL, 'kevintahinjanahary@gmail.com', NULL, '$2y$12$WyCnwVYw4GAKtabzknw/AO6ORofRllHo0EVlFxy4PFtbBfLdFP5yu', NULL, '2026-09-25 19:20:58', '2026-09-25 19:20:58', NULL, NULL, 'actif'),
(18, 2, 'Rakotoarison', 'Avotra', NULL, 'avotrarakotoarison@gmail.com', NULL, '$2y$12$XqnuXOjxpibNTYlsB.0zJuahN/.Mtdod4V8p5SfoOdicLhslJTS8W', NULL, '2026-10-12 07:46:15', '2026-10-12 07:55:34', NULL, '0386789098', 'actif');

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
-- Index pour la table `experiences_professeurs`
--
ALTER TABLE `experiences_professeurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `experiences_professeurs_prof_id_foreign` (`prof_id`);

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
-- Index pour la table `parcours_professeurs`
--
ALTER TABLE `parcours_professeurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parcours_professeurs_prof_id_foreign` (`prof_id`);

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
-- Index pour la table `professeur_instrument`
--
ALTER TABLE `professeur_instrument`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `professeur_instrument_prof_id_instrument_id_unique` (`prof_id`,`instrument_id`),
  ADD KEY `professeur_instrument_instrument_id_foreign` (`instrument_id`);

--
-- Index pour la table `profils_professeurs`
--
ALTER TABLE `profils_professeurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profils_professeurs_prof_id_unique` (`prof_id`);

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
-- AUTO_INCREMENT pour la table `experiences_professeurs`
--
ALTER TABLE `experiences_professeurs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `favoris`
--
ALTER TABLE `favoris`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inscriptions`
--
ALTER TABLE `inscriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `inscription_instrument`
--
ALTER TABLE `inscription_instrument`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT pour la table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `paiementsbackup`
--
ALTER TABLE `paiementsbackup`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `parcours_professeurs`
--
ALTER TABLE `parcours_professeurs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT pour la table `professeur_instrument`
--
ALTER TABLE `professeur_instrument`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `profils_professeurs`
--
ALTER TABLE `profils_professeurs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `soumissionsbackup`
--
ALTER TABLE `soumissionsbackup`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
-- Contraintes pour la table `experiences_professeurs`
--
ALTER TABLE `experiences_professeurs`
  ADD CONSTRAINT `experiences_professeurs_prof_id_foreign` FOREIGN KEY (`prof_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Contraintes pour la table `parcours_professeurs`
--
ALTER TABLE `parcours_professeurs`
  ADD CONSTRAINT `parcours_professeurs_prof_id_foreign` FOREIGN KEY (`prof_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `professeur_instrument`
--
ALTER TABLE `professeur_instrument`
  ADD CONSTRAINT `professeur_instrument_instrument_id_foreign` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `professeur_instrument_prof_id_foreign` FOREIGN KEY (`prof_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `profils_professeurs`
--
ALTER TABLE `profils_professeurs`
  ADD CONSTRAINT `profils_professeurs_prof_id_foreign` FOREIGN KEY (`prof_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
