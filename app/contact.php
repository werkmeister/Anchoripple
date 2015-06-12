<?php
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);
        $organization = trim($_POST["organization"]);

        $failedlist = array();
        $fail = false;

        // Check that data was sent to the mailer.
        // if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        //     // Set a 400 (bad request) response code and exit.
        //     http_response_code(400);
        //     echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        //     exit;
        // }

        if ( empty($name) ) {
          // http_response_code(400);
          // echo "name";
          $fail = true;
          array_push($failedlist, 'name');
          // exit;

        } if ( !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
          // http_response_code(400);
          // echo "email";
          $fail = true;
          array_push($failedlist, 'email');
          // exit;

        } if ( empty($message) ) {
          // http_response_code(400);
          // echo "message";
          $fail = true;
          array_push($failedlist, 'message');
          // exit;
        }

        if ( $fail == true ) {
          http_response_code(400);
          echo json_encode($failedlist);
          exit;
        }

        $recipient = "stevenmlamb@gmail.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Organization: $organization\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
