# Deployment Guide

## Prerequisites
- ServiceNow instance (PDI or dev instance), Utah release or later recommended.
- `admin` access to create scoped applications, tables, roles, ACLs, and Flow Designer flows.

## Step-by-Step Deployment

### 1. Create the Scoped Application
- Studio → Create Application Name: `Employee Onboarding & Offboarding`
- Scope: `x_onb_lifecycle`

### 2. Tables
- Create `x_onb_lifecycle_request` extending `Task`, using
  `Phase2_.../tables/x_onb_lifecycle_request_schema.json` as the field spec.
- Create `x_onb_lifecycle_task` extending `Task`, using
  `Phase2_.../tables/x_onb_lifecycle_task_schema.json`.

### 3. Roles & Groups
- Create the 5 roles from `roles.json` under **User Administration > Roles**.
- Create the 4 groups from `groups.json` under **User Administration > Groups**,
  assigning the matching role to each group.

### 4. Script Includes
- Create `LifecycleRequestUtils` and `SLAUtils` under
  **System Definition > Script Includes**, pasting the code from
  `Phase2_.../script_includes/`. Mark both **Client callable: false**.

### 5. Business Rules
- Create the 3 business rules from `Phase2_.../business_rules/` on the
  tables/conditions noted in each file's header comment.

### 6. ACLs
- Create the ACL records described in `acl_definitions.json` under
  **System Security > Access Control (ACL)**.

### 7. Service Catalog
- Create category "HR Services".
- Create the 2 catalog items from `Phase3_.../catalog_items/`, adding the
  listed variables.
- Attach the catalog client scripts from `Phase3_.../catalog_client_scripts/`.
- Apply the UI Policies from `Phase3_.../ui_policies/ui_policies.json`.

### 8. Flow Designer
- Build "Onboarding Fulfillment Flow" and "Offboarding Fulfillment Flow"
  following the step blueprints in `Phase5_.../flows/*.json`.
- Attach each flow as the fulfillment process on its respective catalog item.

### 9. Notifications
- Create the 5 notifications from `notification_definitions.json` under
  **System Notification > Email > Notifications**, wired to the events/
  triggers listed.
- Create a Scheduled Job "Check Overdue Lifecycle Tasks" (hourly) that calls
  `new SLAUtils().getAllBreachedTasks()` and fires the SLA Breach Escalation
  notification for each.

### 10. Service Portal Widget & Dashboard
- Create widget `employee_lifecycle_dashboard` using the files under
  `Phase3_.../widgets/employee_lifecycle_dashboard/`.
- Create the 5 reports from `hr_dashboard_config.json` and add them plus the
  widget to a new Service Portal page `onb-hr-dashboard`.

### 11. Seed & Test Data
- Run `Phase4_.../data_migration/import_employee_data.js` in
  **Scripts - Background** (non-production only).

### 12. Testing
- Run `test_onboarding_flow.js` and `test_offboarding_flow.js` from
  **Scripts - Background** in a test/dev instance.
- Review the security checklist in
  `Phase4_.../security/security_review_checklist.md` before promoting to
  production.

### 13. Package for Migration
- Studio → **Publish App** or export as an Update Set to move from Dev →
  Test → Production.
