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
    else if (DIR_CUR == DIR_MAIN + 'views/concerns.php') {
        getConcerns();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/user_level.php') {
        getUserLevelMisc();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/area.php') {
        getArea();
    }
    else if (DIR_CUR == DIR_MAIN + 'views/inclusions.php') {
        getInclusion();
    }
});

function displaySuccessMessage() {
    toastr.success(sessionStorage.getItem("save_message"));
    sessionStorage.removeItem("save_message");
}

// ----- Connection JS

const edit_connection = document.getElementById('edit-connection');
const save_connection = document.getElementById('save-connection');
const delete_connection = document.getElementById('delete-connection');
const add_connection = document.getElementById('add-connection');
function setConnectionPage() {
    const msg = sessionStorage.getItem('save_message');
    if (msg !== null) {
        displaySuccessMessage();
    }

    $("#editConnectionMD").on("hidden.bs.modal", function () {
        $('#save-connection-btn').attr('disabled', true);
        $('#edit-connection').attr('disabled', false);
    });

    getConnection();
    setConnectionModal();
    setDeleteConnectionModal();

    save_connection.onsubmit = (e) => {
        e.preventDefault();
        updateConnectionData();
    };

    delete_connection.onsubmit = (e) => {
        e.preventDefault();
        deleteConnection();
    };

    add_connection.onsubmit = (e) => {
        e.preventDefault();
        addConnection();
    };

    async function getConnectionData() {
        let url = DIR_API + 'connection/read.php';
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }
    
    // Set Connection Table
    async function getConnection () {
        let conn_data = await getConnectionData();
        var t = $('#connections-table').DataTable();
    
        for (var i = 0; i < conn_data.length; i++) {
            t.row.add($(`
                <tr>
                    <th scope="row"><a href="#">${conn_data[i].connection_id}</a></th>
                    <td>${conn_data[i].connection_name}</td>
                    <td>
                        <button type="button" class="btn btn-outline-info m-1" data-bs-toggle="modal" data-bs-target="#editConnectionMD" data-bs-whatever="${conn_data[i].connection_id}" ><i class="bi bi-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteConnectionMD" data-bs-whatever="${conn_data[i].connection_id}" ><i class="ri ri-delete-bin-5-fill"></i></button>
                    </td>
                </tr>
            `)).draw(false);
        }
    }
    
    // Set Connection Modal
    async function setConnectionModal () {
        var exampleModal = document.getElementById('editConnectionMD')
        exampleModal.addEventListener('show.bs.modal', function (event) {
    
          // Button that triggered the modal
          var button = event.relatedTarget;
    
          // Extract info from data-bs-* attributes
          var recipient = button.getAttribute('data-bs-whatever');
    
          displayModal(recipient);
        
          async function displayModal (connection_id) {
            // Update the modal's content.
            var modalTitle = exampleModal.querySelector('.modal-title');
        
            modalTitle.textContent = connection_id;
    
            let conn_data = await getConnectionData();
    
            let conn_id;
            for (var i = 0; i < conn_data.length; i++) {
                if (connection_id == conn_data[i].connection_id) {
                    conn_id = i;
                }
            }
    
            toggleInputData('disabled', true);
    
            function setConnectionData (id, data, setAttr, bool) {
                $(id).val(data);
                $(id).attr(setAttr, bool);
            }
    
            function toggleInputData (setAttr, bool) {
                setConnectionData('#connection_id', conn_data[conn_id].connection_id, setAttr, bool);
                setConnectionData('#connection_name_md', conn_data[conn_id].connection_name, setAttr, bool);
            }
    
            // Form Submits -- onclick Triggers
            edit_connection.onclick = (e) => {
                e.preventDefault();
                $('#save-connection-btn').attr('disabled', false);
                $('#edit-connection').attr('disabled', true);
                toggleInputData('disabled', false);
            };
            
          }
        });
    }
    
    async function updateConnectionData() {
        const connection_id = $('#connection_id').val();
        const connection_name = $('#connection_name_md').val();
    
        let url = DIR_API + 'connection/update.php';
        const updateConnectionResponse = await fetch(url, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'connection_id' : connection_id,
                'connection_name' : connection_name
            })
        });
    
        const conn_content = await updateConnectionResponse.json();
    
        if (conn_content.message == 'Connection Updated') {
            sessionStorage.setItem('save_message', "Connection Updated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Connection was not updated.");
        }
    }
    
    // Set Delete Connection Modal
    async function setDeleteConnectionModal () {
        var exampleModal = document.getElementById('deleteConnectionMD')
        exampleModal.addEventListener('show.bs.modal', function (event) {
    
          // Button that triggered the modal
          var button = event.relatedTarget;
    
          // Extract info from data-bs-* attributes
          var recipient = button.getAttribute('data-bs-whatever');
    
          displayModal(recipient);
        
          async function displayModal (connection_id) {
            let conn_data = await getConnectionData();
            let conn_id;
            for (var i = 0; i < conn_data.length; i++) {
                if (connection_id == conn_data[i].connection_id) {
                    conn_id = i;
                }
            }
    
            // Update the modal's content.
            var modalTitle = exampleModal.querySelector('.modal-title');
            modalTitle.textContent = "Delete " + conn_data[conn_id].connection_name + "?";
    
            toggleInputData('disabled', true);
    
            function setConnectionData (id, data, setAttr, bool) {
                $(id).val(data);
                $(id).attr(setAttr, bool);
            }
    
            function toggleInputData (setAttr, bool) {
                setConnectionData('#connection_id_d', conn_data[conn_id].connection_id, setAttr, bool);
                setConnectionData('#connection_name_md_d', conn_data[conn_id].connection_name, setAttr, bool);
            }
    
          }
        });
    }
    
    async function deleteConnection() {
        const connection_id = $('#connection_id_d').val();
    
        let url = DIR_API + 'connection/delete.php';
        const deleteConnectionResponse = await fetch(url, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'connection_id' : connection_id
            })
        });
    
        const content = await deleteConnectionResponse.json();
        
        if (content.message == 'Connection Deleted') {
            sessionStorage.setItem('save_message', "Connection Deleted Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Connection was not deleted.");
        }
    }
    
    async function addConnection() {
        const connection_name = $('#connection_name').val();
    
        let url = DIR_API + 'connection/create.php';
        const addConnectionResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'connection_name' : connection_name
            })
        });
    
        const content = await addConnectionResponse.json();
        
        if (content.message = 'Connection Created') {
            toastr.success('Connection Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/connection.php');
             }, 2000);
        }
    }
}
// End of Connection JS

