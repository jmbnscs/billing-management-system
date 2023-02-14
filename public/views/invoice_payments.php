<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1>Payment Records</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
        <li class="breadcrumb-item active">Invoice</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <!-- Payment Records Table -->
  <div class="col-lg-12">
    <div class="card">
      <br>
      <div class="card-body">
          <ul class="nav nav-tabs d-flex" role="tablist">
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100 active" id="untagged-tab" data-bs-toggle="tab" data-bs-target="#untagged-payments" type="button" role="tab" aria-controls="untagged" aria-selected="true">Untagged</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="advanced-tab" data-bs-toggle="tab" data-bs-target="#advanced-payments" type="button" role="tab" aria-controls="advanced" aria-selected="false">Advanced Payments</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="approval-tab" data-bs-toggle="tab" data-bs-target="#approval-payments" type="button" role="tab" aria-controls="approval" aria-selected="false">For Approval</button>
          </li>
          <li class="nav-item flex-fill" role="presentation">
            <button class="nav-link w-100" id="invalid-tab" data-bs-toggle="tab" data-bs-target="#invalid-payments" type="button" role="tab" aria-controls="invalid" aria-selected="false">Invalid</button>
          </li>
        </ul>

        <div class="tab-content pt-2">

          <!-- Untagged Payment Records -->
          <div class="tab-pane fade show active" id="untagged-payments" role="tabpanel" aria-labelledby="untagged-tab">

            <div class="row">
              <div class="col-md-9">
                <h5 class="card-title">Untagged Payment Records</h5>
              </div>

              <div class="col-md-3 justify-content-center">
                <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-untagged-modal" id="add-untagged-btn">+ Add Untagged Payment</button>
              </div>
            </div>
        
            <table class="table table-borderless" id="untagged-payments-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Payment Center</th>
                  <th scope="col">Payment Ref. ID</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- End Untagged Payment Records -->
          
          <!-- Advanced Payment Records -->
          <div class="tab-pane fade" id="advanced-payments" role="tabpanel" aria-labelledby="advanced-tab">
            <div class="row">
              <div class="col-md-9">
                <h5 class="card-title">Advanced Payment Records</h5>
              </div>

              <div class="col-md-3 justify-content-center">
                <button type="button" class="btn btn-primary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#add-advanced-modal" id="add-advanced-btn">+ Add Advanced Payment</button>
              </div>
            </div>

            <table class="table table-borderless" id="advanced-payments-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Payment Center</th>
                  <th scope="col">Payment Ref. ID</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- End Advanced Payment Records -->

          <!-- For Approval Payment Records -->
          <div class="tab-pane fade" id="approval-payments" role="tabpanel" aria-labelledby="approval-tab">
            <h5 class="card-title">Customer Uploaded Payment Records</h5>
        
            <table class="table table-borderless" id="approval-payments-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">Date Uploaded</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- End For Approval Payment Records -->

          <!-- Invalid Payment Records -->
          <div class="tab-pane fade" id="invalid-payments" role="tabpanel" aria-labelledby="invalid-tab">
            <h5 class="card-title">Invalid Customer Uploaded Payment Records</h5>
        
            <table class="table table-borderless" id="invalid-payments-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Account ID</th>
                  <th scope="col">Date Uploaded</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- End Invalid Payment Records -->

        </div>
      </div>
    </div>
  </div><!-- End Payment Records Table -->

