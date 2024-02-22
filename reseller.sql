-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2024 at 04:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `account_name` varchar(191) NOT NULL,
  `account_description` text DEFAULT NULL,
  `account_image_path` varchar(191) DEFAULT NULL,
  `account_thumbnail` varchar(191) DEFAULT NULL,
  `end_user_account_price` varchar(191) DEFAULT NULL,
  `account_price` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `account_index`, `account_name`, `account_description`, `account_image_path`, `account_thumbnail`, `end_user_account_price`, `account_price`, `created_at`, `updated_at`) VALUES
(1, 101, 'Ta3leem 50,000', 'Ta3leem 50,000 Account', NULL, NULL, '120000', '25000', NULL, NULL),
(2, 103, 'Ta3leem 100,000', 'Ta3leem 100,000 Account', NULL, NULL, '120000', '75000', NULL, NULL),
(3, 104, 'Ta3leem 200,000', 'Ta3leem 200,000 Account', NULL, NULL, '120000', '150000', NULL, NULL),
(4, 105, 'Ta3leem 250,000', 'Ta3leem 250,000 Account', NULL, NULL, '120000', '187500', NULL, NULL),
(5, 108, 'Standard', 'مع الاشتراك الاعتيادي ستتمكن عائلتك بأكملها من استخدام الانترنت لمشاهدة المحاضرات الدراسية واستخدام برامج المحادثة ومواقع التواصل الاجتماعي', 'https://user.earthlink.iq/accountImages/54.png', NULL, '120000', '37000', NULL, NULL),
(6, 109, 'Economy', 'لا ترغب بإنفاق الكثير؟ الاشتراك الاقتصادي مكرس لإرضائك واتمام جميع اعمالك بالسعر الذي يرضيك', 'https://user.earthlink.iq/accountImages/57.png', NULL, '120000', '22000', NULL, NULL),
(7, 110, 'Turbo', 'هل يمكن لسرعة الانترنت ان تزداد؟ السريع سيجيبك على هذا التساؤل وينهي جميع التحميلات بوقت قياسي', 'https://user.earthlink.iq/accountImages/62.png', NULL, '120000', '50000', NULL, NULL),
(8, 112, 'More', 'صمم ليلائم احتياجات صناع المحتوى ومحبي ألعاب الأونلاين، وجميع المهتمين بالحصول على سرعة عالية ومستقرة.', 'https://user.earthlink.iq/accountImages/75.png', NULL, '120000', '60000', NULL, NULL),
(9, 114, 'Business Pro', 'الانترنت السريع والمستقر بإمكانه أن يحول مشروعك الصغير إلى مشروع عظيم! أنجز أعمالك بسلاسة وسرعة أكبر مع اشتراك رجال الأعمال', 'https://user.earthlink.iq/accountImages/107.jpg', NULL, '120000', '90000', NULL, NULL),
(10, 138, 'Plus', 'اشتراك بلص ملائم لتلبية احتياجاتك وبسرعة تناسب الاستخدام العائلي', 'https://user.earthlink.iq/accountImages/138.png', NULL, '120000', '22000', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `affiliates`
--

CREATE TABLE `affiliates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `affiliate_index` int(11) NOT NULL,
  `affiliate_name` varchar(191) NOT NULL,
  `balance` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `affiliates`
--

INSERT INTO `affiliates` (`id`, `affiliate_index`, `affiliate_name`, `balance`, `created_at`, `updated_at`) VALUES
(1, 21155, 'alghrery', 0, NULL, NULL),
(2, 43116, 'obaidi', 0, NULL, NULL),
(3, 61304, 'walaalink', 0, NULL, NULL),
(4, 63031, 'walaalink1', 0, NULL, NULL),
(5, 63033, 'walaalink2', 0, NULL, NULL),
(6, 63035, 'walaalink3', 0, NULL, NULL),
(7, 63038, 'walaalink4', 0, NULL, NULL),
(8, 63040, 'walaalink5', 0, NULL, NULL),
(9, 63042, 'walaalink6', 0, NULL, NULL),
(10, 66309, 'nit', 0, NULL, NULL),
(11, 75643, 'aligg', 0, NULL, NULL),
(12, 84728, 'walaalink7', 0, NULL, NULL),
(13, 84806, 'walaalink8', 0, NULL, NULL),
(14, 85627, 'walaalink9', 0, NULL, NULL),
(15, 91221, 'walaalink12', 0, NULL, NULL),
(16, 91233, 'walaalink10', 0, NULL, NULL),
(17, 91234, 'walaalink11', 0, NULL, NULL),
(18, 91235, 'walaalink13', 0, NULL, NULL),
(19, 111316, 'e93', 0, NULL, NULL),
(20, 111607, 'aligg2', 0, NULL, NULL),
(21, 115970, 'hsham', 0, NULL, NULL),
(22, 120257, 'alghrery6', 0, NULL, NULL),
(23, 120783, 'walaalink19', 0, NULL, NULL),
(24, 121578, 'walaalink20', 0, NULL, NULL),
(25, 123631, 'shandel10', 0, NULL, NULL),
(26, 123807, 'alghrery1', 0, NULL, NULL),
(27, 129424, 'rom', 0, NULL, NULL),
(28, 132278, 'walaalink22', 0, NULL, NULL),
(29, 132279, 'walaalink23', 0, NULL, NULL),
(30, 132280, 'walaalink24', 0, NULL, NULL),
(31, 132281, 'walaalink21', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `affiliates_payments`
--

CREATE TABLE `affiliates_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `affiliate_name` varchar(191) DEFAULT NULL,
  `affiliate_index` varchar(191) NOT NULL,
  `prev_balance` bigint(20) NOT NULL,
  `paid_amount` bigint(20) NOT NULL,
  `current_balance` bigint(20) NOT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `modify_user` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `apitokens`
--

CREATE TABLE `apitokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `apitoken` longtext NOT NULL,
  `current_time` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `apitokens`
--

INSERT INTO `apitokens` (`id`, `apitoken`, `current_time`, `created_at`, `updated_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IndhbGFhaW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZXNlbGxlciIsIkFmZmlsaWF0ZUluZGV4IjoiNjMwMzEiLCJBZmZpbGlhdGVOYW1lIjoid2FsYWFsaW5rMSIsIkFwcGxpY2F0aW9uTmFtZSI6IlJlc2VsbGVyIiwibmJmIjoxNzA4MDAyMzQ0LCJleHAiOjE3MDgwMDU5NDQsImlzcyI6ImJpbGxpbmdhcGkiLCJhdWQiOiJkMjZkMTFkZTUxYmE0YmE2YWQ0ZGVhZTc5ODY1Mzk4YiJ9.IPQ55QliAyluDdHGbnlePE9-bdFZLvqdCRV-WcXYlbc', 1708002345, NULL, '2024-02-15 06:05:45');

-- --------------------------------------------------------

--
-- Table structure for table `apiusers`
--

CREATE TABLE `apiusers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `login_type` varchar(191) NOT NULL,
  `grant_type` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `apiusers`
--

INSERT INTO `apiusers` (`id`, `username`, `password`, `login_type`, `grant_type`, `created_at`, `updated_at`) VALUES
(1, 'walaaim', '@walaalink@', '1', 'password', '2024-01-03 03:24:59', '2024-01-02 20:33:04');

-- --------------------------------------------------------

--
-- Table structure for table `balance_transfers`
--

CREATE TABLE `balance_transfers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `affiliate_name` varchar(191) DEFAULT NULL,
  `affiliate_index` varchar(200) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `notes` varchar(200) DEFAULT NULL,
  `balance` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `boards`
--

CREATE TABLE `boards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `writing` text DEFAULT NULL,
  `modifyUser` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `writing`, `modifyUser`, `created_at`, `updated_at`) VALUES
(1, 'Testing', 'Admin', '2024-02-08 07:57:59', '2024-02-08 00:59:33');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `account_index` int(11) NOT NULL,
  `sub_account_id` int(11) NOT NULL,
  `affiliate_index` int(11) NOT NULL,
  `first_name` varchar(191) DEFAULT NULL,
  `last_name` varchar(191) DEFAULT NULL,
  `customer_user_id` varchar(191) NOT NULL,
  `customer_user_index` int(11) NOT NULL,
  `mobile_number` varchar(191) DEFAULT NULL,
  `mobile_number2` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `user_password` varchar(191) NOT NULL,
  `city` varchar(191) DEFAULT NULL,
  `company` varchar(191) DEFAULT NULL,
  `state` varchar(191) DEFAULT NULL,
  `display_name` varchar(191) DEFAULT NULL,
  `caller_id` varchar(191) DEFAULT NULL,
  `customer_user_notes` text DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `active_status` int(11) NOT NULL DEFAULT 1,
  `account_status` varchar(191) DEFAULT NULL,
  `account_package_type` varchar(191) DEFAULT NULL,
  `user_group_id` int(11) DEFAULT NULL,
  `manual_expiration_date` varchar(255) DEFAULT NULL,
  `can_refill` varchar(191) DEFAULT NULL,
  `can_change_account` varchar(191) DEFAULT NULL,
  `can_extend_user` varchar(191) DEFAULT NULL,
  `sms_status` int(50) NOT NULL DEFAULT 0,
  `sms_sent_by` int(50) NOT NULL DEFAULT 0,
  `latitude` varchar(200) DEFAULT NULL,
  `longitude` varchar(200) DEFAULT NULL,
  `balance` varchar(250) NOT NULL DEFAULT '0',
  `connection_type` varchar(150) DEFAULT NULL,
  `tower_id` int(11) NOT NULL DEFAULT 0,
  `device_id` int(11) NOT NULL DEFAULT 0,
  `port_id` int(11) NOT NULL DEFAULT 0,
  `complete_status` int(11) NOT NULL DEFAULT 0,
  `recommend_point` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `account_index`, `sub_account_id`, `affiliate_index`, `first_name`, `last_name`, `customer_user_id`, `customer_user_index`, `mobile_number`, `mobile_number2`, `address`, `email`, `user_password`, `city`, `company`, `state`, `display_name`, `caller_id`, `customer_user_notes`, `status`, `active_status`, `account_status`, `account_package_type`, `user_group_id`, `manual_expiration_date`, `can_refill`, `can_change_account`, `can_extend_user`, `sms_status`, `sms_sent_by`, `latitude`, `longitude`, `balance`, `connection_type`, `tower_id`, `device_id`, `port_id`, `complete_status`, `recommend_point`, `created_at`, `updated_at`) VALUES
(1, 114, 0, 43116, '', '', 'satar2@obaidi', 28372285, NULL, NULL, '', 'satar2@obaidi', '', '', '', '', 'ستار جبار غزال', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-11-27 05:27:26'),
(2, 114, 0, 43116, NULL, NULL, 'fade@obaidi', 29146363, '669 5280 6757', NULL, NULL, 'fade@obaidi', 'fade123', NULL, NULL, NULL, 'فادي', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '24/04/2023 11:14 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2024-01-24 00:35:53'),
(3, 114, 0, 61304, NULL, NULL, '1991@walaa', 25167005, NULL, NULL, NULL, '1991@walaa', 'walaa', NULL, NULL, NULL, NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', 3, '07/12/2023 09:13 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(4, 114, 0, 61304, '', '', '1000@walaa1', 27049910, NULL, NULL, '', '1000@walaa1', '', '', '', '', 'test', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '26/11/2023 12:12 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(5, 114, 0, 61304, '', '', '2022@walaa', 27205453, NULL, NULL, '', '2022@walaa', '', '', '', '', '', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '25/12/2023 06:14 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(6, 114, 0, 61304, 'Yas', 'Ser', 'yasser@walaa', 28744427, '07503182792', '297281305', 'Address', 'yasser@walaa', 'yasser', 'City', 'Test', 'State', 'ياسر', NULL, 'Test Notes', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '02/07/2023 04:18 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(7, 114, 0, 61304, '', '', 'nawfal2@walaa', 28996558, '07406325098', NULL, '', 'nawfal2@walaa', '', '', '', '', 'نوفل', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '25/12/2023 09:09 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(8, 114, 0, 63031, '', '', 'hamodikhaled@walaa', 23480404, '7905250948', NULL, '', 'hamodikhaled@walaa', '', '', '', '', 'حمودي خالد - ابو مينا', '04:95:E6:6E:F5:10', NULL, 'Online', 1, 'Active', 'MonthlyPrepaid', NULL, '19/01/2024 11:45 PM', '1', '0', '0', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(9, 114, 0, 63033, '', '', '03@walaalink20', 27690584, '07200000020', NULL, '', '03@walaalink20', '', '', '', '', '', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '12/10/2023 08:15 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(10, 114, 0, 63035, '', '', '01@walaalink3', 27690601, '07200000021', NULL, '', '01@walaalink3', '', '', '', '', 'سرمد كريم شطب', NULL, '', 'Offline', 1, 'ExpiringSoon', 'MonthlyPrepaid', NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-25 00:51:24'),
(11, 114, 0, 63035, '', '', '02@walaalink3', 27690606, '07200000021', NULL, '', '02@walaalink3', '', '', '', '', 'محل', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '12/12/2023 12:10 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(12, 114, 0, 63038, '', '', '02@walaalink4', 27690619, '07200000022', NULL, '', '02@walaalink4', '', '', '', '', '', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '19/11/2023 12:11 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(13, 114, 0, 63040, '', '', '01@walaalink5', 27690623, '07200000023', NULL, '', '01@walaalink5', '', '', '', '', 'php', '2C:C8:1B:40:F4:5F', '', 'Online', 1, 'ExpiringSoon', 'MonthlyPrepaid', NULL, '23/12/2023 05:36 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2024-01-03 23:56:46'),
(14, 114, 0, 63040, '', '', '02@walaalink5', 27690627, '07200000023', NULL, '', '02@walaalink5', '', '', '', '', 'محل - 5', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '16/11/2023 06:41 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(15, 114, 0, 63040, '', '', '5005@walaa', 26704214, NULL, NULL, '', '5005@walaa', '', '', '', '', 'بشاره', '5C:54:6D:E7:B7:9E', '', 'Online', 1, 'ExpiringSoon', 'MonthlyPrepaid', NULL, '26/12/2023 10:43 PM', '1', '0', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(16, 114, 0, 63040, '', '', 'mmmuuu@walaa', 28545383, '07513902902', NULL, '', 'mmmuuu@walaa', '', '', '', '', 'محمد احمد علي', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '18/01/2023 11:06 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(17, 114, 0, 63042, '', '', 'ghanam@walaa', 22314379, '', '', '', 'ghanam@walaa', '', '', '', '', 'غنام رشيد عبيد', NULL, '-', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '28/11/2023 08:09 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(18, 114, 0, 63042, '', '', 'a1@walaa', 25564318, '0', '0', '', 'a1@walaa', '', '', '', '', 'مخازن هوم سنتر', 'DC:2C:6E:22:9A:9B', '-', 'Online', 1, 'Active', 'MonthlyPrepaid', NULL, '16/01/2024 11:32 AM', '1', '0', '0', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(19, 114, 0, 63042, '', '', 'a2@walaa', 25564319, '0', '0', '', 'a2@walaa', '', '', '', '', 'مخازن هوم سنتر 2', '4C:5E:0C:1E:88:CB', '-', 'Online', 1, 'Active', 'MonthlyPrepaid', NULL, '16/01/2024 11:33 AM', '1', '0', '0', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(20, 114, 0, 66309, NULL, NULL, 'azd409@nit', 19655096, NULL, NULL, NULL, 'azd409@nit', 'nit', NULL, NULL, NULL, 'ابرهيم حسن', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', 1, '10/03/2023 11:35 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(21, 114, 0, 66309, '', '', 'azd1025@nit', 21251301, '', NULL, '', 'azd1025@nit', '', '', '', '', 'سيد مهدي40', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '15/03/2023 03:56 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(22, 114, 0, 66309, '', '', '13@nit', 25074233, '', '', '', '13@nit', '', '', '', '', '', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '05/12/2023 08:06 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(23, 114, 0, 66309, '', '', 'aws2@nit', 26763768, '07516944169', NULL, '', 'aws2@nit', '', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '18/03/2023 02:18 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(24, 114, 0, 66309, '', '', 'has.a@tshoot', 29024775, '07500049375', NULL, '', 'has.a@tshoot', '', '', '', '', 'حسين علي', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '25/03/2023 04:37 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(25, 114, 0, 66309, '', '', 'abd2.rash@t', 28975047, '07812365487', NULL, '', 'abd2.rash@t', '', '', '', '', 'احمد محمد', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '18/03/2023 06:06 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(8213, 109, 0, 61304, NULL, NULL, 'john@gmail.com', 111111, NULL, NULL, NULL, 'john@gmail.com', 'john123', NULL, NULL, NULL, NULL, '', NULL, 'Offline', 1, 'Active', 'MonthlyPrepaid', 2, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-02 08:50:53'),
(8214, 114, 0, 63031, '', '', 'abdazez@walaa', 25854122, '07708712902', NULL, '', 'abdazez@walaa', '1', '', '', '', 'عبد العزيز ابراهيم يوسف', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '03/12/2023 11:12 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8215, 114, 0, 63031, '', '', 'k1@walaa', 30967282, '07500793611', NULL, '', 'k1@walaa', '1', '', '', '', 'مهند تيست', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '22/12/2023 08:10 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8216, 114, 0, 63033, '', '', '02@walaalink2', 27690572, '07200000020', NULL, '', '02@walaalink2', '1', '', '', '', 'محل', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '18/12/2023 06:51 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8217, 114, 0, 63033, '', '', 'husen@walaa', 29694773, NULL, NULL, '', 'husen@walaa', '1', '', '', '', 'مجاني رشيد 3 ابو المي', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '06/12/2023 07:47 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8218, 114, 0, 63042, '', '', '50062@walaa', 26550199, NULL, NULL, '', '50062@walaa', '1', '', '', '', 'تيست-محمد سالم طعمه', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, NULL, '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', NULL),
(8219, 114, 0, 66309, '', '', 'oppo@nit', 27570938, '07718469390', NULL, '', 'oppo@nit', '1', '', '', '', 'ahmed', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '07/05/2023 12:44 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8220, 114, 0, 84728, '', '', 'aliyasir@walaa', 24545406, '07530949434', NULL, '', 'aliyasir@walaa', '1', '', '', '', 'علي ياسر عبيد', '14:A0:F8:BB:AA:85', '', 'Online', 1, 'ExpiringSoon', 'MonthlyPrepaid', NULL, '24/12/2023 10:03 PM', '1', '0', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8221, 114, 0, 84728, '', '', 'abbasmuhameda@walaa', 25708072, NULL, NULL, '', 'abbasmuhameda@walaa', '1', '', '', '', 'عباس محمد عباس', 'AC:15:A2:F0:ED:C9', '', 'OnlineNoNet', 1, 'Suspended', 'MonthlyPrepaid', NULL, '11/12/2023 02:19 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8222, 114, 0, 84728, '', '', '02@walaalink7', 27690658, '07200000027', NULL, '', '02@walaalink7', '1', '', '', '', '', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '02/11/2023 02:51 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8223, 114, 0, 84728, '', '', 'zaedon@walaa1', 28888412, NULL, NULL, '', 'zaedon@walaa1', '1', '', '', '', 'زيدون سمير تيست بزنس', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '06/12/2023 07:24 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8224, 114, 0, 84806, '', '', 'r2free@walaa', 26731626, '07833417660', NULL, '', 'r2free@walaa', '1', '', '', '', 'مجاني برج الرشيد - رشيد2', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '20/11/2023 01:48 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8225, 114, 0, 84806, '', '', '01@walaalink8', 27690663, '07200000028', NULL, '', '01@walaalink8', '1', '', '', '', '', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '21/12/2023 12:13 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8226, 114, 0, 84806, '', '', '02@walaalink8', 27690668, '07200000028', NULL, '', '02@walaalink8', '1', '', '', '', '', NULL, '', 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '30/06/2023 04:10 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8227, 114, 0, 91221, '', '', 'tp@moh', 30727601, NULL, NULL, '', 'tp@moh', '1', '', '', '', 'test', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '16/12/2023 02:44 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8228, 114, 0, 91235, '', '', 'y199@walaa', 28680001, '07716332568', NULL, '', 'y199@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '07/02/2023 01:42 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8229, 114, 0, 91235, '', '', 'y1990@', 28721661, '07712606142', NULL, '', 'y1990@', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '12/02/2023 11:26 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8230, 114, 0, 91235, '', '', 'y28@walaa', 28888143, '07701566343', NULL, '', 'y28@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '06/03/2023 11:28 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8231, 114, 0, 91235, '', '', 'y26@walaa', 28978545, '07712626414', NULL, '', 'y26@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '19/03/2023 12:09 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8232, 114, 0, 91235, '', '', 'y666@walaa', 29134862, '07702656413', NULL, '', 'y666@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '11/04/2023 06:02 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8233, 114, 0, 91235, '', '', 'y230@walaa', 29143418, '07712909352', NULL, '', 'y230@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '12/04/2023 11:51 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8234, 114, 0, 91235, '', '', 'y40@walaa', 29149160, '07705464363', NULL, '', 'y40@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '14/04/2023 11:07 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8235, 114, 0, 91235, '', '', 'y80@walaa', 29179028, '07716331466', NULL, '', 'y80@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '19/04/2023 10:41 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8236, 114, 0, 91235, '', '', 'yy@walaa', 29184555, '07705456489', NULL, '', 'yy@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '20/04/2023 12:26 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8237, 114, 0, 91235, '', '', 'yu@walaa', 29210493, '07706543595', NULL, '', 'yu@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 0, 'Suspended', 'MonthlyPrepaid', NULL, '24/04/2023 02:03 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2024-01-16 21:53:51'),
(8238, 114, 0, 91235, '', '', 'yp@walaa', 29237878, '07702436895', NULL, '', 'yp@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '28/04/2023 12:19 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8239, 114, 0, 91235, '', '', 'yv@walaa', 29381738, '07705431953', NULL, '', 'yv@walaa', '1', '', '', '', NULL, NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '18/05/2023 09:22 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8240, 114, 0, 91235, '', '', 'y299@walaa', 29436124, NULL, NULL, '', 'y299@walaa', '1', '', '', '', 'يونس', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '27/05/2023 01:02 AM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, '2023-12-19 23:03:00', '2023-12-22 23:27:21'),
(8241, 114, 0, 91235, '', '', 'y30@walaa', 29437121, '07513447559', NULL, '', 'y30@walaa', '1', '', '', '', 'حسين العجمي', NULL, NULL, 'Offline', 1, 'Suspended', 'MonthlyPrepaid', NULL, '27/05/2023 01:19 PM', '1', '1', '1', 0, 0, NULL, NULL, '0', NULL, 0, 0, 0, 0, 0, NULL, '2023-12-22 23:27:21'),
(8242, 109, 1, 75643, 'Wai', 'Mar', 'wai@gmail.com', 111000, '0952806757', NULL, 'BKK', 'wai@gmail.com', 'wai', 'BKK', 'WE', 'BKK', 'WAI', '', 'Testing tower device port complete recommend', 'Offline', 1, 'Active', 'MonthlyPrepaid', 1, NULL, NULL, NULL, NULL, 0, 0, '16.866070', '96.195129', '0', 'FTTH', 1, 2, 2, 0, 1, NULL, '2024-02-14 18:45:11'),
(8243, 109, 2, 66309, 'Wai', 'Test', 'waitest@gmail.com', 222222, '56778', NULL, 'MDY', 'waitest@gmail.com', '11111', 'MDY', 'WE', NULL, 'Wai Test', '', 'Testing with new fields update', 'Offline', 1, 'Active', 'MonthlyPrepaid', 1, NULL, NULL, NULL, NULL, 0, 0, '28.2036694', '177.3795167', '0', 'FTTH', 4, 0, 0, 0, 0, NULL, '2024-02-12 00:04:33');

-- --------------------------------------------------------

--
-- Table structure for table `deposit_passes`
--

CREATE TABLE `deposit_passes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `deposit_password` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deposit_passes`
--

INSERT INTO `deposit_passes` (`id`, `deposit_password`, `created_at`, `updated_at`) VALUES
(1, '6666667', '2023-11-25 23:25:57', '2023-11-25 17:13:42');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tower_id` int(11) NOT NULL,
  `device_name` varchar(255) NOT NULL,
  `ip_address` varchar(191) DEFAULT NULL,
  `device_type` varchar(191) DEFAULT NULL,
  `device_model` varchar(191) DEFAULT NULL,
  `no_of_ports` int(11) NOT NULL DEFAULT 0,
  `notes` longtext DEFAULT NULL,
  `device_status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `tower_id`, `device_name`, `ip_address`, `device_type`, `device_model`, `no_of_ports`, `notes`, `device_status`, `created_at`, `updated_at`) VALUES
(1, 3, 'Mic', '10.1.1.0', 'Mikrotic', 'Rb 2001', 10, 'Test Adding device', 1, '2024-02-13 01:27:51', '2024-02-13 01:27:51'),
(2, 1, 'Cisco', '10.1.1.109', 'Cisco', '2009', 19, 'Testing Tower-1', 1, '2024-02-13 01:53:52', '2024-02-13 01:53:52'),
(3, 4, 'Switch', '10.0.0.0', 'Microtic', 'Cr 1036', 24, 'Tower-3 Switch', 0, '2024-02-13 01:55:09', '2024-02-13 02:19:58');

-- --------------------------------------------------------

--
-- Table structure for table `device_tickets`
--

CREATE TABLE `device_tickets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` longtext DEFAULT NULL,
  `topic` varchar(191) NOT NULL,
  `level_of_importance` varchar(191) NOT NULL,
  `ticket_number` varchar(191) NOT NULL,
  `ticket_status` int(11) NOT NULL DEFAULT 0,
  `attach_file` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `issue_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_loggedin_user` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `device_tickets`
--

INSERT INTO `device_tickets` (`id`, `user_id`, `title`, `topic`, `level_of_importance`, `ticket_number`, `ticket_status`, `attach_file`, `description`, `issue_id`, `updated_by_loggedin_user`, `created_at`, `updated_at`) VALUES
(2, 13, 'Device 1766HHtt', 'tp_2', 'lv_4', 'DTKN2420', 1, '', 'User Fault Device 1766HHtt', 1, 1, '2024-02-08 22:44:10', '2024-02-10 06:26:07');

-- --------------------------------------------------------

--
-- Table structure for table `devticket_remarks`
--

CREATE TABLE `devticket_remarks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `devticket_id` int(11) NOT NULL,
  `remarks` varchar(191) DEFAULT NULL,
  `rm_attach_file` varchar(191) DEFAULT NULL,
  `remark_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `devticket_remarks`
--

INSERT INTO `devticket_remarks` (`id`, `devticket_id`, `remarks`, `rm_attach_file`, `remark_by`, `created_at`, `updated_at`) VALUES
(2, 2, 'Device 1766HHtt DTKN2420 RM\n Second one', '', 1, '2024-02-09 06:15:51', NULL),
(5, 2, 'Testing', '', 1, '2024-02-09 06:54:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `walletUserId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `submittedBy` varchar(191) DEFAULT NULL,
  `modifyUser` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoinceID` varchar(191) NOT NULL,
  `userIndex` varchar(191) NOT NULL,
  `displayName` varchar(191) NOT NULL,
  `affiliateName` varchar(191) NOT NULL,
  `invoiceType` varchar(191) NOT NULL,
  `invoiceDescription` varchar(191) NOT NULL,
  `invoiceDuration` varchar(191) NOT NULL,
  `salePrice` varchar(191) NOT NULL,
  `retailPriceCurrency` varchar(191) NOT NULL,
  `retailPrice` varchar(191) DEFAULT NULL,
  `referenceRecord` varchar(191) DEFAULT NULL,
  `recordDate` varchar(191) DEFAULT NULL,
  `invoiceStatus` varchar(191) DEFAULT NULL,
  `lastStatusChanged` varchar(191) DEFAULT NULL,
  `accountName` varchar(191) DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `userID` varchar(191) DEFAULT NULL,
  `paidPrice` varchar(191) DEFAULT NULL,
  `discountedPrice` varchar(191) DEFAULT NULL,
  `balance` varchar(191) DEFAULT NULL,
  `modifyUser` varchar(191) DEFAULT NULL,
  `paymentDueDate` varchar(191) DEFAULT NULL,
  `paymentDueDateTime` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoinceID`, `userIndex`, `displayName`, `affiliateName`, `invoiceType`, `invoiceDescription`, `invoiceDuration`, `salePrice`, `retailPriceCurrency`, `retailPrice`, `referenceRecord`, `recordDate`, `invoiceStatus`, `lastStatusChanged`, `accountName`, `notes`, `userID`, `paidPrice`, `discountedPrice`, `balance`, `modifyUser`, `paymentDueDate`, `paymentDueDateTime`, `created_at`, `updated_at`) VALUES
