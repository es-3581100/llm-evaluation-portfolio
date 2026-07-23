# Former Knowns: A Belief Lifecycle Engine for Temporal Authority and Recovery in Long-Lived AI Agents

**Author:** Eric Sawtelle, Independent Researcher, United States  
**Status:** Independent working paper; not peer reviewed or submitted for publication.  
**Version:** Portfolio working paper, July 2026.

> This manuscript uses a journal-style structure for readability and rigor. It has not been submitted to or endorsed by the Journal of Artificial Intelligence Research or any other publication venue.

## Abstract

**Background:** Long-lived AI agents can retain propositions that were once correct but no longer describe the current environment, while those propositions continue to authorize action. We call these memories **former knowns**.

**Objectives:** We evaluate the Belief Lifecycle Engine (BLE), an auditable architecture that separates confidence from freshness, records contradiction as drift, tracks lifecycle state and provenance, propagates typed dependency concern, and gates actions according to consequence risk.

**Methods:** A staged deterministic simulator exposed and corrected false invalidation, collateral dependency blocking, metric errors, and sticky recovery. A frozen validation compared five systems across five scenarios and 30 previously unused seeds per condition, totaling 750 runs. Candidate-control outcomes were paired by seed and evaluated with Wilcoxon signed-rank tests, Holm correction, Hodges-Lehmann estimates, rank-biserial effects, and paired bootstrap intervals.

**Results:** Positive-evidence drift recovery reduced valid-action rejection by 75.11% across recoverable scenarios. Every nonzero paired seed difference favored drift recovery in all four scenarios (`rrb = -1.000`); Holm-adjusted `p < 7e-6` and all bootstrap intervals excluded zero. The candidate produced zero unsafe actions in 150 runs, zero false invalidation, and the same 5.10-interval permanent-change gating latency as BLE Authority. The one-sided exact 95% upper bound on the run-level unsafe-action probability was 1.98%.

**Conclusions:** Long-lived agents require explicit temporal authority management, and successful observations should actively reduce accumulated distrust after recoverable disturbance. These findings establish internal mechanism validity for the pre-specified reference configuration frozen before holdout validation; external-agent evaluation and parameter sensitivity remain future work.

**Keywords:** agent memory, belief revision, truth maintenance, temporal validity, autonomous agents, epistemic drift, risk-sensitive action gating

## 1. Introduction

Persistent AI agents are moving from single-session tools toward systems expected to operate across days, months, and changing environments. Their memory modules may store user preferences, API contracts, credentials, workflow dependencies, organizational rules, device states, and summaries of prior interactions. Work on longer context, memory retrieval, consolidation, and reflection is necessary, but it leaves a distinct operational problem insufficiently specified: a memory can remain internally coherent, retrievable, and once well-supported while no longer describing the present world.

We call such information a **former known**. A former known is not merely an initial error, an unresolved unknown, or a hallucinated claim. It is a proposition that satisfied an agent's acceptance criteria at an earlier time and then silently lost validity. Historical correctness gives such memories unusual persuasive force: they are often retrieved precisely because they were repeatedly useful, and their provenance may appear stronger than a newly observed contradiction.

The Belief Lifecycle Engine treats a belief as a versioned operational object rather than a timeless string. Its design is guided by five principles:

1. Confidence and freshness are distinct. Lack of recent verification does not itself prove falsehood.
2. Temporal behavior is domain-specific. Continuous, event-bound, epoch-bound, and static beliefs should not age identically.
3. Contradiction and dependency concern require provenance. A locally contradicted belief differs from one made temporarily suspect by a correlated upstream failure.
4. Authority is action- and risk-dependent. A stale belief may remain usable for a reversible read while being insufficient for a critical write.
5. Recovery must be controlled but possible. Positive evidence should actively reduce accumulated distrust after transient failure or observation noise.

The paper makes four contributions:

1. It formalizes the former-known problem as a temporal authority failure distinct from ordinary factual error and catastrophic forgetting.
2. It specifies BLE as an auditable integration of confidence, freshness, drift, lifecycle states, typed dependency propagation, and risk-sensitive action gating.
3. It reports a staged experimental program in which progressively identified failure modes were corrected rather than hidden.
4. It presents a frozen 750-run validation study showing that positive-evidence drift recovery substantially reduces unnecessary action rejection without degrading tested safety or persistent-change response.

## 2. Former Knowns as an Epistemic and Operational Category

