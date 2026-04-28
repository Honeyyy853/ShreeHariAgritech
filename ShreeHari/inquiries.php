<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();
$result = mysqli_query($conn, "SELECT * FROM tbl_inquiries");
while ($row = mysqli_fetch_assoc($result)) {
    $response['status'] = "true";
    $response['data'][] = $row;
}
echo json_encode($response);
$conn->close();