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
    }
    else {
        window.location.replace('../views/login');
    }
    
});

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const currentDay = new Date().getDate();

// Global Functions
function setEventListener() {
    unpaid_this_month.addEventListener('click', (e) => {
        filterInvoiceCard('This Month');
    }, false);

    unpaid_this_year.addEventListener('click', (e) => {
        filterInvoiceCard('This Year');
    }, false);

    unpaid_all.addEventListener('click', (e) => {
        filterInvoiceCard('All');
    }, false);

    uncharged_this_month.addEventListener('click', (e) => {
        filterProrateCard('This Month');
    }, false);

    uncharged_this_year.addEventListener('click', (e) => {
        filterProrateCard('This Year');
    }, false);

    uncharged_all.addEventListener('click', (e) => {
        filterProrateCard('All');
    }, false);
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
function setCards() {
    filterInvoiceCard('This Month');
    filterProrateCard('This Month');
    setTicketCards();
}

async function filterInvoiceCard(filter_name) {
    const unpaid_invoice = await fetchData('views/invoice_get_unpaid.php?filter=' + filter_name);

    if (unpaid_invoice.total_unpaid == null) {
        $('#total_unpaid').text('\u20B1 0.00');
    }
    else {
        $('#total_unpaid').text('\u20B1 ' + parseFloat(unpaid_invoice.total_unpaid).toFixed(2));
    }

    $('#unpaid_filter').text('| ' + filter_name);
    $('#total_invoices').text(unpaid_invoice.total_invoices);
}

async function filterProrateCard(filter_name) {
    const untagged_prorate = await fetchData('views/prorate_get_untagged.php?filter=' + filter_name);

    if (untagged_prorate.total_prorate == null) {
        $('#total_uncharged').text('\u20B1 0.00');
    }
    else {
        $('#total_uncharged').text('\u20B1 ' + parseFloat(untagged_prorate.total_prorate).toFixed(2));
    }

    $('#uncharged_filter').text('| ' + filter_name);
    $('#total_prorates').text(untagged_prorate.num_of_prorates);
}

async function setTicketCards() {
    let tickets = await fetchData('views/ticket_active_claimed.php?admin_id=' + admin_id);

    $('#active_tkt_cnt').text(tickets.active_tickets);
    $('#claimed_tkt_cnt').text(tickets.claimed_tickets + ' / ' + tickets.active_tickets);
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
                    if (parseInt(content[j].payment_date.split('-')[1]) == current || parseInt(content[j].payment_date.split('-')[0] == prev_year)) {
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
                <td data-label="Bandwidth">${content[i].bandwidth} mbps</td>
                <td>&#8369; ${content[i].price}</td>
                <td><span class="badge ${tag}">${content[i].status}</span></td>
                <td>${subscribers}</td>
                </tr>
        `)).draw(false);
    }

    async function countPlanSubscribers(plan_id) {
        let content = await fetchData('account/read.php'), subscribers = 0;
    
        for (var i = 0; i < content.length; i++) {
            if (content[i].plan_id == plan_id) {
                subscribers = subscribers + 1;
            }
        }
    
        return subscribers;
    }
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
}

// Ticket Overview
async function setTicketOverview() {
    let ticket_data = await getTicketData();
    new Chart(document.querySelector('#ticket_overview'), {
    type: 'polarArea',
    data: {
        labels: [
        'Network Interruption',
        'Subscription Change',
        'Disconnection',
        'General Concern'
        ],
        datasets: [{
        label: 'Number of Customers',
        data: ticket_data,
        backgroundColor: [
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
        }]
    }
    });

    async function getTicketData() {
        let content = await fetchData('ticket/read.php');
        let network = 0, subscription = 0, disconnection = 0, general = 0;
    
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
                else if (content[i].concern_id == 4) {
                    general = general + 1;
                }
            }
        }
    
        return [network, subscription, disconnection, general];
    }
}