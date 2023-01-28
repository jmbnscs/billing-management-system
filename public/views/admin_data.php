<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <!-- Page Title -->
  <div class="pagetitle">
    <h1>Admin Details</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Admins</li>
        </ol>
      </nav>
  </div><!-- End Page Title -->

  <!-- Admin Data Tabs -->
  <section class="section admin-data">
    <div class="row">
      <div class="col-xl-4">
          <div class="card">
            <div class="mx-auto mt-4 d-block admin-icon" id="admin-icon"></div>
            <div class="card-body p-3">
              <div>
                <h4 class="text-center fw-bold" id="admin-name"></h4>
                <h6 class="text-center fw-light fst-italic"><span id="role-name"></span></h6>
              </div>

              <div class="mt-3 row border-bottom">
                <div class="col-sm-9 pt-3">
                  <h5 class="fw-bold">Details</h5>
                </div>

                <div class="col-sm-3 mb-1">
                  <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#edit-admin" id="edit-btn">Edit</button>
                </div>
              </div>

              <div class="profile-details mt-4 p-0">
                <p>Admin ID <br><small class="text-secondary" id="admin_id"></small></p>
                <p>Employment Date <br><small class="text-secondary" id="employment_date"></small></p>
                <p>Address <br><small class="text-secondary" id="address"></small></p>
                <p>Mobile Number <br><small class="text-secondary" id="mobile_number"></small></p>
                <p>Email <br><small class="text-secondary" id="admin_email"></small></p>

                <p>Birthday <br><small class="text-secondary" id="birthdate"></small></p>
                <p>Admin Status <br><small class="text-secondary" id="admin_status"></small></p>
              </div>

            </div>

          </div>
      </div>
      <div class="col-xl-8">
        <!-- Navigation Tabs -->
        <!-- Bordered Tabs -->
          <ul class="nav nav-tabs-customer d-flex">

            <li class="nav-item flex-fill">
              <button class="nav-link active w-100" data-bs-toggle="tab" data-bs-target="#admin-overview" id="admin-overview-tab">Activity</button>
            </li>

            <li class="nav-item flex-fill">
              <button class="nav-link w-100" data-bs-toggle="tab" data-bs-target="#admin-ticket" id="admin-ticket-tab">Ticket</button>
            </li>

          </ul><!-- End Bordered Tabs -->

        <br>
        <!-- Tab Contents -->

        <!-- Admin Logs -->
        <div class="tab-content">
            <div class="tab-pane fade show active admin-overview" id="admin-overview">
                <div class="card">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="p-2">
                                <h5 class="card-title p-2">Logs</h5>

                                <!-- Filter Dropdown -->
                                <div>
                                  <select id="pages-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                                    <option value="">Select All: Pages</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Invoice">Invoice</option>
                                    <option value="Plan">Plan</option>
                                    <option value="Ticket">Ticket</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Profile">Profile</option>
                                    <option value="Payment">Payment</option>
                                  </select>
                                </div>

                                <table class="table table-borderless" id="activity-table">
                                    <thead class="table-light">
                                        <tr>
                                          <th scope="col">#</th>
                                          <th scope="col">Page</th>
                                          <th scope="col">Date</th>
                                          <th scope="col">Time</th>
                                          <th scope="col">View</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
          </div>
        </div> 

        <!-- Admin Tickets -->
        <div class="tab-content">
            <div class="tab-pane fade show admin-ticket" id="admin-ticket">
                <div class="card">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="p-2">
                                <h5 class="card-title p-2">Ticket History</h5>

                                <div>
                                  <select id="status-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                                    <option value="">Select All: Status</option>
                                  </select>
                                </div>

                                <table class="table table-borderless" id="tickets-table">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Ticket #</th>
                                            <th scope="col">Concern</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
          </div>
        </div>

        <!-- End Tab Contents -->

      </div>
    </div>
  </section>

