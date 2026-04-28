<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');


$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$name = $data['name'];
$phone = $data['phone'];
$address = $data['address'];
$password = $data['password'];

// Update basic info
$query = "UPDATE tbl_users 
          SET name='$name', phone='$phone', address='$address' 
          WHERE user_id='$user_id'";

mysqli_query($conn, $query);

// Agar password diya hai toh update karo
if (!empty($password)) {
    $hashed = password_hash($password, PASSWORD_DEFAULT);

    $passQuery = "UPDATE tbl_users 
                  SET password='$hashed' 
                  WHERE user_id='$user_id'";

    mysqli_query($conn, $passQuery);
}

echo json_encode(["status" => true]);
?>