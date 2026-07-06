# Automated Employee Onboarding & Offboarding System
### ServiceNow Scoped Application — `x_onb` (Information Technology)

## Overview
This project automates the employee onboarding and offboarding process in
ServiceNow by replacing manual workflows with catalog-driven requests,
automated task assignments, and SLA monitoring. It ensures timely completion
by IT, Facilities, and Security, while giving HR real-time dashboards and
reports for efficiency, transparency, and compliance.

## Team
| Name | Role |
|---|---|
| Buradagunta Vardhan | Team Lead |
| Devarakonda Satwika | Member |
| Doppalapudi Williams | Member |
| Ganjam Anusha | Member |
| Chillara Sai Sushma | Member |

## Skills Required
ServiceNow Certified System Administrator (CSA), Service Catalog, Design Flow
(Flow Designer), Service-Level Agreements, Access Controls (ACLs),
Dashboards, Process Analysis, Problem Solving.

## Project Stats
- **Total Epics:** 6
- **Total Tasks (Stories):** 25
- **Total Subtasks:** 0

## Phases

| Phase | Complexity | Duration | Stories |
|---|---|---|---|
| Phase 1: Requirement Analysis & Planning | Medium | 30m | 4 |
| Phase 2: Backend Development & Configurations | Hard | 3h 0m | 3 |
| Phase 3: UI/UX Development & Customization | Hard | 1h 9m | 3 |
| Phase 4: Data Migration, Testing & Security | Easy | 39m | 4 |
| Phase 5: Deployment, Documentation & Final Presentation | Hard | 47m | 10 |

## Build Instructions (Original Brief)
> Create roles, groups, and a custom table to track employee lifecycle
> requests. Build Service Catalog items for onboarding and offboarding, and
> automate workflows in Flow Designer to generate tasks for IT, Facilities,
> and Security. Configure SLAs, ACLs, and notifications, then design reports
> and dashboards for HR to track progress. Finally, test the end-to-end
> process to ensure accuracy and compliance.

## Folder Structure
```
onboarding-offboarding-system/
├── Phase1_Requirement_Analysis_Planning/     # Requirements, user stories, plan
├── Phase2_Backend_Development_Configurations/  # Table, roles/groups, script includes, business rules, ACLs
├── Phase3_UIUX_Development_Customization/    # Catalog items, catalog client scripts, UI policies, Service Portal widget
├── Phase4_Data_Migration_Testing_Security/   # Data import script, test scripts, security checklist
├── Phase5_Deployment_Documentation_FinalPresentation/ # Flows, notifications, reports/dashboards, deployment guide
└── docs/                                     # Architecture diagram & data dictionary
```

## How to Deploy
1. Log in to a ServiceNow Personal Developer Instance (PDI) as `admin`.
2. Create a new scoped application: **System Applications > Studio > Create
   Application** → name it `Employee Onboarding & Offboarding` (scope
   `x_onb_lifecycle`).
3. Recreate the table in `Phase2.../tables/` using the field list provided
   (or import the XML if you regenerate it via Studio's "Export to XML").
4. Create the roles/groups in `Phase2.../roles_and_groups/`.
5. Paste the Script Includes and Business Rules from
   `Phase2.../script_includes` and `Phase2.../business_rules` into their
   respective ServiceNow tables (`sys_script_include`, `sys_script`).
6. Add the ACLs from `Phase2.../acls/acl_definitions.json` under
   **System Security > Access Control (ACL)**.
7. Create the two Service Catalog items from `Phase3.../catalog_items` and
   attach the catalog client scripts.
8. Build the two Flow Designer flows described in
   `Phase5.../flows/*.json` (these are structured blueprints — Flow
   Designer flows aren't stored as flat JS, so recreate them visually using
   the step-by-step spec provided).
9. Import the notification definitions and configure the HR dashboard from
   `Phase5.../reports_dashboards`.
10. Run the test scripts in `Phase4.../test_scripts` from a Background
    Script (Scripts - Background) in a sub-production instance only.

See `docs/architecture.md` for the full data model and process diagram.
