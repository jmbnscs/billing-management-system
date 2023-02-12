<?php
require_once('../helpers/tcpdf/tcpdf.php');

    class PDF extends TCPDF {
        public function SetHeaderPage () {
            $gstechlogo = '../images/gstech-logo.jpg';

            $this->SetFillColor(0, 0, 205);
            $this->Rect(0, 0, 240, 30, 'F', 0);
            
            $this->Image($gstechlogo, 0, 0, 61, '', 'JPG', '', 'T', false, 300, '', false, false);
            $this->Ln(10);

            $this->SetTextColor(255, 255, 255); 
            $this->setFont('helvetica', '', 15);
            $this->Cell(180, 5, 'Income Summary Report', 0, 1, 'R');
            
            $this->Ln(10);
            $this->SetTextColor(0, 0, 0); 
            $this->setFont('helvetica', '', 12);
        }

        public function LoadData($page) {
            $ch = require 'curl.init.php';
            $url = DIR_API . $page;
            curl_setopt($ch, CURLOPT_URL, $url);
            $resp = curl_exec($ch);
            $response = json_decode($resp, true);
            curl_close($ch);

            return $response;
        }

        public function ReadData($page, $report_from, $report_to) {
            $data = json_encode(
                array(
                    'date_from' => $report_from,
                    'date_to' => $report_to
                )
            );
            $ch = require 'curl.init.php';
            $url = DIR_API . $page;
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            $resp = curl_exec($ch);
            $response = json_decode($resp, true);
            curl_close($ch);

            return $response;
        }

        public function displayData($data, $report_from, $report_to) {
            $from = new DateTime($report_from);
            $to = new DateTime($report_to);

            $gross_income = (float)$data['sales'] - (float)$data['total_expenses'];
            $net_income = $gross_income + (float)$data['installation_sales'] + (float)$data['prorate_loss'];

            $this->Ln(10);

            $html = '
            <h2> Income Report Summary </h2>
            <p> ' . $from->format('m/d/y') . ' - ' . $to->format('m/d/y') . ' </p>
            
            <table style="width:100%; margin-bottom=0; padding: 15px;">
                <tr>
                    <th scope="col" style="width: 75%; color: #012970; border-bottom: 3px solid #0000CD;"></th>
                    <th scope="col" style="width: 25%; color: #012970; border-bottom: 3px solid #0000CD;"></th>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970;"><strong>REVENUES</strong> <br> &nbsp;&nbsp;Total Sales</th>
                    <td><br> P '. number_format($data['sales'], 2) .' </td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 3px solid #0000CD;"><strong>LESS: COST OF SALES</strong></th>
                    <td style="border-bottom: 3px solid #0000CD;;"> P '. number_format($data['total_expenses'], 2) . '</td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 3px solid #0000CD;"><strong>GROSS PROFIT</strong></th>
                    <td style="border-bottom: 3px solid #0000CD;;"> P '. number_format($gross_income, 2) .' </td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970;"><strong>OTHER INCOME/(LOSS)</strong> <br> &nbsp;&nbsp;Installation Charges</th>
                    <td><br><br> P ' . number_format($data['installation_sales'], 2) . '</td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 4px solid #0000CD;">&nbsp;&nbsp;Prorate Discounts</th>
                    <td style="border-bottom: 4px solid #0000CD;"> P ' . number_format($data['prorate_loss'], 2) . '</td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 4px solid #0000CD;"><strong>NET INCOME</strong></th>
                    <th style="color: #012970; border-bottom: 4px solid #0000CD;"><strong>P '. number_format($net_income, 2) .'</strong></th>
                </tr>
            </table>
            ';
            $this->writeHTML($html, true, false, true, false, '');
        }

        
    }

    $pdf = new PDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->setCreator(PDF_CREATOR);
    $pdf->setAuthor('GSTechBMS');
    $pdf->setSubject('GSTech Billing Statement');
    
    // $pdf->setHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 001', PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
    // $pdf->setFooterData(array(0,64,0), array(0,64,128));
    
    // $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    
    $pdf->setDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    
    // set margins
    $pdf->setMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->setHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->setAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
    $pdf->setFontSubsetting(true);
    
    $pdf->setTitle('Income Summary Report');

    // $test = $_POST['report_data'];

    $pdf->AddPage();
    $pdf->SetHeaderPage();

    $reports = $pdf->ReadData('reports/read_income_summary.php', $_POST['report_from'], $_POST['report_to']);

    $pdf->displayData($reports, $_POST['report_from'], $_POST['report_to']);

    // $plans = $pdf->LoadData('plan/read_active.php');
    // $header = array('#', 'Plans', 'Bandwidth', 'Price');
    // $pdf->displayTable($header, $plans, 'Available Plans');
    
    // $connections = $pdf->LoadData('connection/read.php');
    // $header = array('#', 'Connection Name');
    // $pdf->displayTable($header, $connections, 'Connection Types');

    // $areas = $pdf->LoadData('area/read.php');
    // $header = array('#', 'Area Name');
    // $pdf->displayTable($header, $areas, 'Areas');

    // $installation = $pdf->LoadData('installation_type/read.php');
    // $header = array('#', 'Installation Type');
    // $pdf->displayTable($header, $installation, 'Installation Types');

    // $installation_status = $pdf->LoadData('statuses/read.php?status_table=installation_status');
    // $header = array('#', 'Installation Status');
    // $pdf->displayTable($header, $installation_status, 'Installation Status');

    
    // ---------------------------------------------------------
    
    $invoice = $pdf->Output('test.pdf', 'I');