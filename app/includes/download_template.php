<?php
$filename = 'template.csv';
$filepath = '../temp/' . $filename;

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '"');

$data_header = ['account_id', 'start_date', 'plan_name', 'connection_name', 'area_name', 'first_name', 'middle_name', 'last_name', 'billing_address', 'mobile_number', 'email', 'birthdate', 'install_type_name', 'install_balance', 'install_status', 'billing_end_date', 'total_bill', 'running_balance'];

$fp = fopen($filepath, 'w');
fputcsv($fp, $data_header);
fclose($fp);

$fp = fopen($filepath, 'r');
fpassthru($fp);
fclose($fp);

unlink($filepath);