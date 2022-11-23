$(document).ready( () => {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/admins_add.php') {
        if(user_id == 4 || user_id == 5 || user_id == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
            setAddAdminPage();
        }
    }
    else {
        if (sessionStorage.getItem("save_message") == "Admin Updated Successfully.") {
            toastr.success(sessionStorage.getItem("save_message"));
            sessionStorage.removeItem("save_message");
        }

        setAdminTable();
        setViewModal();

        if (user_id != 2) {
            $('#save-admin-btn').addClass('hide');
            $('#edit-admin').addClass('hide');
        }
    }
});

// -------------------------------------------------------------------- View Admin
async function setAdminTable () {
    
    var t = $('#admins-table').DataTable();
    const admins = await fetchData('views/admin.php');

    for (var i = 0; i < admins.length; i++) {
        var tag;
        (admins[i].status == 'EMPLOYED') ? tag = 'bg-success' : tag = 'bg-danger';
        
        t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${admins[i].admin_id}</strong></th>
                <td>${admins[i].admin_name}</td>
                <td>${admins[i].role}</td>
                <td>${admins[i].admin_email}</td>
                <td><span class="badge ${tag}">${admins[i].status}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-admins" data-bs-whatever="${admins[i].admin_id}" id="try_lang"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }
}

async function setViewModal () {
    $("#view-admins").on("hidden.bs.modal", function () {
        $('#save-admin-btn').attr('disabled', true);
        $('#edit-admin').attr('disabled', false);
    });

    

    var viewModal = document.getElementById('view-admins')
    viewModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var admin_id = button.getAttribute('data-bs-whatever');
        var modalTitle = viewModal.querySelector('.modal-title');
        var admin_role;
      
        const [admin, user_levels, admin_statuses] = await Promise.all ([fetchData('admin/read_single.php?admin_id=' + admin_id), fetchData('user_level/read.php'), fetchData('statuses/read.php?status_table=admin_status')])

        $('#admin_id').val(admin.admin_id);
        $('#admin_username').val(admin.admin_username);
        $('#first_name').val(admin.first_name);
        $('#middle_name').val(admin.middle_name);
        $('#last_name').val(admin.last_name);
        $('#admin_bday').val(admin.birthdate);
        $('#employment_date').val(admin.employment_date);

        $('#mobile_number').val(admin.mobile_number);
        $('#admin_email').val(admin.admin_email);
        $('#address').val(admin.address);

        toggleInputData('disabled', true);
        setDefaultDropdown();

        modalTitle.textContent = admin_id + ' - ' + admin.first_name + ' ' + admin.last_name + ' [' + admin_role + ']';

        // Display Default Dropdown Data
        function setDefaultDropdown () {
            $("#role").empty();
            for (var i = 0; i < user_levels.length; i++) {
                if (user_levels[i].user_id == admin.user_level_id) {
                    admin_role = user_levels[i].user_role;
                    var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
                    $("#role").append(opt);
                }
            }

            $("#admin_status").empty();
            for (var i = 0; i < admin_statuses.length; i++) {
                if (admin_statuses[i].status_id == admin.admin_status_id) {
                    var opt = `<option value='${admin_statuses[i].status_id}'>${admin_statuses[i].status_name}</option>`;
                    $("#admin_status").append(opt);
                }
            }
        }

        async function setDropdownData () {
            $("#role").empty();
            $("#role").append(`<option selected disabled value="">Choose Admin Level</option>`);
            for (var i = 1; i < user_levels.length; i++) {
                if (user_levels[i].user_id == admin.user_level_id) {
                    var opt = `<option selected value='${user_levels[i].user_id}' style='color: blue'>${user_levels[i].user_role}</option>`;
                }
                else {
                    var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
                }
                $("#role").append(opt);
            }

            $("#admin_status").empty();
            $("#admin_status").append(`<option selected disabled>Choose Admin Status</option>`);
            for (var i = 0; i < admin_statuses.length; i++) {
                if (admin_statuses[i].status_id == admin.admin_status_id) {
                    var opt = `<option selected value='${admin_statuses[i].status_id}' style='color: blue'>${admin_statuses[i].status_name}</option>`;
                }
                else {
                    var opt = `<option value='${admin_statuses[i].status_id}'>${admin_statuses[i].status_name}</option>`;
                }
                $("#admin_status").append(opt);
            }
        }

        function toggleInputData (setAttr, bool) {
            $('#mobile_number').attr(setAttr, bool);
            $('#admin_email').attr(setAttr, bool);
            $('#address').attr(setAttr, bool);
            $('#role').attr(setAttr, bool);
            $('#admin_status').attr(setAttr, bool);
        }

        
        async function updateAdminData() {
            const admin_id = $('#admin_id').val();
        
            let admin_data = JSON.stringify({
                'admin_id' : admin_id,
                'admin_email' : $('#admin_email').val(),
                'mobile_number' : $('#mobile_number').val(),
                'address' : $('#address').val(),
                'user_level_id' : $('#role').val()
            });
        
            let status_data = JSON.stringify({
                'admin_id' : admin_id,
                'admin_status_id' : $('#admin_status').val()
            });

            let activity, log = true;
            if (admin.admin_status_id != $('#admin_status').val()) {
                activity = 'Updated admin status [' + admin_id + ' - ' + admin.first_name + ' ' + admin.last_name + '].';
                log = await logActivity(activity, 'View Admins');
            }
            if (admin.user_level_id != $('#role').val()) {
                activity = 'Updated admin user level [' + admin_id + ' - ' + admin.first_name + ' ' + admin.last_name + '].';
                log = await logActivity(activity, 'View Admins');
            }
            if (admin.admin_email != $('#admin_email').val() || admin.mobile_number != $('#mobile_number').val() || admin.address != $('#address').val()) {
                activity = 'Updated admin general information [' + admin_id + ' - ' + admin.first_name + ' ' + admin.last_name + '].';
                log = await logActivity(activity, 'View Admins');
            }

            const [admin_content, status_content] = await Promise.all ([updateData('admin/update.php', admin_data), updateData('admin/update_status.php', status_data)]);

            if (admin_content.message == 'success' && status_content.message == 'Admin Updated' && log) {
                sessionStorage.setItem('save_message', "Admin Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Admin was not updated.");
            }
        }

        const edit_admin = document.getElementById('edit-admin');
        edit_admin.onclick = (e) => {
            e.preventDefault();
            $('#save-admin-btn').attr('disabled', false);
            $('#edit-admin').attr('disabled', true);
            toggleInputData('disabled', false);
            setDropdownData();
        };

        const save_admin = document.getElementById('save-admin');
        save_admin.onsubmit = (e) => {
            e.preventDefault();
            updateAdminData();
        };
    });

}

