// On Load
const edit_customer = document.getElementById('edit-customer');
const save_customer = document.getElementById('save-customer');

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
        $("#modalDialogScrollable").on("hidden.bs.modal", function () {
            $('#save-customer-btn').attr('disabled', true);
            $('#edit-customer').attr('disabled', false);
        });

        getCustomers();
        setModal();

        save_customer.onsubmit = (e) => {
            e.preventDefault();
            updateCustomerData();
        };
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

        url = DIR_API + 'account/read_single.php?account_id=' + account_id;
        let account;
            try {
                let res = await fetch(url);
                account = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'installation/read_single.php?account_id=' + account_id;
        let installation;
            try {
                let res = await fetch(url);
                installation = await res.json();
            } catch (error) {
                console.log(error);
            }

        const area = await displayArea();
        const plan = await displayPlan();
        const connection = await displayConnection();
        const account_status = await displayAccountStatus();
        const install_type = await displayInstallation();

        toggleInputData('disabled', true);
        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        async function setDefaultDropdown () {
            for (var i = 0; i < area.length; i++) {
                if (area[i].area_id == account.area_id) {
                    var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
                    $("#area_id").append(opt);
                }
            }
    
            for (var i = 0; i < plan.length; i++) {
                if (plan[i].plan_id == account.plan_id) {
                    var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
                    $("#plan_id").append(opt);
                }
            }
        
            for (var i = 0; i < connection.length; i++) {
                if (connection[i].connection_id == account.connection_id) {
                    var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
                    $("#connection_id").append(opt);
                }
            }
        
            for (var i = 0; i < account_status.length; i++) {
                if (account_status[i].status_id == account.account_status_id) {
                    var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
                    $("#account_status_id").append(opt);
                }
            }
        
            for (var i = 0; i < install_type.length; i++) {
                if (install_type[i].install_type_id == installation.install_type_id) {
                    var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
                    $("#install_type_id").append(opt);
                }
            }
        }

        async function setDropdownData () {
            $("#area_id").empty();
            $("#area_id").append(`<option selected disabled value="">Choose Area</option>`);
            for (var i = 0; i < area.length; i++) {
                if (area[i].area_id == account.area_id) {
                    var opt = `<option selected value='${area[i].area_id}' style='color: blue'>${area[i].area_name}</option>`;
                }
                else {
                    var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
                }
                $("#area_id").append(opt);
            }

            $("#plan_id").empty();
            $("#plan_id").append(`<option selected disabled>Choose Subscription Plan</option>`);
            for (var i = 0; i < plan.length; i++) {
                if (plan[i].plan_id == account.plan_id) {
                    var opt = `<option selected value='${plan[i].plan_id}' style='color: blue'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
                }
                else {
                    var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
                }
                $("#plan_id").append(opt);
            }

            $("#connection_id").empty();
            $("#connection_id").append(`<option selected disabled value="">Choose Connection Type</option>`);
            for (var i = 0; i < connection.length; i++) {
                if (connection[i].connection_id == account.connection_id) {
                    var opt = `<option selected value='${connection[i].connection_id}' style='color: blue'>${connection[i].connection_name}</option>`;
                }
                else {
                    var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
                }
                $("#connection_id").append(opt);
            }

            $("#account_status_id").empty();
            $("#account_status_id").append(`<option selected disabled value="">Choose Account Status</option>`);
            for (var i = 0; i < account_status.length; i++) {
                if (account_status[i].status_id == account.account_status_id) {
                    var opt = `<option selected value='${account_status[i].status_id}' style='color: blue'>${account_status[i].status_name}</option>`;
                }
                else {
                    var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
                }
                $("#account_status_id").append(opt);
            }

            $("#install_type_id").empty();
            $("#install_type_id").append(`<option selected disabled value="">Choose Installation Type</option>`);
            for (var i = 0; i < install_type.length; i++) {
                if (install_type[i].install_type_id == installation.install_type_id) {
                    var opt = `<option selected value='${install_type[i].install_type_id}' color: blue'>${install_type[i].install_type_name}</option>`;
                }
                else {
                    var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
                }
                $("#install_type_id").append(opt);
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleInputData (setAttr, bool) {
            setCustomerData('#billing_address', customer.billing_address, setAttr, bool);
            setCustomerData('#mobile_number', customer.mobile_number, setAttr, bool);
            setCustomerData('#email', customer.email, setAttr, bool);

            setCustomerData('#plan_id', account.plan_id, setAttr, bool);
            setCustomerData('#connection_id', account.connection_id, setAttr, bool);
            setCustomerData('#account_status_id', account.account_status_id, setAttr, bool);
            setCustomerData('#area_id', account.area_id, setAttr, bool);

            setCustomerData('#account_id', customer.account_id, setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#gstech_id', customer.gstech_id, setAttr, bool);
            setCustomerData('#first_name', customer.first_name, setAttr, bool);
            setCustomerData('#middle_name', customer.middle_name, setAttr, bool);
            setCustomerData('#last_name', customer.last_name, setAttr, bool);
            setCustomerData('#birthdate', customer.birthdate, setAttr, bool);
            
            setCustomerData('#billing_day', account.billing_day, setAttr, bool);
            setCustomerData('#start_date', account.start_date, setAttr, bool);
            setCustomerData('#lockin_end_date', account.lockin_end_date, setAttr, bool);
            setCustomerData('#bill_count', account.bill_count, setAttr, bool);
    
            setCustomerData('#install_type_id', installation.install_type_id, setAttr, bool);
            setCustomerData('#installation_balance', installation.installation_balance, setAttr, bool);
        }

        // Form Submits -- onclick Triggers
        edit_customer.onclick = (e) => {
            e.preventDefault();
            $('#save-customer-btn').attr('disabled', false);
            $('#edit-customer').attr('disabled', true);
            toggleInputData('disabled', false);
            setDropdownData();
        };
        
      }
    });
}

