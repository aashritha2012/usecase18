# Market Access / HTA Evidence Agent
### A Proof-of-Concept Story for the Client

**Prepared by:** Tao Digital
**Use case:** Accelerating payer dossier evidence synthesis with an AI evidence agent
**Stage:** Proof of Concept (public/open data)

---

## 1. The one-line pitch

> *"When a payer asks a question, the answer already exists — scattered across a thousand pages of trials, labels, RWE studies and internal SOPs. Our agent finds it, maps it to the payer's exact question, and drafts the value message — in minutes, not weeks."*

**Headline outcome for the client:** **20–30% faster payer evidence turnaround.**

---

## 2. Meet Dr. Priya — our protagonist

Priya is a **Market Access / HEOR Evidence Lead** at a global pharma company. Her job is to make sure that when a national or regional payer evaluates a therapy, the value story is airtight, locally relevant, and defensible.

She is brilliant, senior, and expensive. And she spends **most of her week doing something a machine should do**: hunting through documents.

### A typical Tuesday, *today*

| Time | What Priya does |
|------|-----------------|
| 09:00 | A payer in Germany (G-BA/IQWiG) sends **11 evidence questions** for an upcoming submission. Deadline: 3 weeks. |
| 09:30 | She opens PubMed, the FDA/EMA label PDFs, three RWE study reports, the global value dossier, and the internal evidence SOP. 14 browser tabs. |
| 11:00 | She's found *some* of the burden-of-disease numbers, but they're framed for a US audience, not the German comparator. |
| 14:00 | She emails a biostatistician to re-confirm a hazard ratio she *knows* exists but can't locate the exact source for. |
| Day 3 | Still assembling. Still cross-checking that every claim is traceable to a source (GxP / audit requirement). |
| Day 8 | First draft of the evidence map is ready — most of the week was **retrieval and reformatting, not thinking.** |

**The pain, in one sentence:** *The evidence already exists — Priya's scarce, expert time is spent finding and re-shaping it, not judging it.*

---

## 3. The turn — enter the Evidence Agent

Now imagine Priya's Tuesday **with the agent**.

She pastes the payer's 11 questions into the agent and picks the market (**Germany · G-BA**).

Within a few minutes she has, **for each question**:

1. **A drafted answer** synthesised from the underlying evidence.
2. **The exact sources** behind every sentence — trial ID, label section, RWE study, page number — so it's audit-traceable.
3. **A value message** phrased the way *this* payer frames decisions (clinical benefit vs. comparator, budget impact, unmet need).
4. **A local-adaptation flag** where the global dossier's framing doesn't fit the local comparator or endpoint preference.
5. **An evidence-gap flag** where the corpus genuinely *doesn't* answer the question — so she knows where real work is needed.

Priya's role shifts from **finder** to **judge**. She reviews, corrects, and approves. Her expertise is spent where it's valuable.

> *"It doesn't replace Priya. It gives Priya her week back."*

---

## 4. What the agent actually does (the four moves)

The agent performs the same four moves an expert analyst does — just far faster:

```
   PAYER QUESTION
        │
        ▼
 ┌──────────────┐   1. MAP     Understand the payer's real intent
 │  Understand  │──────────────► (efficacy? safety? budget impact? unmet need?)
 └──────────────┘
        │
        ▼
 ┌──────────────┐   2. RETRIEVE   Pull relevant evidence across the corpus
 │   Retrieve   │──────────────►  PubMed · FDA/EMA labels · RWE · SOPs
 └──────────────┘
        │
        ▼
 ┌──────────────┐   3. SYNTHESISE  Draft the answer + value message,
 │  Synthesise  │──────────────►   every claim linked to its source
 └──────────────┘
        │
        ▼
 ┌──────────────┐   4. ADAPT      Localise framing to the market;
 │  Adapt/Flag  │──────────────►  flag gaps and adaptation needs
 └──────────────┘
        │
        ▼
   TRACEABLE EVIDENCE MAP  →  Priya reviews & approves
```

