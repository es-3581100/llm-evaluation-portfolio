# Portfolio Candidates — Human Review Mirror

Schema: `portfolio-candidates` v1 | Generator: `portfolio-miner` | Source repo: `https://github.com/es-3581100/llm-evaluation-portfolio` | Head: `b369c47882a1ca85108962ed5c109791300107fc` | Generated at: `2026-08-10T00:00:00Z`

## Candidate 1: Safety-Aware RAG/Retrieval Evaluation

- **ID:** safety-aware-retrieval-evaluation
- **Portfolio-grade status:** yes
- **Claim status:** CORRECTED
- **Corrected from:** A post-hoc audit found the FTS5/BM25 score direction had been interpreted backward; corrected threshold classification changed low-score/found balance while the empty count remained 15
- **Why it matters:** 74-question benchmark for grounding, source authority, live-state answerability, policy compatibility, and abstention in a tool-using LLM-agent retrieval system. Corrected retrieval outcomes are public; aggregate precision/abstention metrics remain withheld pending reconciliation.
- **Problem:** A retrieval system supporting a tool-using LLM agent needed to distinguish factual support, authority, policy compatibility, live-state dependency, source conflicts, and safe abstention rather than relying only on similarity scores.
- **Contribution:** Defined the evaluation problem, success and failure criteria, adversarial benchmark categories, rubric, public schema, checkpoint summary, regression findings, and corrected public claim boundaries.
- **Evidence:**
  - `README.md` (readme) — Public portfolio overview lists the Safety-Aware RAG/Retrieval Evaluation as featured work and states the corrected outcome caveat.
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
- **Claim boundary:** The evaluation tracked retrieval relevance, source conflict, authority, live-state dependency, policy compatibility, and expected abstention behavior. Aggregate precision and abstention metrics remain withheld until recomputed against the corrected BM25/FTS5 score-direction contract.
- **Source paths:** `case-studies/safety-aware-retrieval/`
- **Public summary:** 74-question benchmark for grounding, source authority, live-state answerability, policy compatibility, and abstention in a tool-using LLM-agent retrieval system. Corrected retrieval outcomes are public; aggregate precision/abstention metrics remain withheld pending reconciliation.
- **Warnings:**
  - Precision and abstention aggregates remain withheld pending corrected internal checkpoint reconciliation.
  - Public artifacts include a sanitized subset and derived summary; the public sample alone cannot reproduce aggregate metrics.
  - Results are project-specific and single-annotator.

## Candidate 2: Belief Lifecycle Engine

- **ID:** belief-lifecycle-engine
- **Portfolio-grade status:** yes
- **Claim status:** OBSERVED
- **Positioning line:** Agentic AI · Persistent Memory · Temporal Authority · Safety Gating · Evaluation
- **Why it matters:** Designed and evaluated an auditable temporal-authority architecture for long-lived AI agents. A frozen 750-run study compared five systems across five scenarios, with the selected recovery mechanism reducing unnecessary valid-action rejection by 75.11%.
- **Problem:** Persistent AI agents can retain information that was historically correct, well-supported, and easily retrievable while no longer being valid enough to authorize present-day action.
- **Contribution:** Defined the former-known failure mode, built the deterministic Python BLE simulator, used staged failure analysis to repair false invalidation, collateral dependency blocking, metric errors, and sticky recovery, then froze a 750-run validation protocol and packaged the manuscript, figures, supplement, and reproducibility materials.
- **Evidence:**
  - `research/belief-lifecycle-engine/README.md` (readme) — Project README states manuscript status, public artifacts, evaluation highlights, role, key results, and limitations.
  - `research/belief-lifecycle-engine/former-knowns-ble-working-paper.md` (design_doc) — Working paper describes the former-knowns problem, BLE architecture, staged development, evaluation design, results, and limitations.
  - `research/belief-lifecycle-engine/Former_Knowns_BLE_Manuscript_v1.1.pdf` (machine_artifact) — Revised 20-page review manuscript with 14 tables, four figures, frozen Pilot 0.3.2 validation results, statistical analysis, and reproducibility checklist.
  - `research/belief-lifecycle-engine/Former_Knowns_BLE_Manuscript_v1.1.docx` (design_doc) — Editable revised manuscript source corresponding to the public PDF artifact.
  - `research/belief-lifecycle-engine/reproducibility/README.md` (runbook) — Reproducibility notes document public evidence boundaries, release requirements, and limitations.
