// On Load
$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/customers_add.php') {
        if(sessionStorage.getItem("user_id") == 4|| 
            sessionStorage.getItem("user_id") == 5 || 
            sessionStorage.getItem("user_id") == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
            setAddCustomerPage();
        }
    }
    else {
        getCustomers();
        setModal();
    }
});

// View Customer JS
async function getCustomers () {
    let url = DIR_API + 'views/customer.php';
    let customer_data;
    var t = $('#customer-table').DataTable();
    try {
        let res = await fetch(url);
        customer_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < customer_data.length; i++) {
        var tag;
        if (customer_data[i].status == 'VALUED') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${customer_data[i].account_id}</a></th>
                <td>${customer_data[i].customer_name}</td>
                <td><a href="#" class="text-primary">${customer_data[i].plan}</a></td>
                <td>&#8369; ${customer_data[i].balance}</td>
                <td><span class="badge ${tag}">${customer_data[i].status}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalDialogScrollable" data-bs-whatever="${customer_data[i].account_id}" id="try_lang"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }
}

// Modal for Customer List
async function setModal () {
    var exampleModal = document.getElementById('modalDialogScrollable')
    exampleModal.addEventListener('show.bs.modal', function (event) {

      // Button that triggered the modal
      var button = event.relatedTarget;

      // Extract info from data-bs-* attributes
      var recipient = button.getAttribute('data-bs-whatever');

      try_lang(recipient);
    
      async function try_lang (account_id) {
        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = account_id;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'customer/read_single.php?account_id=' + account_id;
        let customer;
            try {
                let res = await fetch(url);
                customer = await res.json();
            } catch (error) {
                console.log(error);
            }

        setCustomerData('#gstech_id', customer.gstech_id);
        setCustomerData('#first_name', customer.first_name);
        setCustomerData('#middle_name', customer.middle_name);
        setCustomerData('#last_name', customer.last_name);
        setCustomerData('#billing_address', customer.billing_address);
        setCustomerData('#mobile_number', customer.mobile_number);
        setCustomerData('#email', customer.email);
        setCustomerData('#birthdate', customer.birthdate);
        setCustomerData('#account_id', customer.account_id);

        // Display Default Dropdown Data
        const area = await displayArea();

        for (var i = 0; i < area.length; i++) {
            if (area[i].area_id == 3) {
                var opt = `<option selected disabled value='${area[i].area_id}'>${area[i].area_name}</option>`;
                $("#area_id").append(opt);
            }
        }

        function setCustomerData (id, data) {
            $(id).val(data);
            $(id).attr('disabled', true);
        }
      }
    });
}

// Add Customer JS
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

    const install_type_id = $('#install_type_id').val();

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

    url = DIR_API + 'installation/create.php';
    const addInstallationResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'install_type_id' : install_type_id,
            'account_id' : account_id
        })
    });

    url = DIR_API + 'ratings/create.php';
    const addRatingsResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id
        })
    });

    const account_content = await addAccountResponse.json();
    const customer_content = await addCustomerResponse.json();
    const installation_content = await addInstallationResponse.json();
    const ratings_content = await addRatingsResponse.json();
    
    if (account_content.message == 'Account Created' && customer_content.message == 'Customer Created' 
        && installation_content.message == 'Installation Created' && ratings_content.message == 'Ratings Created') {
        toastr.success('Customer Created Successfully.');
        setTimeout(function(){
            window.location.replace('../views/customers.php');
            // window.location.reload();
         }, 2000);
    }
    else {
        toastr.error(account_content.message + " " + customer_content.message + " " 
        + installation_content.message + " " + ratings_content.message);
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

async function displayPlan() {
    let url = DIR_API + 'plan/read.php';
    let plan;
    try {
        let res = await fetch(url);
        plan = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < plan.length; i++) {
        var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
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
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }

    
}

async function displayInstallation() {
    let url = DIR_API + 'installation_type/read.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }

}

async function setAddDropdown() {
    const install_type = await displayInstallation();
    for (var i = 0; i < install_type.length; i++) {
        var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
        $("#install_type_id").append(opt);
    }

    const area = await displayArea();
    for (var i = 0; i < area.length; i++) {
        var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
        $("#area_id").append(opt);
    }
}

function setAddCustomerPage () {
    const add_customer = document.getElementById('add-customer');

    getID().then(result => {
        $("#account_id").attr("value", result);
    });

    displayPlan();
    displayConnection();
    displayAccountStatus();
    displayArea();
    // displayInstallation();
    setAddDropdown();

    // Form Submits -- onclick Triggers
    add_customer.onsubmit = (e) => {
        e.preventDefault();
        addCustomer();
    };
}
