/* VERTEX — dependency-free interactions */
document.addEventListener("DOMContentLoaded",()=>{nav();counters();tabs();modals();forms()});

function nav(){
  const b=document.querySelector("#menu"),n=document.querySelector("#nav");
  if(!b||!n)return;
  const links=[...n.querySelectorAll("a")];
  b.setAttribute("aria-expanded","false");
  b.setAttribute("aria-controls","nav");
  b.setAttribute("aria-label","Open menu");
  const close=()=>{
    n.classList.remove("open");
    b.classList.remove("open");
    b.setAttribute("aria-expanded","false");
    b.setAttribute("aria-label","Open menu");
  };
  b.onclick=()=>{
    const o=n.classList.toggle("open");
    b.classList.toggle("open",o);
    b.setAttribute("aria-expanded",String(o));
    b.setAttribute("aria-label",o?"Close menu":"Open menu");
    if(o&&links.length)links[0].focus();
  };
  links.forEach(a=>a.onclick=()=>{close()});
  n.addEventListener("keydown",e=>{
    if(!n.classList.contains("open"))return;
    if(e.key==="Escape"){
      e.preventDefault();
      close();
      b.focus();
      return;
    }
    if(e.key!=="Tab"||!links.length)return;
    const first=links[0],last=links[links.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  });
}

function counters(){
  const els=[...document.querySelectorAll("[data-count]")];
  if(!els.length)return;
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,target=+el.dataset.count;
    if(reduced){el.textContent=target;io.unobserve(el);return}
    const start=performance.now();
    const run=t=>{
      const p=Math.min((t-start)/900,1);
      el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));
      if(p<1)requestAnimationFrame(run);
    };
    requestAnimationFrame(run);io.unobserve(el);
  }),{threshold:.4});
  els.forEach(e=>io.observe(e));
}

function tabs(){
  const bs=[...document.querySelectorAll("#tabs button")],tabsEl=document.querySelector("#tabs"),n=document.querySelector("#stepNum"),t=document.querySelector("#stepTitle"),c=document.querySelector("#stepCopy");
  if(!bs.length)return;
  tabsEl?.setAttribute("role","tablist");
  const d=[["STEP 01","Discover the real problem.","We align on goals, audiences and constraints, then turn research into a shared understanding of what success needs to look like."],["STEP 02","Define the opportunity.","We shape priorities, architecture and a practical roadmap so everyone knows what we're making and why."],["STEP 03","Design the experience.","We prototype, test and refine the visual and interaction system until the product feels clear, useful and unmistakably yours."],["STEP 04","Build and deliver.","Our developers turn the system into a fast, accessible experience, then QA, launch and measure the result."]];
  bs.forEach((b,i)=>{
    b.setAttribute("aria-selected",String(i===0));
    b.setAttribute("role","tab");
    b.setAttribute("tabindex",i===0?"0":"-1");
    b.onclick=()=>{bs.forEach(x=>{x.classList.remove("active");x.setAttribute("aria-selected","false");x.setAttribute("tabindex","-1")});b.classList.add("active");b.setAttribute("aria-selected","true");b.setAttribute("tabindex","0");[n.textContent,t.textContent,c.textContent]=d[i]};
  });
}

function modals(){
  const m=document.querySelector("#modal");
  if(!m)return;
  const title=document.querySelector("#mTitle"),k=document.querySelector("#mKicker"),copy=document.querySelector("#mCopy"),metric=document.querySelector("#mMetric"),closeBtn=document.querySelector("#close");
  if(!closeBtn)return;
  const focusables=()=>[...m.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])')];
  let trigger=null;
  const close=()=>{
    m.setAttribute("aria-hidden","true");
    const returnTarget=trigger||window.vertexModalTrigger;
    trigger=null;
    window.vertexModalTrigger=null;
    returnTarget?.focus();
  };
  const open=(card)=>{
    trigger=card;
    window.vertexModalTrigger=card;
    if(title)title.textContent=card.dataset.title||"";
    if(k)k.textContent=card.dataset.kicker||card.dataset.role||"";
    if(copy)copy.textContent=card.dataset.copy||"";
    if(metric){metric.textContent=card.dataset.metric||"";metric.style.display=card.dataset.metric?"block":"none"}
    m.setAttribute("aria-hidden","false");
    m.setAttribute("role","dialog");
    m.setAttribute("aria-modal","true");
    if(title){title.id=title.id||"mTitle";m.setAttribute("aria-labelledby",title.id)}
    closeBtn.focus();
  };
  document.querySelectorAll("[data-modal]").forEach(card=>{
    const label=card.dataset.title||card.dataset.role||"Open details";
    card.setAttribute("tabindex","0");
    card.setAttribute("role","button");
    card.setAttribute("aria-label",`Open details for ${label}`);
    card.onclick=()=>open(card);
    card.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(card)}};
  });
  closeBtn.onclick=close;
  m.querySelector(".backdrop")?.addEventListener("click",close);
  m.addEventListener("keydown",e=>{
    if(m.getAttribute("aria-hidden")!=="false")return;
    if(e.key==="Escape"){e.preventDefault();close();return}
    if(e.key!=="Tab")return;
    const items=focusables();
    if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  });
}

function forms(){
  const f=document.querySelector("#form"),m=document.querySelector("#modal");
  if(!f||!m)return;
  f.onsubmit=e=>{
    e.preventDefault();
    if(!f.checkValidity()){f.reportValidity();return}
    window.vertexModalTrigger=f.querySelector('button[type="submit"]');
    m.setAttribute("aria-hidden","false");
    m.setAttribute("role","dialog");
    m.setAttribute("aria-modal","true");
    const heading=m.querySelector("h2");
    if(heading){heading.id=heading.id||"mTitle";m.setAttribute("aria-labelledby",heading.id)}
    const close=document.querySelector("#close");
    close?.focus();
    f.reset();
  };
}
