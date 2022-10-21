const add_admin = document.getElementById('add-admin');

$(document).ready( () => {
    displayUserLevels();
});

async function addAdmin() {
    const first_name = $('#first_name').val();
    const middle_name = $('#middle_name').val();
    const last_name = $('#last_name').val();

    const mobile_number = $('#mobile_number').val();
    const admin_email = $('#admin_email').val();
    const birthdate = $('#admin_bday').val();
    const address = $('#address').val();

    const employment_date = $('#employment_date').val();
    const user_level_id = $('#role').val();

    let url = DIR_API + 'admin/create.php';
    const addAdminResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'first_name' : first_name,
            'middle_name' : middle_name,
            'last_name' : last_name,
            'mobile_number' : mobile_number,
            'admin_email' : admin_email,
            'birthdate' : birthdate,
            'address' : address,
            'employment_date' : employment_date,
            'user_level_id' : user_level_id
        })
    });

    const content = await addAdminResponse.json();
    
    if (content.message = 'Admin Created') {
        toastr.success('Admin Created Successfully.');
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

async function displayUserLevels() {
    let url = DIR_API + 'user_level/read.php';
    let user_levels;
    try {
        let res = await fetch(url);
        user_levels = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 2; i < user_levels.length; i++) {
        var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
        $("#role").append(opt);
    }
}

// Form Submits -- onclick Triggers
add_admin.onsubmit = (e) => {
    e.preventDefault();
    addAdmin();
};


