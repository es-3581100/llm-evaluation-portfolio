# Safety-Aware Retrieval Evaluation

## A 74-Question Adversarial Benchmark for Grounding, Abstention, and Policy-Aware Retrieval

## Executive Summary

I designed and evaluated a 74-question benchmark for a safety-aware retrieval system supporting a tool-using LLM agent. The benchmark included ordinary knowledge questions, unsupported commands, deprecated interfaces, malicious requests, conflicting sources, and questions requiring unavailable live-state information. The evaluation measured retrieval precision, conflict detection, and appropriate abstention.

| Metric | Result |
| --- | ---: |
| Benchmark size | 74 questions |
| Empty retrieval outcomes | 15 |
| Low-score retrieval outcomes | 15 |
| Found retrieval outcomes | 44 |
| Aggregate precision and abstention metrics | Reconciliation pending |

> **Integrity note:** A post-hoc audit found that the FTS5/BM25 score direction had been interpreted backward. The empty-outcome count remained unchanged at 15, while corrected threshold classification changed the balance between low-score and found outcomes from 44/15 to 15/44. Precision and abstention aggregates remain withheld until they can be recomputed and traced to the corrected internal checkpoint artifact.

Retrieving more documents naturally introduces more opportunity for irrelevant or non-authoritative material, and this case study evaluated whether downstream decision logic could avoid treating all retrieved context as equally useful, authoritative, or safe.

Important caveat: this was a project-specific, single-annotator benchmark with 74 questions. The results should be read as evidence of evaluation design and internal checkpoint behavior, not as a general benchmark for unrelated retrieval systems.

Irrelevant context was tracked separately during evaluation because non-relevant retrieved material can influence downstream reasoning even when the highest-ranked result is correct. The public summary reports only metrics whose raw counts are currently available in the sanitized artifacts.

Note: `retrieval_outcome` reflects whether results cleared the acceptance threshold used for downstream action-gating, where `found` means above threshold. `top_1_relevant` is an independent human relevance judgment applied regardless of threshold. A `low_score` outcome can still have a relevant top-1 document; this is precisely why the evaluation separates retrieval score, relevance, and safety gating.

## Problem

Ordinary retrieval scores were insufficient for this system because retrieved documentation could influence whether an LLM-controlled agent proposed, rejected, or abstained from a tool action. In that setting, a retrieval mistake is not only a search-quality issue. It can become an unsupported action proposal, a false claim of authority, or a failure to abstain.

The strongest finding was that a highly relevant lexical match can still produce a semantically unsupported or unsafe answer. Corrected-baseline regressions showed this across several cases:

* A nonexistent or unsupported command with very strong keyword overlap
* A question whose answer depended on unavailable live system state
* A malicious request involving unauthorized resource transfer
* A request using a deprecated interface while maximizing an action

These cases demonstrated the difference between text similarity, factual support, policy permission, current-state availability, and safe answerability.

## System Under Evaluation

The evaluated system retrieved documentation for an LLM-controlled software agent. Retrieved information could influence whether the agent proposed or rejected a tool action, making unsupported retrieval more consequential than an ordinary search error.

The original project context involved an automation environment with command documentation, policy rules, legacy interfaces, and live-state constraints. The portfolio version is intentionally generalized and sanitized so the evaluation method can be understood without project-specific operational details.

## Benchmark Design

The benchmark contained 74 questions designed to test whether the retrieval system could distinguish supported requests from misleading, malicious, deprecated, state-dependent, or unsupported ones.

| Category | What It Tests |
| --- | --- |
| Supported factual questions | Whether canonical documentation is retrieved |
| Unsupported commands | Whether plausible but nonexistent functionality is rejected |
| Deprecated interfaces | Whether legacy documentation creates false confidence |
| Live-state questions | Whether the system recognizes when static documentation is insufficient |
| Adversarial requests | Whether malicious intent is distinguished from ordinary information seeking |
| Conflicting sources | Whether canonical and legacy sources are reconciled |
| No-answer cases | Whether the system abstains instead of fabricating support |
| Ambiguous questions | Whether uncertainty is preserved |

The public sample dataset includes sanitized representative examples rather than the full private benchmark. The schema separates `retrieval_outcome` from `observed_behavior` so retrieval quality and downstream decision quality are not collapsed into one label.

Sample provenance note: the 10 public rows are sanitized representative cases, not the complete checkpoint output. Their `retrieval_outcome` labels are illustrative until the sample is refreshed from the corrected internal checkpoint artifact; their counts are not expected to match the 74-item aggregate counts.

Public artifacts:

* [Data notes](data/README.md)
* [Illustrative benchmark sample](data/benchmark-sample-illustrative.jsonl)
* [Benchmark schema](data/benchmark-schema.json)
* [Evaluation rubric](methodology/evaluation-rubric.md)
* [Checkpoint summary](results/checkpoint-002-summary.json)

## Public Evidence Boundary

The aggregate metrics were calculated from a frozen 74-item internal benchmark. This repository publishes 10 sanitized representative cases, the scoring schema, the evaluation rubric, and a derived checkpoint summary. The public sample alone is not sufficient to independently recalculate the aggregate results.

The summary metrics should therefore be understood as reported results from the frozen internal checkpoint rather than independently reproduced public-benchmark results. Precision and abstention metrics are temporarily withheld while they are reconciled against the corrected BM25 score-direction contract and internal checkpoint artifact.

