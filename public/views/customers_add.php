<?php 
  include '../models/header.html';
  include '../models/navbar.html'; ?>

<main id="main" class="main">

<div class="pagetitle">
  <h1>Add New Account</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
      <li class="breadcrumb-item active">Customers</li>
    </ol>
  </nav>
</div><!-- End Page Title -->

<!-- <section class="section customers-add">
  <div class="row">
    <div class="col-mb-8">
        <form id="add-customer" class="row" novalidate>
            <div class="card col-md-6">
                <div class="card-body pt-4">
                    <h5>Customer Information</h5>
                    <div class="row mb-3">
                        <label for="account_id" class="col-sm-3 col-form-label">Account ID <i class="bi bi-info-circle ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="This is auto-generated by the system."></i></label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="account_id" readonly required>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="first_name" class="col-sm-3 col-form-label required">First Name</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="first_name" placeholder="Ex. Juan" required>
                            <div class="invalid-feedback">Please enter the customer's first name.</div>
                        </div>
                    </div>
                        
                    <div class="row mb-3 position-relative">
                        <label for="middle_name" class="col-sm-3 col-form-label">Middle Name</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="middle_name" placeholder="Ex. Santos">
                            <div class="invalid-feedback">Middle name must not be a number.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">    
                        <label for="last_name" class="col-sm-3 col-form-label required">Last Name</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="last_name" placeholder="Ex. Dela Cruz" required>
                            <div class="invalid-feedback">Please enter the customer's last name.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="billing_address" class="col-sm-3 col-form-label required">Address</label>
                        <div class="col-sm-9">
                            <textarea class="form-control" id="billing_address" placeholder="Ex. 123 Kapasigan St. Pasig City" required></textarea>
                            <div class="invalid-feedback">Please enter the customer's address.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="mobile_number" class="col-sm-3 col-form-label required">Mobile Number</label>
                        <div class="col-sm-9">
                            <input type="number" class="form-control" id="mobile_number" placeholder="Ex. 09XXXXXXXXX" pattern="[0]{1}[9]{1}[0-9]{9}" required maxlength="11" size="11">
                            <div class="invalid-feedback">Please enter the customer's mobile number.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="email" class="col-sm-3 col-form-label required">Email</label>
                        <div class="col-sm-9">
                            <input type="email" class="form-control" placeholder="Ex. name@example.com" id="email" required>
                            <div class="invalid-feedback">Please enter the customer's email.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="birthdate" class="col-sm-3 col-form-label required">Birthdate</label>
                        <div class="col-sm-9">
                            <input type="date" class="form-control custom-date" id="birthdate" required>
                            <div class="invalid-feedback">Please enter the customer's birthdate.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="start_date" class="col-sm-3 col-form-label required">Start Date</label>
                        <div class="col-sm-9">
                            <input type="date" class="form-control custom-date" id="start_date" required>
                            <div class="invalid-feedback">Please enter the customer's start date.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="plan_id" class="col-sm-3 col-form-label required">Subscription Plan</label>
                        <div class="col-sm-9">
                            <select id="plan_id" class="form-select" required>
                                <option selected disabled value="">Choose Subscription Plan</option>
                            </select>
                            <div class="invalid-feedback">Please choose a subscription plan.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="connection_id" class="col-sm-3 col-form-label required">Connection Type</label>
                        <div class="col-sm-9">
                            <select id="connection_id" class="form-select" required>
                                <option selected disabled value="">Choose Connection Type</option>
                            </select>
                            <div class="invalid-feedback">Please choose a connection type.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="area_id" class="col-sm-3 col-form-label required">Area</label>
                        <div class="col-sm-9">
                            <select id="area_id" class="form-select" required>
                                <option selected disabled value="">Choose Area</option>
                            </select>
                            <div class="invalid-feedback">Please choose an area.</div>
                        </div>
                    </div>

                    <div class="row mb-3 position-relative">
                        <label for="install_type_id" class="col-sm-3 col-form-label required">Installation Type</label>
                        <div class="col-sm-9">
                            <select id="install_type_id" class="form-select" required>
                                <option selected disabled value="">Choose Installation Type</option>
                            </select>
                            <div class="invalid-feedback">Please choose an installation type.</div>
                        </div>
                    </div>

                    <div class ="text-center">
                        <button type="submit" class="btn btn-success">Create Account</button>
                    </div>

                </div>
            </div>

            <div class="card col-md-6">

            </div>
        </form>
    </div>
  </div>
