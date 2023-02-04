<?php 
  include '../models/header.html';
  include '../models/navbar.html'; 
?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Import Existing Account</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
      <li class="breadcrumb-item active">Customers</li>
    </ol>
  </nav>
</div>

<section class="section customers-add">
  <div class="row">
    <div class="col-lg-7">
        <div class="card">
            <div class="card-header">
                <h5>Import Customer Data <i class="bi bi-info-circle ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Accepts CSV files only."></i></h5>
            </div>

            <div class="card-body">
                <div class="col-md-12 mt-3">
                    <form action="" method="post" enctype="multipart/form-data" id="upload-customer" class="form-inline">
                        <div class="form-group">
                            <input type="file" name="file" accept=".csv" class="form-control" required>
                        </div>
                        <div class="form-group col-md-6 mt-4">
                            <input type="submit" class="btn btn-success form-control " name="importSubmit" value="Import Customer Data">
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="card hide" id="error-dl">
            <div class="card-header">
                <h5>Download Error Record</h5>
            </div>

            <div class="card-body">
                <div class="col-md-12 mt-3">
                    <form method="post" id="download-error" class="form-inline">
                        <div class="form-group col-md-6 mt-4">
                            <input type="submit" class="btn btn-danger form-control " name="downloadError" value="Download Error File">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>Export All Customer Data</h5>
            </div>

            <div class="card-body">
                <div class="col-md-12 mt-3">
                    <form method="post" id="export-customer" class="form-inline">
                        <div class="form-group col-md-6 mt-4">
                            <input type="submit" class="btn btn-info form-control " name="exportSubmit" value="Export Customer Data">
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h5>Download Template</h5>
            </div>

            <div class="card-body">
                <div class="col-md-12 mt-3">
                    <form method="post" id="download-template" class="form-inline">
                        <div class="col-md-6">
                            <input type="submit" class="btn btn-primary form-control " name="downloadTemplate" value="Download Template">
                        </div>
                    </form>

                    <form action="../../app/includes/download_guide.php" method="post" target="_blank">
                        <div class="col-md-6 pt-4">
                            <input type="submit" class="btn btn-info form-control " name="viewTemplateGuide" value="View Template Guide">
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>

    </div>
  </div>
</section>

</main>

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="../assets/vendor/apexcharts/apexcharts.min.js"></script>
  <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/vendor/chart.js/chart.min.js"></script>
  <script src="../assets/vendor/echarts/echarts.min.js"></script>
  <script src="../assets/vendor/quill/quill.min.js"></script>
  <script src="../assets/vendor/simple-datatables/simple-datatables.js"></script>
  <script src="../assets/vendor/tinymce/tinymce.min.js"></script>
  <script src="../assets/vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Datepicker -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/customers.js"></script>

</body>
</html>