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
    if (logged_in !== undefined || logged_in !== null && logged_in === 'successful') {
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
    else if (admin_id == undefined || admin_id == null) {
        window.location.replace('../views/login.php');
    }
});

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

// Functions to format data display
function setTagElement(id, status) {
    document.getElementById(id).classList.add('text-white');
    document.getElementById(id).classList.remove('bg-danger');
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

    // Set User Levels
    if (level_id == 3) {
        $('#misc-page').addClass('hide');
        $('#admin-add').addClass('hide');
    }
    else if (level_id == 4) {
        $('#ticket-page').addClass('hide');
    }
    else if (level_id == 5) {
        $('#invoice-payment-add').addClass('hide');
    }
    else if (level_id == 6) {
        $('#invoice-payment-add').addClass('hide');
        $('#invoice-payment').addClass('hide');
        $('#invoice-prorate').addClass('hide');
        $('#ticket-page').addClass('hide');
    }

    if (level_id == 4 || level_id == 5 || level_id == 6) {
        $('#admin-add').addClass('hide');
        $('#customer-add').addClass('hide');
        $('#plan-add').addClass('hide');
        $('#misc-page').addClass('hide');
    }

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
}

// Logout Session
function logout() {
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

async function generateID(fetch_page, added_string, size) {
    const content = fetchData(fetch_page);

    while (true) {
        let checker = 0;
        let rand_num = added_string + Math.round(Math.random() * Number((9).toString().repeat(size)));
        console.log(rand_num)
        for(let i = 0; i < content.length; i++) {
            if(rand_num == content[i].ticket_num) {
                checker++;
            }
        }
        if ((checker == 0) && (rand_num.length == (size + added_string.length))) {
            return rand_num;
        }
    }
}