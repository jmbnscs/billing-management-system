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
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#customer-overview" id="overview-customer-data">Overview</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#customer-invoice" id="edit-customer-invoice">Add User Level</button>
                </li>

              </ul><!-- End Bordered Tabs -->

            </div>
          </div>

          <div class="tab-content pt-1">
            <!-- Customer Information -->
            <div class="tab-pane fade show active customer-overview" id="customer-overview">
              <div class="row">
                <div class="col-sm-5">
                  <div class="card ">
                    <div class="card-body">
                      <div class="tab-pane fade show active customer-overview " id="customer-overview">
                        <h5 class="card-title">Customer Information</h5>
                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom ">Account ID</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="account_id"></div>
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

                          <div class="row">
                            <div class="col-lg-4 col-md-4 label border-bottom">GSTech ID</div>
                            <div class="col-lg-7 col-md-8 border-bottom" id="gstech_id"></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div><!-- End Customer Information -->

                <div class="col-sm-5">
                  <div class="card">
                    <div class="card-body">
                      x
                    </div>
                  </div>
                </div>
                
              </div>

            </div>
          </div>
            
          <div class="tab-content pt-2">

            <div class="tab-pane fade customer-invoice pt-3 " id="customer-invoice">

              <!-- Add New User Level Form -->
              <form id="create-new">

                <div class="row mb-3">
                  <label for="user_role" class="col-md-4 col-lg-3 col-form-label">User Role</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="user_role" type="text" class="form-control" id="user_role" value="" required>
                  </div>
                </div>

                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Add User Level</button>
                </div>
              </form><!-- End Add New User Level Form -->

            </div>

          </div>

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