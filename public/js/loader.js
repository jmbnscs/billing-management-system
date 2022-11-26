const DIR_API_LOAD = 'http://localhost/gstech_api/api/';
const DIR_APP_LOAD = 'http://localhost/billing-management-system/app/includes/';
const today_date = new Date();
// const today_date = new Date('2022-11-30');

if (localStorage.getItem('admin_id') == '11674') {
    autoload();
}

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

async function getAccount(account_id) {
    let url = DIR_API + 'account/read_single.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getTicketPerAcct(account_id) {
    let url = DIR_API + 'ticket/read_single_account.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function generateTicketNum() {
    let url = DIR_API + 'ticket/read.php';
    try {
        let res = await fetch(url);
        response = await res.json();

        let unique = false;
        while(unique == false) {
            let checker = 0;
            let rand_num = "TN" + Math.round(Math.random() * 999999);
            for(let i = 0; i < response.length; i++) {
                if(rand_num == response[i]['ticket_num']) {
                    checker++;
                }
            }
            if (checker == 0) {
                unique = true;
                return rand_num;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function generateDateString() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
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

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// } 
// var date = new Date();
// console.log(date.addDays(10));

async function logAutomation(activity, page_accessed) {
    let admin_content;
    let url = DIR_API_LOAD + 'admin/read_single.php?admin_id=' + localStorage.getItem('admin_id');
        try {
            let res = await fetch(url);
            admin_content = await res.json();
        } catch (error) {
            console.log(error);
        }

    url = DIR_APP_LOAD + 'log_activity.php';
    let content;
    try {
        let res = await fetch(url);
        content = await res.json();
    } catch (error) {
        console.log(error);
    }

    url = DIR_API_LOAD + 'logs/log_activity.php';
    const logActivityResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'admin_id' : admin_content.admin_id,
            'username' : admin_content.admin_username,
            'page_accessed' : page_accessed,
            'activity' : activity,
            'ip_address' : content.ip_address,
            'user_agent' : content.user_agent
        })
    });

    const logAutomation = await logActivityResponse.json();

    return logAutomation.message;
}

async function generateInvoice() {
    let account_content = await getAccountsData();
    var day_today = new Date().getDate();
    const currentYear = today_date.getFullYear();
    const currentMonth = today_date.getMonth() + 1
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

    for (var i = 0; i < account_content.length; i++) {
        var month_diff = monthDiff(new Date(account_content[i].start_date), new Date());
        let bill_count = 0;

        if (10 - account_content[i].billing_day >= 0) {
            if (month_diff <= account_content[i].bill_count) {
                bill_count = account_content[i].bill_count;
                if (day_today >= (daysInCurrentMonth - (10 - account_content[i].billing_day))) {
                    while (bill_count <= month_diff) {
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
        else {
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
        const log = await logAutomation('Created Invoice for Account # ' + account_id + ' - Invoice # ' + content.invoice_id, 'Automated System');
    
        if (content.message == 'Invoice Created' && log) {
            sendEmail(content.invoice_id);
            if (account_status == 3) {
                updateInvoiceStatus(content.invoice_id, 4);
            }
        }
    }
}

function sendEmail (invoice_id) {
    let url = 'http://localhost/billing-management-system/app/includes/encrypt_pdf.php';
    fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body : `invoice_id=${invoice_id}`,
    });
    // .then((response) => response.text())
    // .then((res) => console.log(res));
}

function sendNotice (invoice_id, status_id) {
    let url = 'http://localhost/billing-management-system/app/includes/send_notice.php';
    fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body : `invoice_id=${invoice_id}&status_id=${status_id}`,
    });
    // .then((response) => response.text())
    // .then((res) => console.log(res));
}

async function checkEmailLog (invoice_id, status_id) {
    let url = DIR_API_LOAD + 'logs/isSent.php';
        const checkEmailResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'invoice_id' : invoice_id,
                'status_id' : status_id,
                'today_date' : generateDateString()
            })
        });
    
        const content = await checkEmailResponse.json();

        return content.message;
}

async function createEmailLog (account_id, invoice_id, status_id, email_sent) {
    let url = DIR_API_LOAD + 'logs/log_email.php';
        const createEmailLogResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'account_id' : account_id,
                'invoice_id' : invoice_id,
                'email_sent' : email_sent,
                'status_id' : status_id
            })
        });
    
        const content = await createEmailLogResponse.json();

        if (content.message) {
            console.log('Email Log Recorded');
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
        // console.log('Invoice Updated');
        const log = await logAutomation('Updated Status of Invoice # ' + invoice_id, 'Automated System');
    }
}

