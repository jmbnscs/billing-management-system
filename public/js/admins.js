const edit_admin = document.getElementById('edit-admin');
const save_admin = document.getElementById('save-admin');

$(document).ready( () => {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/admins_add.php') {
        if(sessionStorage.getItem("user_id") == 4 || 
            sessionStorage.getItem("user_id") == 5 || 
            sessionStorage.getItem("user_id") == 6) {
            sessionStorage.setItem('error_message', "You don't have access to this page.");
            window.location.replace("../views/dashboard.php");
        }
        else {
            setAddAdminPage();
        }
    }
    else {
        if (sessionStorage.getItem("save_message") == "Admin Updated Successfully.") {
            toastr.success(sessionStorage.getItem("save_message"));
            sessionStorage.removeItem("save_message");
        }

        $("#modalDialogScrollable").on("hidden.bs.modal", function () {
            $('#save-admin-btn').attr('disabled', true);
            $('#edit-admin').attr('disabled', false);
        });

        getAdmins();
        setModal();

        save_admin.onsubmit = (e) => {
            e.preventDefault();
            updateAdminData();
        };
    }
});

// View Admin JS
async function getAdmins () {
    let url = DIR_API + 'views/admin.php';
    let admin_data;
    var t = $('#admins-table').DataTable();
    try {
        let res = await fetch(url);
        admin_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < admin_data.length; i++) {
        var tag;
        if (admin_data[i].status == 'EMPLOYED') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${admin_data[i].admin_id}</a></th>
                <td>${admin_data[i].admin_name}</td>
                <td><a href="#" class="text-primary">${admin_data[i].role}</a></td>
                <td>${admin_data[i].admin_email}</td>
                <td><span class="badge ${tag}">${admin_data[i].status}</span></td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalDialogScrollable" data-bs-whatever="${admin_data[i].admin_id}" id="try_lang"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }
}

// Set Admin Modal
async function setModal () {
    var exampleModal = document.getElementById('modalDialogScrollable')
    exampleModal.addEventListener('show.bs.modal', function (event) {

      // Button that triggered the modal
      var button = event.relatedTarget;

      // Extract info from data-bs-* attributes
      var recipient = button.getAttribute('data-bs-whatever');

      displayModal(recipient);
    
      async function displayModal (admin_id) {
        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = admin_id;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
        let admin;
            try {
                let res = await fetch(url);
                admin = await res.json();
            } catch (error) {
                console.log(error);
            }

        const user_levels = await displayUserLevels();
        const admin_statuses = await displayAdminStatus();

        toggleInputData('disabled', true);
        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        function setDefaultDropdown () {
            $("#role").empty();
            for (var i = 0; i < user_levels.length; i++) {
                if (user_levels[i].user_id == admin.user_level_id) {
                    var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
                    $("#role").append(opt);
                }
            }

            for (var i = 0; i < admin_statuses.length; i++) {
                if (admin_statuses[i].status_id == admin.admin_status_id) {
                    var opt = `<option value='${admin_statuses[i].status_id}'>${admin_statuses[i].status_name}</option>`;
                    $("#admin_status").append(opt);
                }
            }
        }

        async function setDropdownData () {
            $("#role").empty();
            $("#role").append(`<option selected disabled value="">Choose Admin Level</option>`);
            for (var i = 1; i < user_levels.length; i++) {
                if (user_levels[i].user_id == admin.user_level_id) {
                    var opt = `<option selected value='${user_levels[i].user_id}' style='color: blue'>${user_levels[i].user_role}</option>`;
                }
                else {
                    var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
                }
                $("#role").append(opt);
            }

            $("#admin_status").empty();
            $("#admin_status").append(`<option selected disabled>Choose Admin Status</option>`);
            for (var i = 0; i < admin_statuses.length; i++) {
                if (admin_statuses[i].status_id == admin.admin_status_id) {
                    var opt = `<option selected value='${admin_statuses[i].status_id}' style='color: blue'>${admin_statuses[i].status_name}</option>`;
                }
                else {
                    var opt = `<option value='${admin_statuses[i].status_id}'>${admin_statuses[i].status_name}</option>`;
                }
                $("#admin_status").append(opt);
            }
        }

        function setAdminData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleInputData (setAttr, bool) {
            setAdminData('#admin_id', admin.admin_id, setAttr, bool);

            setAdminData('#mobile_number', admin.mobile_number, setAttr, bool);
            setAdminData('#admin_email', admin.admin_email, setAttr, bool);
            setAdminData('#address', admin.address, setAttr, bool);

            setAdminData('#role', admin.role, setAttr, bool);
            setAdminData('#admin_status', admin.admin_status, setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setAdminData('#admin_username', admin.admin_username, setAttr, bool);
            setAdminData('#first_name', admin.first_name, setAttr, bool);
            setAdminData('#middle_name', admin.middle_name, setAttr, bool);
            setAdminData('#last_name', admin.last_name, setAttr, bool);
            setAdminData('#admin_bday', admin.birthdate, setAttr, bool);
            setAdminData('#employment_date', admin.employment_date, setAttr, bool);
        }

        // Form Submits -- onclick Triggers
        edit_admin.onclick = (e) => {
            e.preventDefault();
            $('#save-admin-btn').attr('disabled', false);
            $('#edit-admin').attr('disabled', true);
            toggleInputData('disabled', false);
            setDropdownData();
        };
        
      }
    });
}

async function updateAdminData() {
    const admin_id = $('#admin_id').val();
    const mobile_number = $('#mobile_number').val();
    const admin_email = $('#admin_email').val();

    const address = $('#address').val();
    const user_level_id = $('#role').val();
    const admin_status_id = $('#admin_status').val();

    let url = DIR_API + 'admin/update.php';
    const updateAdminResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'admin_id' : admin_id,
            'admin_email' : admin_email,
            'mobile_number' : mobile_number,
            'address' : address,
            'user_level_id' : user_level_id
        })
    });
    
    url = DIR_API + 'admin/update_status.php';
    const updateStatusResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'admin_id' : admin_id,
            'admin_status_id' : admin_status_id
        })
    });

    const admin_content = await updateAdminResponse.json();
    const status_content = await updateStatusResponse.json();

    if (admin_content.message == 'success' && status_content.message == 'Admin Updated') {
        // $("#modalDialogScrollable").modal('hide');
        sessionStorage.setItem('save_message', "Admin Updated Successfully.");
        window.location.reload();
    }
    else {
        toastr.error("Admin was not updated.");
    }
}

