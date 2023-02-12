$(document).ready( async () => {
    isDefault();
    restrictPages('admin-page');
    restrictPages('admin-view');
    restrictFunctions('admins');
    displaySuccessMessage();
    setViewAdminPage();

});

// -------------------------------------------------------------------- View Admin
async function setViewAdminPage () {
    var active_table = $('#active-admins-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var inactive_table = $('#inactive-admins-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var suspended_table = $('#suspended-admins-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var locked_table = $('#locked-admins-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    const [user_roles, admins] = await Promise.all ([fetchData('user_level/read.php'), fetchData('views/admin.php')]);

    for (var i = 1; i < user_roles.length; i++) {
        var opt = `<option value='${user_roles[i].user_role}'>${user_roles[i].user_role}</option>`;
        $("#active-role-filter").append(opt);
        $("#inactive-role-filter").append(opt);
        $("#suspended-role-filter").append(opt);
        $("#locked-role-filter").append(opt);
    }

    var active_counter = 1, inactive_counter = 1, suspended_counter = 1, locked_counter = 1;

    for (var i = 0; i < admins.length; i++) {
        var tag;
        (admins[i].status == 'Active') ? tag = 'bg-success' : tag = 'bg-danger';

        if (admins[i].status == 'Active') {
            active_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${active_counter}</strong></th>
                <td data-label="Admin ID">${admins[i].admin_id}</td>
                <td data-label="Admin">${admins[i].admin_name}</td>
                <td data-label="Role">${admins[i].role}</td>
                <td data-label="Email">${admins[i].admin_email}</td>
                <td data-label="Status"><span class="badge ${tag}">${admins[i].status}</span></td>
                <td data-label="View"><a href="../views/admin_data?acct=${admins[i].admin_id}"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
            `)).draw(false);

            active_counter++;
        }
        else if (admins[i].status == 'Inactive') {
            inactive_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${inactive_counter}</strong></th>
                <td data-label="Admin ID">${admins[i].admin_id}</td>
                <td data-label="Admin">${admins[i].admin_name}</td>
                <td data-label="Role">${admins[i].role}</td>
                <td data-label="Email">${admins[i].admin_email}</td>
                <td data-label="Status"><span class="badge ${tag}">${admins[i].status}</span></td>
                <td data-label="View"><a href="../views/admin_data?acct=${admins[i].admin_id}"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
            `)).draw(false);

            inactive_counter++;
        }
        else if (admins[i].status == 'Suspended') {
            suspended_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${suspended_counter}</strong></th>
                <td data-label="Admin ID">${admins[i].admin_id}</td>
                <td data-label="Admin">${admins[i].admin_name}</td>
                <td data-label="Role">${admins[i].role}</td>
                <td data-label="Email">${admins[i].admin_email}</td>
                <td data-label="Status"><span class="badge ${tag}">${admins[i].status}</span></td>
                <td data-label="View"><a href="../views/admin_data?acct=${admins[i].admin_id}"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
            `)).draw(false);

            suspended_counter++;
        }
        else if (admins[i].status == 'Locked') {
            locked_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${locked_counter}</strong></th>
                <td data-label="Admin ID">${admins[i].admin_id}</td>
                <td data-label="Admin">${admins[i].admin_name}</td>
                <td data-label="Role">${admins[i].role}</td>
                <td data-label="Email">${admins[i].admin_email}</td>
                <td data-label="Status"><span class="badge ${tag}">${admins[i].status}</span></td>
                <td data-label="View"><a href="../views/admin_data?acct=${admins[i].admin_id}"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
            `)).draw(false);

            locked_counter++;
        }
        
        
    }

    $("#active-admins-table_filter.dataTables_filter").append($("#active-role-filter"));
    $("#inactive-admins-table_filter.dataTables_filter").append($("#inactive-role-filter"));
    $("#suspended-admins-table_filter.dataTables_filter").append($("#suspended-role-filter"));
    $("#locked-admins-table_filter.dataTables_filter").append($("#locked-role-filter"));

    $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        if (settings.nTable.id !== 'active-admins-table'){
            return true;
        }

        var selectedItem = $('#active-role-filter').val();
        var category = data[3];
        if (selectedItem === "" || category.includes(selectedItem)) {
        return true;
        }
        return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'inactive-admins-table'){
                return true;
            }

            var selectedItem = $('#inactive-role-filter').val();
            var category = data[3];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'suspended-admins-table'){
                return true;
            }
            
            var selectedItem = $('#suspended-role-filter').val();
            var category = data[3];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'locked-admins-table'){
                return true;
            }
            
            var selectedItem = $('#locked-role-filter').val();
            var category = data[3];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $("#active-role-filter").change(function (e) {
        active_table.draw();
    });

    $("#inactive-role-filter").change(function (e) {
        inactive_table.draw();
    });

    $("#suspended-role-filter").change(function (e) {
        suspended_table.draw();
    });

    $("#locked-role-filter").change(function (e) {
        locked_table.draw();
    });

    active_table.draw();
    inactive_table.draw();
    suspended_table.draw();
    locked_table.draw();

    setAddAdminPage();
}

