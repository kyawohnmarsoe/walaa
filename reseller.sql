-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2023 at 07:18 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reseller`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `account_index` int(11) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `is_max_account` varchar(255) NOT NULL,
  `account_description` text NOT NULL,
  `account_image_path` varchar(255) DEFAULT NULL,
  `account_thumbnail` varchar(255) DEFAULT NULL,
  `end_user_account_price` varchar(255) DEFAULT NULL,
  `account_price` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `account_index`, `account_name`, `is_max_account`, `account_description`, `account_image_path`, `account_thumbnail`, `end_user_account_price`, `account_price`, `created_at`, `updated_at`) VALUES
(1, 101, 'Ta3leem 50,000', '0', 'Ta3leem 50,000 Account', NULL, NULL, '120000', '25000', NULL, NULL),
(2, 103, 'Ta3leem 100,000', '0', 'Ta3leem 100,000 Account', NULL, NULL, '120000', '75000', NULL, NULL),
(3, 104, 'Ta3leem 200,000', '0', 'Ta3leem 200,000 Account', NULL, NULL, '120000', '150000', NULL, NULL),
(4, 105, 'Ta3leem 250,000', '0', 'Ta3leem 250,000 Account', NULL, NULL, '120000', '187500', NULL, NULL),
(5, 108, 'Standard', '0', 'مع الاشتراك الاعتيادي ستتمكن عائلتك بأكملها من استخدام الانترنت لمشاهدة المحاضرات الدراسية واستخدام برامج المحادثة ومواقع التواصل الاجتماعي', 'https://user.earthlink.iq/accountImages/54.png', NULL, '120000', '37000', NULL, NULL),
(6, 109, 'Economy', '0', 'لا ترغب بإنفاق الكثير؟ الاشتراك الاقتصادي مكرس لإرضائك واتمام جميع اعمالك بالسعر الذي يرضيك', 'https://user.earthlink.iq/accountImages/57.png', NULL, '120000', '22000', NULL, NULL),
(7, 110, 'Turbo', '0', 'هل يمكن لسرعة الانترنت ان تزداد؟ السريع سيجيبك على هذا التساؤل وينهي جميع التحميلات بوقت قياسي', 'https://user.earthlink.iq/accountImages/62.png', NULL, '120000', '50000', NULL, NULL),
(8, 112, 'More', '0', 'صمم ليلائم احتياجات صناع المحتوى ومحبي ألعاب الأونلاين، وجميع المهتمين بالحصول على سرعة عالية ومستقرة.', 'https://user.earthlink.iq/accountImages/75.png', NULL, '120000', '60000', NULL, NULL),
(9, 114, 'Business Pro', '0', 'الانترنت السريع والمستقر بإمكانه أن يحول مشروعك الصغير إلى مشروع عظيم! أنجز أعمالك بسلاسة وسرعة أكبر مع اشتراك رجال الأعمال', 'https://user.earthlink.iq/accountImages/107.jpg', NULL, '120000', '90000', NULL, NULL),
(10, 138, 'Plus', '0', 'اشتراك بلص ملائم لتلبية احتياجاتك وبسرعة تناسب الاستخدام العائلي', 'https://user.earthlink.iq/accountImages/138.png', NULL, '120000', '22000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `affiliates`
--

CREATE TABLE `affiliates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `affiliate_index` int(11) NOT NULL,
  `affiliate_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `affiliates`
--

INSERT INTO `affiliates` (`id`, `affiliate_index`, `affiliate_name`, `created_at`, `updated_at`) VALUES
(1, 21155, 'alghrery', NULL, NULL),
(2, 43116, 'obaidi', NULL, NULL),
(3, 61304, 'walaalink', NULL, NULL),
(4, 63031, 'walaalink1', NULL, NULL),
(5, 63033, 'walaalink2', NULL, NULL),
(6, 63035, 'walaalink3', NULL, NULL),
(7, 63038, 'walaalink4', NULL, NULL),
(8, 63040, 'walaalink5', NULL, NULL),
(9, 63042, 'walaalink6', NULL, NULL),
(10, 66309, 'nit', NULL, NULL),
(11, 75643, 'aligg', NULL, NULL),
(12, 84728, 'walaalink7', NULL, NULL),
(13, 84806, 'walaalink8', NULL, NULL),
(14, 85627, 'walaalink9', NULL, NULL),
(15, 89324, 'tmtm', NULL, NULL),
(16, 91221, 'walaalink12', NULL, NULL),
(17, 91233, 'walaalink10', NULL, NULL),
(18, 91234, 'walaalink11', NULL, NULL),
(19, 91235, 'walaalink13', NULL, NULL),
(20, 111316, 'e93', NULL, NULL),
(21, 111607, 'aligg2', NULL, NULL),
(22, 115970, 'hsham', NULL, NULL),
(23, 120257, 'alghrery6', NULL, NULL),
(24, 120783, 'walaalink19', NULL, NULL),
(25, 121578, 'walaalink20', NULL, NULL),
(26, 123631, 'shandel10', NULL, NULL),
(27, 123807, 'alghrery1', NULL, NULL),
(28, 129424, 'rom', NULL, NULL),
(29, 132278, 'walaalink22', NULL, NULL),
(30, 132279, 'walaalink23', NULL, NULL),
(31, 132280, 'walaalink24', NULL, NULL),
(32, 132281, 'walaalink21', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `account_index` int(11) NOT NULL,
  `affiliate_index` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `customer_user_id` varchar(255) NOT NULL,
  `customer_user_index` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `mobile_number2` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `user_active_manage` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `caller_id` varchar(255) DEFAULT NULL,
  `customer_user_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
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
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_09_29_021333_create_accounts_table', 1),
(6, '2023_09_29_062304_create_affiliates_table', 1),
(7, '2023_09_29_071248_create_customers_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@gmail.com', NULL, '$2y$10$LUpUffCEDkUQjMsmSXWE.eiHSJkdEgW9fvwvZpZ07VIyxuSB7sTxK', NULL, '2023-09-27 12:21:47', '2023-09-27 12:21:47'),
(2, 'Super Admin', 'superadmin@gmail.com', NULL, '$2y$10$qn.vbFPjVsXANHQEMZnI..q9PhdwRVXFymQ1jbjFHTxuvFrtat6HO', NULL, '2023-09-27 17:08:13', '2023-09-27 17:08:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accounts_account_index_unique` (`account_index`);

--
-- Indexes for table `affiliates`
--
ALTER TABLE `affiliates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `affiliates_affiliate_index_unique` (`affiliate_index`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `affiliates`
--
ALTER TABLE `affiliates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
