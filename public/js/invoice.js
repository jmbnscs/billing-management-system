$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/invoice_payments_add.php') {
        if (user_id == 5 || user_id == 6) {
            setErrorMessage();
            window.location.replace("../views/dashboard.php");
        }
        else {
            setAddPaymentPage();
        }
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_payments.php') {
        if (user_id == 6) {
            setErrorMessage();
            window.location.replace("../views/dashboard.php");
        }
        else {
            setPaymentRecordsPage();
        }
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_prorate.php') {
        if (user_id == 6) {
            setErrorMessage();
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

function setData (id, data, setAttr, bool) {
    $(id).val(data);
    $(id).attr(setAttr, bool);
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
    setButtons();
    setInvoiceTable();
    setUpdateModal();
    
    $("#editModal").on("hidden.bs.modal", function () {
        $('#edit-btn').attr('hidden', false);
        $('#save-btn').attr('hidden', true);
    });

    async function setInvoiceTable() {
        let content = await fetchData('views/invoice_unpaid.php');
        var t = $('#invoice-table').DataTable(), tag;
    
        for (var i = 0; i < content.length; i++) {
            (content[i].status == 'PAID') ? tag = 'bg-success' : tag = 'bg-danger';
            
            t.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;"><strong>${content[i].invoice_id}</strong></th>
                    <td>${content[i].customer_name}</td>
                    <td>${content[i].disconnection_date}</td>
                    <td>&#8369; ${content[i].running_balance}</td>
                    <td><span class="badge ${tag}">${content[i].status}</span></td>
                    <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].invoice_id}"><i class="ri ri-eye-fill"></i></button></td>
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
            
            let data = await fetchData('invoice/read_single.php?invoice_id=' + invoice_id);
            let customer_data = await fetchData('customer/read_single.php?account_id=' + data.account_id);
            toggleInputData('disabled', true);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = customer_data.first_name + ' ' + customer_data.last_name + ' - ' + data.invoice_id;

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

            $('#payment_reference_id').val(data.payment_reference_id);
            $('#amount_paid').val(null);
            $('#payment_date').val(data.payment_date);

            $('#invoice_status_id').val(await getStatusName('invoice_status', data.invoice_status_id));
            setTagElement('invoice_status_id', data.invoice_status_id);

            
            function toggleInputData (setAttr, bool) {
                $('#payment_reference_id').attr(setAttr, bool);
                $('#amount_paid').attr(setAttr, bool);
                $('#payment_date').attr(setAttr, bool);
            }

            edit_fn.onclick = (e) => {
                e.preventDefault();
                toggleInputData('disabled', false);
                $('#edit-btn').attr('hidden', true);
                $('#save-btn').attr('hidden', false);
            };

            update_fn.onsubmit = (e) => {
                e.preventDefault();
                processUpdate();
            };

            async function processUpdate() {
                const account_id = $('#account_id').val();
                let ref_content = await fetchData('views/payment.php');
                let isExist = false;
        
                for (var i = 0; i < ref_content.length; i++) {
                    if ($('#payment_reference_id').val() == ref_content[i].ref_id) {
                        isExist = true;
                    }
                }
        
                if (!isExist) {

                    let update_data = JSON.stringify({
                        'account_id' : $('#account_id').val(),
                        'payment_reference_id' : $('#payment_reference_id').val(),
                        'amount_paid' : $('#amount_paid').val(),
                        'payment_date' : $('#payment_date').val()
                    });

                    let payment_data = JSON.stringify({
                        'amount_paid' : $('#amount_paid').val(),
                        'payment_reference_id' : $('#payment_reference_id').val(),
                        'payment_date' : $('#payment_date').val()
                    })

                    let rating_data = JSON.stringify({
                        'account_id' : account_id,
                        'invoice_status' : data.invoice_status_id
                    });

                    const [update_content, payment_content, rating_content] = await Promise.all ([updateData('invoice/update.php', update_data), createData('payment/create.php', payment_data), updateData('ratings/update.php', rating_data)]);

                    let tag_data = JSON.stringify({
                        'account_id' : account_id,
                        'invoice_id' : invoice_id,
                        'payment_id' : payment_content.payment_id
                    });

                    const tag_content = await updateData('payment/update_tagged.php', tag_data);

                    let log = await logActivity('Updated payment for ' + account_id + ' with Invoice # ' + invoice_id, 'Unpaid Invoices');

                    if (update_content.message == 'Invoice Updated' && payment_content.message == 'Payment Record Created' && tag_content.message == 'Payment Tagged' && rating_content.message == 'Rating Updated' && log) {
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
        });
    }
} // End of Invoice Records

// -------------------------------------------------------------------- Payment Records JS
async function setPaymentRecordsPage() {
    displaySuccessMessage();
    setButtons();
    setPaymentRecordsTable();
    setUpdateModal();
    setDeleteModal();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    async function setPaymentRecordsTable() {
        let content = await fetchData('payment/read_untagged.php');
        var t = $('#payments-table').DataTable(), tag;
    
        for (var i = 0; i < content.length; i++) {
            t.row.add($(`
                <tr>
                    <th scope="row" style="color: #012970;"><strong>${content[i].payment_reference_id}</strong></th>
                    <td>&#8369; ${content[i].amount_paid}</td>
                    <td>${content[i].payment_date}</td>
                    <td><span class="badge bg-danger">Untagged</span></td>
                    <td>
                        <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].payment_id}" ><i class="bi bi-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${content[i].payment_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                    </td>
                </tr>
            `)).draw(false);
        }
    }
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var payment_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('payment/read_single.php?payment_id=' + payment_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = data.payment_reference_id;
            
            $('#payment_id').val(data.payment_id);
            $('#amount_paid').val(data.amount_paid);
            $('#payment_reference_id').val(data.payment_reference_id);
            $('#payment_date').val(data.payment_date);
            $('#account_id').val(data.account_id);
            $('#tagged').val('Untagged');

            toggleInputData('disabled', true);
            setTagElement('tagged', 2);

            function toggleInputData (setAttr, bool) {
                $('#amount_paid').attr(setAttr, bool);
                $('#payment_reference_id').attr(setAttr, bool);
                $('#payment_date').attr(setAttr, bool);
                $('#account_id').attr(setAttr, bool);
            }

            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };

            update_fn.onsubmit = (e) => {
                e.preventDefault();
                processUpdate();
            };

            async function processUpdate() {
                const account_id = $('#account_id').val();
                const payment_reference_id = $('#payment_reference_id').val();
                const amount_paid = $('#amount_paid').val();
                const payment_date = $('#payment_date').val();
                const payment_id = $('#payment_id').val();

                const latest_invoice = await fetchData('invoice/read_latest.php?account_id=' + account_id);

                let invoice_data = JSON.stringify({
                    'account_id' : account_id,
                    'payment_reference_id' : payment_reference_id,
                    'amount_paid' : amount_paid,
                    'payment_date' : payment_date
                });

                let payment_data = JSON.stringify({
                    'account_id' : account_id,
                    'invoice_id' : latest_invoice.invoice_id,
                    'payment_id' : payment_id
                });

                let rating_data = JSON.stringify({
                    'account_id' : account_id,
                    'invoice_status' : latest_invoice.invoice_status_id
                })

                const [invoice_content, payment_content, rating_content] = await Promise.all ([updateData('invoice/update.php', invoice_data), updateData('payment/update_tagged.php', payment_data), updateData('ratings/update.php', rating_data)]);
        
                const log = await logActivity('Tagged Payment ' + payment_reference_id + ' to ' + account_id + ' in Invoice # ' + invoice_content.invoice_id, 'Untagged Payments');
            
                if (invoice_content.message == 'Invoice Updated' && payment_content.message == 'Payment Tagged' && rating_content.message == 'Rating Updated' && log) {
                    sessionStorage.setItem('save_message', "Payment Updated Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Payment was not updated.");
                }
            }
        });
    }
    
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var payment_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('payment/read_single.php?payment_id=' + payment_id);

            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = 'Delete ' + data.payment_reference_id + '?';
            
            $('#payment_id_d').val(data.payment_id);
            $('#payment_reference_id_d').val(data.payment_reference_id);
            $('#payment_date_d').val(data.payment_date);
            $('#amount_paid_d').val(data.amount_paid);
            $('#tagged_d').val('Untagged');

            toggleInputData('disabled', true);
            setTagElement('tagged_d', 2);

            function toggleInputData (setAttr, bool) {
                $('#payment_id_d').attr(setAttr, bool);
                $('#payment_reference_id_d').attr(setAttr, bool);
                $('#payment_date_d').attr(setAttr, bool);
                $('#amount_paid_d').attr(setAttr, bool);
            }

            delete_fn.onsubmit = (e) => {
                e.preventDefault();
                processDelete();
            };

            async function processDelete() {
                const delete_data = JSON.stringify({
                    'payment_id' : payment_id
                });
                const response = await deleteData('payment/delete.php', delete_data);

                const log = await logActivity('Deleted Payment Record #' + payment_id + ' [' + data.payment_reference_id + ']', 'Untagged Payments');
                
                if (response.message == 'Payment Record Deleted' && log) {
                    sessionStorage.setItem('save_message', "Payment Record Deleted Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Payment Record was not deleted.");
                }
            }
            
        });
    }
    
} // End of Payment Records

