/**
 * Background Script: Import Sample Employee Lifecycle Data
 * Run in: Scripts - Background (sub-production instance only)
 * Purpose: Seeds a handful of onboarding/offboarding requests for testing
 *          the flows, SLAs, notifications, and the HR dashboard.
 */
(function importSampleData() {

    var sampleRequests = [
        {
            u_employee_name: 'Ananya Rao',
            u_employee_email: 'ananya.rao@example.com',
            u_request_type: 'Onboarding',
            u_job_title: 'Software Engineer',
            u_joining_date: '2026-07-15',
            u_location: 'Hyderabad'
        },
        {
            u_employee_name: 'Rahul Mehta',
            u_employee_email: 'rahul.mehta@example.com',
            u_request_type: 'Onboarding',
            u_job_title: 'Business Analyst',
            u_joining_date: '2026-07-20',
            u_location: 'Bengaluru'
        },
        {
            u_employee_name: 'Priya Nair',
            u_employee_email: 'priya.nair@example.com',
            u_request_type: 'Offboarding',
            u_last_working_date: '2026-07-10',
            u_asset_return_required: true,
            u_access_revoke_required: true
        },
        {
            u_employee_name: 'Karthik Iyer',
            u_employee_email: 'karthik.iyer@example.com',
            u_request_type: 'Offboarding',
            u_last_working_date: '2026-07-12',
            u_asset_return_required: true,
            u_access_revoke_required: true
        }
    ];

    var createdCount = 0;

    sampleRequests.forEach(function (record) {
        var gr = new GlideRecord('x_onb_lifecycle_request');
        gr.initialize();
        for (var field in record) {
            gr.setValue(field, record[field]);
        }
        gr.setValue('short_description',
            record.u_request_type + ' - ' + record.u_employee_name);
        gr.setValue('state', 1); // New — triggers AutoAssignTasks business rule
        var sysId = gr.insert();
        if (sysId) {
            createdCount++;
        }
    });

    gs.info('import_employee_data: created ' + createdCount + ' of ' +
        sampleRequests.length + ' sample lifecycle requests.');

})();
