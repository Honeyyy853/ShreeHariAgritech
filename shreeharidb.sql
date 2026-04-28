-- Clean SQL Dump (Safe for GitHub)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- =========================
-- DATABASE: shreeharidb
-- =========================

-- -------------------------
-- tbl_users (NO DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100),
  `email` varchar(100),
  `phone` bigint,
  `password` varchar(255),
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(100),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB;

-- -------------------------
-- tbl_category (SAFE DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE `tbl_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `Description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `tbl_category` VALUES
(1, 'Herb', 'Natural herbs processed for health benefits'),
(2, 'Dehydrated Fruit', 'Fruits preserved by dehydration'),
(3, 'Dehydrated Vegetables', 'Vegetables preserved for long storage');

-- -------------------------
-- tbl_products (SAFE DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_products`;
CREATE TABLE `tbl_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `unit` varchar(50),
  `image` varchar(255),
  `cat_id` int,
  `offerId` int,
  `user_id` int,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `tbl_products` VALUES
(1, 'Moringa Leaf', 'Dried moringa leaves', 100, '100g', 'demo.jpg', 1, NULL, NULL),
(2, 'Lemongrass', 'Aromatic herb', 120, '100g', 'demo.jpg', 1, 2, NULL),
(3, 'Turmeric', 'Natural turmeric slices', 90, '100g', 'demo.jpg', 1, 3, NULL);

-- -------------------------
-- tbl_offers (SAFE DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_offers`;
CREATE TABLE `tbl_offers` (
  `offer_id` int NOT NULL AUTO_INCREMENT,
  `promocode` varchar(50),
  `offerName` varchar(100),
  `discount_value` decimal(10,2),
  `validity` int,
  `status` enum('Active','Expired','Disabled') DEFAULT 'Active',
  PRIMARY KEY (`offer_id`)
) ENGINE=InnoDB;

INSERT INTO `tbl_offers` VALUES
(1, 'WELCOME10', 'Welcome Offer', 10.00, 30, 'Active'),
(2, 'FEST20', 'Festival Offer', 20.00, 10, 'Active');

-- -------------------------
-- tbl_cart
-- -------------------------
DROP TABLE IF EXISTS `tbl_cart`;
CREATE TABLE `tbl_cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `product_id` int,
  `quantity` int DEFAULT 1,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB;

-- -------------------------
-- tbl_orders (NO DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_orders`;
CREATE TABLE `tbl_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` bigint,
  `user_id` int,
  `total_amount` decimal(10,2),
  `payment_status` enum('Pending','Paid','Failed') DEFAULT 'Pending',
  `payment_id` varchar(100),
  `order_status` enum('Pending','Processing','Completed','Cancelled') DEFAULT 'Pending',
  `shipping_address` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -------------------------
-- tbl_order_items (NO DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_order_items`;
CREATE TABLE `tbl_order_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` bigint,
  `product_id` int,
  `quantity` int,
  `price` decimal(10,2),
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB;

-- -------------------------
-- tbl_reviews (NO DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_reviews`;
CREATE TABLE `tbl_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int,
  `user_id` int,
  `rating` int,
  `review_text` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- -------------------------
-- tbl_inquiries (NO DATA)
-- -------------------------
DROP TABLE IF EXISTS `tbl_inquiries`;
CREATE TABLE `tbl_inquiries` (
  `inquiry_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100),
  `email` varchar(150),
  `phone` varchar(20),
  `message` text,
  PRIMARY KEY (`inquiry_id`)
) ENGINE=InnoDB;

COMMIT;