// -------------------------------------------------------------------- Add Admin
async function setAddAdminPage () {
    const add_admin = document.getElementById('add-admin');
    $('#admin_id').val(await generateAdminID());
    
    setAddDropdown();

    add_admin.onsubmit = (e) => {
        e.preventDefault();
        addAdmin();
    };

    async function addAdmin() {
        let data = JSON.stringify({
            'admin_id' : $('#admin_id').val(),
            'first_name' : $('#first_name').val(),
            'middle_name' : $('#middle_name').val(),
            'last_name' : $('#last_name').val(),
            'mobile_number' : $('#mobile_number').val(),
            'admin_email' : $('#admin_email').val(),
            'birthdate' : $('#admin_bday').val(),
            'address' : $('#address').val(),
            'employment_date' : $('#employment_date').val(),
            'user_level_id' : $('#role').val()
        });
    
        let content = await createData('admin/create.php', data);
        let log = await logActivity('Created new admin account with Admin ID # ' + $('#admin_id').val(), 'Add New Admin');
        
        if (content.message = 'Admin Created' && log) {
            toastr.success('Admin Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/admins.php');
             }, 2000);
        }
    }

    async function setAddDropdown() {
        const user_levels = await fetchData('user_level/read.php');
        for (var i = 1; i < user_levels.length; i++) {
            var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
            $("#role").append(opt);
        }
    }
}

async function generateAdminID() {
    let content = fetchData('admin/read.php');
    let unique = false;

    while (unique == false) {
        let checker = 0;
        let rand_num = Math.round(Math.random() * 99999);

        for (let i = 0; i < content.length; i++) {
            if (rand_num == content[i].admin_id) {
                checker++;
            }
        }
        if (checker == 0) {
            // unique = true;
            return rand_num.toString();
        }
    }
}