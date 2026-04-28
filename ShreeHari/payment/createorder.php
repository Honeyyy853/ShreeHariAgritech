<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require_once "razorpay-php/Razorpay.php";

use Razorpay\Api\Api;

// Get amount
$amount = isset($_GET['amount']) ? (int)$_GET['amount'] : 0;

/*
|--------------------------------------------------------------------------
| ⚠️ IMPORTANT
| DO NOT store API keys here
| Use environment variables instead
|--------------------------------------------------------------------------
*/

// Example (uncomment when using ENV)
// $keyId = getenv("RAZORPAY_KEY_ID");
// $keySecret = getenv("RAZORPAY_KEY_SECRET");

// Temporary placeholders (for GitHub safety)
$keyId = "YOUR_RAZORPAY_KEY_ID";
$keySecret = "YOUR_RAZORPAY_KEY_SECRET";

$api = new Api($keyId, $keySecret);

// Create order
$orderData = [
    'receipt'  => 'rcptid_' . time(),
    'amount'   => $amount * 100, // Razorpay works in paise
    'currency' => 'INR'
];

try {
    $order = $api->order->create($orderData);

    echo json_encode([
        "status" => true,
        "data" => $order->toArray()
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => false,
        "message" => "Order creation failed"
        // "error" => $e->getMessage() // debugging ke liye
    ]);
}
