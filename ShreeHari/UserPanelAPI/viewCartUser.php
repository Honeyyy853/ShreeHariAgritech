<?php
include '../connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();


$userid = $_POST['user_id'] ?? $_GET['user_id'] ?? '';

if (empty($userid)) {
    echo json_encode(['status' => "false", 'message' => "User ID required"]);
    exit;
}

$sql = "SELECT p.id as product_id, p.name, p.description, p.price, p.image, p.cat_id, c.quantity, tbl_offers.promocode, tbl_offers.offerName, tbl_offers.discount_value FROM tbl_cart c LEFT JOIN tbl_products p ON c.product_id = p.id LEFT JOIN tbl_offers on p.offerId=tbl_offers.offer_id WHERE c.user_id = $userid";

$result = mysqli_query($conn, $sql);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

if (count($data) > 0) {
    $response['status'] = "true";
    $response['data'] = $data;
} else {
    $response['status'] = "false";
    $response['data'] = [];
}

echo json_encode($response);
$conn->close();
