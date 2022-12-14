<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Untagged Payment Records</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Invoice</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Payment Records Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <table class="table table-borderless" id="payments-table">
          <thead>
            <tr>
              <th scope="col">Payment Ref. ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody id="payments-data">
          </tbody>
        </table>
      </div>
    </div>
  </div><!-- End Payment Records Table -->

<!-- Payment Record Modal -->
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
                    <input type="text" class="form-control" id="payment_reference_id" placeholder="Reference ID" required>
                    <label for="payment_reference_id">Reference ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="number" class="form-control" id="amount_paid" placeholder="Amount Paid" required>
                    <label for="amount_paid">Amount Paid</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="date" class="form-control" id="payment_date" placeholder="Payment Date" required>
                    <label for="payment_date">Payment Date</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input list="accounts-list" type="number" class="form-control" id="account_id" placeholder="Account ID" required>
                    <label for="account_id">Account ID</label>

                    <datalist id="accounts-list"></datalist>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="col-sm-5">
                    <input type="text" class="form-control text-center " id="tagged" value="" disabled>
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
</form> <!-- End Payment Record Modal -->

<!-- Delete Delete Payment Record Modal -->
<form id="delete-data">
  <div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body row g-3">
            
            <div class="col-md-12">
              <div class="form-floating">
                <input type="text" class="form-control" id="payment_reference_id_d" placeholder="Reference ID" readonly>
                <label for="payment_reference_id_d">Reference ID</label>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-floating">
                <input type="number" class="form-control" id="amount_paid_d" placeholder="Amount Paid" readonly>
                <label for="amount_paid_d">Amount Paid</label>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-floating">
                <input type="date" class="form-control" id="payment_date_d" placeholder="Payment Date" readonly>
                <label for="payment_date_d">Payment Date</label>
              </div>
            </div>

            <div class="col-md-12">
              <div class="col-sm-5">
                <input type="text" class="form-control text-center " id="tagged_d" value="" disabled>
              </div>
            </div>

        </div>
        <!-- End Modal Body -->
      
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cncl-btn">Cancel</button>
          <button type="submit" class="btn btn-danger" id="dlt-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</form><!-- End Delete Payment Record Modal -->

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