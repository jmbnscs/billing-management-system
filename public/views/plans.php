<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>View Plans</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Plans</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Recent Sales -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <table class="table table-borderless" id="plan-table">
          <thead>
            <tr>
              <th scope="col">Plan Name</th>
              <th scope="col">Bandwidth</th>
              <th scope="col">Price</th>
              <th scope="col">Inclusion</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody id="plan-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Recent Sales -->

  <form id="save-plan">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="modalDialogScrollable" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">

                  <div class="row mb-3">
                      <label for="plan_id" class="col-sm-2 col-form-label">Plan ID</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="plan_id" required>
                      </div>
                  </div>

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

                  <div class="row mb-3">
                      <label for="plan_status_id" class="col-sm-2 col-form-label">Status</label>
                      <div class="col-sm-10">
                          <select id="plan_status_id" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="inclusion" class="col-sm-2 col-form-label">Inclusion(s)</label>
                      <div class="col-sm-10">
                      
                          <select class="form-control selectpicker" id="inclusion" multiple aria-label="size 5 select example" data-actions-box="true">
                          </select>
                        
                      </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="edit-plan" disabled>Edit</button>
            <button type="submit" class="btn btn-success" id="save-plan-btn" disabled>Save Changes</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

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

  <!-- Copied from Kyla -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css" integrity="sha512-mR/b5Y7FRsKqrYZou7uysnOdCIJib/7r5QeJMFvLNHNhtye3xJp1TdJVPLtetkukFn227nKpXD9OjUc09lx97Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/js/bootstrap-select.min.js" integrity="sha512-FHZVRMUW9FsXobt+ONiix6Z0tIkxvQfxtCSirkKc5Sb4TKHmqq1dZa8DphF0XqKb3ldLu/wgMa8mT6uXiLlRlw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/plans.js"></script>

</body>
</html>