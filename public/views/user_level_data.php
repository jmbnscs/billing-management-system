<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>View User Level</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">User Level</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

<!-- Customer Data Tabs -->
<section class="section user-level-data">
  <div class="row">
    <div class="col-xl-4">
      <div class="card">
        <div class="card-body p-3">

          <div>
            <h4 class="text-center fw-bold" id="user-role-name"></h4>
            <h6 class="text-center fw-light fst-italic">Total number of users in this role:</h6>
            <h5 class="text-center" id="count-user-roles"></h5>
          </div>

          <div class="mt-3 row border-bottom">
            <div class="col-sm-9 pt-3">
              <h5 class="fw-bold">Privileges</h5>
            </div>

            <div class="col-sm-3 mb-1" id="role-privilege-edit-btn">
            </div>
          </div>

          <!-- check css -->
          <div class="user-level-details mt-4 p-0" id="user-role-privileges">
            <div>
              <ul>

              <ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Admins Table -->
    <div class="col-xl-8">
      <div class="card recent-sales overflow-auto p-3">
        <!-- <div class="row"> -->
          <!-- <div class="col-sm-11 m-auto"> -->
            <h5 class="card-title">Admins</h5>
            <div class="container customer-tbl"> <!-- here -->
              <!-- Filter Dropdown -->
              <div>
                <select id="admin-status-filter" class="form-select table-filter" style="display: inline; width: 160px; margin-left: 18px;">
                  <option value="">Show All: Status</option>
                </select>
              </div>
              <!-- End Filter Dropdown -->
              <table class="table table-borderless" id="admins-table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          <!-- </div> -->
        <!-- </div> -->
      </div>
    </div> 
    <!-- End Admins Table -->
  </div>
</section>

<!-- View Admin Modal -->
<form id="save-admin">
  <div class="modal fade" id="view-admins" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
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
              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="text" class="form-control" id="admin_id" placeholder="Admin ID" readonly>
                  <label for="admin_id">Admin ID</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="text" class="form-control" id="admin_username" placeholder="Username" readonly>
                  <label for="admin_username">Username</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="text" class="form-control" id="admin_password" placeholder="Default Password" readonly>
                  <label for="admin_password">Default Password</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="text" class="form-control" id="first_name" placeholder="First Name" readonly>
                  <label for="first_name">First Name</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="text" class="form-control" id="middle_name" placeholder="Middle Name" value="N/A" readonly>
                  <label for="middle_name">Middle Name</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="text" class="form-control" id="last_name" placeholder="Last Name" readonly>
                  <label for="last_name">Last Name</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="date" class="form-control" id="admin_bday" placeholder="Birthday" readonly>
                  <label for="admin_bday">Birthday</label>
                </div>
              </div>

            </div>

            <!-- Right -->
            <div class="col-sm-6">

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="date" class="form-control" id="employment_date" placeholder="Employment Date" readonly>
                  <label for="employment_date">Employment Date</label>
                </div>
              </div>

              <div class="col-md-10 pt-4">
                <h5 style="border-bottom: 1px solid grey;">Edit Admin Information</h5>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="text" class="form-control" id="mobile_number" placeholder="Mobile Number" pattern="[0]{1}[9]{1}[0-9]{9}" required>
                  <label for="mobile_number">Mobile Number</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <input type="email" class="form-control" id="admin_email" placeholder="Email" required>
                  <label for="admin_email">Email</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <textarea class="form-control" id="address" rows="2" placeholder="Address" required></textarea>
                  <label for="address">Address</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <select id="role" class="form-select" required></select>
                  <label for="role">Admin Level</label>
                </div>
              </div>

              <div class="col-md-9 pt-2">
                <div class="form-floating">
                  <select id="admin_status" class="form-select" required></select>
                  <label for="admin_status">Admin Status</label>
                </div>
              </div>

            </div>

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#reset-pw-modal" id="reset-btn">Reset Password</button>
            <button type="button" class="btn btn-primary" id="edit-btn">Edit</button>
            <button type="submit" class="btn btn-success" id="save-btn" disabled>Save Changes</button>
          </div>
        </div>
      </div>
  </div>
</form> <!-- End View Admins Modal -->

<!-- Reset Password Modal -->
<form id="reset-password">
  <div class="modal fade" id="reset-pw-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
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
                      <input type="text" class="form-control" id="admin_id_rst" placeholder="Admin ID" readonly>
                      <label for="admin_id_rst">Admin ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="admin_username_rst" placeholder="Username" readonly>
                      <label for="admin_username_rst">Username</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="admin_password_rst" placeholder="Default Password" readonly>
                      <label for="admin_password_rst">Default Password</label>
                    </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-danger">Reset</button>
          </div>
        </div>
      </div>
  </div>
