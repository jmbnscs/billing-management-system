const DIR_API = 'http://localhost/gstech_api/api/';
const admin_id = sessionStorage.getItem('admin_id');

// On Boot Load
$(document).ready( () => {
    if (sessionStorage.admin_status_id == 3) {
        let msg = "Please contact the system administrator.";
        let title = "Your account has been locked!"
        setToastrArgs(msg, title);
    }

    //to hash condition
    if (sessionStorage.admin_password.includes("_478324")) { 
        let msg = "Please change your password.";
        let title = "Important!"
        setToastrArgs(msg, title);
    }

    setDefaults();
    //setToastr();
});

// Get Data
async function getAdminData(admin_id) {
    let url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Get User Level
async function getUserLevel(user_id) {
    let url = DIR_API + 'user_level/read_single.php?user_id=' + user_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Display Default Data
async function setDefaults () {
    const admin_data = await getAdminData(admin_id);
    const user_id = await getUserLevel(admin_data.user_level_id);

    const profile = document.getElementById('profile').children;
    const child = profile[0].children;

    child[0].innerHTML = admin_data.first_name + ' ' + admin_data.last_name;
    child[1].innerHTML = user_id.user_role;

    if (admin_data.user_level_id == 3) {
        const navbar = document.getElementById('sidebar-nav').children;
        for (var i = 0; i < navbar.length; i++) {
            if (navbar[i].id == 'hide') {
                navbar[i].classList.remove('hide');
            }
        }
    }

    const display = document.getElementById('displayName').children;
    const display_name = display[0].children;
    display_name[1].innerHTML = admin_data.first_name;
}

// Logout Session
function logout() {
    sessionStorage.clear();
    $.ajax({
        url: '../../app/includes/logout.inc.php',
        cache: false,
        success: function() {
            window.location.replace('../views/login.php');
        },
        error: function (xhr, status, error) {
            console.error(xhr)
        }
    });
}

function setToastr() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "rtl": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
}

function setToastrArgs(msg, title) {
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

