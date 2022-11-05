// On Boot Load
$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/invoice_payments_add.php') {
        if (sessionStorage.getItem("user_id") == 5 || 
            sessionStorage.getItem("user_id") == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
            setAddPaymentPage();
        }
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_payments.php') {
        if (sessionStorage.getItem("user_id") == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
            getPayments();
        }
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_prorate.php') {
        if (sessionStorage.getItem("user_id") == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
            getProrates();
        }
    }
    else {
        getInvoices();
    }
});

// View Invoices JS
async function getInvoices () {
    let url = DIR_API + 'views/invoice.php';
    let invoice_data;
    var t = $('#invoice-table').DataTable();
    try {
        let res = await fetch(url);
        invoice_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < invoice_data.length; i++) {
        var tag;
        if (invoice_data[i].status == 'PAID') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${invoice_data[i].invoice_id}</a></th>
                <td><a href="#" class="text-primary">${invoice_data[i].customer_name}</a></td>
                <td>${invoice_data[i].disconnection_date}</td>
                <td>&#8369; ${invoice_data[i].total_bill}</td>
                <td><span class="badge ${tag}">${invoice_data[i].status}</span></td>
            </tr>
        `)).draw(false);
    }
}

// View Prorate JS
async function getProrates () {
    let url = DIR_API + 'views/prorate.php';
    let prorate_data;
    var t = $('#prorate-table').DataTable();
    try {
        let res = await fetch(url);
        prorate_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < prorate_data.length; i++) {
        var tag;
        if (prorate_data[i].status == 'CHARGED') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${prorate_data[i].prorate_id}</a></th>
                <td>${prorate_data[i].account_id}</td>
                <td><a href="#" class="text-primary">${prorate_data[i].customer_name}</a></td>
                <td>${prorate_data[i].duration}</td>
                <td>&#8369; ${prorate_data[i].amount}</td>
                <td><span class="badge ${tag}">${prorate_data[i].status}</span></td>
            </tr>
        `)).draw(false);
    }
}

// View Payments JS
async function getPayments () {
    let url = DIR_API + 'views/payment.php';
    let payment_data;
    var t = $('#payments-table').DataTable();
    try {
        let res = await fetch(url);
        payment_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < payment_data.length; i++) {
        var tag;
        if (payment_data[i].status == 1) {
            payment_data[i].status = 'Tagged';
            tag = 'bg-success';
        }
        else {
            payment_data[i].status = 'Untagged';
            payment_data[i].account_id = 'N/A';
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${payment_data[i].payment_id}</a></th>
                <td>&#8369; ${payment_data[i].amount_paid}</td>
                <td><a href="#" class="text-primary">${payment_data[i].ref_id}</a></td>
                <td>${payment_data[i].payment_date}</td>
                <td>${payment_data[i].account_id}</td>
                <td><span class="badge ${tag}">${payment_data[i].status}</span></td>
            </tr>
        `)).draw(false);
    }
}

// Add Payment Record JS
async function addPayment () {
    const amount_paid = $('#amount_paid').val();
    const payment_ref = $('#payment_ref').val();
    const payment_date = $('#payment_date').val();

    let url = DIR_API + 'payment/create.php';
    const addPaymentResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'amount_paid' : amount_paid,
            'payment_reference_id' : payment_ref,
            'payment_date' : payment_date
        })
    });

    const payment_content = await addPaymentResponse.json();
    
    if (payment_content.message == 'Payment Record Created') {
        toastr.success('Payment Created Successfully.');
        setTimeout(function(){
            window.location.replace('../views/invoice_payments.php');
            // window.location.reload();
         }, 2000);
    }
    else {
        toastr.error(payment_content.message);
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

function setAddPaymentPage () {
    const add_record = document.getElementById('add-payment');

    // Form Submits -- onclick Triggers
    add_record.onsubmit = (e) => {
        e.preventDefault();
        addPayment();
    };
}
