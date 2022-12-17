$(document).ready(function () {
    isDefault();

    if (sessionStorage.getItem('error_message') == "You don't have access to this page.") {
        setToastrArgs(sessionStorage.getItem('error_message'), "Error");
        sessionStorage.setItem('error_message', null);
    }
    setDefaultSetting();
});

// Global Variables
let user_role = (window.location.href).split("=")[1];
let extractUserRole = decodeURI(user_role);

async function setDefaultSetting() {
    const getUserLevels = await fetchData('user_level/read.php');
    displaySuccessMessage();
   
    let role_data;
    for(var i = 1; i < getUserLevels.length; i++) {
        if (getUserLevels[i].user_role == extractUserRole) {
            role_data = getUserLevels[i];
            break;
        }
        else {
            role_data = null;
        }
        // role_data = (getUserLevels[i].user_role = extractUserRole) ? getUserLevels[i] : null;
    }
    (role_data !== null) ? setUserRolePrivileges(role_data) : toastr.error("User Role Does not Exist");
    setViewAdminPage ();
}

async function setUserRolePrivileges(role_data) {
    const countUsers = await fetchData('views/admin_user_level.php?user_role=' + role_data.user_role);
    const descriptions = await fetchData('pages/get_descriptions.php?user_id=' + role_data.user_id);
    
    setButtons();
    $('#count-user-roles').text(Object.keys(countUsers).length);
    $('#user-role-name').text(role_data.user_role);
    const privilege_edit = document.getElementById('role-privilege-edit-btn');
    privilege_edit.innerHTML = `<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${role_data.user_id}">Edit</button>`

    const container = document.getElementById('user-role-privileges');
    for (var i = 0; i < descriptions.length; i++) {
        let content = `
            <div><i class="bi bi-check2-circle"></i> ${descriptions[i]}</div>
        `;
        container.innerHTML += content;
    }

    $("#editModal").on("hidden.bs.modal", function () {
        // $('#save-btn').attr('disabled', true);
        // $('#edit-btn').attr('disabled', false);
        // Reset checkbox here?
    });

    var updateModal = document.getElementById('editModal');
    updateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let userlevel_data = await fetchData('user_level/read_single.php?user_id=' + data_id);

        var modalTitle = updateModal.querySelector('.modal-title');
        modalTitle.textContent = userlevel_data.user_role;

        $('#user_id').val(data_id);
        $('#user_role').val(userlevel_data.user_role);

        $('#select_all').change( (e) => {
            toggle($('#select_all').is(':checked'));
        });

        function toggle(bool) {
            checkboxes = document.getElementsByName('check');
            for(var i = 0; i < checkboxes.length; i++) {
                (bool) ? $('#' + checkboxes[i].id).prop('checked', true) : $('#' + checkboxes[i].id).prop('checked', false);
            }
        }

        update_fn.onsubmit = (e) => {
            e.preventDefault();
            // processUpdate();
        };

        // async function processUpdate() {
        //     const update_data = JSON.stringify({
        //         'user_id' : data_id,
        //         'user_role' : $('#user_role').val()
        //     });

        //     const [content, log] = await Promise.all ([updateData('user_level/update.php', update_data), logActivity('Updated User Level # ' + data_id, 'User Level - Overview')]);
        
        //     if (content.message == 'User Level Updated' && log) {
        //         sessionStorage.setItem('save_message', "User Role Updated Successfully.");
        //         window.location.reload();
        //     }
        //     else {
        //         toastr.error("User Role was not updated.");
        //     }
        // }
    });
}

async function setViewAdminPage () {
    setAdminTable();
    setViewModal();
    
    async function setAdminTable () {
        var t = $('#admins-table').DataTable( {
            pageLength: 5,
            lengthMenu: [5, 10, 20],
            "searching": true,
            "autoWidth": false
        });

        const [admin_statuses, admins] = await Promise.all ([fetchData('statuses/read.php?status_table=admin_status'), fetchData('views/admin_user_level.php?user_role=' + user_role)]);

        for (var i = 0; i < admin_statuses.length; i++) {
            var opt = `<option value='${admin_statuses[i].status_name}'>${admin_statuses[i].status_name}</option>`;
            $("#admin-status-filter").append(opt);
        }
    
        for (var i = 0; i < admins.length; i++) {
            var tag;
            (admins[i].status == 'Active') ? tag = 'bg-success' : tag = 'bg-danger';
            
            t.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;"><strong>${admins[i].admin_id}</strong></th>
                    <td data-label="Admin">${admins[i].first_name + " " + admins[i].last_name}</td>
                    <td data-label="Role">${admins[i].role}</td>
                    <td data-label="Email">${admins[i].admin_email}</td>
                    <td data-label="Status"><span class="badge ${tag}">${admins[i].status}</span></td>
                    <td data-label="View"><a href="../views/admin_data.php?acct=${admins[i].admin_id}"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
                </tr>
            `)).draw(false);
        }

        $("#admins-table_filter.dataTables_filter").append($("#admin-status-filter"));

        var statusIndex = 0;
        $("#admins-table th").each(function (i) {
            if ($($(this)).html() == "Status") {
                statusIndex = i; return false;
            }
        });

        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
              var selectedItem = $('#admin-status-filter').val()
              var category = data[statusIndex];
              if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
              }
              return false;
            }
          );

        $("#admin-status-filter").change(function (e) {
            t.draw();
        });

        t.draw();
        // t.columns.adjust().draw();
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