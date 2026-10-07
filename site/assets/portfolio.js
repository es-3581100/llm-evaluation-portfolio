(function(){
  "use strict";
  const body=document.body;
  const page=body.dataset.page||"home";
  const dataUrl=body.dataset.data||"data/portfolio.json";
  const resumeUrl=body.dataset.resume||"data/resume-status.json";
  const esc=(s)=>String(s??"").replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
  const projectMap=(data)=>new Map(data.projects.map(p=>[p.id,p]));
  function links(list){return (list||[]).map(x=>{const ext=/^https?:/.test(x.url);return `<a class="${ext?'external-link':''}" href="${esc(x.url)}" ${ext?'target="_blank" rel="noreferrer"':''}>${esc(x.label)}</a>`;}).join("");}
  function tags(list){return `<div class="tag-row">${(list||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>`;}
  function projectSlice(p){return `<article class="project-slice"><div><div class="project-type">${esc(p.type)}</div><div class="plate-status">${esc(p.status)}</div></div><div><h4>${esc(p.title)}</h4><p>${esc(p.summary)}</p>${tags(p.tags)}</div><div><div class="signal-readout">${esc(p.signal)}</div><div class="project-links">${links(p.links)}</div></div></article>`;}
  function plate(p){const first=(p.links||[])[0],ext=first&&/^https?:/.test(first.url);return `<a class="project-plate ${ext?'external-link':''}" href="${esc(first?first.url:'#')}" ${ext?'target="_blank" rel="noreferrer"':''}><div class="plate-top"><span class="project-type">${esc(p.type)}</span><span class="plate-status">${esc(p.status)}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><div class="plate-signal">${esc(p.signal)}</div></a>`;}
  function fillIdentity(data){document.querySelectorAll('[data-field]').forEach(el=>{const key=el.dataset.field;if(data.identity[key])el.textContent=data.identity[key];});}
  function renderResume(status){document.querySelectorAll('[data-resume-status]').forEach(el=>{el.innerHTML=`<strong>Resume status · ${esc(status.status.replaceAll('_',' '))}</strong><p>${esc(status.note)}</p>`;});}
  function renderHome(data){
    fillIdentity(data);const pm=projectMap(data);
    const hidx=document.getElementById('hero-branch-index');if(hidx)hidx.innerHTML=data.branches.map(b=>`<li><b>${esc(b.number)}</b><span>${esc(b.label)}</span></li>`).join('');
    const fg=document.getElementById('featured-grid');if(fg){const ids=['mm-manager','sacred-computations','cosmosis','don-squad'];fg.innerHTML=ids.map(id=>plate(pm.get(id))).join('');}
    const rail=document.getElementById('branch-rail'),detail=document.getElementById('branch-detail');
    function showBranch(id,focus){const b=data.branches.find(x=>x.id===id)||data.branches[0];rail.querySelectorAll('button').forEach(btn=>btn.setAttribute('aria-selected',String(btn.dataset.branch===b.id)));detail.innerHTML=`<div class="branch-detail-head"><div><div class="section-kicker">${esc(b.number)} / ${esc(b.label)}</div><h3>${esc(b.label)}</h3></div><p class="branch-copy">${esc(b.intro)}</p></div><div class="project-slices">${b.project_ids.map(pid=>projectSlice(pm.get(pid))).join('')}</div>`;if(focus)detail.focus({preventScroll:true});history.replaceState(null,'',`#${b.id}`);}
    if(rail&&detail){rail.innerHTML=data.branches.map((b,i)=>`<button class="branch-button" type="button" data-branch="${esc(b.id)}" aria-selected="${i===0}"><span class="branch-no">${esc(b.number)}</span><span><strong>${esc(b.label)}</strong><small>${esc(b.short)}</small></span></button>`).join('');rail.addEventListener('click',e=>{const btn=e.target.closest('button[data-branch]');if(btn)showBranch(btn.dataset.branch,true)});const start=location.hash.slice(1);showBranch(data.branches.some(b=>b.id===start)?start:data.branches[0].id,false);}
    const pg=document.getElementById('principle-grid');if(pg)pg.innerHTML=data.principles.map((p,i)=>`<article class="principle"><div class="folio">0${i+1}</div><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`).join('');
  }
  function renderWork(data){fillIdentity(data);const list=document.getElementById('work-list'),filters=document.getElementById('work-filters');if(!list||!filters)return;const branchById=new Map(data.branches.map(b=>[b.id,b]));let active=new URLSearchParams(location.search).get('branch')||'all';if(active!=='all'&&!branchById.has(active))active='all';filters.innerHTML=`<button class="filter-btn" data-filter="all">All work</button>`+data.branches.map(b=>`<button class="filter-btn" data-filter="${esc(b.id)}">${esc(b.label)}</button>`).join('');function draw(){filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===active)));const items=data.projects.filter(p=>active==='all'||p.branch===active);list.innerHTML=items.map((p,i)=>`<article class="work-row" id="project-${esc(p.id)}"><div class="work-no">${String(i+1).padStart(2,'0')}</div><div><h2>${esc(p.title)}</h2><div class="project-type">${esc(branchById.get(p.branch)?.label||p.branch)} · ${esc(p.type)}</div></div><div><p>${esc(p.summary)}</p>${tags(p.tags)}</div><div><div class="signal-readout">${esc(p.signal)}</div><div class="project-links">${links(p.links)}</div></div></article>`).join('')||'<div class="loading">No projects in this branch yet.</div>';const u=new URL(location.href);active==='all'?u.searchParams.delete('branch'):u.searchParams.set('branch',active);history.replaceState(null,'',u.pathname+u.search+u.hash);const anchor=u.hash&&document.getElementById(u.hash.slice(1));if(anchor)requestAnimationFrame(()=>anchor.scrollIntoView({block:'center'}));}
    filters.addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(!b)return;active=b.dataset.filter;draw();});draw();
  }
  function renderAbout(data){fillIdentity(data);const target=document.getElementById('about-branches');if(target)target.innerHTML=data.branches.map(b=>`<div><b>${esc(b.number)} / ${esc(b.label)}</b>${esc(b.short)}</div>`).join('');}
  function renderRenderedGallery(data){
    const target=document.getElementById('rendered-gallery'),gallery=data.rendered_gallery;
    if(!target||!gallery)return;
    const pm=projectMap(data);
    target.innerHTML=gallery.entries.map((entry,i)=>{
      const p=pm.get(entry.project_id);if(!p)return'';
      const link=(p.links||[]).find(x=>/Project page/i.test(x.label))||(p.links||[])[0];
      const preview=entry.preview_image
        ?`<img src="${esc(entry.preview_image)}" alt="" loading="lazy">`
        :`<div class="gallery-visual gallery-visual--${esc(entry.visual||'system')}" aria-hidden="true"><span class="gallery-visual-index">${String(i+1).padStart(2,'0')}</span><span class="gallery-visual-title">${esc(p.title)}</span></div>`;
      return `<article class="gallery-artifact gallery-artifact--${esc(entry.layout||'medium')}">${preview}<div class="gallery-caption"><div><div class="gallery-label">${esc(entry.label)}</div><h2>${esc(p.title)}</h2><p>${esc(entry.descriptor)}</p><div class="gallery-medium">${esc(entry.medium)}</div></div>${link?`<a class="${/^https?:/.test(link.url)?'external-link':''}" href="${esc(link.url)}" ${/^https?:/.test(link.url)?'target="_blank" rel="noreferrer"':''}>view ↗</a>`:''}</div></article>`;
    }).join('');
  }
  function wireAboutScenes(){
    const stage=document.getElementById('about-stage'),seam=document.getElementById('scene-seam');
    if(!stage||!seam)return;
    const cards=[...stage.querySelectorAll('[data-scene]')];
    if(cards.length<2)return;
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current=Math.max(0,cards.findIndex(card=>card.id===location.hash.slice(1)));
    let busy=false;
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    function setActive(index,focus){
      cards.forEach((card,i)=>{const active=i===index;card.classList.toggle('is-active',active);card.classList.remove('is-transitioning','is-arriving','is-revealing');card.style.transform='';card.setAttribute('aria-hidden',String(!active));if('inert' in card)card.inert=!active;});
      current=index;
      if(focus){const h=cards[index].querySelector('h1');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}}
    }
    setActive(current,false);
    body.classList.add('scene-ready');
    window.scrollTo(0,0);
    if(!location.hash)history.replaceState({scene:cards[current].id},'',location.pathname+location.search+'#'+cards[current].id);
    async function move(next,origin,push,focus){
      if(next<0||next>=cards.length||next===current||busy)return;
      const from=current,to=cards[next],dir=next>from?1:-1;
      if(reduced||typeof to.animate!=='function'){
        setActive(next,focus);
        if(push)history.pushState({scene:to.id},'',location.pathname+location.search+'#'+to.id);
        return;
      }
      busy=true;
      const cutLine=origin&&origin.closest('.scene-navline');
      const stageRect=stage.getBoundingClientRect();
      const seamY=cutLine?Math.max(0,Math.min(stageRect.height,cutLine.getBoundingClientRect().top-stageRect.top)):stageRect.height*(dir>0?.78:.22);
      seam.style.top=seamY+'px';
      seam.classList.add('is-cut');
      if(cutLine)cutLine.classList.add('is-cut');
      stage.animate([{transform:'translateY(0)'},{transform:'translateY(1px)'},{transform:'translateY(0)'}],{duration:70,easing:'steps(2,end)'});
      to.classList.add('is-transitioning','is-arriving');
      const galleryEntry=to.dataset.sceneKind==='gallery'&&dir>0;
      to.style.transform=galleryEntry?'translateY(100%) rotate(3deg)':(dir>0?'translateY(100%)':'translateY(-100%)');
      to.setAttribute('aria-hidden','false');
      if('inert' in to)to.inert=false;
      await wait(70);
      if(push)history.pushState({scene:to.id},'',location.pathname+location.search+'#'+to.id);
      const incoming=galleryEntry
        ?[{transform:'translateY(100%) rotate(3deg)',offset:0},{transform:'translateY(98%) rotate(3deg)',offset:.06},{transform:'translateY(94%) rotate(2.7deg)',offset:.11},{transform:'translateY(86%) rotate(2.2deg)',offset:.18},{transform:'translateY(0) rotate(0deg)',offset:.84},{transform:'translateY(-2px) rotate(0deg)',offset:.93},{transform:'translateY(0) rotate(0deg)',offset:1}]
        :(dir>0
          ?[{transform:'translateY(100%)',offset:0},{transform:'translateY(98%)',offset:.06},{transform:'translateY(94%)',offset:.11},{transform:'translateY(86%)',offset:.18},{transform:'translateY(0)',offset:.84},{transform:'translateY(-2px)',offset:.93},{transform:'translateY(0)',offset:1}]
          :[{transform:'translateY(-100%)',offset:0},{transform:'translateY(-98%)',offset:.06},{transform:'translateY(-94%)',offset:.11},{transform:'translateY(-86%)',offset:.18},{transform:'translateY(0)',offset:.84},{transform:'translateY(2px)',offset:.93},{transform:'translateY(0)',offset:1}]);
      const outgoing=dir>0
        ?[{transform:'translateY(0)'},{transform:'translateY(-100%)'}]
        :[{transform:'translateY(0)'},{transform:'translateY(100%)'}];
      const outAnim=cards[from].animate(outgoing,{duration:420,easing:'cubic-bezier(.22,.82,.32,1)',fill:'both'});
      const inAnim=to.animate(incoming,{duration:500,easing:'cubic-bezier(.22,.82,.32,1)',fill:'both'});
      window.setTimeout(()=>to.classList.add('is-revealing'),330);
      await Promise.all([outAnim.finished.catch(()=>{}),inAnim.finished.catch(()=>{})]);
      seam.classList.remove('is-cut');
      if(cutLine)cutLine.classList.remove('is-cut');
      setActive(next,focus);
      busy=false;
    }
    stage.addEventListener('click',event=>{const link=event.target.closest('a[data-scene-link]');if(!link)return;const target=cards.findIndex(card=>'#'+card.id===link.getAttribute('href'));if(target<0)return;event.preventDefault();move(target,link,true,true);});
    window.addEventListener('popstate',()=>{const target=Math.max(0,cards.findIndex(card=>card.id===location.hash.slice(1)));move(target,null,false,false);});
  }
  function wireContact(data){
    const snippet=document.getElementById('contact-snippet');
    if(snippet)snippet.textContent=[data.identity.name,data.identity.role,'e.sawtelle358@gmail.com','https://www.linkedin.com/in/eric-sawtelle-0b021226b/','https://es-3581100.github.io/llm-evaluation-portfolio/resume/Eric_Sawtelle.pdf'].join('\n');
    const copy=document.querySelector('[data-copy-contact]');
    if(copy&&snippet)copy.addEventListener('click',async()=>{const value=snippet.textContent;try{await navigator.clipboard.writeText(value);}catch(_){const ta=document.createElement('textarea');ta.value=value;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();}copy.dataset.copied='true';copy.textContent='Copied';window.setTimeout(()=>{copy.dataset.copied='false';copy.textContent='Copy snippet';},1400);});
    const dialog=document.getElementById('resume-dialog'),open=document.querySelector('[data-resume-open]');
    if(open&&dialog)open.addEventListener('click',()=>{if(typeof dialog.showModal==='function')dialog.showModal();else window.open('resume/Eric_Sawtelle.pdf','_blank','noopener');});
    if(dialog)dialog.querySelectorAll('[data-resume-choice]').forEach(a=>a.addEventListener('click',()=>window.setTimeout(()=>dialog.close(),0)));
    const referenceDialog=document.getElementById('reference-dialog'),referenceOpen=document.querySelector('[data-reference-open]');
    if(referenceOpen&&referenceDialog)referenceOpen.addEventListener('click',()=>{if(typeof referenceDialog.showModal==='function')referenceDialog.showModal();else location.href='mailto:e.sawtelle358@gmail.com?subject=Reference%20request%20for%20Eric%20Sawtelle';});
    if(referenceDialog&&location.hash==='#reference'&&typeof referenceDialog.showModal==='function')referenceDialog.showModal();
  }
  const root=body.dataset.root||((page==='work')?'../':'');
  const slugify=s=>String(s||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
  async function buildSearchIndex(data){
    const entries=data.projects.map(p=>({source:'Work',title:p.title,body:[p.summary,p.type,p.signal,...(p.tags||[])].join(' '),href:root+'projects/index.html#project-'+p.id}));
    async function getDoc(path){try{const res=await fetch(root+path);if(!res.ok)return null;return new DOMParser().parseFromString(await res.text(),'text/html');}catch(_){return null;}}
    const [cases,skills]=await Promise.all([getDoc('case-studies.html'),getDoc('skills.html')]);
    if(cases)[...cases.querySelectorAll('article.project-card')].forEach(card=>{const titleLink=card.querySelector('h2 a,h3 a');if(!titleLink)return;entries.push({source:'Case study',title:titleLink.textContent.trim(),body:card.textContent.replace(/\s+/g,' ').trim(),href:titleLink.getAttribute('href')||root+'case-studies.html'});});
    if(skills)[...skills.querySelectorAll('h2[id]')].forEach(h=>{const next=h.nextElementSibling;entries.push({source:'Skill',title:h.textContent.trim(),body:(next?next.textContent:'').replace(/\s+/g,' ').trim(),href:root+'skills.html#'+h.id});});
    if(data.rendered_gallery)entries.push({source:'Appendix',title:data.rendered_gallery.title,body:[data.rendered_gallery.intro,data.rendered_gallery.coda,...data.rendered_gallery.entries.map(x=>x.descriptor+' '+x.medium)].join(' '),href:root+'about.html#rendered-systems-gallery'});
    entries.push(
      {source:'Contact',title:'Contact Eric Sawtelle',body:'contact email collaboration recruiting hiring github linkedin resume work index Eric Sawtelle e.sawtelle358@gmail.com',href:root+'contact.html#contact-card-title'},
      {source:'Contact',title:'Reference available on request',body:'reference references professional reference available on request request a reference email Eric Sawtelle',href:root+'contact.html#reference'},
      {source:'Contact',title:'Resume',body:'resume cv curriculum vitae pdf view download out of date preserved artifact',href:root+'contact.html#contact-card-title'}
    );
    return entries;
  }
  const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  function searchEntries(entries,q,limit=50){
    const query=norm(q),tokens=query.split(/\s+/).filter(Boolean);
    if(!tokens.length)return[];
    return entries.map(entry=>{const title=norm(entry.title),bodyText=norm(entry.body),hay=title+' '+bodyText;if(!tokens.every(t=>hay.includes(t)))return null;let score=0;if(title===query)score+=120;if(title.startsWith(query))score+=70;if(title.includes(query))score+=45;tokens.forEach(t=>{if(title.includes(t))score+=18;if(bodyText.includes(t))score+=4;});return{...entry,score};}).filter(Boolean).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)).slice(0,limit);
  }
  function suggestionHtml(item){return `<a class="search-suggestion" href="${esc(item.href)}"><span><b>${esc(item.title)}</b><small>${esc(item.source)}</small></span><i aria-hidden="true">↗</i></a>`;}
  function wireSearchInputs(entries){
    document.querySelectorAll('[data-search-form]').forEach(form=>{
      const input=form.querySelector('[data-search-input]'),box=form.querySelector('[data-search-suggestions]');
      if(!input||!box)return;
      const draw=()=>{const q=input.value.trim();if(q.length<2){box.hidden=true;box.innerHTML='';return;}const results=searchEntries(entries,q,6);box.innerHTML=results.length?results.map(suggestionHtml).join(''):'<div class="search-empty">No live matches yet.</div>';box.hidden=false;};
      input.addEventListener('input',draw);
      input.addEventListener('keydown',event=>{if(event.key==='Escape'){box.hidden=true;box.innerHTML='';}});
      form.addEventListener('submit',event=>{if(!input.value.trim())event.preventDefault();});
      document.addEventListener('click',event=>{if(!form.contains(event.target))box.hidden=true;});
    });
  }
  function renderSearchResults(entries){
    const input=document.querySelector('[data-search-input]'),list=document.getElementById('search-results'),meta=document.getElementById('search-result-meta');
    if(!list||!meta)return;
    const q=new URLSearchParams(location.search).get('q')||'';
    if(input)input.value=q;
    const results=searchEntries(entries,q,80);
    meta.textContent=q?(results.length+' result'+(results.length===1?'':'s')+' for “'+q+'”'):'Enter a search term.';
    list.innerHTML=q?(results.length?results.map((item,i)=>`<a class="search-result" href="${esc(item.href)}"><span class="search-result-no">${String(i+1).padStart(2,'0')}</span><span><small>${esc(item.source)}</small><strong>${esc(item.title)}</strong><em>${esc(String(item.body||'').slice(0,190))}</em></span><i aria-hidden="true">↗</i></a>`).join(''):'<div class="search-no-results">No matches. Try a project name, skill, research term, “contact”, “resume”, or “reference”.</div>'):'';
    const back=document.querySelector('[data-search-back]');
    if(back)back.addEventListener('click',event=>{if(document.referrer&&new URL(document.referrer).origin===location.origin){event.preventDefault();history.back();}});
  }
  async function initSearch(data){const entries=await buildSearchIndex(data);wireSearchInputs(entries);if(page==='search')renderSearchResults(entries);}
  Promise.all([fetch(dataUrl).then(r=>{if(!r.ok)throw new Error('portfolio data '+r.status);return r.json()}),fetch(resumeUrl).then(r=>r.ok?r.json():null)]).then(([data,resume])=>{if(page==='home')renderHome(data);if(page==='work')renderWork(data);if(page==='about'){renderAbout(data);renderRenderedGallery(data);wireAboutScenes();}if(page==='contact')wireContact(data);if(page==='work'||page==='search')initSearch(data);if(resume)renderResume(resume);document.documentElement.classList.add('data-ready');}).catch(err=>{document.querySelectorAll('[data-dynamic]').forEach(el=>el.innerHTML=`<div class="error-state">The portfolio data could not be loaded. Static navigation and project links remain available. ${esc(err.message)}</div>`);});
})();
