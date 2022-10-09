const overview = document.getElementById('profile-overview').children;
var full_name;
var admin_data;
var user_level;
var level;

async function displayData() {
    const data = await getAdminData(admin_id);
    const user = await getUserLevel(data.user_level_id);
    full_name = data.first_name + ' ' + data.last_name;
    $(".profile-card h2").html(full_name);
    $(".profile-card h3").html(user.user_role);
    
    for (var i = 0; i < overview.length; i++) {
        // console.log(overview[i]);
        var row = overview[i].children;
        // console.log(row);
        for (var j = 0; j < row.length; j++) {
            if (row[j].id == 'full_name') {
                row[j].innerHTML = full_name;
            }
            else if (row[j].id == 'email') {
                row[j].innerHTML =  data.admin_email;
            }
            else if (row[j].id == 'mobile_number') {
                row[j].innerHTML =  data.mobile_number;
            }
            else if (row[j].id == 'first_name') {
                row[j].innerHTML =  data.first_name;
            }
            else if (row[j].id == 'middle_name') {
                row[j].innerHTML =  data.middle_name;
            }
            else if (row[j].id == 'last_name') {
                row[j].innerHTML =  data.last_name;
            }
            else if (row[j].id == 'birthdate') {
                row[j].innerHTML =  data.birthdate;
            }
            else if (row[j].id == 'address') {
                row[j].innerHTML =  data.address;
            }
            else if (row[j].id == 'employment_date') {
                row[j].innerHTML =  data.employment_date;
            }
        }
    }
}

$(document).ready( () => {
    displayData();
});
