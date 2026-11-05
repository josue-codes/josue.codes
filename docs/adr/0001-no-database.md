# 1. No database

Date: 2026-11-04 · Status: accepted

## Context
The site is a few case studies and contact links. Nothing a visitor does needs to be stored.

## Decision
No database. All content is Markdown, built into static HTML at deploy time.

## Consequences
There's nothing to run, secure, back up or pay for, and every page is a cached file. If a feature ever needs visitors to write data (a contact form or counters, for example), add Cloudflare D1 or KV at that point, for that feature only.
