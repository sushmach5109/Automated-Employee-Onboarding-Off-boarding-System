# Phase 1 — Requirement Analysis & Planning
**Complexity:** Medium | **Duration:** 30m | **Stories:** 4

## 1. Business Requirements
- BR1: HR must be able to raise a request when a new employee joins (onboarding) or leaves (offboarding).
- BR2: The system must automatically generate tasks for IT, Facilities, and Security based on the request type.
- BR3: Each task must carry an SLA so overdue tasks are flagged and escalated.
- BR4: HR must have a real-time dashboard showing request status across departments.
- BR5: Only authorized roles may view, edit, or close lifecycle requests and tasks.

## 2. Functional Requirements
| ID | Requirement |
|---|---|
| FR1 | Custom table to store employee lifecycle requests (`x_onb_lifecycle_request`) |
| FR2 | Two Service Catalog items: "Employee Onboarding Request" and "Employee Offboarding Request" |
| FR3 | Flow Designer flows that create child tasks assigned to `IT Support`, `Facilities`, and `Security` groups |
| FR4 | SLA definitions for each task type (e.g., IT Provisioning – 24 business hours) |
| FR5 | Email notifications on request creation, task assignment, SLA breach, and request closure |
| FR6 | Reports & a dashboard for HR (status by department, average completion time, overdue tasks) |
| FR7 | ACLs restricting read/write access by role |

## 3. Non-Functional Requirements
- Must work on both the Classic UI and Service Portal.
- Should scale to at least 500 concurrent requests without performance degradation.
- All configuration must live inside a single scoped application (`x_onb_lifecycle`) for clean packaging/migration.

## 4. Roles Identified
- `x_onb_lifecycle.admin` – full access, configuration
- `x_onb_lifecycle.hr` – create/view/close requests, view dashboard
- `x_onb_lifecycle.it_agent` – view/update IT tasks
- `x_onb_lifecycle.facilities_agent` – view/update Facilities tasks
- `x_onb_lifecycle.security_agent` – view/update Security tasks

## 5. Groups Identified
- IT Support
- Facilities
- Security
- HR Operations

## 6. Assumptions
- ServiceNow HR Service Delivery is **not** in scope; this is a standalone custom scoped app.
- Employee master data (name, department, manager, start/end date) is entered manually via the catalog form (no external HRIS integration in this phase).
