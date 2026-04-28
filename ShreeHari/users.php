<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();

if (!isset($_POST['user_id'])) {
    $response['status'] = "false";
    $response['message'] = "user_id required";
    echo json_encode($response);
    exit;
}

$user_id = $_POST['user_id'];

$sql = "SELECT name, phone, address
        FROM tbl_users
        WHERE user_id = '$user_id'
        LIMIT 1";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_assoc($result);

    $response['status'] = "true";
    $response['data'] = $row;

} else {

    $response['status'] = "false";
    $response['message'] = "User not found";
}

echo json_encode($response);
$conn->close();
