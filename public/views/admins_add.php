<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Add New Admin</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
      <li class="breadcrumb-item active">Admins</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<section class="section admin-add">
  <div class="row">
    <div class="col-mb-8">

      <div class="card">
        <div class="card-body pt-4">
            <form id="add-admin">

                    <div class="row mb-3">
                        <label for="admin_id" class="col-sm-2 col-form-label">Admin ID</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="admin_id" disabled>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="first_name" class="col-sm-2 col-form-label">First Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="first_name" placeholder="Ex. Juan" size="50" minlength="2" required>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="middle_name" class="col-sm-2 col-form-label">Middle Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="middle_name" placeholder="Ex. Santos" >
                        </div>
                    </div>
            
                    <div class="row mb-3">    
                        <label for="last_name" class="col-sm-2 col-form-label">Last Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="last_name" placeholder="Ex. Dela Cruz" size="50" minlength="2" required>
                        </div>
                    </div>
            
                    <div class="row mb-3">
                        <label for="mobile_number" class="col-sm-2 col-form-label">Mobile Number</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="mobile_number" placeholder="Ex. 09XXXXXXXXX" pattern="[0]{1}[9]{1}[0-9]{9}" required>
                        </div>
                    </div>
            
                    <div class="row mb-3">
                        <label for="admin_email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" placeholder="Ex. name@example.com" id="admin_email" required>
                        </div>
                    </div>
            
                    <div class="row mb-3">
                        <label for="admin_bday" class="col-sm-2 col-form-label">Birthday</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control admin_bday" id="admin_bday" autocomplete="off" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="address" class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="address" rows="2" placeholder="Ex. Anonas Street Sta. Mesa Manila" required></textarea>
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
                                <option selected disabled value="">Choose Admin Level</option>
                            </select>
                        </div>
                    </div>

                    <div class ="text-center">
                        <button type="submit" class="btn btn-success">Create Account</button>
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

  <!-- Datepicker -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/admins.js"></script>

</body>
</html>