<!-- ------------------------------------------------------ Untagged Modals -->
<!-- Add New Untagged Payment -->
<form id="untagged-create-new" novalidate>
    <div class="modal fade" id="add-untagged-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
          <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title">New Untagged Payment</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body row g-3">
              <div class="col-md-12">
                <div class="form-floating">
                  <select class="form-control required" id="add_untagged_payment_centers" required>
                    <option selected disabled value="">Choose Payment Center</option>
                  </select>
                  <label for="add_untagged_payment_centers" class="required">Payment Center</label>
                </div>
              </div>
            </div>

            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="add_untagged_reference_id" placeholder="Payment Reference ID" required>
                    <div class="invalid-feedback">Please enter valid reference ID.</div>
                    <label for="add_untagged_reference_id" class="required">Payment Reference ID</label>
                  </div>
                </div>
            </div>

            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="number" step="0.01" class="form-control" id="add_untagged_amount_paid" placeholder="Amount Paid" min="1" required>
                    <div class="invalid-feedback">Please enter amount paid.</div>
                    <label for="add_untagged_amount_paid" class="required">Amount Paid</label>
                  </div>
                </div>
            </div>

            <div class="modal-body row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="date" class="form-control custom-date" id="add_untagged_payment_date" placeholder="Payment Date" required>
                    <div class="invalid-feedback">Please choose payment date.</div>
                    <label for="add_untagged_payment_date" class="required">Payment Date</label>
                  </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success" id="untagged-create-new-btn">Submit</button>
            </div>
          </div>
        </div>
    </div>
</form>
<!-- End Add New Untagged Payment -->

<!-- Update Untagged Payment -->
<form id="untagged-update-data">
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="edit-untagged-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Update Untagged Payment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">
            
                <div class="col-md-12">
                  <div class="form-floating">
                    <select class="form-control required" id="edit_untagged_payment_centers" placeholder="Payment Center" required></select>
                    <label for="edit_untagged_payment_centers">Payment Center</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="edit_untagged_reference_id" placeholder="Reference ID" required>
                    <label for="edit_untagged_reference_id">Reference ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="number" step="0.01" class="form-control" id="edit_untagged_amount_paid" placeholder="Amount Paid" required>
                    <label for="edit_untagged_amount_paid">Amount Paid</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="date" class="form-control custom-date" id="edit_untagged_payment_date" placeholder="Payment Date" required>
                    <label for="edit_untagged_payment_date">Payment Date</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input list="untagged-accounts-list" type="number" class="form-control" id="edit_untagged_account_id" placeholder="Account ID" required>
                    <label for="edit_untagged_account_id">Account ID</label>

                    <datalist id="untagged-accounts-list"></datalist>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="col-sm-5">
                    <input type="text" class="form-control text-center " id="edit_untagged_tagged" value="" disabled>
                  </div>
                </div>

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="untagged-update-data-btn">Save Changes</button>
          </div>
        </div>
      </div>
  </div>
</form> 
<!-- End Update Untagged Payment -->

<!-- Delete Untagged Payment -->
<form id="untagged-delete-data">
  <div class="modal fade" id="delete-untagged-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Untagged Payment?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body row g-3">
            
            <div class="col-md-12">
              <div class="form-floating">
                <input type="text" class="form-control" id="dlt_untagged_reference_id" placeholder="Reference ID" readonly>
                <label for="dlt_untagged_reference_id">Reference ID</label>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-floating">
                <input type="number" step="0.01" class="form-control" id="dlt_untagged_amount_paid" placeholder="Amount Paid" readonly>
                <label for="dlt_untagged_amount_paid">Amount Paid</label>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-floating">
                <input type="date" class="form-control" id="dlt_untagged_payment_date" placeholder="Payment Date" readonly>
                <label for="dlt_untagged_payment_date">Payment Date</label>
              </div>
            </div>

            <div class="col-md-12">
              <div class="col-sm-5">
                <input type="text" class="form-control text-center " id="dlt_untagged_tagged" value="" disabled>
              </div>
            </div>

        </div>
        <!-- End Modal Body -->
      
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger" id="untagged-delete-data-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</form>
<!-- Delete Untagged Payment -->
<!-- ------------------------------------------------------ End Untagged Modal -->

