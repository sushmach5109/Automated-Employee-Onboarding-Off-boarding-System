/**
 * Script Include: LifecycleRequestUtils
 * Scope: x_onb_lifecycle
 * Client callable: false
 * Description: Core server-side helper functions for the Employee
 *              Onboarding & Offboarding application. Creates the
 *              department child tasks (IT / Facilities / Security)
 *              for a given parent request and applies the correct
 *              assignment group + SLA.
 */
var LifecycleRequestUtils = Class.create();
LifecycleRequestUtils.prototype = {
    initialize: function () {
        this.DEPARTMENTS = ['IT', 'Facilities', 'Security'];
        this.GROUP_MAP = {
            'IT': 'IT Support',
            'Facilities': 'Facilities',
            'Security': 'Security'
        };
        this.CHECKLIST_MAP = {
            'Onboarding': {
                'IT': 'Create AD account; Assign laptop; Provision email & VPN; Install standard software.',
                'Facilities': 'Allocate desk/workstation; Issue access badge; Arrange parking (if applicable).',
                'Security': 'Grant building access; Grant application access per role; Enroll in security awareness training.'
            },
            'Offboarding': {
                'IT': 'Disable AD account; Collect laptop; Revoke email & VPN; Wipe/re-image device.',
                'Facilities': 'Recover access badge; Vacate desk/workstation; Cancel parking.',
                'Security': 'Revoke building access; Revoke application access; Confirm exit interview completed.'
            }
        };
    },

    /**
     * Creates one child task per department for the given parent request.
     * @param {GlideRecord} parentGr - a loaded x_onb_lifecycle_request GlideRecord
     * @returns {Array} sys_ids of created tasks
     */
    createDepartmentTasks: function (parentGr) {
        var createdTaskIds = [];
        var requestType = parentGr.getValue('u_request_type');

        for (var i = 0; i < this.DEPARTMENTS.length; i++) {
            var dept = this.DEPARTMENTS[i];
            var taskGr = new GlideRecord('x_onb_lifecycle_task');
            taskGr.initialize();
            taskGr.setValue('u_parent_request', parentGr.getUniqueValue());
            taskGr.setValue('u_department_type', dept);
            taskGr.setValue('short_description',
                requestType + ' task for ' + dept + ' — ' + parentGr.getValue('u_employee_name'));
            taskGr.setValue('assignment_group', this._lookupGroupSysId(this.GROUP_MAP[dept]));
            taskGr.setValue('u_checklist', this.CHECKLIST_MAP[requestType][dept]);
            taskGr.setValue('priority', parentGr.getValue('priority') || 3);
            var newSysId = taskGr.insert();
            if (newSysId) {
                createdTaskIds.push(newSysId);
            }
        }
        return createdTaskIds;
    },

    /**
     * Returns true when every child task for a parent request is Closed Complete.
     * Used by the business rule that auto-closes the parent request.
     */
    areAllChildTasksClosed: function (parentSysId) {
        var gr = new GlideRecord('x_onb_lifecycle_task');
        gr.addQuery('u_parent_request', parentSysId);
        gr.addQuery('state', '!=', '3'); // 3 = Closed Complete (example mapping)
        gr.query();
        return !gr.hasNext();
    },

    _lookupGroupSysId: function (groupName) {
        var grp = new GlideRecord('sys_user_group');
        grp.addQuery('name', groupName);
        grp.query();
        if (grp.next()) {
            return grp.getUniqueValue();
        }
        gs.warn('LifecycleRequestUtils: group not found - ' + groupName);
        return '';
    },

    type: 'LifecycleRequestUtils'
};
