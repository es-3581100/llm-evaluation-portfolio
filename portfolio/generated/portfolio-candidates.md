# Portfolio Candidates — Human Review Mirror

Schema: `portfolio-candidates` v1 | Generator: `portfolio-miner` | Source repo: `https://github.com/es-3581100/llm-evaluation-portfolio` | Head: `b369c47882a1ca85108962ed5c109791300107fc` | Generated at: `2026-08-08T00:00:00Z`

## Candidate 1: Safety-Aware Retrieval Evaluation

- **ID:** safety-aware-retrieval-evaluation
- **Portfolio-grade status:** yes
- **Claim status:** CORRECTED
- **Corrected from:** A post-hoc audit found the FTS5/BM25 score direction had been interpreted backward; corrected threshold classification changed low-score/found balance while the empty count remained 15
- **Why it matters:** Designed and evaluated a 74-question safety-aware retrieval benchmark with corrected retrieval-outcome reporting and withheld aggregate precision/abstention metrics pending reconciliation.
- **Problem:** A retrieval system supporting a tool-using LLM agent needed to distinguish factual support, authority, policy compatibility, live-state dependency, source conflicts, and safe abstention rather than relying only on similarity scores.
- **Contribution:** Defined the evaluation problem, success and failure criteria, adversarial benchmark categories, rubric, public schema, checkpoint summary, regression findings, and corrected public claim boundaries.
- **Evidence:**
  - `README.md` (readme) — Public portfolio overview lists the Safety-Aware Retrieval Evaluation as featured work and states the corrected outcome caveat.
  - `case-studies/safety-aware-retrieval/README.md` (readme) — Case study records the benchmark design, public evidence boundary, corrected outcome counts, withheld metrics, role, lessons, and limitations.
  - `case-studies/safety-aware-retrieval/results/checkpoint-002-summary.json` (machine_artifact) — Checkpoint summary reports 74 questions, corrected retrieval outcomes, withheld precision/abstention metrics, primary finding, and limitations.
  - `case-studies/safety-aware-retrieval/methodology/evaluation-rubric.md` (design_doc) — Rubric defines answerability, authority, policy compatibility, state dependency, retrieval outcomes, observed behaviors, and reviewer guidance.
  - `case-studies/safety-aware-retrieval/data/benchmark-schema.json` (source) — Public schema separates retrieval outcome from observed behavior and related evaluation fields.
- **Metrics:**
  - benchmark_questions = 74 (basis: reported, context: frozen internal benchmark summarized in public checkpoint artifact)
  - corrected_empty_retrieval_outcomes = 15 (basis: reported, context: Checkpoint 002 after BM25 score-direction correction)
  - corrected_low_score_retrieval_outcomes = 15 (basis: reported, context: Checkpoint 002 after BM25 score-direction correction)
  - corrected_found_retrieval_outcomes = 44 (basis: reported, context: Checkpoint 002 after BM25 score-direction correction)
- **Skills:** LLM evaluation, RAG evaluation, grounding verification, adversarial dataset design, abstention testing, retrieval metrics, schema design, evidence-based threshold calibration
- **Claim boundary:** Corrected retrieval-outcome counts are public, but aggregate precision and abstention metrics are withheld until recomputed and traced to the corrected internal checkpoint artifact. The benchmark is project-specific, single-annotator, N=74, and not a general benchmark for unrelated retrieval systems.
- **Source paths:** `case-studies/safety-aware-retrieval/`
- **Public summary:** Designed a 74-question safety-aware retrieval benchmark and published corrected retrieval-outcome counts with explicit caveats and withheld aggregate precision/abstention metrics pending reconciliation.
- **Warnings:**
  - Precision and abstention aggregates remain withheld pending corrected internal checkpoint reconciliation.
  - Public artifacts include a sanitized subset and derived summary; the public sample alone cannot reproduce aggregate metrics.
  - Results are project-specific and single-annotator.

## Candidate 2: Belief Lifecycle Engine

- **ID:** belief-lifecycle-engine
- **Portfolio-grade status:** yes
- **Claim status:** PRELIMINARY
- **Positioning line:** Agentic AI Architecture · State Management · Evaluation · Reliability
- **Why it matters:** Designed and evaluated a preliminary working-paper architecture for temporal authority management in long-lived agents, with reported deterministic simulator results and explicit public reproducibility limits.
- **Problem:** Long-lived agents can retain formerly correct beliefs that no longer describe the current environment while those beliefs continue to authorize action.
- **Contribution:** Defined the former-knowns failure mode, specified the Belief Lifecycle Engine architecture, established evaluation questions and measurable outcomes, directed implementation/testing, reviewed statistical reporting, and preserved claim boundaries for public release.
- **Evidence:**
  - `README.md` (readme) — Public portfolio overview lists the Belief Lifecycle Engine as featured work and records its preliminary working-paper caveats.
  - `research/belief-lifecycle-engine/README.md` (readme) — Project README states working-paper status, public artifacts, reported evaluation highlights, role, key results, and limitations.
  - `research/belief-lifecycle-engine/former-knowns-ble-working-paper.md` (design_doc) — Working paper describes the architecture, deterministic simulator, frozen validation design, reported statistics, results, limitations, and ethics/public-release notes.
  - `research/belief-lifecycle-engine/former-knowns-ble-working-paper.pdf` (machine_artifact) — Public working-paper PDF mirrors the manuscript artifact.
  - `research/belief-lifecycle-engine/reproducibility/README.md` (runbook) — Reproducibility notes state that high-level claims are public while the full source-and-results archive is not yet public, and list release requirements.
- **Metrics:**
  - frozen_validation_runs = 750 (basis: reported, context: reported deterministic simulator validation design)
  - system_variants = 5 (basis: reported, context: reported comparison design)
  - controlled_scenarios = 5 (basis: reported, context: reported comparison design)
  - valid_action_rejection_reduction = 75.11% (basis: reported, context: reported across recoverable scenarios)
  - unsafe_actions_by_drift_recovery_candidate = 0/150 (basis: reported, context: reported candidate runs; bounded observation, not proof of universal safety)
  - one_sided_exact_95_percent_upper_bound_run_level_unsafe_action_probability = 1.98% (basis: reported, context: reported for zero observed unsafe actions in candidate runs)
- **Skills:** experimental design, AI-agent safety evaluation, lifecycle-state modeling, baseline construction, regression analysis, statistical testing, Python simulation, reproducibility discipline, technical reporting
- **Claim boundary:** Independent working paper, not peer reviewed or submitted for publication. Public artifacts establish reported internal mechanism validity for a deterministic synthetic simulator configuration only; the full source-and-results archive is not yet public here, external-agent validation and parameter sensitivity remain future work, and zero observed unsafe actions is not proof of universal safety.
- **Source paths:** `research/belief-lifecycle-engine/`
- **Public summary:** Developed a preliminary Belief Lifecycle Engine working paper evaluating temporal authority in long-lived agents, with reported deterministic simulator results and explicit reproducibility/public-release limits.
- **Warnings:**
  - Independent working paper; not peer reviewed or submitted for publication.
  - Full source-and-results archive is not yet public in this repository.
  - Results are from a deterministic synthetic simulator and should not be treated as broad external-agent safety evidence.
  - Independent replication and parameter sensitivity testing remain future work.
