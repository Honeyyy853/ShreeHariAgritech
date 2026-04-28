<?php
include 'connection.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

/* ================= GET DATA ================= */
$order_id   = $_POST['order_id'] ?? '';
$product_id = $_POST['product_id'] ?? '';
$status     = $_POST['order_status'] ?? '';

if (!$order_id || !$product_id || !$status) {
    echo json_encode([
        "success" => false,
        "message" => "Missing data"
    ]);
    exit;
}

/* ================= UPDATE ITEM STATUS ================= */
$updateItem = mysqli_query($conn, "
    UPDATE tbl_order_items 
    SET item_status='$status'
    WHERE order_id='$order_id'
    AND product_id='$product_id'
");

if (!$updateItem) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn)
    ]);
    exit;
}

/* ================= GET ITEMS SUMMARY ================= */
$check = mysqli_query($conn, "
    SELECT 
        COUNT(*) as total,
        SUM(item_status='Delivered') as delivered,
        SUM(item_status='Cancelled') as cancelled,
        SUM(item_status='Processing') as processing,
        SUM(item_status='Shipped') as shipped
    FROM tbl_order_items
    WHERE order_id='$order_id'
");

$row = mysqli_fetch_assoc($check);

$total      = (int)$row['total'];
$delivered  = (int)$row['delivered'];
$cancelled  = (int)$row['cancelled'];
$processing = (int)$row['processing'];
$shipped    = (int)$row['shipped'];

/* ================= GET ORDER INFO ================= */
$getOrder = mysqli_query($conn, "
    SELECT payment_method, payment_status 
    FROM tbl_orders 
    WHERE order_id='$order_id'
");

$orderData = mysqli_fetch_assoc($getOrder);

$payment_method = strtolower($orderData['payment_method'] ?? '');
$current_payment_status = $orderData['payment_status'] ?? 'Pending';

/* ================= DECIDE ORDER STATUS ================= */
$new_order_status = 'Pending';

if ($total == $cancelled && $total > 0) {

    $new_order_status = 'Cancelled';

}
elseif ($total == ($delivered + $cancelled) && $total > 0) {

    $new_order_status = 'Completed';

}
elseif ($processing > 0 || $shipped > 0) {

    $new_order_status = 'Processing';

}
elseif ($delivered > 0) {

    $new_order_status = 'Partially Completed';

}

/* ================= DECIDE PAYMENT STATUS ================= */
$new_payment_status = $current_payment_status;

/* ✅ COD → only when ALL items delivered */
if ($payment_method == 'cod' && $delivered == $total && $total > 0) {
    $new_payment_status = 'Paid';
}

/* ================= UPDATE ORDER ================= */
$updateOrder = mysqli_query($conn, "
    UPDATE tbl_orders
    SET 
        order_status='$new_order_status',
        payment_status='$new_payment_status'
    WHERE order_id='$order_id'
");

if (!$updateOrder) {
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conn)
    ]);
    exit;
}

/* ================= RESPONSE ================= */
echo json_encode([
    "success" => true,
    "message" => "Order & Item Updated Successfully",
    "order_status" => $new_order_status,
    "payment_status" => $new_payment_status
]);
?>