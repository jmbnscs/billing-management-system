$(document).ready(function () {
    if (checkDefaults()) {
        isDefault();

        if (sessionStorage.getItem('error_message') == "You don't have access to this page.") {
            setToastrArgs(sessionStorage.getItem('error_message'), "Error");
            sessionStorage.setItem('error_message', null);
        }
    
        setCards();
        setEventListener();
        setRevenueReports();
        setPlanPreview();
        setCustomerPreview();
        setCollection();
        setTicketOverview();
        setRecentActivity();
        downloadReports();
    }
    else {
        window.location.replace('../views/login.php');
    }
    
});

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDate();

// Global Functions
function setEventListener() {
    unpaid_this_month.addEventListener('click', (e) => {
        filterInvoiceCard('month');
    }, false);

    unpaid_this_year.addEventListener('click', (e) => {
        filterInvoiceCard('year');
    }, false);

    uncharged_this_month.addEventListener('click', (e) => {
        filterProrateCard('month');
    }, false);

    uncharged_this_year.addEventListener('click', (e) => {
        filterProrateCard('year');
    }, false);
}

// Download Full Report
async function downloadReports () {
    const download_reports = document.getElementById('download-reports');
    download_reports.onsubmit = (e) => {
        $('#download-reports').attr('action', '../../app/includes/download_reports.php');
        toastr.info("Preparing Report...");
    };
}

