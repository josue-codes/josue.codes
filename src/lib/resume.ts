/**
 * The résumé as data. /resume/ draws it as a branch-and-merge graph: `main` is the journey, and every job and the
 * degree is a branch that forks from main when it starts and merges back when it ends. The page reads down into
 * the past, so a branch opens with a merge at the top and closes with a fork at the bottom. Edit copy here.
 *
 * Everything is written to the public boundary: no customer or seller names, no dollar figures, softened volumes,
 * no internal system names, no phone number. A `{ confirm }` segment is a number the owner still has to confirm;
 * it renders as a visibly flagged placeholder, never as plain copy.
 */

/** Text with optional placeholders. */
export type Rich = (string | { confirm: string })[];

/** The stop drawn for an entry: a ring where a job started, a small hollow stop for a promotion, a filled stop for
 * the current role, a grey stop for a degree. */
export type Mark = 'joined' | 'promotion' | 'current' | 'degree';

export interface Stop {
  type: 'stop';
  id: string;
  /** 1 for the primary job of the time, 2 for whatever ran alongside it. Never more, so phones fit three lanes. */
  lane: 1 | 2;
  mark: Mark;
  /** The gutter label on wide screens. */
  date: string;
  /** The span on the card. */
  when: string;
  title: string;
  org: string;
  place: string;
  /** Mono suffix after the organization in the eyebrow, e.g. "promotion · current". */
  note?: string;
  bullets: string[];
  result?: Rich;
}

/** A merge commit on main: the moment a branch rejoined the journey. Rendered as a slim row with a plain-words note. */
export interface Merge {
  type: 'merge';
  id: string;
  date: string;
  note: string;
  /** Leaves room below for a lane to emerge from main before the next branch starts beside it. */
  tall?: boolean;
}

export type Row = Stop | Merge;

/** An era band. Rows are newest first. */
export interface Zone {
  label: string;
  name: string;
  dates: string;
  rows: Row[];
}

/**
 * How a branch is drawn. `top` is the merge node on main it rejoins, or the stop that is its open tip. `bottom` is
 * where it forks from main: just above a main node, or just below its last stop (optionally capped before a node).
 * A branch with a `parent` lane is a short loop off that lane around its single stop: the degree during a job.
 */
export interface Branch {
  id: string;
  lane: 1 | 2;
  parent?: 1;
  top?: { merge: string } | { open: string };
  stops: string[];
  bottom?: { above: string } | { below: string; before?: string };
}

const manager: Stop = {
  type: 'stop',
  id: 'manager',
  lane: 1,
  mark: 'current',
  date: 'Aug 2025',
  when: 'Aug 2025 – Present',
  title: 'Manager, Process Automation',
  org: 'B-Stock',
  place: 'Orlando, FL',
  note: 'promotion · current',
  bullets: [
    'Lead a four-person Process Automation team; hired and trained a new specialist and made AI-assisted code review part of every change.',
    'Introduced agentic engineering: an 11-stage, human-gated agent pipeline for seller cloud migrations, plus internal Claude Code plugins for onboarding and SDLC orchestration.',
    'Driving the migration of a 75+ seller suite to a new platform.',
  ],
};

const source: Stop = {
  type: 'stop',
  id: 'source',
  lane: 2,
  mark: 'joined',
  date: 'Jun 2023',
  when: 'Jun 2023 – Sep 2025',
  title: 'Software Developer (Contract)',
  org: 'Source Software',
  place: 'Remote',
  note: 'parallel, alongside b-stock',
  bullets: [
    'With a small team, built an all-in-one operations platform (inventory, orders, invoicing, payments, payroll, time tracking and lead tracking) on Ruby on Rails, PostgreSQL and AWS.',
  ],
  result: ['Still in production as the company’s system of record.'],
};

const supervisor: Stop = {
  type: 'stop',
  id: 'supervisor',
  lane: 1,
  mark: 'promotion',
  date: 'Jan 2023',
  when: 'Jan 2023 – Aug 2025',
  title: 'Supervisor of Process Automation',
  org: 'B-Stock',
  place: 'Orlando, FL',
  note: 'promotion',
  bullets: [
    'Architected a modular Python 3.11 pipeline framework on Google Cloud (Cloud Run, Cloud Storage, BigQuery), now powering listing pipelines for national retail and automotive sellers.',
    'Led a major retailer’s listing-automation pipeline through a cross-team, end-to-end launch handling tens of thousands of listing submissions.',
    'Shipped emergency automation that cleared a six-figure listing backlog, one of several rapid-response recoveries.',
    'Built shared libraries: an ML categorization integration used by eight seller pipelines, and an OAuth 2.0 client that restored automated platform access.',
  ],
  result: [
    '2,200+ tests behind the framework. Errors eliminated in every automated step; the suite’s error rate is under 5%, all of it from manual steps.',
  ],
};