async function updateCustomerData() {
    const billing_address = $('#billing_address').val();
    const mobile_number = $('#mobile_number').val();
    const email = $('#email').val();

    const plan_id = $('#plan_id').val();
    const connection_id = $('#connection_id').val();
    const account_status_id = $('#account_status_id').val();
    const area_id = $('#area_id').val();

    const account_id = $('#account_id').val();

    let url = DIR_API + 'customer/update.php';
    const updateCustomerResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id,
            'billing_address' : billing_address,
            'mobile_number' : mobile_number,
            'email' : email
        })
    });
    
    url = DIR_API + 'account/update.php';
    const updateAccountResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id,
            'plan_id' : plan_id,
            'connection_id' : connection_id,
            'account_status_id' : account_status_id,
            'area_id' : area_id
        })
    });

    const customer_content = await updateCustomerResponse.json();
    const account_content = await updateAccountResponse.json();

    if (customer_content.message == 'Customer Updated' && account_content.message == 'success') {
        $("#modalDialogScrollable").modal('hide');
        toastr.success('Customer Updated Successfully.');
    }
    else {
        $("#modalDialogScrollable").modal('hide');
        toastr.error(account_content.message + " " + customer_content.message);
    }
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
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function displayConnection() {
    let url = DIR_API + 'connection/read.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function displayAccountStatus() {
    let url = DIR_API + 'statuses/read.php?status_table=account_status';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
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
    const plan = await displayPlan;
    for (var i = 0; i < plan.length; i++) {
        var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
        $("#plan_id").append(opt);
    }

    const connection = await displayConnection;
    for (var i = 0; i < connection.length; i++) {
        var opt = `<option value='${connection[i].connection_id}'>${connection[i].connection_name}</option>`;
        $("#connection_id").append(opt);
    }

    const account_status = await displayAccountStatus;
    for (var i = 0; i < account_status.length; i++) {
        var opt = `<option value='${account_status[i].status_id}'>${account_status[i].status_name}</option>`;
        $("#account_status_id").append(opt);
    }

    const area = await displayArea();
    for (var i = 0; i < area.length; i++) {
        var opt = `<option value='${area[i].area_id}'>${area[i].area_name}</option>`;
        $("#area_id").append(opt);
    }

    const install_type = await displayInstallation();
    for (var i = 0; i < install_type.length; i++) {
        var opt = `<option value='${install_type[i].install_type_id}'>${install_type[i].install_type_name}</option>`;
        $("#install_type_id").append(opt);
    }
}

function setAddCustomerPage () {
    const add_customer = document.getElementById('add-customer');

    getID().then(result => {
        $("#account_id").attr("value", result);
    });

    // displayPlan();
    // displayConnection();
    // displayAccountStatus();
    // displayArea();
    // displayInstallation();
    setAddDropdown();

    // Form Submits -- onclick Triggers
    add_customer.onsubmit = (e) => {
        e.preventDefault();
        addCustomer();
    };
}
