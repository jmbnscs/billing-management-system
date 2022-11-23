// On Boot Load
const edit_plan = document.getElementById('edit-plan');
const save_plan = document.getElementById('save-plan');

$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/plans_add.php') {
        if(sessionStorage.getItem("user_id") == 4 || 
            sessionStorage.getItem("user_id") == 5 || 
            sessionStorage.getItem("user_id") == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
        setAddPlanPage();
        }
    }
    else {
        if (sessionStorage.getItem("save_message") == "Plan Updated Successfully.") {
            toastr.success(sessionStorage.getItem("save_message"));
            sessionStorage.removeItem("save_message");
        }

        $("#modalDialogScrollable").on("hidden.bs.modal", function () {
            $('#save-plan-btn').attr('disabled', true);
        });

        getPlans();
        setModal();

        if ((sessionStorage.getItem('user_id') == 2) || (sessionStorage.getItem('user_id') == 3)) {
            $('#edit-plan').attr('disabled', false);
        }

        save_plan.onsubmit = (e) => {
            e.preventDefault();
            updatePlanData();
        };
    }
});

async function addPlan() {
    const plan_name = $('#plan_name').val();

    const bandwidth = $('#bandwidth').val();
    const price = $('#price').val();

    const inclusion = $('#inclusion').val();

    let url = DIR_API + 'plan/create.php';
    const addPlanResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'plan_name' : plan_name,
            'bandwidth' : bandwidth,
            'price' : price
        })
    });
    const plan_content = await addPlanResponse.json();

    let promo_content = {};
    if(inclusion.length > 0) {
        url = DIR_API + 'plan/read.php';
        let readPlanResponse;
        try {
            let res = await fetch(url);
            readPlanResponse = await res.json();
        } catch (error) {
            console.log(error);
        }
        const plan_id = readPlanResponse.slice(-1).pop()['plan_id'];
    
        let addPromoResponse;
        url = DIR_API + 'promo/create.php';
        for(let i = 0; i < inclusion.length; i++) {
            addPromoResponse = await fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    'plan_id' : plan_id,
                    'inclusion_id' : inclusion[i]
                })
            });
        }
        promo_content = await addPromoResponse.json();
    }

    if ((plan_content.message == 'Plan Created' && promo_content.message == 'Promo Created') 
        && (logActivity('Created Plan' + " - " + plan_name, 'Add New Plan'))
        || (plan_content.message == 'Plan Created' && inclusion.length == 0)) {
        toastr.success('Plan Created Successfully.');
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
    else {
        toastr.error(plan_content.message + " " + promo_content.message);
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

// View Plan JS
async function getPlans () {
    let url = DIR_API + 'views/plan.php';
    let plan_data;
    var t = $('#plan-table').DataTable();
    try {
        let res = await fetch(url);
        plan_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < plan_data.length; i++) {
        var tag;
        if (plan_data[i].status == 'ACTIVE') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${plan_data[i].plan_name}</a></th>
                <td>${plan_data[i].bandwidth} mbps</td>
                <td>&#8369; ${plan_data[i].price}</a></td>
                <td>${plan_data[i].inclusions}</td>
                <td><span class="badge ${tag}">${plan_data[i].status}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalDialogScrollable" data-bs-whatever="${plan_data[i].plan_id}" id="edit-modal-btn"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }
}

async function setModal () {
    var exampleModal = document.getElementById('modalDialogScrollable')
    exampleModal.addEventListener('show.bs.modal', function (event) {

      // Button that triggered the modal
      var button = event.relatedTarget;

      // Extract info from data-bs-* attributes
      var recipient = button.getAttribute('data-bs-whatever');

      setName(recipient);
    
      async function setName (plan_id) {

        let url = DIR_API + 'plan/read_single.php?plan_id=' + plan_id;
        let plan;
            try {
                let res = await fetch(url);
                plan = await res.json();
            } catch (error) {
                console.log(error);
            }

        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = plan.plan_name;
        //   modalBodyInput.value = recipient

        const plan_status = await fetchData('statuses/read.php?status_table=plan_status');
        const inclusion = await fetchData('inclusion/read.php');
        const promo = await fetchData('promo/read.php');

        toggleInputData('disabled', true);
        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        async function setDefaultDropdown () {
            for (var i = 0; i < plan_status.length; i++) {
                if (plan_status[i].status_id == plan.plan_status_id) {
                    var opt = `<option value='${plan_status[i].status_id}'>${plan_status[i].status_name}</option>`;
                    $("#plan_status_id").append(opt);
                }
            }

            let promo_exists = false;
            $("#inclusion").empty();
            for (var i = 0; i < promo.length; i++) {
                if (plan_id == promo[i].plan_id) {
                    for (var j = 0; j < inclusion.length; j++) {
                        if (promo[i].inclusion_id == inclusion[j].inclusion_id) {
                            var opt = `<option selected value='${inclusion[j].inclusion_id}'>${inclusion[j].inclusion_name}</option>`;
                            $("#inclusion").append(opt);
                            $("#inclusion").selectpicker("refresh");
                        }
                    }
                    promo_exists = true;
                }
            }
            if(promo_exists == false) {
                $("#inclusion").selectpicker("refresh");
                var opt = `<option selected></option>`;
                $("#inclusion").append(opt);
            }
        }

        async function setDropdownData () {
            $("#plan_status_id").empty();
            $("#plan_status_id").append(`<option selected disabled value="">Choose Plan Status:</option>`);
            for (var i = 0; i < plan_status.length; i++) {
                if (plan_status[i].status_id == plan.plan_status_id) {
                    var opt = `<option selected value='${plan_status[i].status_id}' style='color: blue'>${plan_status[i].status_name}</option>`;
                }
                else {
                    var opt = `<option value='${plan_status[i].status_id}'>${plan_status[i].status_name}</option>`;
                }
                $("#plan_status_id").append(opt);
            }

            var check_promo = new Array();
            let promo_exists = false;
            $("#inclusion").empty();

            // Selected options
            for (var i = 0; i < promo.length; i++) {
                if (plan_id == promo[i].plan_id) {
                    for (var j = 0; j < inclusion.length; j++) {
                        if (promo[i].inclusion_id == inclusion[j].inclusion_id) {
                            var opt = `<option selected value='${inclusion[j].inclusion_id}'>${inclusion[j].inclusion_name}</option>`;
                            $("#inclusion").append(opt);
                            $("#inclusion").selectpicker("refresh");
                            check_promo.push(inclusion[j].inclusion_id);
                        }
                    }
                    promo_exists = true;
                }
            }

            // Not selected options
            for (var i = 0; i < promo.length; i++) {
                if (plan_id == promo[i].plan_id) {
                    for (var j = 0; j < inclusion.length; j++) {
                        if (!check_promo.includes(inclusion[j].inclusion_id)) {
                            var opt = `<option value='${inclusion[j].inclusion_id}'>${inclusion[j].inclusion_name}</option>`;
                            $("#inclusion").append(opt);
                            $("#inclusion").selectpicker("refresh");
                            check_promo.push(inclusion[j].inclusion_id);
                        }
                    }
                    promo_exists = true;
                }
            }    

            // No inclusions selected
            if(promo_exists == false) {
                for (var i = 0; i < inclusion.length; i++) {
                    var opt = `<option value='${inclusion[i].inclusion_id}'>${inclusion[i].inclusion_name}</option>`;
                    $("#inclusion").append(opt);
                    $("#inclusion").selectpicker("refresh");
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleInputData (setAttr, bool) {
            setCustomerData('#plan_name', plan.plan_name, setAttr, bool);
            setCustomerData('#bandwidth', plan.bandwidth, setAttr, bool);
            setCustomerData('#price', plan.price, setAttr, bool);
            setCustomerData('#plan_status_id', plan.plan_status_id, setAttr, bool);
            
            for(var i = 0; i < inclusion.length; i++) {
                setCustomerData('#inclusion', inclusion[i].inclusion_id, setAttr, bool);
            }
        
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#plan_id', plan.plan_id, setAttr, bool);
        }

        // Form Submits -- onclick Triggers
        edit_plan.onclick = (e) => {
            e.preventDefault();
            $('#save-plan-btn').attr('disabled', false);
            $('#edit-plan').attr('disabled', true);
            toggleInputData('disabled', false);
            setDropdownData();
        };
        
      }
    });
}

async function updatePlanData() {
    const plan_id = $('#plan_id').val();
    const plan_name = $('#plan_name').val();
    const bandwidth = $('#bandwidth').val();
    const price = $('#price').val();
    const plan_status_id = $('#plan_status_id').val();

    const inclusion = $('#inclusion').val();

    // Initialize Inclusion Variables
    const inclusion_data = await fetchData('inclusion/read.php');
    const existing_data = await fetchData('views/plan_inclusions.php?plan_id=' + plan_id);

    let inclusion_code = new Array ();
    let compare_data = new Array ();
    let inc_promo_id = new Array ();
    let inc_inclusion_id = new Array ();
    let to_delete = new Array ();
    let to_create = new Array ();

    let deletePromoResponse;
    let createPromoResponse;
    let updatePlanResponse;
    let deletePromoMessage;
    let createPromoMessage;

    if(inclusion) {
        for(var i = 0; i < inclusion.length; i++) {
            for(var j = 0; j < inclusion_data.length; j++) {
                if((inclusion[i] == inclusion_data[j].inclusion_id) && (!inclusion_code.includes(inclusion_data[j].inclusion_code))) {
                    inclusion_code.push(inclusion_data[j].inclusion_code);
                }
            }
        }
    }

    for (var i = 0; i < existing_data.length; i++) {
        compare_data.push(existing_data[i].inclusion_code);
    }

    // Displays Old and New Selected Data
    // console.log("Existing Data: " + compare_data);
    // console.log("New Data: " + inclusion_code);

    // Inclusion Conditions
    if (compare_data.length > inclusion_code.length) {
        to_delete = compare_data.filter(x => !inclusion_code.includes(x));

        let counter = compare_data.length;
        let temp =  compare_data;

        for (var i = 0; i < counter; i++) {
            for (var j = 0; j < temp.length; j++) {
                if (to_delete[i] == temp[j]) {
                    var index = compare_data.indexOf(temp[j]);
                    compare_data.splice(index, 1); 
                }
            }
        }

        to_create = inclusion_code.filter(x => !compare_data.includes(x));
        for (var i = 0; i < to_create.length; i++) {
            compare_data.push(to_create[i]);
        }
    }
    else if (compare_data.length < inclusion_code.length) {
        to_create = inclusion_code.filter(x => !compare_data.includes(x));

        for (var i = 0; i < to_create.length; i++) {
            compare_data.push(to_create[i]);
        }

        to_delete = compare_data.filter(x => !inclusion_code.includes(x));

        for (var i = 0; i < to_delete.length; i++) {
            var index = compare_data.indexOf(to_delete[i]);
            compare_data.splice(index, 1); 
        }
    }
    else {
        to_delete = compare_data.filter(x => !inclusion_code.includes(x));

        for (var i = 0; i < to_delete.length; i++) {
            var index = compare_data.indexOf(to_delete[i]);
            compare_data.splice(index, 1); 
        }

        to_create = inclusion_code.filter(x => !compare_data.includes(x));
        
        for (var i = 0; i < to_create.length; i++) {
            compare_data.push(to_create[i]);
        }
    }

    // console.log("After condition: " + compare_data);

    // console.log("To Delete: " + to_delete);
    if (to_delete) {
        for(var i = 0; i < to_delete.length; i++) {
            for(var j = 0; j < existing_data.length; j++) {
                if((to_delete[i] == existing_data[j].inclusion_code) && (!inc_promo_id.includes(existing_data[j].promo_id))) {
                    inc_promo_id.push(existing_data[j].promo_id);
                }
            }
        }

        for(var i = 0; i < to_delete.length; i++) {
            // console.log(i+1 + ". Delete: " + to_delete[i]);
            // console.log(i+1 + ". Promo_id: " + inc_promo_id[i]);

            let url = DIR_API + 'promo/delete.php';
            deletePromoResponse = await fetch(url, {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    'promo_id' : inc_promo_id[i]
                })
            });
            const promo_delete_content = await deletePromoResponse.json();
            deletePromoMessage = promo_delete_content.message;
        }

        if(to_delete.length == 0) {
            deletePromoMessage = "Promo Deleted";
        }
    }

    // console.log("To Create: " + to_create);
    if(to_create) {
        for(var i = 0; i < to_create.length; i++) {
            for(var j = 0; j < inclusion_data.length; j++) {
                if((to_create[i] == inclusion_data[j].inclusion_code) && (!inc_inclusion_id.includes(inclusion_data[j].inclusion_id))) {
                    inc_inclusion_id.push(inclusion_data[j].inclusion_id);
                }
            }
        }

        for(var i = 0; i < to_create.length; i++) {
            // console.log(i+1 + ". Create: " + to_create[i]);
            // console.log(i+1 + ". Inclusion_id: " + inc_inclusion_id[i]);

            let url = DIR_API + 'promo/create.php';
            createPromoResponse = await fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    'plan_id' : plan_id,
                    'inclusion_id' : inc_inclusion_id[i]
                })
            });
            const promo_create_content = await createPromoResponse.json();
            createPromoMessage = promo_create_content.message;
        }

        if(to_create.length == 0) {
            createPromoMessage = "Promo Created";
        }
    }

    let url = DIR_API + 'plan/update.php';
    updatePlanResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'plan_id' : plan_id,
            'plan_name' : plan_name,
            'bandwidth' : bandwidth,
            'price' : price,
            'plan_status_id' : plan_status_id
        })
    });

    const plan_content = await updatePlanResponse.json();

    if ((plan_content.message == 'Plan Updated') && (deletePromoMessage == 'Promo Deleted') 
        && (createPromoMessage == 'Promo Created') && (logActivity('Updated Plan' + " - " + plan_name, 'View Plans'))) {
        sessionStorage.setItem('save_message', "Plan Updated Successfully.");
        window.location.reload();
    }
    else {
        toastr.error("Plan was not updated." + plan_content.message + " " + deletePromoMessage + " " + createPromoMessage);
    }
}

async function setAddDropdown() {
    const inclusion = await fetchData('inclusion/read.php');
    for (var i = 0; i < inclusion.length; i++) {
        var opt = `<option value='${inclusion[i].inclusion_id}'>${inclusion[i].inclusion_name}</option>`;
        $("#inclusion").append(opt);
        $("#inclusion").selectpicker("refresh");
    }
}

function setAddPlanPage () {
    const add_plan = document.getElementById('add-plan');

    setAddDropdown();

    // Form Submits -- onclick Triggers
    add_plan.onsubmit = (e) => {
        e.preventDefault();
        addPlan();
    };
}