Let `phi` be a proposition used by an agent at times `t0` and `t1`, where `t1 > t0`. A proposition is a former known at `t1` when:

1. `phi` was true in the environment at `t0`.
2. The agent possessed sufficient evidence to treat `phi` as operationally trusted at `t0`.
3. `phi` is false at `t1`.
4. The agent's current memory state still grants `phi` enough authority to influence action.

The critical property is not historical falsity but authority persistence after validity loss.

A hallucination was never adequately grounded. A known unknown is explicitly unresolved. Catastrophic forgetting removes useful prior knowledge during learning. A former known, by contrast, is retained too successfully: it remains available and persuasive after the world has changed.

BLE does not claim to solve objective philosophical truth. It models whether an agent is justified in using a proposition for a particular action under present evidence and risk. This distinction matters because the same belief can support one action but not another. A stale endpoint description might be adequate for displaying cached documentation, inadequate for sending a payment, and useful as a hypothesis for a diagnostic probe.

## 3. Related Work

BLE builds on several research traditions without replacing them:

* Truth-maintenance systems and assumption-based truth-maintenance systems show the value of explicit dependencies and justification history [4, 6].
* AGM belief revision and knowledge-base update distinguish correction of mistaken belief from update after a changing world [1, 10].
* Temporal databases and temporal knowledge graphs represent facts and rules with time and validity intervals [3, 8, 12].
* Concept-drift research studies changing data-generating processes [7].
* Continual-learning research focuses on avoiding unwanted loss of prior capabilities [5, 11].
* LLM-agent memory systems emphasize persistence, retrieval, summarization, reflection, and long-term storage [13, 14, 16-18].

The remaining gap is operational: when should a persistent agent stop using a remembered proposition to authorize action, and how should it regain authority after transient contradiction?

## 4. Belief Lifecycle Engine

### 4.1 Belief Object

A BLE belief is a versioned object containing:

* Stable identifier
* Claim
* Epistemic confidence
* Verification freshness
* Accumulated drift
* Temporal mode
* Lifecycle status
* Thresholds
* Consequence risk if wrong
* Validation cost
* Dependency map
* Suspicion provenance
* Immutable audit history

This structure is richer than a memory string because operational authority depends on how, when, and for what purpose a claim is used.

### 4.2 Confidence and Freshness

Confidence summarizes evidential support. Freshness summarizes recency of verification. Passive time changes freshness, not confidence. This separation was a central correction from the initial simulator: directly decaying confidence caused valid but unobserved beliefs to be falsely invalidated.

### 4.3 Temporal Modes

BLE defines four temporal modes:

* **Continuous:** beliefs gradually lose freshness between observations.
* **Event:** beliefs are evaluated relative to an expected event interval and grace window.
* **Epoch:** beliefs remain valid within a version or epoch and require revalidation after a boundary.
* **Static:** beliefs do not passively age within the modeled domain.

Temporal modes prevent event-bound claims such as “the nightly backup completed” from being forced into a smooth decay function and prevent mathematical or definitional facts from receiving arbitrary expiration.

### 4.4 Evidence Update and Epistemic Hysteresis

Evidence is aggregated by source family and upstream cause to avoid counting correlated signals as independent confirmations. Confidence is updated in log-odds space with asymmetric hysteresis: contradiction can remove authority quickly, while restoration requires repeated support.

Drift captures accumulated mismatch between expectation and observation. The original BLE Authority control used no positive-evidence drift reduction. The validated drift-recovery candidate allows successful observations to actively reduce accumulated distrust.

### 4.5 Lifecycle States

Beliefs move among these states:

* **TRUSTED:** currently authoritative for eligible actions.
* **STALE:** old verification rather than contradiction.
* **SUSPECT:** quarantine state for anomalies or propagated concern.
* **RECONCILIATION:** loss of operational authority pending investigation or recovery.
* **RETIRED:** removed from active use while preserving history.

Transition guards use confidence, freshness, drift, evidence provenance, and recovery thresholds.

### 4.6 Typed Dependency Propagation

A single numeric dependency weight is insufficient because relations have different meanings. BLE distinguishes:

* **Operational:** the child claim depends causally on the parent and may receive confidence and status penalties.
* **Epistemic:** the parent is evidence about the child and may influence confidence without direct operational gating.
* **Correlated:** the parent failure raises temporary concern but does not prove the child false.

For a correlated edge, BLE records propagated suspicion with a bounded lease and does not permanently reduce child confidence. This design was introduced after an authentication failure incorrectly contaminated otherwise valid notification and billing beliefs.

