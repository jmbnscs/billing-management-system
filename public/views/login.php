<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Raleway:300,600">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">

    <!-- Local CSS -->
    <link rel="stylesheet" href="../css/login.css">

    <title>GStech Billing Management System - Login</title>
</head>
<body>
    <div class="container">
        <section id="formHolder">
            <div class="row">
                <!-- Brand Box -->
                <div class="col-sm-6 brand">
                    <!-- <img src="../images/gst-logo.ico" alt="GSTech Logo" class="logo"> -->
                    <div>
                        <img src="../images/gstech-logo-vector.png" class="heading">
                    </div>
                </div>

                <!-- Form Box -->
                <div class="col-sm-6 form">

                    <!-- Login Form -->
                    <div class="login form-piece switched">
                        <form class="login-form">
                            <div class="label">
                                <h1>Admin Login</h1>
                            </div>

                            <div class="form-group">
                                <label class="label">Username</label>
                                <input type="text" name="admin_username" id="admin_username" required>
                            </div>
                                
                            <div class="form-group">
                                <label class="label">Password</label>
                                <input
                                    type="password"
                                    name="admin_password"
                                    id="admin_password"
                                    required>
                            </div>

                            <div class="col-12">
                                <div class="form-check">
                                    <label class="form-check-label">Remember me</label>
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value="1"
                                        id="invalidCheck2">
                                </div>
                            </div>

                            <div class="CTA">
                                <input type="submit" id="submit" value="Login" />
                                <!-- <button type="submit" id="submit" name="submit">Login</button> -->
                            </div>
                        </form>
                    </div>
                    <!-- End Login Form -->

                    <!-- Welcome Page -->
                    <div class="welcome form-piece">
                        <form class="signup-form" action="#" method="post">
                            <div class="login-message">
                                <h1>Welcome back!</h1>
                            </div>
                            <div class="CTA">
                                <a href="#" class="switch">Click to Login</a>
                            </div>
                        </form>
                    </div>
                    <!-- End Welcome Page -->
                </div>
            </div>
        </section>
    </div>

    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Ajax -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- Local JS -->
    <script src="../js/login.js"></script>
</body>
</html>