const specialist: Stop = {
  type: 'stop',
  id: 'specialist',
  lane: 1,
  mark: 'joined',
  date: 'Jan 2021',
  when: 'Jan 2021 – Jan 2023',
  title: 'eCommerce Listing / Automation Specialist',
  org: 'B-Stock',
  place: 'Remote',
  bullets: [
    'Cut manual processing time 80% with Python scripts converting manifests into upload-ready files.',
    'Reduced disputes 15% by introducing a desktop app flagging live listing inconsistencies and seller rule violations.',
    'Enabled teammates to replicate time savings in their own automation projects through mentorship.',
  ],
  result: ['Key Outcomes: Reduced a 20-person team’s manual workload, improving accuracy and supporting more work without additional hiring.'],
};

const valencia: Stop = {
  type: 'stop',
  id: 'valencia',
  lane: 2,
  mark: 'degree',
  date: '2020',
  when: '2020',
  title: 'A.S. Computer Programming',
  org: 'Valencia College',
  place: 'Orlando, FL',
  note: 'during universal',
  bullets: [
    'Certificates: Computer Programming; Computer Programming Specialist; Computer Information Data Specialist; Web Development.',
  ],
};

const universal: Stop = {
  type: 'stop',
  id: 'universal',
  lane: 1,
  mark: 'joined',
  date: '2012',
  when: '2012 – 2021',
  title: 'Scheduling Specialist',
  org: 'Universal Orlando Resort',
  place: 'Orlando, FL',
  bullets: ['Previously Sales Coach, Team Lead, Sales Associate and Trainer.'],
};

export const resume = {
  summary:
    'Automation and engineering leader with five-plus years at B-Stock, promoted from listing specialist to Manager of Process Automation. I build the Python and Google Cloud pipelines that turn seller inventory manifests into live marketplace listings, and I lead the team of four migrating a 75+ seller suite to a new platform.',
  /** Three measured results, shown in the second syntax color like the Work page's outcomes. */
  glance: [
    '20+ sellers onboarded onto automated listing pipelines',
    'Errors eliminated in every automated step',
    'Reduced a 20-person team’s manual workload, improving accuracy and supporting more work without additional hiring',
  ],
  caps: { bottom: '2012 · the start' },
  zones: [
    {
      label: 'zone 1',
      name: 'Leadership',
      dates: '2023 – now',
      rows: [
        { type: 'merge', id: 'merge-source', date: 'Sep 2025', note: 'source software merged into main' },
        manager,
        source,
        supervisor,
      ],
    },
    { label: 'zone 2', name: 'Automation Engineering', dates: '2021 – 2023', rows: [specialist] },
    {
      label: 'zone 3',
      name: 'Hospitality Operations',
      dates: '2012 – 2021',
      rows: [
        { type: 'merge', id: 'merge-universal', date: '2021', note: 'universal orlando merged into main', tall: true },
        valencia,
        universal,
      ],
    },
  ] satisfies Zone[],
  branches: [
    // B-Stock: open at the top (the current role is its tip); forks from main just above the Universal merge.
    { id: 'bstock', lane: 1, top: { open: 'manager' }, stops: ['manager', 'supervisor', 'specialist'], bottom: { above: 'merge-universal' } },
    // Source Software: merges into main above the Manager stop, forks from main below its own stop.
    { id: 'source', lane: 2, top: { merge: 'merge-source' }, stops: ['source'], bottom: { below: 'source' } },
    // Universal: merges into main at 2021, forks from main just above the start.
    { id: 'universal', lane: 1, top: { merge: 'merge-universal' }, stops: ['universal'], bottom: { below: 'universal', before: 'bottom' } },
    // Valencia: a short loop off the Universal lane, during that job.
    { id: 'valencia', lane: 2, parent: 1, stops: ['valencia'] },
  ] satisfies Branch[],
  skills: [
    ['Languages', 'Python, SQL, Ruby, JavaScript, HTML/CSS'],
    ['Cloud & Data', 'Google Cloud (Cloud Run, Cloud Storage, BigQuery), AWS, PostgreSQL/AlloyDB, Apache Airflow'],
    ['Frameworks & Tools', 'Ruby on Rails, FastAPI, Pydantic, React, pytest, Docker, GitLab CI/CD, REST APIs, OAuth 2.0'],
    ['AI & Automation', 'Claude Code, OpenAI Codex, agentic workflows, ML-assisted categorization'],
    ['Leadership', 'Team management, hiring and training, code review, test planning, incident response'],
  ],
};
