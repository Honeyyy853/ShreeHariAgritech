<?php
include 'connection.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$user_id = $_GET['user_id'];

$query = "
SELECT
o.order_id,
o.order_date,
o.order_status,
o.total_amount,

oi.product_id,
oi.quantity,
oi.price,
oi.discount_value,
oi.item_status,

p.name,
p.description,
p.image,
p.cat_id,

ofr.promocode,
ofr.offerName

FROM tbl_orders o

JOIN tbl_order_items oi
ON oi.order_id = o.order_id

JOIN tbl_products p
ON p.id = oi.product_id

LEFT JOIN tbl_offers ofr
ON p.offerId = ofr.offer_id

WHERE o.user_id='$user_id'
AND o.order_status NOT IN ('Completed','Cancelled')

ORDER BY o.order_id DESC
";

$result = mysqli_query($conn, $query);

$orders = [];

while ($row = mysqli_fetch_assoc($result)) {

    $folder = "";

    if ($row['cat_id'] == 1) $folder = "Herbs";
    if ($row['cat_id'] == 2) $folder = "DehydratedFruits";
    if ($row['cat_id'] == 3) $folder = "DehydratedVegetables";

    $image = $folder . "/" . $row['image'];

    $oid = $row['order_id'];

    if (!isset($orders[$oid])) {

        $orders[$oid] = [
            "order_id" => $oid,
            "order_date" => $row['order_date'],
            "order_status" => $row['order_status'],
            "total_amount" => $row['total_amount'],
            "items" => []
        ];
    }

    $orders[$oid]['items'][] = [

        "product_id" => $row['product_id'],
        "product_name" => $row['name'],
        "description" => $row['description'],
        "price" => $row['price'],
        "quantity" => $row['quantity'],

        "discount_value" => $row['discount_value'], // order ka actual discount

        "promocode" => $row['promocode'],
        "offerName" => $row['offerName'],

        "item_status" => $row['item_status'],
        "image" => $image

    ];
}

echo json_encode([
    "status" => true,
    "data" => array_values($orders)
]);
