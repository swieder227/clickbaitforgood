<?php

  // echo $_POST['name'];
  // echo $_POST['url'];
  // echo $_POST['email'];
  // echo $_POST['phone'];
  // echo $_POST['description'];

  $to_address = "swieder227@gmail.com";
  $subject = "New Clickbaitforgood Charity Form Submission";

  $mail_body .= "<table cellpadding='5' cellspacing='5'>";
  $mail_body .= "<tr><td>Name:</td><td>".$_POST['name']."</tr></td>";
  $mail_body .= "<tr><td>URL:</td><td>".$_POST['url']."</tr></td>";
  $mail_body .= "<tr><td>Email:</td><td>".$_POST['email']."</tr></td>";
  $mail_body .= "<tr><td>Phone:</td><td>".$_POST['phone']."</tr></td>";
  $mail_body .= "<tr><td>Description:</td><td>".$_POST['description']."</tr></td>";
  $mail_body .= "</table>";

  // To send HTML mail, the Content-type header must be set
  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

  // Additional headers
  $headers .= 'To: swieder227@gmail.com'."\r\n";
  $headers .= 'From: info@clickbaitforgood.org' . "\r\n";

  mail ( $to_address , $subject , $mail_body, $headers );
  // echo $mail_body;

  header('Location: ../index.html?submitted=true#add');

?>
