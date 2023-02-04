<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <!-- Page Title -->
  <div class="row pagetitle">
    <div class="col-md-9">
      <h1>Unpaid Invoice Details</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Invoice</li>
        </ol>
      </nav>
    </div>

    <div class="col-md-3 justify-content-center">
      <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-payment-md" id="edit-btn">+ Add Payment</button>
    </div>
    
  </div><!-- End Page Title -->

  <!-- Invoice Data Tabs -->
  <section class="section invoice-data">
    <div class="row">
      <div class="col-xl-12">
        <div class="card" id="invoice-card">
          <div class="card-body pt-3 invoice-details" id="invoice-data">
            
            <div class="mt-3 row">
              <div class="col-sm-9">
                <h5 id="customer-name"></h5>
                <h6 id="invoice-id"></h6>
              </div>

            </div>

            <div class="row invoice-information align-items-start ms-1 p-0 pt-3">
              <div class="col"><p>Account ID <br><small id="account_id"></small></p></div>
            </div>

            <div class="row invoice-information align-items-start ms-1 p-0">
              <div class="col"><p>Billing Period Start <br><small id="billing_period_start"></small></p></div>
              <div class="col"><p>Billing Period End <br><small id="billing_period_end"></small></p></div>
              <div class="col"><p>Disconnection Date <br><small id="disconnection_date"></small></p></div>
            </div>

            <div class="table-responsive ps-5 pe-5">
              <table class="table table-borderless align-middle">
                <thead class="table-dark border-bottom">
                  <th>Invoice Summary</th>
                  <th>Amount</th>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Previous Bill</th>
                    <td id="previous_bill"></td>
                  </tr>
                  <tr>
                    <th scope="row">Previous Payment</th>
                    <td id="previous_payment"></td>
                  </tr>
                  <tr>
                    <th scope="row">Balance</th>
                    <td id="balance"></td>
                  </tr>
                  <tr>
                    <th scope="row">Secured Cash</th>
                    <td id="secured_cash"></td>
                  </tr>
                  
                  <tr>
                    <th scope="row">Subscription Amount</th>
                    <td id="subscription_amount"></td>
                  </tr>
                  <tr>
                    <th scope="row">Prorate Discount</th>
                    <td id="prorated_charge"></td>
                  </tr>
                  <tr class="border-bottom">
                    <th scope="row">Installation Charge</th>
                    <td id="installation_charge"></td>
                  </tr>

                  <tr class="table-dark">
                    <th scope="row" class="text-end pe-5 fs-5 fw-light">Total Bill: </th>
                    <td id="total_bill" class="fw-bold fs-5"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="table-responsive ps-5 pe-5 pt-3">
              <h5 class="border-bottom text-center">Payment History</h5>
              <table class="table table-borderless" id="payment-table">
                <thead>
                  <th>Payment Date</th>
                  <th>Payment Center</th>
                  <th>Reference ID</th>
                  <th>Amount Paid</th>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>

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
                      <select class="form-control required" id="payment_centers">
                        <option selected disabled value="">Choose Payment Center</option>
                      </select>
                      <label for="payment_centers" class="required">Payment Center</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="payment_reference_id_md" placeholder="Payment Reference ID" required>
                      <label for="payment_reference_id_md" class="required">Payment Reference ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="number" min="1" step="0.01" class="form-control" id="amount_paid_md" placeholder="Amount Paid" required>
                      <label for="amount_paid_md" class="required">Amount Paid</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="date" class="form-control custom-date" id="payment_date_md" placeholder="Payment Date" required>
                      <label for="payment_date_md" class="required">Payment Date</label>
                    </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="add-payment-btn">Add</button>
          </div>
        </div>
      </div>
  </div>
</form>

</main>

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

  <!-- Datatable -->
  <script src="https://cdn.datatables.net/buttons/2.3.2/js/dataTables.buttons.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
  <script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.html5.min.js"></script>

  <!-- Datepicker -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/invoice_data.js" type="module"></script>

</body>
</html>