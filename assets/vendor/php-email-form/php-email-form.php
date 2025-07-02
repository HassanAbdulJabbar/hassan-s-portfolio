<?php
/**
 * PHP Email Form - v2.3
 * https://bootstrapmade.com/php-email-form/
 */

class PHP_Email_Form {
  public $to;
  public $from_name;
  public $from_email;
  public $subject;
  public $smtp;
  public $ajax;
  public $message = array();

  public function add_message($content, $label = '') {
    $this->message[] = array('content' => $content, 'label' => $label);
  }

  public function send() {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    try {
      if ($this->smtp) {
        $mail->isSMTP();
        $mail->Host = $this->smtp['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $this->smtp['username'];
        $mail->Password = $this->smtp['password'];
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $this->smtp['port'];
      }

      $mail->setFrom($this->from_email, $this->from_name);
      $mail->addAddress($this->to);
      $mail->Subject = $this->subject;

      $email_content = '';
      foreach ($this->message as $msg) {
        if ($msg['label']) {
          $email_content .= $msg['label'] . ': ' . $msg['content'] . "\n\n";
        } else {
          $email_content .= $msg['content'] . "\n\n";
        }
      }

      $mail->Body = $email_content;
      $mail->send();

      return 'OK';
    } catch (Exception $e) {
      return 'Error: ' . $mail->ErrorInfo;
    }
  }
}

// Simple PHPMailer implementation if not available
if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
  class SimpleMailer {
    public function isSMTP() {}
    public function setFrom($email, $name) {}
    public function addAddress($email) {}
    public function Subject($subject) {}
    public function Body($body) {}
    public function send() {
      // Simple mail function as fallback
      $to = $this->to;
      $subject = $this->subject;
      $message = $this->body;
      $headers = 'From: ' . $this->from_email . "\r\n" .
                 'Reply-To: ' . $this->from_email . "\r\n" .
                 'X-Mailer: PHP/' . phpversion();

      return mail($to, $subject, $message, $headers) ? 'OK' : 'Error: Could not send email';
    }
  }
  
  // Create a simple wrapper
  class PHPMailer {
    public static function PHPMailer($debug = false) {
      return new SimpleMailer();
    }
  }
}
?> 