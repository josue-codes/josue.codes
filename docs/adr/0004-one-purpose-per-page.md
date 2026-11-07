# 4. One purpose per page

Date: 2026-11-07 · Status: accepted

## Context
Contact details and calls to action had spread across pages. About listed email, LinkedIn and GitHub and linked to the résumé. The draft Résumé page restated the same contact details, added an "Email me" button and linked to the case studies. Each copy pulls the reader away from what that page is for, and each one has to be kept in sync.

## Decision
Each page serves one purpose and carries only what serves it.
- Contact details live on a Contact page (`/contact/`), linked from the header in place of the old mailto "Email" link.
- About is about the owner. It has no contact list and no résumé button.
- Résumé is the résumé. It has no contact block, no "Email me" button and no link to the case studies. The PDF download stays, because it is the résumé itself.
- The site chrome (header and footer) handles cross-page navigation, so page bodies don't repeat it.
- Exception: the legal pages keep the contact details their own text needs.

## Consequences
About is sparse for now. That is accepted, and it will be filled out in a later update. Contact details are maintained in `src/site.ts`, and only the Contact page, the footer and the legal pages render them. A new page states its single purpose, and anything that doesn't serve that purpose belongs in the header, the footer or another page.
