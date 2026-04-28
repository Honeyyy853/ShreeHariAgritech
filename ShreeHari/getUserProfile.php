<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$user_id = $_GET['user_id'];

if (!$user_id) {
    echo json_encode(["status" => false, "message" => "User ID missing"]);
    exit;
}

$query = "SELECT user_id, name, email, phone, address, role, created_at 
          FROM tbl_users 
          WHERE user_id = '$user_id'";

$result = mysqli_query($conn, $query);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode(["status" => true, "data" => $row]);
} else {
    echo json_encode(["status" => false, "message" => "User not found"]);
}
?>