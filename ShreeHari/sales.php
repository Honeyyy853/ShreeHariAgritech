<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$data = [];

$query = "
SELECT DATE(order_date) as date, SUM(total_amount) as sales
FROM tbl_orders
GROUP BY DATE(order_date)
ORDER BY DATE(order_date)
";

$result = mysqli_query($conn, $query);

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>