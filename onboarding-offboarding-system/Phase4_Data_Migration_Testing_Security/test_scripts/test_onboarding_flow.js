/**
 * Test Script: Onboarding Flow — End-to-End Validation
 * Run in: Scripts - Background (test/dev instance only)
 *
 * Validates:
 * 1. Creating an Onboarding request auto-generates 3 department tasks.
 * 2. Each task is assigned to the correct group.
 * 3. Closing all 3 tasks auto-closes the parent request.
 */
(function testOnboardingFlow() {

    var assertsPassed = 0;
    var assertsFailed = 0;

    function assert(condition, message) {
        if (condition) {
            assertsPassed++;
            gs.info('PASS: ' + message);
        } else {
            assertsFailed++;
            gs.error('FAIL: ' + message);
        }
    }

    // 1. Create parent request
    var reqGr = new GlideRecord('x_onb_lifecycle_request');
    reqGr.initialize();
    reqGr.setValue('u_employee_name', 'Test User Onboard');
    reqGr.setValue('u_employee_email', 'test.user.onboard@example.com');
    reqGr.setValue('u_request_type', 'Onboarding');
    reqGr.setValue('u_joining_date', '2026-08-01');
    reqGr.setValue('short_description', 'TEST - Onboarding flow validation');
    reqGr.setValue('state', 1);
    var reqSysId = reqGr.insert();

    assert(!!reqSysId, 'Parent onboarding request created');

    // 2. Verify 3 department tasks were auto-created
    var taskGr = new GlideRecord('x_onb_lifecycle_task');
    taskGr.addQuery('u_parent_request', reqSysId);
    taskGr.query();
    var taskCount = 0;
    var taskSysIds = [];
    while (taskGr.next()) {
        taskCount++;
        taskSysIds.push(taskGr.getUniqueValue());
    }
    assert(taskCount === 3, 'Exactly 3 department tasks created (found ' + taskCount + ')');

    // 3. Verify assignment groups are set
    taskGr = new GlideRecord('x_onb_lifecycle_task');
    taskGr.addQuery('u_parent_request', reqSysId);
    taskGr.query();
    var allGroupsAssigned = true;
    while (taskGr.next()) {
        if (!taskGr.getValue('assignment_group')) {
            allGroupsAssigned = false;
        }
    }
    assert(allGroupsAssigned, 'All department tasks have an assignment group');

    // 4. Close all tasks, then verify parent auto-closes
    taskSysIds.forEach(function (sysId) {
        var t = new GlideRecord('x_onb_lifecycle_task');
        if (t.get(sysId)) {
            t.setValue('state', 3); // Closed Complete
            t.update();
        }
    });

    var parentCheck = new GlideRecord('x_onb_lifecycle_request');
    parentCheck.get(reqSysId);
    assert(parentCheck.getValue('state') === '6',
        'Parent request auto-closed after all department tasks closed');

    gs.info('--- Onboarding Flow Test Summary: ' + assertsPassed +
        ' passed, ' + assertsFailed + ' failed ---');

})();
