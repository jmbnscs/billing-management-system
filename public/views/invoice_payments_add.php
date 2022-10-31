<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

  <div class="pagetitle">
    <h1>Add Payment Record</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.html">Home</a></li>
        <li class="breadcrumb-item active">Invoice</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section payments-add">
    <div class="row">
      <div class="col-mb-8">

        <div class="card">
          <div class="card-body pt-4">
              
          <form id="add-payment">
                  <div class="row mb-3">
                      <label for="payment_ref" class="col-sm-2 col-form-label">Payment Ref. ID</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="payment_ref" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="amount_paid" class="col-sm-2 col-form-label">Amount Paid</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="amount_paid" required>
                      </div>
                  </div>

                <div class ="text-center">
                  <button type="submit" class="btn btn-primary">Create Record</button>
                </div>


              </form>

          </div>
        </div>

      </div>
    </div>
  </section>

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