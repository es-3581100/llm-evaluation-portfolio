# Reproducibility Notes

This directory is reserved for reproducibility notes and the public-release checklist associated with the Belief Lifecycle Engine working paper.

## Current Public Status

The portfolio currently publishes the manuscript and high-level experimental claims. The full source-and-results archive is not yet public in this repository.

## Reported Validation Design

| Item | Value |
| --- | ---: |
| Systems compared | 5 |
| Scenarios | 5 |
| Seeds per system-scenario condition | 30 |
| Total validation runs | 750 |
| Primary candidate | BLE with positive-evidence drift recovery |

## Reported Statistical Methods

* Paired seed comparison
* Wilcoxon signed-rank tests
* Holm correction
* Hodges-Lehmann paired-difference estimates
* Matched-pairs rank-biserial effects
* Deterministic paired bootstrap intervals

## Public-Release Checklist

Before treating the package as fully reproducible, add:

* Source code archive or repository link
* Explicit code license
* Explicit generated-data/results license
* Frozen configuration files
* Frozen seed list
* Exact run commands
* Analysis commands
* Environment metadata
* Output manifests and checksums
* Raw interval logs or documented reason for withholding them

## Claim Boundary

The working paper establishes internal mechanism validity for the reported deterministic simulator configuration. It does not claim broad external-agent safety, production readiness, or peer-reviewed confirmation.
