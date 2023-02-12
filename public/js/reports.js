$(document).ready( () => {
    isDefault();
    // restrictPages('report-page');

    setReportsPage();
});

async function setReportsPage() {
    var maxMonth = new Date();
    maxMonth.setMonth(maxMonth.getMonth());

    let month;

    (maxMonth.getMonth() < 10) ? month = '0' + (maxMonth.getMonth() + 1) : (maxMonth.getMonth() + 1);

    $('#date_from').attr({
        'max' : maxMonth.getFullYear() + '-' + month
    })

    $('#date_to').attr({
        'max' : maxMonth.getFullYear() + '-' + month
    })

    $('#date_from').val(maxMonth.getFullYear() + '-' + month);
    $('#date_to').val(maxMonth.getFullYear() + '-' + month);


    const areas = await fetchData('area/read.php');

    for (var i = 0; i < areas.length; i++) {
        var opt = `<option value='${areas[i].area_id}'>${areas[i].area_name}</option>`;
        $("#customer_area").append(opt);
    }

    $('#report_type').on('change', () => {
        if ($('#report_type').val() == 4) {
            if (!$('#invoice_filter').hasClass('hide')) {
                $('#invoice_filter').addClass('hide');
                $('#invoice_status').prop('required', false);
            }
            $('#customer_filter').removeClass('hide');
            $('#customer_status').prop('required', true);
            $('#customer_area').prop('required', true);

            $('#date_from').val('2021-09');
        }
        else if ($('#report_type').val() == 5) {
            if (!$('#customer_filter').hasClass('hide')) {
                $('#customer_filter').addClass('hide');
                $('#customer_status').prop('required', false);
                $('#customer_area').prop('required', false);
            }
            $('#invoice_filter').removeClass('hide');
            $('#invoice_status').prop('required', true);
        }
        else {
            if (!$('#customer_filter').hasClass('hide')) {
                $('#customer_filter').addClass('hide');
                $('#customer_status').prop('required', false);
                $('#customer_area').prop('required', false);
            }
            if (!$('#invoice_filter').hasClass('hide')) {
                $('#invoice_filter').addClass('hide');
                $('#invoice_status').prop('required', false);
            }

            $('#date_from').val(maxMonth.getFullYear() + '-' + month);

        }
    })

    const generate_fn = document.getElementById('generate-report');

    generate_fn.onsubmit = (e) => {
        e.preventDefault();
        resetTables();

        let report_type = $('#report_type').val();
        let date_from = $('#date_from').val();
        let date_to = $('#date_to').val();

        let content_data = JSON.stringify({
            'date_from' : date_from,
            'date_to' : date_to
        });

        if (report_type == 1) {
            if ( $.fn.DataTable.isDataTable('#sales-reports-table') ) {
                $('#sales-reports-table').DataTable().destroy();
              }
            $("#sales-reports-table tr").remove(); 
            generateSalesReport(content_data, date_from, date_to);
        }
        else if (report_type == 2) {
            if ( $.fn.DataTable.isDataTable('#install-reports-table') ) {
                $('#install-reports-table').DataTable().destroy();
              }
            $("#install-reports-table tr").remove(); 
            generateInstallationReport(content_data, date_from, date_to);
        }
        else if (report_type == 3) {
            if ( $.fn.DataTable.isDataTable('#prorate-reports-table') ) {
                $('#prorate-reports-table').DataTable().destroy();
              }
            $("#prorate-reports-table tr").remove(); 
            generateProrateReport(content_data, date_from, date_to);
        }
        else if (report_type == 4) {
            if ( $.fn.DataTable.isDataTable('#customer-reports-table') ) {
                $('#customer-reports-table').DataTable().destroy();
              }
            $("#customer-reports-table tr").remove(); 
            generateCustomerReport(date_from, date_to);
        }
        else if (report_type == 5) {
            if ( $.fn.DataTable.isDataTable('#invoice-reports-table') ) {
                $('#invoice-reports-table').DataTable().destroy();
              }
            $("#invoice-reports-table tr").remove(); 
            generateInvoiceReport(date_from, date_to);
        }
        else if (report_type == 6) {
            if ( $.fn.DataTable.isDataTable('#logs-reports-table') ) {
                $('#logs-reports-table').DataTable().destroy();
              }
            $("#logs-reports-table tr").remove(); 
            generateAdminLogsReport(content_data, date_from, date_to);
        }
        else if (report_type == 7) {
            if ( $.fn.DataTable.isDataTable('#income-reports-table') ) {
                $('#income-reports-table').DataTable().destroy();
              }
            $("#income-reports-table tr").remove(); 
            generateIncomeReport(content_data, date_from, date_to);
        }
    }
}

