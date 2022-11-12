// On Boot Load
$(document).ready(function () {
    isDefault();

    // User Level
    if(sessionStorage.getItem("user_id") == 3 || 
        sessionStorage.getItem("user_id") == 4 || 
        sessionStorage.getItem("user_id") == 5 || 
        sessionStorage.getItem("user_id") == 6) {
        sessionStorage.setItem('error_message', "You don't have access to this page.");
        window.location.replace("../views/dashboard.php");
    }
    // Connection
    else if (DIR_CUR == DIR_MAIN + 'views/connection.php') {
        setConnectionPage();
    }
    // Concerns
    else if (DIR_CUR == DIR_MAIN + 'views/concerns.php') {
        setConcernsPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/user_level.php') {
        setUserLevelPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/area.php') {
        setAreaPage();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/inclusions.php') {
        setInclusionPage();
    }
});

// Global Functions
function displaySuccessMessage() {
    const msg = sessionStorage.getItem('save_message');
    if (msg !== null) {
        toastr.success(sessionStorage.getItem("save_message"));
        sessionStorage.removeItem("save_message");
    }
}

let create_fn, edit_fn, update_fn, delete_fn;
function setButtons() {
    create_fn = document.getElementById('create-new');
    edit_fn = document.getElementById('edit-btn');
    update_fn = document.getElementById('update-data');
    delete_fn = document.getElementById('delete-data');
}

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

    var t = $(table_name).DataTable();

    for (var i = 0; i < data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${id[i]}</a></th>
                <td>${info[i]}</td>
                <td>
                    <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${id[i]}" ><i class="bi bi-eye"></i></button>
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${id[i]}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }
}

function setData (id, data, setAttr, bool) {
    $(id).val(data);
    $(id).attr(setAttr, bool);
}

// -------------------------------------------------------------------- Connection JS
function setConnectionPage() {
    displaySuccessMessage();
    setButtons();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    setTable('connection', '#connections-table');
    setUpdateModal();
    setDeleteModal();

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        deleteData();
    };

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        createData();
    };

    // Set Connection Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var connection_id = button.getAttribute('data-bs-whatever');
            let conn_data = await getData('connection');
            let conn_id;

            function toggleInputData (setAttr, bool) {
                setData('#connection_id', conn_data[conn_id].connection_id, setAttr, bool);
                setData('#connection_name_md', conn_data[conn_id].connection_name, setAttr, bool);
            }

            for (var i = 0; i < conn_data.length; i++) {
                if (connection_id == conn_data[i].connection_id) {
                    conn_id = i;
                }
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = connection_id + ' - ' + conn_data[conn_id].connection_name;
            
            toggleInputData('disabled', true);
    
            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };
        });
    }
    
    async function updateData() {
        const connection_id = $('#connection_id').val();
        const connection_name = $('#connection_name_md').val();
    
        let url = DIR_API + 'connection/update.php';
        const updateDataResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'connection_id' : connection_id,
                'connection_name' : connection_name
            })
        });
    
        const conn_content = await updateDataResponse.json();
    
        if (conn_content.message == 'Connection Updated') {
            sessionStorage.setItem('save_message', "Connection Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Connection was not updated.");
        }
    }
    
    // Set Delete Connection Modal
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
        
            var button = event.relatedTarget;
            var connection_id = button.getAttribute('data-bs-whatever');
            let conn_data = await getData('connection');
            let conn_id;

            function toggleInputData (setAttr, bool) {
                setData('#connection_id_d', conn_data[conn_id].connection_id, setAttr, bool);
                setData('#connection_name_md_d', conn_data[conn_id].connection_name, setAttr, bool);
            }

            for (var i = 0; i < conn_data.length; i++) {
                if (connection_id == conn_data[i].connection_id) {
                    conn_id = i;
                }
            }
    
            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + conn_data[conn_id].connection_name + "?";
    
            toggleInputData('disabled', true);
        });
    }
    
    async function deleteData() {
        const connection_id = $('#connection_id_d').val();
    
        let url = DIR_API + 'connection/delete.php';
        const deleteDataResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'connection_id' : connection_id
            })
        });
    
        const content = await deleteDataResponse.json();
        
        if (content.message == 'Connection Deleted') {
            sessionStorage.setItem('save_message', "Connection Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Connection was not deleted.");
        }
    }
    
    async function createData() {
        const connection_name = $('#connection_name').val();
    
        let url = DIR_API + 'connection/create.php';
        const createDataResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'connection_name' : connection_name
            })
        });
    
        const content = await createDataResponse.json();
        
        if (content.message = 'Connection Created') {
            toastr.success('Connection Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/connection.php');
             }, 2000);
        }
    }
}
// End of Connection JS

