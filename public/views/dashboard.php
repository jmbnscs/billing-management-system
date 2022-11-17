<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">
<div class="pagetitle">
  <h1>Dashboard</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="index.html">Home</a></li>
      <li class="breadcrumb-item active">Dashboard</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<section class="section dashboard">

  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-8">
      <div class="row">

        <!-- Unpaid Invoices -->
        <div class="col-xxl-6 col-md-6">
          <!-- Change sales-card to unpaid-card then change in style.css -->
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
              <h5 class="card-title">Unpaid Invoices <span id="unpaid_filter">| Today</span></h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-file-list-3-line"></i>
                </div>
                <div class="ps-3" id="unpaid-invoice-data">
                  <!-- Apply Backend Here -->
                  <h6 id="total_unpaid"></h6>
                  <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

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

                <li><a class="dropdown-item" href="#">Today</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Uncharged Prorates <span>| This Year</span></h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-pie-chart-line"></i>
                </div>
                <div class="ps-3">
                  <!-- Apply Backend Here -->
                  <h6>3,264</h6>
                  <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                </div>
              </div>
            </div>

          </div>
        </div><!-- End Uncharged Prorates -->

        <!-- Active Tickets -->
        <div class="col-xxl-6 col-md-6">
          <div class="card info-card active-tickets-card">

            <div class="filter">
              <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#">Today</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Active Tickets</h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-file-text-line"></i>
                </div>
                <div class="ps-3">
                  <!-- Apply Backend Here -->
                  <h6>145</h6>
                  <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                </div>
              </div>
            </div>

          </div>
        </div><!-- End Active Tickets -->

        <!-- Claimed Tickets -->
        <div class="col-xxl-6 col-md-6">
          <div class="card info-card claimed-tickets-card">

            <div class="filter">
              <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#">Today</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Claimed Tickets</h5>

              <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="ri ri-draft-line"></i>
                </div>
                <div class="ps-3">
                  <!-- Apply Backend Here -->
                  <h6>3,264</h6>
                  <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                </div>
              </div>
            </div>

          </div>
        </div><!-- End Claimed Tickets -->

        <!-- Revenue Reports -->
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Revenue Reports <span>/Year 2022</span></h5>

              <!-- Bar Chart -->
              <canvas id="barChart" style="max-height: 400px;"></canvas>
              <script>
                document.addEventListener("DOMContentLoaded", () => {
                  new Chart(document.querySelector('#barChart'), {
                    type: 'bar',
                    data: {
                      labels: [ 'January', 
                                'February', 
                                'March', 
                                'April', 
                                'May', 
                                'June', 
                                'July'
                              ],
                      datasets: [{
                        label: 'Bar Chart',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(255, 205, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(153, 102, 255, 0.2)'
                          
                        ],
                        borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)',
                          'rgb(54, 162, 235)',
                          'rgb(153, 102, 255)'
                          
                        ],
                        borderWidth: 1
                      }]
                    },
                    options: {
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }
                  });
                });
              </script>
              <!-- End Bar CHart -->

            </div>

          </div>
        </div><!-- End Revenue Reports -->

        <!-- Plans Preview -->
        <div class="col-12">
          <div class="card recent-sales overflow-auto">

            <div class="filter">
              <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a class="dropdown-item" href="#">Today</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Plans Preview <span>| Today</span></h5>

              <table class="table table-borderless datatable">
                <thead>
                  <tr>
                    <th scope="col">Plan Name</th>
                    <th scope="col">Bandwidth</th>
                    <th scope="col">Price</th>
                    <th scope="col">Inclusions</th>
                    <th scope="col">Status</th>
                    <th scope="col">Subscribers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><a href="#">Plan 1</a></th>
                    <td>35 mbps</td>
                    <td><a href="#" class="text-primary">1000</a></td>
                    <td>None</td>
                    <td><span class="badge bg-success">Approved</span></td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#">Plan 2</a></th>
                    <td>50 mbps</td>
                    <td><a href="#" class="text-primary">1250</a></td>
                    <td>Fiber Switch</td>
                    <td><span class="badge bg-warning">Pending</span></td>
                    <td>80</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#">Plan 3</a></th>
                    <td>75 mbps</td>
                    <td><a href="#" class="text-primary">1500/a></td>
                    <td>Netflix, Fiber Switch</td>
                    <td><span class="badge bg-success">Approved</span></td>
                    <td>200</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#">Plan 4</a></th>
                    <td>100 mbps</td>
                    <td><a href="#" class="text-primar">1899</a></td>
                    <td>Netflix, Fiber Switch</td>
                    <td><span class="badge bg-danger">Rejected</span></td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href="#">Plan 5</a></th>
                    <td>200</td>
                    <td><a href="#" class="text-primary">2250</a></td>
                    <td>Netflix, Fiber Switch</td>
                    <td><span class="badge bg-success">Approved</span></td>
                    <td>50</td>
                  </tr>
                </tbody>
              </table>

            </div>

          </div>
        </div><!-- End Plans Preview -->

        <!-- Customer Preview -->
        <div class="col-12">
          <div class="card">

            <div class="filter">
              <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a class="dropdown-item" href="#">Year 2021</a></li>
                <li><a class="dropdown-item" href="#">Year 2020</a></li>
                <li><a class="dropdown-item" href="#">Year 2019</a></li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Customer Preview <span>| Year 2022</span></h5>

              <!-- Pie Chart -->
              <canvas id="pieChart" style="max-height: 400px;"></canvas>
              <script>
                document.addEventListener("DOMContentLoaded", () => {
                  new Chart(document.querySelector('#pieChart'), {
                    type: 'pie',
                    data: {
                      labels: [
                        'Valued',
                        'Deliquent'
                      ],
                      datasets: [{
                        label: 'Number of Customers',
                        data: [150, 90],
                        backgroundColor: [
                          'rgb(119, 221, 119)',
                          'rgb(250, 160, 160)'
                        ],
                        hoverOffset: 4
                      }]
                    }
                  });
                });
              </script>
              <!-- End Pie CHart -->

            </div>

          </div>
        </div><!-- End Customer Preview -->
