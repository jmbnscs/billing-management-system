const create_ticket = document.getElementById('create-ticket');

$(() => {
    if (hashed == 0) { 
        window.location.replace('../views/profile.php');
    }
});


$(document).ready(() => {
    getTicketNum().then(result => {
        $("#ticket_num").attr("value", result);
    });

    displayUserLevels();
    displayConcern();


});

const getTicketNum = async () => {
    const result = await generateTicketNum();
    return result;
}

async function generateTicketNum() {
    let url = DIR_API + 'ticket/read.php';
    try {
        let res = await fetch(url);
        response = await res.json();

        let unique = false;
        while(unique == false) {
            let checker = 0;
            let rand_num = "TN" + Math.round(Math.random() * 999999);
            for(let i = 0; i < response.length; i++) {
                if(rand_num == response[i]['ticket_num']) {
                    checker++;
                }
            }
            if (checker == 0) {
                unique = true;
                return rand_num;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function displayUserLevels() {
    let url = DIR_API + 'user_level/read.php';
    let user_levels;
    try {
        let res = await fetch(url);
        user_levels = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 2; i < user_levels.length; i++) {
        var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
        $("#admin_role").append(opt);
    }
}

async function displayConcern() {
    let url = DIR_API + 'concerns/read.php';
    let concern;
    try {
        let res = await fetch(url);
        concern = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < concern.length; i++) {
        var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
        $("#concern_id").append(opt);
    }
}

async function createTicket() {
    const ticket_num = $('#ticket_num').val();
    const concern_id = $('#concern_id').val();
    const concern_details = $('#concern_details').val();
    const date_filed = $('#date_filed').val();
    // const duration = $('#duration').val();
    const account_id = $('#account_id').val();
    const user_level = $('#admin_role').val();
    
    let url = DIR_API + 'ticket/create.php';
    const createTicketResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'concern_id' : concern_id,
            'concern_details' : concern_details,
            'date_filed' : date_filed,
            'ticket_status_id' : 1,
            'account_id' : account_id,
            'ticket_num' : ticket_num,
            'user_level' : user_level
        })
    });

    // --- Recycle for Prorate Use
    // url = DIR_API + 'prorate/create.php';
    // const createProrateResponse = await fetch(url, {
    //     method : 'POST',
    //     headers : {
    //         'Content-Type' : 'application/json'
    //     },
    //     body : JSON.stringify({
    //         'account_id' : account_id,
    //         'duration' : duration,
    //         'ticket_num' : ticket_num
    //     })
    // });

    // const prorate_content = await createProrateResponse.json();

    const ticket_content = await createTicketResponse.json();

    if (ticket_content.message == 'Ticket Created') {
        toastr.success('Ticket Created Successfully.');
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
    else {
        toastr.error(ticket_content.message);
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

// Form Submits -- onclick Triggers
create_ticket.onsubmit = (e) => {
    e.preventDefault();
    createTicket();
};