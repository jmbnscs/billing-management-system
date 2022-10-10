const overview = document.getElementById('profile-overview').children;
const edit = document.getElementById('edit-profile');
const edit_profile = document.getElementById('edit-form');
const change_password = document.getElementById('change-password');
var admin_data;
var user_level;
var level;

// On Boot Load
$(document).ready( () => {
    displayData();
});

async function displayData() {
    const data = await getAdminData(admin_id);
    const user = await getUserLevel(data.user_level_id);
    $(".profile-card h2").html(data.first_name + ' ' + data.last_name);
    $(".profile-card h3").html(user.user_role);
    
    for (var i = 0; i < overview.length; i++) {
        // console.log(overview[i]);
        var row = overview[i].children;
        // console.log(row);
        for (var j = 0; j < row.length; j++) {
            if (row[j].id == 'full_name') {
                row[j].innerHTML = data.first_name + ' ' + data.last_name;
            }
            else if (row[j].id == 'email') {
                row[j].innerHTML =  data.admin_email;
            }
            else if (row[j].id == 'mobile_number') {
                row[j].innerHTML =  data.mobile_number;
            }
            else if (row[j].id == 'first_name') {
                row[j].innerHTML =  data.first_name;
            }
            else if (row[j].id == 'middle_name') {
                row[j].innerHTML =  data.middle_name;
            }
            else if (row[j].id == 'last_name') {
                row[j].innerHTML =  data.last_name;
            }
            else if (row[j].id == 'birthdate') {
                row[j].innerHTML =  data.birthdate;
            }
            else if (row[j].id == 'address') {
                row[j].innerHTML =  data.address;
            }
            else if (row[j].id == 'employment_date') {
                row[j].innerHTML =  data.employment_date;
            }
        }
    }
}

async function displayEditData () {
    const data = await getAdminData(admin_id);
    document.getElementById('fullName').value = data.first_name + ' ' + data.last_name; 
    document.getElementById('edit-email').value = data.admin_email;
    document.getElementById('edit-number').value = data.mobile_number;
    document.getElementById('edit-bday').value = data.birthdate;
    document.getElementById('edit-address').value = data.address;
    document.getElementById('edit-emp-date').value = data.employment_date;
}

async function updateAdmin() {
    // Fetch Data
    const admin_email = $('#edit-email').val();
    const mobile_number = $('#edit-number').val();
    const address = $('#edit-address').val();

    let url = DIR_API + 'admin/update.php';

    const rawResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'admin_id' : admin_id,
            'admin_email' : admin_email,
            'mobile_number' : mobile_number,
            'address' : address
        })
    });

    const content = await rawResponse.json();
    
    if (content.message = 'Admin Updated') {
        location.reload();
    }
}

async function changePassword() {
    // Fetch Data
    const currentPassword = $('#currentPassword').val();
    const newPassword = $('#newPassword').val();
    const renewPassword = $('#renewPassword').val();

    console.log(currentPassword);
}



// Form Submits -- onclick Triggers

edit.onclick = () => {displayEditData()};

edit_profile.onsubmit = (e) => {
    e.preventDefault();
    updateAdmin();
};

change_password.onsubmit = (e) => {
    e.preventDefault();
    changePassword();
}