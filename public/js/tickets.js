$(document).ready(function () {
    isDefault();

    if(user_id == 4 || user_id == 6) {
        setErrorMessage();
        window.location.replace("../views/dashboard.php");
    }
    else {
        if (DIR_CUR == DIR_MAIN + 'views/tickets_create.php') {
            setCreateTicketPage();
        }
        else if (DIR_CUR == DIR_MAIN + 'views/tickets_resolved.php') {
            setResolvedTicketsTable();
            resolvedModal();
        }
        else if (DIR_CUR == DIR_MAIN + 'views/tickets_pending.php') {
            displaySuccessMessage();

            setPendingTicketsTable();
            pendingModal();
        }
        else {
            displaySuccessMessage();

            setActiveTicketsTable();
            activeModal();
        }
    }
});

// Global Variables
const invalid_ticket = document.getElementById('invalid-ticket-modal');
const invalid_ticket_btn = document.getElementById('invalid-ticket-btn');

// -------------------------------------------------------------------- Active Ticket Page
async function setActiveTicketsTable () {
    const ticket_data = await fetchData('views/ticket.php');
    var t = $('#ticket-table').DataTable();

    for (var i = 0; i < ticket_data.length; i++) {
        if(ticket_data[i].user_level == user_id || user_id == 2) {
            t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${ticket_data[i].ticket_num}</a></th>
                <td>${ticket_data[i].concern}</td>
                <td>${ticket_data[i].date_filed}</td>
                <td><span class="badge bg-danger">${ticket_data[i].ticket_status}</span></td>
                <td>${ticket_data[i].account_id}</td>
                <td>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#activeModal" data-bs-whatever="${ticket_data[i].ticket_num}" id="setName"><i class="bi bi-folder-fill"></i></button>
                </td>
            </tr>
            `)).draw(false);
        }
    }
}

async function activeModal () {
    var activeModal = document.getElementById('activeModal')
    activeModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        const ticket_num = button.getAttribute('data-bs-whatever');
        const ticket = await fetchData('ticket/read_single.php?ticket_num=' + ticket_num);

        var modalTitle = activeModal.querySelector('.modal-title');
        modalTitle.textContent = ticket_num;

        const [concern, ticket_status, admin_role] = await Promise.all ([fetchData('concerns/read_single.php?concern_id=' + ticket.concern_id), getStatusName('ticket_status', ticket.ticket_status_id), getUserLevel(ticket.user_level)]);

        $('#account_id').val(ticket.account_id);
        $('#concern_id').val(concern.concern_category);
        $('#concern_details').val(ticket.concern_details);
        $('#date_filed').val(ticket.date_filed);
        $('#admin_role').val(admin_role.user_role);
        $('#ticket_status_id').val(ticket_status);

        setTagElement('ticket_status_id', 2);

        const claim_ticket_btn = document.getElementById('claim-ticket-btn');
        claim_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#activeModal').modal('hide');
            claimModal();
        };

        async function claimModal () {
            var claimModal = document.getElementById('claimModal');
            var modalTitle = claimModal.querySelector('.modal-title');
            modalTitle.textContent = "Claim Ticket?";

            $('#ticket_num_claim').val(ticket_num);
            $('#admin_role_claim').val(admin_role.user_role);
            $('#admin_id_claim').val(admin_un);

            const claim_ticket = document.getElementById('claim-ticket-modal');
            claim_ticket.onsubmit = (e) => {
                e.preventDefault();
                claimTicketData();
            };

            async function claimTicketData() {
                const claim_data = JSON.stringify({
                    'ticket_num' : ticket_num,
                    'ticket_status_id' : 2,
                    'admin_id' : admin_id
                });

                const [claim_content, log] = await Promise.all ([updateData('ticket/claim.php', claim_data), logActivity('Claimed Ticket ' + ticket_num, 'Active Tickets')]);
            
                if (claim_content.message == 'Ticket Claimed' && log) {
                    sessionStorage.setItem('save_message', "Ticket Claimed Successfully.");
                    window.location.reload();
                }
                else {
                    toastr.error("Ticket was not claimed. " + claim_content.message);
                }
            }
        }

        invalid_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#activeModal').modal('hide');
            invalidModal(ticket_num, 'Active');
        };

    });
}

async function invalidModal (ticket_num, page) {
    const ticket = await fetchData('ticket/read_single.php?ticket_num=' + ticket_num);
    const concern = await fetchData('concerns/read_single.php?concern_id=' + ticket.concern_id);

    $('#ticket_num_invalid').val(ticket_num);
    $('#concern_id_invalid').val(concern.concern_category);
    $('#concern_details_invalid').val(ticket.concern_details);

    invalid_ticket.onsubmit = (e) => {
        e.preventDefault();
        invalidTicketData();
    };

    async function invalidTicketData() {
        const update_data = JSON.stringify({
            'ticket_num' : ticket_num,
            'ticket_status_id' : 4,
            'admin_id' : admin_id
        });

        const [claim_content, log] = await Promise.all ([updateData('ticket/claim.php', update_data), logActivity('Invalidated Ticket # ' + ticket_num, page + ' Tickets')]);
    
        if (claim_content.message == 'Ticket Claimed' && log) {
            sessionStorage.setItem('save_message', "Ticket Invalidated Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Ticket was not invalidated. " + claim_content.message);
        }
    }
}

// -------------------------------------------------------------------- Pending Ticket Page
async function setPendingTicketsTable () {
    const ticket_data = await fetchData('views/ticket_pending.php');
    var t = $('#ticket-pending-table').DataTable();

    for (var i = 0; i < ticket_data.length; i++) {
        if(ticket_data[i].admin_id == admin_id || admin_id == '11674') {
            t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${ticket_data[i].ticket_num}</a></th>
                <td>${ticket_data[i].concern}</td>
                <td>${ticket_data[i].date_filed}</td>
                <td><span class="badge bg-warning">${ticket_data[i].ticket_status}</span></td>
                <td>${ticket_data[i].account_id}</td>
                <td>${ticket_data[i].user_level}</td>
                <td>${ticket_data[i].admin_username}</td>
                <td>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#pendingModal" data-bs-whatever="${ticket_data[i].ticket_num}" id="setName"><i class="bi bi-folder-fill"></i></button>
                </td>
            </tr>
            `)).draw(false);
        }
    }
}

