<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Untagged Prorate Records</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
        <li class="breadcrumb-item active">Invoice</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Prorate Records Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">

        <!-- Filter Dropdown -->
        <div>
          <select id="prorate-customer-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Show All: Customer</option>
          </select>
        </div>
        <!-- End Filter Dropdown -->

        <table class="table table-borderless" id="prorate-table">
          <thead>
            <tr>
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
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="account_id" placeholder="Account ID" readonly>
                  <label for="account_id">Account ID</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="prorate_charge" placeholder="Amount" readonly>
                  <label for="prorate_charge">Amount</label>
                </div>
              </div>

              <div class="col-md-12 row pt-3">
                <label>Duration</label>
                <div class="form-floating col-sm-4">
                  <input type="number" class="form-control" id="duration_hours" placeholder="HH" value="" required>
                  <label for="duration_hours">Hours</label>
                </div>
                <div class="form-floating col-sm-4">
                  <input type="number" class="form-control" id="duration_minutes" placeholder="MM" value="" min="0" max="59" required>
                  <label for="duration_minutes">Minutes</label>
                </div>
                <div class="form-floating col-sm-4">
                  <input type="number" class="form-control" id="duration_seconds" placeholder="SS" value="" min="0" max="59" required>
                  <label for="duration_seconds">Seconds</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="col-sm-5">
                  <input type="text" class="form-control text-center " id="status" value="" disabled>
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

<!-- Delete Prorate Records Modal -->
<form id="delete-data">
  <div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body row g-3">
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="account_id_d" placeholder="Account ID" readonly>
                  <label for="account_id_d">Account ID</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="customer_name_d" placeholder="Customer Name" readonly>
                  <label for="customer_name_d">Customer Name</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="prorate_charge_d" placeholder="Amount" readonly>
                  <label for="prorate_charge_d">Amount</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="datetime" class="form-control" id="duration_d" placeholder="Duration" readonly>
                  <label for="duration_d">Duration</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="col-sm-5">
                  <input type="text" class="form-control text-center " id="status_d" value="" disabled>
                </div>
              </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cncl-btn">Cancel</button>
          <button type="submit" class="btn btn-danger" id="dlt-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</form><!-- End Delete Prorate Records Modal -->

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