// -------------------------------------------------------------------- Prorate Records JS
async function setProrateRecordsPage() {
    displaySuccessMessage();
    setButtons();
    setProrateRecordsTable();
    setUpdateModal();
    setDeleteModal();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        processUpdate();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        processDelete();
    };

    async function setProrateRecordsTable() {
        let content = await fetchData('prorate/read_status.php?prorate_status_id=1');

        var t = $('#prorate-table').DataTable();
    
        for (var i = 0; i < data.length; i++) {
            var tag;
            if (content[i].status == 'CHARGED') {
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
            let data = await fetchData('views/prorate_single.php?prorate_id=' + prorate_id);

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
    async function processUpdate() {
        const prorate_id = $('#prorate_id').val();
        const account_id = $('#account_id').val();
        const duration = $('#duration').val();

        let url = DIR_API + 'prorate/update.php';
        const processUpdateResponse = await fetch(url, {
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

        const update_content = await processUpdateResponse.json();
    
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
            let data = await fetchData('views/prorate_single.php?prorate_id=' + prorate_id);

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
    async function processDelete() {
        const prorate_id = $('#prorate_id_d').val();
    
        let url = DIR_API + 'prorate/delete.php';
        const processDeleteResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'prorate_id' : prorate_id
            })
        });
    
        const content = await processDeleteResponse.json();
        
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
