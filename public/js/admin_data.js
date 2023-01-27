$(document).ready(function () {
    isDefault();
    setDefaultSetting();
    restrictFunctions('admindata');
});

let admin_name;
let admindata_id = (window.location.href).split("=")[1];

async function setDefaultSetting() {
    displaySuccessMessage();
    const admin_data = await fetchData('admin/read_single.php?admin_id=' + admindata_id);
    const role_data = await fetchData('user_level/read_single.php?user_id=' + admin_data.user_level_id);
    admin_name = admin_data.first_name + " " + admin_data.last_name;
    $('#admin-icon').text((admin_data.first_name).charAt(0) + (admin_data.last_name).charAt(0));
    $('#admin-name').text(admin_name);
    $('#role-name').text(role_data.user_role);

    setAdminData(admin_data);
    setActivities();
    setTicketHistory();
}

async function setAdminData(admin_data) {
    // Admin Information
    $('#admin_id').text(admin_data.admin_id);
    $('#employment_date').text(admin_data.employment_date);
    $('#address').text(admin_data.address);
    $('#mobile_number').text(admin_data.mobile_number);
    $('#admin_email').text(admin_data.admin_email);
    $('#birthdate').text(formatDateString(admin_data.birthdate));
    $('#admin_status').text(await getStatusName('admin_status', admin_data.admin_status_id));

    // Edit Modal
    var editModal = document.getElementById('edit-admin');
    editModal.addEventListener('show.bs.modal', async function (event) {
        $('#address_edt').val(admin_data.address);
        $('#mobile_number_edt').val(admin_data.mobile_number);
        $('#email_edt').val(admin_data.admin_email);

        const [roles, statuses] = await Promise.all ([fetchData('user_level/read.php'), fetchData('statuses/read.php?status_table=admin_status')]);

        if (admin_data.user_level_id == 2) {
            $('#admin-role-select').removeAttr('required');
            $('#admin-status-select').removeAttr('required');
            $('#admin-role-select').addClass('hide');
            $('#admin-status-select').addClass('hide');
        }
        else {
            $('#admin-role-select').attr('required', true);
            $('#admin-status-select').attr('required', true);
        }

        $("#admin_role_edt").empty();
        $("#admin_role_edt").append(`<option selected disabled value="">Choose Admin Role</option>`);
        for (var i = 2; i < roles.length; i++) {
            if (roles[i].user_id == admin_data.user_level_id) {
                var opt = `<option selected value='${roles[i].user_id}' style='color: blue'>${roles[i].user_role}</option>`;
            }
            else {
                var opt = `<option value='${roles[i].user_id}'>${roles[i].user_role}</option>`;
            }
            $("#admin_role_edt").append(opt);
        }

        $("#admin_status_edt").empty();
        $("#admin_status_edt").append(`<option selected disabled value="">Choose Admin Status</option>`);
        for (var i = 0; i < statuses.length; i++) {
            if (statuses[i].status_id == admin_data.admin_status_id) {
                var opt = `<option selected value='${statuses[i].status_id}' style='color: blue'>${statuses[i].status_name}</option>`;
            }
            else {
                var opt = `<option value='${statuses[i].status_id}'>${statuses[i].status_name}</option>`;
            }
            $("#admin_status_edt").append(opt);
        }

        var resetModal = document.getElementById('reset-pw-modal');
        var modalTitle = resetModal.querySelector('.modal-title');
        modalTitle.textContent = 'Reset Password for Admin: ' + admin_name + '?';
    
        const content = await fetchData('logs/read_admin_default.php?admin_id=' + admindata_id);
        $('#admin_id_rst').val(content.admin_id);
        $('#admin_username_rst').val(content.def_username);
        $('#admin_password_rst').val(content.def_password);
    
        const reset_pwd = document.getElementById('reset-password');
        reset_pwd.onsubmit = (e) => {
            e.preventDefault();
            resetPassword();
        };

        const save_admin = document.getElementById('save-admin');
        save_admin.onsubmit = (e) => {
            e.preventDefault();
            updateAdminData();
        };
    
        async function resetPassword() {
            let update_data = JSON.stringify({
                'admin_id' : content.admin_id,
                'admin_password' : content.def_password
            });
    
            const [update_content, log] = await Promise.all ([updateData('admin/reset_password.php', update_data), logActivity('Reset Password [' + content.admin_id + ' - ' + content.def_username + ']', 'Admin Data')]);
    
            if (update_content.success && log) {
                toastr.success('Password has been reset successfully.');
                setTimeout (() => {
                    window.location.reload();
                }, 2000);
            }
            else {
                toastr.error('Some error has occurred, please try again later.');
            }
        }

        async function updateAdminData() {
            const admin_id = admin_data.admin_id;
            let user_level_id, admin_status_id;
            if (admin_data.user_level_id == 2) {
                user_level_id = admin_data.user_level_id;
                admin_status_id = 1;
            }
            else {
                user_level_id = $('#admin_role_edt').val();
                admin_status_id = $('#admin_status_edt').val();
            }
        
            let admin_data_update = JSON.stringify({
                'admin_id' : admin_data.admin_id,
                'admin_email' : $('#email_edt').val(),
                'mobile_number' : $('#mobile_number_edt').val(),
                'address' : $('#address_edt').val(),
                'user_level_id' : user_level_id
            });
        
            let status_data = JSON.stringify({
                'admin_id' : admin_data.admin_id,
                'admin_status_id' : admin_status_id
            });

            let activity, log = true;
            if (admin_data.admin_status_id != $('#admin_status_edt').val()) {
                activity = 'Save Changes - Admin Status [' + admin_data.admin_id + ' - ' + admin_data.first_name + ' ' + admin_data.last_name + ']';
                log = await logActivity(activity, 'View Admins'); 
            }
            if (admin_data.user_level_id != $('#admin_role_edt').val()) {
                activity = 'Save Changes - User Level [' + admin_data.admin_id + ' - ' + admin_data.first_name + ' ' + admin_data.last_name + ']';
                log = await logActivity(activity, 'View Admins');
            }
            if (admin_data.admin_email != $('#email_edt').val() || admin_data.mobile_number != $('#mobile_number_edt').val() || admin_data.address != $('#address_edt').val()) {
                activity = 'Save Changes - General Information [' + admin_data.admin_id + ' - ' + admin_data.first_name + ' ' + admin_data.last_name + ']';
                log = await logActivity(activity, 'View Admins');
            }

            const [admin_content, status_content] = await Promise.all ([updateData('admin/update.php', admin_data_update), updateData('admin/update_status.php', status_data)]);

            if (admin_content.message == 'success' && status_content.message == 'Admin Updated' && log) {
                sessionStorage.setItem('save_message', "Admin Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Admin was not updated.");
            }
        }
    });
}

