<?php
include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$order_id     = $_POST['order_id'] ?? '';
$order_status = $_POST['order_status'] ?? '';

if(empty($order_id) || empty($order_status)){
    echo json_encode([
        "success" => false,
        "message" => "Missing parameters"
    ]);
    exit;
}

$sql = "UPDATE tbl_orders 
        SET order_status = ?
        WHERE order_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $order_status, $order_id);

if($stmt->execute()){
    echo json_encode([
        "success" => true,
        "message" => "Order status updated"
    ]);
}else{
    echo json_encode([
        "success" => false,
        "message" => "Update failed"
    ]);
}