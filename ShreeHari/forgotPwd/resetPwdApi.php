<?php
include '../connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../PHPMailer/PHPMailer/src/PHPMailer.php';

require '../PHPMailer/PHPMailer/src/SMTP.php';
require '../PHPMailer/PHPMailer/src/Exception.php';


$email = $_POST['email'] ?? 0;

// $pwd = "123456";

$pwd = password_hash("123456", PASSWORD_DEFAULT);


try {
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // Correct Gmail SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'rathodhoney852003@gmail.com'; // Replace with your email
    $mail->Password   = 'chbrvsbscagvgath';   // Use your app password securely
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
     
    // Recipients
    $mail->setFrom('rathodhoney852003@gmail.com', 'Honey');
    $mail->addAddress($email);

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Welcome to Our Platform!';
    $mail->Body = " 

```
    <p>Hi <strong>! your default pwd is 123456 , after login please change your pwd.</strong>,</p>

    <strong>Organic Store Team</strong></p>
</div>
</div>
```

";

    $mail->send();

    $response["Status"] = "Success";

    $response["MailStatus"] = "Welcome email sent successfully.";
} catch (Exception $e) {
    $response["Status"] = "Fail";

    $response["MailStatus"] = "Failed to send welcome email. Error: {$mail->ErrorInfo}";
}
$check = "UPDATE tbl_users 
SET password = '$pwd'
WHERE email = '$email'";
$result = mysqli_query($conn, $check);
if ($result) {
    echo json_encode([
        "status" => "true",
        "message" => "pwd updated successfully"
    ]);
} else {
    echo json_encode([
        "status" => "false",
        "message" => mysqli_error($conn)
    ]);
}
$conn->close();
