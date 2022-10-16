<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Add New Admin</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard.html">Home</a></li>
      <li class="breadcrumb-item">Admin</li>
      <li class="breadcrumb-item active">Add New Admin</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<section class="section admin">
  <div class="row">
    <div class="col-mb-4">

      <div class="card">
        <div class="card-body admin-card pt-4 d-flex flex-column align-items-center">

          <!-- <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"> -->
          <h2>Add New Admin</h2>
          <h3></h3>
        </div>
      </div>

    </div>

    <div class="col-mb-8">

      <div class="card">
        <div class="card-body pt-4">
            
        <form>
                <div class="row mb-3">
                    <label for="first_name" class="col-sm-2 col-form-label">First Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="first_name" placeholder="Ex. Juan" required>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <label for="middle_name" class="col-sm-2 col-form-label">Middle Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="middle_name" placeholder="Ex. Santos" required>
                    </div>
                </div>
        
                <div class="row mb-3">    
                    <label for="last_name" class="col-sm-2 col-form-label">Last Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="last_name" placeholder="Ex. Dela Cruz" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="admin_username" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="admin_username" placeholder="admin_username" readonly>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="admin_password" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="customer_password" class="form-control" placeholder="admin_password" id="password" readonly>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="admin_email" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" placeholder="name@example.com" id="admin_email" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="admin_bday" class="col-sm-2 col-form-label">Birthday</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="admin_bday" placeholder="Ex. 03/02/2001" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="employment_date" class="col-sm-2 col-form-label">Employment Date</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="employment_date" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="role" class="col-sm-2 col-form-label">Admin Level</label>
                    <div class="col-sm-10">
                        <select id="role" class="form-select" required>
                            <option selected>Select admin level:</option>
                            <option value = 2>Manager</option>
                            <option value = 3>Administrator</option>
                            <option value = 4>Sales Agent</option>
                            <option value = 5>Technical Support</option>
                            <option value = 6>Technician</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="admin_status" class="col-sm-2 col-form-label">Employment Status</label>
                    <div class="col-sm-10">
                        <select id="admin_status" class="form-select" required>
                            <option selected>Select employment status:</option>
                            <option>Employed</option>
                            <option>Suspended</option>
                            <option>Locked</option>
                            <option>Resigned</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="mobile_number" class="col-sm-2 col-form-label">Mobile Number</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="mobile_number" placeholder="Ex. 09234567891" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="address" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                    <textarea class="form-control" id="address" rows="2" placeholder="Ex. Anonas Street Sta. Mesa Manila" required></textarea>
                    </div>
                </div>

                <div class ="d-grid gap-2 col-6 mx-auto admin_submit_btn">
                    <button type="submit" class="btn btn-outline-primary">Save Account</button>
                </div>

            </form>


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
  <script src="../js/admins.js"></script>

</body>
</html>