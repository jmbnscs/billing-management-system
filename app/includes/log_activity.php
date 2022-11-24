<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    function getUserIP()
    {
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if(filter_var($client, FILTER_VALIDATE_IP))
        {
            $ip = $client;
        }
        elseif(filter_var($forward, FILTER_VALIDATE_IP))
        {
            $ip = $forward;
        }
        else    {
            $ip = $remote;
        }

        return $ip;
    }

    $ip_address = getUserIP();
    $user_agent = $_SERVER['HTTP_USER_AGENT'];

    $data = array(
        'ip_address' => $ip_address,
        'user_agent' => $user_agent,
        'message' => 'success'
    );

    print_r(json_encode($data));