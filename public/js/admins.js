$(document).ready( () => {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/admins_add.php') {
        setAddAdminPage();
    }
    else {
        getAdmins();
    }
});

// View Admin JS
async function getAdmins () {
    let url = DIR_API + 'views/admin.php';
    let admin_data;
    var t = $('#admins-table').DataTable();
    try {
        let res = await fetch(url);
        admin_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < admin_data.length; i++) {
        var tag;
        if (admin_data[i].status == 'EMPLOYED') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${admin_data[i].admin_id}</a></th>
                <td>${admin_data[i].admin_name}</td>
                <td><a href="#" class="text-primary">${admin_data[i].role}</a></td>
                <td>${admin_data[i].admin_email}</td>
                <td><span class="badge ${tag}">${admin_data[i].status}</span></td>
            </tr>
        `)).draw(false);
    }
}

// Add Admin JS
const getAdminID = async () => {
    const result = await generateAdminID();
    return result;
}

async function generateAdminID() {
    let url = DIR_API + 'admin/read.php';
    try {
        let res = await fetch(url);
        response = await res.json();

        let unique = false;
        while(unique == false) {
            let checker = 0;
            let rand_num = Math.round(Math.random() * 99999);
            for(let i = 0; i < response.length; i++) {
                if(rand_num == response[i]['admin_id']) {
                    checker++;
                }
            }
            if (checker == 0) {
                unique = true;
                return rand_num.toString();
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function addAdmin() {
    const admin_id = $('#admin_id').val();

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
            'admin_id' : admin_id,
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

    for (var i = 1; i < user_levels.length; i++) {
        var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
        $("#role").append(opt);
    }
}

function setAddAdminPage () {
    const add_admin = document.getElementById('add-admin');
    
    getAdminID().then(result => {
        $("#admin_id").attr("value", result);
    });

    displayUserLevels();

    // Form Submits -- onclick Triggers
    add_admin.onsubmit = (e) => {
        e.preventDefault();
        addAdmin();
    };
}