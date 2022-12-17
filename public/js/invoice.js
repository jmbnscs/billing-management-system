$(document).ready( function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/invoice_payments_add.php') {
        restrictPages('invoice-payment-add');
        setAddPaymentPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_payments.php') {
        restrictPages('invoice-payment');
        setPaymentRecordsPage();
        restrictFunctions('payments');
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_prorate.php') {
        restrictPages('invoice-prorate');
        setProrateRecordsPage();
        restrictFunctions('prorate');
    }
    else {
        setInvoicePage();
        restrictPages('invoice-page');
        restrictFunctions('invoice');
    }
});

// -------------------------------------------------------------------- View Invoices JS
async function setInvoicePage () {
    displaySuccessMessage();

    const [content, invoice_status, customers] = await Promise.all ([fetchData('views/invoice_unpaid.php'), fetchData('statuses/read.php?status_table=invoice_status'), fetchData('views/customer.php')]);
    
    var t = $('#invoice-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    }), tag;

    for (var i = 1; i < invoice_status.length; i++) {
        var opt = `<option value='${invoice_status[i].status_name}'>${invoice_status[i].status_name}</option>`;
        $("#invoice-status-filter").append(opt);
    }

    for (var i = 0; i < customers.length; i++) {
        var opt = `<option value='${customers[i].customer_name}'>${customers[i].customer_name}</option>`;
        $("#invoice-customer-filter").append(opt);
    }

    for (var i = 0; i < content.length; i++) {
        (content[i].status == 'PAID') ? tag = 'bg-success' : tag = 'bg-danger';
        
        t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${content[i].invoice_id}</strong></th>
                <td data-label="Customer Name">${content[i].customer_name}</td>
                <td data-label="Disconnection Date">${content[i].disconnection_date}</td>
                <td data-label="Balance">&#8369; ${content[i].running_balance}</td>
                <td data-label="Status"><span class="badge ${tag}">${content[i].status}</span></td>
                <td data-label="View"><a href="../views/invoice_data.php?acct=${content[i].invoice_id}" target="_blank"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
        `)).draw(false);
    }

    $("#invoice-table_filter.dataTables_filter").append($("#invoice-status-filter"));
    $("#invoice-table_filter.dataTables_filter").append($("#invoice-customer-filter"));

    var statusIndex = 0, customerIndex = 0;
    $("#invoice-table th").each(function (i) {
        if ($($(this)).html() == "Status") {
            statusIndex = i; return false;
        }
    });

    $("#invoice-table th").each(function (i) {
        if ($($(this)).html() == "Customer") {
            customerIndex = i; return false;
        }
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var selectedItem = $('#invoice-status-filter').val()
            var category = data[statusIndex];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var selectedItem = $('#invoice-customer-filter').val()
            var category = data[customerIndex];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $("#invoice-status-filter").change(function (e) {
        t.draw();
    });

    $("#invoice-customer-filter").change(function (e) {
        t.draw();
    });

    t.draw();
    // t.columns.adjust().draw();

}  // End of Invoice Records

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
        var t = $('#payments-table').DataTable({
            pageLength: 5,
            lengthMenu: [5, 10, 20],
            "searching": true,
            "autoWidth": false
        });

        if (user_id == 5) {
            for (var i = 0; i < content.length; i++) {
                t.row.add($(`
                    <tr>
                        <th scope="row" style="color: #012970;"><strong>${content[i].payment_reference_id}</strong></th>
                        <td data-label="Amount Paid">&#8369; ${content[i].amount_paid}</td>
                        <td data-label="Payment Date">${content[i].payment_date}</td>
                        <td data-label="Status"><span class="badge bg-danger">Untagged</span></td>
                        <td data-label="View">
                            <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].payment_id}" ><i class="bi bi-eye"></i></button>
                        </td>
                    </tr>
                `)).draw(false);
            }
        }
        else {
            for (var i = 0; i < content.length; i++) {
                t.row.add($(`
                    <tr>
                        <th scope="row" style="color: #012970;"><strong>${content[i].payment_reference_id}</strong></th>
                        <td data-label="Amount Paid">&#8369; ${content[i].amount_paid}</td>
                        <td data-label="Payment Date">${content[i].payment_date}</td>
                        <td data-label="Status"><span class="badge bg-danger">Untagged</span></td>
                        <td data-label="Actions">
                            <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].payment_id}" ><i class="bi bi-eye"></i></button>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${content[i].payment_id}" id="dlt-act-btn"><i class="ri ri-delete-bin-5-fill"></i></button>
                        </td>
                    </tr>
                `)).draw(false);
            }
        }

        // if(user_id == 2) {
        //     $('#dlt-btn').addClass('hide');
        // }
    }
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var payment_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('payment/read_single.php?payment_id=' + payment_id);
            const customer = await fetchData('customer/read.php');

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = data.payment_reference_id;
            
            $('#amount_paid').val(data.amount_paid);
            $('#payment_reference_id').val(data.payment_reference_id);
            $('#payment_date').val(data.payment_date);
            $('#account_id').val(data.account_id);
            $('#tagged').val('Untagged');

            for (var i = 0; i < customer.length; i++) {
                var opt = `<option value='${customer[i].account_id}'>${customer[i].first_name} ${customer[i].last_name}</option>`;
                $("#accounts-list").append(opt);
            }

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

            update_fn.onsubmit = async (e) => {
                e.preventDefault();
                if (await isAccountIDExist($('#account_id').val())) {
                    processUpdate();
                }
                else {
                    toastr.error('Account ID does not exist.');
                }
            };

            async function processUpdate() {
                const account_id = $('#account_id').val();
                const payment_reference_id = $('#payment_reference_id').val();
                const amount_paid = $('#amount_paid').val();
                const payment_date = $('#payment_date').val();

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
            
            $('#payment_reference_id_d').val(data.payment_reference_id);
            $('#payment_date_d').val(data.payment_date);
            $('#amount_paid_d').val(data.amount_paid);
            $('#tagged_d').val('Untagged');

            setTagElement('tagged_d', 2);

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
                
                if (response.success && log) {
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

    async function setProrateRecordsTable() {
        const [content, customers] = await Promise.all ([fetchData('views/prorate.php'), fetchData('views/customer.php')]);

        var t = $('#prorate-table').DataTable({
            pageLength: 5,
            lengthMenu: [5, 10, 20],
            "searching": true,
            "autoWidth": false
        });

        for (var i = 0; i < customers.length; i++) {
            var opt = `<option value='${customers[i].customer_name}'>${customers[i].customer_name}</option>`;
            $("#prorate-customer-filter").append(opt);
        }

        if (user_id == 5) {
            for (var i = 0; i < content.length; i++) {
                t.row.add($(`
                    <tr>
                        <th scope="row" style="color: #012970;"><strong>${content[i].account_id}</strong></th>
                        <td data-label="Customer Name">${content[i].customer_name}</td>
                        <td data-label="Duration">${content[i].duration}</td>
                        <td data-label="Amount">&#8369; ${content[i].amount}</td>
                        <td data-label="Status"><span class="badge bg-danger">Uncharged</span></td>
                        <td data-label="View">
                            <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].prorate_id}" ><i class="bi bi-eye"></i></button>
                        </td>
                    </tr>
                `)).draw(false);
            }
        }
        else {
            for (var i = 0; i < content.length; i++) {
                t.row.add($(`
                    <tr>
                        <th scope="row" style="color: #012970;"><strong>${content[i].account_id}</strong></th>
                        <td data-label="Customer Name">${content[i].customer_name}</td>
                        <td data-label="Duration">${content[i].duration}</td>
                        <td data-label="Amount">&#8369; ${content[i].amount}</td>
                        <td data-label="Status"><span class="badge bg-danger">Uncharged</span></td>
                        <td data-label="Actions">
                            <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${content[i].prorate_id}" ><i class="bi bi-eye"></i></button>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${content[i].prorate_id}" id="dlt-act-btn"><i class="ri ri-delete-bin-5-fill"></i></button>
                        </td>
                    </tr>
                `)).draw(false);
            }
        }

        $("#prorate-table_filter.dataTables_filter").append($("#prorate-customer-filter"));

        var customerIndex = 0;

        $("#prorate-table th").each(function (i) {
            if ($($(this)).html() == "Customer") {
                customerIndex = i; return false;
            }
        });

        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
              var selectedItem = $('#prorate-customer-filter').val()
              var category = data[customerIndex];
              if (selectedItem === "" || category.includes(selectedItem)) {
                return true;
              }
              return false;
            }
        );

        $("#prorate-customer-filter").change(function (e) {
            t.draw();
        });

        t.draw();
        // t.columns.adjust().draw();
    }
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var prorate_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('views/prorate_single.php?prorate_id=' + prorate_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = data.customer_name;

            const duration = data.duration;
            
            $('#account_id').val(data.account_id);
            $('#duration_hours').val(duration.split(":")[0]);
            $('#duration_minutes').val(duration.split(":")[1]);
            $('#duration_seconds').val(duration.split(":")[2]);
            $('#prorate_charge').val(data.amount);
            $('#status').val('Uncharged');

            setTagElement('status', 2);
            toggleInputData('disabled', true);

            function toggleInputData (setAttr, bool) {
                $('#duration_hours').attr(setAttr, bool);
                $('#duration_minutes').attr(setAttr, bool);
                $('#duration_seconds').attr(setAttr, bool);
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
                const duration = $('#duration_hours').val() + ':' + $('#duration_minutes').val() + ':' + $('#duration_seconds').val();

                let update_data = JSON.stringify({
                    'account_id' : account_id,
                    'prorate_id' : prorate_id,
                    'duration' : duration
                });

                const update_content = await updateData('prorate/update.php', update_data);
                const log = await logActivity('Updated Prorate Record # ' + prorate_id, 'Uncharged Prorates')
            
                if (update_content.success && log) {
                    sessionStorage.setItem('save_message', "Prorate Record Updated Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Prorate Record was not updated.");
                }
            }
        });
    }
    
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var prorate_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('views/prorate_single.php?prorate_id=' + prorate_id);
            
            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = 'Delete Record?';

            $('#account_id_d').val(data.account_id);
            $('#customer_name_d').val(data.customer_name);
            $('#duration_d').val(data.duration);
            $('#prorate_charge_d').val(data.amount);
            $('#status_d').val('Uncharged');

            setTagElement('status_d', 2);

            delete_fn.onsubmit = (e) => {
                e.preventDefault();
                processDelete();
            };

            async function processDelete() {
                const delete_data = JSON.stringify({
                    'prorate_id' : prorate_id
                });

                const delete_content = await deleteData('prorate/delete.php', delete_data);
                const log = await logActivity('Deleted Prorate Record # ' + prorate_id, 'Uncharged Prorates');
            
                if (delete_content.success && log) {
                    sessionStorage.setItem('save_message', "Prorate Record Deleted Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Prorate Record was not deleted.");
                }
            }
        });
    }
} // End of Prorate Records 

// -------------------------------------------------------------------- Add Payment Record JS
async function setAddPaymentPage () {
    setButtons();

    var today = new Date();
    $('#payment_date').val(getDateToday());
    today.setDate(today.getDate() - 30);
    setDateRange('#payment_date', today);

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        checkValidity();
    };

    var req_elem = document.getElementById('create-new').querySelectorAll("[required]");

    async function checkValidity () {
        resetElements();
        var counter = 0;

        for (var i = 0; i < req_elem.length; i++) {
            if (req_elem[i].value == '') {
                req_elem[i].classList.add('invalid-input');
                req_elem[i].nextElementSibling.classList.add('d-block');
                counter++;
            }
            else {
                if (req_elem[i].id == 'payment_ref') {
                    const pay_ref = await fetchData('check/payment_ref.php?payment_reference_id=' + req_elem[i].value);
                    if (pay_ref.exist) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Payment Reference ID already exist."));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'amount_paid') {
                    if (req_elem[i].value < 1) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Amount paid should at least be \u20B1 1.00"));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'payment_date') {
                    if (!isWithinRange(today, req_elem[i].value)) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text('Payment date is not within range.'));
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
        }
        else {
            addPayment();
        }
    }

    function resetElements() {
        for (var i = 0; i < req_elem.length; i++) {
            $('#' + req_elem[i].id).removeClass('valid-input');
            $('#' + req_elem[i].id).removeClass('invalid-input');
            $(($('#' + req_elem[i].id).next()).removeClass('d-block'));
        }
    }

    async function addPayment () {
        const payment_ref = $('#payment_ref').val();
        let ref_content = await fetchData('views/payment.php');
        let isExist = false;

        for (var i = 0; i < ref_content.length; i++) {
            if (payment_ref == ref_content[i].ref_id) {
                isExist = true;
            }
        }

        if (!isExist) {
            const payment_data = JSON.stringify({
                'amount_paid' : $('#amount_paid').val(),
                'payment_reference_id' : payment_ref,
                'payment_date' : $('#payment_date').val()
            });

            const payment_content = await createData('payment/create.php', payment_data);
            const log = await logActivity('Added new payment record with Reference ID # ' + payment_ref, 'Add Payment Record');
        
            if (payment_content.success && log) {
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
} // End of Add Payment Record 