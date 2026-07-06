/**
 * Service Portal Widget Server Script: Employee Lifecycle Dashboard
 * Widget: employee_lifecycle_dashboard
 * Roles required to view: x_onb_lifecycle.hr, x_onb_lifecycle.admin
 */
(function () {

    var slaUtils = new SLAUtils();

    // --- Summary cards ---
    var totalGr = new GlideAggregate('x_onb_lifecycle_request');
    totalGr.addAggregate('COUNT');
    totalGr.query();
    data.totalRequests = totalGr.next() ? totalGr.getAggregate('COUNT') : 0;

    var openGr = new GlideAggregate('x_onb_lifecycle_request');
    openGr.addQuery('state', 'IN', '1,2,3,4');
    openGr.addAggregate('COUNT');
    openGr.query();
    data.openRequests = openGr.next() ? openGr.getAggregate('COUNT') : 0;

    data.overdueTasks = slaUtils.getAllBreachedTasks().length;

    var closedGr = new GlideAggregate('x_onb_lifecycle_request');
    closedGr.addQuery('state', 6); // Closed Complete
    closedGr.addQuery('sys_updated_on', '>=', gs.beginningOfThisMonth());
    closedGr.addAggregate('COUNT');
    closedGr.query();
    data.closedThisMonth = closedGr.next() ? closedGr.getAggregate('COUNT') : 0;

    // --- Recent requests table (last 20) ---
    data.requests = [];
    var gr = new GlideRecord('x_onb_lifecycle_request');
    gr.orderByDesc('sys_created_on');
    gr.setLimit(20);
    gr.query();

    var stateLabelMap = {
        '1': 'New', '2': 'In Progress', '3': 'Pending Approval',
        '4': 'Tasks Assigned', '6': 'Closed Complete',
        '7': 'Closed Incomplete', '8': 'Cancelled'
    };
    var stateClassMap = {
        '1': 'label-info', '2': 'label-primary', '3': 'label-warning',
        '4': 'label-primary', '6': 'label-success',
        '7': 'label-danger', '8': 'label-default'
    };

    while (gr.next()) {
        data.requests.push({
            number: gr.getValue('number'),
            employee_name: gr.getValue('u_employee_name'),
            request_type: gr.getValue('u_request_type'),
            department: gr.department ? gr.department.getDisplayValue() : '',
            state: stateLabelMap[gr.getValue('state')] || gr.getValue('state'),
            stateClass: stateClassMap[gr.getValue('state')] || 'label-default',
            created: gr.getValue('sys_created_on')
        });
    }

})();
