<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = [];

// ❌ product_name hata
// ✅ name use kar
$query = "SELECT name, price FROM tbl_products";

$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
    exit;
}

while ($row = mysqli_fetch_assoc($result)) {
    $response['data'][] = [
        "name" => $row['name'],
        "price" => (int)$row['price']
    ];
}

echo json_encode($response);
$conn->close();
?>