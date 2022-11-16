// On Boot Load
$(document).ready(function () {
    isDefault();

    if (sessionStorage.getItem('error_message') == "You don't have access to this page.") {
        setToastrArgs(sessionStorage.getItem('error_message'), "Error");
        sessionStorage.setItem('error_message', null);
    }
    setDefaultSetting();
});

async function setDefaultSetting() {
    let account_id = (window.location.href).split("=")[1];
    const customer_data = await getCustomerData(account_id);
    $('#customer-name').text(customer_data.first_name + " " + customer_data.last_name);

    setCustomerData(customer_data);
    setInvoiceHistory(account_id);
    setPaymentHistory(account_id);
    setProrateHistory(account_id);
    setTicketHistory(account_id);
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

async function setInvoiceHistory(account_id) {
    let content = await getInvoiceHistory(account_id);
    var t;
    (content.length <= 0) ? t = $('#customer-invoice-tbl').DataTable() : t = $('#customer-invoice-tbl').DataTable();

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

async function setPaymentHistory(account_id) {
    let content = await getPaymentHistory(account_id);
    var t;
    (content.length <= 0) ? t = $('#customer-payment-tbl').DataTable() : t = $('#customer-payment-tbl').DataTable();

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
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].payment_id}"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }
}

async function setProrateHistory(account_id) {
    let content = await getProrateHistory(account_id);
    var t;
    (content.length <= 0) ? t = $('#customer-prorate-tbl').DataTable() : t = $('#customer-prorate-tbl').DataTable();

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
            </tr>
        `)).draw(false);
    }
}

async function setTicketHistory(account_id) {
    let content = await getTicketHistory(account_id);
    var t;
    (content.length <= 0) ? t = $('#customer-ticket-tbl').DataTable() : t = $('#customer-ticket-tbl').DataTable();

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
                <td>${formatDateString(content[i].date_resolved)}</td>
                <td>${content[i].ticket_num}</td>
                <td><span class="badge ${tag}">${status.status_name}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].ticket_num}"><i class="ri ri-eye-fill"></i></button></td>
                </tr>
        `)).draw(false);
    }
}

function formatDateString(date) {
    var temp = new Date(date);
    var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][temp.getMonth()];
    return month + ' ' + temp.getDate() + ', ' + temp.getFullYear();
}

async function getCustomerData(account_id) {
    let url = DIR_API + 'views/customer_data.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getInvoiceHistory(account_id) {
    let url = DIR_API + 'invoice/read_single_account.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getPaymentHistory(account_id) {
    let url = DIR_API + 'payment/read_single_account.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getProrateHistory(account_id) {
    let url = DIR_API + 'prorate/read_acct.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}

async function getTicketHistory(account_id) {
    let url = DIR_API + 'ticket/read_single_account.php?account_id=' + account_id;
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