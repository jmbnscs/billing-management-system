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

  <!-- Pending Tickets Table -->
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
              <th scope="col">Account ID</th>
              <th scope="col">User Level</th>
              <th scope="col">Claimed By</th>
              <th scope="col">Ticket Status</th>
              <th scope="col">View / Resolve</th>
            </tr>
          </thead>
          <tbody id="ticket-pending-data">
          </tbody>
        </table>

      </div>
    </div>
  </div><!-- End Pending Tickets Table -->

<!-- Pending Ticket Modal -->
<form id="pending-ticket">
  <div class="modal fade" id="pendingModal" tabindex="-1">
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
                      <input type="text" class="form-control" id="concern_details" placeholder="Concern Details" readonly>
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
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#subscriptionModal" id="resolve-btn" >Resolve</button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#invalidModal" id="invalid-btn" >Invalid</button>
          </div>
        </div>
      </div>
  </div>
</form>

<!-- Resolve Network Modal -->
<form id="network-ticket-modal">
  <div class="modal fade" id="networkModal" tabindex="-1">
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
                      <input type="text" class="form-control" id="account_id_net" placeholder="Account ID" readonly>
                      <label for="account_id_net">Account ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="customer_name_net" placeholder="Customer Name" readonly>
                      <label for="customer_name_net">Customer Name</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="datetime" class="form-control" id="duration_net" placeholder="HH:MM:SS" required>
                      <label for="duration_net">Duration</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <textarea class="form-control" id="resolution_details_net" required></textarea>
                      <label for="resolution_details_net">Resolution Details</label>
                    </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="resolve-network-btn">Resolve</button>
          </div>
        </div>
      </div>
  </div>
</form>

<!-- Resolve Subscription Modal -->
<form id="subscription-ticket-modal">
  <div class="modal fade" id="subscriptionModal" tabindex="-1">
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
                      <input type="text" class="form-control" id="account_id_sub" placeholder="Account ID" readonly>
                      <label for="account_id_sub">Account ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="customer_name_sub" placeholder="Customer Name" readonly>
                      <label for="customer_name_sub">Customer Name</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <select id="plan_id_sub" class="form-select" required></select>
                      <label for="plan_id_sub">Subscription Plan</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <textarea class="form-control" id="resolution_details_sub" placeholder="Resolution Details" required></textarea>
                      <label for="resolution_details_sub">Resolution Details</label>
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
  </div>
</form>

<!-- Resolve Default Modal -->
<form id="default-ticket-modal">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="defaultModal" tabindex="-1">
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
                      <input type="text" class="form-control" id="account_id_disc" placeholder="Account ID" readonly>
                      <label for="account_id_disc">Account ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="customer_name_disc" placeholder="Customer Name" readonly>
                      <label for="customer_name_disc">Customer Name</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <textarea class="form-control" id="resolution_details_disc" placeholder="Resolution Details" required></textarea>
                      <label for="resolution_details_disc">Resolution Details</label>
                    </div>
                  </div>

          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="resolve-default-btn">Resolve</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

<!-- Invalid Ticket Modal -->
<form id="invalid-ticket-modal">
  <div class="modal fade" id="invalidModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Invalidate Ticket?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="ticket_num_invalid" placeholder="Ticket Number" readonly>
                      <label for="ticket_num_invalid">Ticket Number</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="concern_id_invalid" placeholder="Concern" readonly>
                      <label for="concern_id_invalid">Concern</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="concern_details_invalid" placeholder="Concern Details" readonly>
                      <label for="concern_details_invalid">Concern Detailsr</label>
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