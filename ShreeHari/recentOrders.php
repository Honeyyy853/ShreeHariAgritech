<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = [];

$query = "
SELECT order_id, user_id, total_amount, order_status, order_date
FROM tbl_orders
ORDER BY order_date DESC
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
        "order_id" => $row['order_id'],
        "user_id" => $row['user_id'],
        "total_amount" => (float)$row['total_amount'],
        "status" => $row['order_status'], // 👈 yaha mapping kiya
        "order_date" => $row['order_date']
    ];
}

echo json_encode($response);
$conn->close();
?>