**Evidence domains the agent maps to payer questions:**
- **Clinical outcomes** — efficacy & safety endpoints from trials and labels
- **Burden of disease** — epidemiology, unmet need, cost of illness
- **Real-World Evidence (RWE)** — effectiveness, adherence, outcomes in practice
- **Value messages** — the framed narrative payers actually evaluate

---

## 5. The POC demo storyboard

A crisp, ~10-minute live demo the client can watch end-to-end.

| Scene | What the audience sees | The "aha" |
|-------|------------------------|-----------|
| **1. The ask** | A realistic payer question set loaded into the agent | "These are our actual kinds of questions." |
| **2. The corpus** | The agent's indexed library: PubMed abstracts, FDA labels, sample RWE, SOP docs | "It's reading *our* evidence base." |
| **3. The synthesis** | Agent generates answer + value message for a question, live | "It wrote a first draft in seconds." |
| **4. The traceability** | Click any claim → jump to the exact source passage | "Every sentence is defensible. This passes audit." |
| **5. The honesty** | Agent flags a question the corpus *can't* answer | "It tells us what it *doesn't* know — that's trust." |
| **6. The localisation** | Agent adapts a global value message for a specific market | "This is the part that takes us days." |
| **7. The payoff** | Side-by-side: manual timeline vs. agent-assisted timeline | "20–30% faster, and more consistent." |

**Design principle for the demo:** *Show trust before speed.* Payer evidence is a regulated, audit-critical domain — traceability and honest gap-flagging are what convince the client, and speed is the reward on top.

---

## 6. Why this is safe to build now (POC guardrails)

The POC is deliberately built on **public / open datasets** so the client can see it work **without any data-sharing risk**:

| POC (now) | Production (after NDA / GxP controls) |
|-----------|----------------------------------------|
| PubMed abstracts (open) | Full internal study reports & CSRs |
| FDA drug labels — `labels.fda.gov` (open) | EMA + internal regulatory dossiers |
| Synthetic / sample RWE | Client's real RWE datasets |
| Sample / redacted SOP corpus | Client's internal evidence & submission SOPs |

**Positioning to the client:** *"Everything you see today runs on public data. The architecture is designed so that after NDA and GxP controls, we swap in your internal corpus with no redesign — same agent, richer evidence."*

This de-risks the conversation: **capability is proven on open data; only the data source changes.**

---

## 7. The technology, in plain terms

- **LlamaIndex** as the document-agent / retrieval backbone — it ingests, indexes and OCRs the heterogeneous corpus (PDFs, abstracts, labels, SOPs) and powers grounded, source-cited retrieval.
- A **question-mapping layer** that classifies each payer question by intent and evidence type.
- A **synthesis layer** that drafts answers and value messages with **inline source citations** (non-negotiable for audit/GxP).
- A **gap & adaptation layer** that flags missing evidence and market-localisation needs.

> Framed for a non-technical audience: *"Think of it as a tireless research associate who has read every document in the library, never forgets a source, and always shows its work."*

---

## 8. The value story (why the client says yes)

| Dimension | Before | With the agent |
|-----------|--------|----------------|
| **Turnaround** | Weeks per dossier | **20–30% faster** |
| **Expert time** | Spent finding evidence | Spent judging evidence |
| **Consistency** | Varies by analyst | Uniform, template-aligned |
| **Traceability** | Manual, error-prone | Automatic, source-linked |
| **Local adaptation** | Slow, done last | Flagged upfront |
| **Scalability** | One analyst = one dossier | One analyst supervises many |

**The strategic message:** In market access, **speed to a defensible answer is competitive advantage.** Faster, more consistent dossiers mean faster reimbursement decisions — which means faster patient access and earlier revenue realisation.

---

## 9. What we're asking for

A **time-boxed POC** on public data to prove the four moves — *map, retrieve, synthesise, adapt* — against a realistic payer question set, culminating in the 10-minute demo in Section 5.

**Success = the client watches Priya's Tuesday shrink from a week to an afternoon — on evidence they can trust and trace.**

---

*Next artifact in this repo: the POC scope & architecture blueprint (`docs/02_poc_scope.md`).*
