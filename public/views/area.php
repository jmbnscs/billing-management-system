<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

  <main id="main" class="main">

    <div class="pagetitle">
    <h1>Advanced Options</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.html">Home</a></li>
          <li class="breadcrumb-item active">Area</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section Area">
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
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#add-Area" id="edit-profile">Add Area</button>
                </li>

              </ul>
              <div class="tab-content pt-2">

                <div class="tab-pane fade show active profile-overview " id="profile-overview">
                  <h5 class="card-title">Area Details</h5>

        <!-- Area Details Table-->
                <div class="col-12">
                <div class="card Area-details overflow-auto">
                <br>
                <div class="card-body">
                  <table class="table table-borderless" id="areas-table">
                    <thead>
                      <tr>
                        <th scope="col">Area ID</th>
                        <th scope="col">Area Type</th>
                      </tr>
                    </thead>
                    <tbody id="areas-data">
                  </tbody>
                </table>
              </div>

              </div>
     </div><!-- Area Details Table -->

                </div>

                <div class="tab-pane fade add-Area pt-3 " id="add-Area">

                  <!-- Add New Area Form -->
                  <form id="edit-form">

                    <div class="row mb-3">
                      <label for="Area_name" class="col-md-4 col-lg-3 col-form-label">Area Name</label>
                      <div class="col-md-8 col-lg-9">
                        <input name="Area_name" type="text" class="form-control" id="Area_name" value="" required>
                      </div>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary">Add Area</button>
                    </div>
                  </form><!-- end Add New Area Form -->

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