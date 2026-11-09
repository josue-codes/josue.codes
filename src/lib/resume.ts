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
  bullets: string[];
  result?: Rich;
}

/** A merge commit on main: the moment a branch rejoined the journey. Rendered as a slim row, with a plain-words note
 * when one is given. */
export interface Merge {
  type: 'merge';
  id: string;
  date: string;
  note?: string;
  /** Leaves room below for a lane to emerge from main before the next branch starts beside it. */
  tall?: boolean;
}

export type Row = Stop | Merge;

/** A tinted or plain band; bands alternate, one role (or the degree with its job) each. Rows are newest first. */
export interface Zone {
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
  bullets: [
    'Delivered 3x engineering velocity by leading my team to redesign specification, development and testing using AI workflows we built.',
    'Focused human review on decisions by leading my team to build bots that run integration tests and analyze results.',
    'Shipped emergency automation that cleared a six-figure inventory backlog, one of several rapid-response recoveries.',
    'Leading my team to eliminate 90% of all manual work organization-wide; 40% of workflows already meet that target.',
  ],
  result: ['Key Outcomes: Changed how teams build and operate, pairing faster engineering with organization-wide automation.'],
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
  bullets: [
    'Delivered features for an all-in-one operations platform that remains in production as the company’s system of record.',
  ],
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
  bullets: [
    'Shortened seller automation rollout by guiding my team to architect a reusable Python framework replacing seller-specific scripts.',
    'Enabled scalable operations by shaping replatform design and guiding my team to adapt automation.',
    'Cut weekly invoicing from 40+ hours to ~2 by launching a multi-carrier system with carrier/seller/warehouse-specific rates.',
  ],
  result: [
    'Key Outcomes: Guided my team to replace one-off work with reusable systems, scaling the business while continually buying back operational time.',
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
    'I help teams agree on what needs to change and why, then lead the work and write the code to make it last. Over five-plus years at B-Stock, I’ve earned promotions from automation specialist through supervisor to Manager of Process Automation. With an engineer’s understanding of the code and an operator’s understanding of the work, I set automation strategy and roadmap, guide teams to build reusable systems that reduce manual work, and keep our engineering best practices current, evolving them as the tools change.',
  /** Three measured results, shown in the second syntax color like the Work page's outcomes. */
  glance: [
    'Changed how teams build and operate, pairing faster engineering with organization-wide automation',
    'Guided my team to replace one-off work with reusable systems, scaling the business while continually buying back operational time',
    'Reduced a 20-person team’s manual workload, improving accuracy and supporting more work without additional hiring',
  ],
  zones: [
    { rows: [{ type: 'merge', id: 'merge-source', date: 'Sep 2025' }, manager] },
    { rows: [source] },
    { rows: [supervisor] },
    { rows: [specialist] },
    {
      rows: [
        { type: 'merge', id: 'merge-universal', date: '2021', tall: true },
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
    ['Languages', 'Python, SQL, Ruby, JavaScript'],
    ['Cloud & Data', 'Google Cloud (Cloud Run, Cloud Storage, BigQuery), AWS, PostgreSQL/AlloyDB, Apache Airflow'],
    ['Frameworks & Tools', 'Docker, Ruby on Rails, FastAPI, React, GitLab CI/CD, REST APIs, OAuth 2.0'],
    ['AI & Automation', 'Claude Code, OpenAI Codex, intelligent automation, workflow automation, process improvement, AI-driven development workflows, AI code and architecture review, AI-driven integration testing'],
    ['Leadership', 'Team management, prioritization, coaching and career development, KPIs, hiring and training, code review, test planning, incident response'],
  ],
};
