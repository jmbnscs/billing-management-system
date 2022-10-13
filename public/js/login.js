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
    

    error.classList.add('hide-error');
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



$(function () {
    $('form').on('submit', function(e) {
        e.preventDefault();
        const admin_username = $('#admin_username').val();
        const admin_password = $('#admin_password').val();

        error.classList.add('hide-error');

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
                if (admin_data.message == 'success') {
                    const url = '../views/dashboard.php';
                    sessionStorage.setItem("admin_id", admin_data.admin_id);
                    window.location.replace(url);
                }
                else if (admin_data.message == 'failed') {
                    // error.classList.add('hide-error');
                    const admin_data = JSON.parse(data);
                    error.classList.remove('hide-error');
                    // error.insertAdjacentText('beforeend', 'Username does not exist.');
                    // error.innerHTML += '<i class="bi bi-exclamation-octagon me-1"></i>'
                    error.innerHTML = 'Username does not exist.';
                    // appendChild(admin_data.message);
                    // Error Handling Here
                    console.log(admin_data.message);
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr)
            }
        });
    });
});
