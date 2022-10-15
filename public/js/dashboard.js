$(document).ready( function () {

});

$(window).on('load', function () {
    if (sessionStorage.admin_password.includes("_478324")) {
        setToastr();
    }
});

function setToastr() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "2000",
        "hideDuration": "0",
        "timeOut": "0",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "preventDuplicates": true
      };
      
      toastr.error("Please update your password to a more secured one.", "Important");
    }
