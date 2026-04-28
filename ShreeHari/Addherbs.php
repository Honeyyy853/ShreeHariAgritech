<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$name        = $_POST["name"];
$price       = $_POST["price"];
$unit        = $_POST["unit"];
$cat_id      = $_POST["cat_id"];
$description = $_POST["description"];
$offerId = $_POST["offerId"];

if($offerId == ""){
    $offerId = "NULL";
}

$filename="";

if(isset($_FILES['HerbImg']) && $_FILES['HerbImg']['name']!=""){
    $exe = pathinfo($_FILES['HerbImg']['name'], PATHINFO_EXTENSION);
    $filename = time().random_int(1000,9999).".".$exe;
    move_uploaded_file($_FILES['HerbImg']['tmp_name'],'./uploads/Herbs/'.$filename);
}

$sql="INSERT INTO tbl_products (name,price,unit,cat_id,description,image,offerId)
VALUES ('$name','$price','$unit','$cat_id','$description','$filename',$offerId)";

$result=mysqli_query($conn,$sql);

echo json_encode(["status"=>"true"]);
?>