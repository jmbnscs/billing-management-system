$(document).ready( () => {
    setProfilePage();

    if (hashed == 0) {
        document.getElementById('password-change').click();
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
    $('#birthdate').text(data.birthdate);
    $('#address').text(data.address);
    $('#employment_date').text(data.employment_date);

    // Edit Profile
    $('#fullName').val(data.first_name + ' ' + data.last_name);
    $('#edit-email').val(data.admin_email);
    $('#edit-number').val(data.mobile_number);
    $('#edit-bday').val(data.birthdate);
    $('#edit-address').val(data.address);

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
                const update_data = JSON.stringify({
                    'admin_id' : admin_id,
                    'admin_password' : newPassword
                });

                const [content, log] = await Promise.all ([updateData('admin/update_password.php', update_data), logActivity('Changed Password', 'Profile')]);
                
                if (content.message == 'Password Updated' && logActivity('Changed Password', 'Profile')) {
                    localStorage.setItem('hashed', 1);
                    toastr.success(content.message);

                    setTimeout(function(){
                        logout();
                     }, 2000);
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