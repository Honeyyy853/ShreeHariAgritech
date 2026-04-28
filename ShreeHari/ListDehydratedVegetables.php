<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');


$response = array();


$result = mysqli_query($conn, "SELECT p.id,
       p.name,
       p.description,
       p.price,
       p.unit,
       p.image,
        p.offerId,
        o.offerName,
       c.name AS category_name
FROM tbl_products p
LEFT JOIN tbl_category c
    ON p.cat_id = c.id
    left join tbl_offers o
    on o.offer_id=p.offerId
    where cat_id =3
    ;
    
");
while ($row = mysqli_fetch_assoc($result)) {
    $response['status'] = "true";
    $response['data'][] = $row;
}
echo json_encode($response);


$conn->close();

