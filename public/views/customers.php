<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Customer List</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
        <li class="breadcrumb-item active">Customers</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Customer List Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <!-- Filter Dropdown -->
        <div>
          <select id="customer-status-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
            <option value="">Show All: Status</option>
          </select>
        </div>

        <div>
          <select id="area-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
            <option value="">Show All: Area</option>
          </select>
        </div>

        <div>
          <select id="plan-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
            <option value="">Show All: Plan</option>
          </select>
        </div>
        <!-- End Filter Dropdown -->
        <table class="table table-borderless" id="customer-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Plan</th>
              <th scope="col">Area</th>
              <th scope="col">Balance</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody id="customer-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Customer List Table -->

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
  <script src="../js/customers.js"></script>

</body>
</html>