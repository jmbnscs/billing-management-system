$(document).ready( () => {
    setProfilePage();

    if (hashed == 0) {
        document.getElementById('password-change').click();
    }
    else if (sessionStorage.getItem('edit') == 'true') {
        sessionStorage.setItem('edit', false);
        document.getElementById('edit-profile').click();
    }
    else if ((window.location.href).split("=")[1] == 'activityLogs') {
        document.getElementById('activity-logs').click();
    }
    else {
        document.getElementById('overview-profile').click();
    }
});

// Display Data
async function setProfilePage() {
    const data = await getAdminData(admin_id);
    const user = await getUserLevel(data.user_level_id);
    $('#profile-name').text(data.first_name + ' ' + data.last_name);
    $('#profile-role').text(user.user_role);

    // Overview
    $('#full_name').text(data.first_name + ' ' + data.last_name);
    $('#email').text(data.admin_email);
    $('#mobile_number').text(data.mobile_number);
    $('#first_name').text(data.first_name);
    $('#middle_name').text(data.middle_name);
    $('#last_name').text(data.last_name);
    $('#birthdate').text(formatDateString(data.birthdate));
    $('#address').text(data.address);
    $('#employment_date').text(formatDateString(data.employment_date));

    // Edit Profile
    $('#fullName').val(data.first_name + ' ' + data.last_name);
    $('#edit-email').val(data.admin_email);
    $('#edit-number').val(data.mobile_number);
    $('#edit-bday').val(data.birthdate);
    $('#edit-address').val(data.address);

    // Activity Logs
    setRecentActivity();

    const edit_profile = document.getElementById('edit-form');
    edit_profile.onsubmit = (e) => {
        e.preventDefault();
        processUpdate();
    };

    async function processUpdate() {
        const update_data = JSON.stringify({
            'admin_id' : admin_id,
            'admin_email' : $('#edit-email').val(),
            'mobile_number' : $('#edit-number').val(),
            'address' : $('#edit-address').val(),
            'user_level_id' : user_id
        });

        const [content, log] = await Promise.all ([updateData('admin/update.php', update_data), logActivity('Edited Profile Details', 'Profile')]);
        
        if (content.message = 'Admin Updated' && log) {
            toastr.success('Profile Updated Successfully.');
            setTimeout( () => {
                location.reload();
            }, 2000);
        }
    }

    const change_password = document.getElementById('change-password');
    change_password.onsubmit = (e) => {
        e.preventDefault();
        changePassword();
    }

    async function changePassword() {
        const currentPassword = $('#current-password').val();
        const newPassword = $('#new-password').val();
        const renewPassword = $('#re-new-password').val();
    
        // Verify Password
        let url = DIR_API + 'admin/verify_password.php';
        const verifyResponse = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                'admin_id' : admin_id,
                'admin_password' : currentPassword
            })
        });
    
        const verify = await verifyResponse.json();
    
        if (verify.message == 'success') {
            if (newPassword == renewPassword) {
                if (newPassword == currentPassword) {
                    toastr.warning('New Password should not be the same as current password.');
                }
                else {
                    const update_data = JSON.stringify({
                        'admin_id' : admin_id,
                        'admin_password' : newPassword
                    });
    
                    const [content, log] = await Promise.all ([updateData('admin/update_password.php', update_data), logActivity('Changed Password', 'Profile')]);
                    
                    if (content.message == 'Password Updated' && log) {
                        localStorage.setItem('hashed', 1);
                        toastr.success(content.message);
    
                        setTimeout(function(){
                            logout();
                         }, 2000);
                    }
                }
            }
            else {
                toastr.error('New Password do not match.');
            }
        }
        else {
            toastr.error('Current Password do not match.');
        }
    }
}

async function setRecentActivity() {
    const content = await fetchData('logs/read_admin_all_logs.php?admin_id=' + admin_id);
    
    var t = $('#activity-logs-tbl').DataTable({
        pageLength : 5,
        lengthMenu: [5, 10]
    });

    for (var i = 0; i < content.length; i++) {

        t.row.add($(`
            <tr>
                <th scope="row" style="color: #012970;"><strong>${content[i].id}</strong></th>
                <td>${content[i].page_accessed}</td>
                <td>${content[i].date_accessed.split(' ')[0]}</td>
                <td>${content[i].date_accessed.split(' ')[1]}</td>
                <td><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#view-activity-modal" data-bs-whatever="${content[i].id}"><i class="ri ri-eye-fill"></i></button></td>
            </tr>
        `)).draw(false);
    }

    setViewModal('view-activity-modal', content);
}

// Set View Modal
async function setViewModal (table, data) {
    var viewModal = document.getElementById(table)
    viewModal.addEventListener('show.bs.modal', async function (event) {
        var modalTitle = viewModal.querySelector('.modal-title');
        var button = event.relatedTarget;
        var data_id = button.getAttribute('data-bs-whatever');
        modalTitle.textContent = "Activity Log # " + data_id;
        let id, content;

        const selected_data = data.filter(item => item.id == data_id)[0];
    
        id = [
            // '#activity_id', 
            '#activity_page', 
            '#activity_made', 
            '#activity_date', 
            '#activity_time',
            '#activity_address',
            '#activity_user_agent'
        ];
        content = [
            // selected_data.id, 
            selected_data.page_accessed, 
            selected_data.activity,
            selected_data.date_accessed.split(' ')[0], 
            selected_data.date_accessed.split(' ')[1],
            selected_data.ip_address,
            selected_data.user_agent
        ];

        setContent();

        function setContent () {
            for (var i = 0; i < content.length; i++) {
                $(id[i]).val(content[i]);
            }
        }
    });
}