<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$response = [
    "status" => false,
    "data" => []
];

$result = mysqli_query($conn, "
    SELECT * 
    FROM tbl_order_items 
    INNER JOIN tbl_orders 
    ON tbl_order_items.order_id = tbl_orders.order_id
");

if ($result && mysqli_num_rows($result) > 0) {

    while ($row = mysqli_fetch_assoc($result)) {
        $response["data"][] = $row;
    }

    $response["status"] = true;

} else {
    $response["message"] = "No orders found";
}

echo json_encode($response);
$conn->close();
?>