// Directories
const DIR_API = 'http://localhost/gstech_api/api/';
const DIR_MAIN = '/billing-management-system/public/';
const DIR_APP = 'http://localhost/billing-management-system/app/includes/';
const DIR_CUR = window.location.pathname;

// Constant Variables
const admin_id = localStorage.getItem('admin_id');
const admin_status_id = sessionStorage.getItem('admin_status_id');
const hashed = localStorage.getItem('hashed');
const logged_in = localStorage.getItem('login');
const admin_un = localStorage.getItem('admin_username');
const user_id = localStorage.getItem('user_id');

$(document).ready( () => {
    if(checkDefaults()) {
        if (admin_status_id == 3) {
            let msg = "Please contact the system administrator.";
            let title = "Your account has been locked!"
            setToastrArgs(msg, title);
        }
    
        if (hashed == 0) { 
            let msg = "Please change your password.";
            let title = "Important!"
            setToastrArgs(msg, title);
        }
    
        setDefaults();
        setToastr();
    }
    else {
        window.location.replace('../views/login.php');
    }
});

function checkDefaults() {
    if (admin_id === undefined || admin_id == 'null' || admin_id === null || admin_id == 'undefined') {
        window.location.replace('../views/login.php');
    }
    else {
        return true;
    }
}

// Check if still using Default Password
function isDefault () {
    if (hashed == 0) { 
        window.location.replace('../views/profile.php');
    }
}

// Log Admin Activity
async function logActivity(activity, page_accessed) {
    let url = DIR_APP + 'log_activity.php';
    let content;
    try {
        let res = await fetch(url);
        content = await res.json();
    } catch (error) {
        console.log(error);
    }

    url = DIR_API + 'logs/log_activity.php';
    const logActivityResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'admin_id' : admin_id,
            'username' : admin_un,
            'page_accessed' : page_accessed,
            'activity' : activity,
            'ip_address' : content.ip_address,
            'user_agent' : content.user_agent
        })
    });

    const logActivity = await logActivityResponse.json();

    return logActivity.message;
}

// Global Function to Process Data
async function createData(page, data) {
    let url = DIR_API + page;
    const createResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : data
    });

    return await createResponse.json();
}

async function fetchData(page) {
    let url = DIR_API + page;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function updateData(page, data) {
    let url = DIR_API + page;
    const updateResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : data
    });
    return await updateResponse.json();
}

async function deleteData(page, data) {
    let url = DIR_API + page;
    const deleteResponse = await fetch(url, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : data
    });
    return await deleteResponse.json();
}

// Functions to Fetch Single Data
async function getAdminData(admin_id) {
    let url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getUserLevel(user_id) {
    let url = DIR_API + 'user_level/read_single.php?user_id=' + user_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getStatusName(status_table, status_id) {
    let url = DIR_API + 'statuses/read_single.php';
    const statusResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'status_table' : status_table,
            'status_id' : status_id
        })
    });

    let content = await statusResponse.json();

    return content.status_name;
}

async function isAccountIDExist(account_id) {
    const content = await fetchData('account/read.php');

    for (var i = 0; i < content.length; i++) {
        if (content[i].account_id == account_id) {
            return true;
        }
    }
    return false;
}

// Functions to format data display
async function generateID(fetch_page, added_string, size) {
    while (true) {
        let rand_num = added_string + Math.round(Math.random() * Number((9).toString().repeat(size)));
        let content = await fetchData(fetch_page + rand_num);
        if (!content.exist) {
            if (rand_num.length == (size + added_string.length)) {
                return rand_num;
            }
        }
    }
}

function setTagElement(id, status) {
    document.getElementById(id).classList.add('text-white');
    document.getElementById(id).classList.remove('bg-danger');
    document.getElementById(id).classList.remove('bg-warning');
    document.getElementById(id).classList.remove('bg-success');

    if (status == 1) {
        document.getElementById(id).classList.add('bg-success');
    }
    else if (status == 2) {
        document.getElementById(id).classList.add('bg-danger');
    }
    else {
        document.getElementById(id).classList.add('bg-warning');
    }
}

function getDateToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

function formatDateString(date) {
    var temp = new Date(date);
    var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][temp.getMonth()];
    return month + ' ' + temp.getDate() + ', ' + temp.getFullYear();
}

function displaySuccessMessage() {
    const msg = sessionStorage.getItem('save_message');
    if (msg !== null) {
        toastr.success(sessionStorage.getItem("save_message"));
        sessionStorage.removeItem("save_message");
    }
}

function setErrorMessage() {
    sessionStorage.setItem('error_message', "You don't have access to this page.");
}

let create_fn, edit_fn, update_fn, delete_fn;
function setButtons() {
    create_fn = document.getElementById('create-new');
    edit_fn = document.getElementById('edit-btn');
    update_fn = document.getElementById('update-data');
    delete_fn = document.getElementById('delete-data');
}

