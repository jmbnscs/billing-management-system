$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/plans_add') {
        restrictPages('plan-add');
        setAddPlanPage();
    }
    else {
        restrictPages('plan-page');
        displaySuccessMessage();
        setPlansPage();
        restrictFunctions('plans');
    }
});

// -------------------------------------------------------------------- View Plan Page
async function setPlansPage () {
    const [plan_data, inclusion, statuses] = await Promise.all ([fetchData('views/plan.php'), fetchData('inclusion/read.php'), fetchData('statuses/read.php?status_table=plan_status')]);

    var tag;

    var active_table = $('#active-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    var deact_table = $('#deactivated-table').DataTable( {
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });
    
    for (var i = 0; i < inclusion.length; i++) {
        var opt = `<option value='${inclusion[i].inclusion_name}'>${inclusion[i].inclusion_name}</option>`;
        $("#active-inclusions-filter").append(opt);
        $("#deact-inclusions-filter").append(opt);
    }

    var active_counter = 1, deact_counter = 1;

    for (var i = 0; i < plan_data.length; i++) {
        (plan_data[i].status == 'ACTIVE') ? tag = 'bg-success' : tag = 'bg-danger';

        if (plan_data[i].status == 'ACTIVE') {
            active_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${active_counter}</th>
                <td data-label="Plan Name">${plan_data[i].plan_name}</td>
                <td data-label="Bandwidth">${plan_data[i].bandwidth} mbps</td>
                <td data-label="Price">&#8369; ${plan_data[i].price}</td>
                <td data-label="Inclusions">${plan_data[i].inclusions}</td>
                <td data-label="Status"><span class="badge ${tag}">${plan_data[i].status}</span></td>
                <td data-label="View"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-plans" data-bs-whatever="${plan_data[i].plan_id}" id="edit-modal-btn"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
            `)).draw(false);

            active_counter++;
        }
        else {
            deact_table.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;">${deact_counter}</th>
                <td data-label="Plan Name">${plan_data[i].plan_name}</td>
                <td data-label="Bandwidth">${plan_data[i].bandwidth} mbps</td>
                <td data-label="Price">&#8369; ${plan_data[i].price}</td>
                <td data-label="Inclusions">${plan_data[i].inclusions}</td>
                <td data-label="Status"><span class="badge ${tag}">${plan_data[i].status}</span></td>
                <td data-label="View"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-plans" data-bs-whatever="${plan_data[i].plan_id}" id="edit-modal-btn"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
            `)).draw(false);

            deact_counter++;
        }
        
    }

    $("#active-table_filter.dataTables_filter").append($("#active-inclusions-filter"));
    $("#deactivated-table_filter.dataTables_filter").append($("#deact-inclusions-filter"));
    // $("#active-table_filter.dataTables_filter").append($("#status-filter"));

    // var inclusionsIndex = 0, statusIndex = 0;
    // $("#active-table th").each(function (i) {
    //     if ($($(this)).html() == "Inclusion") {
    //         inclusionsIndex = i; return false;
    //     }
    // });

    // $("#deactivated-table th").each(function (i) {
    //     if ($($(this)).html() == "Inclusion") {
    //         inclusionsIndex = i; return false;
    //     }
    // });

    // $("#active-table th").each(function (i) {
    //     if ($($(this)).html() == "Status") {
    //         statusIndex = i; return false;
    //     }
    // });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'active-table'){
                return true;
            }

            var selectedItem = $('#active-inclusions-filter').val()
            var category = data[4];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            if (settings.nTable.id !== 'deactivated-table'){
                return true;
            }

            var selectedItem = $('#deact-inclusions-filter').val()
            var category = data[4];
            if (selectedItem === "" || category.includes(selectedItem)) {
            return true;
            }
            return false;
        }
    );

    // $.fn.dataTable.ext.search.push(
    //     function (settings, data, dataIndex) {
    //         var selectedItem = $('#status-filter').val()
    //         var category = data[statusIndex];
    //         if (selectedItem === "" || category.includes(selectedItem)) {
    //         return true;
    //         }
    //         return false;
    //     }
    // );

    $("#active-inclusions-filter").change(function (e) {
        active_table.draw();
    });

    $("#deact-inclusions-filter").change(function (e) {
        deact_table.draw();
    });
    // $("#status-filter").change(function (e) {
    //     t.draw();
    // });

    active_table.draw();
    deact_table.draw();

    setViewModal();
    setAddPlanPage();
    
    async function setViewModal () {
        $("#view-plans").on("hidden.bs.modal", function () {
            $('#edit-plan').attr('disabled', false);
            $('#save-plan-btn').attr('disabled', true);
        });
    
        var updateModal = document.getElementById('view-plans')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var plan_id = button.getAttribute('data-bs-whatever');
            const plan = await fetchData('plan/read_single.php?plan_id=' + plan_id);
    
            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = plan.plan_name;
    
            const [plan_status, inclusion, promo] = await Promise.all ([fetchData('statuses/read.php?status_table=plan_status'), fetchData('inclusion/read.php'), fetchData('promo/read.php')]);
    
            $('#plan_id').val(plan_id);
            $('#plan_name').val(plan.plan_name);
            $('#bandwidth').val(plan.bandwidth);
            $('#price').val(plan.price);
    
            toggleInputData('disabled', true);
            setDefaultDropdown();
    
            function toggleInputData (setAttr, bool) {
                $('#plan_name').attr(setAttr, bool);
                $('#bandwidth').attr(setAttr, bool);
                $('#price').attr(setAttr, bool);
                $('#plan_status_id').attr(setAttr, bool);
                $('#inclusion').attr(setAttr, bool);
            }
    
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
    
            const edit_plan = document.getElementById('edit-plan');
            edit_plan.onclick = (e) => {
                e.preventDefault();
                $('#save-plan-btn').attr('disabled', false);
                $('#edit-plan').attr('disabled', true);
                toggleInputData('disabled', false);
                setDropdownData();
            };
    
            const save_plan = document.getElementById('save-plan');
            save_plan.onsubmit = (e) => {
                e.preventDefault();
                checkValidity();
            };
    
            var req_elem = document.getElementById('save-plan').querySelectorAll("[required]");

            async function checkValidity() {
                resetElements();
                var counter = 0;
                
                for (var i = 0; i < req_elem.length; i++) {
                    if (req_elem[i].value == '') {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        counter++;
                    }
                    else {
                        console.log(DIR_API)
                        if (req_elem[i].id == 'plan_name') {
                            const plan_name = await fetchData('check/plan_name.php?plan_name=' + req_elem[i].value);
                            if (plan_name.exist && (modalTitle.textContent != req_elem[i].value)) {
                                console.log(modalTitle.textContent)
                                console.log(req_elem[i].value)
                                req_elem[i].classList.add('invalid-input');
                                req_elem[i].nextElementSibling.classList.add('d-block');
                                $(($('#' + req_elem[i].id).next()).text("Plan name already exist."));
                                counter++;
                            }
                            else if (!isNaN(req_elem[i].value) && req_elem[i].value) {
                                req_elem[i].classList.add('invalid-input');
                                req_elem[i].nextElementSibling.classList.add('d-block');
                                $(($('#' + req_elem[i].id).next()).text("Plan name must not be just numbers."));
                                counter++;
                            }
                            else {
                                showValid();
                            }
                        }
                        else if (req_elem[i].id == 'bandwidth') {
                            if (req_elem[i].value < 5) {
                                req_elem[i].classList.add('invalid-input');
                                req_elem[i].nextElementSibling.classList.add('d-block');
                                $(($('#' + req_elem[i].id).next()).text("Bandwidth must at least be 5 mbps."));
                                counter++;
                            }
                            else {
                                showValid();
                            }
                        }
                        else if (req_elem[i].id == 'price') {
                            if (req_elem[i].value < 1) {
                                req_elem[i].classList.add('invalid-input');
                                req_elem[i].nextElementSibling.classList.add('d-block');
                                $(($('#' + req_elem[i].id).next()).text('Plan price should at least be \u20B1 1.00'));
                                counter++;
                            }
                            else {
                                showValid();
                            }
                        }
                        else {
                            showValid();
                        }
        
                        function showValid() {
                            req_elem[i].classList.add('valid-input');
                        }
                    }
                } 
        
                if (counter > 0) {
                    toastr.warning('Please provide the appropriate details on each field.');
                }
                else {
                    processUpdate();
                }
            }

            function resetElements() {
                for (var i = 0; i < req_elem.length; i++) {
                    $('#' + req_elem[i].id).removeClass('valid-input');
                    $('#' + req_elem[i].id).removeClass('invalid-input');
                    $(($('#' + req_elem[i].id).next()).removeClass('d-block'));
                }
            }

            async function processUpdate() {
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
    
                        let delete_data = JSON.stringify({
                            'promo_id' : inc_promo_id[i]
                        });
    
                        const promo_delete_content = await deleteData('promo/delete.php', delete_data);
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
    
                        let create_data = JSON.stringify({
                            'plan_id' : plan_id,
                            'inclusion_id' : inc_inclusion_id[i]
                        });
    
                        const promo_create_content = await createData('promo/create.php', create_data);
                        createPromoMessage = promo_create_content.message;
                    }
            
                    if(to_create.length == 0) {
                        createPromoMessage = "Promo Created";
                    }
                }
    
                const update_data = JSON.stringify({
                    'plan_id' : plan_id,
                    'plan_name' : plan_name,
                    'bandwidth' : bandwidth,
                    'price' : price,
                    'plan_status_id' : plan_status_id
                });
    
                const [plan_content, log] = await Promise.all ([updateData('plan/update.php', update_data), logActivity('Updated Plan' + " - " + plan_name, 'View Plans')])
            
                if ((plan_content.message == 'Plan Updated') && (deletePromoMessage == 'Promo Deleted') 
                    && (createPromoMessage == 'Promo Created') && log) {
                    sessionStorage.setItem('save_message', "Plan Updated Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Plan was not updated." + plan_content.message + " " + deletePromoMessage + " " + createPromoMessage);
                }
            }
        });
    }
} 
// End View Plan Page

