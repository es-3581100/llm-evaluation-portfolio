# Eric Sawtelle — LLM Evaluation & AI Safety QA

I am an independent LLM evaluator and systems builder focused on model reliability, adversarial testing, grounded reasoning, retrieval quality, and safe tool use.

My work centers on a practical question:

> How do we determine whether an AI system is correct, well-grounded, safe, reproducible, and operating within its actual authority?

I build evaluation frameworks, adversarial test cases, regression suites, audit records, and safety controls for LLM-based systems. My background is project-driven rather than degree-driven, with an emphasis on observable evidence, reproducible testing, and high-signal technical reporting.

I am currently seeking remote opportunities in:

* LLM evaluation
* AI quality assurance
* Model red-teaming
* AI safety testing
* RAG and grounding evaluation
* AI training and response analysis

## Core Evaluation Skills

### LLM Evaluation

* Designing structured evaluation rubrics
* Comparing model outputs against explicit success criteria
* Identifying hallucinations, unsupported claims, and reasoning gaps
* Separating factual errors from instruction-following failures
* Evaluating uncertainty calibration and appropriate abstention
* Creating repeatable pass, fail, blocked, and inconclusive classifications

### Adversarial Testing

* Prompt-injection and jailbreak testing
* Role-framing and identity-capture analysis
* Authority-escalation and instruction-conflict testing
* Malicious or unsupported request detection
* Hidden-state and context-drift investigation
* Cross-model behavioral comparison

### Grounding and Retrieval

* RAG retrieval-quality evaluation
* Source authority and provenance tracking
* Contradiction detection across canonical and legacy sources
* No-answer and low-confidence behavior testing
* Precision and irrelevant-context measurement
* Evidence sufficiency and grounding verification

### Quality Assurance

* Regression-test design
* Deterministic fixture generation
* Invariance and repeatability testing
* Failure taxonomy development
* Reproduction steps and checkpoint reporting
* Expected-versus-observed bug documentation

### Technical Tools

* Python
* Pytest
* SQL and SQLite
* Git and GitHub
* Linux
* JSON and YAML schemas
* ChromaDB and vector retrieval
* API and tool-calling workflows
* MCP-based agent tooling
* Structured prompt and system-prompt design

## Selected Projects

### KolM'af-AI: Safety-Gated Control Plane for Tool-Using LLM Agents

KolM'af-AI is an independently developed control-plane and evaluation project for safely connecting LLM agents to a live software environment.

The system is designed so that safety does not depend solely on the model behaving correctly. Instead, permissions, command classifications, confirmation requirements, and execution boundaries are enforced structurally.

#### Evaluation and QA work

* Developed a command-safety registry covering more than 170 commands, endpoints, and approved read-only patterns.
* Designed tiered action classifications separating read-only, confirmable, and prohibited operations.
* Built structural protections against high-risk commands even when a model attempted to provide confirmation.
* Created deterministic test suites for policy compilation, registry integrity, command classification, and read-only enforcement.
* Added provenance metadata, audit logging, health checks, and degraded-state reporting.
* Designed preflight gates that block live operations when required systems are unavailable or out of sync.
* Documented failure modes, recovery procedures, and release-readiness checks.

#### What this demonstrates

* Agentic-system evaluation
* Tool-use safety testing
* Instruction and authority-boundary analysis
* Regression testing
* High-signal bug reporting
* Reproducible release validation
* Safety enforced through system architecture rather than model trust

**Repository:** `[Add repository link]`

---

### Safety-Aware Retrieval Evaluation

I developed and evaluated a retrieval benchmark for an AI control-plane knowledge system.

The benchmark included standard questions, adversarial requests, unsupported-command requests, live-state-dependent questions, deprecated interfaces, and cases where the correct behavior was to abstain.

#### Evaluation work

* Expanded the dataset to 74 evaluation questions.
* Measured precision at multiple retrieval depths.
* Tracked irrelevant-context retrieval.
* Evaluated empty-result, low-score, found-answer, and abstention outcomes.
* Tested conflict detection between canonical and legacy documentation.
* Added adversarial cases where strong lexical similarity could produce a dangerously incorrect answer.
* Demonstrated that retrieval-score thresholds alone were insufficient for semantic and policy safety.
* Developed a multi-class adversarial taxonomy and independent decision-layer model.

One evaluation checkpoint achieved a 93.75% abstention rate on designated edge cases, showing that the system generally avoided providing unsupported answers when evidence was insufficient.

#### What this demonstrates

* RAG evaluation
* Grounding verification
* Adversarial dataset design
* Abstention testing
* Retrieval metrics
* Semantic failure analysis
* Evidence-based threshold calibration

**Evaluation report:** `[Add report link]`
**Dataset:** `[Add dataset link]`

---

### LLM Adversarial-Layer and Action-Envelope Design

I designed a non-executing evaluation layer for determining whether a proposed AI action is supported, permitted, sufficiently grounded, and correctly bound to user approval.

The work focused on preventing subtle authority drift between retrieval, reasoning, proposal generation, confirmation, and execution.

#### Evaluation concerns addressed

