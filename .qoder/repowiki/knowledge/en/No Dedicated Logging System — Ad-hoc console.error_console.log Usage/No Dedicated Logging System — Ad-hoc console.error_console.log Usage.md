---
kind: logging_system
name: No Dedicated Logging System — Ad-hoc console.error/console.log Usage
category: logging_system
scope:
    - '**'
source_files:
    - src/lib/directus.ts
---

This repository does not implement a structured logging system. There is no dedicated logger library (e.g., pino, winston, bunyan), no log-level configuration, no centralized logging module, and no log routing or sinks.

The only logging present is scattered ad-hoc usage of `console.error` and `console.log` calls inside `src/lib/directus.ts`, primarily in catch blocks for Directus SDK and fetch-based API calls (categories, vendors, reviews, auth, submissions). These calls are inconsistent: some include emoji prefixes (`❌ Error fetching...`, `🔍 Looking for slug:`), others are plain messages, and there is no uniform shape or severity classification. The `src/lib/analytics.ts` file contains no logging at all.

There are no environment-driven log levels, no request/response correlation IDs, no structured fields, and no server-side vs client-side separation of log destinations. The `.gitignore` mentions `*-debug.log*` patterns but these are npm/yarn/pnpm debug artifacts, not application logs.