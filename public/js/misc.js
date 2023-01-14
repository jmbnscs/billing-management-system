$(document).ready(function () {
    isDefault();
    restrictPages('misc-page');
    displaySuccessMessage();
    // setButtons();

    if (DIR_CUR == DIR_MAIN + 'views/options') {
        setConnectionPage();
        setConcernsPage();
        setInclusionPage();
        setAreaPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/concerns') {
        setConcernsPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/user_level') {
        setUserLevelPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/area') {
        setAreaPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/inclusions') {
        setInclusionPage();
    }
});

async function getData(api) {
    let url = DIR_API + api + '/read.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function setTable(api, table_name) {
    let data = await getData(api);
    let id = new Array(), info = new Array(), counter = 1;

    for (var i = 0; i < data.length; i++) {
        for (var item in data[i]) {
            (counter % 2 !== 0) ? id.push(data[i][item]) : info.push(data[i][item]);
            counter++;
        }
    }

    var edit_modal_id = '', delete_modal_id = '';

    if (table_name == '#connections-table') {
        edit_modal_id = '#connEditModal';
        delete_modal_id = '#connDeleteModal';
    }
    else if (table_name == '#areas-table') {
        edit_modal_id = '#areaEditModal';
        delete_modal_id = '#areaDeleteModal';
    }

    var t = $(table_name).DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row">${i+1}</th>
                <td>${info[i]}</td>
                <td>
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="${edit_modal_id}" data-bs-whatever="${id[i]}" ><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="${delete_modal_id}" data-bs-whatever="${id[i]}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }
}

// -------------------------------------------------------------------- Connection Page
function setConnectionPage() {
    setTable('connection', '#connections-table');

    create_fn = document.getElementById('conn-create-new');
    create_fn.onsubmit = async (e) => {
        e.preventDefault();
        const result = await fetchData('check/connection_name.php?connection_name=' + $('#connection_name').val());
        if (result.exist) {
            toastr.error(result.error);
            $('#connection_name').val(null);
        }
        else {
            processCreate();
        }
    };

    var updateModal = document.getElementById('connEditModal');
    updateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var connection_id = button.getAttribute('data-bs-whatever');
        let connection = await fetchData('connection/read_single.php?connection_id=' + connection_id);

        var modalTitle = updateModal.querySelector('.modal-title');
        modalTitle.textContent = 'Update Connection Type?';

        $('#connection_id').val(connection_id);
        $('#connection_name_md').val(connection.connection_name);

        update_fn = document.getElementById('conn-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            processUpdate();
        };

        async function processUpdate() {
            const update_data = JSON.stringify({
                'connection_id' : connection_id,
                'connection_name' : $('#connection_name_md').val()
            });

            const [content, log] = await Promise.all ([updateData('connection/update.php', update_data), logActivity('Updated Connection # ' + connection_id, 'Connection - Overview')]);
        
            if (content.message == 'Connection Updated' && log) {
                sessionStorage.setItem('save_message', "Connection Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Connection was not updated.");
            }
        }
    });

    var deleteModal = document.getElementById('connDeleteModal');
    deleteModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var connection_id = button.getAttribute('data-bs-whatever');
        let connection = await fetchData('connection/read_single.php?connection_id=' + connection_id);

        var modalTitle = deleteModal.querySelector('.modal-title');
        modalTitle.textContent = "Delete " + connection.connection_name + "?";

        $('#connection_id_d').val(connection_id);
        $('#connection_name_md_d').val(connection.connection_name);
        
        delete_fn = document.getElementById('conn-delete-data');
        delete_fn.onsubmit = (e) => {
            e.preventDefault();
            processDelete();
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'connection_id' : connection_id
            });

            const [content, log] = await Promise.all ([deleteData('connection/delete.php', delete_data), logActivity('Deleted Connection # ' + connection_id, 'Connection - Overview')]);
            
            if (content.message == 'Connection Deleted' && log) {
                sessionStorage.setItem('save_message', "Connection Deleted Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Connection was not deleted.");
            }
        }
    });
    
    async function processCreate() {
        const create_data = JSON.stringify({
            'connection_name' : $('#connection_name').val()
        });

        const [content, log] = await Promise.all ([createData('connection/create.php', create_data), logActivity('Created new Connection - ' + $('#connection_name').val(), 'Connection - Add Connection')]);
    
        if (content.message = 'Connection Created' && log) {
            toastr.success('Connection Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/options');
             }, 2000);
        }
        else {
            toastr.error("Connection was not created.");
        }
    }
}
// End of Connection Page