async function pendingModal () {
    var pendModal = document.getElementById('pendingModal')
    pendModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        const ticket_num = button.getAttribute('data-bs-whatever');
        const ticket = await fetchData('ticket/read_single.php?ticket_num=' + ticket_num);

        var modalTitle = pendModal.querySelector('.modal-title');
        modalTitle.textContent = ticket_num;

        if(ticket.concern_id == 1) {
            $('#pend-resolve-ticket-btn').attr('data-bs-target', '#networkModal');
        }
        else if (ticket.concern_id == 2) {
            $('#pend-resolve-ticket-btn').attr('data-bs-target', '#subscriptionModal');
        }
        else {
            $('#pend-resolve-ticket-btn').attr('data-bs-target', '#disconnectModal');
        }

        const [concern, ticket_status] = await Promise.all ([fetchData('concerns/read_single.php?concern_id=' + ticket.concern_id), getStatusName('ticket_status', ticket.ticket_status_id)]);

        $('#account_id').val(ticket.account_id);
        $('#concern_id').val(concern.concern_category);
        $('#concern_details').val(ticket.concern_details);
        $('#date_filed').val(ticket.date_filed);
        $('#admin_id').val(admin_un);
        $('#ticket_status_id').val(ticket_status);

        setTagElement('ticket_status_id', 3);

        const pending_resolve_ticket_btn = document.getElementById('pend-resolve-ticket-btn');
        pending_resolve_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#pendingModal').modal('hide');
                
            if(ticket.concern_id == 1) {
                pendNetworkModal(ticket_num);
            }
            else if (ticket.concern_id == 2) {
                pendSubscriptionModal(ticket_num);
            }
            else {
                pendDisconnectModal(ticket_num);
            }
        };

        invalid_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#pendingModal').modal('hide');
            invalidModal(ticket_num, 'Pending');
        };
    });
}

async function pendNetworkModal(ticket_num) {
    var networkModal = document.getElementById('networkModal');
    var modalTitle = networkModal.querySelector('.modal-title');
    modalTitle.textContent = ticket_num + ' - Network Interruption Ticket';

    const ticket = await fetchData('ticket/read_single.php?ticket_num=' + ticket_num);
    const customer = await fetchData('customer/read_single.php?account_id=' + ticket.account_id);

    $('#account_id_net').val(ticket.account_id);
    $('#customer_name_net').val(customer.first_name + ' ' + customer.last_name);
    
    const resolve_network = document.getElementById('network-ticket-modal');
    resolve_network.onsubmit = (e) => {
        e.preventDefault();
        networkTicketData();
    };

    async function networkTicketData() {
        // Generate date today 
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        const prorate_data = JSON.stringify({
            'account_id' : $('#account_id_net').val(),
            'duration' : $('#duration_net').val(),
            'ticket_num' : ticket_num
        });

        const update_data = JSON.stringify({
            'ticket_num' : ticket_num,
            'resolution_details' : $('#resolution_details_net').val(),
            'date_resolved' : today,
            'ticket_status_id' : 3,
            'admin_id' : admin_id
        });

        const [prorate_content, ticket_content, log] = await Promise.all ([createData('prorate/create.php', prorate_data), updateData('ticket/update.php', update_data), logActivity('Resolved Ticket ' + ticket_num, 'Pending Tickets')]);
    
        if ((prorate_content.message == 'Prorate Created') && (ticket_content.message == 'Ticket Updated') && log) {
            sessionStorage.setItem('save_message', "Ticket Resolved Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Ticket was not updated. " + ticket_content.message + " " + prorate_content.message);
        }
    }
}