// ----- Concerns JS

async function getConcerns () {
    let url = DIR_API + 'concerns/read.php';
    let concern_data;
    var t = $('#concern-table').DataTable();
    try {
        let res = await fetch(url);
        concern_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < concern_data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${concern_data[i].concern_id}</a></th>
                <td>${concern_data[i].concern_category}</td>
            </tr>
        `)).draw(false);
    }
}

// End of Add Concerns

// Add User Level
// View User Level JS
async function getUserLevelMisc () {
    let url = DIR_API + 'user_level/read.php';
    let userlevel_data;
    var t = $('#userlevel-table').DataTable();

    try {
        let res = await fetch(url);
        userlevel_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < userlevel_data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${userlevel_data[i].user_id}</a></th>
                <td>${userlevel_data[i].user_role}</td>
            </tr>
        `)).draw(false);
    }
}

// End of Add User Level

// Add Area
// View Area JS
async function getArea () {
    let url = DIR_API + 'area/read.php';
    let area_data;
    var t = $('#areas-table').DataTable();
    console.log(t);
    try {
        let res = await fetch(url);
        area_data = await res.json();
    } catch (error) {
        console.log(error);
    }
    console.log(area_data.length);

    for (var i = 0; i < area_data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${area_data[i].area_id}</a></th>
                <td>${area_data[i].area_name}</td>
            </tr>
        `)).draw(false);
    }
}

// End of Area

// Add Inclusion
// View inclusion JS
async function getInclusion () {
    let url = DIR_API + 'inclusion/read.php';
    let inclusion_data;
    var t = $('#inclusions-table').DataTable();
    console.log(t);
    try {
        let res = await fetch(url);
        inclusion_data = await res.json();
    } catch (error) {
        console.log(error);
    }
    console.log(inclusion_data.length);

    for (var i = 0; i < inclusion_data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${inclusion_data[i].inclusion_id}</a></th>
                <td>${inclusion_data[i].inclusion_name}</td>
            </tr>
        `)).draw(false);
    }
}

// End of Area