async function updateUnpaidInvoice() {
    const unpaid_content = await getInvoiceByStatus(2);
    var date_today = new Date();

    for (var i = 0; i < unpaid_content.length; i++) {
        let day_difference = getDaysDifference(date_today, new Date(unpaid_content[i].disconnection_date));
        if (day_difference >= 0) {
            updateInvoiceStatus(unpaid_content[i].invoice_id, 3);
            // console.log('Overdue: ' + unpaid_content[i].invoice_status_id);
        }

        if (day_difference == -6) {
            if (!await checkEmailLog(unpaid_content[i].invoice_id, 1)) {
                sendNotice(unpaid_content[i].invoice_id, 1);
                createEmailLog(unpaid_content[i].account_id, unpaid_content[i].invoice_id, 1, 'Payment Reminder for Account # ' + unpaid_content[i].account_id + ' - 5 days before due');
            }
        }
        else if (day_difference == -1) {
            if (!await checkEmailLog(unpaid_content[i].invoice_id, 2)) {
                sendNotice(unpaid_content[i].invoice_id, 2);
                createEmailLog(unpaid_content[i].account_id, unpaid_content[i].invoice_id, 2, 'Payment Reminder for Account # ' + unpaid_content[i].account_id + ' - Due Today');
            }
        }
    }
}

async function updateOverdueInvoice() {
    const unpaid_content = await getInvoiceByStatus(3);
    var date_today = new Date(today_date);

    for (var i = 0; i < unpaid_content.length; i++) {
        let day_difference = getDaysDifference(date_today, new Date(unpaid_content[i].disconnection_date));
        if (day_difference >= 7) {
            updateInvoiceStatus(unpaid_content[i].invoice_id, 4);
            // console.log('Temp Disconnection: ' + unpaid_content[i].invoice_status_id);
        } 
        if (day_difference == 5) {
            if (!await checkEmailLog(unpaid_content[i].invoice_id, 3)) {
                sendNotice(unpaid_content[i].invoice_id, 3);
                createEmailLog(unpaid_content[i].account_id, unpaid_content[i].invoice_id, 3, 'Temporary Disconnection Notice for Account # ' + unpaid_content[i].account_id + ' - Within 24-48 Hours');
            }
        }
    }
}

async function updateDisconnectionInvoice() {
    const unpaid_content = await getInvoiceByStatus(4);
    var date_today = new Date(today_date);

    for (var i = 0; i < unpaid_content.length; i++) {
        let day_difference = getDaysDifference(date_today, new Date(unpaid_content[i].disconnection_date));

        if ((day_difference > 7) && (unpaid_content[i].invoice_status_id == 4)) {
            const ticket_account = await getTicketPerAcct(unpaid_content[i].account_id);
            const account_details = await getAccount(unpaid_content[i].account_id);

            if(account_details.account_status_id !== 3) {
                if(ticket_account.message == 'No Ticket Records Found') {
                    // console.log("No Tickets - Disconnection: " + unpaid_content[i].account_id + " " + unpaid_content[i].invoice_id);
                    createTicket(unpaid_content[i].account_id);
                    if (!await checkEmailLog(unpaid_content[i].invoice_id, 4)) {
                        sendNotice(unpaid_content[i].invoice_id, 4);
                        createEmailLog(unpaid_content[i].account_id, unpaid_content[i].invoice_id, 4, 'Disconnection Notice for Account # ' + unpaid_content[i].account_id + ' - Disconnected Account');
                    }
                }
                else {
                    var ticket_resolved_dates = new Array();
                    for(var j = 0; j < ticket_account.length; j++) {
                        if(ticket_account[j].ticket_status_id == 3) {
                            ticket_resolved_dates.push(ticket_account[j].date_resolved);
                        }
                    }

                    if(ticket_resolved_dates.length > 0) {
                        ticket_resolved_dates.sort();

                        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
                        const pastDate = new Date (ticket_resolved_dates[ticket_resolved_dates.length - 1]);
                        const timeDiffInMs = date_today.getTime() - pastDate.getTime();

                        if(timeDiffInMs > thirtyDaysInMs) {
                            //console.log("W/ Existing Tickets - Disconnection: " + unpaid_content[i].account_id + " " + unpaid_content[i].invoice_id);
                            createTicket(unpaid_content[i].account_id);
                            if (!await checkEmailLog(unpaid_content[i].invoice_id, 4)) {
                                sendNotice(unpaid_content[i].invoice_id, 4);
                                createEmailLog(unpaid_content[i].account_id, unpaid_content[i].invoice_id, 4, 'Disconnection Notice for Account # ' + unpaid_content[i].account_id + ' - Disconnected Account');
                            }
                        }
                    }
                }
            }
        }
    }

    async function createTicket(account_id) {
        const ticket_num = await generateTicketNum();
        const date_filed = generateDateString();

        // Set ticket details for disconnection
        const concern_id = 3;
        const concern_details = "Disconnection grace period has passed.";
        const ticket_status_id = 1;
        const user_level = 5;
        
        let url = DIR_API + 'ticket/create.php';
        const createTicketResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'concern_id' : concern_id,
                'concern_details' : concern_details,
                'date_filed' : date_filed,
                'ticket_status_id' : ticket_status_id,
                'account_id' : account_id,
                'ticket_num' : ticket_num,
                'user_level' : user_level
            })
        });
    
        const ticket_content = await createTicketResponse.json();
    
        if (ticket_content.message == 'Ticket Created') {
            // console.log('Ticket Created Successfully.');
            const log = await logAutomation('Disconnection Ticket created for Account # ' + account_id, 'Automated System');
        }
    }
}