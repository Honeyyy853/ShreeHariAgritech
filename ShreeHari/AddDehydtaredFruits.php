<?php
include 'connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();
$name        = $_POST["name"];
$price       = $_POST["price"];
$unit        = $_POST["unit"];
$cat_id      = $_POST["cat_id"];
$description = $_POST["description"];
$offerId = $_POST["offerId"];
if ($offerId == "") {
        $offerId = "NULL";
}
$exe = pathinfo($_FILES['DehydratedFruitImg']['name'], PATHINFO_EXTENSION);
$filename = time() . random_int(1000, 9999) . '.' . $exe;
$sql = "INSERT INTO tbl_products (name, price, unit, cat_id, description,image,offerId)
        VALUES ('$name', '$price', '$unit', '$cat_id', '$description','$filename',$offerId)";
move_uploaded_file($_FILES['DehydratedFruitImg']['tmp_name'], './uploads/DehydratedFruits/' . $filename);
$result = mysqli_query($conn, $sql);
$response['status'] = "true";
echo json_encode($response);
$conn->close();