// -------------------------------------------------------------------- Concerns Page
async function setConcernsPage() {
    create_fn = document.getElementById('concerns-create-new');
    create_fn.onsubmit = async (e) => {
        e.preventDefault();
        const result = await fetchData('check/concern_category.php?concern_category=' + $('#concern_category').val());
        if (result.exist) {
            toastr.error(result.error);
            $('#concern_category').val(null);
        }
        else {
            processCreate();
        }
    };

    let concern_data = await getData('concerns');
    var t = $('#concern-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });
    
    for (var i = 0; i < concern_data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${concern_data[i].concern_category}</td>
                <td>
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#concernsEditModal" data-bs-whatever="${concern_data[i].concern_id}" ><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#concernsDeleteModal" data-bs-whatever="${concern_data[i].concern_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }

    var updateModal = document.getElementById('concernsEditModal')
    updateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var concern_id = button.getAttribute('data-bs-whatever');
        let concern_data = await fetchData('concerns/read_single.php?concern_id=' + concern_id);

        var modalTitle = updateModal.querySelector('.modal-title');
        modalTitle.textContent = 'Update Concern Category?';

        // (concern_data.customer_access == 0) ? $('#customer_access_md').attr('checked', 0) : $('#customer_access_md').attr('checked', 1);
        $('#concern_id').val(concern_data.concern_id);
        $('#concern_category_md').val(concern_data.concern_category);

        update_fn = document.getElementById('concerns-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            processUpdate();
        };

        // let customer_switch_md;
        // $('#customer_access_md').on('change', function() {
        //     customer_switch_md = $(this).is(':checked');
        // });

        async function processUpdate() {
            // let customer_access;
            // (customer_switch_md) ? customer_access = 1 : customer_access = 0;

            const update_data = JSON.stringify({
                'concern_id' : concern_id,
                'concern_category' : $('#concern_category_md').val(),
                'customer_access' : '1'
            });

            const [content, log] = await Promise.all ([updateData('concerns/update.php', update_data), logActivity('Updated Concern # ' + concern_id, 'Concerns - Overview')]);
        
            if (content.message == 'Concern Updated' && log) {
                sessionStorage.setItem('save_message', "Concern Category Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Concern Category was not updated.");
            }
        }

        // function toggleSwitch(bool) {
        //     $('#customer_access_md').attr('checked', bool);
        // }
    });

    var deleteModal = document.getElementById('concernsDeleteModal')
    deleteModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var concern_id = button.getAttribute('data-bs-whatever');
        let concern_data = await fetchData('concerns/read_single.php?concern_id=' + concern_id);

        var modalTitle = deleteModal.querySelector('.modal-title');
        modalTitle.textContent = "Delete " + concern_data.concern_category + "?";

        $('#concern_id_d').val(concern_id);
        $('#concern_category_md_d').val(concern_data.concern_category);
        (concern_data.customer_access == 0) ? $('#customer_access_md_d').attr('checked', false) : $('#customer_access_md_d').attr('checked', true);

        delete_fn = document.getElementById('concerns-delete-data');
        delete_fn.onsubmit = (e) => {
            e.preventDefault();
            processDelete();
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'concern_id' : concern_id
            });

            const [content, log] = await Promise.all ([deleteData('concerns/delete.php', delete_data), logActivity('Deleted Concern # ' + concern_id, 'Concerns - Overview')]);
            
            if (content.message == 'Concern Deleted' && log) {
                sessionStorage.setItem('save_message', "Concern Category Deleted Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Concern Category was not deleted.");
            }
        }

    });
    
    // let customer_switch;
    // $('#customer_access').on('change', function() {
    //     customer_switch = $(this).is(':checked');
    // });
    async function processCreate() {
        // let customer_access;
        // (customer_switch) ? customer_access = 1 : customer_access = 0;

        const create_data = JSON.stringify({
            'concern_category' : $('#concern_category').val(),
            'customer_access' : '1'
        });

        const [content, log] = await Promise.all ([createData('concerns/create.php', create_data), logActivity('Created new Concern Category - ' + $('#concern_category').val(), 'Concerns - Add Concern Category')]);
        
        if (content.message = 'Concern Created' && log) {
            toastr.success('Concern Category Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/options');
             }, 2000);
        }
        else {
            toastr.error("Concern Category was not created.");
        }
    }
}
// End of Concerns Page

