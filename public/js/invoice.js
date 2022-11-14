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
            setPaymentRecordsPage();
        }
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_prorate.php') {
        if (sessionStorage.getItem("user_id") == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
            setProrateRecordsPage();
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
    create_fn = document.getElementById('create-new');
    edit_fn = document.getElementById('edit-btn');
    update_fn = document.getElementById('update-data');
    delete_fn = document.getElementById('delete-data');
}

function setData (id, data, setAttr, bool) {
    $(id).val(data);
    $(id).attr(setAttr, bool);
}

async function getAllCustomers() {
    let url = DIR_API + 'customer/read.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
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

async function getInvoiceStatus() {
    let url = DIR_API + 'statuses/read.php?status_table=invoice_status';
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

async function getLatestInvoice(account_id) {
    let url = DIR_API + 'invoice/read_latest.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getPaymentRecordData(payment_id) {
    let url = DIR_API + 'payment/read_single.php?payment_id=' + payment_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getProrateRecordData(prorate_id) {
    let url = DIR_API + 'views/prorate_single.php?prorate_id=' + prorate_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getPaymentRecords () {
    let url = DIR_API + 'views/payment.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getProrateRecords () {
    let url = DIR_API + 'views/prorate.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

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

// -------------------------------------------------------------------- View Invoices JS
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

    async function setInvoiceTable() {
        let url = DIR_API + 'views/invoice_unpaid.php';
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

    // Set View Invoice Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var invoice_id = button.getAttribute('data-bs-whatever');
            let data = await getInvoiceData(invoice_id);
            let statuses = await getInvoiceStatus();
            let customer_data = await getCustomerData(data.account_id);
            let status;

            function getStatus() {
                for (var i = 0; i < statuses.length; i++) {
                    if (data.invoice_status_id == statuses[i].status_id) {
                        status = statuses[i].status_name;
                    }
                }
            }

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

            getStatus();

            $('#invoice_status_id').val(status);

            if (data.invoice_status_id == 1) {
                toggleInputData('readonly', true);
                document.getElementById('invoice_status_id').classList.remove('bg-danger');
                document.getElementById('invoice_status_id').classList.add('bg-success');
                document.getElementById('invoice_status_id').classList.add('text-white');
                $('#edit-btn').attr('hidden', true);
                $('#save-btn').attr('hidden', true);
            }
            else {
                toggleInputData('disabled', true);
                document.getElementById('invoice_status_id').classList.add('bg-danger');
                document.getElementById('invoice_status_id').classList.add('text-white');
                $('#amount_paid').val(null);
            }

            function toggleInputData (setAttr, bool) {
                setData('#payment_reference_id', data.payment_reference_id, setAttr, bool);
                setData('#amount_paid', data.amount_paid, setAttr, bool);
                setData('#payment_date', data.payment_date, setAttr, bool);
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

        let ref_content = await getPaymentRecords();
        let isExist = false;

        for (var i = 0; i < ref_content.length; i++) {
            if (payment_reference_id == ref_content[i].ref_id) {
                isExist = true;
            }
        }

        if (!isExist) {
            let url = DIR_API + 'invoice/read_single.php?invoice_id=' + invoice_id;
            let invoice_content;
            try {
                let res = await fetch(url);
                invoice_content = await res.json();
            } catch (error) {
                console.log(error);
            }
        
            url = DIR_API + 'invoice/update.php';
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

            url = DIR_API + 'ratings/update.php';
            const updateRatingsResponse = await fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    'account_id' : account_id,
                    'invoice_status' : invoice_content.invoice_status_id
                })
            });

            const ratings_content = await updateRatingsResponse.json();
            const tagged_content = await updateTaggedResponse.json();
        
            if (content.message == 'Invoice Updated' && payment_content.message == 'Payment Record Created' && tagged_content.message == 'Payment Tagged' && ratings_content.message == 'Rating Updated') {
                sessionStorage.setItem('save_message', "Payment Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Payment was not updated.");
            }
        }
        else {
            toastr.error('Payment Reference ID already exist.');
            $('#payment_reference_id').val(null);
        }
    }
}

// -------------------------------------------------------------------- Payment Records JS
async function setPaymentRecordsPage() {
    displaySuccessMessage();
    setButtons();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    setPaymentRecordsTable();
    setUpdateModal();
    setDeleteModal();

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        deleteData();
    };

    // Set Payment Records Table
    async function setPaymentRecordsTable() {
        // Fetch Payment Records
        let data = await getPaymentRecords();
        var t = $('#payments-table').DataTable();
    
        for (var i = 0; i < data.length; i++) {
            var tag;
            if (data[i].status == 1) {
                data[i].status = 'Tagged';
                tag = 'bg-success';
            }
            else {
                data[i].status = 'Untagged';
                data[i].account_id = 'N/A';
                tag = 'bg-danger';
            }
            t.row.add($(`
                <tr>
                    <th scope="row"><a href="#">${data[i].payment_id}</a></th>
                    <td>&#8369; ${data[i].amount_paid}</td>
                    <td><a href="#" class="text-primary">${data[i].ref_id}</a></td>
                    <td>${data[i].payment_date}</td>
                    <td>${data[i].account_id}</td>
                    <td><span class="badge ${tag}">${data[i].status}</span></td>
                    <td>
                        <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${data[i].payment_id}" ><i class="bi bi-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${data[i].payment_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                    </td>
                </tr>
            `)).draw(false);
        }
    }
    
    // Set Payment Records Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var payment_id = button.getAttribute('data-bs-whatever');
            let data = await getPaymentRecordData(payment_id);
            let customer_data = await getAllCustomers();
            let cust = await getCustomerData(customer_data[1].account_id);

            function toggleInputData (setAttr, bool) {
                setData('#payment_id', data.payment_id, setAttr, bool);
                setData('#amount_paid', data.amount_paid, setAttr, bool);
                setData('#payment_reference_id', data.payment_reference_id, setAttr, bool);
                setData('#payment_date', data.payment_date, setAttr, bool);
                setData('#account_id', data.account_id, setAttr, bool);
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = data.payment_reference_id;

            if (data.tagged == 1) {
                toggleInputData('readonly', true);
                setData('#invoice_id', data.invoice_id, 'hidden', false);
                setData('#invoice_id_lbl', 'Invoice ID', 'hidden', false);
                document.getElementById('tagged').classList.remove('bg-danger');
                document.getElementById('tagged').classList.add('bg-success');
                document.getElementById('tagged').classList.add('text-white');
                setData('#tagged', 'Tagged', 'readonly', true);
                $('#edit-btn').attr('hidden', true);
                $('#save-btn').attr('hidden', true);
            }
            else {
                toggleInputData('disabled', true);
                setData('#invoice_id_lbl', 'Invoice ID', 'hidden', true);
                setData('#invoice_id', data.invoice_id, 'hidden', true);
                setData('#tagged', 'Untagged', 'disabled', true);
                document.getElementById('tagged').classList.add('bg-danger');
                document.getElementById('tagged').classList.add('text-white');
                $('#edit-btn').attr('hidden', false);
                $('#save-btn').attr('hidden', false);
            }

            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
                // $('#amount_paid').val(null);
            };
        });
    }
    
    // Update Payment Record
    async function updateData() {
        const account_id = $('#account_id').val();
        const payment_reference_id = $('#payment_reference_id').val();
        const amount_paid = $('#amount_paid').val();
        const payment_date = $('#payment_date').val();
        const payment_id = $('#payment_id').val();

        const invoice_content = await getLatestInvoice(account_id);

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

        url = DIR_API + 'payment/update_tagged.php';
        const updateTaggedResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'account_id' : account_id,
                'invoice_id' : invoice_content.invoice_id,
                'payment_id' : payment_id
            })
        });

        url = DIR_API + 'ratings/update.php';
        const updateRatingsResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'account_id' : account_id,
                'invoice_status' : invoice_content.invoice_status_id
            })
        });

        const update_content = await updateDataResponse.json();
        const ratings_content = await updateRatingsResponse.json();
        const tagged_content = await updateTaggedResponse.json();
    
        if (update_content.message == 'Invoice Updated' && tagged_content.message == 'Payment Tagged' && ratings_content.message == 'Rating Updated') {
            sessionStorage.setItem('save_message', "Payment Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Payment was not updated.");
        }
    }
    
    // Set Delete Payment Record Modal
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var payment_id = button.getAttribute('data-bs-whatever');
            let data = await getPaymentRecordData(payment_id);

            function toggleInputData (setAttr, bool) {
                setData('#payment_id_d', data.payment_id, setAttr, bool);
                setData('#amount_paid_d', data.amount_paid, setAttr, bool);
                setData('#payment_reference_id_d', data.payment_reference_id, setAttr, bool);
                setData('#payment_date_d', data.payment_date, setAttr, bool);
                setData('#account_id_d', data.account_id, setAttr, bool);
                setData('#invoice_id_d', data.invoice_id, setAttr, bool);
            }

            var modalTitle = deleteModal.querySelector('.modal-title');

            if (data.tagged == 1) {
                toggleInputData('readonly', true);
                document.getElementById('tagged_d').classList.remove('bg-danger');
                document.getElementById('tagged_d').classList.add('bg-success');
                document.getElementById('tagged_d').classList.add('text-white');
                setData('#tagged_d', 'Tagged', 'readonly', true);
                $('#dlt-btn').attr('hidden', true);
                $('#cncl-btn').attr('hidden', true);
                $('#cls-btn').attr('hidden', false);
                modalTitle.textContent = "You can't delete already tagged payments.";
            }
            else {
                toggleInputData('disabled', true);
                setData('#tagged_d', 'Untagged', 'disabled', true);
                document.getElementById('tagged_d').classList.add('bg-danger');
                document.getElementById('tagged_d').classList.add('text-white');
                $('#dlt-btn').attr('hidden', false);
                $('#cncl-btn').attr('hidden', false);
                $('#cls-btn').attr('hidden', true);
                // $('#amount_paid_d').val(null);
                modalTitle.textContent = data.payment_reference_id;
            }
        });
    }
    
    // Delete Payment Record
    async function deleteData() {
        const payment_id = $('#payment_id_d').val();
    
        let url = DIR_API + 'payment/delete.php';
        const deleteDataResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'payment_id' : payment_id
            })
        });
    
        const content = await deleteDataResponse.json();
        
        if (content.message == 'Payment Record Deleted') {
            sessionStorage.setItem('save_message', "Payment Record Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Payment Record was not deleted.");
        }
    }
} // End of Payment Records JS

