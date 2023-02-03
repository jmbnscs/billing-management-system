$(document).ready(function () {
    isDefault();
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get('status');

    if (status == 'succ') {
        toastr.success('Customer Records Imported Successfully.');
        setTimeout(function(){
            window.location.replace('../views/customers');
        }, 2000);
    }
    else if (status == 'err') {
        toastr.warning('Some error has occurred, please check error file to update.');
        $('#error-dl').removeClass('hide');
        setDownloadError();
        resetURL();
    }
    else if (status == 'invalid_file') {
        toastr.error('Please upload a valid csv file.');
        setTimeout(function(){
            window.location.replace('../views/customers_import');
        }, 2000);
        resetURL();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/customers_add') {
        restrictPages('customer-add');
        setAddCustomerPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/customers_import') {
        restrictPages('customer-import');
        setImportCustomerPage();
        setExportCustomerPage();
        setDownloadPage();
        $('#error-dl').addClass('hide');
    }
    else {
        restrictPages('customer-page');
        displaySuccessMessage();
        setCustomerPage();
    }
});

function resetURL() {
    history.replaceState && history.replaceState(
        null, '', location.pathname + location.search.replace(/[\?&]status=[^&]+/, '').replace(/^&/, '?')
      );
}

// -------------------------------------------------------------------- View Customers
async function setCustomerPage () {
    const [plans, areas, customer_statuses, customer_data] = await Promise.all ([fetchData('plan/read.php'), fetchData('area/read.php'), fetchData('statuses/read.php?status_table=account_status'), fetchData('views/customer.php')]);

    var active_table = $('#active-customers-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var inactive_table = $('#inactive-customers-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var disconnected_table = $('#disconnected-customers-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < plans.length; i++) {
        var opt = `<option value='${plans[i].plan_name}'>${plans[i].plan_name}</option>`;
        $("#active-plan-filter").append(opt);
        $("#inactive-plan-filter").append(opt);
        $("#disconnected-plan-filter").append(opt);
    }

    for (var i = 0; i < areas.length; i++) {
        var opt = `<option value='${areas[i].area_name}'>${areas[i].area_name}</option>`;
        $("#active-area-filter").append(opt);
        $("#inactive-area-filter").append(opt);
        $("#disconnected-area-filter").append(opt);
    }

    for (var i = 0; i < customer_statuses.length; i++) {
        var opt = `<option value='${customer_statuses[i].status_name}'>${customer_statuses[i].status_name}</option>`;
        $("#customer-status-filter").append(opt);
    }

    let active_counter = 1, inactive_counter = 1, disconnected_counter = 1;

    for (var i = 0; i < customer_data.length; i++) {
        if (customer_data[i].status == 'ACTIVE') {
            active_table.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;">${active_counter}</th>
                    <td data-label="Account ID">${customer_data[i].account_id}</td>
                    <td data-label="Customer Name">${customer_data[i].customer_name}</td>
                    <td data-label="Subscription">${customer_data[i].plan}</td>
                    <td data-label="Area">${customer_data[i].area}</td>
                    <td data-label="Balance">&#8369; ${customer_data[i].balance}</td>
                    <td data-label="View"><a href="../views/customer_data?acct=${customer_data[i].account_id}"><button type="button" class="btn btn-outline-primary""><i class="ri ri-eye-fill"></i></button><a></td>
                </tr>
            `)).draw(false);

            active_counter++;
        }
        else if (customer_data[i].status == 'INACTIVE') {
            inactive_table.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;">${inactive_counter}</th>
                    <td data-label="Account ID">${customer_data[i].account_id}</td>
                    <td data-label="Customer Name">${customer_data[i].customer_name}</td>
                    <td data-label="Subscription">${customer_data[i].plan}</td>
                    <td data-label="Area">${customer_data[i].area}</td>
                    <td data-label="Balance">&#8369; ${customer_data[i].balance}</td>
                    <td data-label="View"><a href="../views/customer_data?acct=${customer_data[i].account_id}"><button type="button" class="btn btn-outline-primary""><i class="ri ri-eye-fill"></i></button><a></td>
                </tr>
            `)).draw(false);

            inactive_counter++;
        }
        else {
            disconnected_table.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;">${disconnected_counter}</th>
                    <td data-label="Account ID">${customer_data[i].account_id}</td>
                    <td data-label="Customer Name">${customer_data[i].customer_name}</td>
                    <td data-label="Subscription">${customer_data[i].plan}</td>
                    <td data-label="Area">${customer_data[i].area}</td>
                    <td data-label="Balance">&#8369; ${customer_data[i].balance}</td>
                    <td data-label="View"><a href="../views/customer_data?acct=${customer_data[i].account_id}"><button type="button" class="btn btn-outline-primary""><i class="ri ri-eye-fill"></i></button><a></td>
                </tr>
            `)).draw(false);

            disconnected_counter++;
        }
    }

    $("#active-customers-table_filter.dataTables_filter").append($("#active-plan-filter"));
    $("#active-customers-table_filter.dataTables_filter").append($("#active-area-filter"));

    $("#inactive-customers-table_filter.dataTables_filter").append($("#inactive-plan-filter"));
    $("#inactive-customers-table_filter.dataTables_filter").append($("#inactive-area-filter"));

    $("#disconnected-customers-table_filter.dataTables_filter").append($("#disconnected-plan-filter"));
    $("#disconnected-customers-table_filter.dataTables_filter").append($("#disconnected-area-filter"));

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'active-customers-table'){
                return true;
            }

            var selectedItem = $('#active-plan-filter').val()
            var category = data[3];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );
    
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'active-customers-table'){
                return true;
            }
            
            var selectedItem = $('#active-area-filter').val()
            var category = data[4];
            if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'inactive-customers-table'){
                return true;
            }

            var selectedItem = $('#inactive-plan-filter').val()
            var category = data[3];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );
    
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'inactive-customers-table'){
                return true;
            }
            
            var selectedItem = $('#inactive-area-filter').val()
            var category = data[4];
            if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'disconnected-customers-table'){
                return true;
            }

            var selectedItem = $('#disconnected-plan-filter').val()
            var category = data[3];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );
    
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'disconnected-customers-table'){
                return true;
            }
            
            var selectedItem = $('#disconnected-area-filter').val()
            var category = data[4];
            if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
            }
            return false;
        }
    );

    $("#active-plan-filter").change(function (e) {
        active_table.draw();
    });

    $("#active-area-filter").change(function (e) {
        active_table.draw();
    });

    $("#inactive-plan-filter").change(function (e) {
        inactive_table.draw();
    });

    $("#inactive-area-filter").change(function (e) {
        inactive_table.draw();
    });

    $("#disconnected-plan-filter").change(function (e) {
        disconnected_table.draw();
    });

    $("#disconnected-area-filter").change(function (e) {
        disconnected_table.draw();
    });

    active_table.draw();
    inactive_table.draw();
    disconnected_table.draw();
}

// -------------------------------------------------------------------- Add Customer
async function setAddCustomerPage () {
    const add_customer = document.getElementById('add-customer');

    if (sessionStorage.getItem('account_id') == null) {
        sessionStorage.setItem('account_id', await generateID('check/account_id.php?account_id=', "", 8));
    }
    $('#account_id').val(sessionStorage.getItem('account_id'));

    setAddDropdown();

    var today = new Date();

    $('#start_date').val(getDateToday());
    today.setDate(today.getDate() - 7);
    setAllowedDate('#birthdate');
    setDateRange('#start_date', today);

    add_customer.onsubmit = (e) => {
        e.preventDefault();
        $('#add-account-btn').prop('disabled', true);
        $('#add-account-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
        checkValidity();
    };
    
    var req_elem = document.getElementById('add-customer').querySelectorAll("[required]");

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
        else if (isWithSpecialChars($('#middle_name').val())) {
            $('#middle_name').removeClass('valid-input');
            $('#middle_name').addClass('invalid-input');
            $($('#middle_name').next()).addClass('d-block');
            $(($('#middle_name').next()).text("Special characters not allowed."));
            counter++;
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
                    else if (isWithSpecialChars(req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Special characters not allowed."));
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
                    else if (isWithSpecialChars(req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Special characters not allowed."));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'billing_address') {
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
                else if (req_elem[i].id == 'email') {
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
                else if (req_elem[i].id == 'birthdate') {
                    if (!isLegalAge(req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text('Customer is not of legal age.'));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'start_date') {
                    if (!isWithinRange('2021-09-23', req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Start date is not within the company's calendar."));
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
            setTimeout ( () => {
                    $('#add-account-btn').prop('disabled', false);
                    $('#add-account-btn').text('Create Account');
                },2000
            );
        }
        else {
            sessionStorage.removeItem('account_id');
            addCustomer();
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

    async function addCustomer() {
        const account_id = $('#account_id').val();

        let newAccountData = JSON.stringify({
            'account_id' : account_id,
            'start_date' : $('#start_date').val(),
            'plan_id' : $('#plan_id').val(),
            'connection_id' : $('#connection_id').val(),
            'area_id' : $('#area_id').val(),
            'first_name' : $('#first_name').val(),
            'middle_name' : $('#middle_name').val(),
            'last_name' : $('#last_name').val(),
            'billing_address' : $('#billing_address').val(),
            'mobile_number' : $('#mobile_number').val(),
            'email' : $('#email').val(),
            'birthdate' : $('#birthdate').val(),
            'install_type_id' : $('#install_type_id').val()
        });

        const add_new_account = await createData('account/add_new_account.php', newAccountData);

        if (add_new_account.success) {
            await logActivity('Create Account [Account ID # ' + account_id + ']', 'Add New Account');

            setTimeout(function(){
                sessionStorage.setItem('save_message', "Account Added Successfully. Please check inactive tab.");
                window.location.replace('../views/customers');
            }, 3000);
        }
        else {
            toastr.error('Some error has occurred, please try again later.');
            setTimeout(function(){
                window.location.reload();
            }, 2000);
        }

    }

    async function setAddDropdown() {
        const [area, plan, connection, install_type] = await Promise.all ([fetchData('area/read.php'), fetchData('plan/read_active.php'), fetchData('connection/read.php'), fetchData('installation_type/read.php')]);

        for (var i = 0; i < plan.length; i++) {
            var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
            $("#plan_id").append(opt);
        }
    
        for (var i = 0; i < connection.length; i++) {
            var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
            $("#connection_id").append(opt);
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

// -------------------------------------------------------------------- Import Customer
async function setImportCustomerPage () {
    $('#error-dl').addClass('hide');

    const import_customer = document.getElementById('upload-customer');
    import_customer.onsubmit = (e) => {
        $('#upload-customer').attr('action', '../../app/includes/customer_upload.php');

        // $.ajax({
        //     url: '../../app/includes/customer_upload.php',
        //     cache: false,
        //     success: function(response) {
        //         var res = $.parseJSON(response);
        //     },
        //     error: function (xhr, status, error, response) {
        //         console.error(xhr);
        //         var res = $.parseJSON(response);

        //     }
        // });
        // console.log('here');
        // var file_data = $("#uploadFile").prop("files")[0];   // Getting the properties of file from file field
        // var form_data = new FormData();                  // Creating object of FormData class
        // form_data.append("file", file_data);              // Appending parameter named file with properties of file_field to form_data
        // $.ajax({
        //         url: "../../app/includes/customer_upload.php",
        //         dataType: 'json',
        //         cache: false,
        //         contentType: false,
        //         processData: false,
        //         data: form_data,                         // Setting the data attribute of ajax with file_data
        //         type: 'post',
        //         success: function(data) {
        //             console.log(data);
        //         }
        // });
    };
}

// -------------------------------------------------------------------- Export Customer
async function setExportCustomerPage () {
    const export_customer = document.getElementById('export-customer');
    export_customer.onsubmit = (e) => {
        $('#export-customer').attr('action', '../../app/includes/customer_export.php');
        toastr.info("Preparing CSV File...");
        // $.ajax({
        //     url: '../../app/includes/customer_export.php',
        //     cache: false,
        //     success: function(response) {
        //         var res = $.parseJSON(response);
        //         console.log(res)
        //     },
        //     error: function (xhr, status, error, response) {
        //         console.error(xhr);
        //         var res = $.parseJSON(response);
        //         console.log(res)
        //     }
        // });
    };
}

async function setDownloadPage () {
    const download_template = document.getElementById('download-template');
    download_template.onsubmit = (e) => {
        $('#download-template').attr('action', '../../app/includes/download_template.php');
        toastr.info("Preparing CSV File...");
        // $.ajax({
        //     url: '../../app/includes/customer_export.php',
        //     cache: false,
        //     success: function(response) {
        //         var res = $.parseJSON(response);
        //         console.log(res)
        //     },
        //     error: function (xhr, status, error, response) {
        //         console.error(xhr);
        //         var res = $.parseJSON(response);
        //         console.log(res)
        //     }
        // });
    };
}

async function setDownloadError () {
    const download_error = document.getElementById('download-error');
    download_error.onsubmit = (e) => {
        $('#download-error').attr('action', '../../app/includes/download_error.php');
        toastr.info("Preparing CSV File...");
        // $.ajax({
        //     url: '../../app/includes/customer_export.php',
        //     cache: false,
        //     success: function(response) {
        //         var res = $.parseJSON(response);
        //         console.log(res)
        //     },
        //     error: function (xhr, status, error, response) {
        //         console.error(xhr);
        //         var res = $.parseJSON(response);
        //         console.log(res)
        //     }
        // });
    };
}