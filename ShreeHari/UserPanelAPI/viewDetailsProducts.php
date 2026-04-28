<?php
include '../connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = array();

$id = $_POST["id"];
$result = mysqli_query($conn, "
SELECT p.id,
       p.name,
       p.description,
       p.price,
       p.unit,
       p.image,
       c.name AS category_name,
       o.offerName, 
       o.discount_value,
       r.rating,
       r.review_text,
       r.created_at
FROM tbl_products p
LEFT JOIN tbl_category c
    ON p.cat_id = c.id
LEFT JOIN tbl_offers o
    ON p.offerId = o.offer_id   
LEFT JOIN tbl_reviews r
    ON p.id = r.product_id
WHERE p.id = '$id'
");
    
while ($row = mysqli_fetch_assoc($result)) {
    $response['status'] = "true";
    $response['data'][] = $row;
}
echo json_encode($response);
$conn->close();
