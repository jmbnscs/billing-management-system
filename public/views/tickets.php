<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Active Tickets</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
        <li class="breadcrumb-item active">Tickets</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Recent Sales -->
  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">
        <table class="table table-borderless" id="ticket-table">
          <thead>
            <tr>
              <th scope="col">Ticket Number</th>
              <th scope="col">Concern</th>
              <th scope="col">Date Filed</th>
              <th scope="col">Ticket Status</th>
              <th scope="col">Account ID</th>
              <th scope="col">Inspect</th>
            </tr>
          </thead>
          <tbody id="ticket-data">
          </tbody>
        </table>

      </div>

    </div>
  </div><!-- End Recent Sales -->

  <form id="active-ticket">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="activeModal" tabindex="-1">
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
                      <label for="ticket_num" class="col-sm-2 col-form-label">Ticket Number</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="ticket_num" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="concern_id" class="col-sm-2 col-form-label">Concern</label>
                      <div class="col-sm-10">
                          <select id="concern_id" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">    
                      <label for="concern_details" class="col-sm-2 col-form-label">Concern Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="concern_details" required></textarea>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="date_filed" class="col-sm-2 col-form-label">Date Filed</label>
                      <div class="col-sm-10">
                          <input type="date" class="form-control" id="date_filed" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                    <label for="ticket_status_id" class="col-sm-2 col-form-label">Ticket Status</label>
                    <div class="col-sm-10">
                        <select id="ticket_status_id" class="form-select" required>
                        </select>
                    </div>
                  </div>

                  <div class="row mb-3">
                      <label for="account_id" class="col-sm-2 col-form-label">Account ID</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="account_id" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_role" class="col-sm-2 col-form-label">Assigned to</label>
                      <div class="col-sm-10">
                          <select id="admin_role" class="form-select" required>
                          </select>
                      </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#claimModal" id="claim-ticket-btn" >Claim</button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#invalidModal" id="invalid-ticket-btn" >Invalid</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

<form id="claim-ticket-modal">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="claimModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
                  <div class="row mb-3">
                      <label for="ticket_num_claim" class="col-sm-2 col-form-label">Ticket Number</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="ticket_num_claim" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_role_claim" class="col-sm-2 col-form-label">User Role</label>
                      <div class="col-sm-10">
                          <select id="admin_role_claim" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_id_claim" class="col-sm-2 col-form-label">Claimed by</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="admin_id_claim" required>
                      </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="claim-ticket">Claim</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

<form id="invalid-ticket-modal">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="invalidModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
                  <div class="row mb-3">
                      <label for="ticket_num_invalid" class="col-sm-2 col-form-label">Ticket Number</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="ticket_num_invalid" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="concern_id_invalid" class="col-sm-2 col-form-label">Concern</label>
                      <div class="col-sm-10">
                          <select id="concern_id_invalid" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">    
                      <label for="concern_details_invalid" class="col-sm-2 col-form-label">Concern Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="concern_details_invalid" required></textarea>
                      </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-danger" id="invalid-ticket">Invalid</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
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