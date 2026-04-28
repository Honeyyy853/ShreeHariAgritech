<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(0); // warnings hide

$name = $_POST["name"] ?? '';
$email = $_POST["email"] ?? '';
$phone = $_POST["phone"] ?? '';
$password = $_POST["password"] ?? '';
$role = $_POST["role"] ?? 'user';
$address = $_POST["address"] ?? '';

// Empty check
if ($name == '' || $email == '' || $phone == '' || $password == '') {
    echo json_encode([
        "status" => "false",
        "message" => "All required fields must be filled"
    ]);
    exit;
}

// Escape inputs
$name = mysqli_real_escape_string($conn, $name);
$email = mysqli_real_escape_string($conn, $email);
$phone = mysqli_real_escape_string($conn, $phone);
$address = mysqli_real_escape_string($conn, $address);

// Hash password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Check duplicate email
$check = mysqli_query($conn, "SELECT * FROM tbl_users WHERE email='$email'");
if (mysqli_num_rows($check) > 0) {
    echo json_encode([
        "status" => "false",
        "message" => "Email already exists"
    ]);
    exit;
}

// Insert query
$result = mysqli_query($conn, 
    "INSERT INTO tbl_users (name, email, phone, password, role, address) 
     VALUES ('$name', '$email', '$phone', '$hashed_password', '$role', '$address')"
);

if ($result) {
    echo json_encode([
        "status" => "true",
        "message" => "User registered successfully"
    ]);
    exit;
} else {
    echo json_encode([
        "status" => "false",
        "message" => "Registration failed"
    ]);
    exit;
}

$conn->close();
?>