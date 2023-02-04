$(document).ready( function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/invoice_payments_add') {
        restrictPages('invoice-payment-add');
        untaggedAddPayment();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_payments') {
        restrictPages('invoice-payment');
        setPaymentRecordsPage();
        restrictFunctions('payments');
    }
    else if (DIR_CUR == DIR_MAIN + 'views/invoice_prorate') {
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

    const [content, customers] = await Promise.all ([fetchData('views/invoice_unpaid_account.php'), fetchData('views/customer.php')]);

    let tag;
    
    var unpaid_table = $('#unpaid-invoice-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var overdue_table = $('#overdue-invoice-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var disconnection_table = $('#disconnection-invoice-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < customers.length; i++) {
        var opt = `<option value='${customers[i].customer_name}'>${customers[i].customer_name}</option>`;
        $("#unpaid-customer-filter").append(opt);
        $("#overdue-customer-filter").append(opt);
        $("#disconnection-customer-filter").append(opt);
    }

    let unpaid_counter = 1, overdue_counter = 1, disconnection_counter = 1;
    for (var i = 0; i < content.length; i++) {
        (content[i].status == 'PAID') ? tag = 'bg-success' : tag = 'bg-danger';

        if (content[i].status == 'UNPAID') {
            unpaid_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${unpaid_counter}</strong></th>
                <td data-label="Invoice ID">${content[i].invoice_id}</td>
                <td data-label="Customer Name">${content[i].customer_name}</td>
                <td data-label="Disconnection Date">${new Date(content[i].disconnection_date).toLocaleDateString('PHT')}</td>
                <td data-label="Balance">&#8369; ${content[i].running_balance}</td>
                <td data-label="Status"><span class="badge ${tag}">${content[i].status}</span></td>
                <td data-label="View"><a href="../views/invoice_data?acct=${content[i].invoice_id}" target="_blank"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
            `)).draw(false);

            unpaid_counter++;
        }
        else if (content[i].status == 'OVERDUE') {
            overdue_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${overdue_counter}</strong></th>
                <td data-label="Invoice ID">${content[i].invoice_id}</td>
                <td data-label="Customer Name">${content[i].customer_name}</td>
                <td data-label="Disconnection Date">${new Date(content[i].disconnection_date).toLocaleDateString('PHT')}</td>
                <td data-label="Balance">&#8369; ${content[i].running_balance}</td>
                <td data-label="Status"><span class="badge ${tag}">${content[i].status}</span></td>
                <td data-label="View"><a href="../views/invoice_data?acct=${content[i].invoice_id}" target="_blank"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
            `)).draw(false);

            overdue_counter++;
        }
        else {
            disconnection_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${disconnection_counter}</strong></th>
                <td data-label="Invoice ID">${content[i].invoice_id}</td>
                <td data-label="Customer Name">${content[i].customer_name}</td>
                <td data-label="Disconnection Date">${new Date(content[i].disconnection_date).toLocaleDateString('PHT')}</td>
                <td data-label="Balance">&#8369; ${content[i].running_balance}</td>
                <td data-label="Status"><span class="badge ${tag}">${content[i].status}</span></td>
                <td data-label="View"><a href="../views/invoice_data?acct=${content[i].invoice_id}" target="_blank"><button type="button" class="btn btn-outline-primary"><i class="ri ri-eye-fill"></i></button></a></td>
            </tr>
            `)).draw(false);

            disconnection_counter++;
        }
    }

    $("#unpaid-invoice-table_filter.dataTables_filter").append($("#unpaid-customer-filter"));
    $("#overdue-invoice-table_filter.dataTables_filter").append($("#overdue-customer-filter"));
    $("#disconnection-invoice-table_filter.dataTables_filter").append($("#disconnection-customer-filter"));

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'unpaid-invoice-table'){
                return true;
            }

            var selectedItem = $('#unpaid-customer-filter').val()
            var category = data[2];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'overdue-invoice-table'){
                return true;
            }

            var selectedItem = $('#overdue-customer-filter').val()
            var category = data[2];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'disconnection-invoice-table'){
                return true;
            }

            var selectedItem = $('#disconnection-customer-filter').val()
            var category = data[2];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $("#unpaid-customer-filter").change(function (e) {
        unpaid_table.draw();
    });

    $("#overdue-customer-filter").change(function (e) {
        overdue_table.draw();
    });

    $("#disconnection-customer-filter").change(function (e) {
        disconnection_table.draw();
    });

    unpaid_table.draw();
    overdue_table.draw();
    disconnection_table.draw();

}  // End of Invoice Records

// -------------------------------------------------------------------- Payment Records JS
async function setPaymentRecordsPage() {
    displaySuccessMessage();
    setButtons();

    // -------------------------------- Untagged Payments
    let untagged_content = await fetchData('payment/read_untagged.php');
        
    var untagged_table = $('#untagged-payments-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < untagged_content.length; i++) {
        untagged_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${i+1}</strong></th>
                <td data-label="Payment Center">${untagged_content[i].payment_center}</td>
                <td data-label="Reference ID">${untagged_content[i].payment_reference_id}</td>
                <td data-label="Amount Paid">&#8369; ${untagged_content[i].amount_paid}</td>
                <td data-label="Payment Date">${new Date(untagged_content[i].payment_date).toLocaleDateString('PHT')}</td>
                <td data-label="Status"><span class="badge bg-danger">Untagged</span></td>
                <td data-label="Actions">
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#edit-untagged-modal" data-bs-whatever="${untagged_content[i].payment_id}" ><i class="bi bi-eye"></i></button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete-untagged-modal" data-bs-whatever="${untagged_content[i].payment_id}" id="dlt-btn"><i class="ri ri-delete-bin-5-fill"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }

    // Update Untagged Modal
    var untaggedUpdateModal = document.getElementById('edit-untagged-modal')
    untaggedUpdateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var payment_id = button.getAttribute('data-bs-whatever');
        let data = await fetchData('payment/read_single.php?payment_id=' + payment_id);
        const customer = await fetchData('customer/read.php');
        const payment_centers = await fetchData('payment/read_payment_centers.php');

        $("#edit_untagged_payment_centers").empty();
        $("#edit_untagged_payment_centers").append(`<option selected disabled value="">Choose Payment Center</option>`);
        for (var i = 0; i < payment_centers.length; i++) {
            if (payment_centers[i].center_id == data.payment_center) {
                var opt = `<option selected value='${payment_centers[i].center_id}' style='color: blue'>${payment_centers[i].payment_center}</option>`;
            }
            else {
                var opt = `<option value='${payment_centers[i].center_id}'>${payment_centers[i].payment_center}</option>`;
            }
            $("#edit_untagged_payment_centers").append(opt);
        }

        $('#edit_untagged_amount_paid').val(data.amount_paid);
        $('#edit_untagged_reference_id').val(data.payment_reference_id);
        $('#edit_untagged_payment_date').val(data.payment_date);
        $('#edit_untagged_account_id').val(data.account_id);
        $('#edit_untagged_tagged').val('Untagged');

        for (var i = 0; i < customer.length; i++) {
            var opt = `<option value='${customer[i].account_id}'>${customer[i].first_name} ${customer[i].last_name}</option>`;
            $("#untagged-accounts-list").append(opt);
        }

        setTagElement('edit_untagged_tagged', 2);

        const update_fn = document.getElementById('untagged-update-data');
        update_fn.onsubmit = async (e) => {
            e.preventDefault();
            if (await isAccountIDExist($('#edit_untagged_account_id').val())) {
                untaggedProcessUpdate();
            }
            else {
                toastr.error('Account ID does not exist.');
            }
        };

        async function untaggedProcessUpdate() {
            const account_id = $('#edit_untagged_account_id').val();
            const payment_reference_id = $('#edit_untagged_reference_id').val();
            const amount_paid = $('#edit_untagged_amount_paid').val();
            const payment_date = $('#edit_untagged_payment_date').val();
            const payment_center = $('#edit_untagged_payment_centers').val();

            let update_data = JSON.stringify({
                'account_id' : account_id,
                'payment_reference_id' : payment_reference_id,
                'amount_paid' : amount_paid,
                'payment_date' : payment_date,
                'payment_center' : payment_center,
                'payment_id' : payment_id
            });

            const updatePayment = await updateData('payment/update_payment.php', update_data);

            if (updatePayment.success) {
                const log = await logActivity('Save Changes - Tagged Payment [' + payment_reference_id + ' - ' + account_id + ' - ' + updatePayment.invoice_id + ']', 'Payment Records');

                if (log) {
                    sessionStorage.setItem('save_message', "Payment Updated Successfully.");
                    window.location.reload();
                }
            }
            else {
                toastr.error("Payment was not updated.");
            }
        }
        
    });
    // End Update Untagged Modal

    // Delete Untagged Modal
    var untaggedDeleteModal = document.getElementById('delete-untagged-modal')
    untaggedDeleteModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var payment_id = button.getAttribute('data-bs-whatever');
        let data = await fetchData('payment/read_single.php?payment_id=' + payment_id);
        
        $('#dlt_untagged_amount_paid').val(data.amount_paid);
        $('#dlt_untagged_reference_id').val(data.payment_reference_id);
        $('#dlt_untagged_payment_date').val(data.payment_date);
        $('#dlt_untagged_tagged').val('Untagged');

        setTagElement('dlt_untagged_tagged', 2);

        const delete_fn = document.getElementById('untagged-delete-data');
        delete_fn.onsubmit = (e) => {
            e.preventDefault();
            processDelete();
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'payment_id' : payment_id
            });
            const response = await deleteData('payment/delete.php', delete_data);

            const log = await logActivity('Delete - Untagged Payment [Payment #' + payment_id + ' - ' + data.payment_reference_id + ']', 'Payment Records');
            
            if (response.success && log) {
                sessionStorage.setItem('save_message', "Payment Record Deleted Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Payment Record was not deleted.");
            }
        }
        
    });

    untaggedAddPayment();

    // -------------------------------- End Untagged Payments

    // -------------------------------- Advanced Payments
    let advanced_content = await fetchData('payment/read_advanced_payments.php');

    var advanced_table = $('#advanced-payments-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < advanced_content.length; i++) {
        advanced_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${i+1}</strong></th>
                <td data-label="Reference ID">${advanced_content[i].payment_center}</td>
                <td data-label="Reference ID">${advanced_content[i].payment_reference_id}</td>
                <td data-label="Amount Paid">&#8369; ${advanced_content[i].amount_paid}</td>
                <td data-label="Payment Date">${new Date(advanced_content[i].payment_date).toLocaleDateString('PHT')}</td>
                <td data-label="Status"><span class="badge bg-success">Tagged</span></td>
                <td data-label="Actions">
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#view-advanced-modal" data-bs-whatever="${advanced_content[i].payment_id}" ><i class="bi bi-eye"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }

    var advancedViewModal = document.getElementById('view-advanced-modal')
    advancedViewModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let data, id, content;
        data = await fetchData('payment/read_single.php?payment_id=' + data_id);
        const account_data = await fetchData('customer/read_single.php?account_id=' + data.account_id);

        var modalTitle = advancedViewModal.querySelector('.modal-title');
        modalTitle.textContent = account_data.first_name + ' ' + account_data.last_name;

        setTagElement('view_advanced_tagged', 1);

        id = [
            '#view_advanced_payment_centers', 
            '#view_advanced_reference_id', 
            '#view_advanced_amount_paid', 
            '#view_advanced_payment_date', 
            '#view_advanced_invoice_id', 
            '#view_advanced_tagged'
        ];
        content = [
            data.payment_center_name, 
            data.payment_reference_id, 
            '\u20B1 ' + data.amount_paid, 
            formatDateString(data.payment_date), 
            data.invoice_id, 
            'Tagged'
        ];

        for (var i = 0; i < content.length; i++) {
            $(id[i]).val(content[i]);
        }
        
    });

    advancedAddPayment ()
    
    // -------------------------------- End Advanced Payments

    // -------------------------------- Pending Approval Payments
    let pending_approval_content = await fetchData('payment/read_pending_approval.php');
    var approval_table = $('#approval-payments-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });
    
    for (var i = 0; i < pending_approval_content.length; i++) {
        approval_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${i+1}</strong></th>
                <td data-label="Account ID">${pending_approval_content[i].account_id}</td>
                <td data-label="Date Uploaded">${new Date(pending_approval_content[i].date_uploaded).toLocaleDateString('PHT')}</td>
                <td data-label="Status"><span class="badge bg-warning">${pending_approval_content[i].status}</span></td>
                <td data-label="Actions">
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#view-pending-modal" data-bs-whatever="${pending_approval_content[i].approval_id}" ><i class="bi bi-eye"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }

    var pendingViewModal = document.getElementById('view-pending-modal')
    pendingViewModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let data, id, content;
        data = await fetchData('payment/read_single_pending.php?approval_id=' + data_id);

        const account_data = await fetchData('customer/read_single.php?account_id=' + data.account_id);
        var modalTitle = pendingViewModal.querySelector('.modal-title');
        modalTitle.textContent = account_data.first_name + ' ' + account_data.last_name;

        document.querySelector("#uploaded_image").src = '../../app/includes/view_image.php?approval_id=' + data_id;
        document.querySelector("#uploaded_image_new_tab").href = '../../app/includes/view_image.php?approval_id=' + data_id;

        pendingAddPayment(data.account_id, data_id);
        
        // Delete Pending Modal
        var pendingDeleteModal = document.getElementById('delete-pending-modal');
        pendingDeleteModal.addEventListener('show.bs.modal', async function (event) {

            $('#dlt_pending_account_id').val(data.account_id);

            document.querySelector("#dlt_uploaded_image").src = '../../app/includes/view_image.php?approval_id=' + data_id;
            document.querySelector("#dlt_uploaded_image_new_tab").href = '../../app/includes/view_image.php?approval_id=' + data_id;

            const delete_fn = document.getElementById('pending-delete-data');
            delete_fn.onsubmit = (e) => {
                e.preventDefault();
                processDelete();
            };

            async function processDelete() {
                const delete_data = JSON.stringify({
                    'approval_id' : data_id
                });
                const response = await deleteData('payment/invalid_pending_payment.php', delete_data);

                const log = await logActivity('Invalid - Pending Payment [' + data_id + ' - ' + data.account_id + ']', 'Payment Records');
                
                if (response.success && log) {
                    sessionStorage.setItem('save_message', "Payment Record Invalidated Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Transaction not processed.");
                }
            }
            
        });
        
    });
    // -------------------------------- End Pending Approval Payments

    // -------------------------------- Invalid Approval Payments
    let invalid_approval_content = await fetchData('payment/read_invalid_approval.php');

    var invalid_table = $('#invalid-payments-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < invalid_approval_content.length; i++) {
        invalid_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${i+1}</strong></th>
                <td data-label="Account ID">${invalid_approval_content[i].account_id}</td>
                <td data-label="Date Uploaded">${new Date(invalid_approval_content[i].date_uploaded).toLocaleDateString('PHT')}</td>
                <td data-label="Status"><span class="badge bg-danger">${invalid_approval_content[i].status}</span></td>
                <td data-label="Actions">
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#view-invalid-modal" data-bs-whatever="${invalid_approval_content[i].approval_id}" ><i class="bi bi-eye"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }

    var invalidViewModal = document.getElementById('view-invalid-modal');
    invalidViewModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let data, id, content;
        data = await fetchData('payment/read_single_invalid.php?approval_id=' + data_id);

        const account_data = await fetchData('customer/read_single.php?account_id=' + data.account_id);
        var modalTitle = invalidViewModal.querySelector('.modal-title');
        modalTitle.textContent = account_data.first_name + ' ' + account_data.last_name;

        document.querySelector("#inv_uploaded_image").src = '../../app/includes/view_image.php?approval_id=' + data_id;
        document.querySelector("#inv_uploaded_image_new_tab").href = '../../app/includes/view_image.php?approval_id=' + data_id;

        const react_fn = document.getElementById('react-invalid-data');
        react_fn.onsubmit = (e) => {
            e.preventDefault();
            processReactivate();
        };

        async function processReactivate() {
            const react_data = JSON.stringify({
                'approval_id' : data_id
            });
            const response = await deleteData('payment/react_invalid_payment.php', react_data);

            const log = await logActivity('Re-activate - Invalid Payment [' + data_id + ' - ' + data.account_id + ']', 'Payment Records');
            
            if (response.success && log) {
                sessionStorage.setItem('save_message', "Payment Record Reactivated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Transaction not processed.");
            }
        }
    });

    // -------------------------------- End Invalid Approval Payments
   
    
    
} // End of Payment Records


// -------------------------------------------------------------------- Add Payment Record JS
async function untaggedAddPayment () {
    var today = new Date();
    $('#add_untagged_payment_date').val(getDateToday());
    today.setDate(today.getDate() - 30);
    setDateRange('#add_untagged_payment_date', today);

    const payment_centers = await fetchData('payment/read_payment_centers.php');
        for (var i = 0; i < payment_centers.length; i++) {
            var opt = `<option value='${payment_centers[i].center_id}'>${payment_centers[i].payment_center}</option>`;
            $("#add_untagged_payment_centers").append(opt);
        }

    const create_fn = document.getElementById('untagged-create-new');
    create_fn.onsubmit = (e) => {
        e.preventDefault();
        checkValidity();
    };

    var req_elem = document.getElementById('untagged-create-new').querySelectorAll("[required]");

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
                if (req_elem[i].id == 'add_untagged_reference_id') {
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
                else if (req_elem[i].id == 'add_untagged_amount_paid') {
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
                else if (req_elem[i].id == 'add_untagged_payment_date') {
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
        const payment_ref = $('#add_untagged_reference_id').val();

        const payment_data = JSON.stringify({
            'payment_center' : $('#add_untagged_payment_centers').val(),
            'amount_paid' : $('#add_untagged_amount_paid').val(),
            'payment_reference_id' : payment_ref,
            'payment_date' : $('#add_untagged_payment_date').val()
        });

        const payment_content = await createData('payment/create.php', payment_data);
        const log = await logActivity('Submit - New Untagged Payment [' + payment_ref + ']', 'Payment Records');
    
        if (payment_content.success && log) {
            toastr.success('Payment Record Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/invoice_payments');
                }, 2000);
        }
        else {
            toastr.error(payment_content.message);
            setTimeout(function(){
                window.location.reload();
                }, 2000);
        }
    }
} // End of Add Payment Record 

// -------------------------------------------------------------------- Add Advanced Payment
async function advancedAddPayment () {
    var today = new Date();
    $('#add_advanced_payment_date').val(getDateToday());
    today.setDate(today.getDate() - 30);
    setDateRange('#add_advanced_payment_date', today);

    const customer = await fetchData('customer/read.php');
    const payment_centers = await fetchData('payment/read_payment_centers.php');

    for (var i = 0; i < customer.length; i++) {
        var opt = `<option value='${customer[i].account_id}'>${customer[i].first_name} ${customer[i].last_name}</option>`;
        $("#advanced-accounts-list").append(opt);
    }

    for (var i = 0; i < payment_centers.length; i++) {
        var opt = `<option value='${payment_centers[i].center_id}'>${payment_centers[i].payment_center}</option>`;
        $("#add_advanced_payment_centers").append(opt);
    }

    const create_fn = document.getElementById('advanced-create-new');
    create_fn.onsubmit = (e) => {
        e.preventDefault();
        checkValidity();
    };

    var req_elem = document.getElementById('advanced-create-new').querySelectorAll("[required]");

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
                if (req_elem[i].id == 'add_advanced_reference_id') {
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
                else if (req_elem[i].id == 'add_advanced_amount_paid') {
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
                else if (req_elem[i].id == 'add_advanced_payment_date') {
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
                else if (req_elem[i].id == 'add_advanced_account_id') {
                    const acct_id = await isAccountIDExist(req_elem[i].value);
                    if (!acct_id) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Account ID does not exist."));
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
        const payment_ref = $('#add_advanced_reference_id').val();

        const payment_data = JSON.stringify({
            'payment_center' : $('#add_advanced_payment_centers').val(),
            'account_id' : $('#add_advanced_account_id').val(),
            'amount_paid' : $('#add_advanced_amount_paid').val(),
            'payment_reference_id' : payment_ref,
            'payment_date' : $('#add_advanced_payment_date').val()
        });

        const payment_content = await createData('payment/create_advanced_payment.php', payment_data);
        const log = await logActivity('Save Changes - New Advanced Payment [' + payment_ref + ']', 'Payment Records');
    
        if (payment_content.success && log) {
            toastr.success('Payment Record Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/invoice_payments');
                }, 2000);
        }
        else {
            toastr.error(payment_content.message);
            setTimeout(function(){
                window.location.reload();
                }, 2000);
        }
    }
} // End of Add Payment Record 

// -------------------------------------------------------------------- Add Approved Pending Payment
async function pendingAddPayment (account_id, approval_id) {
    var today = new Date();
    $('#add_pending_payment_date').val(getDateToday());
    today.setDate(today.getDate() - 30);
    setDateRange('#add_pending_payment_date', today);

    const payment_centers = await fetchData('payment/read_payment_centers.php');
    
    document.querySelector("#add_uploaded_image").src = '../../app/includes/view_image.php?approval_id=' + approval_id;
    document.querySelector("#add_uploaded_image_new_tab").href = '../../app/includes/view_image.php?approval_id=' + approval_id;

    $('#add_pending_account_id').val(account_id);

    for (var i = 0; i < payment_centers.length; i++) {
        var opt = `<option value='${payment_centers[i].center_id}'>${payment_centers[i].payment_center}</option>`;
        $("#add_pending_payment_centers").append(opt);
    }

    const create_fn = document.getElementById('pending-create-new');
    create_fn.onsubmit = (e) => {
        e.preventDefault();
        checkValidity();
    };

    var req_elem = document.getElementById('pending-create-new').querySelectorAll("[required]");

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
                if (req_elem[i].id == 'add_pending_reference_id') {
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
                else if (req_elem[i].id == 'add_pending_amount_paid') {
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
                else if (req_elem[i].id == 'add_pending_payment_date') {
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
                else if (req_elem[i].id == 'add_pending_account_id') {
                    const acct_id = await isAccountIDExist(req_elem[i].value);
                    if (!acct_id) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Account ID does not exist."));
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
        const payment_ref = $('#add_pending_reference_id').val();

        const payment_data = JSON.stringify({
            'payment_center' : $('#add_pending_payment_centers').val(),
            'account_id' : $('#add_pending_account_id').val(),
            'amount_paid' : $('#add_pending_amount_paid').val(),
            'payment_reference_id' : payment_ref,
            'approval_id' : approval_id,
            'payment_date' : $('#add_pending_payment_date').val()
        });

        const payment_content = await createData('payment/create_pending_payment.php', payment_data);
        const log = await logActivity('Approve - Pending Payment [' + payment_ref + ']', 'Payment Records');
    
        if (payment_content.success && log) {
            toastr.success('Payment Record Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/invoice_payments');
                }, 2000);
        }
        else {
            toastr.error(payment_content.message);
            setTimeout(function(){
                window.location.reload();
                }, 2000);
        }
    }
} // End of Add Payment Record 

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
                        <td data-label="Status"><span class="badge bg-danger">Untagged</span></td>
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
                        <td data-label="Status"><span class="badge bg-danger">Untagged</span></td>
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
            $('#status').val('Untagged');

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
                const log = await logActivity('Save Changes - Update Prorate Record [' + prorate_id + ']', 'Untagged Prorates')
            
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
            $('#status_d').val('Untagged');

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
                const log = await logActivity('Delete - Untagged Prorate [' + prorate_id + ']', 'Untagged Prorates');
            
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
