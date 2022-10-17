<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Add New Plan</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard.html">Home</a></li>
      <li class="breadcrumb-item">Plans</li>
      <li class="breadcrumb-item active">Add New Plan</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<section class="section admin">
  <div class="row">
    <div class="col-mb-4">

      <div class="card">
        <div class="card-body admin-card pt-4 d-flex flex-column align-items-center">

          <!-- <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"> -->
          <h2>Add New Plan</h2>
          <h3></h3>
        </div>
      </div>

    </div>

    <div class="col-mb-8">

      <div class="card">
        <div class="card-body pt-4">
            
        <form>
                <div class="row mb-3">
                    <label for="plan_name" class="col-sm-2 col-form-label">Plan Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="plan_name" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="bandwidth" class="col-sm-2 col-form-label">Bandwidth</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="bandwidth" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="price" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="price" required>
                    </div>
                </div>

                <div class="custom-control custom-checkbox">
                <label for="inclusion" class="col-sm-2 col-form-label">Inclusion(s)</label>
                    <input type="checkbox" class="custom-control-input" id="inclusion" >
                    <label class="custom-control-label" for="customCheck">Netflix</label>

                    <input type="checkbox" class="custom-control-input" id="inclusion" >
                    <label class="custom-control-label" for="customCheck">Fiber Switch</label>
                    
                </div>

                <div class ="d-grid gap-2 col-6 mx-auto admin_submit_btn">
                    <button type="submit" class="btn btn-outline-primary">Save Account</button>
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
  <script src="../js/plans.js"></script>

</body>
</html>