#!/usr/bin/env node
/**
 * Render machine-readable discovery metadata into static HTML.
 *
 * Source of truth:
 *   site/data/discovery-index.json
 *
 * This script intentionally writes only <head> metadata. It does not alter
 * human-visible portfolio content, navigation, project records, or styling.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SITE = path.join(ROOT, "site");
const DISCOVERY = JSON.parse(fs.readFileSync(path.join(SITE, "data", "discovery-index.json"), "utf8"));
const BASE = "https://es-3581100.github.io/llm-evaluation-portfolio/";
const PERSON_ID = BASE + "#eric-sawtelle";
const WEBSITE_ID = BASE + "#website";
const DISCOVERY_HREF = "/llm-evaluation-portfolio/data/discovery-index.json";

const evidencedSkills = DISCOVERY.skills.filter(x => x.status === "evidenced").map(x => x.term);
const technologies = DISCOVERY.technologies.filter(x => x.status === "evidenced").map(x => x.term);

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: DISCOVERY.person.name,
  url: DISCOVERY.person.canonical_url,
  jobTitle: DISCOVERY.person.self_described_title,
  description: DISCOVERY.person.description,
  sameAs: DISCOVERY.person.same_as,
  knowsAbout: evidencedSkills.slice(0, 15),
  skills: [...technologies.slice(0, 8), ...evidencedSkills.filter(x =>
    ["Agent Orchestration","LLM Evaluation","Retrieval-Augmented Generation","Tool Use","Model Context Protocol (MCP)","Deterministic Verification"].includes(x)
  )]
};

const jsonld = {
  "index.html": {
    "@context": "https://schema.org",
    "@graph": [
      {"@type":"WebSite","@id":WEBSITE_ID,"url":BASE,"name":"Eric Sawtelle — Experimental AI Systems","description":"Portfolio of experimental AI systems, agentic engineering, technical interfaces, evaluation, reliability, and provenance work.","mainEntity":{"@id":PERSON_ID}},
      person
    ]
  },
  "about.html": {"@context":"https://schema.org","@type":"ProfilePage","url":BASE+"about.html","name":"About — Eric Sawtelle","mainEntity":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID}},
  "about-me.html": {"@context":"https://schema.org","@type":"ProfilePage","url":BASE+"about-me.html","name":"About me — Eric Sawtelle","mainEntity":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID}},
  "projects/index.html": {"@context":"https://schema.org","@type":"CollectionPage","url":BASE+"projects/index.html","name":"Work — Eric Sawtelle","about":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID}},
  "case-studies.html": {"@context":"https://schema.org","@type":"CollectionPage","url":BASE+"case-studies.html","name":"Research archive — Eric Sawtelle","about":["LLM Evaluation","AI Reliability","AI Safety","Agentic AI Systems"],"isPartOf":{"@id":WEBSITE_ID}},
  "skills.html": {"@context":"https://schema.org","@type":"CollectionPage","url":BASE+"skills.html","name":"Skills — Eric Sawtelle","about":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID}},
  "contact.html": {"@context":"https://schema.org","@type":"ContactPage","url":BASE+"contact.html","name":"Contact — Eric Sawtelle","about":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID}},
  "experience.html": {"@context":"https://schema.org","@type":"ProfilePage","url":BASE+"experience.html","name":"Experience — Eric Sawtelle","mainEntity":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID}},
  "projects/safety-aware-rag-retrieval-evaluation.html": {"@context":"https://schema.org","@type":"TechArticle","headline":"Safety-Aware RAG/Retrieval Evaluation","url":BASE+"projects/safety-aware-rag-retrieval-evaluation.html","author":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID},"about":["LLM Evaluation","Retrieval-Augmented Generation","Retrieval Evaluation","AI Reliability","Grounded Generation"],"keywords":["LLM Evaluation","RAG","Retrieval Evaluation","Grounding","Abstention","AI Reliability"]},
  "projects/belief-lifecycle-engine.html": {"@context":"https://schema.org","@type":"TechArticle","headline":"Belief Lifecycle Engine","url":BASE+"projects/belief-lifecycle-engine.html","author":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID},"about":["AI Reliability","Agent Memory and Persistent State","AI Safety","Deterministic Verification"],"keywords":["Agent Memory","Persistent State","AI Reliability","Temporal Authority","Deterministic Verification"]},
  "projects/ai-agent-red-team-evaluation-guide.html": {"@context":"https://schema.org","@type":"TechArticle","headline":"AI Agent Red-Team Evaluation Guide","url":BASE+"projects/ai-agent-red-team-evaluation-guide.html","author":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID},"about":["AI Safety","LLM Evaluation","Model Context Protocol (MCP)","Tool Use","Prompt Injection Analysis","Safety Gating"],"keywords":["AI Safety","Agent Red Teaming","MCP","Tool Use","Prompt Injection","Safety Gating"]},
  "projects/goal-hijacking-in-state-exploration-agents.html": {"@context":"https://schema.org","@type":"TechArticle","headline":"Goal Hijacking in State-Exploration Agents","url":BASE+"projects/goal-hijacking-in-state-exploration-agents.html","author":{"@id":PERSON_ID},"isPartOf":{"@id":WEBSITE_ID},"about":["AI Safety","Capability Boundaries","Safety Gating","Tool Use","Agentic AI Systems"],"keywords":["Goal Hijacking","Capability Boundaries","Safety Gating","Agentic AI","Tool Use"]}
};

const marker = /\n?<!-- BEGIN GENERATED DISCOVERY METADATA -->[\s\S]*?<!-- END GENERATED DISCOVERY METADATA -->\n?/g;
for (const file of walk(SITE)) {
  if (!file.endsWith(".html")) continue;
  const rel = path.relative(SITE, file).replaceAll(path.sep, "/");
  let html = fs.readFileSync(file, "utf8").replace(marker, "\n");
  const parts = [
    '<link rel="alternate" type="application/json" href="' + DISCOVERY_HREF + '" title="Machine-readable portfolio index">'
  ];
  if (jsonld[rel]) parts.push('<script type="application/ld+json">' + JSON.stringify(jsonld[rel]) + '</script>');
  const block = '<!-- BEGIN GENERATED DISCOVERY METADATA -->\n' + parts.join("\n") + '\n<!-- END GENERATED DISCOVERY METADATA -->';
  if (!html.includes("</head>")) throw new Error("Missing </head>: " + rel);
  html = html.replace("</head>", block + "</head>");
  fs.writeFileSync(file, html);
}

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
