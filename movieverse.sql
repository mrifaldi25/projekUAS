-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 18, 2025 at 02:08 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieverse`
--

-- --------------------------------------------------------

--
-- Table structure for table `kritik`
--

CREATE TABLE `kritik` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `isi` text NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kritik`
--

INSERT INTO `kritik` (`id`, `user_id`, `isi`, `tanggal`) VALUES
(13, 16, 'terus update film terbaru', '2025-07-15'),
(14, 19, 'web eror', '2025-07-15'),
(15, 21, 'video error tidak bisa dibuka', '2025-07-15'),
(16, 19, 'wow web bagus sekali', '2025-07-16'),
(18, 19, 'web bgus', '2025-07-16'),
(20, 21, 'web trus terupdate', '2025-07-16'),
(21, 19, 'gk seru filmnya', '2025-07-18');

-- --------------------------------------------------------

--
-- Table structure for table `notifikasi`
--

CREATE TABLE `notifikasi` (
  `id` int NOT NULL,
  `isi` text NOT NULL,
  `tanggal` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifikasi`
--

INSERT INTO `notifikasi` (`id`, `isi`, `tanggal`) VALUES
(10, 'Jadwal menonton hari ini', '2025-07-15 13:45:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(16, 'Aldi', 'aldi@gmail.com', '$2y$10$9gFh094VOKahuCoMaZ71kOA80B5S0qySqGdlDLkaRMI4TSrHL6oka', 'user', '2025-07-15 04:53:18'),
(17, 'Lukman', 'lukman@gmail.com', '$2y$10$0VXnhG2SMU96u9qS99LWI.iCdYodKVrbnBviVKV5q/0Jz0IbtVLCi', 'admin', '2025-07-15 05:00:07'),
(18, 'alda', 'alda@gmail.com', '$2y$10$gNN0KREwraAiLZ2EtBCLReuPiAFQtO1GfNc9Dx99IbPe.5KBYw4n6', 'user', '2025-07-15 05:16:28'),
(19, 'dadang', 'dadang@gmail.com', '$2y$10$5wF.5ta3fryLjLIj8ZO55uWx8.p1aicAi8HODAiZDLjFGGmMoeHJW', 'admin', '2025-07-15 05:20:53'),
(20, 'dhisti', 'dhistiam@gmail.com', '$2y$10$zsTp1GhKhUiHCQntIh3LGuA7wVoVRE.yzxPWuSwjXlFRs/B/FGVFm', 'admin', '2025-07-15 08:48:59'),
(21, 'zee', 'zee@gmail.com', '$2y$10$.EszuoU3g3BliCXSGdh6zOMUIIXTlSW.sicgTK2K.FicxhDYKwIrG', 'user', '2025-07-15 10:28:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kritik`
--
ALTER TABLE `kritik`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifikasi`
--
ALTER TABLE `notifikasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kritik`
--
ALTER TABLE `kritik`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `notifikasi`
--
ALTER TABLE `notifikasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
