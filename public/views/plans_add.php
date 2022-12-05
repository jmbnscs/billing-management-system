<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

  <div class="pagetitle">
    <h1>Add New Plan</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Plans</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section plans-add">
    <div class="row">
      <div class="col-mb-8">

        <div class="card p-3">
          <div class="card-body pt-4">
              
          <form id="add-plan" class="row g-3" novalidate>
            <div class="row mb-3 position-relative">
                <label for="plan_name" class="col-sm-2 col-form-label required">Plan Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="plan_name" required>
                    <div class="invalid-feedback">
                        Please enter a valid plan name.
                    </div>
                </div>
            </div>

            <div class="row mb-3 position-relative">
                <label for="bandwidth" class="col-sm-2 col-form-label required">Bandwidth</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="bandwidth" min="5" required>
                    <div class="invalid-feedback">
                        Please enter bandwidth.
                    </div>
                </div>
            </div>

            <div class="row mb-3 position-relative">
                <label for="price" class="col-sm-2 col-form-label required">Price</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="price" min="1" required>
                    <div class="invalid-feedback">
                        Please enter plan price.
                    </div>
                </div>
            </div>

            <div class="row mb-3 position-relative">
                <label for="inclusion" class="col-sm-2 col-form-label">Inclusion(s)</label>
                <div class="col-sm-10">
                
                    <select class="form-control selectpicker" id="inclusion" multiple aria-label="size 5 select example" data-actions-box="true">
                      <option value="" disabled>Choose Inclusions</option>
                    </select>
                  
                </div>
            </div>

            <div class ="text-center">
              <button type="submit" class="btn btn-success">Submit Plan</button>
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

  <!--Dinagdag ko (KL i2)-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css" integrity="sha512-mR/b5Y7FRsKqrYZou7uysnOdCIJib/7r5QeJMFvLNHNhtye3xJp1TdJVPLtetkukFn227nKpXD9OjUc09lx97Q==" crossorigin="anonymous"
  referrerpolicy="no-referrer" />
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/js/bootstrap-select.min.js" integrity="sha512-FHZVRMUW9FsXobt+ONiix6Z0tIkxvQfxtCSirkKc5Sb4TKHmqq1dZa8DphF0XqKb3ldLu/wgMa8mT6uXiLlRlw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/plans.js"></script>

</body>
</html>