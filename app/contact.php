
<?php
	require_once './PHPMailer-master/PHPMailerAutoload.php';

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		$name = trim($_POST["name"]);
		$email = trim($_POST["email"]);
		$organization = trim($_POST["organization"]);
		$message = trim($_POST["message"]);

		if($name == "" || $email == "" || $message == ""){
	       	$error_message = "All fields requred";
		}

		if(!isset($error_message)){
			foreach($_POST as $value){
				if(stripos($value, 'Content-Type:') != FALSE){
					$error_message = "There was a problem";
					}
				}
		}
		if(!isset($error_message) && $_POST["something"] != ""){
			$error_message = "Sorry that field should not be filled out";
		}

		$mail = new PHPMailer(); // defaults to using php "mail()"

		if (!isset($error_message) && !$mail->ValidateAddress($email)){
			$error_message = "You must specify a valid email address<br/>";
		}
		//set email body with Post information
		if(! isset($error_message)){
			$body = "";
			$body = $body . "Name: " . $name . "<br/>";
			$body = $body . "Email: " . $email . "<br/>";
			$body = $body . "Message: " . $message . "<br/>";

			//populate email to stevenmlamb@gmail.com
			$mail->SetFrom($email, $name);
			// $address = "jwerkme@gmail.com";
			$address = "stevenmlamb@gmail.com";
			$mail->AddAddress($address, "Anchoripple Contact");
			$mail->Subject    = "Anchoripple Message From: " . $name;
			$mail->MsgHTML($body);

			if($mail->Send()) {
				// TODO: figure out how to use header in this case
				// header("Location: playground.php?status=thanks");
				echo 'Thank You ' . $name;
				exit;
			}else{
				$error_message = "Mailer Error: " . $mail->ErrorInfo;
			}
		}
	}
?>
