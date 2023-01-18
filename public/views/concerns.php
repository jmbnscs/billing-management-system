<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

  <main id="main" class="main">

    <div class="pagetitle">
    <h1>Concerns</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Advanced Options</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section connection">
      <div class="row">
        <div class="col-xl-12">
          <div class="card overflow-auto">
            <!-- Bordered Tabs -->
            <div class="card-body pt-3">
              
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#concern-overview" id="overview-concern">Overview</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#add-concern-tab" id="edit-concern">Add Concern Category</button>
                </li>

              </ul>

              <div class="tab-content pt-2">

                <!-- Concern Details Table-->
                <div class="tab-pane fade show active concern-overview " id="concern-overview">
                  <h5 class="card-title">Concern Details</h5>

                  <div class="col-12">
                        <table class="table table-borderless" id="concern-table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Concern Category</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody id="concern-data">
                        </tbody>
                      </table>
                  </div>

                </div><!-- Concern Details Table -->

                <!-- Add New Concern Form -->
                <div class="tab-pane fade add-concern-tab pt-3 " id="add-concern-tab">
                  <form id="create-new">

                    <div class="row mb-3">  
                      <label for="concern_category" class="col-md-4 col-lg-3 col-form-label">Concern Category Name</label>
                      <div class="col-md-8 col-lg-5">
                        <input name="concern_category" type="text" class="form-control" id="concern_category" value="" required>
                        <!-- <br> -->
                        <!-- <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="customer_access" value="1">
                          <label class="form-check-label" for="customer_access">Customer Access</label>
                        </div> -->
                      </div>
                      
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary">Add Category</button>
                    </div>
                  </form>

                </div><!-- End Add New Concern Form -->

              </div>

            </div><!-- End Bordered Tabs -->
          </div>

        </div>
      </div>
    </section>

<!-- Concerns Modal -->
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
                    <input type="text" class="form-control" id="concern_id" placeholder="Concern ID" readonly>
                    <label for="concern_id">Concern ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="concern_category_md" placeholder="Concern Category Name" required>
                    <label for="concern_category_md">Concern Category Name</label>
                  </div>
                </div>

                <!-- <div class="col-md-12">
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" id="customer_access_md" value="1">
                    <label for="customer_access_md">Customer Access</label>
                  </div>
                </div> -->

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
</form> <!-- End Concerns Modal -->

<!-- Delete Concerns Modal -->
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
                    <input type="text" class="form-control" id="concern_id_d" placeholder="Concern ID" readonly>
                    <label for="concern_id_d">Concern ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="concern_category_md_d" placeholder="Concern Category Name" readonly>
                    <label for="concern_category_md_d">Concern Category Name</label>
                  </div>
                </div>

                <!-- <div class="col-md-12">
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" id="customer_access_md_d" value="1" disabled>
                    <label for="customer_access_md_d">Customer Access</label>
                  </div>
                </div> -->
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div><!-- End Concerns Modal-->
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