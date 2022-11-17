// On Load
const claim_ticket = document.getElementById('claim-ticket-modal');
const claim_ticket_btn = document.getElementById('claim-ticket-btn');

const invalid_ticket = document.getElementById('invalid-ticket-modal');
const invalid_ticket_btn = document.getElementById('invalid-ticket-btn');

const pending_ticket = document.getElementById('pending-ticket');
var pending_resolve_ticket_btn = document.getElementById('pend-resolve-ticket-btn');

const resolve_network = document.getElementById('network-ticket-modal');
const resolve_subscription = document.getElementById('subscription-ticket-modal');
const resolve_disconnect = document.getElementById('disconnect-ticket-modal');

$(document).ready(function () {
    isDefault();

    if(sessionStorage.getItem("user_id") == 4 || 
        sessionStorage.getItem("user_id") == 6) {
        sessionStorage.setItem('error_message', "You don't have access to this page.");
        window.location.replace("../views/dashboard.php");
    }
    else {
        if (DIR_CUR == DIR_MAIN + 'views/tickets_create.php') {
            setCreateTicketPage();
        }
        else if (DIR_CUR == DIR_MAIN + 'views/tickets_resolved.php') {
            getResolvedTickets();
            resolvedModal();
        }
        else if (DIR_CUR == DIR_MAIN + 'views/tickets_pending.php') {
            if ((sessionStorage.getItem("save_message") == "Ticket Resolved Successfully.") || (sessionStorage.getItem("save_message") == "Ticket Invalidated Successfully.")) {
                toastr.success(sessionStorage.getItem("save_message"));
                sessionStorage.removeItem("save_message");
            }

            getPendingTickets();
            pendingModal();
        }
        else {
            if ((sessionStorage.getItem("save_message") == "Ticket Claimed Successfully.") || (sessionStorage.getItem("save_message") == "Ticket Invalidated Successfully.")) {
                toastr.success(sessionStorage.getItem("save_message"));
                sessionStorage.removeItem("save_message");
            }

            getTickets();
            activeModal();
        }
    }
});

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

