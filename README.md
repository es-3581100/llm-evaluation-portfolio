# Eric Sawtelle — LLM Evaluation & AI Safety QA

I am an independent LLM evaluator and systems builder focused on model reliability, adversarial testing, grounded reasoning, retrieval quality, and safe tool use.

My work centers on a practical question:

> How do we determine whether an AI system is correct, well-grounded, safe, reproducible, and operating within its actual authority?

I build evaluation frameworks, adversarial test cases, regression suites, audit records, and safety controls for LLM-based systems. My background is project-driven, with an emphasis on observable evidence, reproducible testing, and high-signal technical reporting.

I am currently seeking remote opportunities in LLM evaluation, AI quality assurance, model red-teaming, AI safety testing, RAG and grounding evaluation, and AI training or response analysis.

## Featured Evidence

* **74-question retrieval benchmark:** evaluated grounding, abstention, authority conflicts, live-state dependency, and adversarial requests. Aggregate precision and abstention metrics are being reconciled against the corrected BM25 score-direction contract.
* **750-run agent-memory experiment:** five systems, five scenarios, frozen holdout seeds, paired statistical analysis.
* **Evaluation methods:** adversarial cases, grounding checks, regression testing, provenance tracking, and bounded claims.

**Integrity note:** A post-hoc audit found that the FTS5/BM25 score direction had been interpreted backward. The empty-outcome count remained unchanged at 15, while corrected threshold classification changed the balance between low-score and found outcomes from 44/15 to 15/44. Precision and abstention aggregates remain withheld until they can be recomputed and traced to the corrected internal checkpoint artifact.

## Featured Projects

### Safety-Aware Retrieval Evaluation

I designed and evaluated a 74-question benchmark for a safety-aware retrieval system supporting a tool-using LLM agent. The benchmark tested whether the system could distinguish supported questions from misleading, malicious, deprecated, state-dependent, or unsupported requests, and abstain when reliable evidence was unavailable.

**Evidence:** [`case-studies/safety-aware-retrieval/`](case-studies/safety-aware-retrieval/)

#### Evaluation Highlights

* Corrected retrieval outcomes: 15 empty, 15 low-score, 44 found
* Aggregate precision and abstention metrics are being reconciled against the corrected BM25 score-direction contract
* Caveat: project-specific, single-annotator benchmark with N=74
* Tested unsupported commands, deprecated interfaces, live-state questions, adversarial requests, conflicting sources, no-answer cases, and ambiguity
* Separated retrieval outcome from final observed behavior in the public benchmark schema

#### My Role

I defined the evaluation problem, established success and failure criteria, directed the implementation and testing process, reviewed generated artifacts, investigated regressions, and maintained the final claim boundaries.

#### Skills Demonstrated

RAG evaluation, grounding verification, adversarial dataset design, abstention testing, retrieval metrics, semantic failure analysis, schema design, and evidence-based threshold calibration.

### Belief Lifecycle Engine: Evaluating Temporal Authority in Long-Lived Agents

**Status:** Independent working paper; not peer reviewed or submitted for publication.

I designed and evaluated an auditable architecture for preventing previously correct but outdated beliefs from continuing to authorize agent actions. The work includes a deterministic simulator, five comparative systems, five controlled scenarios, frozen holdout seeds, safety and availability metrics, paired statistical analysis, and documented reproducibility requirements.

**Evidence:** [`research/belief-lifecycle-engine/`](research/belief-lifecycle-engine/)

#### Evaluation Highlights

* 750 frozen validation runs
* Five system variants and five controlled scenarios
* 30 previously unused frozen seeds per condition
* Explicit unsafe-action, false-invalidation, valid-rejection, throughput, and gating-latency metrics
* Paired seed comparison with Wilcoxon signed-rank tests, Holm correction, Hodges-Lehmann estimates, rank-biserial effects, and paired bootstrap intervals
* 75.11% reduction in valid-action rejection across recoverable scenarios
* Zero observed unsafe actions in the tested candidate runs: 0/150, reported with a bounded confidence claim rather than as proof of universal safety
* Reported negative pilot findings and architecture corrections

#### My Role

I defined the former-knowns failure mode, established the evaluation questions and measurable outcomes, directed the implementation and testing process, reviewed generated artifacts, investigated regressions, checked statistical reporting, and preserved the final claim boundaries.

#### Skills Demonstrated

Experimental design, AI-agent safety evaluation, lifecycle-state modeling, baseline construction, regression analysis, statistical testing, Python simulation, reproducibility discipline, and publication-style technical reporting.

## Core Skills

* LLM evaluation and rubric design
* RAG and grounding evaluation
* Adversarial test-case design
* Model red-teaming and prompt-injection analysis
* Abstention and uncertainty evaluation
* Regression-test design
* Failure taxonomy development
* Tool-use and authority-boundary testing
* Provenance and audit-record design
* Python, Pytest, SQL, SQLite, Git, Linux, JSON, and YAML

## Evaluation Approach

I separate text similarity, factual support, policy permission, live-state availability, and safe answerability. A confident unsupported answer is usually worse than a clear no-answer result.

More detail: [`docs/evaluation-approach.md`](docs/evaluation-approach.md)

## Development Approach

These projects were developed using AI-assisted coding, editing, and adversarial review. I defined the evaluation problems, established the success and failure criteria, directed the implementation process, ran and reviewed the tests, investigated regressions, verified the reported artifacts, and take responsibility for the final claims.

AI-generated output is treated as material to verify, not as independent evidence that a system works.

## Additional Work In Progress

* Safety-gated control plane for tool-using LLM agents
* LLM adversarial-layer and action-envelope design
* Multi-model red-team research
* Deterministic context compiler and skill-tree testing

These are intentionally not featured until the public links, evidence, and summaries are as complete as the two projects above.

## Contact

* **GitHub:** [donCannoli-burns](https://github.com/donCannoli-burns)
* **Email:** [e.sawtelle358@gmail.com](mailto:e.sawtelle358@gmail.com)
* **Location:** United States — seeking remote work

## Availability

Open to remote contract, part-time, project-based, and full-time opportunities involving LLM evaluation, AI QA, model safety, red-teaming, data annotation, or AI training.

## Reuse Terms

Reuse terms are defined in [`LICENSE.md`](LICENSE.md).
