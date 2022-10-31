$(() => {
    if (hashed == 0) { 
        window.location.replace('../views/profile.php');
    }
});

const add_record = document.getElementById('add-payment');

async function addPayment () {
    const amount_paid = $('#amount_paid').val();
    const payment_ref = $('#payment_ref').val();

    let url = DIR_API + 'payment/create.php';
    const addPaymentResponse = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            'amount_paid' : amount_paid,
            'payment_reference_id' : payment_ref
        })
    });

    const payment_content = await addPaymentResponse.json();
    
    if (payment_content.message == 'Payment Record Created') {
        toastr.success('Payment Created Successfully.');
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
    else {
        toastr.error(payment_content.message);
        setTimeout(function(){
            window.location.reload();
         }, 2000);
    }
}

// Form Submits -- onclick Triggers
add_record.onsubmit = (e) => {
    e.preventDefault();
    addPayment();
};