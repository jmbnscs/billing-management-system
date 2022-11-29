<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Customer List</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Customers</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Customer List Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <table class="table table-borderless" id="customer-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Plan</th>
              <th scope="col">Balance</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody id="customer-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Customer List Table -->
  
<form id="save-customer">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="view-customers" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
            <!-- Left -->
            <div class="col-sm-6">
                <div class="col-md-10">
                    <h5 style="border-bottom: 1px solid grey;">General Information</h5>
                </div>

                <div class="row pt-2">
                    <div class="col-md-6">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="account_id" placeholder="Account ID" readonly>
                        <label for="account_id">Account ID</label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="gstech_id" placeholder="GSTech ID" readonly>
                        <label for="gstech_id">GSTech ID</label>
                        </div>
                    </div>

                </div>

                <div class="row pt-2">

                    <div class="col-md-4">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="first_name" placeholder="First Name" readonly>
                        <label for="first_name">First Name</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="middle_name" placeholder="Middle Name" readonly>
                        <label for="middle_name">Middle Name</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="last_name" placeholder="Last Name" readonly>
                        <label for="last_name">Last Name</label>
                        </div>
                    </div>

                </div>

                <div class="row pt-2">

                    <div class="col-md-4">
                        <div class="form-floating">
                        <input type="date" class="form-control" id="birthdate" placeholder="Birthdate" readonly>
                        <label for="birthdate">Birthdate</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-floating">
                        <input type="date" class="form-control" id="start_date" placeholder="Start Date" readonly>
                        <label for="start_date">Start Date</label>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-floating">
                        <input type="date" class="form-control" id="lockin_end_date" placeholder="Lock In End Date" readonly>
                        <label for="lockin_end_date">Lock In End Date</label>
                        </div>
                    </div>

                </div>

                <div class="row pt-2">
                    <div class="col-md-6">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="billing_day" placeholder="Billing Day" readonly>
                        <label for="billing_day">Billing Day</label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="bill_count" placeholder="Bill Count" readonly>
                        <label for="bill_count">Bill Count</label>
                        </div>
                    </div>

                </div>

                <div class="row pt-2">
                    <div class="col-md-6">
                        <div class="form-floating">
                        <select id="install_type_id" class="form-select" disabled></select>
                        <label for="install_type_id">Installation Type</label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="installation_balance" placeholder="Installation Balance" readonly>
                        <label for="installation_balance">Installation Balance</label>
                        </div>
                    </div>

                </div>
            </div>
                
            <!-- Right -->
            <div class="col-sm-6">
                <div class="col-md-10">
                    <h5 style="border-bottom: 1px solid grey;">Edit Information</h5>
                </div>

                <div class="row pt-2">
                    <div class="col-md-12">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="billing_address" placeholder="Address" required>
                        <label for="billing_address">Address</label>
                        </div>
                    </div>
                </div>

                <div class="row pt-2">
                    <div class="col-md-12">
                        <div class="form-floating">
                        <input type="text" class="form-control" id="mobile_number" placeholder="Mobile Number" pattern="[0]{1}[9]{1}[0-9]{9}" required>
                        <label for="mobile_number">Mobile Number</label>
                        </div>
                    </div>
                </div>

                <div class="row pt-2">
                    <div class="col-md-12">
                        <div class="form-floating">
                        <input type="email" class="form-control" id="email" placeholder="Email" required>
                        <label for="email">Email</label>
                        </div>
                    </div>
                </div>

                <div class="row pt-2">
                    <div class="col-md-6">
                        <div class="form-floating">
                        <select id="plan_id" class="form-select" required></select>
                        <label for="plan_id">Subscription Plan</label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-floating">
                        <select id="connection_id" class="form-select" required></select>
                        <label for="connection_id">Connection Type</label>
                        </div>
                    </div>
                </div>

                <div class="row pt-2">
                    <div class="col-md-6">
                        <div class="form-floating">
                        <select id="account_status_id" class="form-select" required></select>
                        <label for="account_status_id">Account Status</label>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-floating">
                        <select id="area_id" class="form-select" required></select>
                        <label for="area_id">Area</label>
                        </div>
                    </div>
                </div>

            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="edit-customer">Edit</button>
            <button type="submit" class="btn btn-success" id="save-customer-btn" disabled>Save Changes</button>
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

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/customers.js"></script>

</body>
</html>