// View Ticket JS
async function getTickets () {
    let url = DIR_API + 'views/ticket.php';
    let ticket_data;
    var t = $('#ticket-table').DataTable();
    try {
        let res = await fetch(url);
        ticket_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < ticket_data.length; i++) {
        var tag = 'bg-danger';
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${ticket_data[i].ticket_num}</a></th>
                <td>${ticket_data[i].concern}</td>
                <td>${ticket_data[i].date_filed}</td>
                <td><span class="badge ${tag}">${ticket_data[i].ticket_status}</span></td>
                <td>${ticket_data[i].account_id}</td>
                <td>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#activeModal" data-bs-whatever="${ticket_data[i].ticket_num}" id="setName"><i class="bi bi-folder-fill"></i></button>
                </td>
            </tr>
        `)).draw(false);
    }
}

// View Pending Ticket JS
async function getPendingTickets () {
    let url = DIR_API + 'views/ticket_pending.php';
    let ticket_data;
    var t = $('#ticket-pending-table').DataTable();
    try {
        let res = await fetch(url);
        ticket_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < ticket_data.length; i++) {
        var tag = 'bg-warning';
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${ticket_data[i].ticket_num}</a></th>
                <td>${ticket_data[i].concern}</td>
                <td>${ticket_data[i].date_filed}</td>
                <td><span class="badge ${tag}">${ticket_data[i].ticket_status}</span></td>
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

// View Resolved Ticket JS
async function getResolvedTickets () {
    let url = DIR_API + 'views/ticket_resolved.php';
    let ticket_data;
    var t = $('#ticket-resolved-table').DataTable();
    try {
        let res = await fetch(url);
        ticket_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < ticket_data.length; i++) {
        var tag = 'bg-success';
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

async function activeModal () {
    var exampleModal = document.getElementById('activeModal')
    exampleModal.addEventListener('show.bs.modal', function (event) {

    // Button that triggered the modal
    var button = event.relatedTarget;

    // Extract info from data-bs-* attributes
    var recipient = button.getAttribute('data-bs-whatever');

    setName(recipient);
    
    async function setName (ticket_num) {
        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = ticket_num;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        const concern = await displayConcerns();
        const ticket_status = await displayTicketStatus();
        const admin_role = await displayUserLevels();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        async function setDefaultDropdown () {
            for (var i = 0; i < concern.length; i++) {
                if (concern[i].concern_id == ticket.concern_id) {
                    var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
                    $("#concern_id").append(opt);
                }
            }

            for (var i = 0; i < ticket_status.length; i++) {
                if (ticket_status[i].status_id == ticket.ticket_status_id) {
                    var opt = `<option value='${ticket_status[i].status_id}'>${ticket_status[i].status_name}</option>`;
                    $("#ticket_status_id").append(opt);
                }
            }

            for (var i = 2; i < admin_role.length; i++) {
                if (admin_role[i].user_id == ticket.user_level) {
                    var opt = `<option value='${admin_role[i].user_id}'>${admin_role[i].user_role}</option>`;
                    $("#admin_role").append(opt);
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num', ticket_num, setAttr, bool);
            setCustomerData('#concern_id', ticket.concern_id, setAttr, bool);
            setCustomerData('#concern_details', ticket.concern_details, setAttr, bool);
            setCustomerData('#date_filed', ticket.date_filed, setAttr, bool);
            setCustomerData('#ticket_status_id', ticket.ticket_status_id, setAttr, bool);
            setCustomerData('#account_id', ticket.account_id, setAttr, bool);
            setCustomerData('#admin_role', ticket.user_level, setAttr, bool);
        }
        

        claim_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#activeModal').modal('hide');
            claimModal(ticket_num);

            claim_ticket.onsubmit = (e) => {
                e.preventDefault();
                claimTicketData();
            };
        };

        invalid_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#activeModal').modal('hide');
            invalidModal(ticket_num);

            invalid_ticket.onsubmit = (e) => {
                e.preventDefault();
                invalidTicketData();
            };
        };
      }
    });
}

async function pendingModal () {
    var exampleModal = document.getElementById('pendingModal')
    exampleModal.addEventListener('show.bs.modal', function (event) {

    // Button that triggered the modal
    var button = event.relatedTarget;

    // Extract info from data-bs-* attributes
    var recipient = button.getAttribute('data-bs-whatever');

    setName(recipient);

    async function setName (ticket_num) {
        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = ticket_num;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        // Will be changed if concerns were added
        if(ticket.concern_id == 1) {
            $('#pend-resolve-ticket-btn').attr('data-bs-target', '#networkModal');
        }
        else if (ticket.concern_id == 2) {
            $('#pend-resolve-ticket-btn').attr('data-bs-target', '#subscriptionModal');
        }
        else {
            $('#pend-resolve-ticket-btn').attr('data-bs-target', '#disconnectModal');
        }
        pending_resolve_ticket_btn = document.getElementById('pend-resolve-ticket-btn');

        url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
        let admin;
            try {
                let res = await fetch(url);
                admin = await res.json();
            } catch (error) {
                console.log(error);
            }

        const concern = await displayConcerns();
        const ticket_status = await displayTicketStatus();
        const admin_role = await displayUserLevels();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        async function setDefaultDropdown () {
            for (var i = 0; i < concern.length; i++) {
                if (concern[i].concern_id == ticket.concern_id) {
                    var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
                    $("#concern_id").append(opt);
                }
            }

            for (var i = 0; i < ticket_status.length; i++) {
                if (ticket_status[i].status_id == ticket.ticket_status_id) {
                    var opt = `<option value='${ticket_status[i].status_id}'>${ticket_status[i].status_name}</option>`;
                    $("#ticket_status_id").append(opt);
                }
            }

            for (var i = 2; i < admin_role.length; i++) {
                if (admin_role[i].user_id == ticket.user_level) {
                    var opt = `<option value='${admin_role[i].user_id}'>${admin_role[i].user_role}</option>`;
                    $("#admin_role").append(opt);
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num', ticket_num, setAttr, bool);
            setCustomerData('#concern_id', ticket.concern_id, setAttr, bool);
            setCustomerData('#concern_details', ticket.concern_details, setAttr, bool);
            setCustomerData('#date_filed', ticket.date_filed, setAttr, bool);
            setCustomerData('#ticket_status_id', ticket.ticket_status_id, setAttr, bool);
            setCustomerData('#account_id', ticket.account_id, setAttr, bool);
            setCustomerData('#admin_id', admin.admin_username, setAttr, bool);
            setCustomerData('#admin_role', ticket.user_level, setAttr, bool);
        }
        
        pending_resolve_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#pendingModal').modal('hide');
                
            if(ticket.concern_id == 1) {
                pendNetworkModal(ticket_num);

                resolve_network.onsubmit = (e) => {
                    e.preventDefault();
                    networkTicketData();
                };
            }
            else if (ticket.concern_id == 2) {
                pendSubscriptionModal(ticket_num);

                resolve_subscription.onsubmit = (e) => {
                    e.preventDefault();
                    subscriptionTicketData();
                };
            }
            else {
                pendDisconnectModal(ticket_num);

                resolve_disconnect.onsubmit = (e) => {
                    e.preventDefault();
                    disconnectTicketData();
                };
            }
        };

        invalid_ticket_btn.onclick = (e) => {
            e.preventDefault();
            $('#pendingModal').modal('hide');
            invalidModal(ticket_num);

            invalid_ticket.onsubmit = (e) => {
                e.preventDefault();
                invalidTicketData();
            };
        };
      }
    });
}

async function claimModal (ticket_num) {
    var exampleModal = document.getElementById('claimModal');
    
    setName(ticket_num);
        
    async function setName (ticket_num) {

        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = "Claim Ticket?";
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
        let admin;
            try {
                let res = await fetch(url);
                admin = await res.json();
            } catch (error) {
                console.log(error);
            }

        const admin_role = await displayUserLevels();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        async function setDefaultDropdown () {
            for (var i = 2; i < admin_role.length; i++) {
                if (admin_role[i].user_id == ticket.user_level) {
                    var opt = `<option value='${admin_role[i].user_id}'>${admin_role[i].user_role}</option>`;
                    $("#admin_role_claim").append(opt);
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num_claim', ticket_num, setAttr, bool);
            setCustomerData('#admin_role_claim', ticket.user_level, setAttr, bool);
            setCustomerData('#admin_id_claim', admin.admin_username, setAttr, bool);
        }
    }
}

async function pendNetworkModal(ticket_num) {
    var exampleModal = document.getElementById('networkModal');

    setName(ticket_num);

    async function setName (ticket_num) {

        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')

        modalTitle.textContent = ticket_num;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'customer/read_single.php?account_id=' + ticket.account_id;
        let customer;
            try {
                let res = await fetch(url);
                customer = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
        let admin;
            try {
                let res = await fetch(url);
                admin = await res.json();
            } catch (error) {
                console.log(error);
            }

        const admin_role = await displayUserLevels();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        async function setDefaultDropdown () {
            for (var i = 2; i < admin_role.length; i++) {
                if (admin_role[i].user_id == ticket.user_level) {
                    var opt = `<option value='${admin_role[i].user_id}'>${admin_role[i].user_role}</option>`;
                    $("#admin_role_net").append(opt);
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num_net', ticket_num, setAttr, bool);
            setCustomerData('#account_id_net', ticket.account_id, setAttr, bool);
            setCustomerData('#customer_name_net', customer.first_name + " " + customer.last_name, setAttr, bool);
            setCustomerData('#admin_username_net', admin.admin_username, setAttr, bool);
            setCustomerData('#admin_role_net', ticket.user_level, setAttr, bool);
        }
    }
}

async function pendSubscriptionModal(ticket_num) {
    var exampleModal = document.getElementById('subscriptionModal');
    
    setName(ticket_num);
        
    async function setName (ticket_num) {

        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = ticket_num;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'account/read_single.php?account_id=' + ticket.account_id;
        let account;
            try {
                let res = await fetch(url);
                account = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'customer/read_single.php?account_id=' + ticket.account_id;
        let customer;
            try {
                let res = await fetch(url);
                customer = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
        let admin;
            try {
                let res = await fetch(url);
                admin = await res.json();
            } catch (error) {
                console.log(error);
            }

        const concern = await displayConcerns();
        const admin_role = await displayUserLevels();
        const plan = await displayPlan();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();
        setDropdownData();

        async function setDefaultDropdown () {
            for (var i = 0; i < concern.length; i++) {
                if (concern[i].concern_id == ticket.concern_id) {
                    var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
                    $("#concern_id_sub").append(opt);
                }
            }

            for (var i = 2; i < admin_role.length; i++) {
                if (admin_role[i].user_id == ticket.user_level) {
                    var opt = `<option value='${admin_role[i].user_id}'>${admin_role[i].user_role}</option>`;
                    $("#admin_role_sub").append(opt);
                }
            }
        }

        async function setDropdownData () {
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
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num_sub', ticket_num, setAttr, bool);
            setCustomerData('#concern_id_sub', ticket.concern_id, setAttr, bool);
            setCustomerData('#concern_details_sub', ticket.concern_details, setAttr, bool);
            setCustomerData('#account_id_sub', ticket.account_id, setAttr, bool);
            setCustomerData('#customer_name_sub', customer.first_name + " " + customer.last_name, setAttr, bool);
            setCustomerData('#admin_username_sub', admin.admin_username, setAttr, bool);
            setCustomerData('#admin_role_sub', ticket.user_level, setAttr, bool);
        }
    }
}

async function pendDisconnectModal(ticket_num) {
    var exampleModal = document.getElementById('subscriptionModal');
    
    setName(ticket_num);
        
    async function setName (ticket_num) {

        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = ticket_num;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'customer/read_single.php?account_id=' + ticket.account_id;
        let customer;
            try {
                let res = await fetch(url);
                customer = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'admin/read_single.php?admin_id=' + admin_id;
        let admin;
            try {
                let res = await fetch(url);
                admin = await res.json();
            } catch (error) {
                console.log(error);
            }

        const concern = await displayConcerns();
        const admin_role = await displayUserLevels();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        async function setDefaultDropdown () {
            for (var i = 0; i < concern.length; i++) {
                if (concern[i].concern_id == ticket.concern_id) {
                    var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
                    $("#concern_id_disc").append(opt);
                }
            }

            for (var i = 2; i < admin_role.length; i++) {
                if (admin_role[i].user_id == ticket.user_level) {
                    var opt = `<option value='${admin_role[i].user_id}'>${admin_role[i].user_role}</option>`;
                    $("#admin_role_disc").append(opt);
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num_disc', ticket_num, setAttr, bool);
            setCustomerData('#concern_id_disc', ticket.concern_id, setAttr, bool);
            setCustomerData('#concern_details_disc', ticket.concern_details, setAttr, bool);
            setCustomerData('#account_id_disc', ticket.account_id, setAttr, bool);
            setCustomerData('#customer_name_disc', customer.first_name + " " + customer.last_name, setAttr, bool);
            setCustomerData('#admin_username_disc', admin.admin_username, setAttr, bool);
            setCustomerData('#admin_role_disc', ticket.user_level, setAttr, bool);
        }
    }
}

async function invalidModal (ticket_num) {
    var exampleModal = document.getElementById('invalidModal')
    
    setName(ticket_num);
        
    async function setName (ticket_num) {

        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = "Invalidate Ticket?";
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        const concern = await displayConcerns();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        async function setDefaultDropdown () {
            for (var i = 0; i < concern.length; i++) {
                if (concern[i].concern_id == ticket.concern_id) {
                    var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
                    $("#concern_id_invalid").append(opt);
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num_invalid', ticket_num, setAttr, bool);
            setCustomerData('#concern_id_invalid', ticket.concern_id, setAttr, bool);
            setCustomerData('#concern_details_invalid', ticket.concern_details, setAttr, bool);
        }
    }
}

async function resolvedModal () {
    var exampleModal = document.getElementById('resolvedModal')
    exampleModal.addEventListener('show.bs.modal', function (event) {

      // Button that triggered the modal
      var button = event.relatedTarget;

      // Extract info from data-bs-* attributes
      var recipient = button.getAttribute('data-bs-whatever');

      setName(recipient);
    
      async function setName (ticket_num) {

        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title');
        //   var modalBodyInput = exampleModal.querySelector('.modal-body input')
    
        modalTitle.textContent = ticket_num;
        //   modalBodyInput.value = recipient

        let url = DIR_API + 'ticket/read_single.php?ticket_num=' + ticket_num;
        let ticket;
            try {
                let res = await fetch(url);
                ticket = await res.json();
            } catch (error) {
                console.log(error);
            }

        url = DIR_API + 'admin/read_single.php?admin_id=' + ticket.admin_id;
        let admin;
            try {
                let res = await fetch(url);
                admin = await res.json();
            } catch (error) {
                console.log(error);
            }

        const concern = await displayConcerns();
        const ticket_status = await displayTicketStatus();
        const admin_role = await displayUserLevels();

        toggleDefaultData('disabled', true);
        setDefaultDropdown();

        // Display Default Dropdown Data
        async function setDefaultDropdown () {
            for (var i = 0; i < concern.length; i++) {
                if (concern[i].concern_id == ticket.concern_id) {
                    var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
                    $("#concern_id").append(opt);
                }
            }

            for (var i = 0; i < ticket_status.length; i++) {
                if (ticket_status[i].status_id == ticket.ticket_status_id) {
                    var opt = `<option value='${ticket_status[i].status_id}'>${ticket_status[i].status_name}</option>`;
                    $("#ticket_status_id").append(opt);
                }
            }

            for (var i = 2; i < admin_role.length; i++) {
                if (admin_role[i].user_id == ticket.user_level) {
                    var opt = `<option value='${admin_role[i].user_id}'>${admin_role[i].user_role}</option>`;
                    $("#admin_role").append(opt);
                }
            }
        }

        function setCustomerData (id, data, setAttr, bool) {
            $(id).val(data);
            $(id).attr(setAttr, bool);
        }

        function toggleDefaultData (setAttr, bool) {
            setCustomerData('#ticket_num', ticket_num, setAttr, bool);
            setCustomerData('#concern_id', ticket.concern_id, setAttr, bool);
            setCustomerData('#concern_details', ticket.concern_details, setAttr, bool);
            setCustomerData('#date_filed', ticket.date_filed, setAttr, bool);
            setCustomerData('#account_id', ticket.account_id, setAttr, bool);
            setCustomerData('#date_resolved', ticket.date_resolved, setAttr, bool);
            setCustomerData('#resolution_details', ticket.resolution_details, setAttr, bool);
            setCustomerData('#ticket_status_id', ticket.ticket_status_id, setAttr, bool);
            setCustomerData('#admin_username', admin.admin_username, setAttr, bool);
            setCustomerData('#admin_role', ticket.user_level, setAttr, bool);
        }
        }
    });
}

async function claimTicketData() {
    const ticket_num = $('#ticket_num_claim').val();
    const ticket_status_id = 2;

    let url = DIR_API + 'ticket/claim.php';
    claimTicketResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'ticket_num' : ticket_num,
            'ticket_status_id' : ticket_status_id,
            'admin_id' : admin_id
        })
    });

    const claim_content = await claimTicketResponse.json();

    if (claim_content.message == 'Ticket Claimed') {
        sessionStorage.setItem('save_message', "Ticket Claimed Successfully.");
        window.location.reload();
    }
    else {
        toastr.error("Ticket was not claimed. " + claim_content.message);
    }
}

async function networkTicketData() {
    const duration = $('#duration_net').val();
    const account_id = $('#account_id_net').val();

    // Generate date today 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const ticket_num = $('#ticket_num_net').val();
    const resolution_details = $('#resolution_details_net').val();
    const date_resolved = today;
    const ticket_status_id = 3;

    url = DIR_API + 'prorate/create.php';
    const updateProrateResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id,
            'duration' : duration,
            'ticket_num' : ticket_num
        })
    });

    url = DIR_API + 'ticket/update.php';
    updateTicketResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'ticket_num' : ticket_num,
            'resolution_details' : resolution_details,
            'date_resolved' : date_resolved,
            'ticket_status_id' : ticket_status_id,
            'admin_id' : admin_id
        })
    });

    const prorate_content = await updateProrateResponse.json();
    const ticket_content = await updateTicketResponse.json();

    if ((prorate_content.message == 'Prorate Created') && (ticket_content.message == 'Ticket Updated')) {
        sessionStorage.setItem('save_message', "Ticket Resolved Successfully.");
        window.location.reload();
    }
    else {
        toastr.error("Ticket was not updated. " + ticket_content.message + " " + prorate_content.message);
    }
}

async function subscriptionTicketData() {
    const account_id = $('#account_id_sub').val();
    const plan_id = $('#plan_id_sub').val();

    // Get previous account data
    let url = DIR_API + 'account/read_single.php?account_id=' + account_id;
    let account;
        try {
            let res = await fetch(url);
            account = await res.json();
        } catch (error) {
            console.log(error);
        }

    const connection_id = account.connection_id;
    const account_status_id = account.account_status_id;
    const area_id = account.area_id;

    // Generate date today 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const ticket_num = $('#ticket_num_sub').val();
    const resolution_details = $('#resolution_details_sub').val();
    const date_resolved = today;
    const ticket_status_id = 3;

    url = DIR_API + 'account/update.php';
    const updateAccountResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'account_id' : account_id,
            'plan_id' : plan_id,
            'connection_id' : connection_id,
            'account_status_id' : account_status_id,
            'area_id' : area_id
        })
    });

    url = DIR_API + 'ticket/update.php';
    updateTicketResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'ticket_num' : ticket_num,
            'resolution_details' : resolution_details,
            'date_resolved' : date_resolved,
            'ticket_status_id' : ticket_status_id,
            'admin_id' : admin_id
        })
    });

    const account_content = await updateAccountResponse.json();
    const ticket_content = await updateTicketResponse.json();

    if ((account_content.message == 'success') && (ticket_content.message == 'Ticket Updated')) {
        sessionStorage.setItem('save_message', "Ticket Resolved Successfully.");
        window.location.reload();
    }
    else {
        toastr.error("Ticket was not updated. " + ticket_content.message + " " + account_content.message);
    }
}

async function disconnectTicketData() {
    // Generate date today 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const ticket_num = $('#ticket_num_disc').val();
    const resolution_details = $('#resolution_details_disc').val();
    const date_resolved = today;
    const ticket_status_id = 3;

    url = DIR_API + 'ticket/update.php';
    updateTicketResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'ticket_num' : ticket_num,
            'resolution_details' : resolution_details,
            'date_resolved' : date_resolved,
            'ticket_status_id' : ticket_status_id,
            'admin_id' : admin_id
        })
    });

    const ticket_content = await updateTicketResponse.json();

    if (ticket_content.message == 'Ticket Updated') {
        sessionStorage.setItem('save_message', "Ticket Resolved Successfully.");
        window.location.reload();
    }
    else {
        toastr.error("Ticket was not resolved. " + ticket_content.message);
    }
}

async function invalidTicketData() {
    const ticket_num = $('#ticket_num_invalid').val();
    const ticket_status_id = 4;

    let url = DIR_API + 'ticket/claim.php';
    claimTicketResponse = await fetch(url, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'ticket_num' : ticket_num,
            'ticket_status_id' : ticket_status_id,
            'admin_id' : admin_id
        })
    });

    const claim_content = await claimTicketResponse.json();

    if (claim_content.message == 'Ticket Claimed') {
        sessionStorage.setItem('save_message', "Ticket Invalidated Successfully.");
        window.location.reload();
    }
    else {
        toastr.error("Ticket was not invalidated. " + claim_content.message);
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

async function setAddDropdown() {
    const concern = await displayConcerns();
    for (var i = 0; i < concern.length; i++) {
        var opt = `<option value='${concern[i].concern_id}'>${concern[i].concern_category}</option>`;
        $("#concern_id").append(opt);
    }

    const user_levels = await displayUserLevels();
    for (var i = 2; i < user_levels.length; i++) {
        var opt = `<option value='${user_levels[i].user_id}'>${user_levels[i].user_role}</option>`;
        $("#admin_role").append(opt);
    }
}

function setCreateTicketPage () {
    const create_ticket = document.getElementById('create-ticket');

    const getTicketNum = async () => {
        const result = await generateTicketNum();
        return result;
    }

    getTicketNum().then(result => {
        $("#ticket_num").attr("value", result);
    });

    // displayUserLevels();
    // displayConcern();
    setAddDropdown();

    // Form Submits -- onclick Triggers
    create_ticket.onsubmit = (e) => {
        e.preventDefault();
        createTicket();
    };
}
