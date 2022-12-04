<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>View Admins</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Admins</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Admins Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <!-- Filter Dropdown -->
        <div>
          <select id="status-filter" class="form-control" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Show All: Status</option>
          </select>
        </div>

        <div>
          <select id="role-filter" class="form-control" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Show All: Role</option>
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
          <tbody id="admin-data">
          </tbody>
        </table>

      </div>

    </div>
  </div> <!-- End Admins Table -->

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
  <script src="../js/admins.js"></script>

</body>
</html>