<?php
include '../connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/PHPMailer/src/PHPMailer.php';
require '../PHPMailer/PHPMailer/src/SMTP.php';
require '../PHPMailer/PHPMailer/src/Exception.php';

// 🔐 ENV variables
$mailUser = getenv('MAIL_USERNAME');
$mailPass = getenv('MAIL_PASSWORD');
$mailFrom = getenv('MAIL_FROM');

$email = $_POST['email'] ?? '';

if (empty($email)) {
    echo json_encode([
        "status" => false,
        "message" => "Email is required"
    ]);
    exit;
}

// 🔐 Generate secure random password (NOT 123456)
$newPasswordPlain = substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"), 0, 8);
$newPasswordHash  = password_hash($newPasswordPlain, PASSWORD_DEFAULT);

try {
    $mail = new PHPMailer(true);

    // SMTP Config
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $mailUser;
    $mail->Password   = $mailPass;
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom($mailFrom, 'ShreeHariAgriTech');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'Your Account Password Reset';

    $mail->Body = "
    <div style='font-family:Arial;background:#f4f6f8;padding:20px'>
      <div style='max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:20px'>
        
        <h2 style='color:#198754'>Password Reset 🔐</h2>

        <p>Hello 👋</p>

        <p>Your new temporary password is:</p>

        <div style='background:#f1f1f1;padding:15px;border-radius:8px;font-size:18px;font-weight:bold;text-align:center'>
            $newPasswordPlain
        </div>

        <p>Please login and change your password immediately.</p>

        <p style='color:red'><b>Do not share this password with anyone.</b></p>

        <hr>

        <p style='font-size:12px;color:#777'>ShreeHariAgriTech Team</p>

      </div>
    </div>
    ";

    $mail->send();

    // ✅ Secure DB update (Prepared Statement)
    $stmt = $conn->prepare("UPDATE tbl_users SET password = ? WHERE email = ?");
    $stmt->bind_param("ss", $newPasswordHash, $email);
    $stmt->execute();

    echo json_encode([
        "status" => true,
        "message" => "Password reset successfully. Email sent."
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => false,
        "message" => "Failed to send email"
    ]);
}

$conn->close();
?>
