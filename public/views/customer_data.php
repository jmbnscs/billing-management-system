<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <!-- Page Title -->
  <div class="pagetitle">
    <h1>Customer Details</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">Customers</li>
        </ol>
      </nav>
  </div><!-- End Page Title -->

  <!-- Customer Data Tabs -->
  <section class="section customer-data">
    <div class="row">
      <div class="col-xl-4">
          <div class="card">
            <img src="../images/valued.png" class="card-img-top img-fluid p-3 w-50 h-50 mx-auto d-block" id="rating-img">
            <div class="card-body p-3">
              <div>
                <h4 class="text-center fw-bold" id="customer-name"></h4>
                <h6 class="text-center fw-light fst-italic" id="rating-tag"><i class="bi bi-stars"></i> <span id="rating-name">Valued Customer</span></h6>
              </div>

              <div class="mt-3 row border-bottom">
                <div class="col-sm-9 pt-3">
                  <h5 class="fw-bold">Details</h5>
                </div>

                <div class="col-sm-3 mb-1">
                  <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#edit-customer" id="edit-btn">Edit</button>
                </div>
              </div>

              <div class="profile-details mt-4 p-0">
                <p>GSTech ID <br><small class="text-secondary" id="gstech_id"></small></p>
                <p>Account ID <br><small class="text-secondary" id="account_id"></small></p>
                <p>Billing Address <br><small class="text-secondary" id="billing_address"></small></p>
                <p>Mobile Number <br><small class="text-secondary" id="mobile_number"></small></p>
                <p>Email <br><small class="text-secondary" id="email"></small></p>

                <p>Subscription Plan <br><small class="text-secondary" id="plan_name"></small></p>
                <p>Connection Type <br><small class="text-secondary" id="connection_type"></small></p>
                <p>Area <br><small class="text-secondary" id="area_name"></small></p>
              </div>

            </div>

          </div>
      </div>
      <div class="col-xl-8">
        <!-- Navigation Tabs -->
        <!-- Bordered Tabs -->
          <ul class="nav nav-tabs-customer d-flex">

            <li class="nav-item flex-fill">
              <button class="nav-link active w-100" data-bs-toggle="tab" data-bs-target="#customer-overview" id="customer-overview-tab">Overview</button>
            </li>

            <li class="nav-item flex-fill">
              <button class="nav-link w-100" data-bs-toggle="tab" data-bs-target="#customer-invoice" id="customer-invoice-tab">Invoice</button>
            </li>

            <li class="nav-item flex-fill">
              <button class="nav-link w-100" data-bs-toggle="tab" data-bs-target="#customer-payment" id="customer-payment-tab">Payment</button>
            </li>

            <li class="nav-item flex-fill">
              <button class="nav-link w-100" data-bs-toggle="tab" data-bs-target="#customer-prorate" id="customer-prorate-tab">Prorate</button>
            </li>

            <li class="nav-item flex-fill">
              <button class="nav-link w-100" data-bs-toggle="tab" data-bs-target="#customer-ticket" id="customer-ticket-tab">Ticket</button>
            </li>

          </ul><!-- End Bordered Tabs -->
          <br>

        <!-- Tab Contents -->
        <div class="card pb-2">
          <!-- Account Overview -->
          <div class="tab-content">
            <div class="tab-pane fade show active customer-overview" id="customer-overview">
              <div class="row">
                <div class="col-sm-12">
                  <div class="p-2">
                    <h5 class="card-title p-2">Account Information</h5>

                    <div class="row profile-information align-items-start ms-1 p-0">
                      <div class="col"><p>First Name <br><small id="first_name"></small></p></div>
                      <div class="col"><p>Middle Name <br><small id="middle_name"></small></p></div>
                      <div class="col"><p>Last Name <br><small id="last_name"></small></p></div>
                      <div class="col"><p>Birthday <br><small id="birthdate"></small></p></div>
                    </div>

                    <div class="row profile-information align-items-start ms-1 p-0">
                      <div class="col"><p>Start Date <br><small id="start_date"></small></p></div>
                      <div class="col"><p>Lockin End Date <br><small id="lockin_end_date"></small></p></div>
                      <div class="col"><p>Billing Day <br><small id="billing_day"></small></p></div>
                      <div class="col"><p>Bill Count <br><small id="bill_count"></small></p></div>
                    </div>

                    <h5 class="card-title p-2">Installation Information</h5>

                    <div class="row profile-information align-items-start ms-1 p-0">
                      <div class="col"><p>Installation Type <br><small id="installation_type"></small></p></div>
                    </div>

                    <div class="row profile-information align-items-start ms-1 p-0">
                      <div class="col"><p>Installment <br><small id="installment"></small></p></div>
                      <div class="col"><p>Total Charge <br><small id="installation_total_charge"></small></p></div>
                      <div class="col"><p>Balance <br><small id="installation_balance"></small></p></div>
                      <div class="col"><p>Status <br><small id="install_status"></small></p></div>
                    </div>

                    <h5 class="card-title p-2">Payment Rating Information</h5>

                    <div class="row profile-information align-items-start ms-1 p-0">
                      <div class="col"><p>Payment Rating <br><small id="avg_rating"></small></p></div>
                      <div class="col"></div>
                    </div>

                    <div class="row profile-information align-items-start ms-1 p-0">
                      <div class="col"><p>Bill Count <br><small id="rating_base"></small></p></div>
                      <div class="col"><p>Overdue Payments <br><small id="delinquent_ratings"></small></p></div>
                      <div class="col"><p>Status <br><small id="rating_status"></small></p></div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- End Account Overview -->

          <!-- Customer Invoice History  -->
          <form action="../../app/includes/view_invoice.php" method="post" target="_blank">
            <div class="tab-content">
              <div class="tab-pane fade customer-invoice" id="customer-invoice">
                <div class="row">
                  <div class="col-sm-11 m-auto">
                    <h5 class="card-title p-3">Invoice History</h5>
                    <div class="container overflow-auto customer-tbl">

                      <!-- Filter Dropdown -->
                      <div>
                        <select id="status-filter" class="form-select table-filter" style="display: inline; width: 150px; margin-left: 20px;">
                          <option value="">Show All: Status</option>
                        </select>
                      </div>
                      <!-- End Filter Dropdown -->

                        <table class="table table-borderless" id="customer-invoice-tbl">
                          <thead>
                            <tr>
                              <th scope="col">Invoice ID</th>
                              <th scope="col">Disconnection Date</th>
                              <th scope="col">Running Balance</th>
                              <th scope="col">Status</th>
                              <th scope="col">View</th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form><!-- End Customer Invoice History -->

          <!-- Customer Payment History -->
          <div class="tab-content">
            <div class="tab-pane fade customer-payment" id="customer-payment">
              <div class="row">
                <div class="col-sm-11 m-auto">
                  <h5 class="card-title p-3">Payment History</h5>
                  <div class="container overflow-auto customer-tbl">
                      <table class="table table-borderless" id="customer-payment-tbl">
                        <thead>
                          <tr>
                            <th scope="col">Reference ID</th>
                            <th scope="col">Amount Paid</th>
                            <th scope="col">Payment Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">View</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Customer Payment History -->

          <!-- Customer Prorate History -->
          <div class="tab-content">
            <div class="tab-pane fade customer-prorate" id="customer-prorate">
              <div class="row">
                <div class="col-sm-11 m-auto">
                  <h5 class="card-title p-3">Prorates History</h5>
                  <div class="container overflow-auto customer-tbl">

                      <!-- Filter Dropdown -->
                      <div>
                        <select id="prorate-status-filter" class="form-select table-filter" style="display: inline; width: 150px; margin-left: 20px;">
                          <option value="">Show All: Status</option>
                        </select>
                      </div>
                      <!-- End Filter Dropdown -->

                      <table class="table table-borderless" id="customer-prorate-tbl">
                        <thead>
                          <tr>
                            <th scope="col">Prorate ID</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Prorate Discount</th>
                            <th scope="col">Ticket #</th>
                            <th scope="col">Status</th>
                            <th scope="col">View</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Customer Prorate History -->

          <!-- Customer Ticket History -->
          <div class="tab-content">
            <div class="tab-pane fade customer-ticket" id="customer-ticket">
              <div class="row">
                <div class="col-sm-11 m-auto">
                  <h5 class="card-title p-3">Tickets History</h5>
                  <div class="container overflow-auto customer-tbl">

                      <!-- Filter Dropdown -->
                      <div>
                        <select id="ticket-status-filter" class="form-select table-filter" style="display: inline; width: 150px; margin-left: 20px;">
                          <option value="">Show All: Status</option>
                        </select>
                      </div>

                      <div>
                        <select id="concern-filter" class="form-select table-filter" style="display: inline; width: 150px; margin-left: 20px;">
                          <option value="">Show All: Concern</option>
                        </select>
                      </div>
                      <!-- End Filter Dropdown -->

                      <table class="table table-borderless" id="customer-ticket-tbl">
                        <thead>
                          <tr>
                            <th scope="col">Ticket #</th>
                            <th scope="col">Concern</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Status</th>
                            <th scope="col">View</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- End Customer Ticket History -->

        </div> <!-- End Tab Contents -->

      </div>
    </div>
  </section>

