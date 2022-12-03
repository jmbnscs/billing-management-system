$(document).ready( async () => {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/admins_add.php') {
        if(await checkRestriction()) {
            window.location.replace("../views/dashboard.php");
        }
        else {
            setAddAdminPage();
        }
    }
    else {
        displaySuccessMessage();
        setViewAdminPage();

        const restrict_btn = await updateData('pages/get_btn_restriction.php', JSON.stringify({'user_id': user_id, 'nav_id' : 'admin-view'}));

        if (restrict_btn.length > 0) {
            for (var i = 0; i < restrict_btn.length; i++) {
                $('#' + restrict_btn[i].page_button).addClass('hide');
            }
        }
    }
});

async function checkRestriction () {
    const content = await fetchData('restriction/get_user_restriction.php?user_id=' + user_id);

    if (content.length > 0) {
        for (var i = 0; i < content.length; i++) {
            if (content[i].nav_id == 'admin-add') {
                setErrorMessage();
                return true;
            }
        }
        return false;
    }
    else {
        return false;
    }
}

// -------------------------------------------------------------------- View Admin
async function setViewAdminPage () {
    setAdminTable();
    setViewModal();
    
    async function setAdminTable () {
    
        var t = $('#admins-table').DataTable( {
            "searching": true
        });

        const [admin_statuses, user_roles, admins] = await Promise.all ([fetchData('statuses/read.php?status_table=admin_status'), fetchData('user_level/read.php'), fetchData('views/admin.php')]);

        for (var i = 0; i < admin_statuses.length; i++) {
            var opt = `<option value='${admin_statuses[i].status_name}'>${admin_statuses[i].status_name}</option>`;
            $("#status-filter").append(opt);
        }

        for (var i = 1; i < user_roles.length; i++) {
            var opt = `<option value='${user_roles[i].user_role}'>${user_roles[i].user_role}</option>`;
            $("#role-filter").append(opt);
        }
    
        for (var i = 0; i < admins.length; i++) {
            var tag;
            (admins[i].status == 'Active') ? tag = 'bg-success' : tag = 'bg-danger';
            
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
    
        $("#admins-table_filter.dataTables_filter").append($("#role-filter"));
        $("#admins-table_filter.dataTables_filter").append($("#status-filter"));

        var statusIndex = 0, roleIndex = 0;
        $("#admins-table th").each(function (i) {
            if ($($(this)).html() == "Status") {
                statusIndex = i; return false;
            }
        });

        $("#admins-table th").each(function (i) {
            if ($($(this)).html() == "Role") {
                roleIndex = i; return false;
            }
        });

        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
              var selectedItem = $('#status-filter').val()
              var category = data[statusIndex];
              if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
              }
              return false;
            }
          );

        $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var selectedItem = $('#role-filter').val()
            var category = data[roleIndex];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
        );

        $("#status-filter").change(function (e) {
            t.draw();
        });

        $("#role-filter").change(function (e) {
            t.draw();
        });

        t.draw();
        t.columns.adjust().draw();
    }
    
    async function setViewModal () {
        $("#view-admins").on("hidden.bs.modal", function () {
            $('#save-btn').attr('disabled', true);
            $('#edit-btn').attr('disabled', false);
        });
    
        var viewModal = document.getElementById('view-admins')
        viewModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var admin_id = button.getAttribute('data-bs-whatever');
            var modalTitle = viewModal.querySelector('.modal-title');
            var admin_role;
          
            const [admin, user_levels, admin_statuses, defaults] = await Promise.all ([fetchData('admin/read_single.php?admin_id=' + admin_id), fetchData('user_level/read.php'), fetchData('statuses/read.php?status_table=admin_status'), fetchData('logs/read_admin_default.php?admin_id=' + admin_id)])
    
            $('#admin_id').val(admin.admin_id);
            $('#admin_username').val(admin.admin_username);
            $('#admin_password').val(defaults.def_password);
            
            $('#first_name').val(admin.first_name);
            (admin.middle_name == null || admin.middle_name === '') ? $('#middle_name').val('N/A') : $('#middle_name').val(admin.middle_name);
            $('#last_name').val(admin.last_name);
            $('#admin_bday').val(admin.birthdate);
            $('#employment_date').val(admin.employment_date);
    
            $('#mobile_number').val(admin.mobile_number);
            $('#admin_email').val(admin.admin_email);
            $('#address').val(admin.address);
    
            toggleInputData('disabled', true);
            setDefaultDropdown();
    
            modalTitle.textContent = admin.first_name + ' ' + admin.last_name + ' [' + admin_role + ']';
    
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
                if (admin.admin_id != '11674') {
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
                else {
                    $("#role").attr('disabled', true);
                    $("#admin_status").attr('disabled', true);
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
                    activity = 'Updated admin status [' + admin_id + ' - ' + admin.first_name + ' ' + admin.last_name + ']';
                    log = await logActivity(activity, 'View Admins');
                }
                if (admin.user_level_id != $('#role').val()) {
                    activity = 'Updated admin user level [' + admin_id + ' - ' + admin.first_name + ' ' + admin.last_name + ']';
                    log = await logActivity(activity, 'View Admins');
                }
                if (admin.admin_email != $('#admin_email').val() || admin.mobile_number != $('#mobile_number').val() || admin.address != $('#address').val()) {
                    activity = 'Updated admin general information [' + admin_id + ' - ' + admin.first_name + ' ' + admin.last_name + ']';
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
    
            const edit_admin = document.getElementById('edit-btn');
            edit_admin.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
                setDropdownData();
            };
    
            const save_admin = document.getElementById('save-admin');
            save_admin.onsubmit = (e) => {
                e.preventDefault();
                updateAdminData();
            };
    
            const reset_pwd_btn = document.getElementById('reset-btn');
            reset_pwd_btn.onclick = (e) => {
                e.preventDefault();
                $('#view-admins').modal('hide');
                setResetPWModal(admin_id);
            };
        });
    }
    
    async function setResetPWModal (admin_id) {
        var resetModal = document.getElementById('reset-pw-modal');
        var modalTitle = resetModal.querySelector('.modal-title');
        modalTitle.textContent = 'Reset Password for Admin ' + admin_id + '?';
    
        const content = await fetchData('logs/read_admin_default.php?admin_id=' + admin_id);
        const admin_content = await fetchData('admin/read_single.php?admin_id=' + admin_id);
        $('#admin_id_rst').val(content.admin_id);
        $('#admin_username_rst').val(content.def_username);
        $('#admin_password_rst').val(content.def_password);
    
        const reset_pwd = document.getElementById('reset-password');
        reset_pwd.onsubmit = (e) => {
            e.preventDefault();
            resetPassword();
        };
    
        async function resetPassword() {
            let update_data = JSON.stringify({
                'admin_id' : content.admin_id,
                'admin_password' : content.def_password
            });
    
            const [update_content, log] = await Promise.all ([updateData('admin/reset_password.php', update_data), logActivity('Password Reset for Admin ' + content.def_username + ' - ' + admin_id, 'View Admins')]);
    
            if (update_content.success && log) {
                toastr.success('Password has been reset successfully.');
                setTimeout (() => {
                    window.location.reload();
                }, 2000);
            }
            else {
                toastr.error('Some error has occurred, please try again later.');
                // toastr.error(update_content.error);
            }
        }
    }
}