// Recent Activity
async function setRecentActivity() {
    const content = await fetchData('logs/read_admin_log.php?admin_id=' + admin_id);
    
    if (content.length > 0) {
        for (var i = 0; i < content.length; i++) {
            const activity_panel = document.getElementById('activity-panel');
    
            // Main Div
            const activity_div = document.createElement('div');
            activity_div.classList.add('activity-item', 'd-flex');
    
            const activity_label = document.createElement('div');
            activity_label.classList.add('activite-label');
    
            const act_icon = document.createElement('i');
            if (i % 2 == 0) {
                act_icon.classList.add('bi', 'bi-circle-fill', 'activity-badge', 'text-success', 'align-self-start');
            }
            else {
                act_icon.classList.add('bi', 'bi-circle-fill', 'activity-badge', 'text-danger', 'align-self-start');
            }
    
            const activity_content = document.createElement('div');
            activity_content.classList.add('activity-content');
    
            const seconds = (new Date() - new Date(content[i].date_accessed)) / 1000;
        
            var d = Math.floor(seconds / (3600*24));
            var h = Math.floor(seconds % (3600*24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
    
            if (d >= 1) {
                activity_label.textContent = d + ' day/s';
                activity_content.textContent = content[i].activity;
            }
            else if (h >= 1) {
                activity_label.textContent = h + ' hr/s';
                activity_content.textContent = content[i].activity;
            }
            else if (m >= 1) {
                activity_label.textContent = m + ' min/s';
                activity_content.textContent = content[i].activity;
            }
            else {
                activity_label.textContent = s + ' sec/s';
                activity_content.textContent = content[i].activity;
            }
    
            activity_div.append(activity_label);
            activity_div.append(act_icon);
            activity_div.append(activity_content);
    
            activity_panel.append(activity_div);
        }
    }
    else {
        const activity_panel = document.getElementById('activity-panel');
        activity_panel.textContent = 'No recent activity to show.';
    }
}

// Dashboard Cards
async function setCards() {
    filterInvoiceCard('month');
    filterProrateCard('month');
    setTicketCards();
}

async function filterInvoiceCard(filter_name) {
    let unpaid_bill = 0.00, data, page;
    if (filter_name == 'month') {
        for (var i = 2; i < 5; i++) {
            page = 'invoice/read_by_status.php?invoice_status_id=' + i;
            data = await fetchData(page);
            if (data.length > 0) {
                for (var j = 0; j < data.length; j++) {
                    let bill_date = data[j].billing_period_end.split("-");
                    if (currentMonth == parseInt(bill_date[1])) {
                        unpaid_bill = parseFloat(unpaid_bill) + parseFloat(data[j].running_balance);
                    }
                }
            }
        }
        document.getElementById('total_unpaid').innerHTML = '\u20B1 ' + unpaid_bill.toFixed(2);
        document.getElementById('unpaid_filter').innerHTML = "| This Month";
    }
    else if (filter_name == 'year') {
        for (var i = 2; i < 5; i++) {
            page = 'invoice/read_by_status.php?invoice_status_id=' + i;
            data = await fetchData(page);
            if (data.length > 0) {
                for (var j = 0; j < data.length; j++) {
                    let bill_date = data[j].billing_period_end.split("-");
                    if (currentYear == parseInt(bill_date[0])) {
                        unpaid_bill = parseFloat(unpaid_bill) + parseFloat(data[j].running_balance);
                    }
                }
            }
        }
        document.getElementById('total_unpaid').innerHTML = '\u20B1 ' + unpaid_bill.toFixed(2);
        document.getElementById('unpaid_filter').innerHTML = "| This Year";
    }
}

async function filterProrateCard(filter_name) {
    let uncharged = 0.00;
    let data = await fetchData('prorate/read_status.php?prorate_status_id=1');
    if (filter_name == 'month') {
        for (var i = 0; i < data.length; i++) {
            let created_at = new Date(data[i].created_at);
            if (currentMonth == created_at.getMonth() + 1) {
                uncharged = parseFloat(uncharged) + parseFloat(data[i].prorate_charge);
            }
        }
        document.getElementById('total_uncharged').innerHTML = '\u20B1 ' + uncharged.toFixed(2);
        document.getElementById('uncharged_filter').innerHTML = "| This Month";
    }
    else if (filter_name == 'year') {
        for (var i = 0; i < data.length; i++) {
            let created_at = new Date(data[i].created_at);
            if (currentYear == created_at.getFullYear()) {
                uncharged = parseFloat(uncharged) + parseFloat(data[i].prorate_charge);
            }
        }
        document.getElementById('total_uncharged').innerHTML = '\u20B1 ' + uncharged.toFixed(2);
        document.getElementById('uncharged_filter').innerHTML = "| This Year";
    }
}

async function setTicketCards() {
    let content = await fetchData('ticket/read_status.php?ticket_status_id=1'), counter = 0;
    (content.length == undefined) ? $('#active_tkt_cnt').text('0') : $('#active_tkt_cnt').text(parseInt(content.length));

    content = await fetchData('ticket/read_status.php?ticket_status_id=2');
    for (var i = 0; i < content.length; i++) {
        content[i].admin_id;
        if (content[i].admin_id == admin_id) {
            counter++;
        }
    }
    $('#claimed_tkt_cnt').text(counter);
}

// Revenue Reports
async function setRevenueReports() {
    $('#revenue_year').text('/ Year ' + currentYear);
    let months = setMonthLabel();
    let revenue = await getRevenueData();

    new Chart(document.querySelector('#revenue_chart'), {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
            label: 'Bar Chart',
            data: revenue,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)'
              
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)'
              
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}

function setMonthLabel() {
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let current = new Date().getMonth();
    let labels = new Array(), i = 6;

    while (i !== 0) {
        if (current <= 0) {
            current = 12;
        }
        labels.push(months[current - 1]);
        current--;
        i--;
    }
    return labels.reverse();
}

async function getRevenueData() {
    let content = await fetchData('payment/read.php');
    let current = new Date().getMonth(), i = 6, prev_year = new Date().getFullYear() - 1, data = new Array(), revenue = 0.00, check = 0;

    while (i !== 0) {
        if (current <= 0) {
            current = 12;
            check = 1;
        }

        if (check == 1) {
            for (var j = 0; j < content.length; j++) {
                if (parseInt(content[j].payment_date.split('-')[1]) == current && parseInt(content[j].payment_date.split('-')[0] == prev_year)) {
                    revenue = parseFloat(revenue) + parseFloat(content[j].amount_paid);
                }
            }
            data.push(parseFloat(revenue));
        }
        else {
            for (var j = 0; j < content.length; j++) {
                if (parseInt(content[j].payment_date.split('-')[1]) == current) {
                    revenue = parseFloat(revenue) + parseFloat(content[j].amount_paid);
                }
            }
            data.push(parseFloat(revenue));
        }
        

        i--;
        current--;
        revenue = 0.00;
    }
    return data.reverse();
}

// Plan Preview
async function setPlanPreview() {
    var t = $('#plan-preview-table').DataTable({
        'pageLength' : 5,
        'lengthChange' : false,
        'searching' : false
    });

    let content = await fetchData('views/plan.php');
    for (var i = 0; i < content.length; i++) {
        var tag;
        let subscribers = await countPlanSubscribers(content[i].plan_id);
        if (content[i].status == 'ACTIVE') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row">${content[i].plan_name}</th>
                <td>${content[i].bandwidth} mbps</td>
                <td>&#8369; ${content[i].price}</td>
                <td><span class="badge ${tag}">${content[i].status}</span></td>
                <td>${subscribers}</td>
                </tr>
        `)).draw(false);
    }
}

async function countPlanSubscribers(plan_id) {
    let content = await fetchData('account/read.php'), counter = 0;

    for (var i = 0; i < content.length; i++) {
        if (content[i].plan_id == plan_id) {
            counter = counter + 1;
        }
    }

    return counter;
}

// Customer Preview
async function setCustomerPreview() {
    let content = await fetchData('ratings/read.php');
    let valued = 0, delinquent = 0;
    for (var i = 0; i < content.length; i++) {
        (content[i].ratings_status_id == 1) ? valued = valued + 1 : delinquent = delinquent + 1;
    }

    new Chart(document.querySelector('#customer_preview'), {
        type: 'pie',
        data: {
          labels: [
            'Valued',
            'Deliquent'
          ],
          datasets: [{
            label: 'Number of Customers',
            data: [valued, delinquent],
            backgroundColor: [
              'rgb(119, 221, 119)',
              'rgb(250, 160, 160)'
            ],
            hoverOffset: 4
          }]
        }
      });
}

// Monthly Collection
async function setCollection() {
    let collection_data = await setCollectionData();
    new Chart(document.querySelector('#collection_preview'), {
    type: 'doughnut',
    data: {
        labels: [
        'Paid',
        'Unpaid',
        'Account Receivables'
        ],
        datasets: [{
        label: 'Number of Customers',
        data: collection_data,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
        }]
    }
    });
}

async function setCollectionData() {
    let paid = await getPaidUnpaidData(1);
    let unpaid = await getPaidUnpaidData(2);
    let acct_receivables = await getAccountReceivables();
    let collection = [paid, unpaid, acct_receivables];
    return collection;
}

async function getPaidUnpaidData(status_id) {
    let content = await fetchData('invoice/read.php');
    let amount = 0.00;
    for (var i = 0; i < content.length; i++) {
        if (parseInt(content[i].billing_period_end.split('-')[1]) == currentMonth && parseInt(content[i].billing_period_end.split('-')[0]) == currentYear) {
            if (status_id == 1) {
                if (content[i].invoice_status_id == 1) {
                    amount = parseFloat(amount) + parseFloat(content[i].amount_paid);
                }
            }
            else {
                if (content[i].invoice_status_id !== 1) {
                    amount = parseFloat(amount) + parseFloat(content[i].running_balance);
                }
            }
        }
    }

    return amount;
}

async function getAccountReceivables() {
    let content = await fetchData('account/read.php');
    let acct_receivables = 0.00;
    for (var i = 0; i < content.length; i++) {
        if (content[i].billing_day > currentDay) {
            acct_receivables = parseFloat(acct_receivables) + parseFloat(await getPlanPrice(content[i].plan_id));
        }
    }
    return acct_receivables;
}

async function getPlanPrice(plan_id) {
    let content = await fetchData('plan/read_single.php?plan_id=' + plan_id);
    return parseFloat(content.price);
}

// Ticket Overview
async function setTicketOverview() {
    let ticket_data = await setTicketData();
    new Chart(document.querySelector('#ticket_overview'), {
    type: 'polarArea',
    data: {
        labels: [
        'Network Interruption',
        'Subscription Change',
        'Disconnection'
        ],
        datasets: [{
        label: 'Number of Customers',
        data: ticket_data,
        backgroundColor: [
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
        ],
        hoverOffset: 4
        }]
    }
    });
}

async function setTicketData() {
    let content = await fetchData('ticket/read.php');
    let network = 0, subscription = 0, disconnection = 0;

    for (var i = 0; i < content.length; i++) {
        if (parseInt(content[i].date_filed.split('-')[1]) == currentMonth) {
            if (content[i].concern_id == 1) {
                network = network + 1;
            }
            else if (content[i].concern_id == 2) {
                subscription = subscription + 1;
            }
            else if (content[i].concern_id == 3) {
                disconnection = disconnection + 1;
            }
        }
    }

    return [network, subscription, disconnection];
}