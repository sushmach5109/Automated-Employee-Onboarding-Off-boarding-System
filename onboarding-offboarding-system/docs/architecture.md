# Architecture & Data Model

## High-Level Process Flow

```
                     ┌─────────────────────────────┐
                     │   Service Catalog (HR Portal) │
                     │  - Onboarding Request         │
                     │  - Offboarding Request        │
                     └──────────────┬───────────────┘
                                    │ submit
                                    ▼
                     ┌─────────────────────────────┐
                     │ x_onb_lifecycle_request      │  (state: New)
                     └──────────────┬───────────────┘
                                    │ Business Rule: AutoAssignTasks
                                    ▼
        ┌────────────────────┬────────────────────┬────────────────────┐
        ▼                    ▼                    ▼
 ┌───────────────┐   ┌───────────────┐   ┌────────────────┐
 │ IT Task        │   │ Facilities    │   │ Security Task   │
 │ (IT Support)   │   │ Task          │   │ (Security)      │
 │ SLA: 24h       │   │ SLA: 16h      │   │ SLA: 8h         │
 └───────┬───────┘   └───────┬───────┘   └────────┬────────┘
         │  close             │  close             │  close
         └────────────────────┴────────────────────┘
                                    │ all closed
                                    ▼  Business Rule: UpdateRequestStatus
                     ┌─────────────────────────────┐
                     │ x_onb_lifecycle_request      │  (state: Closed Complete)
                     └──────────────┬───────────────┘
                                    │ Notification
                                    ▼
                     ┌─────────────────────────────┐
                     │  HR Dashboard (Service Portal)│
                     └─────────────────────────────┘
```

## Data Dictionary

### `x_onb_lifecycle_request` (extends Task)
| Field | Type | Notes |
|---|---|---|
| number | string | auto, prefix `ONB` |
| u_employee_name | string | |
| u_employee_email | email | |
| u_department | reference (cmn_department) | |
| u_manager | reference (sys_user) | |
| u_job_title | string | onboarding only |
| u_request_type | choice | Onboarding / Offboarding |
| u_joining_date | date | onboarding only |
| u_last_working_date | date | offboarding only |
| u_location | string | |
| u_asset_return_required | boolean | offboarding |
| u_access_revoke_required | boolean | offboarding |
| u_priority_reason | string | notes |
| state | choice | New, In Progress, Pending Approval, Tasks Assigned, Closed Complete, Closed Incomplete, Cancelled |

### `x_onb_lifecycle_task` (extends Task)
| Field | Type | Notes |
|---|---|---|
| number | string | auto, prefix `ONBT` |
| u_parent_request | reference (x_onb_lifecycle_request) | |
| u_department_type | choice | IT / Facilities / Security |
| u_checklist | string | auto-populated per request type + department |
| assignment_group | reference (sys_user_group) | IT Support / Facilities / Security |
| sla_due | glide_date_time | calculated by SLAUtils |

## Roles & Groups Map
| Group | Role | Table Access |
|---|---|---|
| HR Operations | x_onb_lifecycle.hr | read/write on request, read-only on tasks |
| IT Support | x_onb_lifecycle.it_agent | read/write on IT tasks only |
| Facilities | x_onb_lifecycle.facilities_agent | read/write on Facilities tasks only |
| Security | x_onb_lifecycle.security_agent | read/write on Security tasks only |
| (implicit) | x_onb_lifecycle.admin | full access, all tables |
