const error = document.getElementById('error');

/* NOTE FROM KL:
    Hindi ko sure itong JS kinopya ko laang sya then may binago ng kaunti 
    hehehe pero working sya.
    ang need ko dito sa login.js is yung label effect, reload page siguro
    tsaka form switch =)
*/

/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {

    'use strict';

    //error.classList.add('hide-error');
    // removeAllChildNodes(error);

    // Detect browser for css purpose --> Not sure ako dito, Para san?
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
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var attempts = 0;

$(function () {
    $('form').on('submit', function(e) {
        e.preventDefault();
        const admin_username = $('#admin_username').val();
        const admin_password = $('#admin_password').val();

        // @Alfredo
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
                if (admin_data.message == 'Success') {
                    const url = '../views/dashboard.php';
                    sessionStorage.setItem("admin_id", admin_data.admin_id);
                    sessionStorage.setItem("admin_password", admin_data.admin_password);
                    window.location.replace(url);
                }
                else if (admin_data.message == 'Wrong Password') {
                    if (admin_data.login_attempts == 2) {
                        let message = (3 - admin_data.login_attempts) + " attempt remaining."
                        setToastr(admin_data.message, message, "warning");
                    }
                    else if (admin_data.login_attempts >= 3) {
                        let message = "Please contact system administrator."
                        setToastr("5 seconds lockout", message, "error");
                        $('#submit').prop('disabled', true);
                        $('#submit').css('background-color', '#808080');
                        setTimeout(function() {
                              $('#submit').prop('disabled', false);
                              $('#submit').css('background-color', '#4397d0');
                        }, 5000);
                    }
                    else {
                        let message = (3 - admin_data.login_attempts) + " Attempts Remaining."
                        setToastr(admin_data.message, message, "warning");
                    }
                }
                else {
                    attempts += 1;
                    if (attempts == 8) {
                        let message = (9 - attempts) + " Attempt Remaining."
                        setToastr(admin_data.message, message, "warning");
                    }
                    else if (attempts >= 9) {
                        let message = "No more attempts remaining."
                        setToastr("5 seconds lockout", message, "error");
                        $('#submit').prop('disabled', true);
                        $('#submit').css('background-color', '#808080');
                        setTimeout(function() {
                              $('#submit').prop('disabled', false);
                              $('#submit').css('background-color', '#4397d0');
                        }, 5000);
                        attempts = 0;
                    }
                    else {
                        let message = (9 - attempts) + " Attempts Remaining."
                        setToastr(admin_data.message, message, "warning");
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr)
            }
        });
    });
});

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
      else if (type == "success") {
        toastr.success(message, title);
      }
      else {
        toastr.warning(message, title);
      }
}
