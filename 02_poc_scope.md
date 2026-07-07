# Market Access / HTA Evidence Agent — POC

A Tao Digital proof-of-concept for an AI **evidence agent** that accelerates
payer dossier / HTA submission preparation.

Payer dossiers require fast evidence synthesis and local adaptation. This agent
**maps outcomes, burden of disease, real-world evidence (RWE) and value
messages to payer questions** — targeting **20–30% faster payer evidence
turnaround.**

## The four moves

**Map** the payer question → **Retrieve** across the evidence corpus →
**Synthesise** a source-cited answer + value message → **Adapt** to the local
market and flag gaps.

## POC posture

Built on **public / open datasets** (PubMed, FDA labels via
[labels.fda.gov](https://labels.fda.gov/), sample RWE & SOPs) so it can be
demonstrated with **zero data-sharing risk**. The architecture is designed so
internal client data is swapped in after NDA / GxP controls — **same agent,
richer evidence.**

## Tech

LlamaIndex (document ingestion, OCR, indexing, grounded retrieval) + Claude
for question classification and source-cited synthesis.

## Documents

| Doc | Purpose |
|-----|---------|
| [`docs/01_client_story.md`](docs/01_client_story.md) | The client-facing narrative & demo storyboard |
| [`docs/02_poc_scope.md`](docs/02_poc_scope.md) | POC scope, data sources & reference architecture |

---
*Prepared by Tao Digital. POC stage — public data only.*
