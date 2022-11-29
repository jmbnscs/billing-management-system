$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/customers_add.php') {
        if(user_id == 4|| user_id == 5 || user_id == 6) {
            setErrorMessage();
            window.location.replace("../views/dashboard.php");
        }
        else {
            setAddCustomerPage();
        }
    }
    else {
        displaySuccessMessage();
        setCustomerPage();

        if (user_id != 2 && user_id != 3) {
            $('#save-customer-btn').addClass('hide');
            $('#edit-customer').addClass('hide');
        }
    }
});

// -------------------------------------------------------------------- View Customers
async function setCustomerPage () {
    setCustomerTable();
    setViewModal();

    async function setCustomerTable () {
        let customer_data = await fetchData('views/customer.php');
        var t = $('#customer-table').DataTable(), tag;
    
        for (var i = 0; i < customer_data.length; i++) {
            (customer_data[i].status == 'VALUED') ? tag = 'bg-success' : tag = 'bg-danger';
    
            t.row.add($(`
                <tr>
                    <th scope="row"><a href="../views/customer_data.php?acct=${customer_data[i].account_id}">${customer_data[i].account_id}</a></th>
                    <td>${customer_data[i].customer_name}</td>
                    <td>${customer_data[i].plan}</td>
                    <td>&#8369; ${customer_data[i].balance}</td>
                    <td><span class="badge ${tag}">${customer_data[i].status}</span></td>
                    <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-customers" data-bs-whatever="${customer_data[i].account_id}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
            `)).draw(false);
        }
    }
    
    async function setViewModal () {
        $("#view-customers").on("hidden.bs.modal", function () {
            $('#save-customer-btn').attr('disabled', true);
            $('#edit-customer').attr('disabled', false);
        });
    
        var viewModal = document.getElementById('view-customers')
        viewModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var account_id = button.getAttribute('data-bs-whatever');
            var modalTitle = viewModal.querySelector('.modal-title');
            const [customer, account, installation] = await Promise.all ([fetchData('customer/read_single.php?account_id=' + account_id), fetchData('account/read_single.php?account_id=' + account_id), fetchData('installation/read_single.php?account_id=' + account_id)]);
            
            modalTitle.textContent = customer.first_name + ' ' + customer.last_name;
    
            $('#account_id').val(account_id);
            $('#gstech_id').val(customer.gstech_id);
            $('#first_name').val(customer.first_name);
            (customer.middle_name === '') ? $('#middle_name').val('N/A') : $('#middle_name').val(customer.middle_name);
            $('#last_name').val(customer.last_name);
            $('#birthdate').val(customer.birthdate);
    
            $('#billing_day').val(account.billing_day);
            $('#start_date').val(account.start_date);
            $('#lockin_end_date').val(account.lockin_end_date);
            $('#bill_count').val(account.bill_count);
    
            $('#installation_balance').val(installation.installation_balance);
    
            $('#billing_address').val(customer.billing_address);
            $('#mobile_number').val(customer.mobile_number);
            $('#email').val(customer.email);
    
            const [area, plan, connection, account_status, install_type] = await Promise.all ([fetchData('area/read.php'), fetchData('plan/read.php'), fetchData('connection/read.php'), fetchData('statuses/read.php?status_table=account_status'), fetchData('installation_type/read.php')]);
    
            toggleInputData('disabled', true);
            setDefaultDropdown();
    
            async function setDefaultDropdown () {
                for (var i = 0; i < area.length; i++) {
                    if (area[i].area_id == account.area_id) {
                        var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
                        $("#area_id").append(opt);
                    }
                }
        
                for (var i = 0; i < plan.length; i++) {
                    if (plan[i].plan_id == account.plan_id) {
                        var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
                        $("#plan_id").append(opt);
                    }
                }
            
                for (var i = 0; i < connection.length; i++) {
                    if (connection[i].connection_id == account.connection_id) {
                        var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
                        $("#connection_id").append(opt);
                    }
                }
            
                for (var i = 0; i < account_status.length; i++) {
                    if (account_status[i].status_id == account.account_status_id) {
                        var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
                        $("#account_status_id").append(opt);
                    }
                }
            
                for (var i = 0; i < install_type.length; i++) {
                    if (install_type[i].install_type_id == installation.install_type_id) {
                        var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
                        $("#install_type_id").append(opt);
                    }
                }
            }
    
            async function setDropdownData () {
                $("#area_id").empty();
                $("#area_id").append(`<option selected disabled value="">Choose Area</option>`);
                for (var i = 0; i < area.length; i++) {
                    if (area[i].area_id == account.area_id) {
                        var opt = `<option selected value='${area[i].area_id}' style='color: blue'>${area[i].area_name}</option>`;
                    }
                    else {
                        var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
                    }
                    $("#area_id").append(opt);
                }
    
                $("#plan_id").empty();
                $("#plan_id").append(`<option selected disabled>Choose Subscription Plan</option>`);
                for (var i = 0; i < plan.length; i++) {
                    if (plan[i].plan_id == account.plan_id) {
                        var opt = `<option selected value='${plan[i].plan_id}' style='color: blue'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
                    }
                    else {
                        var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
                    }
                    $("#plan_id").append(opt);
                }
    
                $("#connection_id").empty();
                $("#connection_id").append(`<option selected disabled value="">Choose Connection Type</option>`);
                for (var i = 0; i < connection.length; i++) {
                    if (connection[i].connection_id == account.connection_id) {
                        var opt = `<option selected value='${connection[i].connection_id}' style='color: blue'>${connection[i].connection_name}</option>`;
                    }
                    else {
                        var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
                    }
                    $("#connection_id").append(opt);
                }
    
                $("#account_status_id").empty();
                $("#account_status_id").append(`<option selected disabled value="">Choose Account Status</option>`);
                for (var i = 0; i < account_status.length; i++) {
                    if (account_status[i].status_id == account.account_status_id) {
                        var opt = `<option selected value='${account_status[i].status_id}' style='color: blue'>${account_status[i].status_name}</option>`;
                    }
                    else {
                        var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
                    }
                    $("#account_status_id").append(opt);
                }
    
                $("#install_type_id").empty();
                $("#install_type_id").append(`<option selected disabled value="">Choose Installation Type</option>`);
                for (var i = 0; i < install_type.length; i++) {
                    if (install_type[i].install_type_id == installation.install_type_id) {
                        var opt = `<option selected value='${install_type[i].install_type_id}' color: blue'>${install_type[i].install_type_name}</option>`;
                    }
                    else {
                        var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
                    }
                    $("#install_type_id").append(opt);
                }
            }
    
            function toggleInputData (setAttr, bool) {
                $('#billing_address').attr(setAttr, bool);
                $('#mobile_number').attr(setAttr, bool);
                $('#email').attr(setAttr, bool);
    
                $('#plan_id').attr(setAttr, bool);
                $('#connection_id').attr(setAttr, bool);
                $('#account_status_id').attr(setAttr, bool);
                $('#area_id').attr(setAttr, bool);
            }
    
            async function updateCustomerData() {
                const account_id = $('#account_id').val();
    
                let customer_data = JSON.stringify({
                    'account_id' : account_id,
                    'billing_address' : $('#billing_address').val(),
                    'mobile_number' : $('#mobile_number').val(),
                    'email' : $('#email').val()
                });
    
                let account_data = JSON.stringify({
                    'account_id' : account_id,
                    'plan_id' : $('#plan_id').val(),
                    'connection_id' : $('#connection_id').val(),
                    'account_status_id' : $('#account_status_id').val(),
                    'area_id' : $('#area_id').val()
                });
            
                let activity, log = true, details = account_id + ' - ' + $('#first_name').val() + ' ' + $('#last_name').val();
                if (customer.mobile_number != $('#mobile_number').val()) {
                    activity = 'Updated customer mobile number [' + details + '].';
                    log = await logActivity(activity, 'Customer List');
                }
                if (customer.email != $('#email').val()) {
                    activity = 'Updated customer email [' + details + '].';
                    log = await logActivity(activity, 'Customer List');
                }
                if (customer.billing_address != $('#billing_address').val()) {
                    activity = 'Updated customer billing address [' + details + '].';
                    log = await logActivity(activity, 'Customer List');
                }
                if (account.plan_id != $('#plan_id').val()) {
                    activity = 'Updated account subscription plan [' + details + '].';
                    log = await logActivity(activity, 'Customer List');
                }
                if (account.connection_id != $('#connection_id').val()) {
                    activity = 'Updated account connection type [' + details + '].';
                    log = await logActivity(activity, 'Customer List');
                }
                if (account.account_status_id != $('#account_status_id').val()) {
                    activity = 'Updated account status [' + details + '].';
                    log = await logActivity(activity, 'Customer List');
                }
                if (account.area_id != $('#area_id').val()) {
                    activity = 'Updated account area [' + details + '].';
                    log = await logActivity(activity, 'Customer List');
                }
                
                const [customer_content, account_content] = await Promise.all ([updateData('customer/update.php', customer_data), updateData('account/update.php', account_data)]);
            
                if (customer_content.message == 'Customer Updated' && account_content.message == 'success' && log) {
                    sessionStorage.setItem('save_message', "Customer Updated Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Customer was not updated.");
                }
            }
    
            const edit_customer = document.getElementById('edit-customer');
            edit_customer.onclick = (e) => {
                e.preventDefault();
                $('#save-customer-btn').attr('disabled', false);
                $('#edit-customer').attr('disabled', true);
                toggleInputData('disabled', false);
                setDropdownData();
            };
    
            const save_customer = document.getElementById('save-customer');
            save_customer.onsubmit = (e) => {
                e.preventDefault();
                updateCustomerData();
            };
        });
    }
}

