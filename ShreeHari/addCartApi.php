<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$productID = $_POST['productID'] ?? 0;
$userId    = $_POST['userId'] ?? 0;

if ($productID == 0 || $userId == 0) {
    echo json_encode([
        "status" => "false",
        "message" => "Invalid data"
    ]);
    exit;
}

$check = "SELECT * FROM tbl_cart 
          WHERE user_id = '$userId' 
          AND product_id = '$productID'";

$result = mysqli_query($conn, $check);
$cartCount = mysqli_num_rows($result);


if ($cartCount > 0) {

    $update = "UPDATE tbl_cart 
               SET quantity = quantity + 1
               WHERE user_id = '$userId'
               AND product_id = '$productID'";

    if (mysqli_query($conn, $update)) {
        echo json_encode([
            "status" => "true",
            "message" => "Quantity updated"
        ]);
    } else {
        echo json_encode([
            "status" => "false",
            "message" => mysqli_error($conn)
        ]);
    }

    exit;
}



$sql = "INSERT INTO tbl_cart (user_id, product_id, quantity)
        VALUES ('$userId', '$productID', 1)";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => "true",
        "message" => "Product added to cart"
    ]);
} else {
    echo json_encode([
        "status" => "false",
        "message" => mysqli_error($conn)
    ]);
}

$conn->close();
