<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$response = [];

$id = $_POST['id'] ?? '';
$cat_name = $_POST['cat_name'] ?? '';
$cat_description = $_POST['cat_description'] ?? '';

if ($id === '' || $cat_name === '' || $cat_description === '') {
    echo json_encode([
        "status" => "false",
        "message" => "Required fields missing"
    ]);
    exit;
}

$sql = "UPDATE tbl_category 
        SET name='$cat_name', Description='$cat_description' 
        WHERE id='$id'";

if (mysqli_query($conn, $sql)) {

    if (mysqli_affected_rows($conn) > 0) {
        echo json_encode([
            "status" => "true",
            "message" => "Category Updated Successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "false",
            "message" => "No changes made"
        ]);
    }

} else {
    echo json_encode([
        "status" => "false",
        "message" => mysqli_error($conn)
    ]);
}

$conn->close();
