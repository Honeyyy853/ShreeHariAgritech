<?php
include '../connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(0); 

$email = $_POST["email"] ?? '';
$password = $_POST["password"] ?? '';

if ($email == '' || $password == '') {
    echo json_encode([
        "status" => "false",
        "message" => "Email and Password required"
    ]);
    exit;
}

$email = mysqli_real_escape_string($conn, $email);


$result = mysqli_query($conn, "SELECT * FROM tbl_users WHERE email='$email'");

if (!$result) {
    echo json_encode([
        "status" => "false",
        "message" => "Query Failed"
    ]);
    exit;
}

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_assoc($result);

    if (password_verify($password, $row['password'])) {

        echo json_encode([
            "status" => "true",
            "message" => "Login successful",
            "user_id" => $row['user_id'],
            "name" => $row['name'],
            "email" => $row['email']
        ]);
        exit;

    } else {
        echo json_encode([
            "status" => "false",
            "message" => "Invalid password"
        ]);
        exit;
    }

} else {
    echo json_encode([
        "status" => "false",
        "message" => "User not found"
    ]);
    exit;
}

$conn->close();
?>