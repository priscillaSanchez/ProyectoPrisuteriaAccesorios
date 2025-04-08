<?php
// Asegúrate de ajustar la ruta a donde descomprimiste PHPMailer
require 'PHPMailer-master(1)/src/PHPMailer.php';
require 'PHPMailer-master(1)/src/Exception.php';
require 'PHPMailer-master(1)/src/SMTP.php';

// Si todo está bien, ahora puedes usar la clase PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);  // Crear una instancia de PHPMailer

try {
    // Configuración de SMTP (si estás usando un servidor SMTP)
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // Cambia al servidor SMTP que estés utilizando
    $mail->SMTPAuth = true;
    $mail->Username = 'nikiarias40@gmail.com';  // Tu correo
    $mail->Password = 'bycicle2024';  // Tu contraseña o contraseña de aplicación
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Remitente y destinatario
    $mail->setFrom('nikiarias40@gmail.com', 'Prisuteria');
    $mail->addAddress('nicolariascordoba@example.com', 'Destinatario');

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Nuevo mensaje desde el formulario';
    $mail->Body    = 'Aquí va el contenido del correo con los datos del formulario.';

    // Enviar el correo
    $mail->send();
    echo 'El mensaje fue enviado correctamente';
} catch (Exception $e) {
    echo "No se pudo enviar el mensaje. Error de Mailer: {$mail->ErrorInfo}";
}
?>