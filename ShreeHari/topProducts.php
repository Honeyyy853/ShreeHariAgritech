<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = [];

$query = "
SELECT p.name, SUM(oi.quantity) as sold
FROM tbl_order_items oi
JOIN tbl_products p ON oi.product_id = p.id
GROUP BY oi.product_id
ORDER BY sold DESC
LIMIT 5
";

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
        "sold" => (int)$row['sold']
    ];
}

echo json_encode($response);
$conn->close();
?>