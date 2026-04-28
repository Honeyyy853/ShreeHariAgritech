<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();
$id=$_POST['id'];
$promocode=$_POST['promocode'];
$offerName=$_POST['offerName'];
$discount=$_POST['discount_value'];
$validity=$_POST['validity'];
$status=$_POST['status'];

$sql="UPDATE tbl_offers SET
promocode='$promocode',
offerName='$offerName',
discount_value='$discount',
validity='$validity',
status='$status'
WHERE offer_id='$id'";


$result=mysqli_query($conn,$sql);

if($result){
    echo json_encode(["status"=>"true"]);
}else{
    echo json_encode(["status"=>"false"]);
}
?>