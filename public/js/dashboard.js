$(document).ready( function () {
    //to hash condition
    // console.log(hashed);
    if (hashed == 0) { 
        window.location.replace('../views/profile.php');
    }
    if (sessionStorage.getItem('error_message') !== null) {
        setToastrArgs(sessionStorage.getItem('error_message'), "Error");
        sessionStorage.setItem('error_message', null);
    }
});

// $(window).on('load', function () {

// });

