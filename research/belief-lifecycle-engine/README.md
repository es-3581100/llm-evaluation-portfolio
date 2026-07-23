# Belief Lifecycle Engine: Evaluating Temporal Authority in Long-Lived Agents

**Status:** Independent working paper; not peer reviewed or submitted for publication.

Designed and evaluated an auditable architecture for preventing previously correct but outdated beliefs from continuing to authorize agent actions. The work includes a deterministic simulator, five comparative systems, five controlled scenarios, frozen holdout seeds, safety and availability metrics, paired statistical analysis, and documented reproducibility requirements.

The paper is formatted in a journal-style research-paper structure, but it has not been submitted to or endorsed by the Journal of Artificial Intelligence Research or any other venue.

## Artifacts

| Artifact | Description |
| --- | --- |
| [`former-knowns-ble-working-paper.pdf`](former-knowns-ble-working-paper.pdf) | Public working-paper PDF. |
| [`former-knowns-ble-working-paper.md`](former-knowns-ble-working-paper.md) | Markdown text version of the manuscript. |
| [`reproducibility/`](reproducibility/) | Reproducibility notes and public-release checklist. |

## Evaluation Highlights

* 750 frozen validation runs
* Five system variants and five controlled scenarios
* Explicit unsafe-action, false-invalidation, valid-rejection, throughput, and gating-latency metrics
* Paired seed comparison with multiplicity correction and effect-size reporting
* 75.11% reduction in valid-action rejection across recoverable scenarios
* Zero observed unsafe actions in the tested candidate runs: 0/150, reported with a bounded confidence claim rather than as proof of universal safety
* Reported negative pilot findings and architecture corrections
* Documented limitations, unresolved tests, and future validation requirements

## My Role

I defined the former-knowns failure mode, established the evaluation questions and measurable outcomes, directed the implementation and testing process, reviewed generated artifacts, investigated regressions, checked statistical reporting, and preserved the final claim boundaries.

## Why This Matters

Long-lived AI agents can retain propositions that were once correct but no longer describe the current environment, while those propositions continue to authorize action. This project calls those memories **former knowns**.

The Belief Lifecycle Engine models beliefs as versioned operational objects with confidence, freshness, drift, lifecycle state, typed dependency provenance, consequence risk, and audit history. The goal is to decide when a remembered proposition may still authorize action and when the system should defer, reject, verify, or recover.

This is relevant to persistent agents, RAG systems, tool-using agents, and memory-enabled assistants because it separates whether information is retrievable from whether it should retain authority to guide action.

## Key Results

| Result | Value |
| --- | ---: |
| Frozen validation runs | 750 |
| Systems compared | 5 |
| Scenarios | 5 |
| Seeds per condition | 30 |
| Valid-action rejection reduction | 75.11% |
| Unsafe actions by BLE drift recovery | 0/150 candidate runs |
| False invalidation by BLE drift recovery | 0 observed |
| Permanent-change gating latency | 5.10 intervals |
| One-sided exact 95% upper bound on run-level unsafe-action probability | 1.98% |

## Skills Demonstrated

* Experimental design
* AI-agent safety evaluation
* Lifecycle-state modeling
* Baseline construction
* Regression analysis
* Statistical testing
* Python simulation
* Reproducibility
* Technical reporting

## Limitations

* The experiment uses a deterministic synthetic simulator, not a live LLM agent.
* The environment and dependency graph are intentionally small.
* The results establish internal mechanism validity, not broad generalizability.
* There was no full comparison with ATMS, a production observability platform, or a modern RAG-agent framework.
* Independent replication is still needed.
* Parameter sensitivity was not tested.

## Directory Structure

```text
research/belief-lifecycle-engine/
├── README.md
├── former-knowns-ble-working-paper.md
├── former-knowns-ble-working-paper.pdf
└── reproducibility/
```
