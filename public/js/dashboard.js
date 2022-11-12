// On Boot Load
$(document).ready(function () {
    isDefault();

    if (sessionStorage.getItem('error_message') == "You don't have access to this page.") {
        setToastrArgs(sessionStorage.getItem('error_message'), "Error");
        sessionStorage.setItem('error_message', null);
    }

    setCards();
    setEventListener();
});

function try_lang() {
    alert('x');
}

function setEventListener() {
    unpaid_this_month.addEventListener('click', (e) => {
        filterCardData('unpaid_month');
    }, false);

    unpaid_this_year.addEventListener('click', (e) => {
        filterCardData('unpaid_year');
    }, false);
}

async function fetchData(page) {
    let url = DIR_API + page;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function setCards() {
    // Unpaid Invoices
    const unpaid_data = await fetchData('invoice/read_by_status.php?invoice_status_id=2');
    filterCardData('unpaid_month');
}

async function filterCardData(card_name) {
    const data = await fetchData('invoice/read_by_status.php?invoice_status_id=2');
    let unpaid_bill = 0.00;
    if (card_name == 'unpaid_month') {
        let unpaid_bill = 0.00;
        const currentMonth = new Date().getMonth() + 1;
        for (let i = 0; i < data.length; i++) {
            const bill_date = data[i].billing_period_end.split("-");
            if (currentMonth == parseInt(bill_date[1])) {
                unpaid_bill = parseFloat(unpaid_bill) + parseFloat(data[i].total_bill);
            }
            document.getElementById('total_unpaid').innerHTML = unpaid_bill.toFixed(2);
            document.getElementById('unpaid_filter').innerHTML = "| This Month";
        }
    }
    else if (card_name == 'unpaid_year') {
        const currentYear = new Date().getFullYear();
        for (let i = 0; i < data.length; i++) {
            const bill_date = data[i].billing_period_end.split("-");
            if (currentYear == parseInt(bill_date[0])) {
                unpaid_bill = parseFloat(unpaid_bill) + parseFloat(data[i].total_bill);
            }
            document.getElementById('total_unpaid').innerHTML = unpaid_bill.toFixed(2);
            document.getElementById('unpaid_filter').innerHTML = "| This Year";
        }
    }
}