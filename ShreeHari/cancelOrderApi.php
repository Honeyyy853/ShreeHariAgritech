<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$order_id = $_POST['order_id'] ?? '';
$product_id = $_POST['product_id'] ?? '';

$sql = "update tbl_order_items set item_status='Cancelled' where order_id='$order_id' and product_id='$product_id'";

//echo $sql;die;
$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(["status" => true, "message" => "Order Cancelled"]);
} else {
    echo json_encode(["status" => false, "message" => "Order Not Cancelled"]);
}

$conn->close();
