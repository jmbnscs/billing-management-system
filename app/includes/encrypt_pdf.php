<?php
require_once('../helpers/tcpdf/tcpdf.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../helpers/phpmailer/src/Exception.php';
require '../helpers/phpmailer/src/PHPMailer.php';
require '../helpers/phpmailer/src/SMTP.php';

    class PDF extends TCPDF {
        public $invoice_id;
        public $account_id;

        public function Header () {
            // Store images
            $gstechlogo = '../images/gstech-logo-vector.png';
            $gstechqr = '../images/gstech-qr.jpg';
            $fblogo = '../images/fb-logo.png';
            $phonelogo = '../images/phone-logo.png';
            $maillogo = '../images/mail-logo.png';

            $invoice_id = $_POST['invoice_id'];
            $ch = require 'curl.init.php';
            $url = DIR_API . "invoice/read_single.php?invoice_id=" . $invoice_id;
            curl_setopt($ch, CURLOPT_URL, $url);
            $resp = curl_exec($ch);
            $data = json_decode($resp, true);

            $date = new DateTime($data['billing_period_end']);
            $bill_date = $date->sub(new DateInterval('P10D'));
            $bill_start = new DateTime($data['billing_period_start']);
            $bill_end = new DateTime($data['billing_period_end']);

            curl_close($ch);

            $url = DIR_API . "customer/read_single.php?account_id=" . $data['account_id'];
            curl_setopt($ch, CURLOPT_URL, $url);
            $resp = curl_exec($ch);
            $customer = json_decode($resp, true);
            curl_close($ch);

            $this->setTitle($customer['last_name'] . '-' . $bill_start->format('F') . '-Bill');
            $this->setProtection(array('modify', 'copy'), $data['account_id'], null, 0, null);
            
            $this->Image($gstechlogo, 10, 5, 80, '', 'PNG', '', 'T', false, 300, '', false, false);
            $this->Ln(10);
    
            $this->setFont('helvetica', '', 13);
            $this->Cell(180, 5, $bill_date->format('F j, Y'), 0, 1, 'R');
            $this->Ln(5);
    
            $this->setFont('helvetica', '', 10);
            $this->Cell(180, 5, 'BLK 1 LOT 2A MARS ST. SIKAT ARAW', 0, 1, 'R');
            $this->Cell(180, 5, 'NAGPAYONG PINAGBUHATAN, PASIG CITY', 0, 1, 'R');
            $this->Ln(1);
            $this->Cell(180, 5, 'Invoice #: ' . $data['invoice_id'], 0, 1, 'R');
    
            $this->setCellPaddings(1, 1, 1, 1);
            $this->setCellMargins(1, 1, 1, 1);
    
            $this->Ln(4);
            $this->SetFillColor(0, 0, 205);
            $this->Rect(0, 45, 240, 25, 'F', 0);
            $this->Ln(5);
            $this->setFont('helvetica', 'B', 25);
            $this->SetTextColor(255, 255, 255); 
            $this->Cell(0, 0, 'BILLING STATEMENT', 0, 1, 'C', true, '', 4);

            $this->Ln(10);
            $this->setFont('helvetica', '', 11);
            $this->SetTextColor(0, 0, 0);; 
            $this->SetFillColor(255, 255, 255);

            $html = '
            <table style="width:100%; margin-bottom=0;">
                <tr>
                    <th style="letter-spacing: 4px; width:49%;"><strong>ACCOUNT ID </strong>: '. $data['account_id'] .'<br><strong>GSTECH ID </strong> &nbsp;: <span style="letter-spacing: 1px;">' . $customer['gstech_id'] . '</span>
                    </th>
                    <th align="left" style="letter-spacing: 4px; width:51%;"><strong>BILLING PERIOD : </strong><br><span style="font-size: 12px; letter-spacing: 1px;">' . strtoupper($bill_start->format('F j, Y')) . ' TO ' . strtoupper($bill_end->format('F j, Y')) . '</span></th>
                </tr>
                <tr>
                    <td colspan="2" style="letter-spacing: 3px; font-size: 20px;"><strong>Your Monthly Statement</strong></td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:75%; border-top: 1px solid black; border-bottom: 1px solid black; vertical-align: middle; height: 40px;"><br><br><strong>&nbsp;&nbsp;Account Summary</strong></td>
                    <td style="letter-spacing: 2px; width:25%; border-top: 1px solid black; border-bottom: 1px solid black; vertical-align: middle; height: 40px;"><br><br><strong>Amount</strong></td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:75%; height: 40px;"><br><br>&nbsp;&nbsp;Balance from Last Bill</td>
                    <td style="letter-spacing: 2px; width:25%; height: 40px;"><br><br>P ' . $data['balance'] . '</td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:75%; height: 40px;"><br><br>&nbsp;&nbsp;Subscription Charge</td>
                    <td style="letter-spacing: 2px; width:25%; height: 40px;"><br><br>P ' . $data['subscription_amount'] . '</td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:75%; height: 40px;"><br><br>&nbsp;&nbsp;Installation Charge</td>
                    <td style="letter-spacing: 2px; width:25%; height: 40px;"><br><br>P ' . $data['installation_charge'] . '</td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:75%; height: 40px;"><br><br>&nbsp;&nbsp;Prorate Discount</td>
                    <td style="letter-spacing: 2px; width:25%; height: 40px;"><br><br>(P ' . $data['prorated_charge'] . ')</td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:75%; height: 40px;"><br><br>&nbsp;&nbsp;Secured Cash<br><br></td>
                    <td style="letter-spacing: 2px; width:25%; height: 40px;"><br><br>(P ' . $data['secured_cash'] . ')<br><br></td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:45%; height: 40px; border-top: 1px solid black;"><br><br></td>
                    <td style="letter-spacing: 2px; width:30%; height: 40px; border-top: 1px solid black;"><br><br><strong>Total Amount Due:</strong></td>
                    <td style="letter-spacing: 2px; width:25%; height: 40px; border-top: 1px solid black; color: rgb(0, 0, 205);"><br><br><strong>P ' . $data['total_bill'] . '</strong></td>
                </tr>
                <tr>
                    <td style="letter-spacing: 2px; width:45%; height: 40px;"><br><br></td>
                    <td style="letter-spacing: 2px; width:30%; height: 40px; text-align: right;"><strong>Due Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></td>
                    <td style="letter-spacing: 2px; width:25%; height: 40px;">' . $bill_end->format('m/d/y') . '</td>
                </tr>
            </table>
            ';
            $this->writeHTML($html, true, false, true, false, '');
            $this->SetFillColor(255, 255, 255);
            $lineStyle = array('L' => 0,
                'T' => array('width' => 0.75, 'cap' => 'butt', 'join' => 'miter', 'dash' => '0', 'phase' => 10, 'color' => array(0, 0, 0)),
                'R' => 0,
                'B' => array('width' => 0.75, 'cap' => 'square', 'join' => 'miter', 'dash' => '0'));
            $this->Rect(0, 218, 240, 20, 'D', $lineStyle);
            $this->setFont('helvetica', 'B', 12);
            $this->Text(5, 220, 'IMPORTANT REMINDER: ');
            $this->setFont('helvetica', '', 11);
            $this->Text(5, 228, 'Please pay your Total Amount by ' . $bill_end->format('F j, Y') . ' to avoid service interruption.');

            $this->SetFillColor(214, 238, 248);
            $this->Rect(0, 243, 110, 23, 'F');
            $this->setFont('helvetica', 'I', 12);
            $this->Text(5, 244, 'To access your Electronic Statement for the last 12');
            $this->Text(5, 250, "months, click the 'View Billing Statement' on your");
            $this->Text(5, 256, "GSTech customer account.");

            $this->setFont('helvetica', 'B', 13);
            $this->Text(113, 242, 'Modes of Payment:');
            $this->setFont('helvetica', 'B', 12);
            $this->Text(113, 250, '• GCash:');
            $this->Text(113, 258, '• Home Visit');
            $this->setFont('helvetica', '', 11);
            $this->Text(131, 250, '09652377042');

            $this->Image($gstechqr, 165, 242, 33, '', 'JPG', '', 'T', false, 300, '', false, false);

            $this->SetFillColor(0, 0, 205);
            $this->Rect(0, 275, 242, 23, 'F');
            $this->setFont('helvetica', '', 11);
            $this->setTextColor(255, 255, 255);
            $this->Text(5, 277, 'For any concerns,');
            $this->Text(5, 282, 'connect with us via:');
            $this->Image($fblogo, 50, 280, 12, '', 'PNG', '', 'T', false, 300, '', false, false);
            $this->Text(62, 282, '@GSTechPasig');
            $this->Image($phonelogo, 100, 280, 12, '', 'PNG', '', 'T', false, 300, '', false, false);
            $this->Text(112, 282, '09652377042');
            $this->Image($maillogo, 151, 283, 8, '', 'PNG', '', 'T', false, 300, '', false, false);
            $this->Text(162, 282, 'romeltesta@gmail.com');

            $this->Output($_SERVER['DOCUMENT_ROOT'] . '\billing-management-system\app\temp\test.pdf', 'F');
            // $invoice = $this->Output($_SERVER['DOCUMENT_ROOT'] . 'test.pdf', 'F');
            $this->sendEmail($customer, $data, $bill_date);

        }

        public function sendEmail ($customer, $data, $bill_date) {
            $ch = require 'curl.init.php';
            $url = DIR_API . "logs/get_mail_auth.php?id=1";
            curl_setopt($ch, CURLOPT_URL, $url);
            $resp = curl_exec($ch);
            $mail_data = json_decode($resp, true);
            curl_close($ch);

            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $mail_data['email'];
            $mail->Password = $mail_data['password'];
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;

            $mail->setFrom($mail_data['email']);

            $mail->addAddress($customer['email']);

            $bill_end = new DateTime($data['billing_period_end']);
            $bill_start = new DateTime($data['billing_period_start']);

            $filename = $bill_end->format('F Y') . '-Bill.pdf';
            $mail->addAttachment($_SERVER['DOCUMENT_ROOT'] . '\billing-management-system\app\temp\test.pdf', $filename);
            $mail->AddEmbeddedImage('../images/gstech-logo.jpg', 'gstechlogo');
            $mail->isHTML(true);

            $mail->Subject = 'GSTech Bill for the month of ' . $bill_end->format('F') . ' for Account ID: ' . $data['account_id'];

            $mail->Body = '
            <p>Dear valued customer, </p>
            <br>
            <p>Your electronic billing statement for ' . $bill_end->format('F Y') . ' is now available.</p>
            <br>
            <p>Below is the summary of your monthly billing:</p>

            <div style="width: 500px; padding-left: 20px;">
                <table  style="width: 100%;">
                    <tr>
                        <td style="width: 40%;"><strong>GSTech ID:</strong></td>
                        <td style="width: 60%;">' . $customer['gstech_id'] . '</td>
                    </tr>
                    <tr>
                        <td style="width: 40%;"><strong>Statement Date:</strong></td>
                        <td style="width: 60%;">' . $bill_date->format('F j, Y') . '</td>
                    </tr>
                    <tr>
                        <td style="width: 40%;"><strong>Account Name:</strong></td>
                        <td style="width: 60%;">' . $customer['first_name'] . ' ' . $customer['last_name'] . '</td>
                    </tr>
                    <tr>
                        <td style="width: 40%;"><strong>Balance from Last Bill:</strong></td>
                        <td style="width: 60%;">PHP ' . $data['balance'] . '</td>
                    </tr>
                    <tr>
                        <td style="width: 40%;"><strong>Due Date:</strong></td>
                        <td style="width: 60%;">' . $bill_end->format('F j, Y') . '</td>
                    </tr>
                    <tr>
                        <td style="width: 40%;"><strong>Total Amount Due:</strong></td>
                        <td style="width: 60%;">PHP ' . $data['total_bill'] . '</td>
                    </tr>
                </table>
            </div>
            <br>
            <p><em>For any concerns, you may call us at 09652377042 or through our Facebook page @GSTechPasig.</em></p>
            <p>Thank you and we appreciate your patronage!</p>

            <p>From,
            </p>

            <img src="cid:gstechlogo" alt="GSTech Logo" style="width: 250px; height: 80px;">
            
            <p style="font-size: 10px;"><br> FreeInfoMsg <br>
                Please Do Not Reply.</p>
            ';

            $mail->send();
        }
    }

    $pdf = new PDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    $pdf->setCreator(PDF_CREATOR);
    $pdf->setAuthor('GSTechBMS');
    $pdf->setSubject('GSTech Billing Statement');
    // $pdf->setKeywords('TCPDF, PDF, example, test, guide');
    
    $pdf->setHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 001', PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
    $pdf->setFooterData(array(0,64,0), array(0,64,128));
    
    $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    
    $pdf->setDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    
    // set margins
    $pdf->setMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->setHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->setAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
    $pdf->setFontSubsetting(true);
    
    
    $pdf->AddPage();
    
    $pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));