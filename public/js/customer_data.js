$(document).ready(function () {
    isDefault();
    setDefaultSetting();
    restrictFunctions('custdata');
});

// Global Variables
let customer_name;
let account_id = (window.location.href).split("=")[1];

async function setDefaultSetting() {
    displaySuccessMessage();
    const customer_data = await fetchData('views/customer_data.php?account_id=' + account_id);
    customer_name = customer_data.first_name + " " + customer_data.last_name;
    $('#customer-name').text(customer_name);

    setCustomerData(customer_data);
    setInvoiceHistory();
    setPaymentHistory();
    setProrateHistory();
    setTicketHistory();
}

async function setCustomerData(customer_data) {
    // Customer Information
    $('#first_name').text(customer_data.first_name);
    $('#middle_name').text(customer_data.middle_name);
    $('#last_name').text(customer_data.last_name);
    $('#email').text(customer_data.email);
    $('#mobile_number').text(customer_data.mobile_number);
    $('#birthdate').text(formatDateString(customer_data.birthdate));
    $('#billing_address').text(customer_data.billing_address);
    $('#gstech_id').text(customer_data.gstech_id);

    // Account Information
    $('#account_id').text(customer_data.account_id);
    $('#start_date').text(formatDateString(customer_data.start_date));
    $('#lockin_end_date').text(formatDateString(customer_data.lockin_end_date));
    $('#billing_day').text(customer_data.billing_day);
    $('#plan_name').text(customer_data.plan_name);
    $('#connection_type').text(customer_data.connection_type);
    $('#area_name').text(customer_data.area_name);
    $('#bill_count').text(customer_data.bill_count);

    // Installation Information
    $('#installation_type').text(customer_data.installation_type);
    $('#installment').text(customer_data.installment);
    $('#installation_total_charge').text(customer_data.installation_total_charge);
    $('#installation_balance').text(customer_data.installation_balance);
    $('#install_status').text(customer_data.install_status);

    // Ratings Information
    $('#avg_rating').text(parseInt(100 - customer_data.avg_rating) + ' %');
    $('#rating_base').text(customer_data.rating_base);
    $('#delinquent_ratings').text(customer_data.delinquent_ratings);
    $('#rating_status').text(customer_data.rating_status);

    if (customer_data.rating_status == 'DELINQUENT') {
        document.getElementById('rating-img').src = '../images/delinquent.png';
        $('#rating-tag').addClass('hide');
    }

    const account_id = customer_data.account_id;

    var viewModal = document.getElementById('edit-customer');
    viewModal.addEventListener('show.bs.modal', async function (event) {

        const [customer, account, installation] = await Promise.all ([fetchData('customer/read_single.php?account_id=' + account_id), fetchData('account/read_single.php?account_id=' + account_id), fetchData('installation/read_single.php?account_id=' + account_id)]);

        $('#billing_address_edt').val(customer.billing_address);
        $('#mobile_number_edt').val(customer.mobile_number);
        $('#email_edt').val(customer.email);

        const [area, plan, connection, account_status, install_type] = await Promise.all ([fetchData('area/read.php'), fetchData('plan/read_active.php'), fetchData('connection/read.php'), fetchData('statuses/read.php?status_table=account_status'), fetchData('installation_type/read.php')]);

        $("#area_id_edt").empty();
        $("#area_id_edt").append(`<option selected disabled value="">Choose Area</option>`);
        for (var i = 0; i < area.length; i++) {
            if (area[i].area_id == account.area_id) {
                var opt = `<option selected value='${area[i].area_id}' style='color: blue'>${area[i].area_name}</option>`;
            }
            else {
                var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
            }
            $("#area_id_edt").append(opt);
        }

        $("#plan_id_edt").empty();
        $("#plan_id_edt").append(`<option selected disabled>Choose Subscription Plan</option>`);
        for (var i = 0; i < plan.length; i++) {
            if (plan[i].plan_id == account.plan_id) {
                var opt = `<option selected value='${plan[i].plan_id}' style='color: blue'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
            }
            else {
                var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
            }
            $("#plan_id_edt").append(opt);
        }

        $("#connection_id_edt").empty();
        $("#connection_id_edt").append(`<option selected disabled value="">Choose Connection Type</option>`);
        for (var i = 0; i < connection.length; i++) {
            if (connection[i].connection_id == account.connection_id) {
                var opt = `<option selected value='${connection[i].connection_id}' style='color: blue'>${connection[i].connection_name}</option>`;
            }
            else {
                var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
            }
            $("#connection_id_edt").append(opt);
        }

        $("#account_status_id_edt").empty();
        $("#account_status_id_edt").append(`<option selected disabled value="">Choose Account Status</option>`);
        for (var i = 0; i < account_status.length; i++) {
            if (account_status[i].status_id == account.account_status_id) {
                var opt = `<option selected value='${account_status[i].status_id}' style='color: blue'>${account_status[i].status_name}</option>`;
            }
            else {
                var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
            }
            $("#account_status_id_edt").append(opt);
        }

        $("#install_type_id_edt").empty();
        $("#install_type_id_edt").append(`<option selected disabled value="">Choose Installation Type</option>`);
        for (var i = 0; i < install_type.length; i++) {
            if (install_type[i].install_type_id == installation.install_type_id) {
                var opt = `<option selected value='${install_type[i].install_type_id}' color: blue'>${install_type[i].install_type_name}</option>`;
            }
            else {
                var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
            }
            $("#install_type_id_edt").append(opt);
        }

        const save_customer = document.getElementById('save-customer');
        save_customer.onsubmit = (e) => {
            e.preventDefault();
            updateCustomerData();
        };

        async function updateCustomerData() {
            let update_data = JSON.stringify({
                'account_id' : account_id,
                'billing_address' : $('#billing_address_edt').val(),
                'mobile_number' : $('#mobile_number_edt').val(),
                'email' : $('#email_edt').val()
            });

            let account_data = JSON.stringify({
                'account_id' : account_id,
                'plan_id' : $('#plan_id_edt').val(),
                'connection_id' : $('#connection_id_edt').val(),
                'account_status_id' : $('#account_status_id_edt').val(),
                'area_id' : $('#area_id_edt').val()
            });
        
            let activity, log = true, details = account_id + ' - ' + customer_data.first_name + ' ' + customer_data.last_name;
            if (customer.mobile_number != $('#mobile_number_edt').val()) {
                activity = 'Updated customer mobile number [' + details + '].';
                log = await logActivity(activity, 'Customer List');
            }
            if (customer.email != $('#email_edt').val()) {
                activity = 'Updated customer email [' + details + '].';
                log = await logActivity(activity, 'Customer List');
            }
            if (customer.billing_address != $('#billing_address_edt').val()) {
                activity = 'Updated customer billing address [' + details + '].';
                log = await logActivity(activity, 'Customer List');
            }
            if (account.plan_id != $('#plan_id_edt').val()) {
                activity = 'Updated account subscription plan [' + details + '].';
                log = await logActivity(activity, 'Customer List');
            }
            if (account.connection_id != $('#connection_id_edt').val()) {
                activity = 'Updated account connection type [' + details + '].';
                log = await logActivity(activity, 'Customer List');
            }
            if (account.account_status_id != $('#account_status_id_edt').val()) {
                activity = 'Updated account status [' + details + '].';
                log = await logActivity(activity, 'Customer List');
            }
            if (account.area_id != $('#area_id_edt').val()) {
                activity = 'Updated account area [' + details + '].';
                log = await logActivity(activity, 'Customer List');
            }
            
            const [customer_content, account_content] = await Promise.all ([updateData('customer/update.php', update_data), updateData('account/update.php', account_data)]);
        
            if (customer_content.success && account_content.success && log) {
                sessionStorage.setItem('save_message', "Customer Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Customer was not updated.");
            }
        }
        
    });
}

