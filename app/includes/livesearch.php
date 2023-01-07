<?php
$ch = require 'curl.init.php';
$url = DIR_API . "pages/read_pages.php";

curl_setopt($ch, CURLOPT_URL, $url);

$resp = curl_exec($ch);

$status_code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$data = json_decode($resp, true);

if ($status_code == 200) {
  $q = $_GET['q'];

  if (strlen($q) > 0) {
    $hint = "";

    foreach ($data as $row) {
      // echo $row['page_name'] . '<br>';
      if (str_contains(strtolower($row['page_name']), $q)) {
        if ($row['page_dir'] != '-' && !str_contains(strtolower($row['page_name']), 'data')) {
          if ($hint == "") {
            $hint = "<a style='padding: 15px;' href='" . $row['page_dir'] . "' target='_blank'>" . $row['page_name'] . "</a>";
          }
          else {
            $hint = $hint . "<br/> <a style='padding: 15px;' href='" . $row['page_dir'] . "' target='_blank'>" . $row['page_name'] . "</a>";
          }
        }
      }
    }
    if ($hint=="") {
      $response="No such page exist.";
    } else {
      $response=$hint;
    }
    
    echo $response;
  }
}
else {
  echo 'Error';
}
