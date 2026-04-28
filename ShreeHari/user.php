<?php
include 'connection.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$response = [];

$sql = "SELECT * FROM tbl_users ORDER BY user_id DESC";

$result = mysqli_query($conn, $sql);

$users = [];

if(mysqli_num_rows($result) > 0){

    while($row = mysqli_fetch_assoc($result)){
        $users[] = $row;
    }

    $response["status"] = true;
    $response["data"] = $users;

}else{
    $response["status"] = false;
    $response["message"] = "No users found";
}

echo json_encode($response);

$conn->close();
?>