<?php

/*

Fields needed:
id -> id to find out which email adress to use
name -> Name of the person filling out the form
email -> Email Adress (used as reply)

*/

require './lib/PHPMailer-master/PHPMailerAutoload.php';

$members = array(
 "main_contact" => "info@wisp-kollektiv.de",
{{#each members}}
    {{#if email}}
         {{#if id}}
             "{{id}}" => "{{email}}",
         {{/if}}
   {{/if}}
{{/each}}
);

$trenner = ":\t"; // Doppelpunkt + Tabulator
$mailtext = "";

foreach ($_POST as $name => $wert) {
    if (is_array($wert)) {
        foreach ($wert as $einzelwert) {
            $mailtext .= "<b>".$name."</b>".$trenner.$einzelwert."<br/>";
        }
    } else {
        $mailtext .= $name.$trenner.$wert."<br/>";
    }
}




$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = '{{settings.contact.host}}';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '{{settings.contact.username}}';                 // SMTP username
$mail->Password = '{{settings.contact.password}}';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to





$mail->From = '{{settings.contact.username}}';
$mail->FromName = $_POST["name"];
$mail->addAddress($members[$_POST["id"]], $_POST["name"]);     // Add a recipient
$mail->addReplyTo($_POST["email"], $_POST["name"]);

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Kontakt von Wisp Website: '. $_POST["name"] ;
$mail->Body    =  $mailtext;
//$mail->AltBody = $mailtext;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
