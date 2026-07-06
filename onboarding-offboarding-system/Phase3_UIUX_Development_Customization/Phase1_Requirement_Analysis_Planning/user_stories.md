# Phase 1 — User Stories (4 Stories)

### US-1: Custom Table Design
**As an** admin, **I want** a custom table `x_onb_lifecycle_request` **so that** every onboarding/offboarding request and its metadata (employee, type, department, status, dates) is tracked in one place.
**Acceptance Criteria:**
- Table extends Task (`task`) for built-in state/SLA/assignment support.
- Fields: employee name, employee email, department, manager, request type (Onboarding/Offboarding), joining/last working date, status.

### US-2: Role & Group Setup
**As an** admin, **I want** dedicated roles and groups **so that** access is restricted to the right people.
**Acceptance Criteria:**
- 5 roles created (admin, hr, it_agent, facilities_agent, security_agent).
- 4 groups created (IT Support, Facilities, Security, HR Operations) with correct role membership.

### US-3: Process Flow Mapping
**As a** business analyst, **I want** the onboarding and offboarding process mapped step-by-step **so that** the Flow Designer automation matches real-world handoffs between IT, Facilities, and Security.
**Acceptance Criteria:**
- Swimlane diagram produced (see `docs/architecture.md`).
- Sign-off from HR stakeholder simulated/documented.

### US-4: Project Plan & Timeline
**As a** team lead, **I want** a phase-wise project plan **so that** the team can track the 30-hour build against the 6 epics / 25 stories.
**Acceptance Criteria:**
- `project_plan.md` published with phase durations and dependencies.
