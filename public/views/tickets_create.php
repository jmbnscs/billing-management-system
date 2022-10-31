<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Create a Ticket</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
      <li class="breadcrumb-item active">Tickets</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<section class="section ticket-create">
  <div class="row">
    <div class="col-mb-8">

      <div class="card">
        <div class="card-body pt-4">
            
        <form id="create-ticket">
                <div class="row mb-3">
                    <label for="ticket_num" class="col-sm-2 col-form-label">Ticket Number</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="ticket_num" readonly>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <label for="concern_id" class="col-sm-2 col-form-label">Concern</label>
                    <div class="col-sm-10">
                        <select id="concern_id" class="form-select" required>
                            <option selected>Select the type of concern:</option>
                        </select>
                    </div>
                </div>
        
                <div class="row mb-3">    
                    <label for="concern_details" class="col-sm-2 col-form-label">Concern Details</label>
                    <div class="col-sm-10">
                    <textarea class="form-control" id="concern_details" rows="4" placeholder="Enter concern details..." required></textarea>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="date_filed" class="col-sm-2 col-form-label">Date Filed</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="date_filed">
                    </div>
                </div>
        
                <!-- <div class="row mb-3">
                    <label for="duration" class="col-sm-2 col-form-label">Duration</label>
                    <div class="col-sm-10">
                        <input type="datetime" class="form-control" id="duration" placeholder="HH:MM:SS">
                    </div>
                </div> -->

                <div class="row mb-3">
                    <label for="account_id" class="col-sm-2 col-form-label">Account ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="account_id">
                    </div>
                </div>

                <!--Dropdown for Admin ID - Assign  to... -->
                <div class="row mb-3">
                    <label for="admin_role" class="col-sm-2 col-form-label">Assign to</label>
                    <div class="col-sm-10">
                        <select id="admin_role" class="form-select" required>
                            <option selected disabled value="">Choose Admin</option>
                        </select>
                    </div>
                </div>
        
                <div class ="text-center">
                    <button type="submit" class="btn btn-primary">Submit Ticket</button>
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
  <script src="../js/tickets.js"></script>

</body>
</html>