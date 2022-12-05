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

  <!-- Plans Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <!-- Filter Dropdown -->
        <div>
          <select id="inclusions-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Select All: Inclusion</option>
            <option value="None">None</option>
          </select>
        </div>

        <div>
          <select id="status-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Select All: Status</option>
          </select>
        </div>
        <!-- End Filter Dropdown -->

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
  </div><!-- End Plans Table -->

<!-- Update Plan Modal -->
<form id="save-plan">
    <div class="modal fade" id="view-plans" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="plan_id" placeholder="Plan ID" readonly>
                    <label for="plan_id">Plan ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="plan_name" placeholder="Plan Name" required>
                    <label for="plan_name">Plan Name</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="bandwidth" placeholder="Bandwidth" required>
                    <label for="bandwidth">Bandwidth</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="price" placeholder="Price" required>
                    <label for="price">Price</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <select id="plan_status_id" class="form-select" required></select>
                    <label for="plan_status_id">Status</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <select class="form-control selectpicker" id="inclusion" multiple aria-label="size 5 select example" data-actions-box="true"></select>
                    <label for="inclusion">Inclusion(s)</label>
                  </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="edit-plan">Edit</button>
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