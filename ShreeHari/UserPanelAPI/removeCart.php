<?php
include '../connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$product_id = $_POST['product_id'] ?? '';
$user_id    = $_POST['user_id'] ?? '';

if (empty($product_id) || empty($user_id)) {
    echo json_encode([
        "status" => "false",
        "message" => "Product ID and User ID are required"
    ]);
    exit;
}

$sql = "DELETE FROM tbl_cart 
        WHERE product_id = '$product_id' 
        AND user_id = '$user_id'";

if (mysqli_query($conn, $sql) && mysqli_affected_rows($conn) > 0) {

    echo json_encode([
        "status" => "true",
        "message" => "Product removed from cart successfully"
    ]);
} else {

    echo json_encode([
        "status" => "false",
        "message" => "Item not found"
    ]);
}

$conn->close();
