const DIR_API_LOAD = 'http://localhost/gstech_api/api/';

autoload();

async function autoload() {
    generateInvoice();
    updateUnpaidInvoice();
    updateOverdueInvoice();
    updateDisconnectionInvoice();
}

async function getAccountsData() {
    let url = DIR_API_LOAD + 'account/read.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getInvoicePerAcct(account_id) {
    let url = DIR_API_LOAD + 'invoice/read_single_account.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getInvoiceByStatus(status_id) {
    let url = DIR_API_LOAD + 'invoice/read_by_status.php?invoice_status_id=' + status_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

function getDaysDifference(today, disconnection_date) {
    const days = (date_1, date_2) => {
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    return days(today, disconnection_date)
}

async function generateInvoice() {
    let account_content = await getAccountsData();
    var day_today = new Date().getDate();

    for (var i = 0; i < account_content.length; i++) {
        var month_diff = monthDiff(new Date(account_content[i].start_date), new Date());
        let bill_count = 0;
        
        if (month_diff > account_content[i].bill_count) {
            bill_count = account_content[i].bill_count;
            if (day_today == account_content[i].billing_day - 10) {
                while (bill_count != month_diff) {
                    if (account_content[i].account_status_id == 2) {
                        break;
                    }
                    else if (account_content[i].account_status_id == 3) {
                        createInvoice(account_content[i].account_id, 3);
                    }
                    else if (account_content[i].account_status_id !== 2) {
                        createInvoice(account_content[i].account_id, 1);
                    }
                    bill_count = bill_count + 1;
                }
            }
        }
    }

    async function createInvoice(account_id, account_status) {
        let url = DIR_API_LOAD + 'invoice/create.php';
        const createResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'account_id' : account_id
            })
        });
    
        const content = await createResponse.json();
    
        if (content.message == 'Invoice Created') {
            console.log(account_id + ' - success');
            if (account_status == 3) {
                updateInvoiceStatus(content.invoice_id, 4);
            }
        }
    }
    
    
}

async function updateInvoiceStatus(invoice_id, status_id) {
    let url = DIR_API_LOAD + 'invoice/update_status.php';
    const updateDataResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'invoice_id' : invoice_id,
            'invoice_status_id' : status_id
        })
    });

    const update_content = await updateDataResponse.json();

    if (update_content.message == 'Invoice Updated') {
        console.log('Invoice Updated');
    }
}

async function updateUnpaidInvoice() {
    const unpaid_content = await getInvoiceByStatus(2);
    var date_today = new Date();

    for (var i = 0; i < unpaid_content.length; i++) {
        let day_difference = getDaysDifference(date_today, new Date(unpaid_content[i].disconnection_date));
        if (day_difference >= 0 && day_difference <= 5) {
            updateInvoiceStatus(unpaid_content[i].invoice_id, 3);
            // console.log('Overdue: ' + unpaid_content[i].invoice_status_id);
        }
    }
}

async function updateOverdueInvoice() {
    const unpaid_content = await getInvoiceByStatus(3);
    var date_today = new Date(today_date);

    for (var i = 0; i < unpaid_content.length; i++) {
        let day_difference = getDaysDifference(date_today, new Date(unpaid_content[i].disconnection_date));
        if (day_difference >= 6 && day_difference <= 7) {
            updateInvoiceStatus(unpaid_content[i].invoice_id, 4);
            // console.log('Temp Disconnection: ' + unpaid_content[i].invoice_status_id);
        } 
    }
}

async function updateDisconnectionInvoice() {
    const unpaid_content = await getInvoiceByStatus(4);
    var date_today = new Date(today_date);

    for (var i = 0; i < unpaid_content.length; i++) {
        let day_difference = getDaysDifference(date_today, new Date(unpaid_content[i].disconnection_date));
        if (day_difference > 7) {
            // Create Ticket Here
            console.log('Disconnection: ' + unpaid_content[i].invoice_status_id);
            console.log(new Date());
        } 
    }
}