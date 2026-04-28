<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$productID = $_POST['productID'] ?? 0;
$userId    = $_POST['userId'] ?? 0;
$qty    = $_POST['qty'] ?? 0;


if ($productID == 0 || $userId == 0) {
    echo json_encode([
        "status" => "false",
        "message" => "Invalid data"
    ]);
    exit;
}

$check = "update tbl_cart 
set quantity = $qty
          WHERE user_id = '$userId' 
          AND product_id = '$productID'";

    if($qty == 0){
        $check = "delete from tbl_cart 
        WHERE user_id = '$userId' 
        AND product_id = '$productID'";
    }

$result = mysqli_query($conn, $check);


if ($result) {
    echo json_encode([
        "status" => "true",
        "message" => "cart Qty updated"
    ]);
} else {
    echo json_encode([
        "status" => "false",
        "message" => mysqli_error($conn)
    ]);
}

$conn->close();