// -------------------------------------------------------------------- Area Page
function setAreaPage() {
    setTable('area', '#areas-table');

    create_fn = document.getElementById('area-create-new');
    create_fn.onsubmit = async (e) => {
        e.preventDefault();
        const result = await fetchData('check/area_name.php?area_name=' + $('#area_name').val());
        if (result.exist) {
            toastr.error(result.error);
            $('#area_name').val(null);
        }
        else {
            processCreate();
        }
    };

    var updateModal = document.getElementById('areaEditModal')
    updateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var area_id = button.getAttribute('data-bs-whatever');
        let area_data = await fetchData('area/read_single.php?area_id=' + area_id);

        var modalTitle = updateModal.querySelector('.modal-title');
        modalTitle.textContent = 'Update Area?';

        $('#area_id').val(area_id);
        $('#area_name_md').val(area_data.area_name);

        update_fn = document.getElementById('area-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            processUpdate();
        };

        async function processUpdate() {
            const area_name = $('#area_name_md').val();

            const update_data = JSON.stringify({
                'area_id' : area_id,
                'area_name' : area_name
            }); 

            const [content, log] = await Promise.all ([updateData('area/update.php', update_data), logActivity('Updated Area # ' + area_id, 'Area - Overview')]);
        
            if (content.message == 'Area Updated' && log) {
                sessionStorage.setItem('save_message', "Area Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Area was not updated.");
            }
        }
    });

    var deleteModal = document.getElementById('areaDeleteModal')
    deleteModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var area_id = button.getAttribute('data-bs-whatever');
        let data = await fetchData('area/read_single.php?area_id=' + area_id);

        var modalTitle = deleteModal.querySelector('.modal-title');
        modalTitle.textContent = "Delete " + data.area_name + "?";

        $('#area_id_d').val(area_id);
        $('#area_name_md_d').val(data.area_name);

        delete_fn = document.getElementById('area-delete-data');
        delete_fn.onsubmit = (e) => {
            e.preventDefault();
            processDelete();
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'area_id' : area_id
            });

            const [content, log] = await Promise.all ([deleteData('area/delete.php', delete_data), logActivity('Deleted Area # ' + area_id, 'Area - Overview')]);
            
            if (content.message == 'Area Deleted' && log) {
                sessionStorage.setItem('save_message', "Area Deleted Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Area was not deleted.");
            }
        }
    });
    
    async function processCreate() {
        const area_name = $('#area_name').val();
        const create_data = JSON.stringify({
            'area_name' : area_name
        });

        const [content, log] = await Promise.all ([createData('area/create.php', create_data), logActivity('Created new Area - ' + $('#area_name').val(), 'Area - Add Area')]);
        
        if (content.message = 'Area Created' && log) {
            toastr.success('Area Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/options');
             }, 2000);
        }
        else {
            toastr.error('Area was not created.');
        }
    }
}
// End of Area Page

