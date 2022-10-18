<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Customers</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
      <li class="breadcrumb-item active">Add New Account</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<section class="section customers">
  <div class="row">
    <div class="col-mb-8">

      <div class="card">
        <div class="card-body pt-4">
            
        <form >
                <div class="row mb-3">
                    <label for="first_name" class="col-sm-2 col-form-label">First Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="first_name" required>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <label for="middle_name" class="col-sm-2 col-form-label">Middle Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="middle_name">
                    </div>
                </div>
        
                <div class="row mb-3">    
                    <label for="last_name" class="col-sm-2 col-form-label">Last Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="last_name" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="billing_address" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="billing_address" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="mobile_number" class="col-sm-2 col-form-label">Mobile Number</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="mobile_number" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="email" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" placeholder="name@example.com" id="email" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="birthdate" class="col-sm-2 col-form-label">Birthdate</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="birthdate" required>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="start_date" class="col-sm-2 col-form-label">Start Date</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="start_date" required>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="plan_name" class="col-sm-2 col-form-label">Subscription Type</label>
                    <div class="col-sm-10">
                        <select id="plan_name" class="form-select" required>
                            <option selected>Subscription</option>
                            <option>Plan 100</option>
                            <option>Plan 1250</option>
                            <option>Plan 1500</option>
                            <option>Plan 1899</option>
                            <option>Plan 2250-Business Plan</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="plan_id" class="col-sm-2 col-form-label">Plan Type</label>
                    <div class="col-sm-10">
                        <select id="plan_id" class="form-select" required>
                            <option selected>Plan</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="connection_id" class="col-sm-2 col-form-label">Connection Type</label>
                    <div class="col-sm-10">
                        <select id="connection_id" class="form-select" required>
                            <option selected>Connection</option>
                            <option>OLT</option>
                            <option>PPPOE</option>
                        </select>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="area_id" class="col-sm-2 col-form-label">Area</label>
                    <div class="col-sm-10">
                        <select id="area_id" class="form-select" required>
                            <option selected>Area</option>
                            <option>Area I</option>
                            <option>Area II</option>
                            <option>Area III</option>
                            <option>Area IV</option>
                            <option>Area V</option>
                            <option>Area VI</option>
                            <option>Area VII</option>
                            <option>Area VIII</option>
                            <option>Area IX</option>
                            <option>Area X</option>
                        </select>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="account_id" class="col-sm-2 col-form-label">Account ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="account_id" readonly>
                    </div>
                </div>
        
                <div class="row mb-3">
                    <label for="customer_password" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="customer_password" class="form-control" placeholder="Password" id="password" disabled>
                    </div>
                </div>

                <div class ="text-center">
                    <button type="submit" class="btn btn-primary">Save Account</button>
                </div>

            </form>


        </div>
      </div>

    </div>
  </div>
</section>

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

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/customers.js"></script>

</body>
</html>