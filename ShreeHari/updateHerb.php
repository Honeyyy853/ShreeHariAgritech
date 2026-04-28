<?php
include 'connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$response = [];
$id          = $_POST['id'] ?? '';
$name        = $_POST['name'] ?? '';
$price       = $_POST['price'] ?? '';
$unit        = $_POST['unit'] ?? '';
$description = $_POST['description'] ?? '';
$offerId     = $_POST["offerId"];
if($offerId == "") {
    $offerId = "NULL";
}

if ($id === '' || $name === '' || $price === '' || $unit === '') {
    echo json_encode([
        "status" => "false",
        "message" => "Required fields missing"
    ]);
    exit;
}

if (isset($_FILES['image']['name']) && $_FILES['image']['name'] !== '') {
    $exe = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $filename = time() . random_int(1000, 9999) . '.' . $exe;
    //echo $filename;die;
    move_uploaded_file($_FILES['image']['tmp_name'], './uploads/Herbs/' . $filename);
} else {
    $sql = " SELECT * from tbl_products WHERE id = '$id' ";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $filename = $row['image'];
    // echo $filename;die;
    // $filename="17676808719791.jpg";
}
$sql = "
    UPDATE tbl_products SET
        name = '$name',
        price = '$price',
        unit = '$unit',
        description = '$description',
offerId = $offerId,
        image = '$filename'
    WHERE id = '$id'
";
//echo $sql;die;

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "status" => "true",
        "message" => "Herb Updated Successfully"
    ]);
} else {
    echo json_encode([
        "status" => "false",
        "message" => mysqli_error($conn)
    ]);
}

$conn->close();