</section> -->

<section class="section customers-add">
    <form class="row" id="add-customer" novalidate>
        <div class="row justify-content-center">
            <div class="card col-md-5 m-2 p-3">
                <h4 class="p-2 pt-4" style="color: #012970; font-weight: bold;">Customer Information</h4>

                <div class="col-12">
                    <label for="first_name" class="col-sm-4 col-form-label required">First Name</label>
                    <input type="text" class="form-control" id="first_name" placeholder="Ex. Juan" required>
                    <div class="invalid-feedback">Please enter the customer's first name.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="middle_name" class="col-sm-4 col-form-label">Middle Name</label>
                    <input type="text" class="form-control" id="middle_name" placeholder="Ex. Santos">
                    <div class="invalid-feedback" id="middle_name_invalid">Middle name must not be a number.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="last_name" class="col-sm-4 col-form-label required">Last Name</label>
                    <input type="text" class="form-control" id="last_name" placeholder="Ex. Dela Cruz" required>
                    <div class="invalid-feedback">Please enter the customer's last name.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="billing_address" class="col-sm-4 col-form-label required">Address</label>
                    <textarea class="form-control" id="billing_address" placeholder="Ex. 123 Kapasigan St. Pasig City" required></textarea>
                    <div class="invalid-feedback">Please enter the customer's address.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="mobile_number" class="col-sm-4 col-form-label required">Mobile #</label>
                    <input type="number" class="form-control" id="mobile_number" placeholder="Ex. 09XXXXXXXXX" pattern="[0]{1}[9]{1}[0-9]{9}" required maxlength="11" size="11">
                    <div class="invalid-feedback">Please enter the customer's mobile number.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="email" class="col-sm-4 col-form-label required">Email</label>
                    <input type="email" class="form-control" placeholder="Ex. name@example.com" id="email" required>
                    <div class="invalid-feedback">Please enter the customer's email.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="birthdate" class="col-sm-4 col-form-label required">Birthdate</label>
                    <input type="date" class="form-control custom-date" id="birthdate" required>
                    <div class="invalid-feedback">Please enter the customer's birthdate.</div>
                </div>

                <!-- <div class="row mb-3 position-relative">
                    <label for="first_name" class="col-sm-4 col-form-label required">First Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="first_name" placeholder="Ex. Juan" required>
                        <div class="invalid-feedback">Please enter the customer's first name.</div>
                    </div>
                </div> -->
                    
                <!-- <div class="row mb-3 position-relative">
                    <label for="middle_name" class="col-sm-4 col-form-label">Middle Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="middle_name" placeholder="Ex. Santos">
                        <div class="invalid-feedback" id="middle_name_invalid">Middle name must not be a number.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">    
                    <label for="last_name" class="col-sm-4 col-form-label required">Last Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="last_name" placeholder="Ex. Dela Cruz" required>
                        <div class="invalid-feedback">Please enter the customer's last name.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="billing_address" class="col-sm-4 col-form-label required">Address</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" id="billing_address" placeholder="Ex. 123 Kapasigan St. Pasig City" required></textarea>
                        <div class="invalid-feedback">Please enter the customer's address.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="mobile_number" class="col-sm-4 col-form-label required">Mobile #</label>
                    <div class="col-sm-8">
                        <input type="number" class="form-control" id="mobile_number" placeholder="Ex. 09XXXXXXXXX" pattern="[0]{1}[9]{1}[0-9]{9}" required maxlength="11" size="11">
                        <div class="invalid-feedback">Please enter the customer's mobile number.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="email" class="col-sm-4 col-form-label required">Email</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" placeholder="Ex. name@example.com" id="email" required>
                        <div class="invalid-feedback">Please enter the customer's email.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="birthdate" class="col-sm-4 col-form-label required">Birthdate</label>
                    <div class="col-sm-8">
                        <input type="date" class="form-control custom-date" id="birthdate" required>
                        <div class="invalid-feedback">Please enter the customer's birthdate.</div>
                    </div>
                </div> -->
            </div>

            <div class="card col-md-5 m-2 p-3">
                <h4 class="p-2 pt-4" style="color: #012970; font-weight: bold;">Account Information</h4>

                <div class="col-12">
                    <label for="account_id" class="col-sm-4 col-form-label">Account ID <i class="bi bi-info-circle ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="This is auto-generated by the system."></i></label>
                    <input type="text" class="form-control" id="account_id" readonly required>
                </div>

                <div class="col-12 pt-2">
                    <label for="start_date" class="col-sm-4 col-form-label required">Start Date</label>
                    <input type="date" class="form-control custom-date" id="start_date" required>
                    <div class="invalid-feedback">Please enter the customer's start date.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="plan_id" class="col-sm-4 col-form-label required">Subscription Plan</label>
                    <select id="plan_id" class="form-select" required>
                        <option selected disabled value="">Choose Subscription Plan</option>
                    </select>
                    <div class="invalid-feedback">Please choose a subscription plan.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="connection_id" class="col-sm-4 col-form-label required">Connection Type</label>
                    <select id="connection_id" class="form-select" required>
                        <option selected disabled value="">Choose Connection Type</option>
                    </select>
                    <div class="invalid-feedback">Please choose a connection type.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="area_id" class="col-sm-4 col-form-label required">Area</label>
                    <select id="area_id" class="form-select" required>
                        <option selected disabled value="">Choose Area</option>
                    </select>
                    <div class="invalid-feedback">Please choose an area.</div>
                </div>

                <div class="col-12 pt-2">
                    <label for="install_type_id" class="col-sm-4 col-form-label required">Installation Type</label>
                    <select id="install_type_id" class="form-select" required>
                        <option selected disabled value="">Choose Installation Type</option>
                    </select>
                    <div class="invalid-feedback">Please choose an installation type.</div>
                </div>

                <!-- <div class="row mb-3">
                    <label for="account_id" class="col-sm-4 col-form-label">Account ID <i class="bi bi-info-circle ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="This is auto-generated by the system."></i></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="account_id" readonly required>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                        <label for="start_date" class="col-sm-4 col-form-label required">Start Date</label>
                        <div class="col-sm-8">
                            <input type="date" class="form-control custom-date" id="start_date" required>
                            <div class="invalid-feedback">Please enter the customer's start date.</div>
                        </div>
                    </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="plan_id" class="col-sm-4 col-form-label required">Subscription Plan</label>
                    <div class="col-sm-8">
                        <select id="plan_id" class="form-select" required>
                            <option selected disabled value="">Choose Subscription Plan</option>
                        </select>
                        <div class="invalid-feedback">Please choose a subscription plan.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="connection_id" class="col-sm-4 col-form-label required">Connection Type</label>
                    <div class="col-sm-8">
                        <select id="connection_id" class="form-select" required>
                            <option selected disabled value="">Choose Connection Type</option>
                        </select>
                        <div class="invalid-feedback">Please choose a connection type.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="area_id" class="col-sm-4 col-form-label required">Area</label>
                    <div class="col-sm-8">
                        <select id="area_id" class="form-select" required>
                            <option selected disabled value="">Choose Area</option>
                        </select>
                        <div class="invalid-feedback">Please choose an area.</div>
                    </div>
                </div> -->

                <!-- <div class="row mb-3 position-relative">
                    <label for="install_type_id" class="col-sm-4 col-form-label required">Installation Type</label>
                    <div class="col-sm-8">
                        <select id="install_type_id" class="form-select" required>
                            <option selected disabled value="">Choose Installation Type</option>
                        </select>
                        <div class="invalid-feedback">Please choose an installation type.</div>
                    </div>
                </div> -->

                <div class="row">
                    <div class ="text-center col-lg-12 pt-4">
                        <button type="submit" class="btn btn-success">Create Account</button>
                    </div>
                </div>
            </div>

            
        </div>
    </form>
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

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js"></script>

  <!-- Datepicker -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

  <!-- Backend JS File -->
  <script src="../js/main.js"></script>
  <script src="../js/customers.js"></script>

</body>
</html>