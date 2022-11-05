// On Boot Load
$(document).ready(function () {
    isDefault();

    // if (DIR_CUR == DIR_MAIN + 'views/plans_add.php') {
    //     setAddPlanPage();
    // }
    // else {
    //     getPlans();
    // }
    if (sessionStorage.getItem('error_message') !== null) {
        setToastrArgs(sessionStorage.getItem('error_message'), "Error");
        sessionStorage.setItem('error_message', null);
    }
});