<?php
include '../connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();
$response['status'] = "false";


$result = mysqli_query(
    $conn,
    "SELECT p.id,
            p.name,
            p.description,
            p.price,
            p.unit,
            p.image,
            c.name AS category_name
     FROM tbl_products p
     LEFT JOIN tbl_category c ON p.cat_id = c.id
     WHERE p.cat_id = 1 AND p.addtoCart > 0"
);

while ($row = mysqli_fetch_assoc($result)) {
    $response['status'] = "true";
    $response['herb'][] = $row;
}

$result = mysqli_query(
    $conn,
    "SELECT p.id,
            p.name,
            p.description,
            p.price,
            p.unit,
            p.image,
            c.name AS category_name
     FROM tbl_products p
     LEFT JOIN tbl_category c ON p.cat_id = c.id
     WHERE p.cat_id = 2 AND p.addtoCart > 0"
);

while ($row = mysqli_fetch_assoc($result)) {
    $response['status'] = "true";
    $response['df'][] = $row;
}


$result = mysqli_query(
    $conn,
    "SELECT p.id,
            p.name,
            p.description,
            p.price,
            p.unit,
            p.image,
            c.name AS category_name
     FROM tbl_products p
     LEFT JOIN tbl_category c ON p.cat_id = c.id
     WHERE p.cat_id = 3 AND p.addtoCart > 0"
);

while ($row = mysqli_fetch_assoc($result)) {
    $response['status'] = "true";
    $response['dv'][] = $row;
}

echo json_encode($response);
$conn->close();