// -------------------------------------------------------------------- Inclusion Page
async function setInclusionPage() {
    create_fn = document.getElementById('inclusion-create-new');
    create_fn.onsubmit = async (e) => {
        e.preventDefault();
        const result = await fetchData('check/inclusion_name.php?inclusion_name=' + $('#inclusion_name').val());
        if (result.exist) {
            toastr.error(result.error);
            $('#inclusion_name').val(null);
        }
        else {
            processCreate();
        }
    };

    let data = await getData('inclusion');
    var t = $('#inclusions-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        "searching": true,
        "autoWidth": false
    });

    for (var i = 0; i < data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${data[i].inclusion_name}</td>
                <td>
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#inclusionEditModal" data-bs-whatever="${data[i].inclusion_id}" ><i class="bi bi-pencil"></i></button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#inclusionDeleteModal" data-bs-whatever="${data[i].inclusion_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }

    var updateModal = document.getElementById('inclusionEditModal')
    updateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var inclusion_id = button.getAttribute('data-bs-whatever');
        let data = await fetchData('inclusion/read_single.php?inclusion_id=' + inclusion_id);

        var modalTitle = updateModal.querySelector('.modal-title');
        modalTitle.textContent = 'Update Inclusion?';

        $('#inclusion_id').val(inclusion_id);
        $('#inclusion_name_md').val(data.inclusion_name);

        update_fn = document.getElementById('inclusion-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            processUpdate();
        };

        async function processUpdate() {
            const update_data = JSON.stringify({
                'inclusion_id' : inclusion_id,
                'inclusion_name' : $('#inclusion_name_md').val()
            });

            const [content, log] = await Promise.all ([updateData('inclusion/update.php', update_data), logActivity('Updated Inclusion # ' + inclusion_id, 'Inclusions - Overview')]);
        
            if (content.message == 'Inclusion Updated' && log) {
                sessionStorage.setItem('save_message', "Inclusion Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Inclusion was not updated.");
            }
        }
    });

    var deleteModal = document.getElementById('inclusionDeleteModal')
    deleteModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var inclusion_id = button.getAttribute('data-bs-whatever');
        let data = await fetchData('inclusion/read_single.php?inclusion_id=' + inclusion_id);

        var modalTitle = deleteModal.querySelector('.modal-title');
        modalTitle.textContent = "Delete " + data.inclusion_name + "?";

        $('#inclusion_id_d').val(inclusion_id);
        $('#inclusion_name_md_d').val(data.inclusion_name);

        delete_fn = document.getElementById('inclusion-delete-data');
        delete_fn.onsubmit = (e) => {
            e.preventDefault();
            processDelete();
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'inclusion_id' : inclusion_id
            });

            const [content, log] = await Promise.all ([deleteData('inclusion/delete.php', delete_data), logActivity('Deleted Inclusion # ' + inclusion_id, 'Inclusions - Overview')]);

            if (content.message == 'Inclusion Deleted' && log) {
                sessionStorage.setItem('save_message', "Inclusion Deleted Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Inclusion was not deleted.");
            }
        }
    });
    
    async function processCreate() {
        const inclusion_name = $('#inclusion_name').val();

        const create_data = JSON.stringify({
            'inclusion_name' : inclusion_name
        });

        const [content, log] = await Promise.all ([createData('inclusion/create.php', create_data), logActivity('Created new Inclusion - ' + $('#inclusion_name').val(), 'Inclusions - Add Inclusion')]);
        
        if (content.message = 'Inclusion Created' && log) {
            toastr.success('Inclusion Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/options');
             }, 2000);
        }
        else {
            toastr.error("Inclusion was not created.");
        }
    }
}
// End of Inclusion Page