<!-- Edit Customer Modal -->
<form id="save-customer">
  <div class="modal fade" id="edit-customer" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title">Update Customer Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <div class="row g-3">
            <div class="row pt-2">
                <div class="col-md-12">
                    <div class="form-floating">
                    <input type="text" class="form-control" id="billing_address_edt" placeholder="Address" required>
                    <label for="billing_address_edt">Address</label>
                    </div>
                </div>
            </div>

            <div class="row pt-2">
                <div class="col-md-12">
                    <div class="form-floating">
                    <input type="text" class="form-control" id="mobile_number_edt" placeholder="Mobile Number" pattern="[0]{1}[9]{1}[0-9]{9}" required>
                    <label for="mobile_number_edt">Mobile Number</label>
                    </div>
                </div>
            </div>

            <div class="row pt-2">
                <div class="col-md-12">
                    <div class="form-floating">
                    <input type="email" class="form-control" id="email_edt" placeholder="Email" required>
                    <label for="email_edt">Email</label>
                    </div>
                </div>
            </div>

            
            <div class="col-md-12">
                <div class="form-floating">
                <select id="plan_id_edt" class="form-select" required></select>
                <label for="plan_id_edt">Subscription Plan</label>
                </div>
            </div>

            <div class="col-md-12">
                <div class="form-floating">
                <select id="connection_id_edt" class="form-select" required></select>
                <label for="connection_id_edt">Connection Type</label>
                </div>
            </div>
            
            <div class="col-md-12">
                <div class="form-floating">
                <select id="account_status_id_edt" class="form-select" required></select>
                <label for="account_status_id_edt">Account Status</label>
                </div>
            </div>

            <div class="col-md-12">
                <div class="form-floating">
                <select id="area_id_edt" class="form-select" required></select>
                <label for="area_id_edt">Area</label>
                </div>
            </div>

          </div>

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</form>

