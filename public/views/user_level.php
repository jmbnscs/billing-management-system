<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

  <main id="main" class="main">

    <div class="pagetitle">
    <h1>Advanced Options</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.html">Home</a></li>
          <li class="breadcrumb-item active">User-Level</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section User-Level">
      <div class="row">

        <div class="col-xl-12">

          <div class="card">
            <div class="card-body pt-3">
              
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview" id="overview-profile">Overview</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#add-User-Level" id="edit-profile">Add User-Level</button>
                </li>

              </ul>
              <div class="tab-content pt-2">

                <div class="tab-pane fade show active profile-overview " id="profile-overview">
                  <h5 class="card-title">User-Level Details</h5>

        <!-- User-Level Details Table-->
                <div class="col-12">
                <div class="card userlevel-details overflow-auto">
                <br>
                <div class="card-body">
                  <table class="table table-borderless" id="userlevel-table">
                    <thead>
                      <tr>
                        <th scope="col">User-Level ID</th>
                        <th scope="col">User-Level</th>
                      </tr>
                    </thead>
                    <tbody id="userlevel-data">
                  </tbody>
                </table>
              </div>

              </div>
     </div><!-- User-Level Details Table -->

                </div>

                <div class="tab-pane fade add-User-Level pt-3 " id="add-User-Level">

                  <!-- Add New User-Level Form -->
                  <form id="edit-form">

                    <div class="row mb-3">
                      <label for="User-Level_name" class="col-md-4 col-lg-3 col-form-label">User Level Name</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="User-Level_name" type="text" class="form-control" id="User-Level_name" value="" required>
                      </div>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary">Add User-Level</button>
                    </div>
                  </form><!-- end Add New User-Level Form -->

                </div>

              </div><!-- End Bordered Tabs -->

            </div>
          </div>

        </div>
      </div>
    </section>

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