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
    let account_id = (window.location.href).split("=")[1];
    const content = await getCustomerData(account_id);

    document.getElementById('customer-name').innerHTML = content.first_name + " " + content.last_name;
    $('#account_id').text(content.account_id);
    $('#first_name').text(content.first_name);
    $('#middle_name').text(content.middle_name);
    $('#last_name').text(content.last_name);

    $('#email').text(content.email);
    $('#mobile_number').text(content.mobile_number);
    $('#birthdate').text(content.birthdate);

    $('#billing_address').text(content.billing_address);
    $('#gstech_id').text(content.gstech_id);
}

async function getCustomerData(account_id) {
    let url = DIR_API + 'customer/read_single.php?account_id=' + account_id;
    try {
        let res = await fetch(url);
        return await res.json();        
    } catch (error) {
        console.log(error);
    }
}