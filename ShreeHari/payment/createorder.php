<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// require('vendor/autoload.php');
header("Content-Type: application/json");
require_once "razorpay-php/Razorpay.php";

use Razorpay\Api\Api;

$amount = isset($_GET['amount']) ? (int)$_GET['amount'] : 0;
$keyId = "rzp_test_SHvbTnyYE85HSK";
$keySecret = "vgmUVpZ19IpF92kio5SdWsOD";

$api = new Api($keyId, $keySecret);

$orderData = [
    'receipt'         => 'rcptid_11',
    'amount'          => $amount * 100,
    'currency'        => 'INR'
];

$order = $api->order->create($orderData);

echo json_encode($order->toArray());
