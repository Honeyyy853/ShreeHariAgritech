<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/PHPMailer/src/PHPMailer.php';
require './PHPMailer/PHPMailer/src/SMTP.php';
require './PHPMailer/PHPMailer/src/Exception.php';

$response = array();

$email = $_POST["email"] ?? "";
$type  = $_POST["type"] ?? "";
$name  = $_POST["name"] ?? "User";

if (!$email || !$type) {
    echo json_encode([
        "Status" => "Fail",
        "Message" => "Missing email or type"
    ]);
    exit;
}

try {
    $mail = new PHPMailer(true);

    // SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'rathodhoney852003@gmail.com';
    $mail->Password   = 'chbrvsbscagvgath';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('rathodhoney852003@gmail.com', 'Organic Store');
    $mail->addAddress($email);
    $mail->isHTML(true);

    switch ($type) {

        // 🎉 REGISTER
        case "register":
            $mail->Subject = "Welcome to Organic Store, $name!";
            $mail->Body = "
            <div style='font-family:Arial;background:#f4f6f8;padding:20px'>
              <div style='max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden'>
                
                <div style='background:#198754;color:#fff;padding:20px;text-align:center'>
                  <h2>🌿 Welcome to Organic Store</h2>
                </div>
    
                <div style='padding:20px'>
                  <h3>Hello $name 👋</h3>
                  <p>Thanks for joining us! We're excited to have you.</p>
                  <p>Explore fresh, natural & eco-friendly products 🌱</p>
    
                  
                </div>
    
                <div style='background:#f1f1f1;padding:10px;text-align:center;font-size:12px'>
                  Organic Store Team
                </div>
    
              </div>
            </div>
            ";
            break;

        // 🔐 LOGIN
        case "login":
            $mail->Subject = "Login Alert - Organic Store";
            $mail->Body = "
            <div style='font-family:Arial;background:#f4f6f8;padding:20px'>
              <div style='max-width:600px;margin:auto;background:#fff;border-radius:12px'>
                
                <div style='background:#0d6efd;color:#fff;padding:20px;text-align:center'>
                  <h2>Login Successful</h2>
                </div>
    
                <div style='padding:20px'>
                  <h3>Hello!!</h3>
                  <p>You have successfully logged into your account.</p>
                  <p>If this wasn't you, please secure your account immediately.</p>
                </div>
    
              </div>
            </div>
            ";
            break;

        // 📦 ORDER
        case "order":
            $mail->Subject = " Order Confirmed!";
            $mail->Body = "
            <div style='font-family:Arial;background:#f4f6f8;padding:20px'>
              <div style='max-width:600px;margin:auto;background:#fff;border-radius:12px'>
                
                <div style='background:#198754;color:#fff;padding:20px;text-align:center'>
                  <h2>Order Confirmed 🎉</h2>
                </div>
    
                <div style='padding:20px'>
                  <h3>Hi!!</h3>
                  <p>Your order has been placed successfully.</p>
    
                  <div style='background:#f8f9fa;padding:15px;border-radius:8px;margin:15px 0'>
                    🚚 <b>Delivery Status:</b> Processing <br>
                    📍 <b>Shipping:</b> Will be delivered soon
                  </div>
    
                  <p>Thanks for shopping with us ❤️</p>
                </div>
    
              </div>
            </div>
            ";
            break;

        // 💳 PAYMENT
        case "payment":
            $mail->Subject = "Payment Successful!";
            $mail->Body = "
            <div style='font-family:Arial;background:#f4f6f8;padding:20px'>
              <div style='max-width:600px;margin:auto;background:#fff;border-radius:12px'>
                
                <div style='background:#20c997;color:#fff;padding:20px;text-align:center'>
                  <h2>Payment Successful 💳</h2>
                </div>
    
                <div style='padding:20px'>
                  <h3>Hi!!</h3>
                  <p>Your payment has been successfully processed.</p>
    
                  <div style='background:#e9f7ef;padding:15px;border-radius:8px;margin:15px 0'>
                    ✔ Transaction completed <br>
                    ✔ Your order is now confirmed
                  </div>
    
                  <p>Thank you for choosing us 🙌</p>
                </div>
    
              </div>
            </div>
            ";
            break;

        default:
            throw new Exception("Invalid type");
    }

    $mail->send();

    echo json_encode([
        "Status" => "Success",
        "Message" => "$type mail sent"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "Status" => "Fail",
        "Message" => $mail->ErrorInfo
    ]);
}