</form>

<!-- User Level Modal -->
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
              <div class="row g-3 p-2">
                <div class="mb-3">
                  <label for="user_role" class="form-label required title fw-bold">Role</label>
                  <input type="text" class="form-control" id="user_role" required readonly>
                </div>

                <div >
                  <label class="title fw-bold">Role Permissions</label>
                </div>

                <div class="mb-1">
                  <label class="title">Administrator Access <i class="bi bi-info-circle ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Allow full access to the system."></i></label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="select_all" value="1">
                    <label class="form-check-label" for="select_all">Select All</label>
                  </div>
                </div>

                <div class="mb-1">
                  <label class="title">Customer Management</label>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="cust-view" value="1" name="check">
                    <label class="form-check-label" for="cust-view">View</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="cust-add" value="1" name="check">
                    <label class="form-check-label" for="cust-add">Add</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="cust-edit" value="1" name="check">
                    <label class="form-check-label" for="cust-edit">Edit</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="cust-dlt" value="1" name="check">
                    <label class="form-check-label" for="cust-dlt">Delete</label>
                  </div>
                </div>

                <div class="mb-1">
                  <label class="title">Invoice Management</label>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="inv-view" value="1" name="check">
                    <label class="form-check-label" for="inv-view">View</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="inv-add" value="1" name="check">
                    <label class="form-check-label" for="inv-add">Add</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="inv-edit" value="1" name="check">
                    <label class="form-check-label" for="inv-edit">Edit</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="inv-dlt" value="1" name="check">
                    <label class="form-check-label" for="inv-dlt">Delete</label>
                  </div>
                </div>

                <div class="mb-1">
                  <label class="title">Payment Management</label>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pay-view" value="1" name="check">
                    <label class="form-check-label" for="pay-view">View</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pay-add" value="1" name="check">
                    <label class="form-check-label" for="pay-add">Add</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pay-edit" value="1" name="check">
                    <label class="form-check-label" for="pay-edit">Edit</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pay-dlt" value="1" name="check">
                    <label class="form-check-label" for="pay-dlt">Delete</label>
                  </div>
                </div>

                <div class="mb-1">
                  <label class="title">Prorate Management</label>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pro-view" value="1" name="check">
                    <label class="form-check-label" for="pro-view">View</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pro-add" value="1" name="check">
                    <label class="form-check-label" for="pro-add">Add</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pro-edit" value="1" name="check">
                    <label class="form-check-label" for="pro-edit">Edit</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="pro-dlt" value="1" name="check">
                    <label class="form-check-label" for="pro-dlt">Delete</label>
                  </div>
                </div>

                <div class="mb-1">
                  <label class="title">Subscriptions Management</label>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="plans-view" value="1" name="check">
                    <label class="form-check-label" for="plans-view">View</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="plans-add" value="1" name="check">
                    <label class="form-check-label" for="plans-add">Add</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="plans-edit" value="1" name="check">
                    <label class="form-check-label" for="plans-edit">Edit</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="plans-dlt" value="1" name="check">
                    <label class="form-check-label" for="plans-dlt">Delete</label>
                  </div>
                </div>

                <div class="mb-1">
                  <label class="title">Tickets Management</label>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="tkt-view" value="1" name="check">
                    <label class="form-check-label" for="tkt-view">View</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="tkt-add" value="1" name="check">
                    <label class="form-check-label" for="tkt-add">Add</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="tkt-edit" value="1" name="check">
                    <label class="form-check-label" for="tkt-edit">Edit</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="tkt-dlt" value="1" name="check">
                    <label class="form-check-label" for="tkt-dlt">Delete</label>
                  </div>
                </div>

                <!-- <div class="mb-1">
                  <label class="title">Tickets Management</label>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="tkt-view" value="1" name="check">
                    <label class="form-check-label" for="tkt-view">View</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="tkt-edit" value="1" name="check">
                    <label class="form-check-label" for="tkt-edit">Edit</label>
                  </div>
                  <div class="form-check form-check-inline pe-3">
                    <input class="form-check-input" type="checkbox" id="tkt-dlt" value="1" name="check">
                    <label class="form-check-label" for="tkt-dlt">Delete</label>
                  </div>
                </div> -->
                
              </div>

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="save-btn">Save Changes</button>
          </div>
        </div>
      </div>
  </div>
</form> <!-- End User Level Modal -->

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

  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/user_level_data.js"></script>

</body>
</html>