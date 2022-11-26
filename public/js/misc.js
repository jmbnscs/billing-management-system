$(document).ready(function () {
    isDefault();

    if(user_id == 3 || user_id == 4 || user_id == 5 || user_id == 6) {
        setErrorMessage();
        window.location.replace("../views/dashboard.php");
    }
    else if (DIR_CUR == DIR_MAIN + 'views/connection.php') {
        setConnectionPage();
    }
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

// -------------------------------------------------------------------- Connection Page
function setConnectionPage() {
    displaySuccessMessage();
    setButtons();
    setTable('connection', '#connections-table');
    setUpdateModal();
    setDeleteModal();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        processCreate();
    };

    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var connection_id = button.getAttribute('data-bs-whatever');
            let connection = await fetchData('connection/read_single.php?connection_id=' + connection_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = connection_id + ' - ' + connection.connection_name;

            $('#connection_id').val(connection_id);
            $('#connection_name_md').val(connection.connection_name);

            toggleInputData('disabled', true);

            function toggleInputData (setAttr, bool) {
                $('#connection_id').attr(setAttr, bool);
                $('#connection_name_md').attr(setAttr, bool);
            }

            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };

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
    }
    
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {

            var button = event.relatedTarget;
            var connection_id = button.getAttribute('data-bs-whatever');
            let connection = await fetchData('connection/read_single.php?connection_id=' + connection_id);

            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + connection.connection_name + "?";

            $('#connection_id_d').val(connection_id);
            $('#connection_name_md_d').val(connection.connection_name);

            toggleInputData('disabled', true);

            function toggleInputData (setAttr, bool) {
                $('#connection_id_d').attr(setAttr, bool);
                $('#connection_name_md_d').attr(setAttr, bool);
            }

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
    }
    
    async function processCreate() {
        const create_data = JSON.stringify({
            'connection_name' : $('#connection_name').val()
        });

        const [content, log] = await Promise.all ([createData('connection/create.php', create_data), logActivity('Created new Connection - ' + $('#connection_name').val(), 'Connection - Add Connection')]);
    
        if (content.message = 'Connection Created' && log) {
            toastr.success('Connection Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/connection.php');
             }, 2000);
        }
        else {
            toastr.error("Connection was not created.");
        }
    }
}
// End of Connection Page

// -------------------------------------------------------------------- Concerns Page
function setConcernsPage() {
    displaySuccessMessage();
    setButtons();
    setConcernsTable();
    setUpdateModal();
    setDeleteModal();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        processCreate();
    };
    
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
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var concern_id = button.getAttribute('data-bs-whatever');
            let concern_data = await fetchData('concerns/read_single.php?concern_id=' + concern_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = concern_data.concern_category;

            $('#concern_id').val(concern_id);
            $('#concern_category_md').val(concern_data.concern_category);
            (concern_data.customer_access == 0) ? $('#customer_access_md').attr('checked', false) : $('#customer_access_md').attr('checked', true);

            toggleInputData('disabled', true);

            function toggleInputData (setAttr, bool) {
                $('#concern_id').attr(setAttr, bool);
                $('#concern_category_md').attr(setAttr, bool);
                $('#customer_access_md').attr(setAttr, bool);
            }
            
            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };

            update_fn.onsubmit = (e) => {
                e.preventDefault();
                processUpdate();
            };

            let customer_switch_md;
            $('#customer_access_md').on('change', function() {
                customer_switch_md = $(this).is(':checked');
            });

            async function processUpdate() {
                let customer_access;
                (customer_switch_md) ? customer_access = 1 : customer_access = 0;

                const update_data = JSON.stringify({
                    'concern_id' : concern_id,
                    'concern_category' : $('#concern_category_md').val(),
                    'customer_access' : customer_access
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
        });
    }
    
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var concern_id = button.getAttribute('data-bs-whatever');
            let concern_data = await fetchData('concerns/read_single.php?concern_id=' + concern_id);

            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + concern_data.concern_category + "?";

            $('#concern_id_d').val(concern_id);
            $('#concern_category_md_d').val(concern_data.concern_category);
            (concern_data.customer_access == 0) ? $('#customer_access_md_d').attr('checked', false) : $('#customer_access_md_d').attr('checked', true);

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
    }
    
    let customer_switch;
    $('#customer_access').on('change', function() {
        customer_switch = $(this).is(':checked');
    });
    async function processCreate() {
        let customer_access;
        (customer_switch) ? customer_access = 1 : customer_access = 0;

        const create_data = JSON.stringify({
            'concern_category' : $('#concern_category').val(),
            'customer_access' : customer_access
        });

        const [content, log] = await Promise.all ([createData('concerns/create.php', create_data), logActivity('Created new Concern Category - ' + $('#concern_category').val(), 'Concerns - Add Concern Category')]);
        
        if (content.message = 'Concern Created' && log) {
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
// End of Concerns Page

// -------------------------------------------------------------------- User Level Page
function setUserLevelPage() {
    displaySuccessMessage();
    setButtons();
    setTable('user_level', '#userlevel-table');
    setUpdateModal();
    setDeleteModal();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        processCreate();
    };
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var data_id = button.getAttribute('data-bs-whatever');
            let userlevel_data = await fetchData('user_level/read_single.php?user_id=' + data_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = userlevel_data.user_role;

            $('#user_id').val(data_id);
            $('#user_role_md').val(userlevel_data.user_role);

            toggleInputData('disabled', true);

            function toggleInputData (setAttr, bool) {
                $('#user_id').attr(setAttr, bool);
                $('#user_role_md').attr(setAttr, bool);
            }

            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };

            update_fn.onsubmit = (e) => {
                e.preventDefault();
                processUpdate();
            };

            async function processUpdate() {
                const update_data = JSON.stringify({
                    'user_id' : data_id,
                    'user_role' : $('#user_role_md').val()
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
    
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var data_id = button.getAttribute('data-bs-whatever');
            let userlevel_data = await fetchData('user_level/read_single.php?user_id=' + data_id);

            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + userlevel_data.user_role + "?";

            $('#user_id_d').val(data_id);
            $('#user_role_md_d').val(userlevel_data.user_role);
    
            delete_fn.onsubmit = (e) => {
                e.preventDefault();
                processDelete();
            };

            async function processDelete() {
                const delete_data = JSON.stringify({
                    'user_id' : data_id
                });

                const [content, log] = await Promise.all ([deleteData('user_level/delete.php', delete_data), logActivity('Deleted User Level # ' + data_id, 'User Level - Overview')]);
                
                if (content.message == 'User Level Deleted' && log) {
                    sessionStorage.setItem('save_message', "User Role Deleted Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("User Role was not deleted.");
                }
            }
        });
    }
    
    async function processCreate() {
        const create_data = JSON.stringify({
            'user_role' : $('#user_role').val()
        });

        const [content, log] = await Promise.all ([createData('user_level/create.php', create_data), logActivity('Created new User Role - ' + $('#user_role').val(), 'User Level - Add User Level')]) 
        
        if (content.message = 'User Level Created' && log) {
            toastr.success('User Role Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/user_level.php');
             }, 2000);
        }
        else {
            toastr.error("User Role was not created.");
        }
    }
}
// End of User Level Page