<!-- Payment Record Modal -->
<div class="modal fade" id="view-payment" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <div class="row mb-3">
            <label for="payment_reference_id" class="col-sm-4 col-form-label">Reference ID</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="payment_reference_id" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="amount_paid" class="col-sm-4 col-form-label">Amount Paid</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="amount_paid" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="payment_date" class="col-sm-4 col-form-label">Payment Date</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="payment_date" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="invoice_id" class="col-sm-4 col-form-label" id="invoice_id_lbl">Invoice ID</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="invoice_id" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="tagged" class="col-sm-4 col-form-label">Status</label>
            <div class="col-sm-3">
              <input type="text" class="form-control text-center " id="tagged" value="" readonly>
            </div>
          </div>

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</div>

<!-- Prorate Record Modal -->
<div class="modal fade" id="view-prorate" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <div class="row mb-3">
            <label for="prorate_id" class="col-sm-4 col-form-label">Prorate ID</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="prorate_id" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="duration" class="col-sm-4 col-form-label">Duration</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="duration" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="prorate_charge" class="col-sm-4 col-form-label">Prorate Charge</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="prorate_charge" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="invoice_id_pr" class="col-sm-4 col-form-label">Invoice ID</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="invoice_id_pr" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="prorate_status" class="col-sm-4 col-form-label">Status</label>
            <div class="col-sm-3">
              <input type="text" class="form-control text-center " id="prorate_status" value="" readonly>
            </div>
          </div>

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</div>

<!-- Ticket History Modal -->
<div class="modal fade" id="view-ticket" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <div class="row mb-3">
            <label for="ticket_num" class="col-sm-4 col-form-label">Ticket #</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="ticket_num" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="concern_category" class="col-sm-4 col-form-label">Concern Category</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="concern_category" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="concern_details" class="col-sm-4 col-form-label">Concern Details</label>
            <div class="col-sm-8">
              <textarea row="3" class="form-control" id="concern_details" value="" readonly></textarea>
            </div>
          </div>

          <div class="row mb-3">
            <label for="date_filed" class="col-sm-4 col-form-label">Date Filed</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="date_filed" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="resolution_details" class="col-sm-4 col-form-label">Resolution Details</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="resolution_details" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="date_resolved" class="col-sm-4 col-form-label">Date Resolved</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="date_resolved" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="admin_id" class="col-sm-4 col-form-label">Admin</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="admin_id" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="ticket_status" class="col-sm-4 col-form-label">Status</label>
            <div class="col-sm-4">
              <input type="text" class="form-control text-center " id="ticket_status" value="" readonly>
            </div>
          </div>

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</div>

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

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/customer_data.js" type="module"></script>

</body>
</html>