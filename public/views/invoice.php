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
        <ul class="nav nav-tabs d-flex" role="tablist">
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100 active" id="unpaid-tab" data-bs-toggle="tab" data-bs-target="#unpaid-invoice" type="button" role="tab" aria-controls="unpaid" aria-selected="true">Due</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="overdue-tab" data-bs-toggle="tab" data-bs-target="#overdue-invoice" type="button" role="tab" aria-controls="overdue" aria-selected="false">Overdue</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="disconnection-tab" data-bs-toggle="tab" data-bs-target="#disconnection-invoice" type="button" role="tab" aria-controls="disconnection" aria-selected="false">Disconnection</button>
          </li>
        </ul>

        <div class="tab-content pt-2">

          <!-- Unpaid Invoice Tab -->
          <div class="tab-pane fade show active" id="unpaid-invoice" role="tabpanel" aria-labelledby="active-tab">
            
            <h5 class="card-title">Due Invoices</h5>
            
            <!-- Filter Dropdown -->
            <div>
              <select id="unpaid-customer-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Customer</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="unpaid-invoice-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Invoice ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Disconnection Date</th>
                  <th scope="col">Running Balance</th>
                  <th scope="col">Status</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- End Unpaid Invoice Tab -->

          <!-- Overdue Invoice Tab -->
          <div class="tab-pane fade" id="overdue-invoice" role="tabpanel" aria-labelledby="active-tab">

            <h5 class="card-title">Overdue Invoices</h5>

            <!-- Filter Dropdown -->
            <div>
              <select id="overdue-customer-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Customer</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="overdue-invoice-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Invoice ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Disconnection Date</th>
                  <th scope="col">Running Balance</th>
                  <th scope="col">Status</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- End Overdue Invoice Tab -->

          <!-- Disconnection Invoice Tab -->
          <div class="tab-pane fade" id="disconnection-invoice" role="tabpanel" aria-labelledby="active-tab">

            <h5 class="card-title">Invoices For Disconnection</h5>
            
            <!-- Filter Dropdown -->
            <div>
              <select id="disconnection-customer-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Customer</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="disconnection-invoice-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Invoice ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Disconnection Date</th>
                  <th scope="col">Running Balance</th>
                  <th scope="col">Status</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- End Disconnection Invoice Tab -->

        </div>
      </div>

    </div>
  </div><!-- End Invoice Table -->

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

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/invoice.js"></script>

</body>
</html>