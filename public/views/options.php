<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Advanced Options</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Options</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

  <section class="section connection">
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body pt-3">
            
            <ul class="nav nav-tabs d-flex" role="tablist">
              <li class="nav-item flex-fill" role="presentation">
                <button class="nav-link w-100 active" id="connection-tab" data-bs-toggle="tab" data-bs-target="#connection-option" type="button" role="tab" aria-controls="connection" aria-selected="true">Connection</button>
              </li>
              <li class="nav-item flex-fill" role="presentation">
                <button class="nav-link w-100" id="concerns-tab" data-bs-toggle="tab" data-bs-target="#concerns-option" type="button" role="tab" aria-controls="concerns" aria-selected="false">Concerns</button>
              </li>
              <li class="nav-item flex-fill" role="presentation">
                <button class="nav-link w-100" id="inclusions-tab" data-bs-toggle="tab" data-bs-target="#inclusions-option" type="button" role="tab" aria-controls="inclusions" aria-selected="false">Inclusions</button>
              </li>
              <li class="nav-item flex-fill" role="presentation">
                <button class="nav-link w-100" id="area-tab" data-bs-toggle="tab" data-bs-target="#area-option" type="button" role="tab" aria-controls="area" aria-selected="false">Area</button>
              </li>
            </ul>
            
            <div class="tab-content pt-2">
              
              <!-- Connection Details-->
              <div class="tab-pane fade show active" id="connection-option">
                <div class="row">
                  <div class="col-md-9">
                    <h5 class="card-title">Connection Details</h5>
                  </div>

                  <div class="col-md-3 justify-content-center">
                    <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-connection-modal">+ Add New Connection</button>
                  </div>
                </div>
                

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
              <!-- End Connection Details -->

              <!-- Concern Details-->
              <div class="tab-pane fade" id="concerns-option">
                <div class="row">
                  <div class="col-md-9">
                    <h5 class="card-title">Concern Details</h5>
                  </div>

                  <div class="col-md-3 justify-content-center">
                    <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-concerns-modal">+ Add New Concern</button>
                  </div>
                </div>
                

                <div class="col-12">
                    <table class="table table-borderless" id="concern-table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Concern Category</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                </div>
              </div>
              <!-- End Concern Details -->

              <!-- Inclusions Details-->
              <div class="tab-pane fade" id="inclusions-option">
                <div class="row">
                  <div class="col-md-9">
                    <h5 class="card-title">Inclusions Details</h5>
                  </div>

                  <div class="col-md-3 justify-content-center">
                    <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-inclusion-modal">+ Add New Inclusion</button>
                  </div>
                </div>
                

                <div class="col-12">
                    <table class="table table-borderless" id="inclusions-table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Inclusion Name</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                </div>
              </div>
              <!-- End Inclusions Details -->

              <!-- Area Details-->
              <div class="tab-pane fade" id="area-option">
                <div class="row">
                  <div class="col-md-9">
                    <h5 class="card-title">Area Details</h5>
                  </div>

                  <div class="col-md-3 justify-content-center">
                    <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-area-modal">+ Add New Area</button>
                  </div>
                </div>
                

                <div class="col-12">
                    <table class="table table-borderless" id="areas-table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Area Name</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                </div>
              </div>
              <!-- End Area Details -->

            </div>
          </div>
          <!-- End Bordered Tabs -->

        </div>
      </div>
    </div>
  </section>

<!-- Add New Connection Form -->
<!-- <div class="tab-pane fade add-connection-tab pt-3 " id="add-connection-tab">
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

</div> -->
<!-- End Add New Connection Form -->

<!-- ------------------------------------------------------ Connection Modal -->
<!-- Add New Connection Modal -->
<form id="conn-create-new">
    <div class="modal fade" id="add-connection-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">New Connection</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="connection_name" placeholder="Connection Name" required>
                    <label for="connection_name">Connection Name</label>
                  </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
    </div>
</form>
<!-- End Add New Connection Modal -->

<form id="conn-update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="connEditModal" tabindex="-1">
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
<form id="conn-delete-data">
  <div class="modal fade" id="connDeleteModal" tabindex="-1">
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
  </div>
</form>
<!-- ------------------------------------------------------ End Connection Modal-->

<!-- ------------------------------------------------------ Concerns Modal -->
<!-- Add New Concerns Modal -->
<form id="concerns-create-new">
    <div class="modal fade" id="add-concerns-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">New Concern Category</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="concern_category" placeholder="Concern Category Name" required>
                  <label for="concern_category">Concern Category Name</label>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
    </div>
</form>
<!-- End Add New Concerns Modal -->

<form id="concerns-update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="concernsEditModal" tabindex="-1">
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
<form id="concerns-delete-data">
  <div class="modal fade" id="concernsDeleteModal" tabindex="-1">
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
  </div>
</form>
<!-- ------------------------------------------------------ End Concerns Modal-->

<!-- ------------------------------------------------------ Inclusion Modal -->
<!-- Add New Inclusion Modal -->
<form id="inclusion-create-new">
    <div class="modal fade" id="add-inclusion-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">New Inclusion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="inclusion_name" placeholder="Inclusion Name" required>
                    <label for="inclusion_name">Inclusion Name</label>
                  </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
    </div>
</form>
<!-- End Add New Inclusion Modal -->

<form id="inclusion-update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="inclusionEditModal" tabindex="-1">
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
                    <input type="text" class="form-control" id="inclusion_id" placeholder="Inclusion ID" readonly>
                    <label for="inclusion_id">Inclusion ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="inclusion_name_md" placeholder="Inclusion Name" required>
                    <label for="inclusion_name_md">Inclusion Name</label>
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
</form> <!-- End Inclusion Modal -->

<!-- Delete Inclusion Modal -->
<form id="inclusion-delete-data">
  <div class="modal fade" id="inclusionDeleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row g-3">
          
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="inclusion_id_d" placeholder="Inclusion ID" readonly>
                    <label for="inclusion_id_d">Inclusion ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="inclusion_name_md_d" placeholder="Inclusion Name" readonly>
                    <label for="inclusion_name_md_d">Inclusion Name</label>
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
<!-- ------------------------------------------------------ End Inclusion Modal-->

<!-- ------------------------------------------------------ Area Modal -->

<!-- Add New Area Modal -->
<form id="area-create-new">
    <div class="modal fade" id="add-area-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">New Area Name</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="area_name" placeholder="Area Name" required>
                    <label for="area_name">Area Name</label>
                  </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
    </div>
</form>
<!-- End Add New Area Modal -->

<form id="area-update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="areaEditModal" tabindex="-1">
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
                    <input type="text" class="form-control" id="area_id" placeholder="Area ID" readonly>
                    <label for="area_id">Area ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="area_name_md" placeholder="Area Name" required>
                    <label for="area_name_md">Area Name</label>
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
</form> <!-- End Area Modal -->

<!-- Delete Area Modal -->
<form id="area-delete-data">
  <div class="modal fade" id="areaDeleteModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="area_id_d" placeholder="Area ID" readonly>
                    <label for="area_id_d">Area ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="area_name_md_d" placeholder="Area Name" readonly>
                    <label for="area_name_md_d">Area Name</label>
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
<!-- ------------------------------------------------------ End Area Modal-->

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