async function fetchReports(page, data) {
    let url = DIR_API + page;
    const fetchResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : data
    });
    return await fetchResponse.json();
}

function formatDate(date, type) {
    if (type == 'from') {
        return new Date(date).toLocaleDateString('PHT');
    }
    else {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString('PHT');
    }
}

function resetTables() {
    if (!$('#sales-reports-container').hasClass('hide')) {
        $('#sales-reports-container').addClass('hide');
    }
    if (!$('#install-reports-container').hasClass('hide')) {
        $('#install-reports-container').addClass('hide');
    }
    if (!$('#prorate-reports-container').hasClass('hide')) {
        $('#prorate-reports-container').addClass('hide');
    }
    if (!$('#customer-reports-container').hasClass('hide')) {
        $('#customer-reports-container').addClass('hide');
    }
    if (!$('#invoice-reports-container').hasClass('hide')) {
        $('#invoice-reports-container').addClass('hide');
    }
    if (!$('#logs-reports-container').hasClass('hide')) {
        $('#logs-reports-container').addClass('hide');
    }
    if (!$('#income-reports-container').hasClass('hide')) {
        $('#income-reports-container').addClass('hide');
    }
}

async function generateSalesReport(content_data, date_from, date_to) {
    const sales_report = await fetchReports('reports/read_sales.php', content_data);

    let from = formatDate(date_from, 'from');
    let to = formatDate(new Date(date_to), 'to');

    const report_title = 'Sales Report Summary (' + from + ' - ' + to + ')';
    let total = 0.00;

    $('#sales-reports-container').removeClass('hide');
    $('#sales-reports-title').text(report_title);

    let reports_column_header = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Payment Center</th>
            <th scope="col">Reference ID</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Account ID</th>
            <th scope="col">Amount Paid</th>
        </tr>
    `;

    $('#sales-reports-column-header').append(reports_column_header);

    var sales_report_table = $('#sales-reports-table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy',  
            {
                extend: 'excelHtml5',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'pdfHtml5',
                title: 'GSTech ' + report_title,
                exportOptions: {
                    columns: ':visible',
                    search: 'applied',
                    order: 'applied'
                }
            },
            {
                extend: 'csv',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'print',
                title: 'GSTech ' + report_title,
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' );
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ],
        pageLength: 10,
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < sales_report.length; i++) {
        sales_report_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${i+1}</th>
                <td data-label="Payment Center">${sales_report[i].payment_center}</td>
                <td data-label="Reference ID">${sales_report[i].reference_id}</td>
                <td data-label="Payment Date">${new Date(sales_report[i].payment_date).toLocaleDateString('PHT')}</td>
                <td data-label="Account ID">${sales_report[i].account_id}</td>
                <td data-label="Amount Paid">&#8369; ${(parseFloat(sales_report[i].amount_paid)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            </tr>
        `)).draw(false);

        total += parseFloat(sales_report[i].amount_paid);
    }

    sales_report_table.draw();

    let sales_gross_income = `
        <tr style="height:70px" class="justify-content-center">
            <th scope="row" style="color: #012970; text-align: right;" colspan="5" class="align-middle pe-5">Gross Income:</th>
            <td class="align-middle">&#8369; ${parseFloat(total).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#sales-reports-column-footer').append(sales_gross_income);
}

async function generateInstallationReport(content_data, date_from, date_to) {
    const installation_report = await fetchReports('reports/read_installation.php', content_data);

    let from = formatDate(date_from, 'from');
    let to = formatDate(new Date(date_to), 'to');

    const report_title = 'Installation Report Summary (' + from + ' - ' + to + ')';
    let total = 0.00;

    $('#install-reports-container').removeClass('hide');
    $('#install-reports-title').text(report_title);

    let reports_column_header = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Reference ID</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Account ID</th>
            <th scope="col">Amount Paid</th>
        </tr>
    `;

    $('#install-reports-column-header').append(reports_column_header);

    var install_report_table = $('#install-reports-table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy',  
            {
                extend: 'excelHtml5',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'pdfHtml5',
                title: 'GSTech ' + report_title,
                exportOptions: {
                    columns: ':visible',
                    search: 'applied',
                    order: 'applied'
                }
            },
            {
                extend: 'csv',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'print',
                title: 'GSTech ' + report_title,
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' );
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ],
        pageLength: 10,
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < installation_report.length; i++) {
        install_report_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${i+1}</th>
                <td data-label="Reference ID">${installation_report[i].reference_id}</td>
                <td data-label="Payment Date">${new Date(installation_report[i].payment_date).toLocaleDateString('PHT')}</td>
                <td data-label="Account ID">${installation_report[i].account_id}</td>
                <td data-label="Amount Paid">&#8369; ${(parseFloat(installation_report[i].amount_paid)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            </tr>
        `)).draw(false);

        total += parseFloat(installation_report[i].amount_paid);
    }

    install_report_table.draw();

    let install_total = `
        <tr style="height:70px" class="justify-content-center">
            <th scope="row" style="color: #012970; text-align: right;" colspan="4" class="align-middle pe-5">Total: </th>
            <td class="align-middle">&#8369; ${parseFloat(total).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#install-reports-column-footer').append(install_total);

}

