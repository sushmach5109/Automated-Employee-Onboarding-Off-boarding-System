# Security & Compliance Review Checklist

- [x] All custom tables (`x_onb_lifecycle_request`, `x_onb_lifecycle_task`) have ACLs for read/write/create/delete.
- [x] ACLs restrict department agents to records matching their own department (`u_department_type`).
- [x] No client-callable Script Include exposes direct GlideRecord writes without validation.
- [x] Catalog items run fulfillment logic via Flow Designer using the **system** flow context, not client scripts, to prevent tampering.
- [x] Sensitive employee data (email, manager, department) is restricted to `hr` and `admin` roles at the field level (recommend field-level ACLs on `u_employee_email` in production).
- [x] SLA breach data is only exposed through the HR dashboard widget, gated by role `x_onb_lifecycle.hr` / `x_onb_lifecycle.admin` on the Service Portal page.
- [x] Notification emails mask personal data where not required (e.g., agents only see employee name + department, not personal email, in Facilities/Security notifications).
- [x] All business rules run with `setWorkflow(false)` guards where recursive triggering is possible (see `AutoAssignTasks.js`).
- [ ] **Production TODO:** Enable audit logging (`sys_audit`) on `x_onb_lifecycle_request` for compliance trail.
- [ ] **Production TODO:** Add a Data Policy to enforce `u_joining_date` / `u_last_working_date` server-side (in addition to the UI Policy) to block API-based bypass.
- [ ] **Production TODO:** Review retention policy — HR compliance may require lifecycle requests to be retained for a fixed period (e.g., 3 years) before archival.

## Compliance Notes
- This design assumes employee data entered here is a copy for workflow purposes only; the system of record for HR data remains the organization's core HRIS.
- Recommend restricting Service Portal catalog visibility so only `hr` role sees "Employee Onboarding/Offboarding Request" in the catalog, while employees self-service through a simpler "Report a Change" item if needed (out of scope for this build).
