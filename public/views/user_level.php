<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

    <div class="pagetitle">
    <h1>Advanced Options</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">User Level</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section user-level">
      <div class="row">

        <div class="col-xl-12">

          <div class="card">
            <div class="card-body pt-3">
              
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#user-level-overview" id="overview-user-level">Overview</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#add-user-level-tab" id="edit-user-level">Add User Level</button>
                </li>

              </ul>
              <div class="tab-content pt-2">

                <div class="tab-pane fade show active user-level-overview " id="user-level-overview">
                  <h5 class="card-title">User Level Details</h5>

        <!-- User Level Details Table-->
                <div class="col-12">
                <div class="card userlevel-details overflow-auto">
                <br>
                <div class="card-body">
                  <table class="table table-borderless" id="userlevel-table">
                    <thead>
                      <tr>
                        <th scope="col">User Level</th>
                        <th scope="col">User Role</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="userlevel-data">
                  </tbody>
                </table>
              </div>

              </div>
     </div><!-- User Level Details Table -->

                </div>

                <div class="tab-pane fade add-user-level-tab pt-3 " id="add-user-level-tab">

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

              </div><!-- End Bordered Tabs -->

            </div>
          </div>

        </div>
      </div>
    </section>

<!-- User Level Modal -->
<form id="update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
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
                    <input type="text" class="form-control" id="user_id" placeholder="User Level" readonly>
                    <label for="user_id">User Level</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="user_role_md" placeholder="User Role" required>
                    <label for="user_role_md">User Role</label>
                  </div>
                </div>

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="edit-btn">Edit</button>
            <button type="submit" class="btn btn-success" id="save-btn" disabled>Save Changes</button>
          </div>
        </div>
      </div>
  </div>
</form> <!-- End User Level Modal -->

<!-- Delete User Level Modal -->
<form id="delete-data">
  <div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row g-3">

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="user_id_d" placeholder="User Level" readonly>
                    <label for="user_id_d">User Level</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="user_role_md_d" placeholder="User Role" readonly>
                    <label for="user_role_md_d">User Role</label>
                  </div>
                </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</form>
<!-- End User Level Modal-->
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

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/misc.js"></script>

</body>

</html>