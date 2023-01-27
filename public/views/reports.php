<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="row pagetitle">
    <div class="col-md-9">
      <h1>View Reports</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Reports</li>
        </ol>
      </nav>
    </div>
  </div>

  <form id="generate-report">
    <div class="card p-3">
      <div class="card-body">
        <!-- <h5 class="card-title">Default Card</h5> -->
        <div class="row">
          <div class="col-md-4">
            <label for="report_type" class="form-label">Report</label>
            <select class="form-select" aria-label="Report Type" id="report_type" required>
              <option selected disabled value="">Please select report:</option>
              <option value="1">Sales Report</option>
              <option value="2">Installation Report</option>
              <option value="3">Prorates Report</option>
              <option value="4">Customer Report</option>
              <option value="5">Invoice Report</option>
              <option value="6">Admin Logs Report</option>
              <option value="7">Income Summary Report</option>
            </select>
          </div>

          <div class="col-md-5"></div>

          <div class="col-md-3 p-3"><button type="submit" class="btn btn-success w-100">Generate Report</button></div>
        
        </div>

        <div class="row pt-3">
          <div class="col-md-4">
            <label for="date_from" class="form-label">From:</label>
            <input type="month" class="form-control" id="date_from" min="2021-09" required>
          </div>

          <div class="col-md-4">
            <label for="date_to" class="form-label">To:</label>
            <input type="month" class="form-control" id="date_to" required>
          </div>
        </div>

        <!-- Customer Reports Sub Filter -->
        <div class="row pt-3 hide" id="customer_filter">
          <div class="col-md-4">
            <label for="customer_status" class="form-label">Status</label>
            <select class="form-select" aria-label="Status" id="customer_status">
              <option disabled value="">Please select status:</option>
              <option selected value="0">All</option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
              <option value="3">Disconnected</option>
            </select>
          </div>

          <div class="col-md-4">
            <label for="customer_area" class="form-label">Area</label>
            <select class="form-select" aria-label="Area" id="customer_area">
              <option disabled value="">Please select area:</option>
              <option selected value="0">All</option>
            </select>
          </div> 
        </div>
        <!-- Customer Reports Sub Filter -->

        <!-- Invoice Reports Sub Filter -->
        <div class="row pt-3 hide" id="invoice_filter">
          <div class="col-md-4">
            <label for="invoice_status" class="form-label">Status</label>
            <select class="form-select" aria-label="Status" id="invoice_status">
              <option disabled value="">Please select status:</option>
              <option selected value="0">All</option>
              <option value="1">Paid</option>
              <option value="2">Unpaid</option>
              <option value="3">Overdue</option>
              <option value="4">For Disconnection</option>
            </select>
          </div>
        </div>
        <!-- Invoice Reports Sub Filter -->

        <!-- Sales Reports Display -->
        <div class="row pt-5 hide" id="sales-reports-container">
          <div class="col-md-8">
            <h5 id="sales-reports-title" style="border-bottom: 2px solid black;"></h5>
          </div>

          <table class="table table-striped" id="sales-reports-table">
            <thead id="sales-reports-column-header"></thead>
            <tbody id="sales-reports-body"></tbody>
            <tfoot id="sales-reports-column-footer"></tfoot>
          </table>
        </div>
        <!-- End Sales Reports Display -->

        <!-- Installation Reports Display -->
        <div class="row pt-5 hide" id="install-reports-container">
          <div class="col-md-8">
            <h5 id="install-reports-title" style="border-bottom: 2px solid black;"></h5>
          </div>

          <table class="table table-striped" id="install-reports-table">
            <thead id="install-reports-column-header"></thead>
            <tbody id="install-reports-body"></tbody>
            <tfoot id="install-reports-column-footer"></tfoot>
          </table>
        </div>
        <!-- End Installation Reports Display -->

        <!-- Prorate Reports Display -->
        <div class="row pt-5 hide" id="prorate-reports-container">
          <div class="col-md-8">
            <h5 id="prorate-reports-title" style="border-bottom: 2px solid black;"></h5>
          </div>

          <table class="table table-striped" id="prorate-reports-table">
            <thead id="prorate-reports-column-header"></thead>
            <tbody id="prorate-reports-body"></tbody>
            <tfoot id="prorate-reports-column-footer"></tfoot>
          </table>
        </div>
        <!-- End Prorate Reports Display -->

        <!-- Customer Reports Display -->
        <div class="row pt-5 hide" id="customer-reports-container">
          <div class="col-md-8">
            <h5 id="customer-reports-title" style="border-bottom: 2px solid black;"></h5>
          </div>

          <table class="table table-striped" id="customer-reports-table">
            <thead id="customer-reports-column-header"></thead>
            <tbody id="customer-reports-body"></tbody>
            <tfoot id="customer-reports-column-footer"></tfoot>
          </table>
        </div>
        <!-- End Customer Reports Display -->

        <!-- Invoice Reports Display -->
        <div class="row pt-5 hide" id="invoice-reports-container">
          <div class="col-md-8">
            <h5 id="invoice-reports-title" style="border-bottom: 2px solid black;"></h5>
          </div>

          <table class="table table-striped" id="invoice-reports-table">
            <thead id="invoice-reports-column-header"></thead>
            <tbody id="invoice-reports-body"></tbody>
            <tfoot id="invoice-reports-column-footer"></tfoot>
          </table>
        </div>
        <!-- End Invoice Reports Display -->

        <!-- Admin Logs Reports Display -->
        <div class="row pt-5 hide" id="logs-reports-container">
          <div class="col-md-8">
            <h5 id="logs-reports-title" style="border-bottom: 2px solid black;"></h5>
          </div>

          <table class="table table-striped" id="logs-reports-table">
            <thead id="logs-reports-column-header"></thead>
            <tbody id="logs-reports-body"></tbody>
            <tfoot id="logs-reports-column-footer"></tfoot>
          </table>
        </div>
        <!-- End Admin Logs Reports Display -->

        <!-- Income Summary Reports Display -->
        <div class="row pt-5 hide" id="income-reports-container">
          <div class="col-md-8">
            <h5 id="income-reports-title" style="border-bottom: 2px solid black;">Income Report Summary</h5>
          </div>

          <table class="table table-borderless" id="income-reports-table">
            <thead id="income-reports-column-header"></thead>
            <tbody id="income-reports-body"></tbody>
            <tfoot id="income-reports-column-footer"></tfoot>
          </table>
        </div>
        <!-- End Income Summary Reports Display -->
        
      </div>
    </div>
  </form>
  

</main><!-- End #main -->

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

  <!-- DataTable -->
  <link rel="stylesheet" type="text/css"  href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
  <link rel="stylesheet" type="text/css"  href="https://cdn.datatables.net/buttons/1.4.0/css/buttons.dataTables.min.css" />

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/pdfmake.min.js"></script>
  <script src="https://cdn.rawgit.com/bpampuch/pdfmake/0.1.27/build/vfs_fonts.js"></script>
  <script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.4.0/js/dataTables.buttons.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.4.0/js/buttons.flash.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.4.0/js/buttons.html5.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.4.0/js/buttons.print.min.js"></script>
  <!-- <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script> 
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script> -->

  <!-- Datepicker -->
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/reports.js"></script>

</body>
</html>