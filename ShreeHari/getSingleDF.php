<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();
$id        = $_POST["id"];
$result = mysqli_query($conn, "SELECT * FROM tbl_products where id='$id'");
$row = mysqli_fetch_assoc($result);
if ($row) {
    $response['status'] = "true";
    $response['message'] = 'Dehydrated Fruit Found';
    $response['data'] = $row;
} else {
    $response['status'] = "false";
    $response['message'] = 'Dehydrated Fruit Not Found';
    $response['data'] = null;
}
echo json_encode($response);
$conn->close();
