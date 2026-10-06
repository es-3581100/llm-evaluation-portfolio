# Eric Sawtelle — Experimental AI Systems & Agentic Engineering

This portfolio now reflects a broader body of work than the original LLM-evaluation-only framing.

I design and build experimental systems across **agent orchestration, AI-native applications, technical visualization, provenance infrastructure, developer tooling, and AI reliability**. The recurring design problem is how to make increasingly capable systems inspectable: visible state, explicit authority, durable context, reproducible artifacts, and verification that does not depend on the model grading itself.

Live portfolio: <https://es-3581100.github.io/llm-evaluation-portfolio/>

## Work branches

1. **Agentic systems** — DonSquad, Kolmaf-AI Desktop, Goblin Logic Manager.
2. **AI-native applications** — Cosmosis Image Studio, LLM Tokenizer Lab.
3. **Computational interfaces** — Sacred Computations, Fractal Studio, Fractal Chaos Coding Map.
4. **Knowledge & provenance** — MM-manager, IngestWowww, Master ASH Catalog / ASH-WIKI.
5. **Evaluation & reliability** — Safety-Aware RAG Evaluation, Belief Lifecycle Engine, AI Agent Red-Team Evaluation Guide.
6. **Human-centered AI** — practical workflows such as DIY Monthly Newsletter Free.

The landing page and Work index are projections over [`site/data/portfolio.json`](site/data/portfolio.json) rather than separate hand-maintained project lists.

## Research lineage

The original evaluation work remains part of the portfolio and is preserved as an evidence archive:

- [`case-studies/safety-aware-retrieval/`](case-studies/safety-aware-retrieval/)
- [`research/belief-lifecycle-engine/`](research/belief-lifecycle-engine/)
- [`research/ai-agent-red-team-evaluation-guide/`](research/ai-agent-red-team-evaluation-guide/)
- [`research/goal-hijacking-state-exploration-agents/`](research/goal-hijacking-state-exploration-agents/)

The shift is one of **scope**, not repudiation: evaluation and adversarial testing increasingly function as verification layers inside larger systems-design work.

## Site architecture

```text
site/data/portfolio.json
        ↓
site/assets/portfolio.js
        ↓
landing page / branch explorer / Work filters

site/data/resume-status.json
        ↓
resume-status notices without modifying the PDF
```

The current visual draft and its exact reference provenance live under [`docs/design/`](docs/design/). The design reference is treated as a vocabulary and process contract, not a copy/paste template.

## Resume status

The tracked PDF at `site/resume/Eric_Sawtelle.pdf` is intentionally preserved unchanged and is currently **out of date** relative to the work represented by this portfolio. See [`RESUME_STATUS.md`](RESUME_STATUS.md).

## Development approach

AI-assisted coding and review are used heavily, but generated output is not treated as independent evidence that a system works. Important claims are expected to survive direct inspection, testing, reproducible artifacts, or other independent verification appropriate to the project.

## Contact

- GitHub: <https://github.com/es-3581100>
- Email: <e.sawtelle358@gmail.com>
