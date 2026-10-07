# Crawler policy and GitHub Pages topology

As of 2026-10-06, this portfolio is a GitHub Pages **project site** served under:

`https://es-3581100.github.io/llm-evaluation-portfolio/`

The connected GitHub account does not currently contain an `es-3581100.github.io` user/root-site repository. Because the Robots Exclusion Protocol requires rules at the origin top-level `/robots.txt`, this project repository cannot by itself publish an authoritative policy for `https://es-3581100.github.io/robots.txt`.

Accordingly:

- no project-level `site/robots.txt` is presented as active crawler control;
- `docs/robots-origin-root.txt` contains the intended **origin-root** policy, scoped to this portfolio path so other GitHub Pages projects are not blocked;
- that file is advisory until it is actually published at `https://es-3581100.github.io/robots.txt` from an origin-root Pages site or equivalent origin-level control;
- public portfolio pages remain indexable by ordinary search engines.

## Verified crawler identifiers

The intended policy uses only identifiers documented by the providers:

- `GPTBot` — OpenAI model-training crawler: disallow portfolio path.
- `OAI-SearchBot` — OpenAI search crawler: allow portfolio path.
- `ClaudeBot` — Anthropic model-development/training crawler: disallow portfolio path.
- `Claude-SearchBot` — Anthropic search crawler: allow portfolio path.
- `Google-Extended` — Google product token controlling Gemini training/grounding use independently of Google Search: disallow portfolio path.
- `Googlebot` — ordinary Google Search crawler: allow portfolio path.
- `CCBot` — Common Crawl crawler: disallow portfolio path.
- `PerplexityBot` — Perplexity's documented search/indexing crawler. The requested policy blocks it, even though Perplexity currently documents it as search rather than foundation-model training.

The intended root policy also reserves `/llm-evaluation-portfolio/resume/` from ordinary crawler discovery if that path is ever reused. The current portfolio deployment does not serve a résumé PDF there.

## Limits

robots.txt is a polite-request protocol, not access control. The content-use notice and crawler directives do not make public pages private and do not prevent retrieval by crawlers that ignore them.
