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
        <ul class="nav nav-tabs d-flex" role="tablist">
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100 active" id="active-tab" data-bs-toggle="tab" data-bs-target="#active-customers" type="button" role="tab" aria-controls="active" aria-selected="true">Active</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="inactive-tab" data-bs-toggle="tab" data-bs-target="#inactive-customers" type="button" role="tab" aria-controls="inactive" aria-selected="false">Inactive</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="disconnected-tab" data-bs-toggle="tab" data-bs-target="#disconnected-customers" type="button" role="tab" aria-controls="disconnected" aria-selected="false">Disconnected</button>
          </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content pt-2">

          <!-- Active Customers Tab -->
          <div class="tab-pane fade show active" id="active-customers" role="tabpanel" aria-labelledby="active-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="active-area-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
                <option value="">Show All: Area</option>
              </select>
            </div>

            <div>
              <select id="active-plan-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
                <option value="">Show All: Plan</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="active-customers-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Area</th>
                  <th scope="col">Balance</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

          </div><!-- End Active Customers Tab -->

          <!-- Inactive Customers Tab -->
          <div class="tab-pane fade" id="inactive-customers" role="tabpanel" aria-labelledby="inactive-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="inactive-area-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
                <option value="">Show All: Area</option>
              </select>
            </div>

            <div>
              <select id="inactive-plan-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
                <option value="">Show All: Plan</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="inactive-customers-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Area</th>
                  <th scope="col">Balance</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

          </div><!-- End Inactive Customers Tab -->

          <!-- Disconnected Customers Tab -->
          <div class="tab-pane fade" id="disconnected-customers" role="tabpanel" aria-labelledby="disconnected-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="disconnected-area-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
                <option value="">Show All: Area</option>
              </select>
            </div>

            <div>
              <select id="disconnected-plan-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 20px;">
                <option value="">Show All: Plan</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="disconnected-customers-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Area</th>
                  <th scope="col">Balance</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

          </div><!-- End Disconnected Customers Tab -->


        </div><!-- End Tab Content -->

      </div>

    </div>
  </div><!-- End Customer List Table -->

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
  <script src="../js/customers.js"></script>

</body>
</html>