### 4.7 Risk-Sensitive Action Authority

An action declares required beliefs, consequence risk, read-only status, and optional fallback. Authority is granted only if required beliefs satisfy risk-specific policy. Critical and high-risk actions are blocked by reconciliation or retired states, insufficient confidence, and defined freshness limits. Low-risk read-only actions may proceed under stale beliefs.

### 4.8 Auditability and Versioning

Every update records interval, evidence cluster, before-and-after state, provenance, dependency propagation, and belief version. Actions record the versioned snapshot used for authorization. This creates a reproducible chain from world event to observation, belief transition, and action decision.

## 5. Research Questions

The evaluation addressed four research questions:

* **RQ1:** Can separating confidence from freshness prevent passive false invalidation while still enabling obsolete beliefs to lose authority?
* **RQ2:** Can typed dependency semantics prevent collateral shutdown when an upstream failure is correlated with, but does not logically invalidate, a downstream belief?
* **RQ3:** Does a SUSPECT quarantine state reduce false invalidation under noisy observations?
* **RQ4:** Can positive-evidence drift recovery reduce unnecessary rejection after noise or temporary failure without increasing unsafe actions or slowing response to persistent change?

The frozen validation focused on RQ4 after earlier pilots established the architecture used by the control.

## 6. Experimental Method

A deterministic Python simulator represented ten beliefs, an oracle world inaccessible to tested systems, observation streams, typed dependencies, and a fixed action catalogue. The beliefs covered authentication, service availability, dependencies, a backup epoch, network state, document storage, and a user-style preference.

Five systems were compared:

* Static Memory
* Fixed TTL
* BLE Authority
* BLE with positive-evidence drift recovery
* BLE with adaptive recovery

Five controlled scenarios separated persistent change from observation error:

* Stable operation with background noise
* Abrupt permanent authentication-contract change
* One forced false negative
* Three consecutive false negatives
* Three-interval transient outage followed by restoration

Each system-scenario condition used 30 previously unused seeds, producing 750 runs.

Primary metrics were reconstructed at the interval when each action was requested:

* Unsafe-action count
* False-invalidation event rate
* Valid-action rejection count
* Action throughput
* Post-change gating latency
* Valid-action fallback count

Candidate-control observations were paired by frozen seed. Valid-action rejection and throughput were tested using two-sided Wilcoxon signed-rank tests. Matched-pairs rank-biserial correlations and Hodges-Lehmann paired-difference estimates quantified effect direction and magnitude. Deterministic 10,000-resample paired bootstrap intervals were reported alongside the rank tests. Holm correction was applied separately to the four valid-rejection tests and four throughput tests.

## 7. Results

### 7.1 Validation Decision

BLE drift recovery passed all five frozen gates. Neither BLE Authority nor the drift-recovery candidate executed an unsafe action, and both maintained zero false invalidation. The primary candidate produced zero unsafe actions across 150 validation runs; the one-sided exact 95% upper confidence bound on the run-level event probability was 1.98%. During the permanent abrupt change, mean operational gating latency was 5.10 intervals for both systems.

### 7.2 Complete System Comparison

| System | Unsafe | False invalidation | Valid rejection | Throughput | Gate latency |
| --- | ---: | ---: | ---: | ---: | ---: |
| Static Memory | 80.00 | 0.000 | 0.00 | 1.000 | - |
| Fixed TTL | 10.00 | 0.700 | 70.00 | 0.590 | 10.00 |
| BLE Authority | 0.00 | 0.000 | 18.62 | 0.906 | 5.10 |
| BLE + drift recovery | 0.00 | 0.000 | 4.63 | 0.974 | 5.10 |
| BLE + adaptive recovery | 0.00 | 0.000 | 4.72 | 0.973 | 5.10 |

Unsafe actions and gating latency are from the abrupt permanent-change scenario. False invalidation is from stable noise. Rejection and throughput are pooled means across the four recoverable scenarios.

### 7.3 Valid-Action Rejection

Across the four recoverable scenarios, drift recovery reduced valid-action rejections by 75.11%.

