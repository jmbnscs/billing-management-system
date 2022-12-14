$(document).ready(function () {
    isDefault();
    setDefaultSetting();
    restrictFunctions('invoice');
});

let customer_name;
let invoice_id = (window.location.href).split("=")[1];

async function setDefaultSetting() {
    const invoice = await fetchData('check/invoice_id.php?invoice_id=' + invoice_id);

    if (invoice.exist) {
        const invoice_data = await fetchData('invoice/read_single.php?invoice_id=' + invoice_id);
        const account_data = await fetchData('customer/read_single.php?account_id=' + invoice_data.account_id);
        const payment_data = await fetchData('payment/read_by_invoice.php?invoice_id=' + invoice_id);
    
        customer_name = account_data.first_name + ' ' + account_data.last_name;
        $('#customer-name').text(customer_name);
        $('#invoice-id').text('Invoice #: ' + invoice_id);
    
        $('#account_id').text(invoice_data.account_id);
        $('#billing_period_start').text(formatDateString(invoice_data.billing_period_start));
        $('#billing_period_end').text(formatDateString(invoice_data.billing_period_end));
        $('#disconnection_date').text(formatDateString(invoice_data.disconnection_date));
    
        $('#previous_bill').text('\u20B1 ' + invoice_data.previous_bill);
        $('#previous_payment').text('\u20B1 ' + invoice_data.previous_payment);
        $('#balance').text('\u20B1 ' + invoice_data.balance);
        $('#secured_cash').text('\u20B1 ' + invoice_data.secured_cash);
    
        $('#subscription_amount').text('\u20B1 ' + invoice_data.subscription_amount);
        $('#prorated_charge').text('\u20B1 ' + invoice_data.prorated_charge);
        $('#installation_charge').text('\u20B1 ' + invoice_data.installation_charge);
    
        $('#total_bill').text('\u20B1 ' + invoice_data.total_bill);
    
        if (payment_data.length > 0) {
            for (var i = 0; i < payment_data.length; i++) {
                $('#payment-table').find('tbody').append(`
                    <tr>
                        <th scope="row">${formatDateString(payment_data[i].payment_date)}</th>
                        <td>${payment_data[i].payment_reference_id}</td>
                        <td>${payment_data[i].amount_paid}</td>
                    </tr>
                `);
            }
    
            $('#payment-table').find('tbody').append(`
                <tr class="table-light">
                    <th scope="row" colspan="2" class="text-end pe-4">Running Balance: </th>
                    <td>\u20B1 ${invoice_data.running_balance}</td>
                </tr>
            `);
        }
        else {
            $('#payment-table').find('tbody').append(`
                <tr>
                    <td colspan="3" class="text-center">No Payment Records</td>
                </tr>
            `);
            $('#payment-table').find('tbody').append(`
                <tr class="table-light">
                    <th scope="row" colspan="2" class="text-end pe-4">Running Balance: </th>
                    <td>\u20B1 ${invoice_data.running_balance}</td>
                </tr>
            `);
        }
    
        setButtons();

        setDateRange('#payment_date_md', invoice_data.billing_period_start);
        $('#payment_date_md').val(getDateToday());

        update_fn.onsubmit = (e) => {
            e.preventDefault();
            processUpdate();
        };
    
        async function processUpdate() {
            let ref_content = await fetchData('views/payment.php');
            let isExist = false;
    
            for (var i = 0; i < ref_content.length; i++) {
                if ($('#payment_reference_id_md').val() == ref_content[i].ref_id) {
                    isExist = true;
                }
            }
    
            if (!isExist) {
    
                let update_data = JSON.stringify({
                    'account_id' : invoice_data.account_id,
                    'payment_reference_id' : $('#payment_reference_id_md').val(),
                    'amount_paid' : $('#amount_paid_md').val(),
                    'payment_date' : $('#payment_date_md').val()
                });
    
                let payment_data = JSON.stringify({
                    'amount_paid' : $('#amount_paid_md').val(),
                    'payment_reference_id' : $('#payment_reference_id_md').val(),
                    'payment_date' : $('#payment_date_md').val()
                })
    
                let rating_data = JSON.stringify({
                    'account_id' : invoice_data.account_id,
                    'invoice_status' : invoice_data.invoice_status_id
                });
    
                const [update_content, payment_content, rating_content] = await Promise.all ([updateData('invoice/update.php', update_data), createData('payment/create.php', payment_data), updateData('ratings/update.php', rating_data)]);
    
                let tag_data = JSON.stringify({
                    'account_id' : invoice_data.account_id,
                    'invoice_id' : invoice_id,
                    'payment_id' : payment_content.payment_id
                });
    
                const tag_content = await updateData('payment/update_tagged.php', tag_data);
    
                let log = await logActivity('Updated payment for ' + invoice_data.account_id + ' with Invoice # ' + invoice_id, 'Unpaid Invoices');
    
                if (update_content.message == 'Invoice Updated' && payment_content.success && tag_content.message == 'Payment Tagged' && rating_content.message == 'Rating Updated' && log) {
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
    else {
        $('#invoice-data').addClass('hide');
        $('#invoice-card').append(`
            <h5 class="text-center p-5">No Records Found</h5>
        `);
    }
    
}