<!-- ------------------------------------------------------ Advanced Modals -->
<!-- Add Advanced Payment -->
<form id="advanced-create-new" novalidate>
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="add-advanced-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">New Advanced Payment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">

                <div class="col-md-12">
                  <div class="form-floating">
                    <select class="form-control required" id="add_advanced_payment_centers" required>
                      <option selected disabled value="">Choose Payment Center</option>
                    </select>
                    <div class="invalid-feedback">Please choose a payment center.</div>
                    <label for="add_advanced_payment_centers" class="required">Payment Center</label>
                  </div>
                </div>
            
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="add_advanced_reference_id" placeholder="Reference ID" required>
                    <div class="invalid-feedback">Please enter valid reference ID.</div>
                    <label for="add_advanced_reference_id">Reference ID</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="number" step="0.01" class="form-control" id="add_advanced_amount_paid" placeholder="Amount Paid" required>
                    <div class="invalid-feedback">Please enter amount paid.</div>
                    <label for="add_advanced_amount_paid">Amount Paid</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="date" class="form-control custom-date" id="add_advanced_payment_date" placeholder="Payment Date" required>
                    <div class="invalid-feedback">Please choose payment date.</div>
                    <label for="add_advanced_payment_date">Payment Date</label>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-floating">
                    <input list="advanced-accounts-list" type="number" class="form-control" id="add_advanced_account_id" placeholder="Account ID" required>
                    <div class="invalid-feedback">Please enter existing Account ID.</div>
                    <label for="add_advanced_account_id">Account ID</label>

                    <datalist id="advanced-accounts-list"></datalist>
                  </div>
                </div>

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="advanced-create-new-btn">Submit</button>
          </div>
        </div>
      </div>
  </div>
</form> 
<!-- End Advanced Payment -->

<!-- View Advanced Payment -->
<div class="modal fade" id="view-advanced-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-m">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <div class="row mb-3">
            <label for="view_advanced_payment_centers" class="col-sm-4 col-form-label">Payment Center</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="view_advanced_payment_centers" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="view_advanced_reference_id" class="col-sm-4 col-form-label">Reference ID</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="view_advanced_reference_id" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="view_advanced_amount_paid" class="col-sm-4 col-form-label">Amount Paid</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="view_advanced_amount_paid" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="view_advanced_payment_date" class="col-sm-4 col-form-label">Payment Date</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="view_advanced_payment_date" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="view_advanced_invoice_id" class="col-sm-4 col-form-label" id="invoice_id_lbl">Invoice ID</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="view_advanced_invoice_id" value="" readonly>
            </div>
          </div>

          <div class="row mb-3">
            <label for="view_advanced_tagged" class="col-sm-4 col-form-label">Status</label>
            <div class="col-sm-3">
              <input type="text" class="form-control text-center " id="view_advanced_tagged" value="" readonly>
            </div>
          </div>

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
</div>
<!-- End View Advanced Payment -->

<!-- ------------------------------------------------------ End Advanced Modals -->

<!-- ------------------------------------------------------ Pending Approval Modals -->
<!-- View Advanced Payment -->
<div class="modal fade" id="view-pending-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
      <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <!-- Card with an image on top -->
          <div class="card">
            <a href="" target="_blank" id="uploaded_image_new_tab">
              <img id="uploaded_image" class="img-fluid rounded-start mx-auto d-block" alt="..." data-action="zoom">
            </a>
          </div><!-- End Card with an image on top -->

        </div>
        <!-- End Modal Body -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" id="edit-pending-btn" data-bs-toggle="modal" data-bs-target="#add-pending-modal">Approve</button>
          <button type="submit" class="btn btn-danger" id="dlt-pending-btn" data-bs-toggle="modal" data-bs-target="#delete-pending-modal">Invalid</button>
        </div>
      </div>
    </div>
</div>
<!-- End View Advanced Payment -->

