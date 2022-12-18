<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Import Existing Account</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
      <li class="breadcrumb-item active">Customers</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<section class="section customers-add">
  <div class="row">
    <div class="col-mb-8">
        <!-- <div class="col-md-12 head">
            <div class="float-right">
                <a href="javascript:void(0);" class="btn btn-success" onclick="formToggle('importFrm');"><i class="plus"></i> Import</a>
            </div>
        </div> -->
        <!-- CSV file upload form -->

        <div class="card">
            <div class="card-header">
                <h5>Import Customer Data</h5>
            </div>

            <div class="card-body">
                <div class="col-md-8 mt-3">
                    <form method="post" enctype="multipart/form-data" id="upload-customer" class="form-inline">
                        <div class="form-group">
                            <input type="file" name="file" class="form-control form-control-m" required>
                        </div>
                        <div class="form-group col-md-4 mt-4">
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
                <div class="col-md-8 mt-3">
                    <a href="https://bms.gstechbms.online/bms/app/temp/uploaderror.csv" download><button class="btn btn-danger">Download</button></a>
                </div>
            </div>
        </div>

        <!-- 
        <div class="card">
            <div class="card-header">
                <h5>Export Customer Data</h5>
            </div>

            <div class="card-body">
                <div class="col-md-8 mt-3">
                    <a href="../../app/includes/customer_export.php" download><button class="btn btn-primary">Download</button></a>
                </div>
            </div>
        </div> -->
        
        <div class="card">
            <div class="card-header">
                <h5>Export All Customer Data</h5>
            </div>

            <div class="card-body">
                <div class="col-md-8 mt-3">
                    <form method="post" id="export-customer" class="form-inline">
                        <div class="form-group col-md-4 mt-4">
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
                <div class="col-md-8 mt-3">
                    <form method="post" id="download-template" class="form-inline">
                        <div class="form-group col-md-4 mt-4">
                            <input type="submit" class="btn btn-primary form-control " name="downloadTemplate" value="Download">
                        </div>
                    </form>
                    <!-- <a href="https://bms.gstechbms.online/bms/app/temp/template.csv" download><button class="btn btn-primary">Download</button></a> -->
                </div>
            </div>
        </div>

    </div>
  </div>
</section>

</main><!-- End #main -->

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