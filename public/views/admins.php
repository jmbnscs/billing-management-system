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

<!-- Admin Modal -->
<form id="save-admin">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="modalDialogScrollable" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <div class="row mb-3">
                <label for="admin_id" class="col-sm-2 col-form-label">Admin ID</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="admin_id" readonly>
                </div>
            </div>

            <div class="row mb-3">
                <label for="admin_username" class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="admin_username" placeholder="admin_username" readonly>
                </div>
            </div>

            <div class="row mb-3">
                <label for="first_name" class="col-sm-2 col-form-label">First Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="first_name" placeholder="Ex. Juan" required>
                </div>
            </div>
            
            <div class="row mb-3">
                <label for="middle_name" class="col-sm-2 col-form-label">Middle Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="middle_name" placeholder="Ex. Santos" >
                </div>
            </div>
    
            <div class="row mb-3">    
                <label for="last_name" class="col-sm-2 col-form-label">Last Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="last_name" placeholder="Ex. Dela Cruz" required>
                </div>
            </div>
    
            <div class="row mb-3">
                <label for="mobile_number" class="col-sm-2 col-form-label">Mobile Number</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="mobile_number" placeholder="Ex. 09XXXXXXXXX" pattern="[0]{1}[9]{1}[0-9]{9}" required>
                </div>
            </div>
    
            <div class="row mb-3">
                <label for="admin_email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" placeholder="Ex. name@example.com" id="admin_email" required>
                </div>
            </div>
    
            <div class="row mb-3">
                <label for="admin_bday" class="col-sm-2 col-form-label">Birthday</label>
                <div class="col-sm-10">
                    <input type="date" class="form-control" id="admin_bday" placeholder="Ex. 03/02/2001" required>
                </div>
            </div>

            <div class="row mb-3">
                <label for="address" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="address" rows="2" placeholder="Ex. Anonas Street Sta. Mesa Manila" required></textarea>
                    </div>
            </div>
    
            <div class="row mb-3">
                <label for="employment_date" class="col-sm-2 col-form-label">Employment Date</label>
                <div class="col-sm-10">
                    <input type="date" class="form-control" id="employment_date" required>
                </div>
            </div>

            <div class="row mb-3">
                <label for="role" class="col-sm-2 col-form-label">Admin Level</label>
                <div class="col-sm-10">
                    <select id="role" class="form-select" required>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <label for="admin_status" class="col-sm-2 col-form-label">Admin Status</label>
                <div class="col-sm-10">
                    <select id="admin_status" class="form-select" required>
                    </select>
                </div>
            </div>

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="edit-admin">Edit</button>
            <button type="submit" class="btn btn-success" id="save-admin-btn" disabled>Save Changes</button>
          </div>
        </div>
      </div>
  </div>
</form> <!-- End Admins Modal -->

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
  <script src="../js/admins.js"></script>

</body>
</html>