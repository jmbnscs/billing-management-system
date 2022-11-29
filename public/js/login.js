// Frontend JS
const cb = document.getElementById('remember_me');
const un = document.getElementById('admin_username');
const lbl = document.getElementById('un');

/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {

    'use strict';

    initializeAttempts();

    // Remember Me
    $( () => {
        if (localStorage.checked == "true") {
            un.value = localStorage.un;
            lbl.classList.add('active');
            cb.setAttribute("checked", "checked");
        }
        else {
            un.value = "";
            cb.checked = false;
        }
    });


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
const DIR_API = 'http://localhost/gstech_api/api/';

async function login () {
    const admin_username = $('#admin_username').val();
    const admin_password = $('#admin_password').val();

    if (localStorage.getItem('admin_username') == null) {
        localStorage.setItem('admin_username', admin_username);
    }
    else if (localStorage.getItem('admin_username') != admin_username) {
        localStorage.setItem('attempts', 3);
        localStorage.setItem('admin_username', admin_username);
    }

    if (cb.checked) {
        localStorage.un = admin_username;
        localStorage.checked = true;
    }
    else {
        localStorage.un = "";
        localStorage.checked = false;
    }

    let url = DIR_API + 'admin/login.php';

    const loginResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'admin_username' : admin_username,
            'admin_password' : admin_password
        })
    });

    const content = await loginResponse.json();
    var attempt;
    
    if (content.message == 'success') {
        localStorage.setItem('admin_id', content.admin_id);
        localStorage.setItem('login', 'successful');
        window.location.replace('../views/dashboard.php');
    }
    else if (content.message == 'change password') {
        localStorage.setItem('hashed', 0);
        localStorage.setItem('admin_id', content.admin_id);
        localStorage.setItem('login', 'successful');
        window.location.replace('../views/dashboard.php');
    }
    else if (content.message == 'Invalid Password'){
        // console.log(localStorage.getItem('attempts'));
        attempt = localStorage.getItem('attempts');
        console.log(attempt);
        localStorage.setItem('attempts', attempt - 1);
        if ((content.login_attempts === 5) && (localStorage.getItem('attempts') <= 0)) {
            let message = "3 attempts remaining before lockout.";
            setToastr("Warning", message, "error");
            disableLoginButton();
            localStorage.setItem('attempts', 3);
        }
        else if (content.login_attempts === 5) {
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
            setToastr(content.message, message, "warning");
        }
        else {
            let message = localStorage.getItem('attempts') + " attempts remaining."
            setToastr(content.message, message, "warning");
        }
    }
    else if (content.message == 'Invalid Credentials'){
        setToastr("Warning", content.message, "error");
    }
    else {
        localStorage.setItem('attempts', 3);
        localStorage.setItem('admin_username', admin_username);
        setToastr(content.message, "Please contact the system administrator.", "error");
    }
}

$(function () {
    $('form').on('submit', function(e) {
        e.preventDefault();

        login();
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

function preventBack() { window.history.forward(); }
    setTimeout(preventBack(), 0);
    window.onunload = function () { null };