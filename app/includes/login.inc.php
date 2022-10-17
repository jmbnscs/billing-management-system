<?php
// Fetch POST Data
$admin_username = $_POST['admin_username'];
$admin_password = $_POST['admin_password'];

function curl_request($page)
{
    global $admin_username;
    $ch = require 'curl.init.php';
    $url = DIR_API . "admin/" . $page . ".php?admin_username=" . $admin_username;
    curl_setopt($ch, CURLOPT_URL, $url);
    return curl_exec($ch);
}

$resp = curl_request("login");

$data = json_decode($resp, true);
if ($data['message'] === 'Success') {
    if ($data['admin_password'] ===  $admin_password) {
        echo json_encode(
            $data
        );
        $resp_update = curl_request("update_attempts");
    } 
    else {
        $resp_add = curl_request("update_add_attempts");
        if(($data['login_attempts'] >= 9) && ($data['admin_status_id'] === 3)) {
            $resp_status = curl_request("update_locked_status");
        }
        echo json_encode(
            array (
                'login_attempts' => $data['login_attempts'],
                'message' => 'Invalid Credentials'
            )
        );
    }
}
else {
    echo json_encode(
        array (
            'message' => 'Invalid Credentials'
        )
    );
}

/*
// Inititiate curl
$ch = require 'curl.init.php';

# GET REQUEST
$url = DIR_API . "admin/login.php?admin_username=" . $admin_username;
curl_setopt($ch, CURLOPT_URL, $url);
*/

/*if ($e = curl_error($ch))
{
    echo $e;
}
else
{

}
*/
// curl_close($ch);