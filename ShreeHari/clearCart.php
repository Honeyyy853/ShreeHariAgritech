<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user_id = $_POST['user_id'] ?? '';

if (empty($user_id)) {
    echo json_encode([
        "status" => "false",
        "message" => "User ID is required"
    ]);
    exit;
}

$sql = "DELETE FROM tbl_cart WHERE user_id = '$user_id'";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "status" => "true",
        "message" => "Cart cleared successfully"
    ]);
} else {

    echo json_encode([
        "status" => "false",
        "message" => "Failed to clear cart"
    ]);
}

$conn->close();
