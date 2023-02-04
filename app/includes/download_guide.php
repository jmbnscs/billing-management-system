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
            $this->Cell(180, 5, 'Template Guide', 0, 1, 'R');
            
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

        public function displayTable($header, $data, $title) {
            $this->Ln(10);

            $this->Write(0, $title, '', 0, 'L', true, 0, false, false, 0);
            $width_cell=array(20,70,35,50);
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
                    if ($counter == 0) {
                        $counter++;
                        continue;
                    }
                    else {
                        $this->Cell($width_cell[$counter],10,$row,1,0,'C',$fill);
                        $counter++;
                    }
                    
                }
                $this->Ln();
                
                $fill=!$fill;
            }
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
    
    $pdf->setTitle('Template Guide');

    $pdf->AddPage();
    $pdf->SetHeaderPage();
    $plans = $pdf->LoadData('plan/read_active.php');
    $header = array('#', 'Plan Name', 'Bandwidth', 'Price');
    $pdf->displayTable($header, $plans, 'Available Plans');
    
    $connections = $pdf->LoadData('connection/read.php');
    $header = array('#', 'Connection Name');
    $pdf->displayTable($header, $connections, 'Connection Types');

    $areas = $pdf->LoadData('area/read.php');
    $header = array('#', 'Area Name');
    $pdf->displayTable($header, $areas, 'Areas');

    $installation = $pdf->LoadData('installation_type/read.php');
    $header = array('#', 'Installation Type');
    $pdf->displayTable($header, $installation, 'Installation Types');

    $installation_status = $pdf->LoadData('statuses/read.php?status_table=installation_status');
    $header = array('#', 'Installation Status');
    $pdf->displayTable($header, $installation_status, 'Installation Status');

    
    // ---------------------------------------------------------
    
    $invoice = $pdf->Output('test.pdf', 'I');