<!-- Add Approved Pending Payment -->
<form id="pending-create-new" novalidate>
  <!-- Modal Dialog Scrollable -->
  <div class="modal fade" id="add-pending-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Approve Pending Payment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body row g-3">

            <!-- Card with an image on left -->
            <div class="card mb-3">
              <div class="row g-3">
                <div class="col-md-4">
                  <a href="" target="_blank" id="add_uploaded_image_new_tab">
                    <img id="add_uploaded_image" class="img-fluid rounded-start mx-auto d-block" alt="..." data-action="zoom">
                  </a>
                </div>

                <div class="col-md-8">
                  <div class="card-body row g-3">

                    <div class="col-md-12 pt-3">
                      <div class="form-floating">
                        <input type="number" class="form-control" id="add_pending_account_id" placeholder="Account ID" readonly>
                        <label for="add_pending_account_id">Account ID</label>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-floating">
                        <select class="form-control required" id="add_pending_payment_centers" required>
                          <option selected disabled value="">Choose Payment Center</option>
                        </select>
                        <div class="invalid-feedback">Please choose a payment center.</div>
                        <label for="add_pending_payment_centers" class="required">Payment Center</label>
                      </div>
                    </div>
                
                    <div class="col-md-12">
                      <div class="form-floating">
                        <input type="text" class="form-control" id="add_pending_reference_id" placeholder="Reference ID" required>
                        <div class="invalid-feedback">Please enter valid reference ID.</div>
                        <label for="add_pending_reference_id" class="required">Reference ID</label>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-floating">
                        <input type="number" step="0.01" class="form-control" id="add_pending_amount_paid" placeholder="Amount Paid" required>
                        <div class="invalid-feedback">Please enter amount paid.</div>
                        <label for="add_pending_amount_paid" class="required">Amount Paid</label>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-floating">
                        <input type="date" class="form-control custom-date" id="add_pending_payment_date" placeholder="Payment Date" required>
                        <div class="invalid-feedback">Please choose payment date.</div>
                        <label for="add_pending_payment_date" class="required">Payment Date</label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div><!-- End Card with an image on left -->

                

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="pending-create-new-btn">Save Changes</button>
          </div>
        </div>
      </div>
  </div>
</form> 
<!-- End Advanced Payment -->

<!-- ------------------------------------------------------ End Pending Approval Modals -->

<!-- Delete Pending Payment -->
<form id="pending-delete-data">
  <div class="modal fade" id="delete-pending-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Invalidate Pending Payment?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body row g-3">

          <!-- Card with an image on bottom -->
          <div class="card">
            <div class="card-body">
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="number" class="form-control" id="dlt_pending_account_id" placeholder="Account ID" readonly>
                  <label for="dlt_pending_account_id">Account ID</label>
                </div>
              </div>
            </div>

            <a href="" target="_blank" id="dlt_uploaded_image_new_tab">
              <img id="dlt_uploaded_image" class="img-fluid rounded-start mx-auto d-block" alt="..." data-action="zoom">
            </a>
          </div>
          <!-- End Card with an image on bottom -->

            

        </div>
        <!-- End Modal Body -->
      
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger" id="pending-delete-data-btn">Invalid</button>
        </div>
      </div>
    </div>
  </div>
</form>
<!-- Delete Pending Payment -->

<!-- View Invalid Payment -->
<form id="react-invalid-data">
  <div class="modal fade" id="view-invalid-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Card with an image on top -->
            <div class="card">
              <a href="" target="_blank" id="inv_uploaded_image_new_tab">
                <img id="inv_uploaded_image" class="img-fluid rounded-start mx-auto d-block" alt="..." data-action="zoom">
              </a>
            </div><!-- End Card with an image on top -->

          </div>
          <!-- End Modal Body -->

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" id="reactivate-invalid-btn">Re-activate</button>
          </div>
        </div>
      </div>
  </div>
</form>
<!-- End View Invalid Payment -->
<!-- ------------------------------------------------------ End Pending Modal -->

</main>
<!-- End #main -->

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
  <script src="../js/invoice.js"></script>

</body>
</html>