// -------------------------------------------------------------------- Prorate Records JS
async function setProrateRecordsPage() {
    displaySuccessMessage();
    setButtons();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    setProrateRecordsTable();
    setUpdateModal();
    setDeleteModal();

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        deleteData();
    };

    // Set Prorate Records Table
    async function setProrateRecordsTable() {
        // Fetch Prorate Records
        let data = await getProrateRecords();

        var t = $('#prorate-table').DataTable();
    
        for (var i = 0; i < data.length; i++) {
            var tag;
            if (data[i].status == 'CHARGED') {
                tag = 'bg-success';
            }
            else {
                tag = 'bg-danger';
            }
            t.row.add($(`
                <tr>
                    <th scope="row"><a href="#">${data[i].prorate_id}</a></th>
                    <td>${data[i].account_id}</td>
                    <td><a href="#" class="text-primary">${data[i].customer_name}</a></td>
                    <td>${data[i].duration}</td>
                    <td>&#8369; ${data[i].amount}</td>
                    <td><span class="badge ${tag}">${data[i].status}</span></td>
                    <td>
                        <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${data[i].prorate_id}" ><i class="bi bi-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${data[i].prorate_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                    </td>
                </tr>
            `)).draw(false);
        }
    }
    
    // Set Prorate Records Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var prorate_id = button.getAttribute('data-bs-whatever');
            let data = await getProrateRecordData(prorate_id);

            function toggleInputData (setAttr, bool) {
                setData('#prorate_id', data.prorate_id, setAttr, bool);
                setData('#account_id', data.account_id, setAttr, bool);
                setData('#customer_name', data.customer_name, setAttr, bool);
                setData('#duration', data.duration, setAttr, bool);
                setData('#prorate_charge', data.amount, setAttr, bool);
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = data.customer_name;

            if (data.status == 'CHARGED') {
                toggleInputData('readonly', true);
                document.getElementById('status').classList.remove('bg-danger');
                document.getElementById('status').classList.add('bg-success');
                document.getElementById('status').classList.add('text-white');
                setData('#status', 'Charged', 'readonly', true);
                $('#edit-btn').attr('hidden', true);
                $('#save-btn').attr('hidden', true);
            }
            else {
                toggleInputData('disabled', true);
                setData('#status', 'Uncharged', 'disabled', true);
                document.getElementById('status').classList.add('bg-danger');
                document.getElementById('status').classList.add('text-white');
                $('#edit-btn').attr('hidden', false);
                $('#save-btn').attr('hidden', false);
            }

            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };
        });
    }
    
    // Update Prorate Record
    async function updateData() {
        const prorate_id = $('#prorate_id').val();
        const account_id = $('#account_id').val();
        const duration = $('#duration').val();

        let url = DIR_API + 'prorate/update.php';
        const updateDataResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'account_id' : account_id,
                'prorate_id' : prorate_id,
                'duration' : duration
            })
        });

        const update_content = await updateDataResponse.json();
    
        if (update_content.message == 'Prorate Updated') {
            sessionStorage.setItem('save_message', "Prorate Record Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Prorate Record was not updated.");
        }
    }
    
    // Set Delete Prorate Record Modal
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var prorate_id = button.getAttribute('data-bs-whatever');
            let data = await getProrateRecordData(prorate_id);

            function toggleInputData (setAttr, bool) {
                setData('#prorate_id_d', data.prorate_id, setAttr, bool);
                setData('#account_id_d', data.account_id, setAttr, bool);
                setData('#customer_name_d', data.customer_name, setAttr, bool);
                setData('#duration_d', data.duration, setAttr, bool);
                setData('#prorate_charge_d', data.amount, setAttr, bool);
            }

            var modalTitle = deleteModal.querySelector('.modal-title');

            if (data.status == 'CHARGED') {
                toggleInputData('readonly', true);
                document.getElementById('status_d').classList.remove('bg-danger');
                document.getElementById('status_d').classList.add('bg-success');
                document.getElementById('status_d').classList.add('text-white');
                setData('#status_d', 'Charged', 'readonly', true);
                $('#dlt-btn').attr('hidden', true);
                $('#cncl-btn').attr('hidden', true);
                $('#cls-btn').attr('hidden', false);
                modalTitle.textContent = "You can't delete already charged prorates.";
            }
            else {
                toggleInputData('disabled', true);
                setData('#status_d', 'Uncharged', 'disabled', true);
                document.getElementById('status_d').classList.add('bg-danger');
                document.getElementById('status_d').classList.add('text-white');
                $('#dlt-btn').attr('hidden', false);
                $('#cncl-btn').attr('hidden', false);
                $('#cls-btn').attr('hidden', true);
                modalTitle.textContent = data.prorate_id;
            }
        });
    }
    
    // Delete Prorate Record
    async function deleteData() {
        const prorate_id = $('#prorate_id_d').val();
    
        let url = DIR_API + 'prorate/delete.php';
        const deleteDataResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'prorate_id' : prorate_id
            })
        });
    
        const content = await deleteDataResponse.json();
        
        if (content.message == 'Prorate Deleted') {
            sessionStorage.setItem('save_message', "Prorate Record Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Prorate Record was not deleted.");
        }
    }
} // End of Prorate Records JS

// -------------------------------------------------------------------- Add Payment Record JS
async function setAddPaymentPage () {
    setButtons();

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        addPayment();
    };

    async function addPayment () {
        const amount_paid = $('#amount_paid').val();
        const payment_ref = $('#payment_ref').val();
        const payment_date = $('#payment_date').val();
        let ref_content = await getPaymentRecords();
        let isExist = false;

        for (var i = 0; i < ref_content.length; i++) {
            if (payment_ref == ref_content[i].ref_id) {
                isExist = true;
            }
        }

        if (!isExist) {
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
                toastr.success('Payment Record Created Successfully.');
                setTimeout(function(){
                    window.location.replace('../views/invoice_payments.php');
                    }, 2000);
            }
            else {
                toastr.error(payment_content.message);
                setTimeout(function(){
                    window.location.reload();
                    }, 2000);
            }
        }
        else {
            toastr.error('Payment Reference ID already exist.');
            $('#payment_ref').val(null);
        }
    }
}