// -------------------------------------------------------------------- Area Page
function setAreaPage() {
    displaySuccessMessage();
    setButtons();
    setTable('area', '#areas-table');
    setUpdateModal();
    setDeleteModal();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        processCreate();
    };
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var area_id = button.getAttribute('data-bs-whatever');
            let area_data = await fetchData('area/read_single.php?area_id=' + area_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = area_data.area_name;

            $('#area_id').val(area_id);
            $('#area_name_md').val(area_data.area_name);
            toggleInputData('disabled', true);

            function toggleInputData (setAttr, bool) {
                $('#area_id').attr(setAttr, bool);
                $('#area_name_md').attr(setAttr, bool);
            }

            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };

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
    }
    
    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var area_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('area/read_single.php?area_id=' + area_id);

            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + data.area_name + "?";

            $('#area_id_d').val(area_id);
            $('#area_name_md_d').val(data.area_name);

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
    }
    
    async function processCreate() {
        const area_name = $('#area_name').val();
        const create_data = JSON.stringify({
            'area_name' : area_name
        });

        const [content, log] = await Promise.all ([createData('area/create.php', create_data), logActivity('Created new Area - ' + $('#area_name').val(), 'Area - Add Area')]);
        
        if (content.message = 'Area Created' && log) {
            toastr.success('Area Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/area.php');
             }, 2000);
        }
        else {
            toastr.error('Area was not created.');
        }
    }
}
// End of Area Page

// -------------------------------------------------------------------- Inclusion Page
function setInclusionPage() {
    displaySuccessMessage();
    setButtons();
    setInclusionTable();
    setUpdateModal();
    setDeleteModal();

    $("#editModal").on("hidden.bs.modal", function () {
        $('#save-btn').attr('disabled', true);
        $('#edit-btn').attr('disabled', false);
    });

    create_fn.onsubmit = (e) => {
        e.preventDefault();
        processCreate();
    };
    
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
    
    async function setUpdateModal () {
        var updateModal = document.getElementById('editModal')
        updateModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var inclusion_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('inclusion/read_single.php?inclusion_id=' + inclusion_id);

            var modalTitle = updateModal.querySelector('.modal-title');
            modalTitle.textContent = data.inclusion_name;

            $('#inclusion_id').val(inclusion_id);
            $('#inclusion_name_md').val(data.inclusion_name);
            toggleInputData('disabled', true);

            function toggleInputData (setAttr, bool) {
                $('#inclusion_id').attr(setAttr, bool);
                $('#inclusion_name_md').attr(setAttr, bool);
            }

            edit_fn.onclick = (e) => {
                e.preventDefault();
                $('#save-btn').attr('disabled', false);
                $('#edit-btn').attr('disabled', true);
                toggleInputData('disabled', false);
            };

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
    }

    async function setDeleteModal () {
        var deleteModal = document.getElementById('deleteModal')
        deleteModal.addEventListener('show.bs.modal', async function (event) {
    
            var button = event.relatedTarget;
            var inclusion_id = button.getAttribute('data-bs-whatever');
            let data = await fetchData('inclusion/read_single.php?inclusion_id=' + inclusion_id);

            var modalTitle = deleteModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + data.inclusion_name + "?";

            $('#inclusion_id_d').val(inclusion_id);
            $('#inclusion_name_md_d').val(data.inclusion_name);
    
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
    }
    
    async function processCreate() {
        const inclusion_name = $('#inclusion_name').val();

        const create_data = JSON.stringify({
            'inclusion_name' : inclusion_name
        });

        const [content, log] = await Promise.all ([createData('inclusion/create.php', create_data), logActivity('Created new Inclusion - ' + $('#inclusion_name').val(), 'Inclusions - Add Inclusion')]);
        
        if (content.message = 'Inclusion Created' && log) {
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
// End of Inclusion Page