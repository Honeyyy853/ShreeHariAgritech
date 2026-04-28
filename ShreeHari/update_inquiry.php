<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();

// Get data
$id = $_POST['id'];
$status = $_POST['status'];

// Update query
$sql = "UPDATE tbl_inquiries SET status='$status' WHERE inquiry_id='$id'";
$result = mysqli_query($conn, $sql);

// Response
if($result){
    echo json_encode([
        "status" => "true",
        "message" => "Status updated successfully"
    ]);
}else{
    echo json_encode([
        "status" => "false",
        "message" => "Error updating status"
    ]);
}
?>