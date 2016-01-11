<?php
//$_SERVER['REQUEST_METHOD'] ='POST';

require './vendor/autoload.php';
// Configure your Subject Prefix and Recipient here
$subjectPrefix = '[Contact via website]';
$emailTo = 'jayden.schulz09@gmail.com';

$errors = array(); // array to hold validation errors
$data = array(); // array to pass back data

$host = "localhost";
$port = 3306;
$socket = "";
$user = "twistitlabs";
$password = "308590";
$dbname = "twistitlabs";

$db = new MysqliDb($host,$user,$password,$dbname,$port);
//print_r($db);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = stripslashes(trim($_POST['name']));
    $email = stripslashes(trim($_POST['email']));
    $subject = stripslashes(trim($_POST['subject']));
    $message = stripslashes(trim($_POST['message']));
    $phone = stripslashes(trim($_POST['phone']));

//$name = 'sadf';
  //$email = 'jayden.schulz09@gmail.com';
 //$subject = 'sadf';
 //$/message = 'dsf';
    
    if (empty($name)) {
        $errors['name'] = 'Name is required.';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Email is invalid.';
    }

    if (empty($subject)) {
        $errors['subject'] = 'Subject is required.';
    }

    if (empty($message)) {
        $errors['message'] = 'Message is required.';
    }

    // if there are any errors in our errors array, return a success boolean or false
    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors'] = $errors;
    } else {
       
        $data['success'] = true;
        $data['message'] = 'Congratulations. Your message has been sent successfully';
        $db->rawQuery("INSERT INTO `twistitlabs`.`contacts` (`name`,`email`,`subject`,`message`, `phone`) VALUES ('$name','$email','$subject','$message', '$phone')");
    }

    // return all our data to an AJAX call
    echo json_encode($data);
}