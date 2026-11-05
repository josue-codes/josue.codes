# 2. No CMS yet

Date: 2026-11-04 · Status: accepted

## Context
One person writes the content, and the writing is the slow part, not the editing tools. Git-based CMSs that need server rendering would undo the static-only setup.

## Decision
Write case studies as Markdown files in the repo. No admin UI.

## Consequences
Editing means a commit, which also leaves a clean history. Revisit when editing files by hand gets in the way, or when someone else needs to edit.
