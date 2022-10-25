const add_customer = document.getElementById('add-customer');

// On Boot Load
$(document).ready(function () {
    getID().then(result => {
        $("#account_id").attr("value", result);
    });

    displaySubscription();
    displayConnection();
    displayAccountStatus();
    displayArea();
});

const getID = async () => {
    const result = await generateAccountID();
    return result;
}

async function generateAccountID() {
    let url = DIR_API + 'account/read.php';
    try {
        let res = await fetch(url);
        response = await res.json();

        let unique = false;
        while(unique == false) {
            let checker = 0;
            let rand_num = Math.round(Math.random() * 99999999);
            for(let i = 0; i < response.length; i++) {
                if(rand_num == response[i]['account_id']) {
                    checker++;
                }
            }
            if (checker == 0) {
                unique = true;
                return rand_num.toString();
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function addCustomer() {
    const account_id = $('#account_id').val();

    const first_name = $('#first_name').val();
    const middle_name = $('#middle_name').val();
    const last_name = $('#last_name').val();

    const billing_address = $('#billing_address').val();
    const mobile_number = $('#mobile_number').val();
    const email = $('#email').val();
    const birthdate = $('#birthdate').val();

    const start_date = $('#start_date').val();
    const plan_id = $('#plan_id').val();
    const connection_id = $('#connection_id').val();
    const account_status_id = $('#account_status_id').val();
    const area_id = $('#area_id').val();

    let url = DIR_API + 'account/create.php';
    const addAccountResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id,
            'start_date' : start_date,
            'plan_id' : plan_id,
            'connection_id' : connection_id,
            'account_status_id' : account_status_id,
            'area_id' : area_id
        })
    });

    url = DIR_API + 'customer/create.php';
    const addCustomerResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id,
            'first_name' : first_name,
            'middle_name' : middle_name,
            'last_name' : last_name,
            'billing_address' : billing_address,
            'mobile_number' : mobile_number,
            'email' : email,
            'birthdate' : birthdate
        })
    });

    const account_content = await addAccountResponse.json();
    const customer_content = await addCustomerResponse.json();
    
    if (account_content.message == 'Account Created' && customer_content.message == 'Customer Created') {
        toastr.success('Customer Created Successfully.');
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
    else {
        toastr.error(account_content.message + " " + customer_content.message);
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

async function displaySubscription() {
    let url = DIR_API + 'plan/read.php';
    let plan;
    try {
        let res = await fetch(url);
        plan = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < plan.length; i++) {
        var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name}</option>`;
        $("#plan_id").append(opt);
    }
}

async function displayConnection() {
    let url = DIR_API + 'connection/read.php';
    let connection;
    try {
        let res = await fetch(url);
        connection = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < connection.length; i++) {
        var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
        $("#connection_id").append(opt);
    }
}

async function displayAccountStatus() {
    let url = DIR_API + 'statuses/read.php?status_table=account_status';
    let account_status;
    try {
        let res = await fetch(url);
        account_status = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < account_status.length; i++) {
        var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
        $("#account_status_id").append(opt);
    }
}

async function displayArea() {
    let url = DIR_API + 'area/read.php';
    let area;
    try {
        let res = await fetch(url);
        area = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < area.length; i++) {
        var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
        $("#area_id").append(opt);
    }
}

// Form Submits -- onclick Triggers
add_customer.onsubmit = (e) => {
    e.preventDefault();
    addCustomer();
};