// -------------------------------------------------------------------- Concerns JS
function setConcernsPage() {
    displaySuccessMessage();
    setButtons();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    setConcernsTable();
    setUpdateModal();
    setDeleteModal();

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        deleteData();
    };

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        createData();
    };
    
    // Set Concerns Table
    async function setConcernsTable () {
        let concern_data = await getData('concerns');
        var t = $('#concern-table').DataTable();
    
        for (var i = 0; i < concern_data.length; i++) {
            t.row.add($(`
                <tr>
                    <th scope="row"><a href="#">${concern_data[i].concern_id}</a></th>
                    <td>${concern_data[i].concern_category}</td>
                    <td>
                        <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${concern_data[i].concern_id}" ><i class="bi bi-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${concern_data[i].concern_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                    </td>
                </tr>
            `)).draw(false);
        }
    }
    
    // Set Concerns Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var concern_id = button.getAttribute('data-bs-whatever');
            let concern_data = await getData('concerns');
            let conc_id;

            function toggleInputData (setAttr, bool) {
                setData('#concern_id', concern_data[conc_id].concern_id, setAttr, bool);
                setData('#concern_category_md', concern_data[conc_id].concern_category, setAttr, bool);
                if (concern_data[conc_id].customer_access == 0) {
                    setData('#customer_access_md', concern_data[conc_id].customer_access, setAttr, bool);
                    setData('#customer_access_md', concern_data[conc_id].customer_access, 'checked', false);
                }
                else {
                    setData('#customer_access_md', concern_data[conc_id].customer_access, setAttr, bool);
                    setData('#customer_access_md', concern_data[conc_id].customer_access, 'checked', true);
                }
            }

            for (var i = 0; i < concern_data.length; i++) {
                if (concern_id == concern_data[i].concern_id) {
                    conc_id = i;
                }
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = concern_data[conc_id].concern_category;
    
            toggleInputData('disabled', true);
            
            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };
        });
    }
    
    // Form Switch
    let customer_switch_md;
    $('#customer_access_md').on('change', function() {
        customer_switch_md = $(this).is(':checked');
    });
    async function updateData() {
        const concern_id = $('#concern_id').val();
        const concern_category = $('#concern_category_md').val();

        // Get customer access value
        let customer_access;
        (customer_switch_md) ? customer_access = 1 : customer_access = 0;
    
        let url = DIR_API + 'concerns/update.php';
        const updateDataResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'concern_id' : concern_id,
                'concern_category' : concern_category,
                'customer_access' : customer_access
            })
        });
    
        const content = await updateDataResponse.json();
    
        if (content.message == 'Concern Updated') {
            sessionStorage.setItem('save_message', "Concern Category Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Concern Category was not updated.");
        }
    }
    
    // Set Delete Concern Modal
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var concern_id = button.getAttribute('data-bs-whatever');
            let concern_data = await getData('concerns');
            let conc_id;

            function toggleInputData (setAttr, bool) {
                setData('#concern_id_d', concern_data[conc_id].concern_id, setAttr, bool);
                setData('#concern_category_md_d', concern_data[conc_id].concern_category, setAttr, bool);
                if (concern_data[conc_id].customer_access == 0) {
                    setData('#customer_access_md_d', concern_data[conc_id].customer_access, 'checked', false);
                }
                else {
                    setData('#customer_access_md_d', concern_data[conc_id].customer_access, 'checked', true);
                }
            }

            for (var i = 0; i < concern_data.length; i++) {
                if (concern_id == concern_data[i].concern_id) {
                    conc_id = i;
                }
            }
    
            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + concern_data[conc_id].concern_category + "?";
    
            toggleInputData('disabled', true);
        });
    }
    
    // Delete Concern
    async function deleteData() {
        const concern_id = $('#concern_id_d').val();
    
        let url = DIR_API + 'concerns/delete.php';
        const deleteDataResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'concern_id' : concern_id
            })
        });
    
        const content = await deleteDataResponse.json();
        
        if (content.message == 'Concern Deleted') {
            sessionStorage.setItem('save_message', "Concern Category Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Concern Category was not deleted.");
        }
    }
    
    // Form Switch
    let customer_switch;
    $('#customer_access').on('change', function() {
        // console.log($(this).is(':checked'));
        customer_switch = $(this).is(':checked');
    });
    async function createData() {
        const concern_category = $('#concern_category').val();

        // Get customer access value
        let customer_access;
        (customer_switch) ? customer_access = 1 : customer_access = 0;

        let url = DIR_API + 'concerns/create.php';
        const createDataResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'concern_category' : concern_category,
                'customer_access' : customer_access
            })
        });
    
        const content = await createDataResponse.json();
        
        if (content.message = 'Concern Created') {
            toastr.success('Concern Category Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/concerns.php');
             }, 2000);
        }
        else {
            toastr.error("Concern Category was not created.");
        }
    }
}
// End of Concerns JS

