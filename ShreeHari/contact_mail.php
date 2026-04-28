<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'connection.php';

require './PHPMailer/PHPMailer/src/PHPMailer.php';
require './PHPMailer/PHPMailer/src/SMTP.php';
require './PHPMailer/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

// Load ENV variables
$mailUser = getenv('MAIL_USERNAME');
$mailPass = getenv('MAIL_PASSWORD');
$mailFrom = getenv('MAIL_FROM');
$mailTo   = getenv('MAIL_TO');

// Get JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Sanitize + Trim
function clean($value) {
    return htmlspecialchars(trim($value ?? ''));
}

$name     = clean($data['name']);
$email    = clean($data['email']);
$phone    = clean($data['phone']);
$inquiry  = clean($data['inquiry_type']);
$product  = clean($data['product']);
$quantity = clean($data['quantity']);
$message  = clean($data['message']);

// Validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
        "status" => false,
        "message" => "Please fill all required fields"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "status" => false,
        "message" => "Invalid email format"
    ]);
    exit;
}

try {

    /* ==========================
       SAVE TO DATABASE
    ========================== */

    $stmt = $conn->prepare("
        INSERT INTO tbl_inquiries 
        (name, email, phone, inquiry_type, product, quantity, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    if (!$stmt) {
        throw new Exception("Database prepare failed");
    }

    $stmt->bind_param(
        "sssssss",
        $name,
        $email,
        $phone,
        $inquiry,
        $product,
        $quantity,
        $message
    );

    if (!$stmt->execute()) {
        throw new Exception("Database insert failed");
    }

    /* ==========================
       SEND EMAIL
    ========================== */

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $mailUser;
    $mail->Password   = $mailPass;
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom($mailFrom, 'ShreeHariAgriTech');
    $mail->addAddress($mailTo);

    $mail->isHTML(true);
    $mail->Subject = "New Inquiry Received";

    $mail->Body = "
    <div style='font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden'>
        
        <div style='background:#2e7d32;color:#fff;padding:15px;text-align:center'>
            <h2>New Website Inquiry</h2>
        </div>

        <div style='padding:20px'>
            <p><b>Name:</b> $name</p>
            <p><b>Email:</b> $email</p>
            <p><b>Phone:</b> $phone</p>
            <p><b>Inquiry Type:</b> $inquiry</p>
            <p><b>Product:</b> $product</p>
            <p><b>Quantity:</b> $quantity</p>
            <p><b>Message:</b><br>$message</p>
        </div>

        <div style='background:#f5f5f5;padding:10px;text-align:center;font-size:12px;color:#777'>
            This message was sent from your website
        </div>
    </div>
    ";

    $mail->send();

    echo json_encode([
        "status" => true,
        "message" => "✅ Inquiry sent successfully!"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "status" => false,
        "message" => "❌ Failed to process request."
    ]);
}

?>