// -------------------------------------------------------------------- Add Admin
async function setAddAdminPage () {
    $('#admin_id').val(await generateID('check/admin_id.php?admin_id=', "", 5));
    
    setAddDropdown();
    setAllowedDate('#admin_bday');
    setDateRange('#employment_date', '2021-09-23');
    $('#employment_date').val(getDateToday());

    const add_admin = document.getElementById('add-admin');
    add_admin.onsubmit = (e) => {
        e.preventDefault();
        if (isLegalAge($('#admin_bday').val())) {
            if (isWithinRange($('2021-09-23' ,'#employment_date').val())) {
                addAdmin();
            }
            else {
                toastr.warning('Employment date is not within range.');
            }
        }
        else {
            toastr.warning('The birthday provided is not of legal age.');
        }
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

        const [content, log] = await Promise.all ([createData('admin/create.php', data), logActivity('Created new admin account with Admin ID # ' + $('#admin_id').val(), 'Add New Admin')]);
        
        if (content.success && log) {
            let create_content = await fetchData('admin/read_single.php?admin_id=' + $('#admin_id').val());
            let log_data = JSON.stringify({
                'admin_id' : $('#admin_id').val(),
                'def_username' : create_content.admin_username,
                'def_password' : create_content.admin_password
            });

            let update_data = JSON.stringify({
                'admin_id' : $('#admin_id').val(),
                'admin_password' : create_content.admin_password
            });
    
            Promise.all ([createData('logs/log_admin_default.php', log_data), updateData('admin/reset_password.php', update_data)]);
            
            toastr.success('Admin Created Successfully.');
                setTimeout(function(){
                    window.location.replace('../views/admins.php');
                 }, 2000);
            
        }
        else {
            toastr.error('Some error has occurred, please try again later.');
            setTimeout(function(){
                window.location.reload();
             }, 2000);
        }
    }

    async function setAddDropdown() {
        const user_levels = await fetchData('user_level/read.php');
        for (var i = 2; i < user_levels.length; i++) {
            var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
            $("#role").append(opt);
        }
    }
}