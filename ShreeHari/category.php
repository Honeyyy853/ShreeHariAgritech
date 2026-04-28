<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();

$result = mysqli_query($conn, "SELECT * FROM tbl_category");

if (!$result) {
    echo json_encode([
        "status" => "false",
        "message" => "Query Failed: " . mysqli_error($conn)
    ]);
    exit;
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode([
    "status" => "true",
    "data" => $data
]);

$conn->close();
?>
