// On Boot Load
$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/connection.php') {
        getConnection();
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

// Add Connection
// View Connection JS
async function getConnection () {
    let url = DIR_API + 'connection/read.php';
    let conn_data;
    var t = $('#connections-table').DataTable();
    try {
        let res = await fetch(url);
        conn_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < conn_data.length; i++) {
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${conn_data[i].connection_id}</a></th>
                <td>${conn_data[i].connection_name}</td>
            </tr>
        `)).draw(false);
    }
}

// End of Add connection

// Add Concerns
// View Concerns JS
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