// -------------------------------------------------------------------- Add Customer
async function setAddCustomerPage () {
    const add_customer = document.getElementById('add-customer');
    $('#account_id').val(await generateID('account/read.php', "", 8));

    setAddDropdown();

    var maxBirthdayDate = new Date();
    maxBirthdayDate.setFullYear( maxBirthdayDate.getFullYear() - 18 );
    maxBirthdayDate.setMonth(11,31)
    $( "#birthdate" ).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        maxDate: maxBirthdayDate,
    yearRange: '1950:'+maxBirthdayDate.getFullYear(),
    });

    add_customer.onsubmit = (e) => {
        e.preventDefault();
        if (isLegalAge($('#birthdate').val())) {
            addCustomer();
        }
        else {
            toastr.warning('The birthday provided is not of legal age.');
        }
    };

    async function addCustomer() {
        const account_id = $('#account_id').val();

        let account_data = JSON.stringify({
            'account_id' : account_id,
            'start_date' : $('#start_date').val(),
            'plan_id' : $('#plan_id').val(),
            'connection_id' : $('#connection_id').val(),
            'account_status_id' : $('#account_status_id').val(),
            'area_id' : $('#area_id').val()
        });

        let customer_data = JSON.stringify({
            'account_id' : account_id,
            'first_name' : $('#first_name').val(),
            'middle_name' : $('#middle_name').val(),
            'last_name' : $('#last_name').val(),
            'billing_address' : $('#billing_address').val(),
            'mobile_number' : $('#mobile_number').val(),
            'email' : $('#email').val(),
            'birthdate' : $('#birthdate').val()
        });

        let install_data = JSON.stringify({
            'install_type_id' : $('#install_type_id').val(),
            'account_id' : account_id
        });

        let rating_data = JSON.stringify({
            'account_id' : account_id
        });

        let delete_data = JSON.stringify({
            'account_id' : account_id
        });

        let account_content, customer_content, installation_content, ratings_content;

        account_content = await createData('account/create.php', account_data);

        if (account_content.success) {
            customer_content = await createData('customer/create.php', customer_data);
        }
        else {
            const delete_account = await deleteData('account/delete.php', delete_data);
            (delete_account.success) ? displayErrorMessage() : displayErrorMessage();
        }

        if (customer_content.success) {
            installation_content = await createData('installation/create.php', install_data);
        }
        else {
            const [delete_account, delete_customer] = await Promise.all ([deleteData('account/delete.php', delete_data), deleteData('customer/delete.php', delete_data)]);
            (delete_account.success && delete_customer.success) ? displayErrorMessage() : displayErrorMessage();
        }

        if (installation_content.success) {
            ratings_content = await createData('ratings/create.php', rating_data);
        }
        else {
            const [delete_account, delete_customer, delete_installation] = await Promise.all ([deleteData('account/delete.php', delete_data), deleteData('customer/delete.php', delete_data), deleteData('installation/delete.php', delete_data)]);
            (delete_account.success && delete_customer.success && delete_installation.success) ? displayErrorMessage() : displayErrorMessage();
        }

        let log = await logActivity('Created new customer account with Account ID # ' + account_id, 'Customer - Add New Account');

        if (ratings_content.success && log) {
            toastr.success('Customer Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/customers.php');
             }, 2000);
        }
        else {
            const [delete_account, delete_customer, delete_installation, delete_ratings] = await Promise.all ([deleteData('account/delete.php', delete_data), deleteData('customer/delete.php', delete_data), deleteData('installation/delete.php', delete_data), deleteData('ratings/delete.php', delete_data)]);
            (delete_account.success && delete_customer.success && delete_installation.success && delete_ratings.success) ? displayErrorMessage() : displayErrorMessage();
        }

        function displayErrorMessage() {
            toastr.error('Some error has occurred, please try again later.');
            setTimeout(function(){
                window.location.reload();
             }, 2000);
        }

    }

    async function setAddDropdown() {
        const [area, plan, connection, account_status, install_type] = await Promise.all ([fetchData('area/read.php'), fetchData('plan/read.php'), fetchData('connection/read.php'), fetchData('statuses/read.php?status_table=account_status'), fetchData('installation_type/read.php')]);

        for (var i = 0; i < plan.length; i++) {
            var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
            $("#plan_id").append(opt);
        }
    
        for (var i = 0; i < connection.length; i++) {
            var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
            $("#connection_id").append(opt);
        }
    
        for (var i = 0; i < account_status.length; i++) {
            var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
            $("#account_status_id").append(opt);
        }
    
        for (var i = 0; i < area.length; i++) {
            var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
            $("#area_id").append(opt);
        }
    
        for (var i = 0; i < install_type.length; i++) {
            var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
            $("#install_type_id").append(opt);
        }
    }
}