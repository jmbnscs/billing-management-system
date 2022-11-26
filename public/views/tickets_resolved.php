<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Resolved Tickets</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Tickets</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Resolved Tickets Table -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <table class="table table-borderless" id="ticket-resolved-table">
          <thead>
            <tr>
              <th scope="col">Ticket Number</th>
              <th scope="col">Concern</th>
              <th scope="col">Date Filed</th>
              <th scope="col">Date Resolved</th>
              <th scope="col">Ticket Status</th>
              <th scope="col">Account ID</th>
              <th scope="col">Resolved By</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody id="ticket-resolved-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Resolved Tickets Table -->

<!-- Resolved Modal -->
<form id="view-ticket">
  <div class="modal fade" id="resolvedModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">

                  <div class="row mb-3">
                      <label for="account_id" class="col-sm-2 col-form-label">Account ID</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="account_id" readonly>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="concern_id" class="col-sm-2 col-form-label">Concern</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="concern_id" readonly>
                      </div>
                  </div>

                  <div class="row mb-3">    
                      <label for="concern_details" class="col-sm-2 col-form-label">Concern Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="concern_details" readonly></textarea>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="date_filed" class="col-sm-2 col-form-label">Date Filed</label>
                      <div class="col-sm-10">
                          <input type="date" class="form-control" id="date_filed" readonly>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="date_resolved" class="col-sm-2 col-form-label">Date Resolved</label>
                      <div class="col-sm-10">
                          <input type="date" class="form-control" id="date_resolved" readonly>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="resolution_details" class="col-sm-2 col-form-label">Resolution Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="resolution_details" readonly></textarea>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_username" class="col-sm-2 col-form-label">Resolved by</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="admin_username" readonly>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_role" class="col-sm-2 col-form-label">Admin Role</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="admin_role" readonly>
                      </div>
                  </div>

                  <div class="row mb-3">
                    <label for="ticket_status_id" class="col-sm-2 col-form-label">Ticket Status</label>
                    <div class="col-sm-5">
                        <input type="text" class="form-control text-center " id="ticket_status_id" value="" disabled>
                    </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
  </div>
  </form>

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
  <script src="../js/tickets.js"></script>

</body>
</html>