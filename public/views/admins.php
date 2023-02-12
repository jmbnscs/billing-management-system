<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle row">
    <div class="col-md-9">
      <h1>View Admins</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Admins</li>
        </ol>
      </nav>
    </div>

    <div class="col-md-3 justify-content-center">
      <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-admin-modal" id="add-btn">+ Add New Admin</button>
    </div>
    
  </div><!-- End Page Title -->

  <!-- Admins Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <ul class="nav nav-tabs d-flex" role="tablist">
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100 active" id="active-tab" data-bs-toggle="tab" data-bs-target="#active-admins" type="button" role="tab" aria-controls="active" aria-selected="true">Active</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="inactive-tab" data-bs-toggle="tab" data-bs-target="#inactive-admins" type="button" role="tab" aria-controls="inactive" aria-selected="false">Inactive</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="suspended-tab" data-bs-toggle="tab" data-bs-target="#suspended-admins" type="button" role="tab" aria-controls="suspended" aria-selected="false">Suspended</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="locked-tab" data-bs-toggle="tab" data-bs-target="#locked-admins" type="button" role="tab" aria-controls="locked" aria-selected="false">Locked</button>
          </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content pt-2">
          <!-- Active Admins -->
          <div class="tab-pane fade show active" id="active-admins" role="tabpanel" aria-labelledby="active-tab">
            <!-- Filter Dropdown -->
            <!-- <div>
              <select id="status-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Status</option>
              </select>
            </div> -->
            <div>
              <select id="active-role-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Role</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="active-admins-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
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

          <!-- Inactive Admins -->
          <div class="tab-pane fade" id="inactive-admins" role="tabpanel" aria-labelledby="inactive-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="inactive-role-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Role</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="inactive-admins-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
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

          <!-- Suspended Admins -->
          <div class="tab-pane fade" id="suspended-admins" role="tabpanel" aria-labelledby="suspended-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="suspended-role-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Role</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="suspended-admins-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
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

          <!-- Locked Admins -->
          <div class="tab-pane fade" id="locked-admins" role="tabpanel" aria-labelledby="locked-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="locked-role-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Role</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="locked-admins-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
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

        </div> <!-- End Tab Content -->

      </div>

    </div>
  </div> <!-- End Admins Table -->

<!-- Add New Admin Modal -->
<form id="add-admin" novalidate>
  <div class="modal fade" id="add-admin-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Add New Admin</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="admin_id" placeholder="Admin ID" data-bs-toggle="tooltip" data-bs-placement="top" title="This is auto-generated by the system." required readonly>
                  <label for="admin_id" class="required">Admin ID <i class="bi bi-info-circle ms-1"></i></label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="first_name" placeholder="First Name" required>
                  <div class="invalid-feedback">Please enter admin's first name.</div>
                  <label for="first_name" class="required">First Name</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="middle_name" placeholder="Middle Name">
                  <div class="invalid-feedback">Middle name must not be numbers.</div>
                  <label for="middle_name">Middle Name</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="last_name" placeholder="Last Name" required>
                  <div class="invalid-feedback">Please enter admin's last name.</div>
                  <label for="last_name" class="required">Last Name</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="number" class="form-control" id="mobile_number" placeholder="Mobile Number" pattern="[0]{1}[9]{1}[0-9]{9}" maxlength="11" size="11" required>
                  <div class="invalid-feedback">Please enter admin's mobile number.</div>
                  <label for="mobile_number" class="required">Mobile Number</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="email" class="form-control" id="admin_email" placeholder="Email" required>
                  <div class="invalid-feedback">Please enter admin's email.</div>
                  <label for="admin_email" class="required">Email</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="date" class="form-control custom-date" id="admin_bday" placeholder="Birthday" autocomplete="off" required>
                  <div class="invalid-feedback">Please enter admin's birthdate.</div>
                  <label for="admin_bday" class="required">Birthday</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <textarea type="email" class="form-control" id="address" placeholder="Address" rows="2" required></textarea>
                  <div class="invalid-feedback">Please enter admin's address.</div>
                  <label for="address" class="required">Address</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="date" class="form-control custom-date" id="employment_date" placeholder="Employment Date" autocomplete="off" required>
                  <div class="invalid-feedback">Please enter admin's employment date.</div>
                  <label for="employment_date" class="required">Employment Date</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <select class="form-select" id="role">
                    <option selected disabled value="">Choose Admin Level</option>
                  </select>
                  <div class="invalid-feedback">Please choose admin's role.</div>
                  <label for="role" class="required">Admin Level</label>
                </div>
              </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="add-admin-btn">Submit</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>


</main><!-- End #main -->

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

  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>

  <!-- Datepicker -->
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/admins.js"></script>

</body>
</html>