// -------------------------------------------------------------------- User Level Page
async function setUserLevelPage() {
    // setButtons();
    const user_levels = await fetchData('user_level/read.php');

    const container = document.getElementById('user-role-body');

    for (var i = 1; i < user_levels.length; i++) {
        const descriptions = await fetchData('pages/get_descriptions.php?user_id=' + user_levels[i].user_id);
        const countUsers = await fetchData('views/admin_user_level.php?user_role=' + user_levels[i].user_role);
        const card = document.createElement('div');
        card.classList = 'card-body';

        const content = `
        <div class="col-sm-4 user-cards">
            <div class="card mt-3">
            <div class="card-body">
                <h5>${user_levels[i].user_role}</h5>
                <h6>Total users with this role: ${Object.keys(countUsers).length}</h6>
                <ul>
                    <li><i class="bi bi-check2-circle"></i> ${descriptions[0]}</li>
                    <li><i class="bi bi-check2-circle"></i> ${descriptions[1]}</li>
                    <li><i class="bi bi-check2-circle"></i> ${descriptions[2]}</li>
                    <li><i class="bi bi-check2-circle"></i> ${descriptions[3]}</li>
                    <li><i class="bi bi-check2-circle"></i> ${descriptions[4]}</li>
                    <li><i class="bi bi-check2-circle"></i> <em>and ${descriptions.length - 5} more.. </em></li>
                </ul>

                <a href="../views/user_level_data?user_role=${user_levels[i].user_role}" style="text-decorations:none; color:inherit;"><button class="btn btn-outline-success">View Role</button></a>
                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${user_levels[i].user_id}">Edit Role</button>
            </div>
            </div>
        </div>
        `;

        container.innerHTML += content;
    }

    const card = document.createElement('div');
    card.classList = 'card-body';

    const content = `
        <div class="col-sm-4 user-cards">
            <div class="card mt-3">
            <div class="card-body">
                <div class="add-new-role">
                    <img src="../images/add-user-level.png" alt="Add New User Role">
                    <br>
                    <h5 class="text-center">Add New User Level</h5>
                </div>
            </div>
            </div>
        </div>
        `;

    container.innerHTML += content;


    $("#editModal").on("hidden.bs.modal", function () {
        // $('#save-btn').attr('disabled', true);
        // $('#edit-btn').attr('disabled', false);
        // Reset checkbox here?
    });

    var updateModal = document.getElementById('editModal');
    updateModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let userlevel_data = await fetchData('user_level/read_single.php?user_id=' + data_id);
        const user_page_access = await fetchData('restriction/get_pages_restriction.php?user_id=' + data_id);
        const user_buttons_access = await fetchData('restriction/get_buttons_restriction.php?user_id=' + data_id);

        var modalTitle = updateModal.querySelector('.modal-title');
        modalTitle.textContent = userlevel_data.user_role;

        $('#user_id').val(data_id);
        $('#user_role').val(userlevel_data.user_role);

        toggle(false);

        Object.keys(user_page_access).forEach(key => {
            // Views
            if (key == 'customer-list' && user_page_access[key] == 1) {
                $('#cust-view').prop('checked', 1);
            }
            else if (key == 'invoice-view' && user_page_access[key] == 1) {
                $('#inv-view').prop('checked', true);
            }
            else if (key == 'invoice-payment' && user_page_access[key] == 1) {
                $('#pay-view').prop('checked', true);
            }
            else if (key == 'invoice-prorate' && user_page_access[key] == 1) {
                $('#pro-view').prop('checked', true);
            }
            else if (key == 'admin-view' && user_page_access[key] == 1) {
                $('#adm-view').prop('checked', true);
            }
            else if (key == 'plan-view' && user_page_access[key] == 1) {
                $('#plans-view').prop('checked', true);
            }
            else if (key == 'ticket-page' && user_page_access[key] == 1) {
                $('#tkt-view').prop('checked', true);
            }

            // Add
            if (key == 'customer-add' && user_page_access[key] == 1) {
                $('#cust-add').prop('checked', true);
            }
            else if (key == 'invoice-payment-add' && user_page_access[key] == 1) {
                $('#pay-add').prop('checked', true);
            }
            else if (key == 'admin-add' && user_page_access[key] == 1) {
                $('#adm-add').prop('checked', true);
            }
            else if (key == 'plan-add' && user_page_access[key] == 1) {
                $('#plans-add').prop('checked', true);
            }
            else if (key == 'ticket-create' && user_page_access[key] == 1) {
                $('#tkt-add').prop('checked', true);
            }
          });

        Object.keys(user_buttons_access).forEach(key => {
            // Edit
            if (key == 'custdata-edit' && user_buttons_access[key] == 1) {
                $('#cust-edit').prop('checked', 1);
            }
            else if (key == 'payments-edit' && user_buttons_access[key] == 1) {
                $('#pay-edit').prop('checked', true);
            }
            else if (key == 'prorate-edit' && user_buttons_access[key] == 1) {
                $('#pro-edit').prop('checked', true);
            }
            else if (key == 'admindata-edit' && user_buttons_access[key] == 1) {
                $('#adm-edit').prop('checked', true);
            }
            else if (key == 'plans-edit' && user_buttons_access[key] == 1) {
                $('#plans-edit').prop('checked', true);
            }
            else if (key == 'active-claim' && user_buttons_access[key] == 1) {
                $('#tkt-edit').prop('checked', true);
            }

            // Delete
            if (key == 'payments-dlt' && user_buttons_access[key] == 1) {
                $('#pay-dlt').prop('checked', true);
            }
            else if (key == 'prorate-dlt' && user_buttons_access[key] == 1) {
                $('#pro-dlt').prop('checked', true);
            }
            else if (key == 'active-invalid' && user_buttons_access[key] == 1) {
                $('#tkt-dlt').prop('checked', true);
            }
          });

        $('#select_all').change( (e) => {
            toggle($('#select_all').is(':checked'));
        });

        function toggle(bool) {
            checkboxes = document.getElementsByName('check');
            for(var i = 0; i < checkboxes.length; i++) {
                (bool) ? $('#' + checkboxes[i].id).prop('checked', true) : $('#' + checkboxes[i].id).prop('checked', false);
            }
        }

        update_fn = document.getElementById('user-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            processUpdate();
        };

        async function processUpdate() {
            console.log($('#cust-view').is(':checked'));
            let customer_list, customer_add;
            $('#cust-view').is(':checked') ? customer_list = 1 : customer_list = 0;
            $('#cust-add').is(':checked') ? customer_add = 1 : customer_add = 0;
            // const update_data = JSON.stringify({
            //     'user_id' : data_id,
            //     'user_role' : $('#user_role').val()
            // });

            // const [content, log] = await Promise.all ([updateData('user_level/update.php', update_data), logActivity('Updated User Level # ' + data_id, 'User Level - Overview')]);
        
            // if (content.message == 'User Level Updated' && log) {
            //     sessionStorage.setItem('save_message', "User Role Updated Successfully.");
            //     window.location.reload();
            // }
            // else {
            //     toastr.error("User Role was not updated.");
            // }
        }
    });

    // setUpdateModal();
    
}
// function setUserLevelPage() {
//     displaySuccessMessage();
//     setButtons();
//     setTable('user_level', '#userlevel-table');
//     setUpdateModal();
//     setDeleteModal();

    // $("#editModal").on("hidden.bs.modal", function () {
    // });