P
      </div>

    </div><!-- End Left side columns -->

    <!-- Right side columns -->
    <div class="col-lg-4">

      <!-- Recent Activity -->
      <div class="card">
        <div class="filter">
          <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li class="dropdown-header text-start">
              <h6>Filter</h6>
            </li>

            <li><a class="dropdown-item" href="#">Today</a></li>
            <li><a class="dropdown-item" href="#">This Month</a></li>
            <li><a class="dropdown-item" href="#">This Year</a></li>
          </ul>
        </div>

        <div class="card-body">
          <h5 class="card-title">Recent Activity <span>| Today</span></h5>

          <div class="activity">

            <div class="activity-item d-flex">
              <div class="activite-label">32 min</div>
              <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
              <div class="activity-content">
                Quia quae rerum <a href="#" class="fw-bold text-dark">explicabo officiis</a> beatae
              </div>
            </div><!-- End activity item-->

            <div class="activity-item d-flex">
              <div class="activite-label">56 min</div>
              <i class='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
              <div class="activity-content">
                Voluptatem blanditiis blanditiis eveniet
              </div>
            </div><!-- End activity item-->

            <div class="activity-item d-flex">
              <div class="activite-label">2 hrs</div>
              <i class='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
              <div class="activity-content">
                Voluptates corrupti molestias voluptatem
              </div>
            </div><!-- End activity item-->

            <div class="activity-item d-flex">
              <div class="activite-label">1 day</div>
              <i class='bi bi-circle-fill activity-badge text-info align-self-start'></i>
              <div class="activity-content">
                Tempore autem saepe <a href="#" class="fw-bold text-dark">occaecati voluptatem</a> tempore
              </div>
            </div><!-- End activity item-->

            <div class="activity-item d-flex">
              <div class="activite-label">2 days</div>
              <i class='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
              <div class="activity-content">
                Est sit eum reiciendis exercitationem
              </div>
            </div><!-- End activity item-->

            <div class="activity-item d-flex">
              <div class="activite-label">4 weeks</div>
              <i class='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
              <div class="activity-content">
                Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
              </div>
            </div><!-- End activity item-->

          </div>

        </div>
      </div><!-- End Recent Activity -->

        <!-- Collection -->
        <div class="card">
        <div class="filter">
          <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li class="dropdown-header text-start">
              <h6>Filter</h6>
            </li>

            <li><a class="dropdown-item" href="#">Today</a></li>
            <li><a class="dropdown-item" href="#">This Month</a></li>
            <li><a class="dropdown-item" href="#">This Year</a></li>
          </ul>
        </div>

        <div class="card-body pb-0">
          <h5 class="card-title">Collection <span>| January 2022</span></h5>

          <div id="trafficChart" style="min-height: 400px;" class="echart"></div>

          <script>
            document.addEventListener("DOMContentLoaded", () => {
              echarts.init(document.querySelector("#trafficChart")).setOption({
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  top: '5%',
                  left: 'center'
                },
                series: [{
                  name: 'Access From',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '18',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [{
                      value: 1048,
                      name: 'Paid'
                    },
                    {
                      value: 735,
                      name: 'Unpaid'
                    },
                    {
                      value: 580,
                      name: 'Accounts Receivable'
                    },
                    {
                      value: 484,
                      name: 'Blank 1'
                    },
                    {
                      value: 300,
                      name: 'Blank 2'
                    }
                  ]
                }]
              });
            });
          </script>

        </div>
      </div><!-- End Collection -->

      <!-- Budget Report -->
      <div class="card">
        <div class="filter">
          <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li class="dropdown-header text-start">
              <h6>Filter</h6>
            </li>

            <li><a class="dropdown-item" href="#">Today</a></li>
            <li><a class="dropdown-item" href="#">This Month</a></li>
            <li><a class="dropdown-item" href="#">This Year</a></li>
          </ul>
        </div>

        <div class="card-body pb-0">
          <h5 class="card-title">Budget Report <span>| This Month</span></h5>

          <div id="budgetChart" style="min-height: 400px;" class="echart"></div>

          <script>
            document.addEventListener("DOMContentLoaded", () => {
              var budgetChart = echarts.init(document.querySelector("#budgetChart")).setOption({
                legend: {
                  data: ['Allocated Budget', 'Actual Spending']
                },
                radar: {
                  // shape: 'circle',
                  indicator: [{
                      name: 'Sales',
                      max: 6500
                    },
                    {
                      name: 'Administration',
                      max: 16000
                    },
                    {
                      name: 'Information Technology',
                      max: 30000
                    },
                    {
                      name: 'Customer Support',
                      max: 38000
                    },
                    {
                      name: 'Development',
                      max: 52000
                    },
                    {
                      name: 'Marketing',
                      max: 25000
                    }
                  ]
                },
                series: [{
                  name: 'Budget vs spending',
                  type: 'radar',
                  data: [{
                      value: [4200, 3000, 20000, 35000, 50000, 18000],
                      name: 'Allocated Budget'
                    },
                    {
                      value: [5000, 14000, 28000, 26000, 42000, 21000],
                      name: 'Actual Spending'
                    }
                  ]
                }]
              });
            });
          </script>

        </div>
      </div><!-- End Budget Report -->

      <!-- Ticket Overview -->
      <div class="card">
        <div class="filter">
          <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li class="dropdown-header text-start">
              <h6>Filter</h6>
            </li>

            <li><a class="dropdown-item" href="#">Today</a></li>
            <li><a class="dropdown-item" href="#">This Month</a></li>
            <li><a class="dropdown-item" href="#">This Year</a></li>
          </ul>
        </div>

        <div class="card-body pb-0">
          <h5 class="card-title">Submitted Tickets <span>| This Month</span></h5>
          

              <!-- Radial Bar Chart -->
              <div id="radialBarChart"></div>

              <script>
                document.addEventListener("DOMContentLoaded", () => {
                  new ApexCharts(document.querySelector("#radialBarChart"), {
                    series: [44, 55, 83],
                    chart: {
                      height: 400,
                      type: 'radialBar',
                      toolbar: {
                        show: true
                      }
                    },
                    plotOptions: {
                      radialBar: {
                        dataLabels: {
                          name: {
                            fontSize: '16px',
                          },
                          value: {
                            fontSize: '22px',
                          },
                          total: {
                            show: true,
                            label: 'Total',
                            formatter: function(w) {
                              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                              return 249 
                            }
                          }
                        }
                      }
                    },
                    labels: [ 'Network Interruption', 
                              'Subscription Changes', 
                              'Coffee Ticket'],
                  }).render();
                });
              </script>
              <!-- End Radial Bar Chart -->

        </div>
      </div><!-- EndTicket Overview -->



    </div><!-- End Right side columns -->

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