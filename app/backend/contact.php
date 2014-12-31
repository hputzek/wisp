<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

if(isset($_POST["name"])){
    $name = $_POST["name"];
    $email = hendrik@wisp-kollektiv.de
    $comments = $_POST["message"];

    $msg = "
    Name: $name
    Email: $email
    Comments:
    $comments";

    $to = "hendrik@putzek.com";
    $subject = "Tayrani.com Contact Form";
    $headers = "From: <$email>";
    response.addHeader("Access-Control-Allow-Origin", "*");
    mail($to,$subject,$msg,$headers);
}else{

}
?>