// -------------------------------------------------------------------- User Level JS
function setUserLevelPage() {
    displaySuccessMessage();
    setButtons();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    setTable('user_level', '#userlevel-table');
    setUpdateModal();
    setDeleteModal();

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        deleteData();
    };

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        createData();
    };
    
    // Set User Level Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var user_id = button.getAttribute('data-bs-whatever');
            let userlevel_data = await getData('user_level');
            let ul_id;

            function toggleInputData (setAttr, bool) {
                setData('#user_id', userlevel_data[ul_id].user_id, setAttr, bool);
                setData('#user_role_md', userlevel_data[ul_id].user_role, setAttr, bool);
            }

            for (var i = 0; i < userlevel_data.length; i++) {
                if (user_id == userlevel_data[i].user_id) {
                    ul_id = i;
                }
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = userlevel_data[ul_id].user_role;

            toggleInputData('disabled', true);

            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };
        });
    }
    
    // Update User Level
    async function updateData() {
        const user_id = $('#user_id').val();
        const user_role = $('#user_role_md').val();
    
        let url = DIR_API + 'user_level/update.php';
        const updateUserLevelResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'user_id' : user_id,
                'user_role' : user_role
            })
        });
    
        const ul_content = await updateUserLevelResponse.json();
    
        if (ul_content.message == 'User Level Updated') {
            sessionStorage.setItem('save_message', "User Role Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("User Role was not updated.");
        }
    }
    
    // Set Delete User Level Modal
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var user_id = button.getAttribute('data-bs-whatever');
            let userlevel_data = await getData('user_level');
            let ul_id;

            function toggleInputData (setAttr, bool) {
                setData('#user_id_d', userlevel_data[ul_id].user_id, setAttr, bool);
                setData('#user_role_md_d', userlevel_data[ul_id].user_role, setAttr, bool);
            }

            for (var i = 0; i < userlevel_data.length; i++) {
                if (user_id == userlevel_data[i].user_id) {
                    ul_id = i;
                }
            }
    
            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + userlevel_data[ul_id].user_role + "?";
    
            toggleInputData('disabled', true);
        });
    }
    
    // Delete User Level
    async function deleteData() {
        const user_id = $('#user_id_d').val();
    
        let url = DIR_API + 'user_level/delete.php';
        const deleteDataResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'user_id' : user_id
            })
        });
    
        const content = await deleteDataResponse.json();
        
        if (content.message == 'User Level Deleted') {
            sessionStorage.setItem('save_message', "User Role Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("User Role was not deleted.");
        }
    }
    
    // Add User Level
    async function createData() {
        const user_role = $('#user_role').val();
    
        let url = DIR_API + 'user_level/create.php';
        const createDataResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'user_role' : user_role
            })
        });
    
        const content = await createDataResponse.json();
        
        if (content.message = 'User Level Created') {
            toastr.success('User Role Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/user_level.php');
             }, 2000);
        }
    }
}
// End of User Level JS

// -------------------------------------------------------------------- Area JS
function setAreaPage() {
    displaySuccessMessage();
    setButtons();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    setTable('area', '#areas-table');
    setUpdateModal();
    setDeleteModal();

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        deleteData();
    };

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        createData();
    };
    
    // Set Area Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var area_id = button.getAttribute('data-bs-whatever');
            let area_data = await getData('area');
            let ar_id;

            function toggleInputData (setAttr, bool) {
                setData('#area_id', area_data[ar_id].area_id, setAttr, bool);
                setData('#area_name_md', area_data[ar_id].area_name, setAttr, bool);
            }

            for (var i = 0; i < area_data.length; i++) {
                if (area_id == area_data[i].area_id) {
                    ar_id = i;
                }
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = area_data[ar_id].area_name;

            toggleInputData('disabled', true);

            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };
        });
    }
    
    // Update Area
    async function updateData() {
        const area_id = $('#area_id').val();
        const area_name = $('#area_name_md').val();
    
        let url = DIR_API + 'area/update.php';
        const updateDataResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'area_id' : area_id,
                'area_name' : area_name
            })
        });
    
        const content = await updateDataResponse.json();
    
        if (content.message == 'Area Updated') {
            sessionStorage.setItem('save_message', "Area Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Area was not updated.");
        }
    }
    
    // Set Delete Area Modal
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var area_id = button.getAttribute('data-bs-whatever');
            let data = await getData('area');
            let a_id;

            function toggleInputData (setAttr, bool) {
                setData('#area_id_d', data[a_id].area_id, setAttr, bool);
                setData('#area_name_md_d', data[a_id].area_name, setAttr, bool);
            }

            for (var i = 0; i < data.length; i++) {
                if (area_id == data[i].area_id) {
                    a_id = i;
                }
            }
    
            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + data[a_id].area_name + "?";
    
            toggleInputData('disabled', true);
        });
    }
    
    // Delete Area
    async function deleteData() {
        const area_id = $('#area_id_d').val();
    
        let url = DIR_API + 'area/delete.php';
        const deleteDataResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'area_id' : area_id
            })
        });
    
        const content = await deleteDataResponse.json();
        
        if (content.message == 'Area Deleted') {
            sessionStorage.setItem('save_message', "Area Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Area was not deleted.");
        }
    }
    
    // Add Area
    async function createData() {
        const area_name = $('#area_name').val();
    
        let url = DIR_API + 'area/create.php';
        const createDataResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'area_name' : area_name
            })
        });
    
        const content = await createDataResponse.json();
        
        if (content.message = 'Area Created') {
            toastr.success('Area Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/area.php');
             }, 2000);
        }
    }
}
// End of Area JS

