// On Boot Load
$(document).ready(function () {
    isDefault();

    if (sessionStorage.getItem('error_message') == "You don't have access to this page.") {
        setToastrArgs(sessionStorage.getItem('error_message'), "Error");
        sessionStorage.setItem('error_message', null);
    }

    setCustomerDataPage();
});

async function setCustomerDataPage() {
    console.log(window.location.href);
}

async function getCustomerData() {
    let url = 'customer/read_single.php?account_id=' + account_id;
}