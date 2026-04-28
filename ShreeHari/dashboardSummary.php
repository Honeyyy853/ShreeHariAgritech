<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = [];

// ✅ COUNT optimized
$res = mysqli_query($conn, "SELECT COUNT(*) as total FROM tbl_category");
$response['totalCategories'] = mysqli_fetch_assoc($res)['total'];

$res = mysqli_query($conn, "SELECT COUNT(*) as total FROM tbl_products");
$response['totalProducts'] = mysqli_fetch_assoc($res)['total'];

$res = mysqli_query($conn, "SELECT COUNT(*) as total FROM tbl_orders");
$response['totalOrders'] = mysqli_fetch_assoc($res)['total'];

$res = mysqli_query($conn, "SELECT COUNT(*) as total FROM tbl_users");
$response['totalUsers'] = mysqli_fetch_assoc($res)['total'];

$res = mysqli_query($conn, "SELECT COUNT(*) as total FROM tbl_offers");
$response['totalOffers'] = mysqli_fetch_assoc($res)['total'];

// 🔥 NEW: Revenue
$res = mysqli_query($conn, "SELECT SUM(total_amount) as revenue FROM tbl_orders");
$response['totalRevenue'] = mysqli_fetch_assoc($res)['revenue'] ?? 0;

echo json_encode($response);
$conn->close();
?>