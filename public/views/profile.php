<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div>

    <section class="section profile">
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

              </div>

              <div class="profile-details mt-4 p-0">
                <p>Admin ID <br><small class="text-secondary" id="admin_id"></small></p>

                <p>First Name <br><small class="text-secondary" id="first_name"></small></p>
                <p>Middle Name <br><small class="text-secondary" id="middle_name"></small></p>
                <p>Last Name <br><small class="text-secondary" id="last_name"></small></p>

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

          <div class="card">
            <div class="card-body pt-3">
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-activity-logs" id="activity-logs">Activity Logs</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" id="edit-profile">Edit Profile</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password" id="password-change">Change Password</button>
                </li>

              </ul>
              <div class="tab-content pt-2">
                <!-- Activity Logs -->
                  <div class="tab-pane fade show active" id="profile-activity-logs">
                    <div class="row activity-tbl">
                      <!-- <div class="col-sm-11 m-auto"> -->
                        <h5 class="card-title">Activity Logs</h5>
                          <div class="container overflow-auto activity-logs-tbl">
                          <table class="table table-borderless" id="activity-logs-tbl">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Page</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">View</th>
                              </tr>
                            </thead>
                            <tbody>
                            </tbody>
                          </table>
                        </div>
                      <!-- </div> -->
                    </div>
                  </div>
                <!-- End Activity Logs -->

                <div class="tab-pane fade profile-edit pt-3 " id="profile-edit">

                  <!-- Profile Edit Form -->
                  <form id="edit-form">

                    <div class="row mb-3">
                      <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="fullName" type="text" class="form-control" id="fullName" value="" disabled>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="edit-bday" class="col-md-4 col-lg-3 col-form-label">Birthdate</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="edit-bday" type="date" class="form-control" id="edit-bday" value="" disabled>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="email" type="email" class="form-control" id="edit-email" value="" required>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="edit-number" class="col-md-4 col-lg-3 col-form-label">Mobile Number</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="edit-number" type="text" class="form-control" id="edit-number" value="" placeholder="Ex. 09XXXXXXXXX" pattern="[0]{1}[9]{1}[0-9]{9}" required>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="Address" class="col-md-4 col-lg-3 col-form-label">Address</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="address" type="text" class="form-control" id="edit-address" value="" required>
                      </div>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary" id="edit-btn">Save Changes</button>
                    </div>
                  </form><!-- End Profile Edit Form -->

                </div>

                <div class="tab-pane fade profile-change-password pt-3 " id="profile-change-password">
                  <!-- Change Password Form -->
                  <form id="change-password">

                    <div class="row mb-3">
                      <label for="current-password" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="current-password" type="password" class="form-control" id="current-password" autocomplete="off" required>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="new-password" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="new-password" type="password" class="form-control" id="new-password" autocomplete="off" minlength="8" required>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="re-new-password" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="re-new-password" type="password" class="form-control" id="re-new-password" autocomplete="off" minlength="8" required>
                      </div>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary" id="change-pw-btn">Change Password</button>
                    </div>

                  </form><!-- End Change Password Form -->

                </div>

                

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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

  </main><!-- End #main -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

 
  <!-- Vendor JS Files -->
  <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/profile.js"></script>

</body>

</html>