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
        else if (isWithSpecialChars($('#connection_name').val())) {
            toastr.error('Special characters not allowed.');
        }
        else {
            $('#conn-create-new-btn').prop('disabled', true);
            $('#conn-create-new-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processCreate();
                },2000
            );
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
            if (isWithSpecialChars($('#connection_name_md').val())) {
                toastr.error('Special characters not allowed.');
            }
            else {
                $('#conn-update-data-btn').prop('disabled', true);
                $('#conn-update-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
                setTimeout ( () => {
                        processUpdate();
                    },2000
                );
            }
        };

        async function processUpdate() {
            const update_data = JSON.stringify({
                'connection_id' : connection_id,
                'connection_name' : $('#connection_name_md').val()
            });

            const [content, log] = await Promise.all ([updateData('connection/update.php', update_data), logActivity('Save Changes [Connection #' + connection_id + ']', 'Advanced Options')]);
        
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
            $('#conn-delete-data-btn').prop('disabled', true);
            $('#conn-delete-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processDelete();
                },2000
            );
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'connection_id' : connection_id
            });

            const [content, log] = await Promise.all ([deleteData('connection/delete.php', delete_data), logActivity('Delete [Connection # ' + connection_id + ']', 'Advanced Options')]);
            
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

        const [content, log] = await Promise.all ([createData('connection/create.php', create_data), logActivity('Submit - New Connection [' + $('#connection_name').val() + ']', 'Advanced Options')]);
    
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
        else if (isWithSpecialChars($('#concern_category').val())) {
            toastr.error('Special characters not allowed.');
        }
        else {
            $('#concerns-create-new-btn').prop('disabled', true);
            $('#concerns-create-new-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processCreate();
                },2000
            );
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

        $('#concern_id').val(concern_data.concern_id);
        $('#concern_category_md').val(concern_data.concern_category);

        update_fn = document.getElementById('concerns-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            if (isWithSpecialChars($('#concern_category_md').val())) {
                toastr.error('Special characters not allowed.');
            }
            else {
                $('#concerns-update-data-btn').prop('disabled', true);
                $('#concerns-update-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
                setTimeout ( () => {
                        processUpdate();
                    },2000
                );
            }
        };

        async function processUpdate() {
            const update_data = JSON.stringify({
                'concern_id' : concern_id,
                'concern_category' : $('#concern_category_md').val(),
                'customer_access' : '1'
            });

            const [content, log] = await Promise.all ([updateData('concerns/update.php', update_data), logActivity('Save Changes [Concern # ' + concern_id + ']', 'Advanced Options')]);
        
            if (content.message == 'Concern Updated' && log) {
                sessionStorage.setItem('save_message', "Concern Category Updated Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Concern Category was not updated.");
            }
        }
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
            $('#concerns-delete-data-btn').prop('disabled', true);
            $('#concerns-delete-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processDelete();
                },2000
            );
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'concern_id' : concern_id
            });

            const [content, log] = await Promise.all ([deleteData('concerns/delete.php', delete_data), logActivity('Delete [Concern # ' + concern_id + ']', 'Advanced Options')]);
            
            if (content.message == 'Concern Deleted' && log) {
                sessionStorage.setItem('save_message', "Concern Category Deleted Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("Concern Category was not deleted.");
            }
        }

    });
    
    async function processCreate() {
        const create_data = JSON.stringify({
            'concern_category' : $('#concern_category').val(),
            'customer_access' : '1'
        });

        const [content, log] = await Promise.all ([createData('concerns/create.php', create_data), logActivity('Submit - New Concern Category [' + $('#concern_category').val() + ']', 'Advanced Options')]);
        
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
        else if (isWithSpecialChars($('#inclusion_name').val())) {
            toastr.error('Special characters not allowed.');
        }
        else {
            $('#inclusion-create-new-btn').prop('disabled', true);
            $('#inclusion-create-new-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processCreate();
                },2000
            );
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
            if (isWithSpecialChars($('#inclusion_name_md').val())) {
                toastr.error('Special characters not allowed.');
            }
            else {
                $('#inclusion-update-data-btn').prop('disabled', true);
                $('#inclusion-update-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
                setTimeout ( () => {
                        processUpdate();
                    },2000
                );
            }
        };

        async function processUpdate() {
            const update_data = JSON.stringify({
                'inclusion_id' : inclusion_id,
                'inclusion_name' : $('#inclusion_name_md').val()
            });

            const [content, log] = await Promise.all ([updateData('inclusion/update.php', update_data), logActivity('Save Changes [Inclusion # ' + inclusion_id + ']', 'Advanced Options')]);
        
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
            $('#inclusion-delete-data-btn').prop('disabled', true);
            $('#inclusion-delete-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processDelete();
                },2000
            );
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'inclusion_id' : inclusion_id
            });

            const [content, log] = await Promise.all ([deleteData('inclusion/delete.php', delete_data), logActivity('Delete [Inclusion # ' + inclusion_id + ']', 'Advanced Options')]);

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

        const [content, log] = await Promise.all ([createData('inclusion/create.php', create_data), logActivity('Submit - New Inclusion [' + $('#inclusion_name').val() + ']', 'Advanced Options')]);
        
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
        else if (isWithSpecialChars($('#area_name').val())) {
            toastr.error('Special characters not allowed.');
        }
        else {
            $('#area-create-new-btn').prop('disabled', true);
            $('#area-create-new-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processCreate();
                },2000
            );
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
            if (isWithSpecialChars($('#area_name_md').val())) {
                toastr.error('Special characters not allowed.');
            }
            else {
                $('#area-update-data-btn').prop('disabled', true);
                $('#area-update-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
                setTimeout ( () => {
                        processUpdate();
                    },2000
                );
            }
        };

        async function processUpdate() {
            const area_name = $('#area_name_md').val();

            const update_data = JSON.stringify({
                'area_id' : area_id,
                'area_name' : area_name
            }); 

            const [content, log] = await Promise.all ([updateData('area/update.php', update_data), logActivity('Save Changes  [Area # ' + area_id + ']', 'Advanced Options')]);
        
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
            $('#area-delete-data-btn').prop('disabled', true);
            $('#area-delete-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processDelete();
                },2000
            );
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'area_id' : area_id
            });

            const [content, log] = await Promise.all ([deleteData('area/delete.php', delete_data), logActivity('Delete [Area # ' + area_id + ']', 'Advanced Options')]);
            
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

        const [content, log] = await Promise.all ([createData('area/create.php', create_data), logActivity('Submit - New Area - [' + $('#area_name').val() + ']', 'Advanced Options')]);
        
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