//     create_fn.onsubmit = (e) => {
//         e.preventDefault();
//         processCreate();
//     };
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal');
        updateModal.addEventListener('show.bs.modal', async function (event) {

            var button = event.relatedTarget;
            var data_id = button.getAttribute('data-bs-whatever');
            let userlevel_data = await fetchData('user_level/read_single.php?user_id=' + data_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = userlevel_data.user_role;

            $('#user_id').val(data_id);
            $('#user_role').val(userlevel_data.user_role);

            $('#select_all').change( (e) => {
                toggle($('#select_all').is(':checked'));
            });

            function toggle(bool) {
                checkboxes = document.getElementsByName('check');
                for(var i = 0; i < checkboxes.length; i++) {
                    (bool) ? $('#' + checkboxes[i].id).prop('checked', true) : $('#' + checkboxes[i].id).prop('checked', false);
                }
            }
            update_fn.onsubmit = (e) => {
                e.preventDefault();
                // processUpdate();
            };

            async function processUpdate() {
                const update_data = JSON.stringify({
                    'user_id' : data_id,
                    'user_role' : $('#user_role').val()
                });

                const [content, log] = await Promise.all ([updateData('user_level/update.php', update_data), logActivity('Updated User Level # ' + data_id, 'User Level - Overview')]);
            
                if (content.message == 'User Level Updated' && log) {
                    sessionStorage.setItem('save_message', "User Role Updated Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("User Role was not updated.");
                }
            }
        });
    }
    
//     async function setDeleteModal () {
//         var deleteModal = document.getElementById('deleteModal')
//         deleteModal.addEventListener('show.bs.modal', async function (event) {
    
//             var button = event.relatedTarget;
//             var data_id = button.getAttribute('data-bs-whatever');
//             let userlevel_data = await fetchData('user_level/read_single.php?user_id=' + data_id);

//             var modalTitle = deleteModal.querySelector('.modal-title');
//             modalTitle.textContent = "Delete " + userlevel_data.user_role + "?";

//             $('#user_id_d').val(data_id);
//             $('#user_role_md_d').val(userlevel_data.user_role);
    
//             delete_fn.onsubmit = (e) => {
//                 e.preventDefault();
//                 processDelete();
//             };

//             async function processDelete() {
//                 const delete_data = JSON.stringify({
//                     'user_id' : data_id
//                 });

//                 const [content, log] = await Promise.all ([deleteData('user_level/delete.php', delete_data), logActivity('Deleted User Level # ' + data_id, 'User Level - Overview')]);
                
//                 if (content.message == 'User Level Deleted' && log) {
//                     sessionStorage.setItem('save_message', "User Role Deleted Successfully.");
//                     window.location.reload();
//                 }
//                 else {
//                     toastr.error("User Role was not deleted.");
//                 }
//             }
//         });
//     }
    
//     async function processCreate() {
//         const create_data = JSON.stringify({
//             'user_role' : $('#user_role').val()
//         });

//         const [content, log] = await Promise.all ([createData('user_level/create.php', create_data), logActivity('Created new User Role - ' + $('#user_role').val(), 'User Level - Add User Level')]) 
        
//         if (content.message = 'User Level Created' && log) {
//             toastr.success('User Role Created Successfully.');
//             setTimeout(function(){
//                 window.location.replace('../views/user_level.php');
//              }, 2000);
//         }
//         else {
//             toastr.error("User Role was not created.");
//         }
//     }
// }
// End of User Level Page