// -------------------------------------------------------------------- Inclusion JS
function setInclusionPage() {
    displaySuccessMessage();
    setButtons();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    setInclusionTable();
    setUpdateModal();
    setDeleteModal();

    update_fn.onsubmit = (e) => {
        e.preventDefault();
        updateData();
    };

    delete_fn.onsubmit = (e) => {
        e.preventDefault();
        deleteData();
    };

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        createData();
    };
    
    // Set Inclusion Table
    async function setInclusionTable() {
        let data = await getData('inclusion');
        var t = $('#inclusions-table').DataTable();
    
        for (var i = 0; i < data.length; i++) {
            t.row.add($(`
                <tr>
                    <th scope="row"><a href="#">${data[i].inclusion_id}</a></th>
                    <td>${data[i].inclusion_name}</td>
                    <td>
                        <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${data[i].inclusion_id}" ><i class="bi bi-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="${data[i].inclusion_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                    </td>
                </tr>
            `)).draw(false);
        }
    }
    
    // Set Inclusion Modal
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var inclusion_id = button.getAttribute('data-bs-whatever');
            let data = await getData('inclusion');
            let inc_id;

            function toggleInputData (setAttr, bool) {
                setData('#inclusion_id', data[inc_id].inclusion_id, setAttr, bool);
                setData('#inclusion_name_md', data[inc_id].inclusion_name, setAttr, bool);
            }

            for (var i = 0; i < data.length; i++) {
                if (inclusion_id == data[i].inclusion_id) {
                    inc_id = i;
                }
            }

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = data[inc_id].inclusion_name;
    
            toggleInputData('disabled', true);
            
            // Form Submits -- onclick Triggers
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };
        });
    }
    
    async function updateData() {
        const inclusion_id = $('#inclusion_id').val();
        const inclusion_name = $('#inclusion_name_md').val();
    
        let url = DIR_API + 'inclusion/update.php';
        const updateDataResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'inclusion_id' : inclusion_id,
                'inclusion_name' : inclusion_name
            })
        });
    
        const content = await updateDataResponse.json();
    
        if (content.message == 'Inclusion Updated') {
            sessionStorage.setItem('save_message', "Inclusion Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Inclusion was not updated.");
        }
    }
    
    // Set Delete Inclusion Modal
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var inclusion_id = button.getAttribute('data-bs-whatever');
            let data = await getData('inclusion');
            let inc_id;

            function toggleInputData (setAttr, bool) {
                setData('#inclusion_id_d', data[inc_id].inclusion_id, setAttr, bool);
                setData('#inclusion_name_md_d', data[inc_id].inclusion_name, setAttr, bool);
            }

            for (var i = 0; i < data.length; i++) {
                if (inclusion_id == data[i].inclusion_id) {
                    inc_id = i;
                }
            }
    
            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + data[inc_id].inclusion_name + "?";
    
            toggleInputData('disabled', true);
        });
    }
    
    // Delete Inclusion
    async function deleteData() {
        const inclusion_id = $('#inclusion_id_d').val();
    
        let url = DIR_API + 'inclusion/delete.php';
        const deleteDataResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'inclusion_id' : inclusion_id
            })
        });
    
        const content = await deleteDataResponse.json();
        
        if (content.message == 'Inclusion Deleted') {
            sessionStorage.setItem('save_message', "Inclusion Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Inclusion was not deleted.");
        }
    }
    
    async function createData() {
        const inclusion_name = $('#inclusion_name').val();

        let url = DIR_API + 'inclusion/create.php';
        const createDataResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'inclusion_name' : inclusion_name
            })
        });
    
        const content = await createDataResponse.json();
        
        if (content.message = 'Inclusion Created') {
            toastr.success('Inclusion Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/inclusions.php');
             }, 2000);
        }
        else {
            toastr.error("Inclusion was not created.");
        }
    }
}
// End of Inclusion JS