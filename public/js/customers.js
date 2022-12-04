$(document).ready(function () {
    isDefault();
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get('status')

    if (status == 'succ') {
        toastr.success('Customer Records Imported Successfully.');
        setTimeout(function(){
            window.location.replace('../views/customers.php');
        }, 2000);
    }
    else if (status == 'err') {
        toastr.warning('Some error has occurred, please check file and try again.');
        setTimeout(function(){
            window.location.replace('../views/customers_add.php');
        }, 2000);
    }
    else if (status == 'invalid_file') {
        toastr.error('Please upload a valid csv file.');
        setTimeout(function(){
            window.location.replace('../views/customers_add.php');
        }, 2000);
    }
    else if (DIR_CUR == DIR_MAIN + 'views/customers_add.php') {
        
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
    const [plans, areas, customer_statuses, customer_data] = await Promise.all ([fetchData('plan/read.php'), fetchData('area/read.php'), fetchData('statuses/read.php?status_table=account_status'), fetchData('views/customer.php')]);

    setCustomerTable();
    setViewModal();

    function setCustomerTable () {
        
        var t = $('#customer-table').DataTable({
            pageLength : 5,
            lengthMenu: [5, 10, 20],
            "searching": true
        }), tag;

        for (var i = 0; i < plans.length; i++) {
            var opt = `<option value='${plans[i].plan_name}'>${plans[i].plan_name}</option>`;
            $("#plan-filter").append(opt);
        }

        for (var i = 0; i < areas.length; i++) {
            var opt = `<option value='${areas[i].area_name}'>${areas[i].area_name}</option>`;
            $("#area-filter").append(opt);
        }

        for (var i = 0; i < customer_statuses.length; i++) {
            var opt = `<option value='${customer_statuses[i].status_name}'>${customer_statuses[i].status_name}</option>`;
            $("#customer-status-filter").append(opt);
        }

        for (var i = 0; i < customer_data.length; i++) {
            (customer_data[i].status == 'ACTIVE') ? tag = 'bg-success' : tag = 'bg-danger';
    
            t.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;">${customer_data[i].account_id}</th>
                    <td>${customer_data[i].customer_name}</td>
                    <td>${customer_data[i].plan}</td>
                    <td>${customer_data[i].area}</td>
                    <td><span class="badge ${tag}">${customer_data[i].status}</span></td>
                    <td>&#8369; ${customer_data[i].balance}</td>
                    <td><a href="../views/customer_data.php?acct=${customer_data[i].account_id}" target="_blank"><button type="button" class="btn btn-outline-primary""><i class="ri ri-eye-fill"></i></button><a></td>
                </tr>
            `)).draw(false);
        }

        $("#customer-table_filter.dataTables_filter").append($("#plan-filter"));
        $("#customer-table_filter.dataTables_filter").append($("#area-filter"));
        $("#customer-table_filter.dataTables_filter").append($("#customer-status-filter"));

        var planIndex = 0, areaIndex = 0, statusIndex = 0;
        $("#customer-table th").each(function (i) {
            if ($($(this)).html() == "Plan") {
                planIndex = i; return false;
            }
        });

        $("#customer-table th").each(function (i) {
            if ($($(this)).html() == "Area") {
                areaIndex = i; return false;
            }
        });

        $("#customer-table th").each(function (i) {
            if ($($(this)).html() == "Status") {
                statusIndex = i; return false;
            }
        });

        $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var selectedItem = $('#plan-filter').val()
            var category = data[planIndex];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
        );
        
        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
              var selectedItem = $('#area-filter').val()
              var category = data[areaIndex];
              if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
              }
              return false;
            }
        );

        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
              var selectedItem = $('#customer-status-filter').val()
              var category = data[statusIndex];
              if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
              }
              return false;
            }
        );

        $("#plan-filter").change(function (e) {
            t.draw();
        });

        $("#area-filter").change(function (e) {
            t.draw();
        });

        $("#customer-status-filter").change(function (e) {
            t.draw();
        });

        t.draw();
        t.columns.adjust().draw();
    }
}

// -------------------------------------------------------------------- Add Customer
async function setAddCustomerPage () {
    const add_customer = document.getElementById('add-customer');
    $('#account_id').val(await generateID('check/account_id.php?account_id=', "", 8));

    setAddDropdown();
    setAllowedDate('#birthdate');

    add_customer.onsubmit = (e) => {
        e.preventDefault();
        if (isLegalAge($('#birthdate').val())) {
            addCustomer();
        }
        else {
            toastr.warning('The birthday provided is not of legal age.');
        }
    };

    const import_customer = document.getElementById('upload-form');
    import_customer.onsubmit = (e) => {
        $('#upload-form').attr('action', '../../app/includes/customer_upload.php');
        window.location.reload();
        if (DIR_CUR == DIR_MAIN + 'views/customers_add.php?status=succ') {
            toastr.success('Customer Records Imported Successfully.');
            setTimeout(function(){
                window.location.replace('../views/customers.php');
                }, 2000);
        }
        else if (DIR_CUR == DIR_MAIN + 'views/customers_add.php?status=err') {
            toastr.warning('Some error has occurred, please check file and try again.');
            window.location.replace('../views/customers_add.php');
        }
        else if (DIR_CUR == DIR_MAIN + 'views/customers_add.php?status=invalid_file') {
            toastr.error('Please upload a valid csv file.');
            window.location.replace('../views/customers_add.php');
        }
    };

    async function addCustomer() {
        const account_id = $('#account_id').val();

        let account_data = JSON.stringify({
            'account_id' : account_id,
            'start_date' : $('#start_date').val(),
            'plan_id' : $('#plan_id').val(),
            'connection_id' : $('#connection_id').val(),
            // 'account_status_id' : $('#account_status_id').val(),
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
    
        // for (var i = 0; i < account_status.length; i++) {
        //     var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
        //     $("#account_status_id").append(opt);
        // }
    
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