- **Metrics:**
  - validation_runs = 750 (basis: measured, context: 5 systems x 5 scenarios x 30 frozen seeds in Pilot 0.3.2)
  - system_scenario_seed_design = 5 systems x 5 scenarios x 30 seeds (basis: measured, context: frozen deterministic Pilot 0.3.2 validation design)
  - valid_action_rejection_reduction = 75.11% (basis: measured, context: four recoverable scenarios, paired seed-level comparison against BLE Authority control)
  - unsafe_actions_observed = 0/150 candidate runs (basis: observed, context: primary drift-recovery candidate validation runs; one-sided exact 95% upper bound on run-level event probability reported as 1.98%)
  - false_invalidation_events_observed = 0/150 candidate runs (basis: observed, context: primary drift-recovery candidate validation runs)
  - permanent_change_gating_latency = 5.10 intervals (basis: measured, context: mean operational gating latency matched the BLE Authority control during abrupt permanent change)
  - typed_dependency_repair = 15.33 to 1.00 false blocks per run (basis: reported, context: earlier Pilot 0.2.1 repair reduced collateral dependency blocking while preserving zero observed unsafe actions in that stage)
  - simulator_test_result = 11 passed (basis: reported, context: validation report for the isolated Python simulator package)
  - manuscript_package = 20 pages, 14 tables, 4 figures (basis: reported, context: Former Knowns / BLE Manuscript v1.1 review package)
- **Skills:** ai-agent safety evaluation, experimental design, python simulation, belief-state modeling, statistical testing, reproducibility discipline, technical writing, root-cause analysis, safety gating
- **Claim boundary:** Results evaluate a preregistered reference configuration in a deterministic synthetic simulator. They do not establish general or production-agent safety; primary-candidate safety observations are limited to 150 frozen candidate runs, parameter sensitivity was not evaluated, and independent replication remains future work.
- **Source paths:** `research/belief-lifecycle-engine/`
- **Public summary:** Built a 750-run deterministic evaluation of belief authority in long-lived AI agents; the selected recovery policy reduced unnecessary valid-action rejection by 75.11% while preserving the tested safety behavior.
- **Warnings:**
  - Current status is an independent research manuscript unless external submission or review status is separately confirmed.
  - Zero unsafe actions were observed in the 150 primary-candidate validation runs; this is not a universal safety guarantee.
  - Public archive URLs, licensing choices, parameter-sensitivity testing, and independent replication remain future work.

## Candidate 3: AI Agent Red-Team Evaluation Guide

- **ID:** ai-agent-red-team-evaluation-guide-ed2
- **Portfolio-grade status:** yes
- **Claim status:** PRELIMINARY
- **Positioning line:** AI Security · Agent Red Teaming · Prompt Injection · MCP · Evaluation Design
- **Why it matters:** Developed a sanitized defensive methodology for evaluating tool-using AI agents, converting unsafe offensive concepts into inert canary tests, structured evidence capture, and deterministic scoring criteria.
- **Problem:** Agent red-team material often mixes live payloads, claimed jailbreaks, simulated results, and real system failures, making it hard to separate model behavior from authorization, execution, persistence, and recovery failures.
- **Contribution:** Audited a large private security corpus, deduplicated repeated material, classified evidence quality, quarantined live or near-live payloads, designed non-destructive canary tests, and wrote a peer-review draft methodology covering threat modeling, MCP/tool risk, memory persistence, scoring, claim verification, and standards alignment.
- **Evidence:**
  - `research/ai-agent-red-team-evaluation-guide/AI_Agent_Red_Team_Training_Guide_Peer_Review_Edition_2.docx` (design_doc) — Sanitized Peer Review Edition 2 guide covering authorized testing, corpus audit methodology, tool/MCP risk, memory persistence, safe lab design, scoring, claim verification, and standards crosswalk.
  - `research/ai-agent-red-team-evaluation-guide/AI_Agent_Red_Team_Training_Guide_Peer_Review_Edition_2.docx` (machine_artifact) — Document records corpus statistics: 2,252 heading-based sections, 212 normalized duplicate groups, 19,831 total source lines, and approximately 134,500 source words.
  - `research/ai-agent-red-team-evaluation-guide/AI_Agent_Red_Team_Training_Guide_Peer_Review_Edition_2.docx` (runbook) — Includes safe lab architecture, canary design rules, evidence-chain requirements, finding template, release gate, and best-practice protocol baseline for authorized agent testing.
  - `research/ai-agent-red-team-evaluation-guide/AI_Agent_Red_Team_Training_Guide_Edition_1.docx` (design_doc) — Earlier edition retained as provenance only; Edition 2 supersedes it with peer-review framing, logic validation, claim controls, and standards crosswalk.
