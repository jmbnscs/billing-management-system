// On Boot Load
$(document).ready(function () {
    isDefault();

    if (DIR_CUR == DIR_MAIN + 'views/plans_add.php') {
        setAddPlanPage();
    }
    else {
        getPlans();
    }
});

async function addPlan() {
    const plan_name = $('#plan_name').val();

    const bandwidth = $('#bandwidth').val();
    const price = $('#price').val();

    const inclusion = $('#inclusion').val();

    let url = DIR_API + 'plan/create.php';
    const addPlanResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'plan_name' : plan_name,
            'bandwidth' : bandwidth,
            'price' : price
        })
    });
    const plan_content = await addPlanResponse.json();

    let promo_content = {};
    if(inclusion.length > 0) {
        url = DIR_API + 'plan/read.php';
        let readPlanResponse;
        try {
            let res = await fetch(url);
            readPlanResponse = await res.json();
        } catch (error) {
            console.log(error);
        }
        const plan_id = readPlanResponse.slice(-1).pop()['plan_id'];
    
        let addPromoResponse;
        url = DIR_API + 'promo/create.php';
        for(let i = 0; i < inclusion.length; i++) {
            addPromoResponse = await fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    'plan_id' : plan_id,
                    'inclusion_id' : inclusion[i]
                })
            });
        }
        promo_content = await addPromoResponse.json();
    }


    if ((plan_content.message == 'Plan Created' && promo_content.message == 'Promo Created') 
        || (plan_content.message == 'Plan Created' && inclusion.length == 0)) {
        toastr.success('Plan Created Successfully.');
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
    else {
        toastr.error(plan_content.message + " " + promo_content.message);
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

// View Plan JS
async function getPlans () {
    let url = DIR_API + 'views/plan.php';
    let plan_data;
    var t = $('#plan-table').DataTable();
    try {
        let res = await fetch(url);
        plan_data = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < plan_data.length; i++) {
        var tag;
        if (plan_data[i].status == 'ACTIVE') {
            tag = 'bg-success';
        }
        else {
            tag = 'bg-danger';
        }
        t.row.add($(`
            <tr>
                <th scope="row"><a href="#">${plan_data[i].plan_name}</a></th>
                <td>${plan_data[i].bandwidth} mbps</td>
                <td>&#8369; ${plan_data[i].price}</a></td>
                <td>${plan_data[i].inclusion}</td>
                <td><span class="badge ${tag}">${plan_data[i].status}</span></td>
            </tr>
        `)).draw(false);
    }
}

async function displayInclusion() {
    let url = DIR_API + 'inclusion/read.php';
    let inclusion;
    try {
        let res = await fetch(url);
        inclusion = await res.json();
    } catch (error) {
        console.log(error);
    }

    for (var i = 0; i < inclusion.length; i++) {
        var opt = `<option value='${inclusion[i].inclusion_id}'>${inclusion[i].inclusion_name}</option>`;
        $("#inclusion").append(opt);
        $("#inclusion").selectpicker("refresh");
    }
}

function setAddPlanPage () {
    const add_plan = document.getElementById('add-plan');

    displayInclusion();

    // Form Submits -- onclick Triggers
    add_plan.onsubmit = (e) => {
        e.preventDefault();
        addPlan();
    };
}


