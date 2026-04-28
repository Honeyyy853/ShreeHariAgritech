<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();
$id=$_POST['id'];

$sql="DELETE FROM tbl_offers WHERE offer_id='$id'";
$result=mysqli_query($conn,$sql);

if($result){
    echo json_encode([
        "status"=>"true",
        "message"=>"Offer deleted successfully"
    ]);
}else{
    echo json_encode([
        "status"=>"false",
        "message"=>"Error deleting offer"
    ]);
}
?>