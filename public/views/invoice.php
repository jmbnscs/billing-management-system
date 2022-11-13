<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>View Invoices</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Invoice</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Invoice Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <table class="table table-borderless" id="invoice-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Disconnection Date</th>
              <th scope="col">Total Bill</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody id="invoice-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Invoice Table -->

<!-- View Invoice Modal -->
<form id="update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog modal-fullscreen modal-dialog-centered modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
             <div class="container px-4">
              <div class="row mb-3">
                <!-- Left -->
                <div class="col-sm-8">

                  <div class="card mt-2">
                    <div class="card-header">Invoice Details</div>
                    <div class="card-body">
                      <div class="row pt-2">
                        <div class="col-md-8">
                          <label for="invoice_id" class="form-label">Invoice ID</label>
                          <input type="text" class="form-control" id="invoice_id" readonly>
                        </div>
                        <div class="col-md-4">
                          <label for="account_id" class="form-label">Account ID</label>
                          <input type="text" class="form-control" id="account_id" readonly>
                        </div>
                      </div>

                      <div class="row pt-4"> 
                        <div class="col-md-4">
                          <label for="billing_period_start" class="form-label">Billing Period Start</label>
                          <input type="date" class="form-control" id="billing_period_start" readonly>
                        </div>
                        <div class="col-md-4">
                          <label for="billing_period_end" class="form-label">Billing Period End</label>
                          <input type="date" class="form-control" id="billing_period_end" readonly>
                        </div>
                        <div class="col-md-4">
                          <label for="disconnection_date" class="form-label">Disconnection Date</label>
                          <input type="date" class="form-control" id="disconnection_date" readonly>
                        </div>
                      </div>

                      <div class="row pt-4"> 
                        <div class="col-md-6">
                          <label for="previous_bill" class="form-label">Previous Bill</label>
                          <input type="text" class="form-control" id="previous_bill" readonly>
                        </div>
                        <div class="col-md-6">
                          <label for="previous_payment" class="form-label">Previous Payment</label>
                          <input type="text" class="form-control" id="previous_payment" readonly>
                        </div>
                      </div>

                      <div class="row pt-4"> 
                        <div class="col-md-6">
                          <label for="balance" class="form-label">Balance</label>
                          <input type="text" class="form-control" id="balance" readonly>
                        </div>
                        <div class="col-md-6">
                          <label for="secured_cash" class="form-label">Secured Cash</label>
                          <input type="text" class="form-control" id="secured_cash" readonly>
                        </div>
                      </div>

                      <div class="row pt-4"> 
                        <div class="col-md-4">
                          <label for="subscription_amount" class="form-label">Subscription Amount</label>
                          <input type="text" class="form-control" id="subscription_amount" readonly>
                        </div>
                        <div class="col-md-4">
                          <label for="prorated_charge" class="form-label">Prorated Charge</label>
                          <input type="text" class="form-control" id="prorated_charge" readonly>
                        </div>
                        <div class="col-md-4">
                          <label for="installation_charge" class="form-label">Installation Charge</label>
                          <input type="text" class="form-control" id="installation_charge" readonly>
                        </div>
                      </div>

                      <div class="row pt-4">
                        <div class="col-md-8">
                          <label for="total_bill" class="form-label">Total Bill</label>
                          <input type="text" class="form-control" id="total_bill" readonly>
                        </div>
                        <div class="col-md-4">
                          <label for="invoice_status_id" class="form-label">Invoice Status</label>
                          <input type="text" class="form-control text-center " id="invoice_status_id" readonly>
                        </div>
                      </div> 
                    </div>
                  </div>

                </div> <!-- End Left -->

                <!-- Right -->
                <div class="col-sm-4">
                  <div class="row pt-4">
                    <h5 class="text-center">Payment Details</h5>
                    <div class="col-md-12 pt-4">
                      <label for="payment_reference_id" class="form-label">Payment Reference ID</label>
                      <input type="text" class="form-control" id="payment_reference_id" required>
                    </div>

                    <div class="col-md-12 pt-4">
                      <label for="amount_paid" class="form-label">Amount Paid</label>
                      <input type="text" class="form-control" id="amount_paid" required>
                    </div>

                    <div class="col-md-12 pt-4">
                      <label for="payment_date" class="form-label">Payment Date</label>
                      <input type="date" class="form-control" id="payment_date" required>
                    </div> 

                    <div class="mt-5 d-grid gap-2 col-8 mx-auto">
                      <button type="button" class="btn btn-outline-success" id="edit-btn">Add Payment Info</button>
                    </div>

                    <div class="mt-5 d-grid gap-2 col-8 mx-auto">
                      <button type="submit" class="btn btn-outline-primary" id="save-btn" disabled>Save Changes</button>
                    </div>

                    <div class="mt-5 d-grid gap-2 col-8 mx-auto">
                      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" id="cls-btn">Close</button>
                    </div>

                  </div>
                </div>
              </div>
             </div>
          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="edit-btn">Edit</button>
            <button type="submit" class="btn btn-success" id="save-btn" disabled>Save Changes</button>
          </div> -->
        </div>
      </div>
  </div>
</form> <!-- End View Invoice Modal -->

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