async function setInvoiceHistory() {
    let content = await fetchData('invoice/read_single_account.php?account_id=' + account_id);
    const inv_status = await fetchData('statuses/read.php?status_table=invoice_status');
    var t = $('#customer-invoice-tbl').DataTable({
        pageLength : 5,
        lengthMenu: [5, 10],
        "searching": true,
        "autoWidth" : false,
    }), tag;

    for (var i = 0; i < inv_status.length; i++) {
        var opt = `<option value='${inv_status[i].status_name}'>${inv_status[i].status_name}</option>`;
        $("#status-filter").append(opt);
    }

    for (var i = 0; i < content.length; i++) {
        let status = await getStatusName('invoice_status', content[i].invoice_status_id);
        (status == 'PAID') ? tag = 'bg-success' : tag = 'bg-danger';
        let dc_date = new Date(content[i].disconnection_date);
        
        t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${content[i].invoice_id}</th>
                <td data-label="Disconnection Date">${dc_date.toLocaleDateString('en-US')}</td>
                <td data-label="Running Balance">&#8369; ${content[i].running_balance}</td>
                <td data-label="Status"><span class="badge ${tag}">${status}</span></td>
                <td data-label="View"><button type="submit" class="btn btn-outline-primary" value="${content[i].invoice_id}" name="invoice_id_btn"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }

    $("#customer-invoice-tbl_filter.dataTables_filter").append($("#status-filter"));
    var statusIndex = 0;
        $("#customer-invoice-tbl th").each(function (i) {
            if ($($(this)).html() == "Status") {
                statusIndex = i; return false;
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

    $("#status-filter").change(function (e) {
        t.draw();
    });

    t.draw();
    // t.columns.adjust().draw();

}

async function setPaymentHistory() {
    let content = await fetchData('payment/read_single_account.php?account_id=' + account_id);
    var t = $('#customer-payment-tbl').DataTable({
        pageLength : 5,
        lengthMenu: [5, 10],
        "searching": true,
        "autoWidth" : false,
    }), tag, payment_status;

    for (var i = 0; i < content.length; i++) {
        (content[i].tagged == 1) ? payment_status = 'Tagged' : payment_status = 'Untagged';
        (content[i].tagged == 1) ? tag = 'bg-success' : tag = 'bg-danger';
        
        t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${content[i].payment_reference_id}</strong></th>
                <td data-label="Amount Paid">&#8369; ${content[i].amount_paid}</td>
                <td data-label="Payment Date">${(new Date(content[i].payment_date)).toLocaleDateString('en-US')}</td>
                <td data-label="Status"><span class="badge ${tag}">${payment_status}</span></td>
                <td data-label="View"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-payment" data-bs-whatever="${content[i].payment_id}"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }

    setViewModal('view-payment')
}

async function setProrateHistory() {
    const [content, prorate_statuses] = await Promise.all ([fetchData('prorate/read_acct.php?account_id=' + account_id), fetchData('statuses/read.php?status_table=prorate_status')]);

    var t = $('#customer-prorate-tbl').DataTable({
        pageLength : 5,
        lengthMenu: [5, 10],
        "searching": true,
        "autoWidth" : false,
    }), tag;

    for (var i = 0; i < prorate_statuses.length; i++) {
        var opt = `<option value='${prorate_statuses[i].status_name}'>${prorate_statuses[i].status_name}</option>`;
        $("#prorate-status-filter").append(opt);
    }

    for (var i = 0; i < content.length; i++) {
        let status = await getStatusName('prorate_status', content[i].prorate_status_id);
        (status == "Tagged") ? tag = 'bg-success' : tag = 'bg-danger';

        t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${content[i].prorate_id}</strong></th>
                <td data-label="Duration">${content[i].duration}</td>
                <td data-label="Discount">&#8369; ${content[i].prorate_charge}</td>
                <td data-label="Ticket Number">${content[i].ticket_num}</td>
                <td data-label="Status"><span class="badge ${tag}">${status}</span></td>
                <td data-label="View"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-prorate" data-bs-whatever="${content[i].prorate_id}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
        `)).draw(false);
    }

    $("#customer-prorate-tbl_filter.dataTables_filter").append($("#prorate-status-filter"));

    var statusIndex = 0;
    $("#customer-prorate-tbl th").each(function (i) {
        if ($($(this)).html() == "Status") {
            statusIndex = i; return false;
        }
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
        var selectedItem = $('#prorate-status-filter').val()
        var category = data[statusIndex];
        if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
        }
        return false;
        }
    );

    $("#prorate-status-filter").change(function (e) {
        t.draw();
    });

    t.draw();

    setViewModal('view-prorate')
}

async function setTicketHistory() {
    const [content, ticket_statuses, concerns] = await Promise.all ([fetchData('ticket/read_single_account.php?account_id=' + account_id), fetchData('statuses/read.php?status_table=ticket_status'), fetchData('concerns/read.php')]);

    var t = $('#customer-ticket-tbl').DataTable({
        pageLength : 5,
        lengthMenu: [5, 10],
        "searching": true,
        "autoWidth" : false,
    }), tag;

    for (var i = 0; i < ticket_statuses.length; i++) {
        var opt = `<option value='${ticket_statuses[i].status_name}'>${ticket_statuses[i].status_name}</option>`;
        $("#ticket-status-filter").append(opt);
    }

    for (var i = 0; i < concerns.length; i++) {
        var opt = `<option value='${concerns[i].concern_category}'>${concerns[i].concern_category}</option>`;
        $("#concern-filter").append(opt);
    }

    for (var i = 0; i < content.length; i++) {
        const [concern, status] = await Promise.all ([fetchData('concerns/read_single.php?concern_id=' + content[i].concern_id), getStatusName('ticket_status', content[i].ticket_status_id)]);
        var admin_username;
        if (content[i].admin_id == null) {
            admin_username = 'N/A';
        }
        else {
            const admin_content = await fetchData('admin/read_single.php?admin_id=' + content[i].admin_id);
            admin_username = admin_content.admin_username;
        }

        if (status == 'RESOLVED') {
            tag = 'bg-success';
        }
        else if (status == 'PENDING') {
            tag = 'bg-warning';
        }
        else {
            tag = 'bg-danger';
        }
        
        t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${content[i].ticket_num}</strong></th>
                <td data-label="Category">${concern.concern_category}</td>
                <td data-label="Admin">${admin_username}</td>
                <td data-label="Status"><span class="badge ${tag}">${status}</span></td>
                <td data-label="View"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-ticket" data-bs-whatever="${content[i].ticket_num}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
        `)).draw(false);
    }

    $("#customer-ticket-tbl_filter.dataTables_filter").append($("#concern-filter"));
    $("#customer-ticket-tbl_filter.dataTables_filter").append($("#ticket-status-filter"));

    var statusIndex = 0, concernIndex = 0;
    $("#customer-ticket-tbl th").each(function (i) {
        if ($($(this)).html() == "Status") {
            statusIndex = i; return false;
        }
    });

    $("#customer-ticket-tbl th").each(function (i) {
        if ($($(this)).html() == "Concern") {
            concernIndex = i; return false;
        }
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
        var selectedItem = $('#ticket-status-filter').val()
        var category = data[statusIndex];
        if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
        }
        return false;
        }
    );

    $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var selectedItem = $('#concern-filter').val()
        var category = data[concernIndex];
        if (selectedItem === "" || category.includes(selectedItem)) {
        return true;
        }
        return false;
    }
    );

    $("#ticket-status-filter").change(function (e) {
        t.draw();
    });

    $("#concern-filter").change(function (e) {
        t.draw();
    });

    t.draw();

    setViewModal('view-ticket')
}

