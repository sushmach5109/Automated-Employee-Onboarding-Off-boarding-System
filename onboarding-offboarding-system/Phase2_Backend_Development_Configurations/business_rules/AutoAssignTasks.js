/**
 * Business Rule: Auto Assign Department Tasks
 * Table: x_onb_lifecycle_request
 * When: after
 * Insert: true | Update: false | Delete: false
 * Condition: current.state == '1' (New)  AND current.u_request_type is not empty
 * Order: 100
 *
 * Description: When a new lifecycle request is inserted, automatically
 * generate the three department child tasks (IT, Facilities, Security)
 * via LifecycleRequestUtils, then move the parent request to
 * "Tasks Assigned".
 */
(function executeRule(current, previous /*null when async*/) {

    var utils = new LifecycleRequestUtils();
    var createdTaskIds = utils.createDepartmentTasks(current);

    if (createdTaskIds.length === 3) {
        current.state = 4; // Tasks Assigned
        current.setWorkflow(false); // avoid recursive BR trigger
        current.update();
        current.setWorkflow(true);
        gs.info('AutoAssignTasks: created ' + createdTaskIds.length +
            ' tasks for request ' + current.number);
    } else {
        gs.error('AutoAssignTasks: expected 3 tasks, created ' +
            createdTaskIds.length + ' for request ' + current.number);
    }

})(current, previous);