## Methodology

The benchmark was versioned and evaluated against a frozen checkpoint so that changes in retrieval behavior could be compared consistently over time.

1. Define the expected answer or abstention behavior.
2. Identify the authoritative source class.
3. Run retrieval against the frozen corpus.
4. Record the top retrieved documents and scores.
5. Judge relevance independently from score.
6. Detect canonical-versus-legacy conflicts.
7. Classify the retrieval outcome.
8. Record the observed downstream behavior.
9. Compare observed behavior with expected behavior.
10. Add regressions for discovered failure modes.
11. Freeze the checkpoint and record metrics.

```mermaid
flowchart LR
    A[Question] --> B[Retriever]
    B --> C[Top-k Sources]
    C --> D[Relevance Check]
    D --> E[Authority Check]
    E --> F[Conflict Detection]
    F --> G[Answerability Check]
    G --> H{Disposition}
    H -->|Supported| I[Grounded Answer]
    H -->|Insufficient evidence| J[Abstain]
    H -->|Policy conflict| K[Reject or Warn]
```

## Results

The checkpoint summary is published in `results/checkpoint-002-summary.json`.

### Corrected Retrieval Outcomes

After repairing the FTS5/BM25 score-direction contract, the corrected Checkpoint 002 retrieval outcomes were 15 empty, 15 low-score, and 44 found.

### Metrics Under Reconciliation

Precision and abstention metrics are not currently published as headline numbers because they need to be traced to the corrected internal checkpoint artifact and reconciled against the corrected score-direction contract. This avoids publishing polished but stale aggregate values.

## Most Important Finding

**Similarity scores were not sufficient safety gates.**

The regressions showed that very strong BM25 results could still correspond to unsupported functionality, malicious intent, deprecated information, or questions impossible to answer without live state. The resulting recommendation was to use independent semantic and policy checks instead of simply adjusting a retrieval threshold.

## Key Failure Examples

### Unsupported Command

**Input:** A request referencing a plausible but nonexistent command.

**Why retrieval struggled:** The wording strongly overlapped with real documentation.

**Unsafe outcome:** A score-only system could incorrectly present the command as supported.

**Expected behavior:** State that canonical support was not found and abstain from suggesting execution.

**Lesson:** Lexical relevance is not equivalent to capability support.

### Live-State-Dependent Question

**Input:** A question asking whether a specific action was currently safe or available.

**Why retrieval struggled:** Static documentation described the general mechanism but not the user's current state.

**Unsafe outcome:** The system could answer as if general documentation proved the action was currently valid.

**Expected behavior:** Explain that live state is required and abstain from making a current-state claim.

**Lesson:** Static retrieval cannot establish facts that require live environment inspection.

### Malicious Request

**Input:** A request framed as ordinary assistance but involving unauthorized transfer or misuse of resources.

**Why retrieval struggled:** Relevant documentation described the resource and related commands.

**Unsafe outcome:** The system could provide operational guidance because the retrieved text was topically relevant.

**Expected behavior:** Reject or warn based on policy, even if relevant documentation exists.

**Lesson:** Evidence availability and policy permission must be evaluated separately.

### Deprecated Interface

**Input:** A request using an older interface while attempting to maximize an action.

**Why retrieval struggled:** Legacy documentation still matched the phrasing strongly.

**Unsafe outcome:** The system could treat deprecated guidance as current authority.

**Expected behavior:** Prefer canonical current documentation, identify the legacy conflict, and avoid unsupported execution advice.

**Lesson:** Retrieval systems need source authority and freshness checks, not only relevance scores.

### Canonical-Versus-Legacy Conflict

**Input:** A question where current and older documentation suggested different interpretations.

**Why retrieval struggled:** Both source classes were textually relevant.

**Unsafe outcome:** The system could merge conflicting claims into one fabricated answer.

**Expected behavior:** Detect the conflict, prefer canonical sources when available, and preserve uncertainty when necessary.

**Lesson:** Conflicts should be represented explicitly rather than hidden inside a fluent answer.

## Changes Produced by the Evaluation

* Added adversarial request categories
* Added explicit abstention evaluation
* Separated semantic support from lexical relevance
* Added canonical-versus-legacy conflict detection
* Added live-state dependency classification
* Rejected retrieval-score thresholds as the only action gate
* Proposed independent decision layers for evidence, authority, policy, and execution eligibility
* Converted discovered failures into regression cases

## Lessons and Limitations

This checkpoint demonstrated that retrieval quality must be evaluated together with answerability, authority, and policy constraints when retrieved context can influence tool use. A strong retrieval score is useful evidence, but it is not by itself proof that an action is supported, current, safe, or permitted.

Known limitations:

* The dataset was project-specific and relatively small.
* Human judgments were produced by the project author rather than multiple independent annotators.
* Metrics should not be generalized to unrelated corpora.
* Precision measurements do not independently measure answer quality.
* The benchmark focused on retrieval and decision support, not end-to-end production execution.
* Bias and fairness auditing were outside this checkpoint's scope.
* Some questions were intentionally adversarial and do not represent ordinary user traffic.

## Skills Demonstrated

* LLM evaluation
* RAG evaluation
* Adversarial dataset design
* Evaluation-rubric development
* Grounding verification
* Abstention testing
* Retrieval metrics
* Failure taxonomy design
* Regression testing
* Policy-aware evaluation
* Technical reporting
* Python and structured data workflows
