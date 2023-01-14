<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="row pagetitle">
    <div class="col-md-9">
      <h1>View Plans</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">Plans</li>
        </ol>
      </nav>
    </div>

    <div class="col-md-3 justify-content-center">
      <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-plans" id="add-btn">+ Add New Plan</button>
    </div>
  </div><!-- End Page Title -->

  <!-- Plans Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">

        <ul class="nav nav-tabs d-flex" role="tablist">
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100 active" id="active-tab" data-bs-toggle="tab" data-bs-target="#active-plans" type="button" role="tab" aria-controls="active" aria-selected="true">Active</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="deactivated-tab" data-bs-toggle="tab" data-bs-target="#deactivated-plans" type="button" role="tab" aria-controls="deactivated" aria-selected="false">Deactivated</button>
          </li>
        </ul>

        <div class="tab-content pt-2">
          <!-- Active Plans -->
          <div class="tab-pane fade show active" id="active-plans" role="tabpanel" aria-labelledby="active-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="active-inclusions-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Select All: Inclusion</option>
                <option value="None">None</option>
              </select>
            </div>

            <!-- <div>
              <select id="status-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Select All: Status</option>
              </select>
            </div> -->
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="active-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Plan Name</th>
                  <th scope="col">Bandwidth</th>
                  <th scope="col">Price</th>
                  <th scope="col">Inclusion</th>
                  <th scope="col">Status</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody id="plan-data">
              </tbody>
            </table>
          </div>
          
          <!-- Deactivated Plans -->
          <div class="tab-pane fade" id="deactivated-plans" role="tabpanel" aria-labelledby="deactivated-tab">
            <!-- Filter Dropdown -->
            <div>
              <select id="deact-inclusions-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Select All: Inclusion</option>
                <option value="None">None</option>
              </select>
            </div>

            <!-- <div>
              <select id="status-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Select All: Status</option>
              </select>
            </div> -->
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="deactivated-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Plan Name</th>
                  <th scope="col">Bandwidth</th>
                  <th scope="col">Price</th>
                  <th scope="col">Inclusion</th>
                  <th scope="col">Status</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody id="plan-data">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div><!-- End Plans Table -->

<!-- Update Plan Modal -->
<form id="save-plan">
    <div class="modal fade" id="view-plans" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="plan_id" placeholder="Plan ID" readonly>
                    <label for="plan_id">Plan ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="plan_name" placeholder="Plan Name" required>
                    <div class="invalid-feedback">
                        Please enter a valid plan name.
                    </div>
                    <label for="plan_name">Plan Name</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="bandwidth" placeholder="Bandwidth" required>
                    <div class="invalid-feedback">
                        Please enter bandwidth.
                    </div>
                    <label for="bandwidth">Bandwidth</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="price" placeholder="Price" required>
                    <div class="invalid-feedback">
                        Please enter plan price.
                    </div>
                    <label for="price">Price</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <select id="plan_status_id" class="form-select" required></select>
                    <label for="plan_status_id">Status</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <select class="form-control selectpicker" id="inclusion" multiple aria-label="size 5 select example" data-actions-box="true"></select>
                    <label for="inclusion">Inclusion(s)</label>
                  </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="edit-plan">Edit</button>
              <button type="submit" class="btn btn-success" id="save-plan-btn" disabled>Save Changes</button>
            </div>
          </div>
        </div>
    </div><!-- End Modal Dialog Scrollable-->
</form>

<!-- Add New Plan Modal -->
<form id="add-plan" novalidate>
    <div class="modal fade" id="add-plans" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">Create Plan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="plan_name_add" placeholder="Plan Name" required>
                    <div class="invalid-feedback">
                        Please enter a valid plan name.
                    </div>
                    <label for="plan_name_add" class="required">Plan Name</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="number" class="form-control" id="bandwidth_add" placeholder="Bandwidth" min="5" required>
                    <div class="invalid-feedback">
                        Please enter bandwidth.
                    </div>
                    <label for="bandwidth_add" class="required">Bandwidth</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="number" class="form-control" id="price_add" min="1" placeholder="Price" required>
                    <div class="invalid-feedback">
                        Please enter plan price.
                    </div>
                    <label for="price_add" class="required">Price</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <select class="form-control selectpicker" id="inclusion_add" multiple aria-label="size 5 select example" data-actions-box="true"></select>
                    <label for="inclusion_add">Inclusion(s)</label>
                  </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success" id="add-plan-btn">Submit</button>
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

  <!-- Copied from Kyla -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css" integrity="sha512-mR/b5Y7FRsKqrYZou7uysnOdCIJib/7r5QeJMFvLNHNhtye3xJp1TdJVPLtetkukFn227nKpXD9OjUc09lx97Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/js/bootstrap-select.min.js" integrity="sha512-FHZVRMUW9FsXobt+ONiix6Z0tIkxvQfxtCSirkKc5Sb4TKHmqq1dZa8DphF0XqKb3ldLu/wgMa8mT6uXiLlRlw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/plans.js"></script>

</body>
</html>