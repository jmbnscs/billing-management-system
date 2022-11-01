<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Customer List</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Customers</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Recent Sales -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">

      <div class="card-body">
        <table class="table table-borderless" id="customer-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Plan</th>
              <th scope="col">Balance</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody id="customer-data">
            <tr hidden>
              <th scope="row"><a href="#">#2457</a></th>
              <td>Brandon Jacob</td>
              <td><a href="#" class="text-primary">At praesentium minu</a></td>
              <td>$64</td>
              <td><span class="badge bg-success">Approved</span></td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Recent Sales -->
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