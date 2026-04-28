<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();
$id=$_POST['id'];

$sql="SELECT * FROM tbl_offers WHERE offer_id='$id'";
$result=mysqli_query($conn,$sql);

$row=mysqli_fetch_assoc($result);
if($row){
    $response['status']="true";
    $response['message']="Offer Found";
    $response['data']=$row;
}
else{
    $response['status']="false";
    $response['message']="Offer Not Found";
    $response['data']=null;
}
echo json_encode([
    "status"=>"true",
    "data"=>$row
]);
?>