- **Metrics:**
  - source_sections_audited = 2,252 (basis: measured, context: heading-based sections identified across two private source corpora)
  - duplicate_groups_identified = 212 (basis: measured, context: normalized duplicate groups identified during corpus audit)
  - source_corpus_size = 19,831 lines / approximately 134,500 words (basis: measured, context: combined private source corpus used for sanitized methodology development)
  - scoring_dimensions = 6 (basis: reported, context: goal integrity, tool behavior, data exposure, persistence, transparency, and recovery)
  - control_layers = 10 (basis: reported, context: source intake through recovery in the defense-in-depth architecture)
- **Skills:** ai security evaluation, Agentic AI Security, agent red teaming, AI red-team methodology, prompt-injection testing, Prompt Injection Analysis, MCP security analysis, MCP / Tool Security, threat modeling, Canary Test Design, Authorization / Tool-Gating Analysis, sanitized test design, evidence handling, security methodology, technical writing
- **Claim boundary:** This is a sanitized peer-review draft for technical validation, not a certification, authorization, compliance claim, or production security guarantee. Raw offensive payloads remain quarantined and are not reproduced; the methodology requires independent review and live-system validation before stronger claims.
- **Source paths:** `research/ai-agent-red-team-evaluation-guide/`
- **Public summary:** Built a defensive evaluation methodology for tool-using AI agents; audited 2,252 source sections and converted unsafe concepts into inert canary tests, trace requirements, and six-dimension scoring.
- **Warnings:**
  - Peer Review Edition 2 is a draft for technical validation, not a certification or production security guarantee.
  - Raw operational payloads remain quarantined; the public artifact is a sanitized defensive methodology.
  - Edition 1 is provenance only; Edition 2 is the current public-facing version.
  - Claims about real security outcomes require implementation, execution traces, and independent validation.

## Candidate 4: Goal Hijacking in State-Exploration Agents

- **ID:** goal-hijacking-state-exploration-agents
- **Portfolio-grade status:** yes
- **Claim status:** PRELIMINARY
- **Positioning line:** Agentic AI Security · Tool Boundaries · Goal Integrity · Secure Architecture
- **Why it matters:** Wrote a case-study research essay analyzing how a benign observe-probe-execute agent can become dual-use when task scope and execution authority are too general.
- **Problem:** A general state-exploration loop can accept harmful actions when those actions are semantically reframed as legitimate task steps, especially if untrusted language can expand what the agent's action schema is allowed to express.
- **Contribution:** Identified the goal-reframing/metaphor-laundering failure mode, mapped a puzzle-solving control loop to reconnaissance-style architecture, and proposed typed action schemas plus code-enforced capability boundaries as a structural mitigation.
- **Evidence:**
  - `research/goal-hijacking-state-exploration-agents/goal_hijacking_essay.docx` (design_doc) — Draft research essay defining goal reframing/metaphor laundering and arguing for schema-level capability boundaries over prompt-level permission checks.
  - `research/goal-hijacking-state-exploration-agents/goal_hijacking_essay.docx` (design_doc) — Includes a concrete narrow-schema versus generic-execution-schema comparison showing why bounded typed actions are safer than arbitrary target/command/payload interfaces.
  - `research/goal-hijacking-state-exploration-agents/goal_hijacking_essay.docx` (design_doc) — Documents a public/private release split: publish recorded-state analysis, offline graph construction, synthetic fixtures, and recommendation-only output while withholding live closed-loop execution.
- **Metrics:**
  - status = draft research essay v0.1 (basis: reported, context: August 2026 document status)
  - core_loop_stages = 7 (basis: reported, context: observe, infer, select_probe, execute, classify, update, repeat)
  - validated_adversarial_tests = 0 (basis: reported, context: essay explicitly states no adversarial testing has been performed)
- **Skills:** agentic AI security, Agentic AI Security, secure architecture, tool-schema design, Capability Boundary Design, Authorization / Tool-Gating Analysis, threat modeling, failure-mode analysis, dual-use risk analysis, technical writing
- **Claim boundary:** This is a single-project draft case-study essay and design argument. The taxonomy has not been validated across other agent architectures or domains, no adversarial benchmark has been run, and claims about the mitigation holding are not measured results.
- **Source paths:** `research/goal-hijacking-state-exploration-agents/`
- **Public summary:** Analyzed goal reframing in observe-probe-execute agents and proposed typed action schemas plus code-enforced capability boundaries to keep untrusted language from expanding execution authority.
- **Warnings:**
  - This is a draft case-study essay, not published or validated empirical research.
  - Empirical security effectiveness still requires adversarial tests or a benchmark.
  - Public artifacts should remain recommendation-only, synthetic, or recorded-state based rather than exposing a live general-purpose executor.
