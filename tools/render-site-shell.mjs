#!/usr/bin/env node
/**
 * Render the canonical portfolio header/footer into static HTML.
 *
 * The site keeps semantic, no-JS navigation in the HTML. This generator exists
 * to prevent shell drift between the main portfolio, evidence archive, skills,
 * and project-detail pages.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE=path.dirname(fileURLToPath(import.meta.url));
const SITE=path.resolve(HERE,"..","site");
const BASE="/llm-evaluation-portfolio/";
const LINKEDIN="https://www.linkedin.com/in/eric-sawtelle-0b021226b/";

const activeByPath={
  "projects/index.html":"work",
  "search.html":"work",
  "case-studies.html":"research",
  "projects/safety-aware-rag-retrieval-evaluation.html":"research",
  "projects/belief-lifecycle-engine.html":"research",
  "projects/ai-agent-red-team-evaluation-guide.html":"research",
  "projects/goal-hijacking-in-state-exploration-agents.html":"research",
  "about.html":"about",
  "about-me.html":"about",
  "contact.html":"contact"
};

const nav=(href,label,key,active,external=false)=>
  '<a'+(external?' class="external-link"':'')+' href="'+href+'"'+
  (key===active?' aria-current="page"':'')+
  (external?' target="_blank" rel="noreferrer"':'')+'>'+label+'</a>';

function header(active=""){
  return '<header class="site-header"><div class="nav-shell"><div class="brand">'+
    '<a class="brand-mark external-link" href="'+LINKEDIN+'" target="_blank" rel="noreferrer" aria-label="Eric Sawtelle on LinkedIn">ES</a>'+
    '<a class="brand-copy brand-home" href="'+BASE+'"><strong>Eric Sawtelle</strong><span>systems / interfaces / evidence</span></a>'+
    '</div><nav class="main-nav" aria-label="Primary">'+
    nav(BASE+'#branches','Branches','branches',active)+
    nav(BASE+'projects/index.html','Work','work',active)+
    nav(BASE+'case-studies.html','Research archive','research',active)+
    nav(BASE+'about.html','About','about',active)+
    nav(BASE+'contact.html','Contact','contact',active)+
    nav('https://github.com/es-3581100','GitHub ↗','github',active,true)+
    '</nav></div></header>';
}

const footer='<footer class="site-footer"><div class="footer-panel footer-rail">'+
  '<div class="footer-identity"><a class="footer-name" href="'+BASE+'contact.html">Eric Sawtelle</a><span class="footer-disciplines">Systems / Agentic / Technical</span></div>'+
  '<nav class="footer-nav" aria-label="Footer"><a href="'+BASE+'projects/index.html">Work</a><a href="'+BASE+'about.html">About</a><a href="'+BASE+'contact.html">Contact</a><a class="external-link" href="https://github.com/es-3581100" target="_blank" rel="noreferrer">GitHub ↗</a></nav>'+
  '<div class="footer-legal">© Eric Sawtelle · <a href="'+BASE+'content-usage.html">Content / automated-use notice</a></div>'+
  '</div></footer>';

for(const file of walk(SITE)){
  if(!file.endsWith(".html"))continue;
  const rel=path.relative(SITE,file).replaceAll(path.sep,"/");
  let html=fs.readFileSync(file,"utf8");
  if(/<header[\s\S]*?<\/header>/.test(html)){
    html=html.replace(/<header[\s\S]*?<\/header>/,header(activeByPath[rel]||""));
  }
  if(/<footer[\s\S]*?<\/footer>/.test(html)){
    html=html.replace(/<footer[\s\S]*?<\/footer>/,footer);
  }
  fs.writeFileSync(file,html);
}

function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const full=path.join(dir,entry.name);
    return entry.isDirectory()?walk(full):[full];
  });
}
