const DIR_API = 'http://localhost/gstech_api/api/';
const admin_id = sessionStorage.getItem('admin_id');
var user_level_id;

async function getAdminData(admin_id) {
    let url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getUserLevel(user_id) {
    let url = DIR_API + 'user_level/read_single.php?user_id=' + user_id;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function logout() {
    sessionStorage.clear();
    $.ajax({
        url: '../../app/includes/logout.inc.php',
        cache: false,
        success: function() {
            window.location.replace('../views/login.php');
        },
        error: function (xhr, status, error) {
            console.error(xhr)
        }
    });
}

async function setDefaults () {
    let admin_data = await getAdminData(admin_id);
    const full_name = admin_data.first_name + ' ' + admin_data.last_name;
    user_level_id = admin_data.user_level_id;
    let user_id = await getUserLevel(user_level_id);

    const profile = document.getElementById('profile').children;
    const child = profile[0].children;

    child[0].innerHTML = full_name;
    child[1].innerHTML = user_id.user_role;

    if (admin_data.user_level_id == 2) {
        const navbar = document.getElementById('sidebar-nav').children;
        for (var i = 0; i < navbar.length; i++) {
            if (navbar[i].id == 'hide') {
                navbar[i].classList.remove('hide');
            }
        }
    }

    const display = document.getElementById('displayName').children;
    const display_name = display[0].children;
    display_name[1].innerHTML = admin_data.first_name;
}

$(document).ready( () => {
    setDefaults();
});