| Scenario | Mean difference | Hodges-Lehmann difference | Rank-biserial | Holm p | 95% bootstrap CI |
| --- | ---: | ---: | ---: | ---: | --- |
| Stable noise | -8.67 | -8.00 | -1.000 | 6.7e-06 | [-10.57, -6.93] |
| Single false negative | -12.30 | -12.00 | -1.000 | 6.7e-06 | [-14.27, -10.40] |
| Triple false negative | -17.53 | -17.00 | -1.000 | 6.7e-06 | [-19.20, -16.00] |
| Transient outage | -17.43 | -17.00 | -1.000 | 6.7e-06 | [-19.07, -15.87] |

All 30 nonzero paired seed differences favored drift recovery in every recoverable scenario, demonstrating complete directional consistency within the frozen validation sample.

### 7.4 Throughput

Mean throughput pooled across recoverable scenarios increased from 0.905528 under BLE Authority to 0.973740 under drift recovery.

| Scenario | Mean paired difference | Hodges-Lehmann | Rank-biserial | Holm p | 95% bootstrap CI |
| --- | ---: | ---: | ---: | ---: | --- |
| Stable noise | 0.0423 | 0.0390 | 1.000 | 6.69248e-06 | [0.0338, 0.0514] |
| Single false negative | 0.0600 | 0.0585 | 1.000 | 6.69248e-06 | [0.0509, 0.0694] |
| Triple false negative | 0.0855 | 0.0829 | 1.000 | 6.69248e-06 | [0.0780, 0.0938] |
| Transient outage | 0.0850 | 0.0829 | 1.000 | 6.69248e-06 | [0.0776, 0.0932] |

### 7.5 Persistent Failure Response

The availability improvement did not result from generally permissive gating. In the permanent-change scenario, drift recovery matched the control in unsafe-action count, false invalidation, operational gating latency, fallback behavior, and throughput. Positive observations were absent after the persistent change, so supportive recovery could not erase sustained contradictory drift.

### 7.6 Secondary Candidate

Adaptive recovery preserved the tested safety behavior and substantially reduced valid rejection. It did not provide a consistent advantage over fixed-rate drift recovery and was slightly worse after a single false negative. The simpler fixed-rate mechanism was retained under a parsimony criterion.

## 8. Discussion

The results support the four research questions within the simulator:

* Separating confidence from freshness eliminated passive false invalidation in the authority model.
* Typed dependency semantics and bounded propagated suspicion reduced collateral action blocking while preserving tested safety behavior.
* SUSPECT quarantine prevented contradictory observations from becoming immediate invalidation, although several critical actions treated SUSPECT and RECONCILIATION similarly.
* Positive-evidence drift recovery reduced valid-action rejection by 75.11%, with zero observed unsafe actions, zero false invalidation, and unchanged permanent-change gating latency.

The broader lesson is that memory capacity is not memory authority. Long-term memory research often evaluates recall, relevance, and task completion. BLE demonstrates why successful retrieval is not sufficient for long-lived operation. A memory system can retrieve a fact perfectly and still authorize the wrong action because the fact is a former known.

The validated contribution is best described as controlled forgiveness. Persistent failure still accumulates drift; renewed success gradually removes it without making supportive and contradictory evidence equally influential.

## 9. Limitations and Threats to Validity

The study used a deterministic synthetic simulator rather than a live LLM agent or production service. The world model, action catalogue, observation channels, and dependency graph were intentionally small. The findings therefore establish internal mechanism validity, not broad external generalizability.

Zero observed unsafe actions is not proof of absolute safety. It means no unsafe action occurred in the frozen scenarios and seeds. Larger adversarial studies should include delayed and reordered evidence, coordinated sensor failure, malicious memory injection, dependency cycles, regime changes, and costly or irreversible fallbacks.

Evidence clustering was not independently validated because the frozen scenarios did not contain multiple strongly correlated observations caused by one upstream event. Parameter sensitivity was not evaluated in the frozen validation study. All values were fixed before execution, so the findings establish behavior of the pre-specified reference configuration frozen before holdout validation rather than robustness across the full parameter space.

## 10. Conclusion

Long-lived AI agents face a category of failure that is easy to overlook: beliefs that were once correct can remain operationally authoritative after they stop describing reality. We call these former knowns. The Belief Lifecycle Engine addresses the problem by representing beliefs as temporal, versioned, risk-bearing objects; separating confidence from freshness; accumulating contradiction as drift; staging anomalies through quarantine; propagating concern according to dependency meaning; and gating actions against current belief authority.