(1, '122303389', '111000', '', 'aligg', 'Refill_Deposit', 'Economy for period [2024/01/06 - 2024/02/06] with serial 211286154', '2024/01/06 - 2024/02/06', '30000', 'IQD', '30000', '211286154', '07/01/2024 10:55 AM', 'NotPaid', '', 'Economy', '', 'wai@gmail.com', '0', '0', '30000', 'Admin', '', NULL, '2024-01-07 01:54:01', '2024-01-07 01:54:01'),
(2, '124985327', '29312641', 'بيت بيادر', 'aligg6', 'Refill_Deposit', 'Economy for period [2024/02/13 - 2024/03/13] with serial 214340180', '2024/02/13 - 2024/03/13', '40000', 'IQD', '40000', '214340180', '12/02/2024 01:53 AM', 'NotPaid', '', 'Economy', '', 'rdea@ag', '0', '0', '40000', 'Admin', '', NULL, '2024-02-11 22:38:32', '2024-02-11 22:38:32');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) NOT NULL,
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
(7, '2023_10_23_064120_create_sub_accounts_table', 1),
(8, '2023_10_29_060352_create_tickets_table', 1),
(9, '2023_10_29_114117_create_ticket_remarks_table', 1),
(11, '2023_11_12_070252_create_permission_tables', 1),
(12, '2023_11_12_131422_create_apitokens_table', 1),
(13, '2023_11_14_034450_create_customers_table', 1),
(14, '2023_11_26_062322_create_deposit_passes_table', 1),
(15, '2023_11_29_035355_create_wallets_table', 1),
(16, '2023_11_30_022153_create_user_groups_table', 1),
(17, '2023_11_30_055412_create_user_has_groups_table', 1),
(18, '2023_12_01_072108_create_invoices_table', 1),
(19, '2023_12_01_113909_create_expenses_table', 1),
(20, '2023_12_29_133955_create_apiusers_table', 2),
(21, '2023_12_30_212531_create_boards_table', 3),
(22, '2024_01_02_193322_create_balance_transfers_table', 3),
(23, '2024_01_21_063409_create_ticket_issues_table', 4),
(24, '2023_10_29_141121_create_payments_table', 5),
(25, '2024_02_04_155127_create_affiliates_payments_table', 6),
(26, '2024_02_09_045304_create_device_tickets_table', 7),
(27, '2024_02_09_045409_create_devticket_remarks_table', 7),
(28, '2024_02_12_020338_create_towers_table', 8),
(29, '2024_02_12_140802_create_devices_table', 9),
(30, '2024_02_13_135159_create_ports_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(191) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(191) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 6);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `display_name` varchar(191) DEFAULT NULL,
  `mobile_number` varchar(191) DEFAULT NULL,
  `customer_user_index` varchar(191) NOT NULL,
  `prev_balance` varchar(191) DEFAULT NULL,
  `paid_amount` varchar(191) DEFAULT NULL,
  `current_balance` varchar(191) DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `modify_user` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `guard_name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'read_tickets', 'web', '2023-11-24 17:03:58', '2023-11-24 17:03:58'),
(2, 'edit_tickets', 'web', '2023-11-24 17:03:58', '2023-11-24 17:03:58'),
(3, 'write_tickets', 'web', '2023-11-24 17:03:58', '2023-11-24 17:03:58'),
(4, 'delete_tickets', 'web', '2023-11-24 17:03:58', '2023-11-24 17:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ports`
--

CREATE TABLE `ports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `device_id` int(11) NOT NULL,
  `port_name` varchar(191) NOT NULL,
  `port_number` varchar(191) DEFAULT NULL,
  `port_type` varchar(191) DEFAULT NULL,
  `no_of_clients` int(11) NOT NULL DEFAULT 0,
  `notes` longtext DEFAULT NULL,
  `port_status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ports`
--

INSERT INTO `ports` (`id`, `device_id`, `port_name`, `port_number`, `port_type`, `no_of_clients`, `notes`, `port_status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Microtic', '11', 'Fiber', 10, 'Mic Microtic 11 Fiber 10', 1, '2024-02-13 07:35:21', '2024-02-13 07:35:21'),
(2, 2, 'Cisco', '24', 'Wireless', 13, 'Cisco 24 wireless 13', 1, '2024-02-13 07:39:56', '2024-02-13 07:39:56'),
(3, 3, 'Switch Update', '24', 'UTP', 10, 'Switch 24 Utp 10 down', 0, '2024-02-13 07:40:38', '2024-02-13 07:53:36');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `guard_name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2023-11-24 17:03:58', '2023-11-24 17:03:58'),
(2, 'staff', 'web', '2023-11-24 17:03:58', '2023-11-24 17:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sub_accounts`
--

CREATE TABLE `sub_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `account_index` int(11) NOT NULL,
  `account_name` varchar(191) NOT NULL,
  `account_description` text DEFAULT NULL,
  `end_user_account_price` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_accounts`
--

INSERT INTO `sub_accounts` (`id`, `account_index`, `account_name`, `account_description`, `end_user_account_price`, `created_at`, `updated_at`) VALUES
(1, 109, 'Economy 1', 'Economy Economy1 20000', '20000', '2023-11-24 17:16:02', '2023-11-24 17:16:21'),
(2, 108, 'Standard 1', 'Standard 1 54,000', '54000', '2023-11-25 00:08:56', '2023-11-25 00:08:56'),
(3, 110, 'Turbo 1 Updated', 'Turbo 15000', '15000', '2023-11-25 13:39:19', '2023-11-27 14:12:23');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` longtext DEFAULT NULL,
  `topic` varchar(191) NOT NULL,
  `level_of_importance` varchar(191) NOT NULL,
  `ticket_number` varchar(191) DEFAULT NULL,
  `ticket_status` int(11) NOT NULL DEFAULT 0 COMMENT '0 => open,\r\n1 => close',
  `image` varchar(191) DEFAULT NULL,
  `attach_file` longtext DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `issue_id` int(11) NOT NULL DEFAULT 0,
  `updated_by_loggedin_user` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `user_id`, `title`, `topic`, `level_of_importance`, `ticket_number`, `ticket_status`, `image`, `attach_file`, `description`, `issue_id`, `updated_by_loggedin_user`, `created_at`, `updated_at`) VALUES
(1, 2, 'Title Ticket', 'tp_2', 'lv_2', 'TKN123', 0, NULL, NULL, 'Network Error - technical fault', 2, 1, '2023-11-25 15:46:36', '2024-01-25 23:53:57'),
(2, 20, NULL, 'tp_4', 'lv_3', 'TKN109', 1, '1701750223_cover.jpg', '', NULL, 0, 1, '2023-12-02 20:44:48', '2023-12-06 11:33:59'),
(6, 3, NULL, 'tp_2', 'lv_1', 'TKN4122', 0, '1701846613_default.png', '1701912954_course code and title.xlsx', NULL, 0, 1, '2023-12-03 23:19:03', '2023-12-06 11:35:54'),
(10, 16, NULL, 'tp_3', 'lv_3', 'TKN6121', 0, '', '', NULL, 2, 0, '2023-12-05 12:11:42', '2023-12-05 12:11:42'),
(12, 7, NULL, 'tp_3', 'lv_2', 'TKN6124', 1, '1701842338_Screenshot (48).png', '', NULL, 0, 1, '2023-12-05 15:24:39', '2024-01-25 23:07:00'),
(13, 4, NULL, 'tp_3', 'lv_3', 'TKN177', 0, '1703770890_course1.jpg', '1703770890_Git and Github.pdf', NULL, 0, 1, '2023-12-28 06:37:07', '2023-12-28 06:41:30'),
(16, 7, NULL, 'tp_5', 'lv_4', 'TKN9649', 1, '', '1703856568_Git and Github.pdf,1703856568_Rust(2023)ByWinHtut-NCCIOS.pdf', 'Testing Testing', 0, 1, '2023-12-28 23:42:04', '2024-02-09 09:27:58'),
(19, 8, 'Title', 'tp_5', 'lv_3', 'TKN5646', 0, NULL, '', NULL, 2, 1, '2024-01-20 22:28:09', '2024-01-23 04:58:53'),
(20, 10, 'Testing 01@', 'tp_3', 'lv_3', 'TKN2575', 0, NULL, '', 'testing desc', 1, 1, '2024-01-20 23:10:28', '2024-01-21 06:07:32'),
(21, 8242, 'NetworkIssue', 'tp_4', 'lv_3', 'TKN7072', 1, NULL, '', 'Testing issue type', 2, 0, '2024-01-21 05:25:27', '2024-02-10 06:27:18'),
(22, 4, '1000walaa1', 'tp_4', 'lv_3', 'TKN8007', 0, NULL, '', 'Network Error Testing', 2, 1, '2024-01-24 07:52:29', '2024-01-24 07:58:57'),
(23, 4, 'TestFeb', 'tp_3', 'lv_3', 'TKN3890', 0, NULL, '', 'User Fault Feb', 1, 0, '2024-02-04 02:19:10', '2024-02-04 02:19:10');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_issues`
--

CREATE TABLE `ticket_issues` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `issue_type` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket_issues`
--

INSERT INTO `ticket_issues` (`id`, `issue_type`, `created_at`, `updated_at`) VALUES
(1, 'User Fault', '2024-01-21 07:03:25', '2024-01-21 02:17:44'),
(2, 'Network Error', '2024-01-21 02:06:54', '2024-01-21 02:06:54');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_remarks`
--

CREATE TABLE `ticket_remarks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `remarks` varchar(191) DEFAULT NULL,
  `rm_attach_file` varchar(255) DEFAULT NULL,
  `remark_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ticket_remarks`
--

INSERT INTO `ticket_remarks` (`id`, `ticket_id`, `remarks`, `rm_attach_file`, `remark_by`, `created_at`, `updated_at`) VALUES
(2, 1, 'Test26 12', NULL, 1, '2023-12-28 04:50:27', NULL),
(3, 1, 'tkn123 opened', NULL, 1, '2023-12-28 05:31:16', '2023-12-27 23:03:44'),
(4, 2, 'already closed by last moth', '1706365683_DSA-EarlyReleaseByWinHtut.pdf', 1, '2023-12-28 05:35:31', '2024-01-21 05:09:01'),
(6, 12, 'Close 26 jan', '1706365683_DSA-EarlyReleaseByWinHtut.pdf', 1, '2024-01-26 06:07:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `towers`
--

CREATE TABLE `towers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tower_name` varchar(191) NOT NULL,
  `ip_address` varchar(191) DEFAULT NULL,
  `rent_price` bigint(20) NOT NULL DEFAULT 0,
  `electric_price` bigint(20) NOT NULL DEFAULT 0,
  `line_price` bigint(20) NOT NULL DEFAULT 0,
  `address` varchar(191) DEFAULT NULL,
  `latitude` varchar(191) DEFAULT NULL,
  `longitude` varchar(191) DEFAULT NULL,
  `owner_name` varchar(191) DEFAULT NULL,
  `mobile_number` varchar(191) DEFAULT NULL,
  `mobile_number2` varchar(191) DEFAULT NULL,
  `notes` longtext DEFAULT NULL,
  `tower_status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `towers`
--

INSERT INTO `towers` (`id`, `tower_name`, `ip_address`, `rent_price`, `electric_price`, `line_price`, `address`, `latitude`, `longitude`, `owner_name`, `mobile_number`, `mobile_number2`, `notes`, `tower_status`, `created_at`, `updated_at`) VALUES
(1, 'Tower-1', '100.11.22.33', 3000, 2000, 1500, 'YGN', '16.871311', '96.199379', 'Agent-1', '11223445', '09876543', 'Testing Tower update', 1, '2024-02-11 20:20:31', '2024-02-11 21:56:20'),
(3, 'Tower-2', '192.168.10.1', 1000, 1200, 1300, 'BKK', '13.736717', '100.523186', 'Agent-2', '7675678', NULL, 'Test Tower-2', 1, '2024-02-11 21:53:38', '2024-02-11 21:56:11'),
(4, 'Tower-3', '255.255.255.255', 2000, 2100, 2300, 'MDY', '28.2036694', '177.3795167', 'Agent-3', '7885678', NULL, 'Test Tower-3', 0, '2024-02-11 21:55:54', '2024-02-11 21:56:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `active_status` tinyint(4) NOT NULL DEFAULT 1,
  `balance` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `active_status`, `balance`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@admin.com', NULL, '$2y$10$9RaOkXkbICQsoU4ZfrTS3eg55gfh1ggjEzAxtXPQL3TBEP6kUGpty', NULL, 1, 0, '2023-11-24 17:03:58', '2023-11-24 17:03:58'),
(2, 'Staff', 'staff@gmail.com', NULL, '$2y$10$5G3l00uQZXYsa0XUeyAcTuDtEjYfzVvKRyiCaP8TCGVRSElBLQ9XK', NULL, 1, 0, '2023-11-24 17:03:58', '2023-11-24 17:03:58'),
(3, 'Wai', 'wai@gmail.com', NULL, '$2y$10$H09TXP9PHzJAPB7.iCnnP.rH6lSUVvSAq41NCyPN2.Em2OsD8.AA.', NULL, 1, 0, '2023-11-29 11:32:36', '2024-01-21 02:35:26'),
(4, 'Walaa', 'walaa@gmail.com', NULL, '$2y$10$9RaOkXkbICQsoU4ZfrTS3eg55gfh1ggjEzAxtXPQL3TBEP6kUGpty', NULL, 0, 0, '2023-11-30 18:26:44', '2023-12-01 20:44:18'),
(5, 'Ohnmar', 'ohnmar@gmail.com', NULL, '$2y$10$5G3l00uQZXYsa0XUeyAcTuDtEjYfzVvKRyiCaP8TCGVRSElBLQ9XK', NULL, 1, 0, '2023-12-01 20:07:14', '2023-12-01 20:07:14'),
(6, 'Test Staff', 'teststaff@gmail.com', NULL, '$2y$10$8Gth6Cpru4XsiW4uFWADweeS7jqk4Hoq8XPaUPJNsswev7lJX8/wO', NULL, 1, 0, '2023-12-02 20:25:36', '2023-12-02 20:25:36');

-- --------------------------------------------------------

--
-- Table structure for table `user_groups`
--

CREATE TABLE `user_groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_groups`
--

INSERT INTO `user_groups` (`id`, `group_name`, `created_at`, `updated_at`) VALUES
(1, 'Group Wai', '2023-11-29 13:26:56', '2023-11-29 13:38:35'),
(2, 'Group Ohnmar', '2023-11-29 13:27:12', '2023-11-29 13:38:42'),
(3, 'Group Walaa', '2023-11-29 13:27:22', '2023-11-29 13:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `user_has_groups`
--

CREATE TABLE `user_has_groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_has_groups`
--

INSERT INTO `user_has_groups` (`id`, `user_id`, `group_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-11-29 22:58:32', NULL),
(2, 1, 2, '2023-11-29 22:59:11', NULL),
(3, 1, 3, '2023-11-29 22:59:11', NULL),
(9, 3, 1, '2023-12-01 20:05:28', '2023-12-01 20:05:28'),
(11, 4, 3, '2023-12-01 20:06:32', '2023-12-01 20:06:32'),
(12, 5, 2, '2023-12-01 20:07:14', '2023-12-01 20:07:14'),
(13, 2, 1, '2023-12-01 23:21:03', '2023-12-01 23:21:03'),
(14, 2, 2, '2023-12-01 23:21:03', '2023-12-01 23:21:03');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `debit` bigint(20) NOT NULL DEFAULT 0,
  `credit` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Indexes for table `affiliates_payments`
--
ALTER TABLE `affiliates_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `apitokens`
--
ALTER TABLE `apitokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `apiusers`
--
ALTER TABLE `apiusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `balance_transfers`
--
ALTER TABLE `balance_transfers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `boards`
--
ALTER TABLE `boards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_customer_user_index_unique` (`customer_user_index`);

--
-- Indexes for table `deposit_passes`
--
ALTER TABLE `deposit_passes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `device_tickets`
--
ALTER TABLE `device_tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_tickets_ticket_number_unique` (`ticket_number`);

--
-- Indexes for table `devticket_remarks`
--
ALTER TABLE `devticket_remarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `ports`
--
ALTER TABLE `ports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sub_accounts`
--
ALTER TABLE `sub_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_number` (`ticket_number`);

--
-- Indexes for table `ticket_issues`
--
ALTER TABLE `ticket_issues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket_remarks`
--
ALTER TABLE `ticket_remarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `towers`
--
ALTER TABLE `towers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_has_groups`
--
ALTER TABLE `user_has_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `affiliates_payments`
--
ALTER TABLE `affiliates_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `apitokens`
--
ALTER TABLE `apitokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `apiusers`
--
ALTER TABLE `apiusers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `balance_transfers`
--
ALTER TABLE `balance_transfers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `boards`
--
ALTER TABLE `boards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8244;

--
-- AUTO_INCREMENT for table `deposit_passes`
--
ALTER TABLE `deposit_passes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `device_tickets`
--
ALTER TABLE `device_tickets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `devticket_remarks`
--
ALTER TABLE `devticket_remarks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ports`
--
ALTER TABLE `ports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sub_accounts`
--
ALTER TABLE `sub_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `ticket_issues`
--
ALTER TABLE `ticket_issues`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ticket_remarks`
--
ALTER TABLE `ticket_remarks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `towers`
--
ALTER TABLE `towers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_groups`
--
ALTER TABLE `user_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_has_groups`
--
ALTER TABLE `user_has_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
