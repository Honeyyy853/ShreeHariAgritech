<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$user_id = $_POST['user_id'] ?? '';
$product_id = $_POST['product_id'] ?? '';
$rating = $_POST['rating'] ?? '';
$review_text = $_POST['review_text'] ?? '';

if (!$user_id || !$product_id || !$rating) {
    echo json_encode(["status" => false, "message" => "Missing fields"]);
    exit;
}

$check = mysqli_query($conn, "
SELECT * FROM tbl_reviews 
WHERE user_id='$user_id' AND product_id='$product_id'
");

if (mysqli_num_rows($check) > 0) {
    echo json_encode(["status" => false, "message" => "You already reviewed this product"]);
    exit;
}


$sql = "INSERT INTO tbl_reviews (user_id, product_id, rating, review_text)
VALUES ('$user_id','$product_id','$rating','$review_text')";

$result = mysqli_query($conn, $sql);

if ($result) {
    echo json_encode(["status" => true, "message" => "Review added"]);
} else {
    echo json_encode(["status" => false, "message" => "Error"]);
}
