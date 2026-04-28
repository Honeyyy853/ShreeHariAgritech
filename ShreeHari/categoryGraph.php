<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$response = [];

$query = "
SELECT 
    c.id,
    c.name,
    COUNT(p.id) AS totalProducts,
    IFNULL(SUM(p.price), 0) AS totalPrice
FROM tbl_category c
LEFT JOIN tbl_products p ON c.id = p.cat_id
GROUP BY c.id
";

$result = mysqli_query($conn, $query);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $response[] = [
            "name" => $row['name'],
            "totalProducts" => (int)$row['totalProducts'],
            "totalPrice" => (int)$row['totalPrice']
        ];
    }

    echo json_encode($response);
} else {
    echo json_encode([
        "status" => "false",
        "message" => "Query Failed",
        "error" => mysqli_error($conn)
    ]);
}

$conn->close();
?>