// -------------------------------------------------------------------- User Level Page
async function setUserLevelPage() {
    const user_levels = await fetchData('user_level/read.php');

    const container = document.getElementById('user-role-body');

    for (var i = 1; i < 5; i++) {
        const descriptions = await fetchData('pages/get_descriptions.php?user_id=' + user_levels[i].user_id);
        const countUsers = await fetchData('views/admin_user_level.php?user_role=' + user_levels[i].user_role);
        const card = document.createElement('div');
        let users_count;
        card.classList = 'card-body';

        (countUsers.message != 'No Accounts Found') ? users_count = countUsers.length : users_count = 0;

        if (user_levels[i].user_id != 2) {
            const content = `
            <div class="col-sm-4 user-cards">
                <div class="card mt-3">
                <div class="card-body">
                    <h5>${user_levels[i].user_role}</h5>
                    <h6>Total users with this role: ${users_count}</h6>
                    <ul>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[0]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[1]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[2]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[3]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[4]}</li>
                        <li><i class="bi bi-check2-circle"></i> <em>and ${descriptions.length - 5} more.. </em></li>
                    </ul>

                    <a href="../views/user_level_data?user_role=${user_levels[i].user_role}" style="text-decorations:none; color:inherit;"><button class="btn btn-outline-success w-25">View</button></a>
                    <button class="btn btn-outline-primary w-25" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${user_levels[i].user_id}">Edit</button>
                </div>
                </div>
            </div>
            `;

            container.innerHTML += content;
        }
        else {
            const content = `
            <div class="col-sm-4 user-cards">
                <div class="card mt-3">
                <div class="card-body">
                    <h5>${user_levels[i].user_role}</h5>
                    <h6>Total users with this role: ${users_count}</h6>
                    <ul>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[0]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[1]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[2]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[3]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[4]}</li>
                        <li><i class="bi bi-check2-circle"></i> <em>and ${descriptions.length - 5} more.. </em></li>
                    </ul>
    
                    <a href="../views/user_level_data?user_role=${user_levels[i].user_role}" style="text-decorations:none; color:inherit;"><button class="btn btn-outline-success w-25">View</button></a>
                </div>
                </div>
            </div>
            `;
    
            container.innerHTML += content;
        }
    }

    for (var i = 5; i < user_levels.length; i++) {
        const descriptions = await fetchData('pages/get_descriptions.php?user_id=' + user_levels[i].user_id);
        const countUsers = await fetchData('views/admin_user_level.php?user_role=' + user_levels[i].user_role);
        const card = document.createElement('div');
        let users_count;
        card.classList = 'card-body';

        (countUsers.message != 'No Accounts Found') ? users_count = countUsers.length : users_count = 0;

        if (descriptions.length <= 5) {
            const content = `
            <div class="col-sm-4 user-cards">
                <div class="card mt-3">
                <div class="card-body">
                    <h5>${user_levels[i].user_role}</h5>
                    <h6>Total users with this role: ${users_count}</h6>
                    <ul>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[0]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[1]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[2]}</li>
                        <li><i class="bi bi-check2-circle"></i> <em>and more.. </em></li>
                    </ul>

                    <a href="../views/user_level_data?user_role=${user_levels[i].user_role}" style="text-decorations:none; color:inherit;"><button class="btn btn-outline-success w-25">View</button></a>
                    <button class="btn btn-outline-primary w-25" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${user_levels[i].user_id}">Edit</button>
                    <button class="btn btn-outline-danger w-25" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${user_levels[i].user_id}">Delete</button>
                    </div>
                </div>
            </div>
            `;

            container.innerHTML += content;
        }
        else {
            const content = `
            <div class="col-sm-4 user-cards">
                <div class="card mt-3">
                <div class="card-body">
                    <h5>${user_levels[i].user_role}</h5>
                    <h6>Total users with this role: ${users_count}</h6>
                    <ul>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[0]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[1]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[2]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[3]}</li>
                        <li><i class="bi bi-check2-circle"></i> ${descriptions[4]}</li>
                        <li><i class="bi bi-check2-circle"></i> <em>and ${descriptions.length - 5} more.. </em></li>
                    </ul>
    
                    <a href="../views/user_level_data?user_role=${user_levels[i].user_role}" style="text-decorations:none; color:inherit;"><button class="btn btn-outline-success w-25">View</button></a>
                    <button class="btn btn-outline-primary w-25" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${user_levels[i].user_id}">Edit</button>
                    <button class="btn btn-outline-danger w-25" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${user_levels[i].user_id}">Delete</button>
                    </div>
                </div>
            </div>
            `;
    
            container.innerHTML += content;
        }
    }

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
          });

        Object.keys(user_buttons_access).forEach(key => {
            // Add
            if (key == 'admins-add' && user_buttons_access[key] == 1) {
                $('#adm-add').prop('checked', true);
            }
            else if (key == 'plans-add' && user_buttons_access[key] == 1) {
                $('#plans-add').prop('checked', true);
            }
            else if (key == 'tickets-add' && user_buttons_access[key] == 1) {
                $('#tkt-add').prop('checked', true);
            }

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

        function isChecked() {
            updatecheckboxes = document.getElementsByName('update_check');
            for(var i = 0; i < updatecheckboxes.length; i++) {
                if($('#' + updatecheckboxes[i].id).is(':checked')) {
                    return true;
                }
            }
            return false;
        }

        update_fn = document.getElementById('user-update-data');
        update_fn.onsubmit = (e) => {
            e.preventDefault();
            if(isChecked()) {
                $('#user-update-data-btn').prop('disabled', true);
                $('#user-update-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
                setTimeout ( () => {
                        processUpdate();
                    },2000
                );
            }
            else {
                toastr.error("User Role was not updated. Please choose access restriction of at least one.");
            }
        };

        async function processUpdate() {
            const user_role = $('#user_role').val();

            const user_update_data = JSON.stringify({
                'user_id' : data_id,
                'user_role' : user_role
            });

            let customer_list, invoice_view, invoice_payment, invoice_prorate, admin_view, plan_view, ticket_page;
            $('#cust-view').is(':checked') ? customer_list = 1 : customer_list = 0;
            $('#inv-view').is(':checked') ? invoice_view = 1 : invoice_view = 0;
            $('#pay-view').is(':checked') ? invoice_payment = 1 : invoice_payment = 0;
            $('#pro-view').is(':checked') ? invoice_prorate = 1 : invoice_prorate = 0;
            $('#adm-view').is(':checked') ? admin_view = 1 : admin_view = 0;
            $('#plans-view').is(':checked') ? plan_view = 1 : plan_view = 0;
            $('#tkt-view').is(':checked') ? ticket_page = 1 : ticket_page = 0;

            let customer_add, invoice_payment_add, ticket_active, ticket_invalid;
            $('#cust-add').is(':checked') ? customer_add = 1 : customer_add = 0;
            $('#pay-add').is(':checked') ? invoice_payment_add = 1 : invoice_payment_add = 0;

            $('#tkt-edit').is(':checked') ? ticket_active = 1 : ticket_active = 0;
            $('#tkt-dlt').is(':checked') ? ticket_invalid = 1 : ticket_invalid = 0;

            const pages_update_data = JSON.stringify({
                'user_id' : data_id,
                
                'customer_list' : customer_list,
                'invoice_view' : invoice_view,
                'invoice_payment' : invoice_payment,
                'invoice_prorate' : invoice_prorate,
                'admin_view' : admin_view,
                'plan_view' : plan_view,
                'ticket_page' : ticket_page,

                'customer_add' : customer_add,
                'invoice_payment_add' : invoice_payment_add,
                'ticket_active' : ticket_active,
                'ticket_invalid' : ticket_invalid
            });

            let admins_add, plans_add, tickets_add, custdata_edit, payments_edit, prorate_edit, admindata_edit, plans_edit, active_claim, payments_dlt, prorate_dlt, active_invalid;
            $('#adm-add').is(':checked') ? admins_add = 1 : admins_add = 0;
            $('#plans-add').is(':checked') ? plans_add = 1 : plans_add = 0;
            $('#tkt-add').is(':checked') ? tickets_add = 1 : tickets_add = 0;

            $('#cust-edit').is(':checked') ? custdata_edit = 1 : custdata_edit = 0;
            $('#pay-edit').is(':checked') ? payments_edit = 1 : payments_edit = 0;
            $('#pro-edit').is(':checked') ? prorate_edit = 1 : prorate_edit = 0;
            $('#adm-edit').is(':checked') ? admindata_edit = 1 : admindata_edit = 0;
            $('#plans-edit').is(':checked') ? plans_edit = 1 : plans_edit = 0;
            $('#tkt-edit').is(':checked') ? active_claim = 1 : active_claim = 0;

            $('#pay-dlt').is(':checked') ? payments_dlt = 1 : payments_dlt = 0;
            $('#pro-dlt').is(':checked') ? prorate_dlt = 1 : prorate_dlt = 0;
            $('#tkt-dlt').is(':checked') ? active_invalid = 1 : active_invalid = 0;

            const buttons_update_data = JSON.stringify({
                'user_id' : data_id,

                'admins_add' : admins_add,
                'plans_add' : plans_add,
                'tickets_add' : tickets_add,
                
                'custdata_edit' : custdata_edit,
                'payments_edit' : payments_edit,
                'prorate_edit' : prorate_edit,
                'admindata_edit' : admindata_edit,
                'plans_edit' : plans_edit,
                'active_claim' : active_claim,

                'payments_dlt' : payments_dlt,
                'prorate_dlt' : prorate_dlt,
                'active_invalid' : active_invalid
            });

            let user_update_sucess = true;
            if (user_role != userlevel_data.user_role) {
                const user_update = await updateData('user_level/update.php', user_update_data);
                (user_update.success) ? user_update_sucess = true : user_update_sucess = false;
            }

            if (user_update_sucess) {
                const [pages_update, buttons_update, log] = await Promise.all ([updateData('restriction/update_pages_restriction.php', pages_update_data), updateData('restriction/update_buttons_restriction.php', buttons_update_data), logActivity('Save Changes - User Level Access [' + userlevel_data.user_role + ']', 'Advanced Options')]);

                if (pages_update.success && buttons_update.success && log) {
                    sessionStorage.setItem('save_message', "User Role Updated Successfully.");
                    window.location.reload();
                }
            }
            else {
                toastr.error("User Role was not updated.");
            }
        }
    });

    var addModal = document.getElementById('addModal');
    addModal.addEventListener('show.bs.modal', async function (event) {

        toggle(false);

        $('#add_select_all').change( (e) => {
            toggle($('#add_select_all').is(':checked'));
        });

        function toggle(bool) {
            addcheckboxes = document.getElementsByName('add_check');
            for(var i = 0; i < addcheckboxes.length; i++) {
                (bool) ? $('#' + addcheckboxes[i].id).prop('checked', true) : $('#' + addcheckboxes[i].id).prop('checked', false);
            }
        }

        function isChecked() {
            addcheckboxes = document.getElementsByName('add_check');
            for(var i = 0; i < addcheckboxes.length; i++) {
                if($('#' + addcheckboxes[i].id).is(':checked')) {
                    return true;
                }
            }
            return false;
        }

        create_fn = document.getElementById('user-add-data');
        create_fn.onsubmit = (e) => {
            e.preventDefault();
            if(isChecked()) {
                $('#user-add-data-btn').prop('disabled', true);
                $('#user-add-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
                setTimeout ( () => {
                        processCreate();
                    },2000
                );
            }
            else {
                toastr.error("User Role was not added. Please choose access restriction of at least one.");
            }
        };

        async function processCreate() {
            const user_add_data = JSON.stringify({
                'user_role' : $('#add_user_role').val()
            });

            let customer_list, invoice_view, invoice_payment, invoice_prorate, admin_view, plan_view, ticket_page;
            $('#add-cust-view').is(':checked') ? customer_list = 1 : customer_list = 0;
            $('#add-inv-view').is(':checked') ? invoice_view = 1 : invoice_view = 0;
            $('#add-pay-view').is(':checked') ? invoice_payment = 1 : invoice_payment = 0;
            $('#add-pro-view').is(':checked') ? invoice_prorate = 1 : invoice_prorate = 0;
            $('#add-adm-view').is(':checked') ? admin_view = 1 : admin_view = 0;
            $('#add-plans-view').is(':checked') ? plan_view = 1 : plan_view = 0;
            $('#add-tkt-view').is(':checked') ? ticket_page = 1 : ticket_page = 0;

            let customer_add, invoice_payment_add, ticket_active, ticket_invalid;
            $('#add-cust-add').is(':checked') ? customer_add = 1 : customer_add = 0;
            $('#add-pay-add').is(':checked') ? invoice_payment_add = 1 : invoice_payment_add = 0;

            $('#add-tkt-edit').is(':checked') ? ticket_active = 1 : ticket_active = 0;
            $('#add-tkt-dlt').is(':checked') ? ticket_invalid = 1 : ticket_invalid = 0;

            let admins_add, plans_add, tickets_add, custdata_edit, payments_edit, prorate_edit, admindata_edit, plans_edit, active_claim, payments_dlt, prorate_dlt, active_invalid;
            $('#add-adm-add').is(':checked') ? admins_add = 1 : admins_add = 0;
            $('#add-plans-add').is(':checked') ? plans_add = 1 : plans_add = 0;
            $('#add-tkt-add').is(':checked') ? tickets_add = 1 : tickets_add = 0;

            $('#add-cust-edit').is(':checked') ? custdata_edit = 1 : custdata_edit = 0;
            $('#add-pay-edit').is(':checked') ? payments_edit = 1 : payments_edit = 0;
            $('#add-pro-edit').is(':checked') ? prorate_edit = 1 : prorate_edit = 0;
            $('#add-adm-edit').is(':checked') ? admindata_edit = 1 : admindata_edit = 0;
            $('#add-plans-edit').is(':checked') ? plans_edit = 1 : plans_edit = 0;
            $('#add-tkt-edit').is(':checked') ? active_claim = 1 : active_claim = 0;

            $('#add-pay-dlt').is(':checked') ? payments_dlt = 1 : payments_dlt = 0;
            $('#add-pro-dlt').is(':checked') ? prorate_dlt = 1 : prorate_dlt = 0;
            $('#add-tkt-dlt').is(':checked') ? active_invalid = 1 : active_invalid = 0;

            const user_add = await createData('user_level/create.php', user_add_data);

            if (user_add.success) {
                const pages_add_data = JSON.stringify({
                    'user_id' : user_add.user_id,
                    
                    'customer_list' : customer_list,
                    'invoice_view' : invoice_view,
                    'invoice_payment' : invoice_payment,
                    'invoice_prorate' : invoice_prorate,
                    'admin_view' : admin_view,
                    'plan_view' : plan_view,
                    'ticket_page' : ticket_page,
    
                    'customer_add' : customer_add,
                    'invoice_payment_add' : invoice_payment_add,
                    'ticket_active' : ticket_active,
                    'ticket_invalid' : ticket_invalid
                });

                const buttons_add_data = JSON.stringify({
                    'user_id' : user_add.user_id,
    
                    'admins_add' : admins_add,
                    'plans_add' : plans_add,
                    'tickets_add' : tickets_add,
                    
                    'custdata_edit' : custdata_edit,
                    'payments_edit' : payments_edit,
                    'prorate_edit' : prorate_edit,
                    'admindata_edit' : admindata_edit,
                    'plans_edit' : plans_edit,
                    'active_claim' : active_claim,
    
                    'payments_dlt' : payments_dlt,
                    'prorate_dlt' : prorate_dlt,
                    'active_invalid' : active_invalid
                });

                const [pages_create, buttons_create, log] = await Promise.all ([createData('restriction/create_pages_restriction.php', pages_add_data), createData('restriction/create_buttons_restriction.php', buttons_add_data), logActivity('Submit - Add New User Level [' + $('#add_user_role').val() + ']', 'Advanced Options')]);

                if (pages_create.success && buttons_create.success && log) {
                    sessionStorage.setItem('save_message', "New User Level Added Successfully.");
                    window.location.reload();
                }
            }
            else {
                toastr.error("Some error occured, please try again.");
            }

        }
    });

    var deleteModal = document.getElementById('deleteModal')
    deleteModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        let data = await fetchData('user_level/read_single.php?user_id=' + data_id);

        $('#user_role_md_d').val(data.user_role);

        delete_fn = document.getElementById('user-delete-data');
        delete_fn.onsubmit = (e) => {
            e.preventDefault();
            $('#user-delete-data-btn').prop('disabled', true);
            $('#user-delete-data-btn').append('&emsp;<i class="fa fa-circle-o-notch fa-spin"></i>');
            setTimeout ( () => {
                    processDelete();
                },2000
            );
        };

        async function processDelete() {
            const delete_data = JSON.stringify({
                'user_id' : data_id
            });

            const [content, log] = await Promise.all ([deleteData('user_level/delete.php', delete_data), logActivity('Delete - User Role [' + data.user_role + ']', 'Advanced Options')]);

            if (content.success && log) {
                sessionStorage.setItem('save_message', "User Level Deleted Successfully.");
                window.location.reload();
            }
            else {
                toastr.error("User Level was not deleted.");
            }
        }
    });
}
// End of User Level Page

