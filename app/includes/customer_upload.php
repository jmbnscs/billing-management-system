<?php
$ch = require 'curl.init.php';
$url = DIR_API . "upload/customer.php";

$data_error = array(['account_id', 'start_date', 'plan_name', 'connection_name', 'area_name', 'first_name', 'middle_name', 'last_name', 'billing_address', 'mobile_number', 'email', 'birthdate', 'install_type_name', 'install_balance', 'install_status', 'billing_end_date', 'total_bill', 'running_balance']);

if(isset($_POST['importSubmit'])){
    
    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
    
    if(!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'], $csvMimes)){
        
        // If the file is uploaded
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            
            $csvFile = fopen($_FILES['file']['tmp_name'], 'r');
            $fp = fopen('../temp/uploaderror.csv', 'w');
            
            fgetcsv($csvFile);
            
            while(($line = fgetcsv($csvFile)) !== FALSE){

                $account_id = isAccountIDExist($line[0]);
                $mobile_number = formatMobileNumber($line[9]);
                $email = formatEmail($line[10]);

                if ($account_id == 'error') {
                    array_push($data_error, $line);
                }
                else if ($mobile_number == 'error') {
                    array_push($data_error, $line);
                }
                else if ($email == 'error') {
                    array_push($data_error, $line);
                }
                else {
                    $data = json_encode(
                        array (
                            'account_id' => $line[0],
                            'start_date' => $line[1],
                            'plan_name' => $line[2],
                            'connection_name' => $line[3],
                            'area_name' => $line[4],
                            'first_name' => $line[5],
                            'middle_name' => $line[6],
                            'last_name' => $line[7],
                            'billing_address' => $line[8],
                            'mobile_number' => $mobile_number,
                            'email' => $email,
                            'birthdate' => $line[11],
                            'install_type_name' => $line[12],
                            'installation_balance' => $line[13],
                            'install_status' => $line[14],
                            'billing_end_date' => $line[15],
                            'total_bill' => $line[16],
                            'running_balance' => $line[17],
                        )
                    );
    
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
                    
                    $resp = curl_exec($ch);
                    curl_close($ch);
                    $response = json_decode($resp, true);

                    if ($response['success'] === true) {
                        // $qstring = '?status=succ';
                        continue;
                    }
                    else {
                        array_push($data_error, $data);
                    }
                }
            }

            if (count($data_error) === 1) {
                $qstring = '?status=succ';
                // echo json_encode(
                //     array (
                //         'success' => true
                //     )
                // );
            }
            else {
                foreach ($data_error as $fields) {
                    fputcsv($fp, $fields);
                }
                $qstring = '?status=err';
                // echo json_encode(
                //     array (
                //         'success' => false
                //     )
                // );
            }
            fclose($fp);
            fclose($csvFile);
        }
        else {
            $qstring = '?status=err';
            // echo json_encode(
            //     array (
            //         'success' => false,
            //         'error' => 'File upload error.'
            //     )
            // );
        }
    }
    else {
        $qstring = '?status=invalid_file';
        // echo json_encode(
        //     array (
        //         'success' => false,
        //         'error' => 'File invalid.'
        //     )
        // );
    }
}

function formatMobileNumber ($mobile_number) {
	if((substr($mobile_number, 0, 2) === '09') && (strlen($mobile_number) === 11)) {
    	return $mobile_number;
    }
    else if((substr($mobile_number, 0, 1) === '9') && (strlen($mobile_number) === 10)) {
    	return '0' . $mobile_number;
    }
    else {
    	return 'error';
    }
}

function formatEmail ($email) {
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return $email;
    }
    else {
        return 'error';
    }
}

function isAccountIDExist ($account_id) {
    $ch = require 'curl.init.php';
    $url = DIR_API . "account/read_single.php?account_id=" . $account_id;

    $data = json_encode(
        array (
            'account_id' => $account_id
        )
    );

    curl_setopt($ch, CURLOPT_URL, $url);
    
    $resp = curl_exec($ch);
    curl_close($ch);
    $response = json_decode($resp, true);

    if ($response['message'] === 'success') {
        return 'error';
    }
    else {
        return $account_id;
    }
}

header("Location: ../../public/views/customers_import.php".$qstring);