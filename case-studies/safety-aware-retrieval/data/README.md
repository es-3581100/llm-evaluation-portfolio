# Data Notes

This directory contains public, sanitized artifacts for the Safety-Aware Retrieval Evaluation case study.

## Files

* [`benchmark-sample-illustrative.jsonl`](benchmark-sample-illustrative.jsonl) contains 10 sanitized representative benchmark rows.
* [`benchmark-schema.json`](benchmark-schema.json) defines the public benchmark-row schema.

## Evidence Boundary

The illustrative sample is not the complete 74-item checkpoint output and is not sufficient to independently recalculate aggregate results. Its `retrieval_outcome` labels are retained as representative examples until the sample can be refreshed from the corrected internal checkpoint artifact.

Aggregate precision and abstention metrics are intentionally withheld until they can be recomputed and traced to the corrected BM25 score-direction contract.
