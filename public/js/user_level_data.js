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

    if (extractUserRole == 'IT Administrator') {
        $('#role-privilege-edit-btn').addClass('hide');
    }
   
    let role_data;
    for(var i = 1; i < getUserLevels.length; i++) {
        if (getUserLevels[i].user_role == extractUserRole) {
            role_data = getUserLevels[i];
            break;
        }
        else {
            role_data = null;
        }
    }

    if (role_data !== null) {
        setUserRolePrivileges(role_data);
        setViewAdminPage ();
    }
    else {
        toastr.error("User Role Does not Exist");
        setTimeout ( () => {
                window.location.replace('../views/user_level');
            },2000
        );
    }
    
}

async function setUserRolePrivileges(role_data) {
    const countUsers = await fetchData('views/admin_user_level.php?user_role=' + role_data.user_role);
    const descriptions = await fetchData('pages/get_descriptions.php?user_id=' + role_data.user_id);
    let users_count;

    (countUsers.message != 'No Accounts Found') ? users_count = countUsers.length : users_count = 0;
    
    setButtons();
    $('#count-user-roles').text(users_count);
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

    var updateModal = document.getElementById('editModal');
    updateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let userlevel_data = await fetchData('user_level/read_single.php?user_id=' + data_id);
        const user_page_access = await fetchData('restriction/get_pages_restriction.php?user_id=' + data_id);
        const user_buttons_access = await fetchData('restriction/get_buttons_restriction.php?user_id=' + data_id);

        var modalTitle = updateModal.querySelector('.modal-title');
        modalTitle.textContent = userlevel_data.user_role;

        $('#user_id').val(data_id);
        $('#user_role').val(userlevel_data.user_role);

        toggle(false);

        Object.keys(user_page_access).forEach(key => {
            // Views
            if (key == 'customer-list' && user_page_access[key] == 1) {
                $('#cust-view').prop('checked', 1);
            }
            else if (key == 'invoice-view' && user_page_access[key] == 1) {
                $('#inv-view').prop('checked', true);
            }
            else if (key == 'invoice-payment' && user_page_access[key] == 1) {
                $('#pay-view').prop('checked', true);
            }
            else if (key == 'invoice-prorate' && user_page_access[key] == 1) {
                $('#pro-view').prop('checked', true);
            }
            else if (key == 'admin-view' && user_page_access[key] == 1) {
                $('#adm-view').prop('checked', true);
            }
            else if (key == 'plan-view' && user_page_access[key] == 1) {
                $('#plans-view').prop('checked', true);
            }
            else if (key == 'ticket-page' && user_page_access[key] == 1) {
                $('#tkt-view').prop('checked', true);
            }

            // Add
            if (key == 'customer-add' && user_page_access[key] == 1) {
                $('#cust-add').prop('checked', true);
            }
            else if (key == 'invoice-payment-add' && user_page_access[key] == 1) {
                $('#pay-add').prop('checked', true);
            }
          });

        Object.keys(user_buttons_access).forEach(key => {
            // Add
            if (key == 'admins-add' && user_buttons_access[key] == 1) {
                $('#adm-add').prop('checked', true);
            }
            else if (key == 'plans-add' && user_buttons_access[key] == 1) {
                $('#plans-add').prop('checked', true);
            }
            else if (key == 'tickets-add' && user_buttons_access[key] == 1) {
                $('#tkt-add').prop('checked', true);
            }

            // Edit
            if (key == 'custdata-edit' && user_buttons_access[key] == 1) {
                $('#cust-edit').prop('checked', 1);
            }
            else if (key == 'payments-edit' && user_buttons_access[key] == 1) {
                $('#pay-edit').prop('checked', true);
            }
            else if (key == 'prorate-edit' && user_buttons_access[key] == 1) {
                $('#pro-edit').prop('checked', true);
            }
            else if (key == 'admindata-edit' && user_buttons_access[key] == 1) {
                $('#adm-edit').prop('checked', true);
            }
            else if (key == 'plans-edit' && user_buttons_access[key] == 1) {
                $('#plans-edit').prop('checked', true);
            }
            else if (key == 'active-claim' && user_buttons_access[key] == 1) {
                $('#tkt-edit').prop('checked', true);
            }

            // Delete
            if (key == 'payments-dlt' && user_buttons_access[key] == 1) {
                $('#pay-dlt').prop('checked', true);
            }
            else if (key == 'prorate-dlt' && user_buttons_access[key] == 1) {
                $('#pro-dlt').prop('checked', true);
            }
            else if (key == 'active-invalid' && user_buttons_access[key] == 1) {
                $('#tkt-dlt').prop('checked', true);
            }
          });

        $('#select_all').change( (e) => {
            toggle($('#select_all').is(':checked'));
        });

        function toggle(bool) {
            checkboxes = document.getElementsByName('check');
            for(var i = 0; i < checkboxes.length; i++) {
                (bool) ? $('#' + checkboxes[i].id).prop('checked', true) : $('#' + checkboxes[i].id).prop('checked', false);
            }
        }

        function isChecked() {
            updatecheckboxes = document.getElementsByName('check');
            for(var i = 0; i < updatecheckboxes.length; i++) {
                if($('#' + updatecheckboxes[i].id).is(':checked')) {
                    return true;
                }
            }
            return false;
        }

        update_fn = document.getElementById('user-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            if(isChecked()) {
                $('#user-update-data-btn').prop('disabled', true);
                $('#user-update-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
                setTimeout ( () => {
                        processUpdate();
                    },2000
                );
            }
            else {
                toastr.error("User Role was not updated. Please choose access restriction of at least one.");
            }
        };

        async function processUpdate() {
            const user_role = $('#user_role').val();

            const user_update_data = JSON.stringify({
                'user_id' : data_id,
                'user_role' : user_role
            });

            let customer_list, invoice_view, invoice_payment, invoice_prorate, admin_view, plan_view, ticket_page;
            $('#cust-view').is(':checked') ? customer_list = 1 : customer_list = 0;
            $('#inv-view').is(':checked') ? invoice_view = 1 : invoice_view = 0;
            $('#pay-view').is(':checked') ? invoice_payment = 1 : invoice_payment = 0;
            $('#pro-view').is(':checked') ? invoice_prorate = 1 : invoice_prorate = 0;
            $('#adm-view').is(':checked') ? admin_view = 1 : admin_view = 0;
            $('#plans-view').is(':checked') ? plan_view = 1 : plan_view = 0;
            $('#tkt-view').is(':checked') ? ticket_page = 1 : ticket_page = 0;

            let customer_add, invoice_payment_add, ticket_active, ticket_invalid;
            $('#cust-add').is(':checked') ? customer_add = 1 : customer_add = 0;
            $('#pay-add').is(':checked') ? invoice_payment_add = 1 : invoice_payment_add = 0;

            $('#tkt-edit').is(':checked') ? ticket_active = 1 : ticket_active = 0;
            $('#tkt-dlt').is(':checked') ? ticket_invalid = 1 : ticket_invalid = 0;

            const pages_update_data = JSON.stringify({
                'user_id' : data_id,
                
                'customer_list' : customer_list,
                'invoice_view' : invoice_view,
                'invoice_payment' : invoice_payment,
                'invoice_prorate' : invoice_prorate,
                'admin_view' : admin_view,
                'plan_view' : plan_view,
                'ticket_page' : ticket_page,

                'customer_add' : customer_add,
                'invoice_payment_add' : invoice_payment_add,
                'ticket_active' : ticket_active,
                'ticket_invalid' : ticket_invalid
            });

            let admins_add, plans_add, tickets_add, custdata_edit, payments_edit, prorate_edit, admindata_edit, plans_edit, active_claim, payments_dlt, prorate_dlt, active_invalid;
            $('#adm-add').is(':checked') ? admins_add = 1 : admins_add = 0;
            $('#plans-add').is(':checked') ? plans_add = 1 : plans_add = 0;
            $('#tkt-add').is(':checked') ? tickets_add = 1 : tickets_add = 0;

            $('#cust-edit').is(':checked') ? custdata_edit = 1 : custdata_edit = 0;
            $('#pay-edit').is(':checked') ? payments_edit = 1 : payments_edit = 0;
            $('#pro-edit').is(':checked') ? prorate_edit = 1 : prorate_edit = 0;
            $('#adm-edit').is(':checked') ? admindata_edit = 1 : admindata_edit = 0;
            $('#plans-edit').is(':checked') ? plans_edit = 1 : plans_edit = 0;
            $('#tkt-edit').is(':checked') ? active_claim = 1 : active_claim = 0;

            $('#pay-dlt').is(':checked') ? payments_dlt = 1 : payments_dlt = 0;
            $('#pro-dlt').is(':checked') ? prorate_dlt = 1 : prorate_dlt = 0;
            $('#tkt-dlt').is(':checked') ? active_invalid = 1 : active_invalid = 0;

            const buttons_update_data = JSON.stringify({
                'user_id' : data_id,

                'admins_add' : admins_add,
                'plans_add' : plans_add,
                'tickets_add' : tickets_add,
                
                'custdata_edit' : custdata_edit,
                'payments_edit' : payments_edit,
                'prorate_edit' : prorate_edit,
                'admindata_edit' : admindata_edit,
                'plans_edit' : plans_edit,
                'active_claim' : active_claim,

                'payments_dlt' : payments_dlt,
                'prorate_dlt' : prorate_dlt,
                'active_invalid' : active_invalid
            });

            let user_update_sucess = true;
            if (user_role != userlevel_data.user_role) {
                const user_update = await updateData('user_level/update.php', user_update_data);
                (user_update.success) ? user_update_sucess = true : user_update_sucess = false;
            }

            if (user_update_sucess) {
                const [pages_update, buttons_update, log] = await Promise.all ([updateData('restriction/update_pages_restriction.php', pages_update_data), updateData('restriction/update_buttons_restriction.php', buttons_update_data), logActivity('Save Changes - User Level Access [' + userlevel_data.user_role + ']', 'Advanced Options')]);

                if (pages_update.success && buttons_update.success && log) {
                    sessionStorage.setItem('save_message', "User Role Updated Successfully.");
                    window.location.reload();
                }
            }
            else {
                toastr.error("User Role was not updated. Some error occured, please try again.");
            }
        }
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
                    <td data-label="Email">${admins[i].admin_email}</td>
                    <td data-label="Status"><span class="badge ${tag}">${admins[i].status}</span></td>
                    <td data-label="View"><a href="../views/admin_data?acct=${admins[i].admin_id}"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
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
    }
}