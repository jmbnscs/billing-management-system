<?php
$ch = require 'curl.init.php';
$url = DIR_API . "views/customer_export.php";

$filename = 'exportedCustomers.csv';
$filepath = '../temp/' . $filename;

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '"');

$data_header = ['account_id', 'start_date', 'plan_name', 'connection_name', 'area_name', 'first_name', 'middle_name', 'last_name', 'billing_address', 'mobile_number', 'email', 'birthdate', 'install_type_name', 'install_balance', 'install_status', 'billing_end_date', 'total_bill', 'running_balance'];

if(isset($_POST['exportSubmit'])){

    curl_setopt($ch, CURLOPT_URL, $url);
    $resp = curl_exec($ch);
    curl_close($ch);
    $response = json_decode($resp, true);

    echo $response;

    if ($response) {
        $fp = fopen($filepath, 'w');
        fputcsv($fp, $data_header);
        foreach ($response as $row) {
            fputcsv($fp, $row);
        }
        fclose($fp);

        // Download directly to browser
        $fp = fopen($filepath, 'r');
        fpassthru($fp);
        fclose($fp);

        // Delete CSV file created in filepath
        unlink($filepath);
        
        //$qstring = '?status=succExp';
    }
    // else {
    //     $qstring = '?status=errExp';
    // }
}

// header("Location: ../../public/views/customers_import.php" . $qstring);