<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Pending Tickets</h1>
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
        <table class="table table-borderless" id="ticket-pending-table">
          <thead>
            <tr>
              <th scope="col">Ticket Number</th>
              <th scope="col">Concern</th>
              <th scope="col">Date Filed</th>
              <th scope="col">Ticket Status</th>
              <th scope="col">Account ID</th>
              <th scope="col">User Level</th>
              <th scope="col">Claimed By</th>
              <th scope="col">View / Resolve</th>
            </tr>
          </thead>
          <tbody id="ticket-pending-data">
          </tbody>
        </table>

      </div>
    </div>
  </div><!-- End Recent Sales -->

  <form id="pending-ticket">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="pendingModal" tabindex="-1">
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
                      <label for="admin_id" class="col-sm-2 col-form-label">Assigned to</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="admin_id" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_role" class="col-sm-2 col-form-label">User Role</label>
                      <div class="col-sm-10">
                          <select id="admin_role" class="form-select" required>
                          </select>
                      </div>
                  </div>

          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#subscriptionModal" id="pend-resolve-ticket-btn" >Resolve</button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#invalidModal" id="invalid-ticket-btn" >Invalid</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

<form id="network-ticket-modal">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="networkModal" tabindex="-1">
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
                      <label for="ticket_num_net" class="col-sm-2 col-form-label">Ticket Number</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="ticket_num_net" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="account_id_net" class="col-sm-2 col-form-label">Account ID</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="account_id_net" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="customer_name_net" class="col-sm-2 col-form-label">Customer Name</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="customer_name_net" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_username_net" class="col-sm-2 col-form-label">Assigned to</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="admin_username_net" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_role_net" class="col-sm-2 col-form-label">User Role</label>
                      <div class="col-sm-10">
                          <select id="admin_role_net" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="duration_net" class="col-sm-2 col-form-label">Duration</label>
                      <div class="col-sm-10">
                          <input type="datetime" class="form-control" id="duration_net" placeholder="HH:MM:SS" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="resolution_details_net" class="col-sm-2 col-form-label">Resolution Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="resolution_details_net" required></textarea>
                      </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="resolve-subscription-btn">Resolve</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

<form id="subscription-ticket-modal">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="subscriptionModal" tabindex="-1">
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
                      <label for="ticket_num_sub" class="col-sm-2 col-form-label">Ticket Number</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="ticket_num_sub" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="concern_id_sub" class="col-sm-2 col-form-label">Concern</label>
                      <div class="col-sm-10">
                          <select id="concern_id_sub" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">    
                      <label for="concern_details_sub" class="col-sm-2 col-form-label">Concern Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="concern_details_sub" required></textarea>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="account_id_sub" class="col-sm-2 col-form-label">Account ID</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="account_id_sub" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="customer_name_sub" class="col-sm-2 col-form-label">Customer Name</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="customer_name_sub" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_username_sub" class="col-sm-2 col-form-label">Assigned to</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="admin_username_sub" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_role_sub" class="col-sm-2 col-form-label">User Role</label>
                      <div class="col-sm-10">
                          <select id="admin_role_sub" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="plan_id_sub" class="col-sm-2 col-form-label">Subscription Plan</label>
                      <div class="col-sm-10">
                          <select id="plan_id_sub" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="resolution_details_sub" class="col-sm-2 col-form-label">Resolution Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="resolution_details_sub" required></textarea>
                      </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="resolve-subscription-btn">Resolve</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

<form id="disconnect-ticket-modal">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="disconnectModal" tabindex="-1">
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
                      <label for="ticket_num_disc" class="col-sm-2 col-form-label">Ticket Number</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="ticket_num_disc" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="concern_id_disc" class="col-sm-2 col-form-label">Concern</label>
                      <div class="col-sm-10">
                          <select id="concern_id_disc" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">    
                      <label for="concern_details_disc" class="col-sm-2 col-form-label">Concern Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="concern_details_disc" required></textarea>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="account_id_disc" class="col-sm-2 col-form-label">Account ID</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="account_id_disc" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="customer_name_disc" class="col-sm-2 col-form-label">Customer Name</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="customer_name_disc" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_username_disc" class="col-sm-2 col-form-label">Assigned to</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="admin_username_disc" required>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="admin_role_disc" class="col-sm-2 col-form-label">User Role</label>
                      <div class="col-sm-10">
                          <select id="admin_role_disc" class="form-select" required>
                          </select>
                      </div>
                  </div>

                  <div class="row mb-3">
                      <label for="resolution_details_disc" class="col-sm-2 col-form-label">Resolution Details</label>
                      <div class="col-sm-10">
                          <textarea class="form-control" id="resolution_details_disc" required></textarea>
                      </div>
                  </div>

          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="resolve-disconnect-btn">Resolve</button>
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