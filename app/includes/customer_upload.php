<?php
$ch = require 'curl.init.php';
$url = DIR_API . "upload/customer.php";

if(isset($_POST['importSubmit'])){
    
    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
    
    if(!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'], $csvMimes)){
        
        // If the file is uploaded
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            
            $csvFile = fopen($_FILES['file']['tmp_name'], 'r');
            
            fgetcsv($csvFile);
            
            while(($line = fgetcsv($csvFile)) !== FALSE){

                $data = json_encode(
                    array (
                        'account_id' => $line[0],
                        'start_date' => $line[1],
                        'plan_id' => $line[2],
                        'connection_id' => $line[3],
                        'area_id' => $line[4],
                        'first_name' => $line[5],
                        'middle_name' => $line[6],
                        'last_name' => $line[7],
                        'billing_address' => $line[8],
                        'mobile_number' => $line[9],
                        'email' => $line[10],
                        'birthdate' => $line[11],
                        'install_type_id' => $line[12],
                    )
                );

                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
                
                $resp = curl_exec($ch);
                $response = json_decode($resp, true);
                if ($response['success'] === true) {
                    $qstring = '?status=succ';
                    continue;
                }
                else {
                    $qstring = '?status=' . $response['error'];
                    break;
                }
            }
            
            fclose($csvFile);
        }
        else {
            $qstring = '?status=err';
            echo json_encode(
                array (
                    'success' => false,
                    'error' => 'File upload error.'
                )
            );
        }
    }
    else {
        $qstring = '?status=invalid_file';
        echo json_encode(
            array (
                'success' => false,
                'error' => 'File invalid.'
            )
        );
    }
}

header("Location: ../../public/views/customers_add.php".$qstring);