<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

    <div class="pagetitle">
    <h1>User Level</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">Advanced Options</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section user-level">
      <div class="row" id="user-role-body">

        <!-- Templates -->

        <!-- <div class="col-sm-4 user-cards">
          <div class="card mt-3">
            <div class="card-body">
              <h5>Title</h5>
              <h6>Total users with this role: 1</h6>
              <ul>
                <li><span><i class="bi bi-check2-circle"></i></span>1</li>
                <li><span><i class="bi bi-check2-circle"></i></span>1</li>
                <li><span><i class="bi bi-check2-circle"></i></span>1</li>
              </ul>

              <button class="btn btn-outline-success">View Role</button>
              <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="x">Edit Role</button>
            </div>
          </div>
        </div> -->

      </div>

    
      <!-- <div class="row">

        <div class="col-xl-12">

          <div class="card">
            <div class="card-body pt-3">
              
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
        </div>

                </div>

                <div class="tab-pane fade add-user-level-tab pt-3 " id="add-user-level-tab">

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
                  </form>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div> -->
    </section>

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
                  <input type="text" class="form-control" id="user_role" required>
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