async function setActivities() {
    var act_table = $('#activity-table').DataTable( {
        // dom : 'Bfrtip',
        pageLength: 10,
        lengthMenu: [10, 20, 30],
        "searching": true,
        "autoWidth": false,
    });

    if (user_id == 2) {
        var opt = `<option value='Automated System'>Automated System</option>`;
        $("#pages-filter").append(opt);
    }

    const content = await fetchData('logs/read_admin_all_logs.php?admin_id=' + admindata_id);
    let counter = 1;

    for (var i = 0; i < content.length; i++) {
        if (content[i].page_accessed != 'Login') {
            act_table.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;"><strong>${counter}</strong></th>
                    <td>${content[i].page_accessed}</td>
                    <td>${new Date(content[i].date_accessed.split(' ')[0]).toLocaleDateString('PHT')}</td>
                    <td>${new Date(content[i].date_accessed).toLocaleTimeString('PHT',
                    {timeZone:'Asia/Manila',hour12:true,hour:'numeric',minute:'numeric'})}</td>
                    <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-activity-modal" data-bs-whatever="${content[i].id}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
            `)).draw(false);
        }
        else {
            counter--;
        }
                
        counter++;
    }

    $("#activity-table_filter.dataTables_filter").append($("#pages-filter"));

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'activity-table'){
                return true;
            }

            var selectedItem = $('#pages-filter').val()
            var category = data[1];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $("#pages-filter").change(function (e) {
        act_table.draw();
    });

    act_table.draw();

    var viewModal = document.getElementById('view-activity-modal')
    viewModal.addEventListener('show.bs.modal', async function (event) {
        var modalTitle = viewModal.querySelector('.modal-title');
        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        modalTitle.textContent = "Activity Log # " + data_id;

        let id, data;

        const selected_data = content.filter(item => item.id == data_id)[0];

        var browserName = (function (agent) {        switch (true) {
            case agent.indexOf("edge") > -1: return "MS Edge";
            case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
            case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
            case agent.indexOf("trident") > -1: return "MS IE";
            case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
            case agent.indexOf("safari") > -1: return "Safari";
            default: return "other";
        }
        })(selected_data.user_agent.toLowerCase());

        id = [
            // '#activity_id', 
            '#activity_page', 
            '#activity_made', 
            '#activity_date', 
            '#activity_time',
            '#activity_address',
            '#activity_user_agent'
        ];
        data = [
            // selected_data.id, 
            selected_data.page_accessed, 
            selected_data.activity,
            new Date(selected_data.date_accessed.split(' ')[0]).toLocaleDateString('PHT'), 
            new Date(selected_data.date_accessed).toLocaleTimeString('PHT',
            {timeZone:'Asia/Manila',hour12:true,hour:'numeric',minute:'numeric'}),
            selected_data.ip_address,
            browserName
        ];

        setContent();

        function setContent () {
            for (var i = 0; i < data.length; i++) {
                $(id[i]).val(data[i]);
            }
        }
    });
}

async function setTicketHistory() {
    const statuses = await fetchData('statuses/read.php?status_table=ticket_status');

    var t = $('#tickets-table').DataTable( {
        pageLength: 10,
        lengthMenu: [10, 20, 30],
        "searching": true,
        "autoWidth": false,
    });

    for (var i = 0; i < statuses.length; i++) {
        var opt = `<option value='${statuses[i].status_name}'>${statuses[i].status_name}</option>`;
        $("#status-filter").append(opt);
    }

    const content = await fetchData('ticket/read_single_admin.php?admin_id=' + admindata_id);
    let counter = 1;

    for (var i = 0; i < content.length; i++) {
        
        if (content[i].page_accessed != 'Login') {
            let [concern, status] = await Promise.all ([fetchData('concerns/read_single.php?concern_id=' + content[i].concern_id), getStatusName('ticket_status', content[i].ticket_status_id)]);

            let tag;

            (status == 'RESOLVED') ? tag = 'bg-success' : (status == 'PENDING') ? tag = 'bg-warning' : tag = 'bg-danger';

            t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${counter}</strong></th>
                <td data-label="Ticket #">${content[i].ticket_num}</td>
                <td data-label="Category">${concern.concern_category}</td>
                <td data-label="Status"><span class="badge ${tag}">${status}</span></td>
            </tr>
            `)).draw(false);
        }
        else {
            counter--;
        }
                
        counter++;
    }

    $("#tickets-table_filter.dataTables_filter").append($("#status-filter"));

    var statusIndex = 0;
    $("#tickets-table th").each(function (i) {
        if ($($(this)).html() == "Status") {
            statusIndex = i; return false;
        }
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'tickets-table'){
                return true;
            }

            var selectedItem = $('#status-filter').val()
            var category = data[statusIndex];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $("#status-filter").change(function (e) {
        t.draw();
    });

    t.draw();
}