function isLegalAge(bday) {
	var today = new Date();
    var year_today = today.getFullYear();
    var month_today = today.getMonth() + 1;
    var day_today = today.getDate();

    var bdate = new Date(bday);
    var year_bdate = bdate.getFullYear();
    var month_bdate = bdate.getMonth() + 1;
    var day_bdate = bdate.getDate();

    var by = Number.parseFloat(year_bdate),
		bm = Number.parseFloat(month_bdate),
		bd = Number.parseFloat(day_bdate),
		ty = Number.parseFloat(year_today),
		tm = Number.parseFloat(month_today),
		td = Number.parseFloat(day_today);

    if (td < bd) {
        tm = tm - 1;
    } 

    if (tm < bm) {
        ty = ty - 1;
    } 

    var age = ty - by;
    
    if (age >= 18) {
        return true;
    }
    else {
        return false;
    }
}

// Birthday
function setAllowedDate(id) {
    var maxBirthdayDate = new Date();
    maxBirthdayDate.setFullYear( maxBirthdayDate.getFullYear() - 18 );

    $(id).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        maxDate: maxBirthdayDate,
        yearRange: '1950:'+ maxBirthdayDate.getFullYear(),
    });
}

// Range Date
function setDateRange(id, date) {
    var minDate = new Date(date);
    var maxDate = new Date();

    $(id).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: minDate,
        maxDate: maxDate,
        yearRange: minDate.getFullYear() + ':' + maxDate.getFullYear()
    });
}

function isWithinRange(date, input_date) {
    var minDate = new Date(date);
    var maxDate = new Date(new Date().setHours(23,59,59,999));
    var inputDate = new Date(input_date);

    // console.log(maxDate.getMonth() - minDate.getMonth());

    return minDate < inputDate && inputDate < maxDate;
}

// function formToggle(ID){
//     var element = document.getElementById(ID);
//     if(element.style.display === "none"){
//         element.style.display = "block";
//     }else{
//         element.style.display = "none";
//     }
// }

// Display Default Data
async function setDefaults () {
    const admin_data = await getAdminData(admin_id);
    const user = await getUserLevel(admin_data.user_level_id);
    const level_id = admin_data.user_level_id;

    localStorage.setItem('admin_username', admin_data.admin_username);
    localStorage.setItem("user_id", admin_data.user_level_id);

    // Dropdown Display
    $('#display_name').text(admin_data.first_name + ' ' + admin_data.last_name);
    $('#display_role').text(user.user_role);
    $('#display_dd_name').text(admin_data.admin_username);

    const restrict_content = await fetchData('restriction/get_pages_restriction.php?user_id=' + level_id);
    const keys = Object.keys(restrict_content);

    keys.forEach((key, index) => {
        // console.log(`${key}: ${restrict_content[key]}`);
        if (restrict_content[key] == 0) {
            $('#' + key).addClass('hide');
        }
    });
}

async function restrictFunctions (page) {
    const restriction = await fetchData('restriction/get_buttons_restriction.php?user_id=' + user_id);
    const keys = Object.keys(restriction);

    keys.forEach((key, index) => {
        if (key.split("-")[0] == page) {
            if (restriction[key] == 0) {
                $('#' + key.split("-")[1] + '-btn').addClass('hide');
            }
        }
    });
}

function restrictPages (dir) {
    // const restrict_content = await fetchData('restriction/get_pages_restriction.php?user_id=' + user_id);
    fetch(DIR_API + 'restriction/get_pages_restriction.php?user_id=' + user_id)
        .then((response) => response.json())
        .then((data) => {
            const keys = Object.keys(data);

            keys.forEach((key, index) => {
                if (key == dir) {
                    if (data[key] == 0) {
                        setErrorMessage();
                        window.location.replace("../views/dashboard.php");
                    }
                }
            });
        });
}

$(() => {
    // Navbar Active Config
    const path = location.pathname.split('/')[4];
    const id = 'nav-' + path.split('.')[0];
    const nav_id = path.split('_')[0].split('.')[0];

    $('#' + id).addClass('active');
    $('#drop-' + nav_id).removeClass('collapsed');
    $('#' + nav_id + '-nav').addClass('show');

    if (id == 'nav-dashboard' || id == 'nav-profile') {
        document.getElementById(id).classList.remove('collapsed');
    }
    if (nav_id == 'connection' || nav_id == 'concerns' || nav_id == 'user' || nav_id == 'inclusions' || nav_id == 'area') {
        $('#drop-options').removeClass('collapsed');
        $('#options-nav').addClass('show');
    }
})

$('#account-settings').on('click', (e) => {
    e.preventDefault();
    sessionStorage.setItem('edit', true);
    window.location.replace('../views/profile.php');
})

// Logout Session
function logout() {
    logActivity('Logged out of Session', 'Login');
    sessionStorage.clear();
    localStorage.clear();
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

    function preventBack() { window.history.forward(); }
    setTimeout(preventBack(), 0);
    window.onunload = function () { null };
}

// Toastr Configs
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