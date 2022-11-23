// On Boot Load
$(document).ready(function () {
    isDefault();

    if (sessionStorage.getItem('error_message') == "You don't have access to this page.") {
        setToastrArgs(sessionStorage.getItem('error_message'), "Error");
        sessionStorage.setItem('error_message', null);
    }
    setDefaultSetting();
});

// Global Variables
let customer_name;
let account_id = (window.location.href).split("=")[1];

async function setDefaultSetting() {
    const customer_data = await getCustomerData(account_id);
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
}

async function setInvoiceHistory() {
    let content = await getInvoiceHistory(account_id);
    var t = $('#customer-invoice-tbl').DataTable();

    for (var i = 0; i < content.length; i++) {
        var tag;
        let status = await getStatusName('invoice_status', content[i].invoice_status_id);

        if (status.status_name == 'PAID') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row">${content[i].invoice_id}</th>
                <td>${formatDateString(content[i].disconnection_date)}</td>
                <td>&#8369; ${content[i].total_bill}</td>
                <td>&#8369; ${content[i].running_balance}</td>
                <td><span class="badge ${tag}">${status.status_name}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].invoice_id}"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }
}

async function setPaymentHistory() {
    let content = await getPaymentHistory(account_id);
    var t = $('#customer-payment-tbl').DataTable();

    for (var i = 0; i < content.length; i++) {
        var tag, payment_status;
        if (content[i].tagged == 1) {
            payment_status = 'Tagged';
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row">${content[i].payment_reference_id}</th>
                <td>&#8369; ${content[i].amount_paid}</td>
                <td>${formatDateString(content[i].payment_date)}</td>
                <td>${content[i].invoice_id}</td>
                <td><span class="badge ${tag}">${payment_status}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-payment" data-bs-whatever="${content[i].payment_id}"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }

    setViewModal('view-payment')
}

async function setProrateHistory() {
    let content = await getProrateHistory(account_id);
    var t = $('#customer-prorate-tbl').DataTable();

    for (var i = 0; i < content.length; i++) {
        var tag;
        let status = await getStatusName('prorate_status', content[i].prorate_status_id);
        if (status.status_name == "CHARGED") {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row">${content[i].prorate_id}</th>
                <td>${content[i].duration}</td>
                <td>&#8369; ${content[i].prorate_charge}</td>
                <td>${content[i].ticket_num}</td>
                <td><span class="badge ${tag}">${status.status_name}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-prorate" data-bs-whatever="${content[i].prorate_id}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
        `)).draw(false);
    }

    setViewModal('view-prorate')
}

async function setTicketHistory() {
    let content = await getTicketHistory(account_id);
    var t = $('#customer-ticket-tbl').DataTable();

    for (var i = 0; i < content.length; i++) {
        var tag;
        let concern = await getConcernCategory(content[i].concern_id);
        let status = await getStatusName('ticket_status', content[i].ticket_status_id);
        if (status.status_name == "RESOLVED") {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row">${content[i].ticket_num}</th>
                <td>${concern.concern_category}</td>
                <td>${formatDateString(content[i].date_filed)}</td>
                <td>${(content.date_resolved == null) ? 'N/A' : formatDateString(content.date_resolved)}</td>
                <td>${content[i].ticket_num}</td>
                <td><span class="badge ${tag}">${status.status_name}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-ticket" data-bs-whatever="${content[i].ticket_num}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
        `)).draw(false);
    }

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
                status.status_name
            ];
        }
        else if (table == 'view-ticket') {
            data = await getTicketData(data_id);
            let status = await getStatusName('ticket_status', data.ticket_status_id);
            let category = await getConcernCategory(data.concern_id);
            let admin = await getAdminData(data.admin_id);
            (data.ticket_status_id == 3) ? setTagElement('ticket_status', 1) : setTagElement('ticket_status', 2);
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
                (data.resolution_details == null) ? 'N/A' : data.resolution_details, 
                (data.date_resolved == null) ? 'N/A' : formatDateString(data.date_resolved), 
                (data.admin_id == null) ? 'N/A' : admin.first_name + ' ' + admin.last_name, 
                status.status_name
            ];
        }

        setContent();

        function setTagElement(id, status) {
            document.getElementById(id).classList.add('text-white');
            document.getElementById(id).classList.remove('bg-danger');
            document.getElementById(id).classList.remove('bg-success');

            (status == 1) ? document.getElementById(id).classList.add('bg-success') : document.getElementById(id).classList.add('bg-danger');
        }

        function setContent () {
            for (var i = 0; i < content.length; i++) {
                $(id[i]).val(content[i]);
            }
        }
    });
}

function formatDateString(date) {
    var temp = new Date(date);
    var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][temp.getMonth()];
    return month + ' ' + temp.getDate() + ', ' + temp.getFullYear();
}

async function getCustomerData() {
    let url = DIR_API + 'views/customer_data.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getInvoiceHistory() {
    let url = DIR_API + 'invoice/read_single_account.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getPaymentHistory() {
    let url = DIR_API + 'payment/read_single_account.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getProrateHistory() {
    let url = DIR_API + 'prorate/read_acct.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getTicketHistory() {
    let url = DIR_API + 'ticket/read_single_account.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getTicketData(ticket_num) {
    let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getConcernCategory(concern_id) {
    let url = DIR_API + 'concerns/read_single.php?concern_id=' + concern_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getStatusName(status_table, status_id) {
    let url = DIR_API + 'statuses/read_single.php';
    const statusResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'status_table' : status_table,
            'status_id' : status_id
        })
    });

    return await statusResponse.json();
}