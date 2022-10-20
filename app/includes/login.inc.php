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

function echo_json($message, $data) {
    echo json_encode(
        array (
            'admin_status_id' => $data['admin_status_id'],
            'login_attempts' => $data['login_attempts'],
            'message' => $message
        )
    );
}

$resp = curl_request("login");

$data = json_decode($resp, true);
if ($data['message'] === 'Success') {
    if (($data['admin_password'] ===  $admin_password) && (($data['admin_status_id'] === 1) || ($data['admin_status_id'] === 3))) {
        echo json_encode(
            $data
        );
        $resp_update = curl_request("update_attempts");
    } 
    else {
        // Where login_attempts from $data is 8, but user attempts is now 9 
        if(($data['login_attempts'] >= 8) && ($data['admin_status_id'] === 1)) {
            $resp_status = curl_request("update_locked_status");
            echo_json('locked', $data);
        }
        else if ($data['admin_status_id'] === 1) {
            $resp_add = curl_request("update_add_attempts");
            echo_json('Invalid Credentials', $data);
        }
        else if ($data['admin_status_id'] === 2) {
            echo_json('suspended', $data);
        }
        else if ($data['admin_status_id'] === 3) {
            echo_json('locked', $data);
        }
        else if ($data['admin_status_id'] === 4) {
            echo_json('resigned', $data);
        }
        else {
            $resp_add = curl_request("update_add_attempts");
        }
    }
}
else {
    echo json_encode(
        array (
            'message' => 'Invalid Credentials'
        )
    );
}