<!-- Edit Admin Modal -->
<form id="save-admin">
  <div class="modal fade" id="edit-admin" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title">Update Admin Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <div class="row g-3">
            <div class="row pt-2">
                <div class="col-md-12">
                    <div class="form-floating">
                    <input type="text" class="form-control" id="address_edt" placeholder="Address" required>
                    <label for="address_edt">Address</label>
                    </div>
                </div>
            </div>

            <div class="row pt-2">
                <div class="col-md-12">
                    <div class="form-floating">
                    <input type="text" class="form-control" id="mobile_number_edt" placeholder="Mobile Number" pattern="[0]{1}[9]{1}[0-9]{9}" size="11" maxlength="11" required>
                    <label for="mobile_number_edt">Mobile Number</label>
                    </div>
                </div>
            </div>

            <div class="row pt-2">
                <div class="col-md-12">
                    <div class="form-floating">
                    <input type="email" class="form-control" id="email_edt" placeholder="Email" required>
                    <label for="email_edt">Email</label>
                    </div>
                </div>
            </div>

            <div class="row pt-2">
              <div class="col-md-12" id="admin-role-select">
                  <div class="form-floating">
                  <select id="admin_role_edt" class="form-select"></select>
                  <label for="admin_role_edt">Admin Role</label>
                  </div>
              </div>
            </div>

            <div class="row pt-2">
              <div class="col-md-12" id="admin-status-select">
                  <div class="form-floating">
                  <select id="admin_status_edt" class="form-select"></select>
                  <label for="admin_status_edt">Admin Status</label>
                  </div>
              </div>
            </div>

          </div>

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#reset-pw-modal" id="reset-btn">Reset Password</button>
          <button type="submit" class="btn btn-success">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</form>

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

<!-- Ticket History Modal -->
<div class="modal fade" id="view-ticket" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <div class="row mb-3">
            <label for="ticket_num" class="col-sm-4 col-form-label">Ticket #</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="ticket_num" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="concern_category" class="col-sm-4 col-form-label">Concern Category</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="concern_category" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="concern_details" class="col-sm-4 col-form-label">Concern Details</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="concern_details" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="date_filed" class="col-sm-4 col-form-label">Date Filed</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="date_filed" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="resolution_details" class="col-sm-4 col-form-label">Resolution Details</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="resolution_details" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="date_resolved" class="col-sm-4 col-form-label">Date Resolved</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="date_resolved" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="admin_id" class="col-sm-4 col-form-label">Admin</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="admin_id" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="ticket_status" class="col-sm-4 col-form-label">Status</label>
            <div class="col-sm-4">
              <input type="text" class="form-control text-center " id="ticket_status" value="" readonly>
            </div>
          </div>

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</div>

<!-- Activity Logs Modal -->
<div class="modal fade" id="view-activity-modal" tabindex="-1">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
      <!--   <div class="row mb-3">
          <label for="activity_id" class="col-sm-4 col-form-label">ID</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="activity_id" value="" readonly>
          </div>
        </div> -->

        <div class="row mb-3">
          <label for="activity_page" class="col-sm-4 col-form-label">Page</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="activity_page" value="" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <label for="activity_made" class="col-sm-4 col-form-label">Activity</label>
          <div class="col-sm-8">
            <textarea type="text" class="form-control" id="activity_made" rows="2" value="" readonly></textarea>
          </div>
        </div>

        <div class="row mb-3">
          <label for="activity_date" class="col-sm-4 col-form-label">Date</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="activity_date" value="" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <label for="activity_time" class="col-sm-4 col-form-label">Time</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="activity_time" value="" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <label for="activity_address" class="col-sm-4 col-form-label">IP Address</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="activity_address" value="" readonly>
          </div>
        </div>

        <div class="row mb-3">
          <label for="activity_user_agent" class="col-sm-4 col-form-label">User Agent</label>
          <div class="col-sm-8">
            <textarea type="text" class="form-control" id="activity_user_agent" rows="4" value="" readonly></textarea>
          </div>
        </div>

      </div>
      <!-- End Modal Body -->

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

</main>

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

  <!-- Datatable -->
  <script src="https://cdn.datatables.net/buttons/2.3.2/js/dataTables.buttons.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
  <script src="https://cdn.datatables.net/buttons/2.3.2/js/buttons.html5.min.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/admin_data.js" type="module"></script>

</body>
</html>