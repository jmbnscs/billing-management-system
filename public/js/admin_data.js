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
            $('#admin-role-select').addClass('hide');
            $('#admin-status-select').addClass('hide');
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
            }
        }
    });
}

async function setActivities() {
    var t = $('#activity-table').DataTable( {
        // dom : 'Bfrtip',
        pageLength: 10,
        lengthMenu: [10, 20, 50],
        "searching": true,
        "autoWidth": false,
    });

    const content = await fetchData('logs/read_admin_all_logs.php?admin_id=' + admindata_id);
    let counter = 1;

    for (var i = 0; i < content.length; i++) {
        if (content[i].page_accessed != 'Login') {
            t.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;"><strong>${content[i].id}</strong></th>
                    <td>${content[i].page_accessed}</td>
                    <td>${content[i].date_accessed.split(' ')[0]}</td>
                    <td>${content[i].date_accessed.split(' ')[1]}</td>
                    <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-activity-modal" data-bs-whatever="${content[i].id}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
            `)).draw(false);
        }
        else {
            counter--;
        }
                
        counter++;
    }

    var viewModal = document.getElementById('view-activity-modal')
    viewModal.addEventListener('show.bs.modal', async function (event) {
        var modalTitle = viewModal.querySelector('.modal-title');
        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        modalTitle.textContent = "Activity Log # " + data_id;

        let id, data;

        const selected_data = content.filter(item => item.id == data_id)[0];
    
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
            selected_data.date_accessed.split(' ')[0], 
            selected_data.date_accessed.split(' ')[1],
            selected_data.ip_address,
            selected_data.user_agent
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
    var t = $('#tickets-table').DataTable( {
        pageLength: 10,
        lengthMenu: [10, 20, 50],
        "searching": true,
        "autoWidth": false,
    });

    const content = await fetchData('ticket/read_single_admin.php?admin_id=' + admindata_id);
    let counter = 1;

    for (var i = 0; i < content.length; i++) {
        if (content[i].page_accessed != 'Login') {
            let [concern, status] = await Promise.all ([fetchData('concerns/read_single.php?concern_id=' + content[i].concern_id), getStatusName('ticket_status', content[i].ticket_status_id)]);
            t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${counter}</strong></th>
                <td>${content[i].ticket_num}</td>
                <td>${concern.concern_category}</td>
                <td>${status}</td>
            </tr>
            `)).draw(false);
        }
        else {
            counter--;
        }
                
        counter++;
    }
}