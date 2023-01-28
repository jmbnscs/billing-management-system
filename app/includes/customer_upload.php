<?php
if(isset($_POST['importSubmit'])){
    $ch = require 'curl.init.php';
    $url = DIR_API . "upload/customer.php";

    $filename = 'uploaderror.csv';
    $filepath = '../temp/' . $filename;

    $data_error = array(['account_id', 'start_date', 'plan_name', 'connection_name', 'area_name', 'first_name', 'middle_name', 'last_name', 'billing_address', 'mobile_number', 'email', 'birthdate', 'install_type_name', 'install_balance', 'install_status', 'billing_end_date', 'total_bill', 'running_balance']);
    
    $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
    
    if(!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'], $csvMimes)){
        $fp = fopen($filepath, 'w');

        // If the file is uploaded
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            
            $csvFile = fopen($_FILES['file']['tmp_name'], 'r');
            
            fgetcsv($csvFile);

            while(($line = fgetcsv($csvFile)) != FALSE){

                if ($line[0] == 'account_id') {
                    break;
                }

                $account_id = isAccountIDExist($line[0]);
                $mobile_number = formatMobileNumber($line[9]);
                $email = formatEmail($line[10]);

                // Checks if there's an empty string
                function isThereEmptyString($line) {
                    for ($i = 0; $i < 17; $i++) { 
                        if (isEmptyString($line[$i])) {
                            if ($i == 6) {
                                continue;
                            }
                            else {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                if (isThereEmptyString($line)) {
                    array_push($data_error, $line);
                }
                else if ($account_id == 'error') {
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

                    if ($response['success'] == true) {
                        // $qstring = '?status=succ';
                        continue;
                    }
                    else {
                        array_push($data_error, $line);
                    }
                }
            }

            if (count($data_error) <= 1) {
                $qstring = '?status=succ';
                unlink($filepath);

                // echo json_encode(
                //     array (
                //         'success' => true
                //     )
                // );
                // echo '<script> toastr.success("Customer Records Imported Successfully."); </script>';
            }
            else {
                foreach ($data_error as $fields) {
                    fputcsv($fp, $fields);
                }
                fclose($fp);
                fclose($csvFile);
                $qstring = '?status=err';
                // echo json_encode(
                //     array (
                //         'success' => false,
                //         'error' => 'There was an error uploading the file. Please check error file and try again.'
                //     )
                // );

                // header('Content-Type: text/csv');
                // header('Content-Disposition: attachment; filename="' . $filename . '"');
                // unlink($filepath);
                // echo '<script> toastr.error("There was an error uploading the file. Please check error file and try again."); </script>';
            }
        }
        else {
            fclose($fp);
            fclose($csvFile);
            $qstring = '?status=err';
            // echo json_encode(
            //     array (
            //         'success' => false,
            //         'error' => 'File upload error.'
            //     )
            // );
            // echo '<script> toastr.error("There was an error uploading the file. Please check error file and try again."); </script>';
        }
        // echo <script> toastr.error("There was an error ") </script>
    }
    else {
        $qstring = '?status=invalid_file';
        // echo json_encode(
        //     array (
        //         'success' => false,
        //         'error' => 'File invalid.'
        //     )
        // );
        // echo '<script> toastr.error("Invalid file type. Please try again."); </script>';
    }
}

function formatMobileNumber ($mobile_number) {
	if((substr($mobile_number, 0, 2) == '09') && (strlen($mobile_number) == 11)) {
    	return $mobile_number;
    }
    else if((substr($mobile_number, 0, 1) == '9') && (strlen($mobile_number) == 10)) {
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
    $url = DIR_API . "check/account_id.php?account_id=" . $account_id;

    curl_setopt($ch, CURLOPT_URL, $url);
    
    $resp = curl_exec($ch);
    curl_close($ch);
    $response = json_decode($resp, true);

    if ($response['exist']) {
        return 'error';
    }
    else {
        return $account_id;
    }
}

function isEmptyString($data) {
    if ($data == '' && $data == null) {
        return true;
    }
    else {
        return false;
    }
}

header("Location: ../../public/views/customers_import".$qstring);