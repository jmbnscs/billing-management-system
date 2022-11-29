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
              <th scope="col">Invoice ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Disconnection Date</th>
              <th scope="col">Running Balance</th>
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
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
                <div class="col-sm-12">

                      <div class="row pt-2">
                          <div class="col-md-8 pt-2">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="invoice_id" placeholder="Invoice ID" readonly>
                              <label for="invoice_id">Invoice ID</label>
                            </div>
                          </div>

                          <div class="col-md-4 pt-2">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="account_id" placeholder="Account ID" readonly>
                              <label for="account_id">Account ID</label>
                            </div>
                          </div>
                      </div>

                      <div class="row pt-4"> 
                          <div class="col-md-4">
                            <div class="form-floating">
                              <input type="date" class="form-control" id="billing_period_start" placeholder="Billing Period Start" readonly>
                              <label for="billing_period_start">Billing Period Start</label>
                            </div>
                          </div>

                          <div class="col-md-4">
                            <div class="form-floating">
                              <input type="date" class="form-control" id="billing_period_end" placeholder="Billing Period End" readonly>
                              <label for="billing_period_end">Billing Period End</label>
                            </div>
                          </div>

                          <div class="col-md-4">
                            <div class="form-floating">
                              <input type="date" class="form-control" id="disconnection_date" placeholder="Disconnection Date" readonly>
                              <label for="disconnection_date">Disconnection Date</label>
                            </div>
                          </div>
                      </div>

                      <div class="row pt-4"> 
                          <div class="col-md-3">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="previous_bill" placeholder="Previous Bill" readonly>
                              <label for="previous_bill">Previous Bill</label>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="previous_payment" placeholder="Previous Payment" readonly>
                              <label for="previous_payment">Previous Payment</label>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="balance" placeholder="Balance" readonly>
                              <label for="balance">Balance</label>
                            </div>
                          </div>

                          <div class="col-md-3">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="secured_cash" placeholder="Secured Cash" readonly>
                              <label for="secured_cash">Secured Cash</label>
                            </div>
                          </div>
                      </div>

                      <div class="row pt-4"> 

                          <div class="col-md-4">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="subscription_amount" placeholder="Subscription Amount" readonly>
                              <label for="subscription_amount">Subscription Amount</label>
                            </div>
                          </div>

                          <div class="col-md-4">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="prorated_charge" placeholder="Prorated Charge" readonly>
                              <label for="prorated_charge">Prorated Charge</label>
                            </div>
                          </div>

                          <div class="col-md-4">
                            <div class="form-floating">
                              <input type="text" class="form-control" id="installation_charge" placeholder="Installation Charge" readonly>
                              <label for="installation_charge">Installation Charge</label>
                            </div>
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
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-payment-md" id="edit-btn">Add Payment</button>
          </div>
        </div>
      </div>
  </div> <!-- End View Invoice Modal -->

<!-- Add Payment Modal -->
<form id="update-data">
  <div class="modal fade" id="add-payment-md" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Add Payment Record?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="payment_reference_id" placeholder="Payment Reference ID" required>
                      <label for="payment_reference_id">Payment Reference ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="number" min="1" class="form-control" id="amount_paid" placeholder="Amount Paid" required>
                      <label for="amount_paid">Amount Paid</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="date" class="form-control" id="payment_date" placeholder="Payment Date" required>
                      <label for="payment_date">Payment Date</label>
                    </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success">Add</button>
          </div>
        </div>
      </div>
  </div>
</form>

<!-- Right -->
<!-- <div class="col-sm-4">
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
                      <button type="submit" class="btn btn-outline-primary" id="save-btn" hidden>Save Changes</button>
                    </div>

                    <div class="mt-5 d-grid gap-2 col-8 mx-auto">
                      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" id="cls-btn">Close</button>
                    </div>

                  </div>
                </div> -->

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