The staged experiments showed why each distinction matters. Passive confidence decay caused false invalidation. Confidence-freshness separation fixed that failure. Typed dependency semantics prevented collateral shutdown. Corrected interval metrics revealed sticky recovery. Positive-evidence drift reduction then cut unnecessary valid-action rejection by 75.11% across 750 frozen validation runs while preserving zero observed unsafe actions, zero false invalidation, and unchanged persistent-change gating latency.

The broader implication is that memory management for persistent agents should not end with storage and retrieval. It must include lifecycle governance: when a belief may authorize action, when it requires reality contact, how uncertainty propagates, and how trust can be responsibly restored.

## References

1. Carlos E. Alchourron, Peter Gardenfors, and David Makinson. 1985. On the Logic of Theory Change: Partial Meet Contraction and Revision Functions. *Journal of Symbolic Logic* 50, 2, 510-530.
2. Theofanis I. Aravanis. 2025. On the Consistency between Belief Revision and Belief Update. *Journal of Artificial Intelligence Research* 82, 1743-1771.
3. Borui Cai, Yong Xiang, Long Gao, Hui Zhang, Yuhang Li, and Jianxin Li. 2023. Temporal Knowledge Graph Completion: A Survey. *IJCAI*.
4. Johan de Kleer. 1986. An Assumption-Based TMS. *Artificial Intelligence* 28, 2, 127-162.
5. Matthias De Lange et al. 2022. A Continual Learning Survey: Defying Forgetting in Classification Tasks. *IEEE TPAMI* 44, 7, 3366-3385.
6. Jon Doyle. 1979. A Truth Maintenance System. *Artificial Intelligence* 12, 3, 231-272.
7. Joao Gama, Indre Zliobaite, Albert Bifet, Mykola Pechenizkiy, and Abdelhamid Bouchachia. 2014. A Survey on Concept Drift Adaptation. *ACM Computing Surveys* 46, 4.
8. Rikui Huang, Wei Wei, Xian Ou, Sishuo Zhang, Deli Chen, and Yu Cheng. 2024. Confidence Is Not Timeless: Modeling Temporal Validity for Rule-Based Temporal Knowledge Graph Forecasting. *ACL*.
9. Aaron Hunter and James P. Delgrande. 2015. Belief Change with Uncertain Action Histories. *Journal of Artificial Intelligence Research* 53, 779-824.
10. Hirofumi Katsuno and Alberto O. Mendelzon. 1992. On the Difference between Updating a Knowledge Base and Revising It. In *Belief Revision*.
11. Michael McCloskey and Neal J. Cohen. 1989. Catastrophic Interference in Connectionist Networks: The Sequential Learning Problem. *Psychology of Learning and Motivation* 24, 109-165.
12. Gultekin Ozsoyoglu and Richard T. Snodgrass. 1995. Temporal and Real-Time Databases: A Survey. *IEEE TKDE* 7, 4, 513-532.
13. Charles Packer et al. 2023. MemGPT: Towards LLMs as Operating Systems. arXiv:2310.08560.
14. Joon Sung Park et al. 2023. Generative Agents: Interactive Simulacra of Human Behavior. *UIST*.
15. Mohan Sridharan, Michael Gelfond, Shiqi Zhang, and Jeremy Wyatt. 2019. REBA: A Refinement-Based Architecture for Knowledge Representation and Reasoning in Robotics. *Journal of Artificial Intelligence Research* 65, 87-180.
16. Weizhi Wang et al. 2023. Augmenting Language Models with Long-Term Memory. arXiv:2306.07174.
17. Zeyu Zhang et al. 2024. A Survey on the Memory Mechanism of Large Language Model Based Agents. arXiv:2404.13501.
18. Wanjun Zhong, Liang Guo, Qiqi Gao, He Ye, and Yanlin Wang. 2024. MemoryBank: Enhancing Large Language Models with Long-Term Memory. *AAAI* 38, 19724-19731.

## Reproducibility Checklist Summary

The manuscript reports computational experiments using a synthetic deterministic simulator. The archived package is described as containing source, generated logs, corrected audit tables, hashes, manifests, run commands, Python version, container metadata, frozen seeds, configuration values, and statistical-analysis scripts. Public repository URLs and explicit redistribution licenses remain to be inserted before formal public release.

## AI-Assistance Statement

OpenAI ChatGPT and Anthropic Claude were used for language editing, code scaffolding and debugging, statistical-reporting checks, and adversarial manuscript critique. The author designed the study, executed and preserved the experiments, verified calculations and artifacts, interpreted the results, and accepts full responsibility for the manuscript. AI systems are not authors and are not cited as independent evidence.
