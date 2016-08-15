<?php

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   // echo $_POST['name'];
   // echo $_POST['url'];
   // echo $_POST['email'];
   // echo $_POST['phone'];
   // echo $_POST['description'];

   $to_address = "hello@rxmcreative.com";
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
   $headers .= 'To: hello@rxmcreative.com'."\r\n";
   $headers .= 'From: info@clickbaitforgood.org' . "\r\n";

   // Send mail
   mail ( $to_address , $subject , $mail_body, $headers );

   // Check if ajax
   if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
     die(json_encode(array('type' => 'success')));
   } else {
   // Regular php redirect
      header('Location: ../index.html?submitted=true#add');
   }



  } else {
    header("HTTP/1.0 403 access forbidden");
    echo "<h1>403 access forbidden</h1>";
  }


  //
?>
