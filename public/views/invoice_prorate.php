<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Prorate Charges</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Invoice</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Prorate Records Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <table class="table table-borderless" id="prorate-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Account ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Duration</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="prorate-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Prorate Records Table -->

<!-- Prorate Records Modal -->
<form id="update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <div class="row mb-3">
                <label for="prorate_id" class="col-sm-2 col-form-label">Prorate ID</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="prorate_id" readonly>
                </div>
            </div>

            <div class="row mb-3">
              <label for="account_id" class="col-sm-2 col-form-label">Account ID</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="account_id" value="" required>
              </div>
            </div>

            <div class="row mb-3">
              <label for="customer_name" class="col-sm-2 col-form-label">Customer Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="customer_name" value="" required readonly>
              </div>
            </div>

            <div class="row mb-3">
              <label for="duration" class="col-sm-2 col-form-label">Duration</label>
              <div class="col-sm-10">
                <input type="datetime" class="form-control" id="duration" placeholder="HH:MM:SS">
              </div>
            </div>

            <div class="row mb-3">
              <label for="prorate_charge" class="col-sm-2 col-form-label">Amount</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="prorate_charge" value="" required readonly>
              </div>
            </div>

            <div class="row mb-3">
              <label for="status" class="col-sm-2 col-form-label">Status</label>
              <div class="col-sm-3">
                <input type="text" class="form-control text-center " id="status" value="" required>
              </div>
            </div>

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="edit-btn">Edit</button>
            <button type="submit" class="btn btn-success" id="save-btn" disabled>Save Changes</button>
          </div>
        </div>
      </div>
  </div>
</form> <!-- End Prorate Records Modal -->

<!-- Delete Delete Prorate Records Modal -->
<form id="delete-data">
  <div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
                <label for="prorate_id_d" class="col-sm-3 col-form-label">Prorate ID</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="prorate_id_d" readonly>
                </div>
            </div>

            <div class="row mb-3">
              <label for="account_id_d" class="col-sm-3 col-form-label">Account ID</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="account_id_d" value="" required>
              </div>
            </div>

            <div class="row mb-3">
              <label for="customer_name_d" class="col-sm-3 col-form-label">Customer Name</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="customer_name_d" value="" required>
              </div>
            </div>

            <div class="row mb-3">
              <label for="duration_d" class="col-sm-3 col-form-label">Duration</label>
              <div class="col-sm-8">
                <input type="datetime" class="form-control" id="duration_d" placeholder="HH:MM:SS">
              </div>
            </div>

            <div class="row mb-3">
              <label for="prorate_charge_d" class="col-sm-3 col-form-label">Amount</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="prorate_charge_d" value="" required>
              </div>
            </div>

            <div class="row mb-3">
              <label for="status_d" class="col-sm-3 col-form-label">Status</label>
              <div class="col-sm-4">
                <input type="text" class="form-control text-center " id="status_d" value="" required>
              </div>
            </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cls-btn">Close</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cncl-btn">Cancel</button>
          <button type="submit" class="btn btn-danger" id="dlt-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</form><!-- End Delete Prorate Records Modal -->

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