<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$promocode      = $_POST["promocode"];
$offerName      = $_POST["offerName"];
$discount_value = $_POST["discount_value"];
$validity       = $_POST["validity"];
$status         = $_POST["status"];


$sql = "INSERT INTO tbl_offers 
(promocode, offerName, discount_value, validity, status) 
VALUES 
('$promocode','$offerName','$discount_value','$validity','$status')";

$result = mysqli_query($conn,$sql);

if($result){
    echo json_encode(["status"=>"true"]);
}else{
    echo json_encode(["status"=>"false"]);
}
?>