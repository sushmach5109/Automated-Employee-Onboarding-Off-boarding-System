/**
 * Business Rule: Update Parent Request Status
 * Table: x_onb_lifecycle_task
 * When: after
 * Insert: false | Update: true | Delete: false
 * Condition: current.state.changesTo('3')  // Closed Complete
 * Order: 100
 *
 * Description: When a department child task is closed, check whether all
 * sibling tasks for the same parent request are also closed. If so,
 * mark the parent lifecycle request as Closed Complete.
 */
(function executeRule(current, previous) {

    var utils = new LifecycleRequestUtils();
    var parentSysId = current.getValue('u_parent_request');

    if (!parentSysId) {
        return;
    }

    if (utils.areAllChildTasksClosed(parentSysId)) {
        var parentGr = new GlideRecord('x_onb_lifecycle_request');
        if (parentGr.get(parentSysId)) {
            parentGr.state = 6; // Closed Complete
            parentGr.update();
            gs.info('UpdateRequestStatus: request ' + parentGr.number +
                ' auto-closed — all department tasks complete.');
        }
    }

})(current, previous);
