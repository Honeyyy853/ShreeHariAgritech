<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();

// ID get
$id = $_POST['id'];

// Delete query
$sql = "DELETE FROM tbl_inquiries WHERE inquiry_id='$id'";
$result = mysqli_query($conn, $sql);

// Response
if($result){
    echo json_encode([
        "status" => "true",
        "message" => "Inquiry deleted successfully"
    ]);
}else{
    echo json_encode([
        "status" => "false",
        "message" => "Error deleting inquiry"
    ]);
}
?>