<?php
// Declare Main DIR
if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
        $url = "https://";   
else  
        $url = "http://";   
// Append the host(domain name, ip) to the URL.   
$url.= $_SERVER['HTTP_HOST'];   

// Append the requested resource location to the URL   
// $url.= $_SERVER['REQUEST_URI'];  
$url.= "/gstech_api/api/";  
    
if (!defined("DIR_API")) define("DIR_API", $url);

// Inititiate curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

return $ch;