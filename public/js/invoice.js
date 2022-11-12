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
        setInvoicePage();
    }
});
// Global Functions
function displaySuccessMessage() {
    const msg = sessionStorage.getItem('save_message');
    if (msg !== null) {
        toastr.success(sessionStorage.getItem("save_message"));
        sessionStorage.removeItem("save_message");
    }
}

let create_fn, edit_fn, update_fn, delete_fn;
function setButtons() {
    // create_fn = document.getElementById('create-new');
    edit_fn = document.getElementById('edit-btn');
    update_fn = document.getElementById('update-data');
    // delete_fn = document.getElementById('delete-data');
}

function setData (id, data, setAttr, bool) {
    $(id).val(data);
    $(id).attr(setAttr, bool);
}

// View Invoices JS
async function setInvoicePage () {
    displaySuccessMessage();
    setInvoiceTable();
    setButtons();
    setUpdateModal();
    
    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    // Set View Invoice Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var invoice_id = button.getAttribute('data-bs-whatever');
            let data = await getInvoiceData(invoice_id);
            let customer_data = await getCustomerData(data.account_id);
            let inc_id;

            // Display Invoice Details
            $('#invoice_id').val(data.invoice_id);
            $('#account_id').val(data.account_id);
            $('#billing_period_start').val(data.billing_period_start);
            $('#billing_period_end').val(data.billing_period_end);
            $('#disconnection_date').val(data.disconnection_date);
            $('#previous_bill').val(data.previous_bill);
            $('#previous_payment').val(data.previous_payment);
            $('#balance').val(data.balance);
            $('#secured_cash').val(data.secured_cash);
            $('#subscription_amount').val(data.subscription_amount);
            $('#prorated_charge').val(data.prorated_charge);
            $('#installation_charge').val(data.installation_charge);
            $('#total_bill').val(data.total_bill);
            $('#invoice_status_id').val(data.invoice_status_id);

            if (data.invoice_status_id == 1) {
                toggleInputData('readonly', true);
                $('#edit-btn').attr('hidden', true);
                $('#save-btn').attr('hidden', true);
            }
            else {
                toggleInputData('disabled', true);
                $('#amount_paid').val(null);
            }

            function toggleInputData (setAttr, bool) {
                setData('#payment_reference_id', data.payment_reference_id, setAttr, bool);
                setData('#amount_paid', data.amount_paid, setAttr, bool);
                setData('#payment_date', data.payment_date, setAttr, bool);
            }

            for (var i = 0; i < data.length; i++) {
                if (inclusion_id == data[i].inclusion_id) {
                    inc_id = i;
                }
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = customer_data.first_name + ' ' + customer_data.last_name + ' - ' + data.invoice_id;
    
            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
                $('#amount_paid').val(null);
            };
        });
    }

    async function updateData() {
        const account_id = $('#account_id').val();
        const invoice_id = $('#invoice_id').val();
        const payment_reference_id = $('#payment_reference_id').val();
        const amount_paid = $('#amount_paid').val();
        const payment_date = $('#payment_date').val();
    
        let url = DIR_API + 'invoice/update.php';
        const updateDataResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'account_id' : account_id,
                'payment_reference_id' : payment_reference_id,
                'amount_paid' : amount_paid,
                'payment_date' : payment_date
            })
        });

        url = DIR_API + 'payment/create.php';
        const addPaymentResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'amount_paid' : amount_paid,
                'payment_reference_id' : payment_reference_id,
                'payment_date' : payment_date
            })
        });

        const content = await updateDataResponse.json();
        const payment_content = await addPaymentResponse.json();

        url = DIR_API + 'payment/update_tagged.php';
        const updateTaggedResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'account_id' : account_id,
                'invoice_id' : invoice_id,
                'payment_id' : payment_content.payment_id
            })
        });

        const tagged_content = await updateTaggedResponse.json();
    
        if (content.message == 'Invoice Updated' && payment_content.message == 'Payment Record Created' && tagged_content.message == 'Payment Tagged') {
            sessionStorage.setItem('save_message', "Payment Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Payment was not updated.");
        }
    }
}

async function setInvoiceTable() {
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
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${invoice_data[i].invoice_id}"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }
}

async function getInvoiceData(invoice_id) {
    let url = DIR_API + 'invoice/read_single.php?invoice_id=' + invoice_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getCustomerData(account_id) {
    let url = DIR_API + 'customer/read_single.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
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

// Update Tagged Payment
async function updateTagged (payment_id) {
    const account_id = $('#account_id').val();
    const invoice_id = $('#invoice_id').val();

    let url = DIR_API + 'payment/update_tagged.php';
    const updateTaggedResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id,
            'invoice_id' : invoice_id,
            'payment_id' : payment_id
        })
    });

    return await updateTaggedResponse.json();
}

async function setAddPaymentPage () {
    const add_record = document.getElementById('add-payment');

    // Form Submits -- onclick Triggers
    add_record.onsubmit = (e) => {
        e.preventDefault();
        addPayment();
    };
}
