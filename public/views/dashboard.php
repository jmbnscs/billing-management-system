<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
<div class="row">
  <div class="pagetitle col-sm-9">
    <h1>Dashboard</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->
</div>

<section class="section dashboard">

  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-8">
      <div class="row">

        <!-- Unpaid Invoices -->
        <div class="col-xxl-6 col-md-6">
          <div class="card info-card unpaid-invoices-card">

            <div class="filter">
              <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#" id="unpaid_this_month">This Month</a></li>
                <li><a class="dropdown-item" href="#" id="unpaid_this_year">This Year</a></li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Unpaid Invoices <span id="unpaid_filter"></span></h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-file-list-3-line"></i>
                </div>
                <div class="ps-3" id="unpaid-invoice-data">
                  <h6 id="total_unpaid"></h6>
                  <!-- <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span> -->
                  <!-- <a href="../views/invoice.php" class="stretched-link"></a> -->
                </div>
              </div>
            </div>

          </div>
        </div><!-- End Unpaid Invoices -->

        <!-- Uncharged Prorates -->
        <div class="col-xxl-6 col-md-6">
          <div class="card info-card uncharged-prorates-card">

            <div class="filter">
              <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#" id="uncharged_this_month">This Month</a></li>
                <li><a class="dropdown-item" href="#" id="uncharged_this_year">This Year</a></li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Untagged Prorates <span id="uncharged_filter"></span></h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-pie-chart-line"></i>
                </div>
                <div class="ps-3">
                  <!-- Apply Backend Here -->
                  <h6 id="total_uncharged"></h6>
                  <!-- <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> -->

                </div>
              </div>
            </div>

          </div>
        </div><!-- End Uncharged Prorates -->

        <!-- Active Tickets -->
        <div class="col-xxl-6 col-md-6">
          <div class="card info-card active-tickets-card">

            <div class="card-body">
              <h5 class="card-title">Active Tickets <span> | Today</span></h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-file-text-line"></i>
                </div>
                <div class="ps-3">
                  <!-- Apply Backend Here -->
                  <h6 id="active_tkt_cnt"></h6>
                  <!-- <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span> -->

                </div>
              </div>
            </div>

          </div>
        </div><!-- End Active Tickets -->

        <!-- Claimed Tickets -->
        <div class="col-xxl-6 col-md-6">
          <div class="card info-card claimed-tickets-card">

            <div class="card-body">
              <h5 class="card-title">Claimed Tickets <span> | Today</span></h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-draft-line"></i>
                </div>
                <div class="ps-3">
                  <!-- Apply Backend Here -->
                  <h6 id="claimed_tkt_cnt"></h6>
                  <!-- <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> -->

                </div>
              </div>
            </div>

          </div>
        </div><!-- End Claimed Tickets -->

        <!-- Revenue Reports -->
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Revenue Reports <span id="revenue_year"></span></h5>

              <!-- Bar Chart -->
              <canvas id="revenue_chart" style="max-height: 400px;"></canvas>
              <!-- End Bar CHart -->

            </div>

          </div>
        </div><!-- End Revenue Reports -->

        <!-- Plans Preview -->
        <div class="col-12">
          <div class="card recent-sales overflow-auto">

            <div class="card-body">
              <h5 class="card-title">Plans Preview</h5>

              <table class="table table-borderless" id="plan-preview-table">
                <thead>
                  <tr>
                    <th scope="col">Plan Name</th>
                    <th scope="col">Bandwidth</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Subscribers</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>

            </div>

          </div>
        </div><!-- End Plans Preview -->

      </div>

    </div><!-- End Left side columns -->

    <!-- Right side columns -->
    <div class="col-lg-4">

      <!-- Collection -->
      <div class="card">

        <div class="card-body pb-0">
          <h5 class="card-title">Collection <span>| This Month</span></h5>

          <!-- <div id="collection_preview" style="min-height: 400px;" class="echart"></div> -->
          <canvas id="collection_preview" style="max-height: 300px;"></canvas>
          <br>

        </div>
      </div><!-- End Collection -->

      <!-- Customer Preview -->
      <div class="card">

        <div class="card-body pb-0">
            <h5 class="card-title">Customer Preview <span>| Year 2022</span></h5>
            <canvas id="customer_preview" style="max-height: 400px;"></canvas>
          <br>

        </div>
      </div><!-- End Customer Preview -->

      <!-- Ticket Overview -->
      <div class="card">

        <div class="card-body pb-0">
          <h5 class="card-title">Submitted Tickets <span>| This Month</span></h5>
          
          <canvas id="ticket_overview" style="max-height: 300px;"></canvas>
          <br>
        </div>
      </div><!-- EndTicket Overview -->

    </div><!-- End Right side columns -->

    <!-- Recent Activity -->
    <div class="card">
        <!-- <div class="filter">
          <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li class="dropdown-header text-start">
              <h6>Filter</h6>
            </li>

            <li><a class="dropdown-item" href="#">Today</a></li>
            <li><a class="dropdown-item" href="#">This Month</a></li>
            <li><a class="dropdown-item" href="#">This Year</a></li>
          </ul>
        </div> -->

        <div class="card-body">
          <h5 class="card-title"><a href="../views/profile.php?tab=activityLogs">Recent Activity</a><span> | Today</span></h5>

          <div class="activity" id="activity-panel">
          </div>

        </div>
    </div><!-- End Recent Activity -->

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

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Backend JS File -->
  <script src="../js/loader.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/dashboard.js"></script>

</body>

</html>