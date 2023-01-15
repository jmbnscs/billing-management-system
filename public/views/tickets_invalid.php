<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Invalid Tickets</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Tickets</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Invalid Tickets Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">

        <!-- Filter Dropdown -->
        <div>
          <select id="invalid-concerns-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
            <option value="">Show All: Concerns</option>
          </select>
        </div>
        <!-- End Filter Dropdown -->

        <table class="table table-borderless" id="ticket-invalid-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ticket Number</th>
              <th scope="col">Account ID</th>
              <th scope="col">Concern</th>
              <th scope="col">Date Filed</th>
              <th scope="col">Invalidated By</th>
              <th scope="col">View / Delete</th>
            </tr>
          </thead>
          <tbody id="ticket-invalid-data">
          </tbody>
        </table>

      </div>
    </div>
  </div><!-- End Invalid Tickets Table -->

<!-- Invalid Ticket Modal -->
<form id="invalidated-ticket-modal">
  <div class="modal fade" id="invalidatedModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
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
                      <input type="text" class="form-control" id="account_id" placeholder="Account ID" readonly>
                      <label for="account_id">Account ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="concern_id" placeholder="Concern" readonly>
                      <label for="concern_id">Concern</label>
                    </div>
                  </div>
                  
                  <div class="col-md-12">
                    <div class="form-floating">
                      <textarea class="form-control" id="concern_details" readonly></textarea>
                      <label for="concern_details">Concern Details</label>
                    </div>
                  </div>
                  
                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="date" class="form-control" id="date_filed" placeholder="Date Filed" readonly>
                      <label for="date_filed">Date Filed</label>
                    </div>
                  </div>
                  
                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="admin_id" placeholder="Claimed By" readonly>
                      <label for="admin_id">Claimed By</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="col-sm-5">
                      <input type="text" class="form-control text-center " id="ticket_status_id" value="" disabled>
                    </div>
                  </div>

          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" id="reactivate-btn">Re-Activate</button>
            <button type="button" class="btn btn-danger" id="delete-btn">Delete</button>
          </div>
        </div>
      </div>
  </div>
</form>

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