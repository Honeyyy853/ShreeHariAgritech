<?php
include 'connection.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$user_id = $_POST['user_id'];
$shipping_address = $_POST['shipping_address'];
$payment_method = $_POST['payment_method'];
$payment_id = $_POST['payment_id'] ?? null; 
$items = json_decode($_POST['items'], true);

if (!$user_id || !is_array($items)) {
    echo json_encode(["status" => false, "message" => "Invalid Data"]);
    exit;
}

$order_id = time() . rand(1000, 9999);
$order_date = date("Y-m-d H:i:s");

$order_status = "Pending";
$payment_status = ($payment_method == "cod") ? "Pending" : "Paid";

$total_amount = 0;

/* =========================
   ✅ CALCULATE TOTAL (WITH OFFER)
========================= */
foreach ($items as $item) {

    $price = $item['price'];
    $qty = $item['quantity'];
    $discount = $item['discount_value'] ?? 0;

    // 🔥 FINAL PRICE AFTER DISCOUNT
    $final_price = $price - ($price * $discount / 100);

    $total_amount += ($final_price * $qty);
}

/* =========================
   ✅ INSERT MAIN ORDER
========================= */
$sqlOrder = "INSERT INTO tbl_orders
(order_id,user_id,total_amount,payment_status,order_status,shipping_address,order_date,payment_method,payment_id)
VALUES
('$order_id','$user_id','$total_amount','$payment_status','$order_status','$shipping_address','$order_date','$payment_method','$payment_id')";

mysqli_query($conn, $sqlOrder);


/* =========================
   ✅ INSERT ORDER ITEMS (WITH FINAL PRICE)
========================= */
foreach ($items as $item) {

    $product_id = $item['product_id'];
    $qty = $item['quantity'];

    $price = $item['price'];
    $discount = $item['discount_value'] ?? 0;

    // 🔥 FINAL PRICE
    $final_price = $price - ($price * $discount / 100);

    $sqlItem = "INSERT INTO tbl_order_items
    (order_id,product_id,quantity,price,item_status,discount_value)
    VALUES
    ('$order_id','$product_id','$qty','$final_price','Pending','$discount')";

    mysqli_query($conn, $sqlItem);
}

echo json_encode([
    "status" => true,
    "order_id" => $order_id,
    "total_amount" => $total_amount
]);
?>