async function generateProrateReport(content_data, date_from, date_to) {
    const prorate_report = await fetchReports('reports/read_prorates.php', content_data);

    let from = formatDate(date_from, 'from');
    let to = formatDate(new Date(date_to), 'to');

    const report_title = 'Prorates Report Summary (' + from + ' - ' + to + ')';
    let total = 0.00;

    $('#prorate-reports-container').removeClass('hide');
    $('#prorate-reports-title').text(report_title);

    let reports_column_header = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Invoice ID</th>
            <th scope="col">Account ID</th>
            <th scope="col">Duration</th>
            <th scope="col">Prorate Discount</th>
        </tr>
    `;

    $('#prorate-reports-column-header').append(reports_column_header);

    var prorate_report_table = $('#prorate-reports-table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy',  
            {
                extend: 'excelHtml5',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'pdfHtml5',
                title: 'GSTech ' + report_title,
                exportOptions: {
                    columns: ':visible',
                    search: 'applied',
                    order: 'applied'
                }
            },
            {
                extend: 'csv',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'print',
                title: 'GSTech ' + report_title,
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' );
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ],
        pageLength: 10,
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < prorate_report.length; i++) {
        prorate_report_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${i+1}</th>
                <td data-label="Date">${new Date(prorate_report[i].date).toLocaleDateString('PHT')}</td>
                <td data-label="Invoice ID">${prorate_report[i].invoice_id}</td>
                <td data-label="Account ID">${prorate_report[i].account_id}</td>
                <td data-label="Duration">${prorate_report[i].duration}</td>
                <td data-label="Amount Paid">&#8369; ${(parseFloat(prorate_report[i].prorate_discount)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            </tr>
        `)).draw(false);

        total += parseFloat(prorate_report[i].prorate_discount);
    }

    prorate_report_table.draw();

    let prorate_total = `
        <tr style="height:70px" class="justify-content-center">
            <th scope="row" style="color: #012970; text-align: right;" colspan="5" class="align-middle pe-5">Total: </th>
            <td class="align-middle">&#8369; ${parseFloat(total).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#prorate-reports-column-footer').append(prorate_total);
}

async function generateCustomerReport(date_from, date_to) {
    let content_data = JSON.stringify({
        'date_from' : date_from,
        'date_to' : date_to,
        'customer_status' : $('#customer_status').val(),
        'customer_area' : $('#customer_area').val()
    });

    const customer_report = await fetchReports('reports/read_customers.php', content_data);

    let from = formatDate(date_from, 'from');
    let to = formatDate(new Date(date_to), 'to');

    const report_title = 'Customer Report Summary (' + from + ' - ' + to + ')';
    let total = customer_report.length;

    $('#customer-reports-container').removeClass('hide');
    $('#customer-reports-title').text(report_title);

    let reports_column_header = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Start Date</th>
            <th scope="col">Account ID</th>
            <th scope="col">GSTech ID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Billing Address</th>
            <th scope="col">Plan</th>
            <th scope="col">Area</th>
        </tr>
    `;

    $('#customer-reports-column-header').append(reports_column_header);

    var customer_report_table = $('#customer-reports-table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy',  
            {
                extend: 'excelHtml5',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'pdfHtml5',
                title: 'GSTech ' + report_title,
                exportOptions: {
                    columns: ':visible',
                    search: 'applied',
                    order: 'applied'
                }
            },
            {
                extend: 'csv',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'print',
                title: 'GSTech ' + report_title,
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' );
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ],
        pageLength: 10,
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < customer_report.length; i++) {
        customer_report_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${i+1}</th>
                <td data-label="Start Date">${new Date(customer_report[i].start_date).toLocaleDateString('PHT')}</td>
                <td data-label="Account ID">${customer_report[i].account_id}</td>
                <td data-label="GSTech ID">${customer_report[i].gstech_id}</td>
                <td data-label="Customer Name">${customer_report[i].customer_name}</td>
                <td data-label="Billing Address">${customer_report[i].billing_address}</td>
                <td data-label="Plan">${customer_report[i].plan}</td>
                <td data-label="Area">${customer_report[i].area}</td>
            </tr>
        `)).draw(false);

    }

    customer_report_table.draw();

    let customer_total = `
        <tr style="height:70px" class="justify-content-center">
            <th scope="row" style="color: #012970; text-align: right;" colspan="7" class="align-middle pe-5">Total: </th>
            <td class="align-middle">${parseFloat(total).toLocaleString('PHT', {minimumFractionDigits:0, maximumFractionDigits:0})}</td>
        </tr>
    `;

    $('#customer-reports-column-footer').append(customer_total);
}

async function generateInvoiceReport(date_from, date_to) {
    let content_data = JSON.stringify({
        'date_from' : date_from,
        'date_to' : date_to,
        'invoice_status' : $('#invoice_status').val()
    });

    const invoice_report = await fetchReports('reports/read_invoice.php', content_data);

    let from = formatDate(date_from, 'from');
    let to = formatDate(new Date(date_to), 'to');

    const report_title = 'Invoice Report Summary (' + from + ' - ' + to + ')';
    let total = 0.00;

    $('#invoice-reports-container').removeClass('hide');
    $('#invoice-reports-title').text(report_title);

    let reports_column_header = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Account ID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Invoice ID</th>
            <th scope="col">Disconnection Date</th>
            <th scope="col">Running Balance</th>
        </tr>
    `;

    $('#invoice-reports-column-header').append(reports_column_header);

    var invoice_report_table = $('#invoice-reports-table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy',  
            {
                extend: 'excelHtml5',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'pdfHtml5',
                title: 'GSTech ' + report_title,
                exportOptions: {
                    columns: ':visible',
                    search: 'applied',
                    order: 'applied'
                }
            },
            {
                extend: 'csv',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'print',
                title: 'GSTech ' + report_title,
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' );
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ],
        pageLength: 10,
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < invoice_report.length; i++) {
        invoice_report_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${i+1}</th>
                <td data-label="Account ID">${invoice_report[i].account_id}</td>
                <td data-label="Customer Name">${invoice_report[i].customer_name}</td>
                <td data-label="Invoice ID">${invoice_report[i].invoice_id}</td>
                <td data-label="Disconnection Date">${new Date(invoice_report[i].disconnection_date).toLocaleDateString('PHT')}</td>
                <td data-label="Running Balance">&#8369; ${(parseFloat(invoice_report[i].running_balance)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            </tr>
        `)).draw(false);

        total += parseFloat(invoice_report[i].running_balance);

    }

    invoice_report_table.draw();

    let invoice_total = `
        <tr style="height:70px" class="justify-content-center">
            <th scope="row" style="color: #012970; text-align: right;" colspan="5" class="align-middle pe-5">Total Running Balance: </th>
            <td class="align-middle">&#8369; ${parseFloat(total).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#invoice-reports-column-footer').append(invoice_total);
}

async function generateAdminLogsReport(content_data, date_from, date_to) {
    const logs_report = await fetchReports('reports/read_admin_logs.php', content_data);

    let from = formatDate(date_from, 'from');
    let to = formatDate(new Date(date_to), 'to');

    const report_title = 'Admin Logs Report Summary (' + from + ' - ' + to + ')';

    $('#logs-reports-container').removeClass('hide');
    $('#logs-reports-title').text(report_title);

    let reports_column_header = `
        <tr>
            <th scope="col">#</th>
            <th scope="col">Admin ID</th>
            <th scope="col">Username</th>
            <th scope="col">Page Accessed</th>
            <th scope="col">Activity</th>
            <th scope="col">Date Accessed</th>
            <th scope="col">Time</th>
        </tr>
    `;

    $('#logs-reports-column-header').append(reports_column_header);

    var logs_report_table = $('#logs-reports-table').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy',  
            {
                extend: 'excelHtml5',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'pdfHtml5',
                title: 'GSTech ' + report_title,
                exportOptions: {
                    columns: ':visible',
                    search: 'applied',
                    order: 'applied'
                }
            },
            {
                extend: 'csv',
                title: 'GSTech ' + report_title
            },
            {
                extend: 'print',
                title: 'GSTech ' + report_title,
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' );
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ],
        pageLength: 10,
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < logs_report.length; i++) {
        logs_report_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${i+1}</th>
                <td data-label="Admin ID">${logs_report[i].admin_id}</td>
                <td data-label="Username">${logs_report[i].username}</td>
                <td data-label="Page Accessed">${logs_report[i].page_accessed}</td>
                <td data-label="Activity">${logs_report[i].activity}</td>
                <td data-label="Date Accessed">${new Date(logs_report[i].date_accessed).toLocaleDateString('PHT')}</td>
                <td data-label="Time Accessed">${new Date(logs_report[i].date_accessed).toLocaleTimeString('PHT',
                {timeZone:'Asia/Manila',hour12:true,hour:'numeric',minute:'numeric'})}</td>
            </tr>
        `)).draw(false);

    }

    logs_report_table.draw();
}

async function generateIncomeReport(content_data, date_from, date_to) {
    const income_report = await fetchReports('reports/read_income_summary.php', content_data);
    let gross_income = parseFloat(income_report.sales) - parseFloat(income_report.total_expenses);
    let net_income = parseFloat(income_report.sales) - (parseFloat(income_report.total_expenses) + parseFloat(income_report.installation_sales) + parseFloat(income_report.prorate_loss));

    let from = formatDate(date_from, 'from');
    let to = formatDate(new Date(date_to), 'to');

    function formatReportDate(date) {
        var today = new Date(date);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
    
        return today;
    }

    $('#report-from').val(formatReportDate(from));
    $('#report-to').val(formatReportDate(to));

    const report_title = 'Income Report Summary (' + from + ' - ' + to + ')';
    const dates = from + ' - ' + to;
    let total = 0.00;

    $('#income-reports-container').removeClass('hide');
    $('#income-reports-title').text(report_title);

    let reports_column_header = `
        <tr>
            <th scope="col" style="width: 75%; color: #012970; border-bottom: 3px solid;"></th>
            <th scope="col" style="width: 25%; color: #012970; border-bottom: 3px solid;">Income Report For <br> ${dates}</th>
        </tr>
    `;

    $('#income-reports-column-header').append(reports_column_header);

    let revenues = `
        <tr>
            <th scope="row" style="color: #012970;"><strong>REVENUES</strong> <br> &emsp;Total Sales</th>
            <td><br>&#8369; ${(parseFloat(income_report.sales)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#income-reports-body').append(revenues);
    
    let cost_of_sales = `
        <tr>
            <th scope="row" style="color: #012970; border-bottom: 3px solid;"><strong>LESS: COST OF SALES</strong></th>
            <td style="border-bottom: 3px solid;">&#8369; ${(parseFloat(income_report.total_expenses)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#income-reports-body').append(cost_of_sales);

    let gross_profit = `
        <tr>
            <th scope="row" style="color: #012970; border-bottom: 3px solid;"><strong>GROSS PROFIT</strong></th>
            <td style="border-bottom: 3px solid;">&#8369; ${(parseFloat(gross_income)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#income-reports-body').append(gross_profit);

    let install_charge = `
        <tr>
            <th scope="row" style="color: #012970;"><strong>OTHER INCOME/(LOSS)</strong> <br> &emsp;Installation Charges</th>
            <td><br>&#8369; ${(parseFloat(income_report.installation_sales)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}
            </td>
        </tr>
    `;
    
    $('#income-reports-body').append(install_charge);

    let tb_prorate_discounts = `
        <tr>
            <th scope="row" style="color: #012970; border-bottom: 4px solid;">&emsp;Prorate Discounts</th>
            <td style="border-bottom: 4px solid;">&#8369; ${(parseFloat(income_report.prorate_loss)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `;

    $('#income-reports-body').append(tb_prorate_discounts);

    let tb_net_income = `
        <tr>
            <th scope="row" style="color: #012970; border-bottom: 4px solid;"><strong>NET INCOME</strong></th>
            <th style="color: #012970; border-bottom: 4px solid;">&#8369; ${(parseFloat(net_income)).toLocaleString('PHT', {minimumFractionDigits:2, maximumFractionDigits:2})}</th>
        </tr>
    `;

    $('#income-reports-body').append(tb_net_income);
}

