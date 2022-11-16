<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <!-- Page Title -->
  <div class="pagetitle">
    <h1 id="customer-name"></h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.html">Home</a></li>
          <li class="breadcrumb-item active">Customers</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <!-- Customer Data Tabs -->
    <section class="section customer-data">
      <div class="row align-items-top">
        <div class="col-xl-12">
          <!-- Navigation Tabs -->
          <div class="card">
            <div class="card-body pt-3 pb-0">

              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered d-flex">

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

            </div>
          </div>

          <!-- Customer Overview -->
          <div class="tab-content">
            <div class="tab-pane fade show active customer-overview" id="customer-overview">
              <div class="row">
                <!-- Customer Information -->
                <div class="col-sm-6">
                  <div class="card ">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Customer Information</h5>
                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">GSTech ID</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="gstech_id"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">First Name</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="first_name"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Middle Name</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="middle_name"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Last Name</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="last_name"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Email</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="email"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Mobile Number</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="mobile_number"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Birthday</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="birthdate"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Billing Address</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="billing_address"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div><!-- End Customer Information -->

                <!-- Account Information -->
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Account Information</h5>
                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom ">Account ID</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="account_id"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Start Date</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="start_date"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Lockin End Date</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="lockin_end_date"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Billing Day</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="billing_day"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Subscription Plan</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="plan_name"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Connection Type</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="connection_type"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Area</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="area_name"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Bill Count</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="bill_count"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div><!-- End Account Information -->

                <!-- Installation Information -->
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Installation Information</h5>
                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom ">Installation Type</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="installation_type"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Installment</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="installment"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Total Charge</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="installation_total_charge"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Balance</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="installation_balance"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Status</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="install_status"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div><!-- End Installation Information -->

                <!-- Ratings Information -->
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Ratings Information</h5>
                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom ">Payment Rating</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="avg_rating"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Bill Count</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="rating_base"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Overdue Payments</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="delinquent_ratings"></div>
                          </div>

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">Status</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="rating_status"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div><!-- End Ratings Information -->
                
              </div>

            </div>
          </div>

            <!-- Customer Invoice History  -->
          <div class="tab-content pt-1">
            <div class="tab-pane fade customer-invoice" id="customer-invoice">
              <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Invoice History</h5>
                          <table class="table table-borderless" id="customer-invoice-tbl">
                            <thead>
                              <tr>
                                <th scope="col">Invoice ID</th>
                                <th scope="col">Disconnection Date</th>
                                <th scope="col">Total Bill</th>
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
            </div>
          </div><!-- End Customer Invoice History -->

          <!-- Customer Payment History -->
          <div class="tab-content">
            <div class="tab-pane fade customer-payment" id="customer-payment">
              <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Payment History</h5>
                          <table class="table table-borderless" id="customer-payment-tbl">
                            <thead>
                              <tr>
                                <th scope="col">Payment Reference ID</th>
                                <th scope="col">Amount Paid</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Invoice ID</th>
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
            </div>
          </div><!-- End Customer Payment History -->

          <!-- Customer Prorate History -->
          <div class="tab-content">
            <div class="tab-pane fade customer-prorate" id="customer-prorate">
              <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Prorates History</h5>
                          <table class="table table-borderless" id="customer-prorate-tbl">
                            <thead>
                              <tr>
                                <th scope="col">Prorate ID</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Prorate Charge</th>
                                <th scope="col">Ticket #</th>
                                <th scope="col">Status</th>
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
            </div>
          </div><!-- End Customer Prorate History -->

          <!-- Customer Ticket History -->
          <div class="tab-content">
            <div class="tab-pane fade customer-ticket" id="customer-ticket">
              <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Tickets History</h5>
                          <table class="table table-borderless" id="customer-ticket-tbl">
                            <thead>
                              <tr>
                                <th scope="col">Ticket #</th>
                                <th scope="col">Concern</th>
                                <th scope="col">Date Filed</th>
                                <th scope="col">Date Resolved</th>
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
              </div>
            </div>
          </div><!-- End Customer Ticket History -->

          <!-- Template -->
          <!-- <div class="tab-content pt-1">
            <div class="tab-pane fade customer-invoice" id="customer-invoice">
              <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Invoice History</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        </div>
      </div>
    </section>

</main>

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