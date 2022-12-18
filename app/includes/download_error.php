<?php
$filename = 'uploaderror.csv';
$filepath = '../temp/' . $filename;

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '"');

$fp = fopen($filepath, 'r');
fpassthru($fp);
fclose($fp);

unlink($filepath);