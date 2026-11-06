---
title: "Untangling a Multi-Team Process into One That Scales"
summary: "A seller's contract program built a months-long backlog because three teams priced the same inventory three different ways. I aligned them on one category taxonomy, changed a rigid platform requirement, and automated the rest. Installment setup fell from an hour to under a minute, and the backlog cleared in about a week."
role: "Leader and engineer: led the cross-team diagnosis, set the shared category taxonomy, wrote the platform change spec, and built the automation"
outcome: "Installment setup went from ~1 hour to under 1 minute. A months-long backlog cleared in about a week and hasn't come back."
date: 2026-03-24
links: []
draft: false
---

## Problem
At B-Stock, a contract program for a large retail seller built up a backlog over a few months. The backlog was a symptom. The real problem was a gap in understanding and expectations about pricing: how much to charge buyers.

Buyers were charged by product category, using the categories on the seller's website. Our inventory manifests didn't include those categories, and nothing mapped the manifest data back to them. So each member of Team 2 built their own mapping, one manifest at a time, and handed it to Team 1 to price. The mappings didn't agree. The same manifest category could land in three different website categories, depending on who you asked.

Everything else followed from that:
- Mappings shifted, so prices shifted, so contract terms changed constantly.
- Each change had to be repeated in several systems. Part of the platform treated a contract as fixed once it was set, so changes became API patches, one or two a day.
- Each installment took about an hour to set up by hand, from inventory manifests processed on individual laptops.
- Work on a contract paused until its terms settled. Inventory waited in storage, costs climbed, and fulfillment time stretched past a week.

## My Role
I worked this as leader and engineer, across three teams:
- Team 1 ran the day-to-day processing.
- Team 2 owned the contracts and the relationships with buyers.
- Team 3, a platform engineering team, owned the part of the system that couldn't change.

## Diagnosis
I brought the three teams together to walk through their processes live, side by side, and kept the focus on root causes, not fault. No one was doing their job badly. Each team was working from a different pricing model, with different expectations about when prices could change. With the processes laid side by side, the pricing gap showed itself.

## Decision
**One shared taxonomy.** I pushed for mapping every manifest category to B-Stock's internal category taxonomy and pricing against that. The manifest's own categories were mostly known, so the gap was only on the seller's side. Where a mapping had been done before, historical data filled it in. Where it hadn't, a machine-learning model we had already been building suggested the internal category. All three teams now spoke the same language.

The mapping now maintains itself, so no one has to own it. What remains is an exceptions list, which remaps a product to a different internal category instead of to a value each person reads differently. Team 2 owns it, because they're closest to buyers and hear pricing concerns first.

**The alternative I rejected:** formalizing Team 2's per-contract mappings, with exceptions defined per contract. That would have kept several versions of the truth, made it hard to verify that pricing was correct, and needed a contract update for every installment.

**Change the requirement, not just the workaround.** The platform treated a contract as a firm agreement, fixed once set. The business ran these contracts more like a handshake: the structure was agreed, and the prices needed to stay adjustable. I got Team 3's agreement to change that and wrote the spec, and they built it, since that part of the system was theirs. Contract terms became editable on the platform, and the API patches stopped.

## Implementation
With pricing settled and the platform able to accept changes, the automation could stay small:
- **Sync with the system of record.** Team 2 managed contracts in an external system of record, often while on calls with buyers. Another engineering team connected the platform to it, so a change there updates the contract terms on the platform automatically, with no re-keying.
- **Inventory manifests in the cloud.** Processing moved off laptops into a cloud service. It stores each inventory manifest and summarizes it, so Team 1 can see which contract it belongs to without combing through the file.
- **Automated installments.** Team 1 picks the contract, and a script creates the installment. The whole thing takes under a minute, and nearly all of that minute is the judgment call, the only manual step left.

## Outcome
- **Installment setup: ~1 hour → under 1 minute.**
  - A dozen or more installments came in every day. That was the full workday of one to two people, every day, now a few minutes of one person's day.
- **API patches for contract changes: 1–2 a day → none.**
  - That freed 3–6 hours of engineering time every week that had been pulled off feature work.
- **Storage costs: a six-figure problem → four figures.**
- **Fulfillment time: 1+ weeks → days.**
  - Buyers got what they'd paid for sooner and could start reselling it sooner.
- **Backlog: built up over months → cleared in about a week.**
  - Inventory is now assigned to a contract within hours of arriving, and the backlog hasn't come back.

The fix lasted because three teams agreed on how pricing works, and because the platform was changed to match how the business really runs. The rest was engineering. One shared taxonomy, with an exceptions list on top, is the adapter pattern applied to an organizational boundary. It put the complexity in one place, so the integration and automation around it could stay simple.

## Glossary
- **Seller:** a business whose surplus or returned inventory B-Stock sells on its behalf.
- **Buyer:** a business that buys that inventory, usually to resell it.
- **Contract:** an agreement for a buyer to take a recurring supply of a seller's inventory at agreed prices.
- **Contract terms:** the prices and rules in a contract, usually set per product category.
- **Installment:** one delivery of inventory under a contract, set up on the platform so it can be priced, invoiced and shipped.
- **Inventory manifest:** an itemized list of what's in a shipment of inventory.
- **Category taxonomy:** a structured list of product categories (for example, "small kitchen appliances") used to group and price products.
- **Exceptions list:** a short, editable list of products that don't fit the standard category mapping. It can be updated without changing code.
- **Platform:** B-Stock's online marketplace, where sellers' inventory is sold to buyers.
- **System of record:** the system treated as the single source of truth for a given piece of information.
- **API patch:** a manual fix where an engineer changes data directly through the platform's back end, because the normal tools can't.
- **Adapter pattern:** a design that translates between two systems, so neither has to change to fit the other.
- **Fulfillment time:** how long it takes from inventory being ready to it shipping to the buyer.

---

*Some details in this case study are deliberately general. Names, figures and specifics are left out or abstracted to honor contractual confidentiality obligations to my employer and its partners.*