// Set View Modal
async function setViewModal (table) {
    var viewModal = document.getElementById(table)
    viewModal.addEventListener('show.bs.modal', async function (event) {
        var modalTitle = viewModal.querySelector('.modal-title');
        modalTitle.textContent = customer_name;
        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let data, id, content;
        
        if (table == 'view-payment') {
            data = await fetchData('payment/read_single.php?payment_id=' + data_id);
            (data.tagged == 1) ? setTagElement('tagged', 1) : setTagElement('tagged', 2);
            id = [
                '#payment_reference_id', 
                '#amount_paid', 
                '#payment_date', 
                '#invoice_id', 
                '#tagged'
            ];
            content = [
                data.payment_reference_id, 
                data.amount_paid, 
                formatDateString(data.payment_date), 
                data.invoice_id, 
                'Tagged'
            ];
        }
        else if (table == 'view-prorate') {
            data = await fetchData('prorate/read_single.php?prorate_id=' + data_id);
            let status = await getStatusName('prorate_status', data.prorate_status_id);
            (data.prorate_status_id == 2) ? setTagElement('prorate_status', 1) : setTagElement('prorate_status', 2);
            id = [
                '#prorate_id', 
                '#duration', 
                '#prorate_charge', 
                '#invoice_id_pr', 
                '#prorate_status'
            ];
            content = [
                data.prorate_id, 
                data.duration, 
                '\u20B1 ' + data.prorate_charge, 
                data.invoice_id, 
                status
            ];
        }
        else if (table == 'view-ticket') {
            data = await fetchData('ticket/read_single.php?ticket_num=' + data_id);
            let status = await getStatusName('ticket_status', data.ticket_status_id);
            let category = await fetchData('concerns/read_single.php?concern_id=' + data.concern_id);
            let admin = await getAdminData(data.admin_id);
            (data.ticket_status_id == 3) ? setTagElement('ticket_status', 1) : (data.ticket_status_id == 2) ? setTagElement('ticket_status', 3) : setTagElement('ticket_status', 2);
            id = [
                '#ticket_num', 
                '#concern_category', 
                '#concern_details', 
                '#date_filed', 
                '#resolution_details',
                '#date_resolved',
                '#admin_id',
                '#ticket_status'
            ];
            content = [
                data.ticket_num, 
                category.concern_category, 
                data.concern_details, 
                formatDateString(data.date_filed),
                (data.resolution_details == null || data.resolution_details == '') ? 'N/A' : data.resolution_details, 
                (data.date_resolved == null || data.date_resolved == '0000-00-00') ? 'N/A' : formatDateString(data.date_resolved), 
                (data.admin_id == null) ? 'N/A' : admin.first_name + ' ' + admin.last_name, 
                status
            ];
        }

        setContent();

        function setContent () {
            for (var i = 0; i < content.length; i++) {
                $(id[i]).val(content[i]);
            }
        }
    });
}