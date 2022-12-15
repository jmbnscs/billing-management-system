<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Advanced Options</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">Connection</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

  <section class="section connection">
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body pt-3">
            
            <!-- Bordered Tabs -->
            <ul class="nav nav-tabs nav-tabs-bordered">
              <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#connection-overview" id="overview-connection">Overview</button>
              </li>
              <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#add-connection-tab" id="edit-connection">Add New Connection</button>
              </li>
            </ul>
            
            <div class="tab-content pt-2">
              <!-- Connection Details Table-->
              <div class="tab-pane fade show active connection-overview " id="connection-overview">
                <h5 class="card-title">Connection Details</h5>

                <div class="col-12">
                    <table class="table table-borderless" id="connections-table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Connection Type</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                </div>
              </div>
              <!-- End Connection Details Table -->

              <!-- Add New Connection Form -->
              <div class="tab-pane fade add-connection-tab pt-3 " id="add-connection-tab">
                <form id="create-new">
                  <div class="row mb-3">
                    <label for="connection_name" class="col-md-4 col-lg-3 col-form-label">Connection Name</label>
                    <div class="col-md-8 col-lg-9">
                      <input name="connection_name" type="text" class="form-control" id="connection_name" value="" required>
                    </div>
                  </div>

                  <div class="text-center">
                    <button type="submit" class="btn btn-primary">Add Connection</button>
                  </div>
                </form>

              </div>
              <!-- End Add New Connection Form -->
            </div>
          </div>
          <!-- End Bordered Tabs -->

        </div>
      </div>
    </div>
  </section>

<!-- Connection Modal -->
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
                    <input type="text" class="form-control" id="connection_id" placeholder="Connection ID" readonly>
                    <label for="connection_id">Connection ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="connection_name_md" placeholder="Connection Name" required>
                    <label for="connection_name_md">Connection Name</label>
                  </div>
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
</form> <!-- End Connection Modal -->

<!-- Delete Connection Modal -->
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
                    <input type="text" class="form-control" id="connection_id_d" placeholder="Connection ID" readonly>
                    <label for="connection_id_d">Connection ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="connection_name_md_d" placeholder="Connection Name" readonly>
                    <label for="connection_name_md_d">Connection Name</label>
                  </div>
                </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div><!-- End Connection Modal-->
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

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/misc.js"></script>

</body>

</html>