// Add Admin JS
const getAdminID = async () => {
    const result = await generateAdminID();
    return result;
}

async function generateAdminID() {
    let url = DIR_API + 'admin/read.php';
    try {
        let res = await fetch(url);
        response = await res.json();

        let unique = false;
        while(unique == false) {
            let checker = 0;
            let rand_num = Math.round(Math.random() * 99999);
            for(let i = 0; i < response.length; i++) {
                if(rand_num == response[i]['admin_id']) {
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

async function addAdmin() {
    const admin_id = $('#admin_id').val();

    const first_name = $('#first_name').val();
    const middle_name = $('#middle_name').val();
    const last_name = $('#last_name').val();

    const mobile_number = $('#mobile_number').val();
    const admin_email = $('#admin_email').val();
    const birthdate = $('#admin_bday').val();
    const address = $('#address').val();

    const employment_date = $('#employment_date').val();
    const user_level_id = $('#role').val();

    let url = DIR_API + 'admin/create.php';
    const addAdminResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'admin_id' : admin_id,
            'first_name' : first_name,
            'middle_name' : middle_name,
            'last_name' : last_name,
            'mobile_number' : mobile_number,
            'admin_email' : admin_email,
            'birthdate' : birthdate,
            'address' : address,
            'employment_date' : employment_date,
            'user_level_id' : user_level_id
        })
    });

    const content = await addAdminResponse.json();
    
    if (content.message = 'Admin Created') {
        toastr.success('Admin Created Successfully.');
        setTimeout(function(){
            window.location.replace('../views/admins.php');
         }, 2000);
    }
}

async function displayUserLevels() {
    let url = DIR_API + 'user_level/read.php';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function displayAdminStatus() {
    let url = DIR_API + 'statuses/read.php?status_table=admin_status';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function setAddDropdown() {
    const user_levels = await displayUserLevels;
    for (var i = 1; i < user_levels.length; i++) {
        var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
        $("#role").append(opt);
    }
}

function setAddAdminPage () {
    const add_admin = document.getElementById('add-admin');
    
    getAdminID().then(result => {
        $("#admin_id").attr("value", result);
    });

    setAddDropdown();

    // Form Submits -- onclick Triggers
    add_admin.onsubmit = (e) => {
        e.preventDefault();
        addAdmin();
    };
}