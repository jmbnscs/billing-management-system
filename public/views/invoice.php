<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>View Invoices</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Invoice</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Invoice Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">

        <!-- Filter Dropdown -->
        <div>
          <select id="invoice-status-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Show All: Status</option>
          </select>
        </div>

        <div>
          <select id="invoice-customer-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Show All: Customer</option>
          </select>
        </div>
        <!-- End Filter Dropdown -->

        <table class="table table-borderless" id="invoice-table">
          <thead>
            <tr>
              <th scope="col">Invoice ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Disconnection Date</th>
              <th scope="col">Running Balance</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody id="invoice-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Invoice Table -->

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

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/invoice.js"></script>

</body>
</html>