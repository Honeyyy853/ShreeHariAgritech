-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 19, 2026 at 11:15 AM
-- Server version: 8.4.7
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shreeharidb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

DROP TABLE IF EXISTS `tbl_cart`;
CREATE TABLE IF NOT EXISTS `tbl_cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `name`, `Description`) VALUES
(1, 'Herb', 'Natural herbs carefully selected and processed to maintain their aroma, flavor, and health benefits.'),
(2, 'Dehydrated Fruit', 'Fresh fruits that are gently dehydrated to preserve their natural sweetness, nutrients, and long she'),
(3, 'Dehydrated vegetables ', 'Vegetables that are carefully dehydrated to retain their taste, color, and nutritional value for con');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inquiries`
--

DROP TABLE IF EXISTS `tbl_inquiries`;
CREATE TABLE IF NOT EXISTS `tbl_inquiries` (
  `inquiry_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inquiry_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`inquiry_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_inquiries`
--

INSERT INTO `tbl_inquiries` (`inquiry_id`, `name`, `email`, `phone`, `inquiry_type`, `product`, `quantity`, `message`, `created_at`) VALUES
(13, 'Honey', 'rathodhoney852003@gmail.com', '8547854965', 'Bulk Order', 'Moringa powder', '50kg', 'I want some products we can set a meeting!!', '2026-04-16 13:16:11'),
(12, 'honey', 'rathodhoney852003@gmail.com', '8547125965', 'Bulk Order', 'Moringa leaf powder', '25 kg', 'I want the Bulk order', '2026-04-13 08:35:36');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_offers`
--

DROP TABLE IF EXISTS `tbl_offers`;
CREATE TABLE IF NOT EXISTS `tbl_offers` (
  `offer_id` int NOT NULL AUTO_INCREMENT,
  `promocode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `offerName` varchar(220) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_value` decimal(10,2) DEFAULT NULL,
  `validity` int DEFAULT NULL,
  `status` enum('Active','Expired','Disabled') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`offer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_offers`
--

INSERT INTO `tbl_offers` (`offer_id`, `promocode`, `offerName`, `discount_value`, `validity`, `status`, `created_at`) VALUES
(1, 'CLEAR155', 'Clearance Sale', 15.00, 30, 'Active', '2026-03-13 13:22:00'),
(2, 'FEST10', 'Festival Offer', 10.00, 10, 'Active', '2026-03-13 13:22:28'),
(3, 'HERB25', 'Herbal Special', 25.00, 25, 'Active', '2026-03-13 13:24:52'),
(4, 'WEEKEND7', 'Weekend Sale', 5.00, 7, 'Active', '2026-03-13 13:25:23');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

DROP TABLE IF EXISTS `tbl_orders`;
CREATE TABLE IF NOT EXISTS `tbl_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_status` enum('Pending','Paid','Failed') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `payment_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_status` enum('Pending','Processing','Completed','Partially Completed','Cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `shipping_address` text COLLATE utf8mb4_unicode_ci,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`),
  UNIQUE KEY `order_id_2` (`order_id`),
  UNIQUE KEY `order_id_3` (`order_id`),
  UNIQUE KEY `order_id_4` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `order_id`, `user_id`, `total_amount`, `payment_status`, `payment_id`, `order_status`, `shipping_address`, `order_date`, `payment_method`) VALUES
(71, 17760691602022, 65, 340.00, 'Paid', '', 'Completed', 'Surat', '2026-04-13 08:32:40', 'cod'),
(72, 17762624102799, 65, 1950.00, 'Pending', '', 'Pending', 'Surat', '2026-04-15 14:13:30', 'cod'),
(73, 17763452723189, 66, 1420.00, 'Paid', 'pay_SeB1ZCvYdrFqZz', 'Completed', 'surat', '2026-04-16 13:14:32', 'online');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_items`
--

DROP TABLE IF EXISTS `tbl_order_items`;
CREATE TABLE IF NOT EXISTS `tbl_order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `item_status` enum('Pending','Processing','Shipped','Delivered','Cancelled','Returned','Refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `discount_value` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`item_id`),
  KEY `order_id` (`order_id`),
  KEY `tbl_order_items_ibfk_2` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_order_items`
--

INSERT INTO `tbl_order_items` (`item_id`, `order_id`, `product_id`, `quantity`, `price`, `item_status`, `discount_value`) VALUES
(113, 17760691602022, 2, 2, 120.00, 'Delivered', 10.00),
(114, 17760691602022, 4, 1, 100.00, 'Delivered', 0.00),
(115, 17762624102799, 3, 3, 650.00, 'Pending', 10.00),
(116, 17763452723189, 3, 2, 650.00, 'Delivered', 10.00),
(117, 17763452723189, 2, 1, 120.00, 'Delivered', 10.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payments`
--

DROP TABLE IF EXISTS `tbl_payments`;
CREATE TABLE IF NOT EXISTS `tbl_payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` enum('Pending','Completed','Failed','Refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payments_order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

DROP TABLE IF EXISTS `tbl_products`;
CREATE TABLE IF NOT EXISTS `tbl_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cat_id` int NOT NULL,
  `offerId` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_products_ibfk_2` (`cat_id`),
  KEY `fk_products_offer` (`offerId`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `name`, `description`, `price`, `unit`, `image`, `cat_id`, `offerId`, `user_id`) VALUES
(1, 'Moringa Leaf', 'Naturally dried moringa leaves, rich in antioxidants and essential nutrients, suitable for herbal tea and health preparations.', 100, '100', '17721252661395.jpg', 1, NULL, NULL),
(2, 'Lemon Grass', 'Aromatic dried lemongrass used for herbal tea, cooking and natural wellness purposes.', 120, '100', '17721253619007.jpg', 1, 2, NULL),
(3, 'White Musli', 'Premium quality dried safed musli roots, widely used in traditional herbal formulations.', 650, '100', '17721254436506.jpg', 1, 2, NULL),
(4, 'Mint Leaves', 'Carefully dried mint leaves with refreshing aroma, suitable for tea, drinks and seasoning.', 100, '100', '17721254938117.avif', 1, NULL, NULL),
(5, 'Turmeric', 'High-quality dried turmeric slices, known for natural color and traditional wellness uses.', 90, '100', '17721255272282.jpg', 1, 3, NULL),
(6, 'Amla Powder', 'Finely ground amla powder made from dried Indian gooseberries, rich in natural vitamin C.', 140, '100', '17721255603395.jpg', 1, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reviews`
--

DROP TABLE IF EXISTS `tbl_reviews`;
CREATE TABLE IF NOT EXISTS `tbl_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `review_text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tbl_reviews_ibfk_1` (`product_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_reviews`
--

INSERT INTO `tbl_reviews` (`id`, `product_id`, `user_id`, `rating`, `review_text`, `created_at`) VALUES
(13, 6, 2, 0, 'good', '2026-04-15 14:43:10'),
(14, 2, 2, 4, 'ndnslk', '2026-04-16 12:35:52'),
(15, 4, 2, 5, 'it was very good', '2026-04-16 12:36:16'),
(16, 3, 66, 3, 'it was a good product', '2026-04-16 13:15:26');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `name`, `email`, `phone`, `password`, `role`, `created_at`, `address`) VALUES
(1, 'Admin', 'admin@gmail.com', 6354185496, '$2y$10$K8tNeUAAYO6R9y2hk0qtUuBr.25g2j3ZuOh3F0gax2Bc6EMsAHD1q', 'admin', '2026-04-04 11:23:56', 'admin'),
(2, 'Honey', 'd23amtics063@gmail.com', 8954785965, '$2y$10$gdeQHeKpoDwunqRR/16tU.9zbexqlT2OIJgjpckvrVLqEHgLDvW6m', 'user', '2026-04-13 14:00:07', 'Surat'),
(66, 'Honey', 'rathodhoney852003@gmail.com', 8541256325, '$2y$10$kFqefXTKfhR1KcQLsueA1OOoBRZ9byU7aXaFUft9TZNvd2ouZNyaa', 'user', '2026-04-16 18:42:41', 'surat');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD CONSTRAINT `tbl_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_order_items`
--
ALTER TABLE `tbl_order_items`
  ADD CONSTRAINT `tbl_order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `fk_products_offer` FOREIGN KEY (`offerId`) REFERENCES `tbl_offers` (`offer_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `tbl_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_products_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `tbl_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_products_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `tbl_reviews`
--
ALTER TABLE `tbl_reviews`
  ADD CONSTRAINT `tbl_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
