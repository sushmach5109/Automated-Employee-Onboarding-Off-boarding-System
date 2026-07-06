/**
 * Script Include: SLAUtils
 * Scope: x_onb_lifecycle
 * Client callable: false
 * Description: Helper functions for SLA duration lookup and breach
 *              detection, used by business rules and the HR dashboard
 *              report source.
 */
var SLAUtils = Class.create();
SLAUtils.prototype = {
    initialize: function () {
        // Business-hour durations, keyed by department.
        this.SLA_HOURS = {
            'IT': 24,
            'Facilities': 16,
            'Security': 8
        };
    },

    /**
     * Returns the SLA due Glide date/time for a task created "now",
     * based on department business-hour duration.
     */
    calculateDueDate: function (department) {
        var hours = this.SLA_HOURS[department] || 24;
        var gdt = new GlideDateTime();
        gdt.addSeconds(hours * 60 * 60);
        return gdt;
    },

    /**
     * Returns true if a task's SLA due date has passed and it is not closed.
     */
    isBreached: function (taskGr) {
        var due = taskGr.getValue('sla_due');
        if (!due) return false;

        var dueGdt = new GlideDateTime(due);
        var now = new GlideDateTime();
        var stateClosed = (taskGr.getValue('state') === '3'); // Closed Complete
        return (now.compareTo(dueGdt) > 0) && !stateClosed;
    },

    /**
     * Returns an array of task sys_ids that are currently breached,
     * used by a scheduled job to send escalation notifications.
     */
    getAllBreachedTasks: function () {
        var breached = [];
        var gr = new GlideRecord('x_onb_lifecycle_task');
        gr.addQuery('state', '!=', '3');
        gr.addNotNullQuery('sla_due');
        gr.query();
        while (gr.next()) {
            if (this.isBreached(gr)) {
                breached.push(gr.getUniqueValue());
            }
        }
        return breached;
    },

    type: 'SLAUtils'
};