// -------------------------------------------------------------------- Add Plan 
async function setAddPlanPage () {
    const add_plan = document.getElementById('add-plan');

    setAddDropdown();

    add_plan.onsubmit = (e) => {
        e.preventDefault();
        checkValidity();
    };

    var req_elem = document.getElementById('add-plan').querySelectorAll("[required]");

    async function checkValidity() {
        resetElements();
        var counter = 0;
        
        for (var i = 0; i < req_elem.length; i++) {
            if (req_elem[i].value == '') {
                req_elem[i].classList.add('invalid-input');
                req_elem[i].nextElementSibling.classList.add('d-block');
                counter++;
            }
            else {
                if (req_elem[i].id == 'plan_name_add') {
                    const plan_name = await fetchData('check/plan_name.php?plan_name=' + req_elem[i].value);
                    if (plan_name.exist) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Plan name already exist."));
                        counter++;
                    }
                    else if (!isNaN(req_elem[i].value) && req_elem[i].value) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Plan name must not be just numbers."));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'bandwidth_add') {
                    if (req_elem[i].value < 5) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text("Bandwidth must at least be 5 mbps."));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else if (req_elem[i].id == 'price_add') {
                    if (req_elem[i].value < 1) {
                        req_elem[i].classList.add('invalid-input');
                        req_elem[i].nextElementSibling.classList.add('d-block');
                        $(($('#' + req_elem[i].id).next()).text('Plan price should at least be \u20B1 1.00'));
                        counter++;
                    }
                    else {
                        showValid();
                    }
                }
                else {
                    showValid();
                }

                function showValid() {
                    req_elem[i].classList.add('valid-input');
                }
            }
        } 

        if (counter > 0) {
            toastr.warning('Please provide the appropriate details on each field.');
        }
        else {
            processCreate();
        }
    }

    function resetElements() {
        for (var i = 0; i < req_elem.length; i++) {
            $('#' + req_elem[i].id).removeClass('valid-input');
            $('#' + req_elem[i].id).removeClass('invalid-input');
            $(($('#' + req_elem[i].id).next()).removeClass('d-block'));
        }
    }

    async function processCreate() {
        const plan_name = $('#plan_name_add').val();
        const bandwidth = $('#bandwidth_add').val();
        const price = $('#price_add').val();
        const inclusion = $('#inclusion_add').val();

        const create_data = JSON.stringify({
            'plan_name' : plan_name,
            'bandwidth' : bandwidth,
            'price' : price
        });

        const [plan_content, log] = await Promise.all ([createData('plan/create.php', create_data), logActivity('Created Plan' + " - " + plan_name, 'Add New Plan')]);

        console.log(inclusion);
    
        let promo_content, promo_success;
        if(inclusion != null) {
            let readPlanResponse = await fetchData('plan/read.php');
            const plan_id = readPlanResponse.slice(-1).pop()['plan_id'];
        
            for(let i = 0; i < inclusion.length; i++) {
                let promo_data = JSON.stringify({
                    'plan_id' : plan_id,
                    'inclusion_id' : inclusion[i]
                });

                promo_content = await createData('promo/create.php', promo_data);
            }

            if (promo_content.message == 'Promo Created') {
                promo_success = true;
            }
            else {
                promo_success = false;
            }
        }
        else {
            promo_success = true;
        }
    
        if ((plan_content.success && promo_success) && log) {
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

    async function setAddDropdown() {
        const inclusion = await fetchData('inclusion/read.php');
        for (var i = 0; i < inclusion.length; i++) {
            var opt = `<option value='${inclusion[i].inclusion_id}'>${inclusion[i].inclusion_name}</option>`;
            $("#inclusion_add").append(opt);
            $("#inclusion_add").selectpicker("refresh");
        }
    }
}
// End Add Plan 