
// Add Connection


// On Boot Load
$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/connection.php') {
        getConnection();
    }
    else {
        getPlans();
    }
});

// View Admin JS
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
