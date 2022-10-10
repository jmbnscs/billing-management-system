<?php
// Fetch POST Data
$admin_username = $_POST['admin_username'];
$admin_password = $_POST['admin_password'];

// Inititiate curl
$ch = require 'curl.init.php';

# GET REQUEST
$url = DIR_API . "admin/login.php?admin_username=" . $admin_username;
curl_setopt($ch, CURLOPT_URL, $url);

$resp = curl_exec($ch);

if ($e = curl_error($ch))
{
    echo $e;
}
else
{
    $data = json_decode($resp, true);
    if ($data['message'] === 'success') {
        if ($data['admin_password'] ===  $admin_password) {
            echo json_encode(
                $data
            );
        } // You can extend the conditions here thru else if and change the message
        else {
            echo json_encode(
                array (
                    'message' => 'failed'
                )
            );
        }
    }
    else {
        echo json_encode(
            array (
                'message' => 'failed'
            )
        );
    }
    
    
}

curl_close($ch);