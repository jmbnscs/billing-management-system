$(document).ready( function () {

});

$(window).on('load', function () {

    if (sessionStorage.admin_status_id == 3) {
        let msg = "Please contact the system administrator to enable account.";
        let title = "Your account is under lockout!"
        setToastr(msg, title);
    }

    //to hash condition
    if (sessionStorage.admin_password.includes("_478324")) { 
        let msg = "Please update your password to a more secured one.";
        let title = "Important"
        setToastr(msg, title);
    }
});

function setToastr(msg, title) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "2000",
        "hideDuration": "0",
        "timeOut": "0",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      
      toastr.error(msg, title);
    }
