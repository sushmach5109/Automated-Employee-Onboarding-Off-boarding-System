# Final Presentation — Automated Employee Onboarding & Offboarding System

## Problem Statement
Manual onboarding/offboarding across IT, Facilities, HR, and Security caused
delayed provisioning, missed access revocations, and no single source of
truth for HR to track progress.

## Solution
A ServiceNow scoped application (`x_onb_lifecycle`) that:
- Captures requests through two Service Catalog items.
- Automatically fans out department-specific tasks via a business rule +
  Flow Designer fulfillment flow.
- Tracks each task against a department-specific SLA.
- Notifies stakeholders at every state transition and on SLA breach.
- Gives HR a live Service Portal dashboard plus 5 supporting reports.

## Key Results (Simulated / Test Environment)
- Request → task fan-out: **fully automated**, 0 manual task creation.
- Average department task SLA: IT 24h, Facilities 16h, Security 8h.
- HR dashboard refresh: every 60 seconds.
- Test coverage: onboarding flow, offboarding flow, and ACL enforcement all
  validated via background script tests (`Phase4_.../test_scripts/`).

## Architecture Summary
See `docs/architecture.md` for the full data model diagram and process flow.

## Demo Script (suggested walkthrough order)
1. Show catalog: submit "Employee Onboarding Request".
2. Show the 3 auto-created child tasks in each department's queue.
3. Show SLA countdown on a task.
4. Close all 3 tasks → show parent request auto-closes + notification fires.
5. Show HR dashboard reflecting the change in real time.
6. Repeat quickly for "Employee Offboarding Request".
7. Show the ACL test: an IT agent blocked from editing a Security task.

## Links
- **Demo Link:** _add after recording a walkthrough video_
- **GitHub Link:** _add after pushing this project to your repository_
