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
            $net_income = $gross_income - ((float)$data['installation_sales'] + (float)$data['prorate_loss']);

            $this->Ln(10);

            $html = '
            <br>
            <h2 style="color: #012970; text-align: center;"> Income Summary Report</h2>
            <p style="text-align: center;"> <em>' . $from->format('m/d/y') . ' - ' . $to->format('m/d/y') . '</em> </p>
            
            <table style="width:100%; margin-bottom=0; padding: 15px;">
                <tr>
                    <th scope="row" style="width: 75%; color: #012970;"><strong>REVENUES</strong> <br> &nbsp;&nbsp;Total Sales</th>
                    <td style="width: 25%;"><br> P '. number_format($data['sales'], 2) .' </td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 1px double #0000CD;"><strong>LESS: COST OF SALES</strong></th>
                    <td style="border-bottom: 1px double #0000CD;"> P '. number_format($data['total_expenses'], 2) . '</td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 3px solid #0000CD;"><strong>GROSS PROFIT</strong></th>
                    <td style="border-bottom: 3px solid #0000CD;;"> P '. number_format($gross_income, 2) .' </td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970;"><strong>OTHER INCOME/(LOSS)</strong> <br>&nbsp;&nbsp;Installation Charges</th>
                    <td><br><br> P ' . number_format($data['installation_sales'], 2) . '</td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 1px double #0000CD;">&nbsp;&nbsp;Prorate Discounts</th>
                    <td style="border-bottom: 1px double #0000CD;"> P ' . number_format($data['prorate_loss'], 2) . '</td>
                </tr>

                <tr>
                    <th scope="row" style="color: #012970; border-bottom: 4px solid #0000CD;"><strong>NET INCOME</strong></th>
                    <th style="color: #012970; border-bottom: 4px solid #0000CD; font-size: 20px;"><strong>P '. number_format($net_income, 2) .'</strong></th>
                </tr>
            </table>
            ';
            $this->writeHTML($html, true, false, true, false, '');
        }

        public function displayTable($header, $data, $title) {
            $this->Write(0, $title, '', 0, 'L', true, 0, false, false, 0);
            $width_cell=array(10,40,40,30,30,25);
            $this->SetFillColor(102, 178, 255);

            for ($i = 0; $i < count($header); $i++) {
                $this->Cell($width_cell[$i],10,$header[$i],1,0,'C',true); 
            }
            $this->Ln();
            
            $fill=0;
            $this->SetFillColor(224, 224, 224);

            for ($i = 0; $i < count($data); $i++) {
                $counter = 0;
                $this->Cell($width_cell[0],10,$i + 1,1,0,'C',$fill);

                foreach ($data[$i] as $row) {
                    $this->Cell($width_cell[$counter + 1],10,$row,1,0,'C',$fill);
                    $counter++;
                    
                }
                $this->Ln();
                
                $fill=!$fill;
            }

            $this->Ln(10);
        }

        
    }

    $pdf = new PDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->setCreator(PDF_CREATOR);
    $pdf->setAuthor('GSTechBMS');
    $pdf->setSubject('GSTech Billing Statement');
    
    $pdf->setDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    
    // set margins
    $pdf->setMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->setHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->setAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
    $pdf->setFontSubsetting(true);
    
    $pdf->setTitle('Income Summary Report');

    $pdf->AddPage();
    $pdf->SetHeaderPage();

    $date_from = $_POST['report_from'];
    $date_to = $_POST['report_to'];

    $reports = $pdf->ReadData('reports/read_income_summary.php', $date_from, $date_to);
    $pdf->displayData($reports, $date_from, $date_to);

    // $pdf->AddPage();
    // $sales = $pdf->ReadData('reports/read_sales.php', $date_from, $date_to);
    // $sales_header = array('#', 'Payment Center', 'Reference #', 'Payment Date', 'Account ID', 'Amt. Paid');
    // $pdf->displayTable($sales_header, $sales, 'Payment History');

    // $installation = $pdf->ReadData('reports/read_installation.php', $date_from, $date_to);
    // $installation_header = array('#', 'Reference #', 'Payment Date', 'Account ID', 'Amt. Paid');

    // if (count($installation) > 1) {
    //     $pdf->displayTable($installation_header, $installation, 'Installation Records');
    // }

    // $prorates = $pdf->ReadData('reports/read_prorates.php', $date_from, $date_to);
    // $prorates_header = array('#', 'Date', 'Invoice ID', 'Account ID', 'Duration', 'Prorate');

    // if (count($prorates) > 1) {
    //     $pdf->displayTable($prorates_header, $prorates, 'Prorate Records');
    // }


    // ---------------------------------------------------------
    
    $invoice = $pdf->Output('test.pdf', 'I');