<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Profile</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">Profile</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section profile">
      <div class="row">
        <div class="col-xl-4">

          <div class="card">
            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

              <!-- <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"> -->
              <h2 id="profile-name"></h2>
              <h3 id="profile-role"></h3>
            </div>
          </div>

        </div>

        <div class="col-xl-8">

          <div class="card">
            <div class="card-body pt-3">
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview" id="overview-profile">Overview</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" id="edit-profile">Edit Profile</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password" id="password-change">Change Password</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-activity-logs" id="activity-logs">Activity Logs</button>
                </li>

              </ul>
              <div class="tab-content pt-2">

                <div class="tab-pane fade show active profile-overview " id="profile-overview">
                  <h5 class="card-title">Profile Details</h5>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label ">Full Name</div>
                    <div class="col-lg-9 col-md-8" id="full_name"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Email</div>
                    <div class="col-lg-9 col-md-8" id="email"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Mobile Number</div>
                    <div class="col-lg-9 col-md-8" id="mobile_number"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">First Name</div>
                    <div class="col-lg-9 col-md-8" id="first_name"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Middle Name</div>
                    <div class="col-lg-9 col-md-8" id="middle_name"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Last Name</div>
                    <div class="col-lg-9 col-md-8" id="last_name"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Birthday</div>
                    <div class="col-lg-9 col-md-8" id="birthdate"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Address</div>
                    <div class="col-lg-9 col-md-8" id="address"></div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Employment Date</div>
                    <div class="col-lg-9 col-md-8" id="employment_date"></div>
                  </div>

                </div>

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
                      <button type="submit" class="btn btn-primary">Save Changes</button>
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
                      <button type="submit" class="btn btn-primary">Change Password</button>
                    </div>

                  </form><!-- End Change Password Form -->

                </div>

                <!-- Activity Logs -->
                <div class="tab-content">
                  <div class="tab-pane fade" id="profile-activity-logs">
                    <div class="row-activity-tbl">
                      <div class="col-sm-11 m-auto">
                        <h5 class="card-title">Activity Logs</h5>
                          <div class="card overflow-auto activity-logs-tbl">
                          <table class="table-profile table-borderless" id="activity-logs-tbl">
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
                      </div>
                    </div>
                  </div>
                </div><!-- End Activity Logs -->

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
  <script src="../js/profile.js"></script>

</body>

</html>