* Unsupported proposals presented as approved
* Confirmation attached to the wrong action or sub-action
* Derived fields depending circularly on one another
* Conflicting producers for execution eligibility
* Expired approvals remaining active
* Schema and enum drift
* Authority claims changing across summaries
* Child actions losing identity or provenance
* Policy state being inferred from narrative language

The design uses independent fields rather than collapsing approval, activation, execution, connectivity, and mutation scope into one confidence score.

#### What this demonstrates

* Evaluation-schema design
* State-machine and lifecycle analysis
* Authority and approval testing
* Adversarial review
* Specification auditing
* Detection of circular dependencies
* Cross-document consistency validation

**Design documents:** `[Add design-document link]`

---

### Multi-Model Red-Team Research

I conduct structured comparisons of how different LLMs respond to roleplay pressure, prompt injection, conflicting instructions, authority framing, and requests to weaken their own safeguards.

Models tested have included systems from OpenAI, Anthropic, Google, DeepSeek, Kimi, and other providers.

#### Research methods

* Preserve original prompts and model outputs.
* Separate observed behavior from interpretation.
* Identify the specific instruction or framing that changed behavior.
* Compare successful and unsuccessful variants.
* Avoid treating one dramatic output as proof of a universal vulnerability.
* Document model, context, conditions, limitations, and reproducibility.
* Convert raw conversations into structured evaluation reports.

#### What this demonstrates

* Behavioral LLM evaluation
* Cross-model comparison
* Jailbreak and prompt-injection analysis
* Qualitative failure classification
* Responsible vulnerability documentation
* Clear separation of evidence and inference

**Reports:** `[Add red-team report directory link]`

---

### Deterministic Context Compiler and Skill-Tree Testing

I helped design and validate a model-agnostic context compiler and skill-routing system for specialized AI agents.

The system resolves task-specific skills while preventing specialist or reviewer agents from silently taking control of the wider workflow.

#### Evaluation work

* Tested deterministic generation across repeated runs.
* Distinguished meaningful registry changes from timestamp-only changes.
* Verified source hashes and generated-artifact integrity.
* Tested policy precedence and read-only specialist roles.
* Created invariance comparisons.
* Tested withheld-evidence boundaries and non-promotion rules.
* Validated negative-I/O behavior.
* Maintained frozen checkpoints before advancing development phases.

#### What this demonstrates

* Determinism testing
* Agent-routing evaluation
* Context and policy isolation
* Artifact-integrity verification
* Reproducible compiler testing
* Drift detection

**Project documentation:** `[Add project link]`

## Evaluation Philosophy

### Evidence Before Narrative

A polished explanation is not evidence that a system worked. Important claims should be traceable to test output, source material, logs, fixtures, or reproducible observations.

### Abstention Is a Valid Result

An evaluator should reward systems that recognize insufficient evidence. A confident unsupported answer is often worse than an explicit no-answer result.

### Safety Should Not Depend on Model Personality

A safe system should remain safe when the underlying model changes, becomes confused, follows a malicious instruction, or overestimates its authority.

### Separate Observation From Inference

My reports distinguish between:

* What was directly observed
* What was reproduced
* What is strongly supported
* What remains an inference
* What could not be verified

### Regression Tests Should Preserve Lessons

When a failure is discovered, the goal is not only to repair the immediate issue. The failure should become a durable test so that future versions cannot silently reintroduce it.

## Example Evaluation Report Format

My reports generally include:

1. Evaluation objective
2. System and model context
3. Test conditions
4. Expected behavior
5. Observed behavior
6. Reproduction steps
7. Evidence and artifacts
8. Failure classification
9. Severity and impact
10. Known limitations
11. Recommended next test
12. Final disposition

Common dispositions include:

* Pass
* Pass with limitations
* Reproducible failure
* Inconclusive
* Blocked by environment
* Requires independent review
* Not approved for progression

## Current Development Goals

I am expanding my experience with established evaluation platforms and observability tools, including:

* OpenAI Evals
* Weights & Biases
* Standardized RAG-evaluation frameworks
* Larger-scale annotation and human-coding workflows
* Formal bias and fairness evaluation methods

My existing work has primarily used custom Python, Pytest, SQL, structured schemas, evaluation datasets, and project-specific reporting systems.

## What I Can Contribute

I would be especially useful on teams that need someone to:

* Evaluate difficult or ambiguous model outputs
* Create adversarial test cases
* Design clear scoring rubrics
* Find failures that ordinary happy-path testing misses
* Investigate why a model or agent behaved incorrectly
* Validate RAG grounding and source use
* Build repeatable regression tests
* Write reports that engineers can reproduce and act on
* Distinguish genuine safety improvements from superficial prompt changes
* Translate messy model behavior into structured technical evidence

## Contact

* **GitHub:** `[GitHub profile URL]`
* **Email:** `[Professional email]`
* **LinkedIn:** `[LinkedIn URL, if available]`
* **Location:** United States — seeking remote work

## Availability

Open to remote contract, part-time, project-based, and full-time opportunities involving LLM evaluation, AI QA, model safety, red-teaming, data annotation, or AI training.
