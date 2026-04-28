<?php
include 'connection.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$sql = "
SELECT 
o.order_id,
o.user_id,
u.name AS user_name,
o.order_date,
o.shipping_address,
o.payment_status,
o.payment_method,
o.payment_id,

i.product_id,
i.quantity,
i.price,
(i.quantity * i.price) AS total_amount,
i.item_status,

p.name AS product_name

FROM tbl_orders o

JOIN tbl_users u 
ON u.user_id = o.user_id

JOIN tbl_order_items i 
ON o.order_id = i.order_id

JOIN tbl_products p 
ON p.id = i.product_id

ORDER BY o.id DESC
";

$result = mysqli_query($conn, $sql);

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}   

echo json_encode([
    "status" => true,
    "data" => $data
]);