// -------------------------------------------------------------------- Add Admin
async function setAddAdminPage () {
    if (sessionStorage.getItem('new_admin_id') == null) {
        sessionStorage.setItem('new_admin_id', await generateID('check/admin_id.php?admin_id=', "", 5));
    }
    $('#admin_id').val(sessionStorage.getItem('new_admin_id'));
    
    setAddDropdown();
    setAllowedDate('#admin_bday');
    setDateRange('#employment_date', '2021-09-23');
    $('#employment_date').val(getDateToday());

    const add_admin = document.getElementById('add-admin');
    add_admin.onsubmit = (e) => {
        e.preventDefault();
        checkValidity();
    };

    var req_elem = document.getElementById('add-admin').querySelectorAll("[required]");

    function checkValidity() {
        resetElements();
        var counter = 0;
        var mobile_number = new RegExp("^([0]{1}[9]{1}[0-9]{9})$");
        var email = /^\S+@\S+\.\S+$/;

        if ($('#middle_name').val() == '') {
            $('#middle_name').addClass('valid-input');
        }
        else if (!isNaN($('#middle_name').val()) && $('#middle_name').val()) {
            $('#middle_name').removeClass('valid-input');
            $('#middle_name').addClass('invalid-input');
            $($('#middle_name').next()).addClass('d-block');
        }
        
        for (var i = 0; i < req_elem.length; i++) {
            if (req_elem[i].value == '') {
                req_elem[i].classList.add('invalid-input');
                req_elem[i].nextElementSibling.classList.add('d-block');
                counter++;
            }
            else {
                if (req_elem[i].id == 'first_name') {
                    if (!isNaN(req_elem[i].value) && req_elem[i].value) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("First name must not be a number."));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'last_name') {
                    if (!isNaN(req_elem[i].value && req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Last name must not be a number."));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'address') {
                    if (!isNaN(req_elem[i].value) && req_elem[i].value) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text('Please enter a valid address.'));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'mobile_number') {
                    if (!mobile_number.test(req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        err_msg = (isNaN(req_elem[i].value) || (req_elem[i].value.length !== 11)) ? 'Please enter an 11-digit mobile number.' : 'The mobile number must start with `09`';
                        $(($('#' + req_elem[i].id).next()).text(err_msg));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'admin_email') {
                    if (!email.test(req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        err_msg = (!req_elem[i].value.includes('@')) ? 'The email must contain `@`.' :'Please enter a valid email address.';
                        $(($('#' + req_elem[i].id).next()).text(err_msg));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'admin_bday') {
                    if (!isLegalAge(req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text('Admin is not of legal age.'));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'employment_date') {
                    if (!isWithinRange('2021-09-23', req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Employment date is not within the company's calendar."));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else {
                    showValid();
                }

                function showValid() {
                    req_elem[i].classList.add('valid-input');
                }
            }
        } 

        if (counter > 0) {
            toastr.warning('Please provide the appropriate details on each field.');
        }
        else {
            sessionStorage.removeItem('new_admin_id');
            addAdmin();
        }
    }

    function resetElements() {
        for (var i = 0; i < req_elem.length; i++) {
            $('#' + req_elem[i].id).removeClass('valid-input');
            $('#' + req_elem[i].id).removeClass('invalid-input');
            $(($('#' + req_elem[i].id).next()).removeClass('d-block'));
        }

        $('#middle_name').removeClass('valid-input');
        $('#middle_name').removeClass('invalid-input');
        $($('#middle_name').next()).removeClass('d-block');
    }

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

        const [content, log] = await Promise.all ([createData('admin/create.php', data), logActivity('Submit - Add New Admin [Admin ID # ' + $('#admin_id').val() + ']', 'Add New Admin')]);
        
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
                    window.location.replace('../views/admins');
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