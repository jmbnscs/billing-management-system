// Frontend JS

/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {

    'use strict';

    initializeAttempts();

    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form .label').addClass('fontSwitch');
    }

    // Label effect
    $('input').focus(function () {

        $(this).siblings('.label').addClass('active');
    });

    // Form validation
    $('input').blur(function () {

 
        // label effect
        if ($(this).val().length > 0) {
            $(this).siblings('.label').addClass('active');
        } else {
            $(this).siblings('.label').removeClass('active');
        }
    });


    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-piece').addClass('switched').siblings('.form-piece').removeClass('switched');
        } else {
            $(this).parents('.form-piece').removeClass('switched').siblings('.form-piece').addClass('switched');
        }
    });


    // Reload page
    $('a.profile').on('click', function () {
        location.reload(true);
    });
});

// -------------------------------- Backend JS --------------------------------
const error = document.getElementById('error');

$(function () {
    $('form').on('submit', function(e) {
        e.preventDefault();
        const admin_username = $('#admin_username').val();
        const admin_password = $('#admin_password').val();

        if (localStorage.getItem('admin_username') == null) {
            localStorage.setItem('admin_username', admin_username);
        }
        else if (localStorage.getItem('admin_username') != admin_username) {
            localStorage.setItem('attempts', 3);
            localStorage.setItem('admin_username', admin_username);
        }

        // console.log(localStorage.getItem('attempts'));
        // console.log(localStorage.getItem('admin_username'));

        $.ajax({
            type: 'post',
            url: '../../app/includes/login.inc.php',
            data: {
                admin_username: admin_username,
                admin_password: admin_password
            },
            cache: false,
            success: function(data) {
                const admin_data = JSON.parse(data);
                if (admin_data.message === 'Success') {
                    const url = '../views/dashboard.php';
                        sessionStorage.setItem("admin_id", admin_data.admin_id);
                        sessionStorage.setItem("admin_password", admin_data.admin_password);
                        sessionStorage.setItem("admin_status_id", admin_data.admin_status_id);
                        sessionStorage.setItem("hashed", admin_data.hashed);
                        window.location.replace(url);
                }
                else {
                    if ((admin_data.login_attempts >= 8) || ((admin_data.admin_status_id > 1) && (admin_data.admin_status_id < 5))) {
                        if (localStorage.getItem('attempts') <= 0) {
                            let message = "The login page is disabled for 5 minutes.";
                            let title = "The account has been " + admin_data.message + ".";
                            setToastr(title, message, "error");
                            disableLoginButton();
                            localStorage.setItem('attempts', 3);
                        }
                        else {
                            if (admin_data.admin_status_id === 3) {
                                let message = "Please contact the system administrator.";
                                let title = "The account has been " + admin_data.message + ".";
                                setToastr(title, message, "warning");
                            }
                            else {
                                let message = "The account is restricted from logging in.";
                                let title = "The account has been " + admin_data.message + ".";
                                setToastr(title, message, "warning");
                            }
                        }
                    }
                    else {
                        localStorage.setItem('attempts', localStorage.getItem('attempts') - 1);
                        if ((admin_data.login_attempts === 5) && (localStorage.getItem('attempts') <= 0)) {
                            let message = "3 attempts remaining before lockout.";
                            setToastr("Warning", message, "error");
                            disableLoginButton();
                            localStorage.setItem('attempts', 3);
                        }
                        else if (admin_data.login_attempts === 5) {
                            let message = "3 attempts remaining before lockout.";
                            setToastr("Warning", message, "error");
                        }
                        else if (localStorage.getItem('attempts') <= 0) {
                            let message = "Please wait for 5 minutes to resume login.";
                            setToastr("Login Page Disabled", message, "error");
                            disableLoginButton();
                            localStorage.setItem('attempts', 3);
                        }
                        else if (localStorage.getItem('attempts') === 1) {
                            let message = localStorage.getItem('attempts') + " attempt remaining.";
                            setToastr(admin_data.message, message, "warning");
                        }
                        else {
                            let message = localStorage.getItem('attempts') + " attempts remaining."
                            setToastr(admin_data.message, message, "warning");
                        }
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr)
            }
        });
    });
});

function disableLoginButton() {
    $('#submit').prop('disabled', true);
    $('#submit').css('background-color', '#808080');
    setTimeout(function() {
            $('#submit').prop('disabled', false);
            $('#submit').css('background-color', '#4397d0');
    }, 5000);
}

function initializeAttempts() {
    if (localStorage.getItem('admin_username') == null) {
        localStorage.setItem('attempts', 3);
    }
    if (localStorage.getItem('attempts') == null) {
        localStorage.setItem('attempts', 3);
    }
}

function setToastr(title, message, type) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };

      if (type == "error") {
        toastr.error(message, title);
      }
      else {
        toastr.warning(message, title);
      }
}
