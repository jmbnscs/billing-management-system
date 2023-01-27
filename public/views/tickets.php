<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="row pagetitle">
    <div class="col-md-9">
      <h1>View Tickets</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
          <li class="breadcrumb-item active">Tickets</li>
        </ol>
      </nav>
    </div>
    
    <div class="col-md-3 justify-content-center">
      <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#create-ticket-modal">+ Create New Ticket</button>
    </div>
  </div><!-- End Page Title -->

  <div class="col-12">
    <div class="card recent-sales overflow-auto">
      <br>
      <div class="card-body">

        <ul class="nav nav-tabs d-flex" role="tablist">
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100 active" id="active-tab" data-bs-toggle="tab" data-bs-target="#active-tickets" type="button" role="tab" aria-controls="active" aria-selected="true">Active</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="resolved-tab" data-bs-toggle="tab" data-bs-target="#resolved-tickets" type="button" role="tab" aria-controls="resolved" aria-selected="false">Resolved</button>
          </li>
        </ul>

        <div class="tab-content pt-2">
          <!-- Active Tickets -->
          <div class="tab-pane fade show active" id="active-tickets" role="tabpanel" aria-labelledby="active-tab">

            <!-- Filter Dropdown -->
            <div>
              <select id="active-concerns-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Concerns</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="active-ticket-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ticket Number</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">Concern</th>
                  <th scope="col">Date Filed</th>
                  <th scope="col">Ticket Status</th>
                  <th scope="col">Claim / View</th>
                </tr>
              </thead>
              <tbody id="ticket-data">
              </tbody>
            </table>

          </div> <!-- End Active Tickets -->

          <!-- Resolved Tickets -->
          <div class="tab-pane fade" id="resolved-tickets" role="tabpanel" aria-labelledby="resolved-tab">

            <!-- Filter Dropdown -->
            <div>
              <select id="resolved-concerns-filter" class="form-select table-filter" style="display: inline; width: 200px; margin-left: 25px;">
                <option value="">Show All: Concerns</option>
              </select>
            </div>
            <!-- End Filter Dropdown -->

            <table class="table table-borderless" id="resolved-ticket-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ticket Number</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">Concern</th>
                  <th scope="col">Date Resolved</th>
                  <th scope="col">Resolved By</th>
                  <th scope="col">View</th>
                </tr>
              </thead>
              <tbody id="ticket-data">
              </tbody>
            </table>

          </div> <!-- End Resolved Tickets -->

        </div>

      </div>

    </div>
  </div>

<!-- Active Ticket Modal -->
<form id="active-ticket">
  <div class="modal fade" id="activeModal" tabindex="-1">
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
                      <input type="text" class="form-control" id="active_account_id" placeholder="Account ID" readonly>
                      <label for="active_account_id">Account ID</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="active_concern_id" placeholder="Concern" readonly>
                      <label for="active_concern_id">Concern</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <textarea class="form-control" id="active_concern_details" placeholder="Concern Details" readonly></textarea>
                      <label for="active_concern_details">Concern Details</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="date" class="form-control" id="active_date_filed" placeholder="Date Filed" readonly>
                      <label for="active_date_filed">Date Filed</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="active_admin_role" placeholder="Assigned to" readonly>
                      <label for="active_admin_role">Assigned to</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="col-sm-5">
                      <input type="text" class="form-control text-center " id="active_ticket_status_id" value="" disabled>
                    </div>
                  </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#claimModal" id="claim-btn" >Claim</button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#invalidModal" id="invalid-btn" >Invalid</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
</form>

<!-- Claim Ticket Modal -->
<form id="claim-ticket-modal">
  <div class="modal fade" id="claimModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
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
                      <input type="text" class="form-control" id="ticket_num_claim" placeholder="Ticket Number" readonly>
                      <label for="ticket_num_claim">Ticket Number</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="admin_role_claim" placeholder="Default User Assigned" readonly>
                      <label for="admin_role_claim">Default User Assigned</label>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-floating">
                      <input type="text" class="form-control" id="admin_id_claim" placeholder="Claimed by" readonly>
                      <label for="admin_id_claim">Claimed by</label>
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
  </div>
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
                      <textarea class="form-control" id="concern_details_invalid" readonly></textarea>
                      <label for="concern_details_invalid">Concern Details</label>
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

<!-- Resolved Ticket Modal -->
<div class="modal fade" id="resolvedModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
            <div class="row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="resolved_account_id" placeholder="Account ID" readonly>
                    <label for="resolved_account_id">Account ID</label>
                  </div>
                </div>
          
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="resolved_concern_id" placeholder="Concern" readonly>
                    <label for="resolved_concern_id">Concern</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <textarea class="form-control" id="resolved_concern_details" readonly></textarea>
                    <label for="resolved_concern_details">Concern Details</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="date" class="form-control" id="resolved_date_filed" placeholder="Date Filed" readonly>
                    <label for="resolved_date_filed">Date Filed</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="date" class="form-control" id="resolved_date_resolved" placeholder="Date Resolved" readonly>
                    <label for="resolved_date_resolved">Date Resolved</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <textarea class="form-control" id="resolved_resolution_details" readonly></textarea>
                    <label for="resolved_resolution_details">Resolution Details</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="resolved_admin_username" placeholder="Resolved by" readonly>
                    <label for="resolved_admin_username">Resolved by</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="resolved_admin_role" placeholder="Admin Role" readonly>
                    <label for="resolved_admin_role">Admin Role</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="col-sm-5">
                    <input type="text" class="form-control text-center " id="resolved_ticket_status_id" value="" disabled>
                  </div>
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

<!-- Create New Ticket Modal -->
<form id="create-ticket" novalidate>
  <div class="modal fade" id="create-ticket-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">New Ticket</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="text" class="form-control" id="ticket_num" placeholder="Ticket Number" data-bs-toggle="tooltip" data-bs-placement="top" title="This is auto-generated by the system." required readonly>
                  <label for="ticket_num" class="required">Ticket Number <i class="bi bi-info-circle ms-1"></i></label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <select class="form-control required" id="concern_id" required>
                    <option selected disabled value="">Select the type of concern:</option>
                  </select>
                  <div class="invalid-feedback">Please select concern category.</div>
                  <label for="concern_id">Concern</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <textarea class="form-control required" id="concern_details" rows="4" placeholder="Enter concern details..." required></textarea>
                  <div class="invalid-feedback">Please enter concern details.</div>
                  <label for="concern_details" class="required">Concern Details</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input type="date" class="form-control date_filed" id="date_filed" placeholder="Date Filed" autocomplete="off" required>
                  <div class="invalid-feedback">Please choose date filed.</div>
                  <label for="date_filed" class="required">Date Filed</label>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-floating">
                  <input list="accounts-list" type="text" class="form-control required" id="account_id" min="1" placeholder="Account ID" required>
                  <div class="invalid-feedback">Please enter a valid account id.</div>

                  <datalist id="accounts-list"></datalist>
                  <label for="account_id" class="required">Account ID</label>
                </div>
              </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success">Submit Ticket</button>
          </div>
        </div>
      </div>
  </div><!-- End Modal Dialog Scrollable-->
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

  <!-- Datepicker -->
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/tickets.js"></script>

</body>
</html>