async function pendSubscriptionModal(ticket_num) {
    var subsModal = document.getElementById('subscriptionModal');
    var modalTitle = subsModal.querySelector('.modal-title');
    modalTitle.textContent = ticket_num + ' - Plan Change Ticket';
    
    const ticket = await fetchData('ticket/read_single.php?ticket_num=' + ticket_num);
    const [customer, plan, account] = await Promise.all ([fetchData('customer/read_single.php?account_id=' + ticket.account_id), fetchData('plan/read.php'), fetchData('account/read_single.php?account_id=' + ticket.account_id)]);

    $('#account_id_sub').val(ticket.account_id);
    $('#customer_name_sub').val(customer.first_name + ' ' + customer.last_name);

    $("#plan_id_sub").empty();
    $("#plan_id_sub").append(`<option selected disabled>Choose Subscription Plan</option>`);
    for (var i = 0; i < plan.length; i++) {
        if (plan[i].plan_id == account.plan_id) {
            var opt = `<option selected value='${plan[i].plan_id}' style='color: blue'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
        }
        else {
            var opt = `<option value='${plan[i].plan_id}'>${plan[i].plan_name + " - " + plan[i].bandwidth + "mbps"}</option>`;
        }
        $("#plan_id_sub").append(opt);
    }
    
    const resolve_subscription = document.getElementById('subscription-ticket-modal');
    resolve_subscription.onsubmit = (e) => {
        e.preventDefault();
        subscriptionTicketData();
    };

    async function subscriptionTicketData() {
        // Generate date today 
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        const account_data = JSON.stringify({
            'account_id' : ticket.account_id,
            'plan_id' : $('#plan_id_sub').val(),
            'connection_id' : account.connection_id,
            'account_status_id' : account.account_status_id,
            'area_id' : account.area_id
        });

        const ticket_data = JSON.stringify({
            'ticket_num' : ticket_num,
            'resolution_details' : $('#resolution_details_sub').val(),
            'date_resolved' : today,
            'ticket_status_id' : 3,
            'admin_id' : admin_id
        });

        const [account_content, ticket_content, log] = await Promise.all ([updateData('account/update.php', account_data), updateData('ticket/update.php', ticket_data), logActivity('Resolved Ticket ' + ticket_num, 'Pending Tickets')]);
    
        if (account_content.message == 'success' && ticket_content.message == 'Ticket Updated' && log) {
            sessionStorage.setItem('save_message', "Ticket Resolved Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Ticket was not updated. " + ticket_content.message + " " + account_content.message);
        }
    }
}

async function pendDisconnectModal(ticket_num) {
    var disconModal = document.getElementById('disconnectModal');
    var modalTitle = disconModal.querySelector('.modal-title');
    modalTitle.textContent = ticket_num + ' -  Disconnection Ticket';
    
    const ticket = await fetchData('ticket/read_single.php?ticket_num=' + ticket_num);
    const [customer, plan, account] = await Promise.all ([fetchData('customer/read_single.php?account_id=' + ticket.account_id), fetchData('plan/read.php'), fetchData('account/read_single.php?account_id=' + ticket.account_id)]);

    $('#account_id_disc').val(ticket.account_id);
    $('#customer_name_disc').val(customer.first_name + ' ' + customer.last_name);

    const resolve_disconnect = document.getElementById('disconnect-ticket-modal');
    resolve_disconnect.onsubmit = (e) => {
        e.preventDefault();
        disconnectTicketData();
    };

    async function disconnectTicketData() {
        const update_data = JSON.stringify({
            'ticket_num' : ticket_num,
            'resolution_details' : $('#resolution_details_disc').val(),
            'date_resolved' : getDateToday(),
            'ticket_status_id' : 3,
            'admin_id' : admin_id
        });

        const [ticket_content, log] = await Promise.all ([updateData('ticket/update.php', update_data), logActivity('Resolved Ticket ' + ticket_num, 'Pending Tickets')]);
    
        if (ticket_content.message == 'Ticket Updated' && log) {
            sessionStorage.setItem('save_message', "Ticket Resolved Successfully.");
            window.location.reload();
        }
        else {
            toastr.error("Ticket was not resolved. " + ticket_content.message);
        }
    }
}

// -------------------------------------------------------------------- Resolved Ticket Page
async function setResolvedTicketsTable () {
    const ticket_data = await fetchData('views/ticket_resolved.php');
    var t = $('#ticket-resolved-table').DataTable();

    for (var i = 0; i < ticket_data.length; i++) {
        var tag = 'bg-success';                   // Manager ID
        if(ticket_data[i].admin_id == admin_id || admin_id == '11674') {
            t.row.add($(`
                <tr>
                    <th scope="row"><a href="#">${ticket_data[i].ticket_num}</a></th>
                    <td>${ticket_data[i].concern}</td>
                    <td>${ticket_data[i].date_filed}</td>
                    <td>${ticket_data[i].date_resolved}</td>
                    <td><span class="badge ${tag}">${ticket_data[i].ticket_status}</span></td>
                    <td>${ticket_data[i].account_id}</td>
                    <td>${ticket_data[i].admin_username}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#resolvedModal" data-bs-whatever="${ticket_data[i].ticket_num}" id="setName"><i class="ri ri-eye-fill"></i></button>
                    </td>
                </tr>
            `)).draw(false);
        }
    }
}

async function resolvedModal () {
    var resModal = document.getElementById('resolvedModal')
    resModal.addEventListener('show.bs.modal', async function (event) {

        var button = event.relatedTarget;
        const ticket_num = button.getAttribute('data-bs-whatever');
        const ticket = await fetchData('ticket/read_single.php?ticket_num=' + ticket_num);
        const admin = await getAdminData(ticket.admin_id);

        var modalTitle = resModal.querySelector('.modal-title');
        modalTitle.textContent = ticket_num;

        const [concern, ticket_status, admin_role] = await Promise.all ([fetchData('concerns/read_single.php?concern_id=' + ticket.concern_id), getStatusName('ticket_status', ticket.ticket_status_id), getUserLevel(admin.user_level_id)]);

        $('#account_id').val(ticket.account_id);
        $('#concern_id').val(concern.concern_category);
        $('#concern_details').val(ticket.concern_details);
        $('#date_filed').val(ticket.date_filed);
        $('#date_resolved').val(ticket.date_resolved);
        $('#resolution_details').val(ticket.resolution_details);
        $('#admin_username').val(admin.admin_username);
        $('#admin_role').val(admin_role.user_role);
        $('#ticket_status_id').val(ticket_status);

        setTagElement('ticket_status_id', 1);
    });
}

// -------------------------------------------------------------------- Add Ticket Page
async function setCreateTicketPage () {
    const create_ticket = document.getElementById('create-ticket');
    $('#ticket_num').val(await generateTicketNum());

    setAddDropdown();

    create_ticket.onsubmit = (e) => {
        e.preventDefault();
        createTicket();
    };

    async function createTicket() {
        const ticket_num = $('#ticket_num').val();

        const create_data = JSON.stringify({
            'concern_id' : $('#concern_id').val(),
            'concern_details' : $('#concern_details').val(),
            'date_filed' : $('#date_filed').val(),
            'ticket_status_id' : 1,
            'account_id' : $('#account_id').val(),
            'ticket_num' : ticket_num,
            'user_level' : $('#admin_role').val()
        });

        const [ticket_content, log] = await Promise.all ([createData('ticket/create.php', create_data), logActivity('Created Ticket ' + ticket_num, 'Create a Ticket')]);
    
        if (ticket_content.message == 'Ticket Created' && log) {
            toastr.success('Ticket Created Successfully.');
            setTimeout(function(){
                window.location.replace('../views/tickets.php');
             }, 2000);
        }
        else {
            toastr.error(ticket_content.message);
        }
    }
    
    async function setAddDropdown() {
        const [concern, user_levels] = await Promise.all ([fetchData('concerns/read.php'), fetchData('user_level/read.php')]);
        for (var i = 0; i < concern.length; i++) {
            var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
            $("#concern_id").append(opt);
        }
    
        for (var i = 2; i < user_levels.length; i++) {
            var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
            $("#admin_role").append(opt);
        }
    }
}

async function generateTicketNum() {
    const content = fetchData('ticket/read.php');

    let unique = false;
    while(unique == false) {
        let checker = 0;
        let rand_num = "TN" + Math.round(Math.random() * 999999);
        for(let i = 0; i < content.length; i++) {
            if(rand_num == content[i].ticket_num) {
                checker++;
            }
        }
        if (checker == 0) {
            return rand_num;
        }
    }
}
