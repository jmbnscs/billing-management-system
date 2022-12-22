<?php
require_once('../helpers/tcpdf/tcpdf.php');

    class PDF extends TCPDF {
        public function Header() {
            $gstechlogo = '../images/gstech-logo-vector.png';
            $today = new DateTime();
            $this->Image($gstechlogo, 10, 5, 25, '', 'PNG', '', 'T', false, 300, '', false, false, 0, false, false, false);
            $this->SetFont('helvetica', 'B', 20);
            $this->Ln(5);
            $this->Cell(0, 15, $today->format('F') . ' Full Report', 0, false, 'C', 0, '', 0, false, 'M', 'M');
        }

        public function Footer() {
            // Position at 15 mm from bottom
            $this->SetY(-15);
            // Set font
            $this->SetFont('helvetica', 'I', 8);
            // Page number
            $this->Cell(0, 10, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
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


        public function displayTable($header, $data, $title) {
            $this->Write(0, $title, '', 0, 'L', true, 0, false, false, 0);
            $width_cell=array(50,50,35,50);
            $this->SetFillColor(102, 178, 255);

            for ($i = 0; $i < count($header); $i++) {
                $this->Cell($width_cell[$i],10,$header[$i],1,0,'C',true); 
            }
            $this->Ln();
            
            $fill=0;
            $this->SetFillColor(224, 224, 224);

            for ($i = 0; $i < count($data); $i++) {
                $counter = 0;
                foreach ($data[$i] as $row) {
                    $this->Cell($width_cell[$counter],10,$row,1,0,'C',$fill);
                    $counter++;
                }
                $this->Ln();
                
                $fill=!$fill;
            }
        }
    }

    $pdf = new PDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $today = new DateTime();

    // set document information
    $pdf->setCreator(PDF_CREATOR);
    $pdf->setAuthor('GSTechBMS');
    $pdf->setSubject('GSTech Full Report');

    $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);
    $pdf->setFooterData(array(0,64,0), array(0,64,128));
    
    $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    
    $pdf->setDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    
    $pdf->setMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->setHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->setAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
    $pdf->setFontSubsetting(true);
    $pdf->setTitle($today->format('F') . ' Full Report');

    $pdf->SetFont('helvetica', '', 12);
    
    $pdf->AddPage(); 

    $header = array('Month', 'Count', 'Total');

    $data = $pdf->LoadData('reports/get_all_paid.php');

    $pdf->displayTable($header, $data, 'Monthly Paid Invoices Report');

    $pdf->Ln();
    $header = array('Month', 'Count', 'Total');
    $data = $pdf->LoadData('reports/get_all_unpaid.php');
    $pdf->displayTable($header, $data, 'Monthly Unpaid Invoices Report');

    $pdf->Ln();
    $header = array('Year', 'Paid', 'Unpaid');
    $data = $pdf->LoadData('reports/get_year_total.php');

    $pdf->displayTable($header, $data, 'Year Total Revenue');

    $pdf->AddPage(); 
    $header = array('Plan Name', 'Bandwidth', 'Price', 'Subscribers');
    $data = $pdf->LoadData('reports/plan_overview.php');

    $pdf->displayTable($header, $data, 'Plan Overview');
    // ---------------------------------------------------------
    
    $invoice = $pdf->Output('reports.pdf', 'I');