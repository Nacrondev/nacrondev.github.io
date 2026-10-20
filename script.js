const DATA = {
  name: "Nacron",
  fullName: "Gabriel Santos Oliveira",
  nick: "Tue",
  title: "<span class=\"hi\">Oi, eu sou o</span><br><em>Nacron</em>",
  klass: "Classe: Full-Stack · Alinhamento: caótico bom",
  bio: "Faço parte do time de devs da <a href='https://ggstore.dev.br/' target='_blank' rel='noopener'><b>GGSTORE</b></a> e passo os dias criando coisas que deixam qualquer projeto mais vivo: <b>música dentro do jogo</b>, <b>som 3D</b> e <b>APIs</b>. Fora do código eu jogo, monto teclado, fuço em periférico e tiro ideia maluca do papel.",
  level: 27,
  xp: 68,
  stats: [["LUA",9,"Scripts em Lua pra FiveM"],["API",8,"APIs e integrações"],["NUI",7,"Interfaces dentro do jogo"],["SOM",8,"Áudio e som 3D"],["INS",10,"Ideias malucas"]],
  projects: [
    {name:"GGFY",el:"water",cost:7,type:"Player de música",rar:"Lendária",flavor:"Um player de música pro <b>FiveM</b>. Dá pra ouvir, montar playlist e controlar tudo sem sair do jogo.",atk:"LUA",def:"NUI",stack:["Lua","JavaScript","NUI"],bullets:["Fila e playlist por jogador","Interface NUI integrada ao jogo","Toca direto do link, sem embed"],link:"#"},
    {name:"GGSound",el:"arcane",cost:8,type:"Áudio 3D",rar:"Lendária",flavor:"Sistema de som <b>3D</b> pro FiveM. A música toca num ponto do mapa e o volume muda conforme você chega perto.",atk:"3D",def:"SOM",stack:["Lua","Web Audio","API"],bullets:["Som posicional no mundo do jogo","Volume pela distância do jogador","Sincronizado entre quem está por perto"],link:"#"},
    {name:"YT Direct",el:"fire",cost:5,type:"API REST",rar:"Épica",flavor:"Uma API que procura músicas no <b>YouTube</b> pelo nome e devolve o link do áudio pra tocar direto.",atk:"GET",def:"MP3",stack:["Node.js","REST"],bullets:["Pesquisa pelo nome da música","Retorna o link direto do áudio","Resposta em JSON pra qualquer script"],link:"#"},
    {name:"???",el:"metal",cost:"?",type:"Ideia maluca",rar:"Em forja",flavor:"A próxima carta ainda tá na bancada. Spoiler: <b>vai ser estranha</b>.",atk:"?",def:"?",stack:["Em breve"],bullets:["Rascunho no caderno","Protótipo quebrando","Logo logo no deck"],link:"#"}
  ],
  items: [
    ["Lua","Lua","Scripting de runtime, eventos e lógica client/server.",9,"gold"],
    ["JS","JavaScript","Front, NUI e serviços em Node.",8,"arcane"],
    ["Nd","Node.js","Backend das APIs e parsing de stream.",8,"arcane"],
    ["API","REST","Design de rotas, JSON e integração entre sistemas.",8,"arcane"],
    ["WA","Web Audio","Grafo de áudio, PannerNode e mixagem em tempo real.",7,"water"],
    ["UI","HTML/CSS","Interfaces leves que rodam dentro de CEF.",8,"water"],
    ["5M","FiveM","Natives, resources e net events.",9,"gold"],
    ["Gt","Git","Versionando antes de quebrar.",7,"metal"]
  ],
  side: [
    ["Jogar","Games de todo tipo. Metade diversão, metade pesquisa.","fire"],
    ["Montar teclados","Switch, keycap, lube. O barulho certo importa.","gold"],
    ["Periféricos","Mouse, headset, setup. Sempre tem upgrade.","water"],
    ["Ideias malucas","Se parece impossível, já virou projeto.","arcane"]
  ],
  quests: [
    {now:true,tag:"Quest principal",c:"gold",icon:"sword",t:"Dev no time GGSTORE",at:"GGSTORE",url:"https://ggstore.dev.br/",d:"Desenvolvo scripts, APIs e sistemas de áudio pra servidores FiveM.",loot:["GGFY","GGSound"]},
    {tag:"Conquista",c:"arcane",icon:"shield",t:"Certificado Profissional de Segurança Cibernética",at:"Google",d:"Fundamentos de segurança, redes, Linux, SQL e Python.",loot:["Segurança"]},
    {tag:"Side quest",c:"water",icon:"scroll",t:"Projetos próprios",at:"independente",d:"APIs e ferramentas de mídia feitas por conta própria.",loot:["YT Direct"]},
    {tag:"Treinamento",c:"metal",icon:"book",t:"Informática Avançada e Processamento de Dados",at:"cursos",d:"A base que veio antes de tudo.",loot:[]}
  ],
  partyText: "Tem um projeto, uma API ou uma ideia maluca pra tirar do papel? Me chama.",
  email: "nacron14@gmail.com",
  links: [["GGSTORE","https://ggstore.dev.br/"],["GitHub","https://github.com/Nacrondev"]]
};

const EL = {fire:"Fogo",water:"Água",earth:"Terra",arcane:"Arcano",metal:"Metal"};
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function rng(seed){
  let h = 1779033703 ^ seed.length;
  for (const ch of seed){h = Math.imul(h ^ ch.charCodeAt(0),3432918353);h = h << 13 | h >>> 19}
  return () => {h = Math.imul(h ^ h >>> 16,2246822507);h = Math.imul(h ^ h >>> 13,3266489909);return ((h ^= h >>> 16) >>> 0) / 4294967296};
}
function sprite(canvas,seed,color){
  const W = 10,H = 12,r = rng(seed),ctx = canvas.getContext("2d");
  canvas.width = W;canvas.height = H;
  const base = getComputedStyle(document.documentElement).getPropertyValue(color).trim() || color;
  const grid = [];
  for (let y=0;y<H;y++){grid[y]=[];for (let x=0;x<W/2;x++){const edge = y<1||y>H-2;grid[y][x] = !edge && r() > .48 - (x/W)*.4}}
  for (let y=0;y<H;y++)for (let x=0;x<W/2;x++){
    if (!grid[y][x]) continue;
    const shade = r() > .82 ? "#ebe6d8" : r() > .75 ? "#0b0c11" : base;
    ctx.fillStyle = shade;
    ctx.fillRect(x,y,1,1);
    ctx.fillRect(W-1-x,y,1,1);
  }
}

function renderPlayer(){
  const p = $("#player");
  p.style.setProperty("--c","var(--gold)");
  p.innerHTML = `${["tl","tr","bl","br"].map(k=>`<i class="cn ${k}">${CORNER}</i>`).join("")}<div class="face-in">
    <div class="top"><h3>${esc(DATA.name)}</h3><span class="cost">${DATA.level}</span></div>
    <div class="art"><canvas class="scene"></canvas><canvas class="mob"></canvas></div>
    <div class="typeline"><span><i class="emb">${svgPix(["X..X..X","XX.X.XX","XXXXXXX","XYXYXYX","XXXXXXX"],{X:"var(--gold)",Y:"#fff6dc"})}</i><span id="regname"></span></span><span class="rar"><i class="gem" style="--g:var(--gold)"></i>Herói</span></div>
    <div class="stats">${DATA.stats.map(([k,v,t])=>`<div class="stat" title="${esc(t)}"><span>${k}</span><span class="b"><i style="--v:${v*10}%"></i></span><span>${v}</span></div>`).join("")}</div>
    <div class="foot"><span class="set">NCR · 001/${String(DATA.projects.length + 1).padStart(3,"0")} · 1ª ed.</span><span class="pt">${DATA.level}/${DATA.xp}</span></div>
  </div>`;
  sprite(p.querySelector("canvas.mob"),DATA.name,"--gold");
  scene(p.querySelector("canvas.scene"),"gold",DATA.name);
}

function renderSide(){
  $("#sideGrid").innerHTML = DATA.side.map(([t,d,c],i)=>`<div class="sq" style="--c:var(--${c});--n:${i};--r:${[1.6,-2.2,2.4,-1.4][i % 4]}deg;--dl:-${(i * .9).toFixed(1)}s"><canvas data-seed="${esc(t)}" data-c="--${c}"></canvas><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join("");
  $("#sideGrid").querySelectorAll("canvas").forEach(c=>sprite(c,c.dataset.seed,c.dataset.c));
}

function scramble(el,text){
  if (matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent = text;return}
  const pool = "!<>-_\\/[]{}=+*^?#01アカサタナ";
  const start = performance.now(),dur = 1400;
  el.classList.add("typing");
  (function tick(now){
    const p = Math.min(1,(now - start) / dur),done = Math.floor(p * text.length);
    el.textContent = [...text].map((c,i)=>i < done || c === " " ? c : i < done + 6 ? pool[Math.random() * pool.length | 0] : "").join("");
    if (p < 1) requestAnimationFrame(tick); else {el.textContent = text;el.classList.remove("typing")}
  })(start);
}

function renderHero(){
  $("#hud-name").textContent = DATA.name;
  $("#hud-lv").textContent = "LV " + DATA.level;
  $("#hud-xp").style.setProperty("--v",DATA.xp + "%");
  $("#hud-xpt").textContent = DATA.xp + "%";
  $("#hero-class").textContent = DATA.klass;
  $("#hero-title").innerHTML = DATA.title;
  const em = $("#hero-title em");
  em.setAttribute("aria-label",em.textContent);
  em.innerHTML = [...em.textContent].map((c,i)=>`<span class="ch" aria-hidden="true" style="--d:${i}"><span class="sw"><span class="lt">${esc(c)}</span></span></span>`).join("");
  $("#hero-aka").innerHTML = `pros mais íntimos, <b>${esc(DATA.nick)}</b>`;
  dropLetters($("#hero-title .hi"),150,40);
  fadeWords($("#hero-bio"),1700,40);
  $("#hero-bio").innerHTML = DATA.bio;
  $("#party-text").textContent = DATA.partyText;
  $("#mail").textContent = DATA.email;
  $("#links").innerHTML = DATA.links.map(([t,u])=>`<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join("");
  $("#foot-l").textContent = `© ${new Date().getFullYear()} ${DATA.fullName} · ${DATA.name}`;
}

function svgPix(rows,pal){
  let r = "";
  rows.forEach((row,y)=>[...row].forEach((ch,x)=>{if (pal[ch]) r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" style="fill:${pal[ch]}"/>`}));
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
}
const CORNER = svgPix(["XXXXXX.","XYYYX..","XYXX...","XYX....","XX.....","X......","......."],{X:"#d9b45b",Y:"#fff3c4"});
const EMBLEM = {
  water:["...X...","..XXX..",".XXXXX.",".XYXXX.","XXYXXXX",".XXXXX.","..XXX.."],
  fire:["...X...","..XX...","..XXX.X",".XXYXXX",".XYYYX.","XXYYYXX",".XXXXX."],
  arcane:["...X...","...X...","XXXYXXX",".XYYYX.","..XXX..",".XX.XX.","X.....X"],
  metal:[".X.X.X.","XXXXXXX",".XX.XX.","XX...XX",".XX.XX.","XXXXXXX",".X.X.X."],
  earth:["...X...","..XXX..",".XXYXX.","XXYYYXX","...X...","...X...","..XXX.."]
};
const GEM = {"Lendária":"--gold","Épica":"--arcane","Rara":"--water","Comum":"--metal","Em forja":"--metal"};

function hexMix(a,b,t){
  const p = h => [1,3,5].map(i=>parseInt(h.slice(i,i + 2),16));
  const A = p(a),B = p(b);
  return "#" + A.map((v,i)=>Math.round(v + (B[i] - v) * t).toString(16).padStart(2,"0")).join("");
}

function scene(canvas,el,seed){
  const W = 40,H = 30,r = rng(seed + "cena"),ctx = canvas.getContext("2d");
  canvas.width = W;canvas.height = H;
  const c = getComputedStyle(document.documentElement).getPropertyValue("--" + el).trim();
  const dot = (x,y,col) => {ctx.fillStyle = col;ctx.fillRect(x | 0,y | 0,1,1)};
  if (el === "gold"){
    const n = ctx.createLinearGradient(0,0,0,H);
    n.addColorStop(0,"#060a17");
    n.addColorStop(1,"#1a3a48");
    ctx.fillStyle = n;
    ctx.fillRect(0,0,W,H);
    for (let i=0;i<14;i++) dot(r() * W,r() * H * .6,r() > .7 ? "#f1d58e" : "#dfe7ffaa");
    for (let y=-3;y<=3;y++) for (let x=-3;x<=3;x++) if (x * x + y * y <= 10) dot(33 + x,6 + y,x * x + y * y > 6 ? "#d8cfa8" : "#efe6c4");
    ctx.fillStyle = "#0f1e30";
    for (let x=0;x<W;x++) ctx.fillRect(x,21 + Math.round(Math.sin(x * .25) * 1.5),1,H);
    [[6,14,4],[11,10,5],[17,14,4],[10,7,2]].forEach(([x,y,w])=>{ctx.fillRect(x,y,w,H);for (let i=0;i<w;i+=2) ctx.fillRect(x + i,y - 1,1,1)});
    [[7,17],[13,13],[12,17],[18,17]].forEach(([x,y])=>dot(x,y,"#f1c560"));
    ctx.fillStyle = "#0a1522";
    ctx.fillRect(0,27,W,3);
    return;
  }
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,hexMix(c,"#0b0c11",.85));
  sky.addColorStop(1,hexMix(c,"#0b0c11",.55));
  ctx.fillStyle = sky;
  ctx.fillRect(0,0,W,H);
  for (let i=0;i<9;i++) dot(r() * W,r() * H * .55,r() > .5 ? "#ebe6d855" : "#ebe6d899");
  if (el === "water"){
    ctx.fillStyle = hexMix(c,"#0b0c11",.5);
    ctx.fillRect(0,19,W,H - 19);
    [19,22,25,28].forEach((y,k)=>{for (let x=(k * 3) % 6;x<W;x+=6){dot(x,y,hexMix(c,"#ffffff",.35));dot(x + 1,y,hexMix(c,"#ffffff",.35));dot(x + 2,y + 1,hexMix(c,"#ffffff",.15))}});
    [[6,8],[33,5],[28,13]].forEach(([x,y])=>{dot(x,y - 1,"#ebe6d8aa");dot(x - 1,y,"#ebe6d8aa");dot(x + 1,y,"#ebe6d8aa");dot(x,y + 1,"#ebe6d8aa")});
  } else if (el === "fire"){
    ctx.fillStyle = "#2a0f08";
    ctx.fillRect(0,24,W,H - 24);
    for (let i=0;i<18;i++) dot(r() * W,24 + r() * 6,r() > .5 ? "#ffb347" : "#e0623c");
    [[4,24],[35,24],[19,24]].forEach(([x,y],k)=>{
      const f = k === 2 ? ["..y..",".yoy.","yooo.",".ooo."] : [".y.","yoy","ooo"];
      f.forEach((row,j)=>[...row].forEach((ch,i)=>{if (ch !== ".") dot(x + i - (row.length >> 1),y - f.length + j,ch === "y" ? "#ffe9a8" : "#e0623c")}));
    });
  } else if (el === "arcane"){
    const ring = (rad,step,col) => {for (let a=0;a<Math.PI * 2;a+=step) dot(20 + Math.cos(a) * rad,16 + Math.sin(a) * rad * .8,col)};
    ring(12,.09,hexMix(c,"#ffffff",.25));
    ring(8,.22,hexMix(c,"#ffffff",.45));
    for (let k=0;k<6;k++){const a = k / 6 * Math.PI * 2;dot(20 + Math.cos(a) * 10,16 + Math.sin(a) * 8,"#e9d5ff")}
    for (let i=0;i<8;i++) dot(r() * W,r() * H,"#e9d5ffaa");
  } else if (el === "metal"){
    const gear = (cx,cy,rad,col) => {
      for (let a=0;a<Math.PI * 2;a+=.12) dot(cx + Math.cos(a) * rad,cy + Math.sin(a) * rad,col);
      for (let k=0;k<8;k++){const a = k / 8 * Math.PI * 2;dot(cx + Math.cos(a) * (rad + 1),cy + Math.sin(a) * (rad + 1),col);dot(cx + Math.cos(a) * (rad + 2),cy + Math.sin(a) * (rad + 2),col)}
      dot(cx,cy,col);
    };
    gear(8,22,5,"#5a5f6e");
    gear(32,9,4,"#4a4e5a");
    ctx.fillStyle = "#1a1c22";
    ctx.fillRect(0,27,W,3);
    for (let i=0;i<6;i++) dot(r() * W,26 + r() * 4,"#ffe9a8");
  } else {
    ctx.fillStyle = hexMix(c,"#0b0c11",.45);
    for (let x=0;x<W;x++) ctx.fillRect(x,22 + Math.round(Math.sin(x * .3) * 2),1,H);
  }
}

function renderDeck(list){
  const g = $("#deckGrid"),total = String(DATA.projects.length + 1).padStart(3,"0");
  g.innerHTML = list.map((p,i)=>`<div class="slot deal" data-el="${p.el}" data-rar="${esc(p.rar)}" style="--i:${i}">
    <button class="flip" type="button" aria-label="Virar carta ${esc(p.name)}">
      <div class="tcg holo tilt front" style="--c:var(--${p.el})">${["tl","tr","bl","br"].map(k=>`<i class="cn ${k}">${CORNER}</i>`).join("")}<div class="face-in">
        <div class="top"><h3>${esc(p.name)}</h3><span class="cost">${p.cost}</span></div>
        <div class="art"><canvas class="scene" data-el="${p.el}" data-seed="${esc(p.name)}"></canvas><canvas class="mob" data-seed="${esc(p.name)}" data-c="--${p.el}"></canvas>${[0,1,2,3,4,5].map(k=>`<span class="fx" style="--k:${k}"></span>`).join("")}</div>
        <div class="typeline"><span><i class="emb">${svgPix(EMBLEM[p.el],{X:`var(--${p.el})`,Y:"#fff6dc"})}</i>${esc(p.type)}</span><span class="rar"><i class="gem" style="--g:var(${GEM[p.rar] || "--metal"})"></i>${esc(p.rar)}</span></div>
        <div class="flavor">${p.flavor}</div>
        <div class="foot"><span class="set">NCR · ${String(DATA.projects.indexOf(p) + 2).padStart(3,"0")}/${total} · 1ª ed.</span><span class="pt">${esc(p.atk)}/${esc(p.def)}</span></div>
      </div></div>
      <div class="tcg back" style="--c:var(--${p.el})">${["tl","tr","bl","br"].map(k=>`<i class="cn ${k}">${CORNER}</i>`).join("")}<div class="face-in">
        <div class="top"><h3>${esc(p.name)}</h3><span class="cost">${p.cost}</span></div>
        <div class="details">
          <span class="label">Efeitos</span>
          <ul>${p.bullets.map(b=>`<li>${esc(b)}</li>`).join("")}</ul>
          <span class="label">Requer</span>
          <div class="tags">${p.stack.map(s=>`<span>${esc(s)}</span>`).join("")}</div>
        </div>
        <div class="foot"><a href="${esc(p.link)}" target="_blank" rel="noopener">Ver projeto ↗</a><span>↺ virar</span></div>
      </div></div>
    </button>
  </div>`).join("");
  g.querySelectorAll("canvas.mob").forEach(c=>sprite(c,c.dataset.seed,c.dataset.c));
  g.querySelectorAll("canvas.scene").forEach(c=>scene(c,c.dataset.el,c.dataset.seed));
  g.querySelectorAll(".flip").forEach(b=>b.addEventListener("click",e=>{
    if (e.target.closest("a")) return;
    b.classList.toggle("on");
    const sl = b.closest(".slot"),col = getComputedStyle(document.documentElement).getPropertyValue("--" + sl.dataset.el).trim();
    sparkle(e.pageX || b.getBoundingClientRect().left + scrollX + b.offsetWidth / 2,e.pageY || b.getBoundingClientRect().top + scrollY + b.offsetHeight / 2,16,[col,"#d9b45b","#ebe6d8"]);
    if (b.classList.contains("on") && !b.dataset.xp){b.dataset.xp = 1;gainXP(10,e.clientX || innerWidth / 2,e.clientY || innerHeight / 2)}
  }));
  bindTilt();
}

function renderFilters(){
  const els = ["all",...new Set(DATA.projects.map(p=>p.el))];
  $("#filters").innerHTML = els.map(e=>`<button class="chip" type="button" data-f="${e}" aria-pressed="${e==="all"}" ${e!=="all"?`style="--c:var(--${e})"`:""}>${e!=="all"?"<i></i>":""}${e==="all"?"Todas":EL[e]}</button>`).join("") + `<button class="chip" type="button" id="shuffle">Embaralhar</button>`;
  $("#filters").addEventListener("click",e=>{
    const b = e.target.closest("button");
    if (!b) return;
    if (b.id === "shuffle"){
      const a = [...DATA.projects];
      for (let i=a.length-1;i>0;i--){const j = Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
      renderDeck(a);
      applyFilter(document.querySelector('.chip[aria-pressed="true"]').dataset.f);
      return;
    }
    document.querySelectorAll(".chip[data-f]").forEach(c=>c.setAttribute("aria-pressed",c===b));
    applyFilter(b.dataset.f);
  });
}
function applyFilter(f){
  document.querySelectorAll(".slot").forEach(s=>s.classList.toggle("gone",f!=="all"&&s.dataset.el!==f));
}

function renderInv(){
  const tilt = [-2.5,1.8,-1.2,2.6,-1.8,1.1,-2.8,2.1];
  $("#inv").innerHTML = DATA.items.map(([ab,n,d,lv,r],i)=>`<div class="loot${r==="gold"?" lg":""}" tabindex="0" style="--c:var(--${r});--r:${tilt[i % tilt.length]}deg;--dl:-${(i * .7).toFixed(1)}s;--s:${(.86 + lv * .03).toFixed(2)}"><canvas data-seed="${esc(n)}" data-c="--${r}"></canvas><span class="txt"><span class="nm">${esc(n)}</span><span class="pips" aria-label="nível ${lv} de 10">${Array.from({length:10},(_,k)=>`<i${k < lv ? ' class="on"' : ""}></i>`).join("")}</span></span><span class="tip"><b>${esc(n)} · nível ${lv}</b>${esc(d)}</span></div>`).join("");
  $("#inv").querySelectorAll("canvas").forEach(c=>sprite(c,c.dataset.seed,c.dataset.c));
}

const QICON = {
  sword:["......X",".....X.","....X..","X..X...",".XX....",".XX....","X..X..."],
  shield:["XXXXXXX","XYYYYYX","XYYXYYX","XYXXXYX",".XYXYX.","..XYX..","...X..."],
  scroll:[".XXXXX.","XYYYYYX",".XYYYX.",".XYYYX.",".XYYYX.","XYYYYYX",".XXXXX."],
  book:["XXX.XXX","XYX.XYX","XYX.XYX","XYX.XYX","XYXXXYX","XXX.XXX","......."]
};
function renderQuests(){
  $("#questList").innerHTML = DATA.quests.map(q=>`<li class="q ${q.now ? "now" : "done"}" style="--c:var(--${q.c})">
    <span class="node">${svgPix(QICON[q.icon],{X:`var(--${q.c})`,Y:"#fff6dc"})}</span>
    <div class="qcard">
      <div class="qhead"><span class="qtag">${esc(q.tag)}</span><span class="qstate">${q.now ? "Em andamento" : "Concluída"}</span></div>
      <h3>${esc(q.t)}</h3>
      <span class="qat">@ ${q.url ? `<a href="${esc(q.url)}" target="_blank" rel="noopener">${esc(q.at)}</a>` : esc(q.at)}</span>
      <p>${esc(q.d)}</p>
      ${q.now ? `<div class="qbar"><i></i></div>` : ""}
      ${q.loot.length ? `<div class="qloot"><span>Recompensa</span>${q.loot.map(l=>`<b>${esc(l)}</b>`).join("")}</div>` : ""}
    </div>
  </li>`).join("");
}

const fine = matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches;
function bindTilt(){
  if (!fine) return;
  document.querySelectorAll(".tilt:not([data-b])").forEach(el=>{
    el.dataset.b = 1;
    const host = el.closest(".flip") || el;
    host.addEventListener("pointermove",e=>{
      if (host.classList.contains("on")) return;
      const r = el.getBoundingClientRect(),x = (e.clientX-r.left)/r.width,y = (e.clientY-r.top)/r.height;
      el.classList.add("live");
      el.style.setProperty("--ry",(x-.5)*18+"deg");
      el.style.setProperty("--rx",(.5-y)*18+"deg");
      el.style.setProperty("--mx",x*100+"%");
      el.style.setProperty("--my",y*100+"%");
      el.style.setProperty("--px",(x-.5).toFixed(3));
      el.style.setProperty("--py",(y-.5).toFixed(3));
    });
    host.addEventListener("pointerleave",()=>{
      el.classList.remove("live");
      el.style.setProperty("--rx","0deg");
      el.style.setProperty("--ry","0deg");
      el.style.setProperty("--px","0");
      el.style.setProperty("--py","0");
    });
  });
}

let tt;
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(tt);
  tt = setTimeout(()=>t.classList.remove("show"),2600);
}

$("#copy").addEventListener("click",()=>{
  const sel = () => {const r = document.createRange();r.selectNodeContents($("#mail"));const s = getSelection();s.removeAllRanges();s.addRange(r);toast("> e-mail selecionado, Ctrl+C pra copiar")};
  try {
    navigator.clipboard.writeText(DATA.email).then(()=>toast("> e-mail copiado pro inventário"),sel);
  } catch(e){sel()}
});

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let kp = 0;
addEventListener("keydown",e=>{
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  kp = k === KONAMI[kp] ? kp + 1 : (k === KONAMI[0] ? 1 : 0);
  if (kp === KONAMI.length){
    kp = 0;
    const on = document.documentElement.classList.toggle("legendary");
    toast(on ? "★ Modo lendário desbloqueado. +30 vidas" : "Modo lendário desligado");
  }
});

function pop(text,x,y,big){
  const el = document.createElement("span");
  el.className = "xpop" + (big ? " big" : "");
  el.textContent = text;
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  el.addEventListener("animationend",()=>el.remove());
}

function gainXP(n,x,y){
  pop(`+${n} XP`,x,y);
  DATA.xp += n;
  if (DATA.xp >= 100){
    DATA.xp -= 100;
    DATA.level++;
    $("#hud-lv").textContent = "LV " + DATA.level;
    document.querySelector(".hud").classList.remove("lvup");
    void document.querySelector(".hud").offsetWidth;
    document.querySelector(".hud").classList.add("lvup");
    setTimeout(()=>pop("LEVEL UP!",innerWidth / 2,innerHeight / 2,true),250);
    toast(`★ Level up! Agora LV ${DATA.level}`);
  }
  $("#hud-xp").style.setProperty("--v",DATA.xp + "%");
  $("#hud-xpt").textContent = DATA.xp + "%";
}

function dropLetters(el,base = 0,step = 35){
  if (el.dataset.dl) return;
  el.dataset.dl = 1;
  el.setAttribute("aria-label",el.textContent);
  let i = 0;
  el.innerHTML = el.textContent.split(" ").map(w=>`<span class="dw" aria-hidden="true">${[...w].map(c=>`<span class="dl" style="--t:${base + step * i++}ms">${esc(c)}</span>`).join("")}</span>`).join(" ");
}

function fadeWords(el,base = 0,step = 45){
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n=>{
    if (n.nodeType === 3){
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(w=>{
        if (!w.trim()){frag.append(w);return}
        const s = document.createElement("span");
        s.className = "fw";
        s.style.setProperty("--t",base + step * i++ + "ms");
        s.textContent = w;
        frag.append(s);
      });
      n.replaceWith(frag);
    } else walk(n);
  });
  walk(el);
}

function replay(){
  document.querySelectorAll(".sec-head h2,.party h2").forEach(h=>dropLetters(h));
  const els = [$(".id"),$("#hero-bio"),$("#player"),...document.querySelectorAll(".sec-head h2,.party h2")];
  if (!("IntersectionObserver" in window)){els.forEach(el=>el.classList.add("play"));scramble($("#regname"),DATA.fullName);return}
  const io = new IntersectionObserver(es=>es.forEach(e=>{
    const el = e.target;
    if (e.isIntersecting){
      if (el.classList.contains("play")) return;
      el.classList.add("play");
      if (el.id === "player") scramble($("#regname"),DATA.fullName);
    } else el.classList.remove("play");
  }));
  els.forEach(el=>io.observe(el));
}

function reveal(){
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const io = new IntersectionObserver(es=>es.forEach(e=>{
    if (!e.isIntersecting) return;
    const el = e.target;
    io.unobserve(el);
    if (el.classList.contains("slot")){el.classList.remove("deal");void el.offsetWidth;el.classList.add("deal");return}
    el.classList.remove("pre");
    el.classList.add("rv-in");
    el.addEventListener("animationend",()=>el.classList.remove("rv-in"),{once:true});
  }),{threshold:.15});
  [".sec-head",".slot",".loot",".sq",".quests li",".party",".legend"].forEach(s=>document.querySelectorAll(s).forEach((el,i)=>{
    if (el.getBoundingClientRect().top < innerHeight * .9) return;
    if (el.classList.contains("slot")) el.classList.remove("deal");
    else {
      el.classList.add("pre");
      el.style.setProperty("--rd",(i % 10) * 60 + "ms");
    }
    io.observe(el);
  }));
}

const PAL = {B:"#4a3220",G:"#5a5f6e",o:"#3d5a2a",k:"#0b0c11",g:"#93b142",d:"#5d7a22",w:"#ebe6d8",r:"#e0623c",y:"#d9b45b",m:"#a96ddb",M:"#6c3f99",s:"#e8c9a0",b:"#7a5230"};
const GOB_TOP = ["..k.....k.....",".kgk...kgk....",".kggkkkggk....","kgggggggggk..."];
const GOB = {
  stand:[...GOB_TOP,"kgwkgggwkgk...","kgwkgggwkgk...","kgggggggggk...","kggrgggrggk...",".kgggkgggk....","..kdkkkdk.....","..kdk.kdk.....","..kk..kk......"],
  walk:[...GOB_TOP,"kgwkgggwkgk...","kgwkgggwkgk...","kgggggggggk...","kggrgggrggk...",".kgggkgggk....","..kdkkkdk.....",".kdk...kdk....",".kk.....kk...."],
  pull:[...GOB_TOP,"kgkkgggkkgk...","kgggggggggkkk.","kgggggggggggyk","kggrgggrggkkk.",".kgggkkggk....","..kdkkkdk.....",".kdk...kdk....","kk.......kk..."],
  sit:["..............","..k.....k.....",".kgk...kgk....",".kggkkkggk....","kgggggggggk...","kgkkgggkkgk...","kgggggggggk...","kggrgggrggk...",".kgggkkggk....","kdddkkkdddk...","kk.......kk...",".............."],
  carry:["y.........y...","g.k.....k.g...","gkgk...kgkg...","gkggkkkggkg...","kgggggggggk...","kgwkgggwkgk...","kgwkgggwkgk...","kggrgggrggk...",".kgggkkggk....","..kdkkkdk.....",".kdk...kdk....",".kk.....kk...."],
  carry2:["y.........y...","g.k.....k.g...","gkgk...kgkg...","gkggkkkggkg...","kgggggggggk...","kgwkgggwkgk...","kgwkgggwkgk...","kggrgggrggk...",".kgggkkggk....","..kdkkkdk.....","..kdk.kdk.....","..kk..kk......"],
  aim:[...GOB_TOP,"kgwkgggwkgk...","kgwkgggwkgkGGG","kgggggggggkyG.","kggrgggrggk...",".kgggkgggk....","..kdkkkdk.....","..kdk.kdk.....","..kk..kk......"],
  crouch:["..............","..............","..............","..k.....k.....",".kgk...kgk....",".kggkkkggk....","kgggggggggk...","kgwkgggwkgk...","kgwkgggwkgk...","kggrgggrggk...",".kdddkkdddk...","..kk...kk....."],
  throw:["..k.....k..o..",".kgk...kgk.g..",".kggkkkggkg...","kgggggggggk...","kgwkgggwkgk...","kgwkgggwkgk...","kgggggggggk...","kggrgggrggk...",".kgggkgggk....","..kdkkkdk.....","..kdk.kdk.....","..kk..kk......"],
  happy:[...GOB_TOP,"kgwkgggwkgk...","kgwkgggwkgk...","kgggggggggk...","kggrgggrggk...",".kggkkkggk....","..kdkkkdk.....","..kdk.kdk.....","..kk..kk......"]
};
const WIZ_STAND = ["......k.......",".....kmk......",".....kmmk.....","....kmymk.....","....kmmmmk....","..kkkkkkkkkk..","...kskssksk...","...kwwwwwwk.y.","..kmwwwwwwmkb.","..kmmwwwwmmkb.",".kmmmmwwmmmmkb",".kmmmmmmmmmmkb",".kmMmmmmmmMmkb","kmMmmmmmmmmMkb","kkkkkkkkkkkkkb","..kk....kk..kb"];
const WIZ = {
  stand:WIZ_STAND,
  walk:[...WIZ_STAND.slice(0,15),".kk......kk.kb"],
  cast:WIZ_STAND.map((r,i)=>r.slice(0,12) + (i === 1 ? "w" : i === 2 ? "y" : i >= 3 ? "b" : r[12]) + r.slice(13))
};
const BLUE = {g:"#3e90d8",d:"#24598a"};
const L = {
  spot:["hmm...","esse aqui","opa","isso sai?","vou levar","ninguém tá olhando","só um pouquinho","esse é meu agora","brilhante...","quanto será que vale?","peguei você","ooh, que bonito","vai ficar lindo na minha toca"],
  pull:["hnnngh!","vem!!","sai daí","força!","grrrr","uff... uff...","só mais um pouco","VEM LOGO"],
  fail:["tá colado??","pesado demais","isso é parafusado","ok, perdi","quem colou isso?","ai minhas costas","foi o vento","tava só testando","isso tem cola quente","Nacron, por quê?"],
  fix:["pera...","um pouquinho pra lá","quase...","isso","agora sim","hmm, torto ainda","perfeito... acho"],
  done:["...ninguém viu","prontinho","deixa como tava","nada aconteceu aqui","shhh","melhor que antes","*assobia*","volto mais tarde"],
  call:["AMIGOOO!","ajuda aqui!","BOB! vem cá!","preciso de reforço","socorro, é pesado!"],
  friend:["chegou o reforço","de novo isso?","deixa comigo","tô aqui!","qual a missão?","você me deve uma"],
  count:["1...","2...","3... JÁ!"],
  win:["CONSEGUIMOS!","é nosso!!","corre corre corre","ninguém viu nada!"],
  wiz:["Ahem.","De novo, rapazes?","Alakazode!","sudo restore","Ctrl+Z!","Accio card!","git checkout -- ."],
  wizEnd:["de nada.","sem bagunça no meu deck.","*puf*","volta pro lugar, criança.","até a próxima, goblins."],
  click:["ei!","sou o Bit","tô trabalhando","não me clica >:(","cócegas não!","psiu","me dá XP?","viu o Bob por aí?"]
};
const wait = ms => new Promise(r=>setTimeout(r,ms));
const pick = a => a[Math.random() * a.length | 0];
const PET_TARGETS = ".slot:not(.gone),.sq,.loot,#player,.hero-text h1,.hero-text p,.hint,.actions .btn,.sec-head h2,.sec-head p,.chip,.inv,.legend span,.quests li,.party h2,.party p,.mail code,.links .btn,footer span";

class Actor{
  constructor(frames,w,h,pal = {}){
    this.frames = frames;
    this.pal = {...PAL,...pal};
    this.cw = w;
    this.ch = h;
    this.w = w * 4;
    this.h = h * 4;
    this.x = this.y = this.yo = 0;
    this.face = 1;
    this.el = document.createElement("div");
    this.el.className = "actor";
    this.el.hidden = true;
    this.el.setAttribute("aria-hidden","true");
    this.el.style.width = this.w + "px";
    this.el.style.height = this.h + "px";
    this.el.innerHTML = `<div class="pb"><canvas width="${w}" height="${h}"></canvas></div><span class="bubble" hidden></span>`;
    this.cv = this.el.querySelector("canvas");
    this.bub = this.el.querySelector(".bubble");
    document.body.appendChild(this.el);
    ACTORS.push(this);
  }
  draw(name){
    const ctx = this.cv.getContext("2d");
    ctx.clearRect(0,0,this.cw,this.ch);
    this.frames[name].forEach((row,y)=>[...row].forEach((c,x)=>{if (c !== "."){ctx.fillStyle = this.pal[c];ctx.fillRect(x,y,1,1)}}));
  }
  place(){
    this.el.style.transform = `translate(${this.x + DRIFT.x}px,${this.y + this.yo + DRIFT.y}px)`;
    this.cv.style.transform = `scaleX(${this.face})`;
  }
  show(){this.el.hidden = false;this.place()}
  hide(){this.el.hidden = true;this.bub.hidden = true}
  say(text,ms){
    this.bub.textContent = text;
    this.bub.hidden = false;
    clearTimeout(this.st);
    return new Promise(r=>{this.st = setTimeout(()=>{this.bub.hidden = true;r()},ms)});
  }
  anim(name){
    const pb = this.el.querySelector(".pb");
    pb.classList.remove("emerge","vanish","dropin","shake");
    if (name){void pb.offsetWidth;pb.classList.add(name)}
  }
  jump(){
    const pb = this.el.querySelector(".pb");
    pb.classList.remove("jump");
    void pb.offsetWidth;
    pb.classList.add("jump");
  }
  walk(tx,speed = 1.6,o = {}){
    const fr = o.frames || [this.frames.walk ? "walk" : "stand","stand"];
    return new Promise(res=>{
      let last = performance.now(),acc = 0,step = 0;
      const f = now => {
        const dt = Math.min(50,now - last),dx = tx - this.x;
        last = now;
        if (Math.abs(dx) < 2){this.x = tx;this.yo = 0;this.place();this.draw(o.end || "stand");return res()}
        this.face = o.face ?? (dx > 0 ? 1 : -1);
        this.x += Math.sign(dx) * Math.min(Math.abs(dx),speed * dt / 16);
        acc += dt;
        if (acc > 130){acc = 0;step ^= 1;this.draw(step ? fr[0] : fr[1]);this.yo = step ? -2 : 0}
        this.place();
        requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    });
  }
  hop(dx,h = 30,ms = 420){
    return new Promise(res=>{
      const x0 = this.x,t0 = performance.now();
      const f = now => {
        const t = Math.min(1,(now - t0) / ms);
        this.x = x0 + dx * t;
        this.yo = -h * 4 * t * (1 - t);
        this.place();
        t < 1 ? requestAnimationFrame(f) : res();
      };
      requestAnimationFrame(f);
    });
  }
}

const DRIFT = {x:0,y:0};
let anchor = null;
const ACTORS = [];
function natCenter(s){
  const q = s.getBoundingClientRect(),t = getComputedStyle(s).translate;
  let tx = 0,ty = 0;
  if (t && t !== "none"){const p = t.split(" ").map(parseFloat);tx = p[0] || 0;ty = p[1] || 0}
  return {x:q.left + q.width / 2 + scrollX - tx,y:q.top + q.height / 2 + scrollY - ty,ok:q.width > 0};
}
function track(s){
  anchor = {s,c0:natCenter(s),rift:null};
  const a = anchor;
  (function f(){
    if (anchor !== a) return;
    const c = natCenter(s);
    if (c.ok){DRIFT.x = c.x - a.c0.x;DRIFT.y = c.y - a.c0.y}
    ACTORS.forEach(ac=>{if (!ac.el.hidden) ac.place()});
    if (a.rift){a.rift.style.left = a.rift._x + DRIFT.x + "px";a.rift.style.top = a.rift._y + DRIFT.y + "px"}
    requestAnimationFrame(f);
  })();
}
function untrack(){anchor = null;DRIFT.x = DRIFT.y = 0}

function sparkle(x,y,n = 14,colors = ["#a96ddb","#d9b45b","#ebe6d8","#3e90d8"]){
  for (let i=0;i<n;i++){
    const s = document.createElement("span"),a = Math.random() * 6.283,d = 30 + Math.random() * 60;
    s.className = "spark";
    s.textContent = pick(["✦","✧","+","*","·"]);
    s.style.left = x + DRIFT.x + "px";
    s.style.top = y + DRIFT.y + "px";
    s.style.color = pick(colors);
    s.style.setProperty("--sx",Math.cos(a) * d + "px");
    s.style.setProperty("--sy",Math.sin(a) * d + "px");
    s.style.animationDelay = Math.random() * 120 + "ms";
    document.body.appendChild(s);
    s.addEventListener("animationend",()=>s.remove());
  }
}

function makeRift(x,y,w,h){
  const n = 12,L = [],Rt = [];
  for (let i=0;i<=n;i++){
    const yy = (i / n * 100).toFixed(1),a = Math.sin(Math.PI * i / n) * 18;
    L.push(`${(22 - a - Math.random() * 4).toFixed(1)},${yy}`);
    Rt.unshift(`${(22 + a + Math.random() * 4).toFixed(1)},${yy}`);
  }
  const core = Array.from({length:n + 1},(_,i)=>`${(22 + (Math.random() - .5) * 7).toFixed(1)},${(i / n * 100).toFixed(1)}`).join(" ");
  const id = "rg" + Date.now();
  const el = document.createElement("div");
  el.className = "rift closed";
  el.style.cssText = `left:${x + DRIFT.x}px;top:${y + DRIFT.y}px;width:${w}px;height:${h}px`;
  el._x = x;
  el._y = y;
  if (anchor) anchor.rift = el;
  el.innerHTML = `<svg viewBox="0 0 44 100" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="${id}"><stop offset="0" stop-color="#3a1a5c"/><stop offset=".6" stop-color="#14081f"/><stop offset="1" stop-color="#05020a"/></radialGradient></defs><polygon points="${L.join(" ")} ${Rt.join(" ")}" fill="url(#${id})" stroke="#c79bff" stroke-width="1.4" vector-effect="non-scaling-stroke"/><polyline points="${core}" fill="none" stroke="#efe0ff" stroke-width="1" opacity=".75" vector-effect="non-scaling-stroke"/></svg>`;
  document.body.appendChild(el);
  return el;
}

const SPRING = "translate .55s cubic-bezier(.3,1.8,.5,1),rotate .55s cubic-bezier(.3,1.8,.5,1)";
let bit,bob,wiz,lastTarget;

async function tug(s,dir,actors,side,n = 8,k = 2.4){
  s.style.transition = "translate .1s,rotate .1s";
  for (let i=0;i<n;i++){
    const a = 5 + i * k;
    s.style.translate = `${dir * a}px 0`;
    s.style.rotate = `${dir * (.8 + i * .35)}deg`;
    actors.forEach(([ac,base])=>{ac.x = base + dir * i * 1.4;ac.place()});
    await wait(110);
    s.style.translate = `${dir * (a - 4)}px 0`;
    await wait(90);
  }
}

async function petEpisode(){
  const pool = [...document.querySelectorAll(PET_TARGETS)].filter(s=>{
    const r = s.getBoundingClientRect();
    return s !== lastTarget && r.top > 90 && r.bottom < innerHeight - 10 && r.width > 30 && r.width < innerWidth * .8 && getComputedStyle(s).display !== "inline" && !s.querySelector(".flip.on");
  });
  if (!pool.length) return false;
  const s = pick(pool),r = s.getBoundingClientRect();
  lastTarget = s;
  track(s);
  const fromLeft = r.left + r.width / 2 < innerWidth / 2,dir = fromLeft ? -1 : 1;
  const side = fromLeft ? r.left + scrollX - bit.w + 10 : r.right + scrollX - 10;
  const out = fromLeft ? scrollX - bit.w - 30 : scrollX + innerWidth + 30;
  bit.y = r.bottom + scrollY - bit.h + 4;
  bit.x = out;
  bit.yo = 0;
  bit.draw("stand");
  bit.show();
  await bit.walk(side);
  bit.face = -dir;
  bit.draw("stand");
  await bit.say(pick(L.spot),1100);
  bit.draw("pull");
  bit.say(pick(L.pull),1800);
  await tug(s,dir,[[bit,side]],side);

  if (Math.random() < .5){
    s.style.transition = SPRING;
    s.style.translate = `${dir * 9}px 0`;
    s.style.rotate = `${dir * 3.5}deg`;
    bit.draw("sit");
    await bit.hop(dir * 46,26,380);
    await bit.say("?!",800);
    await bit.say(pick(L.fail),1600);
    bit.draw("stand");
    await bit.walk(side + dir * 9);
    bit.face = -dir;
    for (const [t,rt] of [[6,2.2],[3,.9],[-1,-.7],[0,0]]){
      bit.draw("pull");
      bit.say(pick(L.fix),650);
      s.style.transition = "translate .25s cubic-bezier(.3,1.6,.5,1),rotate .25s cubic-bezier(.3,1.6,.5,1)";
      s.style.translate = `${dir * t}px 0`;
      s.style.rotate = `${dir * rt}deg`;
      bit.x = side + dir * t;
      bit.place();
      await wait(280);
      bit.draw("stand");
      await wait(520);
    }
    bit.draw("happy");
    await bit.say(pick(L.done),1600);
    await bit.walk(out,2.6);
    bit.hide();
    s.style.transition = s.style.translate = s.style.rotate = "";
    untrack();
    return true;
  }

  s.style.transition = SPRING;
  s.style.translate = `${dir * 6}px 0`;
  s.style.rotate = `${dir * 1.5}deg`;
  bit.draw("stand");
  await bit.say(pick(L.call),1400);
  const behind = side + dir * 42;
  bob.y = bit.y;
  bob.x = out;
  bob.show();
  await bob.walk(behind,2.2);
  bob.face = -dir;
  await bob.say(pick(L.friend),1300);
  for (const c of L.count){bit.say(c,600);await wait(650)}
  bit.draw("pull");
  bob.draw("pull");
  await tug(s,dir,[[bit,side],[bob,behind]],side,5,4);
  bit.say(pick(L.win),1400);
  bit.draw("carry");
  bob.draw("carry");
  bit.face = bob.face = dir;
  const lift = () => (bit.x + bob.x) / 2 + bit.w / 2 - (r.left + scrollX + r.width / 2);
  const ty = -(bit.h - 4);
  s.style.transition = "translate .45s cubic-bezier(.3,1.5,.5,1),rotate .45s ease-out";
  s.style.translate = `${lift()}px ${ty}px`;
  s.style.rotate = `${dir * 3}deg`;
  await wait(600);
  s.style.transition = "none";
  let carrying = true;
  (function follow(t){
    if (!carrying) return;
    s.style.translate = `${lift()}px ${ty + Math.abs(Math.sin(t / 130)) * -4}px`;
    s.style.rotate = `${dir * 3 + Math.sin(t / 260) * 3}deg`;
    requestAnimationFrame(follow);
  })(0);
  const gap = bob.x - bit.x,l0 = lift();
  const tBit = fromLeft ? bit.x - (r.right + l0 + Math.abs(gap) + 40) : bit.x + (innerWidth - r.left - l0 + Math.abs(gap) + 40);
  await Promise.all([
    bit.walk(tBit,1.7,{frames:["carry","carry2"],end:"carry"}),
    bob.walk(tBit + gap,1.7,{frames:["carry2","carry"],end:"carry"})
  ]);
  carrying = false;
  s.style.opacity = "0";
  bit.hide();
  bob.hide();
  await wait(900);

  s.style.translate = "0 0";
  s.style.rotate = "0deg";
  s.style.scale = ".2";
  const cx = r.left + scrollX + r.width / 2,cy = r.top + scrollY + r.height / 2;
  const wx = Math.min(Math.max(cx - wiz.w / 2,scrollX + 8),scrollX + innerWidth - wiz.w - 8);
  const RW = 46,RH = wiz.h + 40;
  const rx = Math.min(Math.max(fromLeft ? r.right + scrollX + 24 : r.left + scrollX - RW - 24,scrollX + 8),scrollX + innerWidth - RW - 8);
  const ry = r.bottom + scrollY - RH + 10;
  const rift = makeRift(rx,ry,RW,RH);
  await wait(60);
  rift.className = "rift line";
  sparkle(rx + RW / 2,ry + RH / 2,8);
  await wait(550);
  rift.className = "rift open";
  sparkle(rx + RW / 2,ry + RH / 2,18);
  await wait(500);
  const wout = rx + RW / 2 - wiz.w / 2;
  wiz.y = r.bottom + scrollY - wiz.h + 4;
  wiz.x = wout;
  wiz.face = wx > wout ? 1 : -1;
  wiz.draw("stand");
  wiz.show();
  wiz.anim("emerge");
  await wait(650);
  await wiz.walk(wx,1.3);
  wiz.face = dir;
  wiz.draw("stand");
  await wiz.say("hmm... sumiu algo aqui",1300);
  await wiz.say(pick(L.wiz),1300);
  wiz.draw("cast");
  sparkle(cx,cy,26);
  s.style.transition = "opacity .5s ease-out,scale .7s cubic-bezier(.3,1.6,.5,1)";
  s.style.opacity = "1";
  s.style.scale = "1";
  await wait(800);
  wiz.draw("stand");
  await wiz.say(pick(L.wizEnd),1500);
  await wiz.say("bom, de volta pro trabalho",1200);
  await wiz.walk(wout,1.4);
  wiz.anim("vanish");
  sparkle(rx + RW / 2,ry + RH / 2,10);
  await wait(500);
  wiz.hide();
  wiz.anim("");
  rift.className = "rift line";
  await wait(380);
  rift.className = "rift closed";
  sparkle(rx + RW / 2,ry + RH / 2,12);
  await wait(500);
  rift.remove();
  await wait(600);
  s.style.transition = s.style.translate = s.style.rotate = s.style.opacity = s.style.scale = "";
  untrack();
  return true;
}

const CRATE = {stand:["kkkkkkkkkkkk","kbbbbbbbbbbk","kbBbbbbbbBbk","kbbBbbbbBbbk","kbbbBbbBbbbk","kbbbbBBbbbbk","kbbbBbbBbbbk","kbbBbbbbBbbk","kbBbbbbbbBbk","kkkkkkkkkkkk"]};
const WL = {
  start:["Bob... é guerra.","hora do pew pew","quem perder lava a louça","3, 2, 1... FOGO!","hoje tem tiroteio"],
  bobStart:["pode vir!","vou te pegar, Bit","tô com a mira calibrada","bora!","já perdeu"],
  shoot:["pew pew!","toma!","bang!","ratatata","pow!","headshot!"],
  miss:["errou!","nem perto","tô blindado","haha, cadê?","mira torta"],
  hit:["ARGH!","fui atingido!","foi de raspão","ai!","isso doeu","lag!!"],
  nade:["GRANADA!","presentinho!","segura essa!","FOGO NO BURACO!"],
  nadeSee:["ah não","CORRE","eita","opa opa opa"],
  boomHurt:["*tosse*","meus ouvidos!","tô vendo estrelas","cabelo queimado"],
  taunt:["só isso?","minha vó atira melhor","tá com medo?","vem que tem","noob"],
  tauntBack:["...","vou te mostrar","cala a boca","espera só"],
  lose:["eu desisto","tô fora","GG... revanche","fui de base"],
  win:["GG EZ","campeão!","quem lava a louça?","fácil demais"],
  draw:["acabou a munição...","empate técnico","bora lanchar?","revanche amanhã"]
};
let crL,crR;

function fly(cls,x0,y0,x1,y1,ms,arc = 0){
  return new Promise(res=>{
    const el = document.createElement("div"),t0 = performance.now();
    el.className = cls;
    document.body.appendChild(el);
    (function f(now){
      const t = Math.min(1,(now - t0) / ms),x = x0 + (x1 - x0) * t,y = y0 + (y1 - y0) * t - arc * 4 * t * (1 - t);
      el.style.transform = `translate(${x}px,${y}px) rotate(${arc ? t * 720 : x1 < x0 ? 180 : 0}deg)`;
      t < 1 ? requestAnimationFrame(f) : res(el);
    })(t0);
  });
}

function boom(x,y){
  const b = document.createElement("div");
  b.className = "boom";
  b.style.left = x + "px";
  b.style.top = y + "px";
  document.body.appendChild(b);
  b.addEventListener("animationend",()=>b.remove());
  sparkle(x,y,26,["#fff6dc","#ffb347","#e0623c","#d9b45b"]);
  setTimeout(()=>sparkle(x,y - 10,10,["#5a5f6e","#8a8f9c","#3a3d47"]),150);
}

function setPos(p,at,frame){
  p.a.x = at;
  p.a.face = p.face;
  p.a.draw(frame);
  p.a.place();
}

async function shootTurn(me,foe){
  setPos(me,me.peek,"aim");
  me.hiding = false;
  foe.hiding = Math.random() < .65;
  if (!foe.hiding) setPos(foe,foe.peek,"aim");
  await wait(240);
  me.a.say(pick(WL.shoot),900);
  let hit = false;
  for (let i=0,n=1 + (Math.random() * 3 | 0);i<n;i++){
    const [mx,my] = me.muzzle();
    sparkle(mx,my,4,["#fff6dc","#ffd27a"]);
    hit = !foe.hiding && Math.random() < .5;
    const tx = hit ? foe.a.x + 28 : foe.edge(),ty = foe.a.y + 22 + (hit ? 0 : (Math.random() - .5) * 12);
    const b = await fly("bullet",mx,my,tx,ty,240);
    b.remove();
    if (hit){
      foe.hp--;
      foe.a.draw("sit");
      foe.a.say(pick(WL.hit),900);
      await foe.a.hop(-foe.face * 22,18,300);
      break;
    }
    sparkle(tx,ty,6,["#d9b45b","#7a5230","#fff6dc"]);
    if (foe.hiding) foe.cover.anim("shake");
    await wait(140);
  }
  if (!hit) foe.a.say(pick(WL.miss),900);
  await wait(350);
  setPos(me,me.hide,"crouch");
  me.hiding = true;
  await wait(hit ? 600 : 200);
  setPos(foe,foe.hide,"crouch");
  foe.hiding = true;
}

async function nadeTurn(me,foe,floor){
  setPos(me,me.hide,"throw");
  me.a.say(pick(WL.nade),1000);
  await wait(320);
  const tx = foe.a.x + 28 + (Math.random() - .5) * 30,ty = floor - 10;
  const g = await fly("gren",me.a.x + 28,me.a.y,tx,ty,750,130);
  setPos(me,me.hide,"crouch");
  foe.a.say(pick(WL.nadeSee),700);
  g.classList.add("blink");
  await wait(650);
  g.remove();
  boom(tx,ty);
  foe.cover.anim("shake");
  me.cover.anim("shake");
  if (Math.random() < .55){
    foe.hp--;
    foe.a.draw("sit");
    await foe.a.hop(-foe.face * 28,26,380);
    await foe.a.say(pick(WL.boomHurt),1100);
    setPos(foe,foe.hide,"crouch");
  } else await foe.a.say(pick(WL.miss),900);
}

async function tauntTurn(me,foe){
  setPos(me,me.hide,"happy");
  await me.a.say(pick(WL.taunt),1100);
  setPos(me,me.hide,"crouch");
  await foe.a.say(pick(WL.tauntBack),900);
}

async function warEpisode(){
  const W = innerWidth;
  if (W < 420) return false;
  const floor = scrollY + innerHeight - 22;
  const cL = Math.round(scrollX + W * .18),cR = Math.round(scrollX + W * .82 - crL.w);
  crL.x = cL;
  crR.x = cR;
  crL.y = crR.y = floor - crL.h;
  bit.y = bob.y = floor - bit.h;
  const P = {
    bit:{a:bit,hide:cL - 30,peek:cL + 30,face:1,cover:crL,hp:3,hiding:true,muzzle:()=>[bit.x + 56,bit.y + 20],edge:()=>cL + crL.w},
    bob:{a:bob,hide:cR + 22,peek:cR - 42,face:-1,cover:crR,hp:3,hiding:true,muzzle:()=>[bob.x,bob.y + 20],edge:()=>cR}
  };
  [crL,crR].forEach(c=>{c.draw("stand");c.show();c.anim("dropin")});
  await wait(550);
  sparkle(cL + 24,floor - 4,8,["#8a8f9c","#5a5f6e"]);
  sparkle(cR + 24,floor - 4,8,["#8a8f9c","#5a5f6e"]);
  bit.x = scrollX - 80;
  bob.x = scrollX + W + 30;
  bit.draw("stand");
  bob.draw("stand");
  bit.show();
  bob.show();
  await Promise.all([bit.walk(P.bit.hide,2.6),bob.walk(P.bob.hide,2.6)]);
  setPos(P.bit,P.bit.hide,"crouch");
  setPos(P.bob,P.bob.hide,"crouch");
  await bit.say(pick(WL.start),1300);
  await bob.say(pick(WL.bobStart),1200);
  for (let r=0,n=6 + (Math.random() * 4 | 0);r<n;r++){
    const [me,foe] = Math.random() < .5 ? [P.bit,P.bob] : [P.bob,P.bit];
    const roll = Math.random();
    if (roll < .6) await shootTurn(me,foe);
    else if (roll < .85) await nadeTurn(me,foe,floor);
    else await tauntTurn(me,foe);
    if (P.bit.hp <= 0 || P.bob.hp <= 0) break;
    await wait(300 + Math.random() * 400);
  }
  const loser = P.bit.hp <= 0 ? P.bit : P.bob.hp <= 0 ? P.bob : null;
  if (loser){
    const winner = loser === P.bit ? P.bob : P.bit;
    setPos(loser,loser.hide,"sit");
    setPos(winner,winner.peek,"happy");
    await loser.a.say(pick(WL.lose),1300);
    winner.a.jump();
    await winner.a.say(pick(WL.win),1400);
  } else {
    setPos(P.bit,P.bit.hide,"stand");
    setPos(P.bob,P.bob.hide,"stand");
    await bit.say(pick(WL.draw),1400);
    await bob.say("👍",900);
  }
  [crL,crR].forEach(c=>{c.anim("vanish");sparkle(c.x + 24,c.y + 20,10)});
  await wait(500);
  crL.hide();
  crR.hide();
  crL.anim("");
  crR.anim("");
  await Promise.all([bit.walk(scrollX - 90,2.4),bob.walk(scrollX + W + 40,2.4)]);
  bit.hide();
  bob.hide();
  return true;
}

async function petLoop(){
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  bit = new Actor(GOB,14,12);
  bob = new Actor(GOB,14,12,BLUE);
  wiz = new Actor(WIZ,14,16);
  crL = new Actor(CRATE,12,10);
  crR = new Actor(CRATE,12,10);
  bit.el.addEventListener("click",e=>{
    bit.jump();
    bit.say(pick(L.click),1100);
    gainXP(5,e.clientX,e.clientY - 30);
  });
  bob.el.addEventListener("click",e=>{bob.jump();bob.say("eu sou o Bob",1000)});
  wiz.el.addEventListener("click",()=>{wiz.say("não toque no mago.",1000)});
  await wait(6000);
  for (;;){
    const ok = document.visibilityState === "visible" && await (Math.random() < .4 ? warEpisode() : petEpisode());
    await wait(ok ? 14000 + Math.random() * 12000 : 4000);
  }
}

function dust(){
  const cv = $("#dust"),ctx = cv.getContext("2d"),still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const S = 3;
  let w,h,layers,stars,clouds,flies,windows,moon,shoot = null,nextShoot = 4000,mx = .5,last = 0,sp = 0;
  const C = {top:"#060a17",mid:"#0c1830",hor:"#1a3a48",far:"#15283c",farRim:"#22405a",mid2:"#0f1e30",midRim:"#1a3148",near:"#0a1522",tree:"#07101a",win:"#f1c560",cloud:"#1b2f47"};
  const R = rng("mundo");
  const off = (cw,ch) => {const c = document.createElement("canvas");c.width = cw;c.height = ch;return c};
  function ridge(c,base,amp,col,rim,seed){
    const g = c.getContext("2d"),r = rng(seed),ph = [r() * 6,r() * 6,r() * 6],ys = [];
    for (let x=0;x<c.width;x++){
      const n = Math.sin(x * .011 + ph[0]) * .55 + Math.sin(x * .027 + ph[1]) * .3 + Math.sin(x * .063 + ph[2]) * .15;
      ys.push(Math.round(base - n * amp - (r() < .3 ? 1 : 0)));
    }
    g.fillStyle = col;
    ys.forEach((y,x)=>g.fillRect(x,y,1,c.height - y));
    if (rim){g.fillStyle = rim;ys.forEach((y,x)=>{if (ys[x - 1] > y || ys[x + 1] > y) g.fillRect(x,y,1,1)})}
    return ys;
  }
  function castle(c,ys,cx){
    const g = c.getContext("2d"),gy = Math.min(...ys.slice(cx - 14,cx + 14));
    g.fillStyle = C.mid2;
    [[-14,10,14],[-6,16,12],[6,10,14],[-3,24,6],[-10,14,4],[10,12,4]].forEach(([dx,ht,wd])=>{
      const x = cx + dx,y = gy - ht;
      g.fillRect(x,y,wd,ht + 4);
      for (let i=0;i<wd;i+=2) g.fillRect(x + i,y - 1,1,1);
    });
    g.fillRect(cx - 1,gy - 30,1,6);
    g.fillStyle = "#c0503a";
    g.fillRect(cx,gy - 30,3,2);
    return [[-11,gy - 6],[-8,gy - 6],[-2,gy - 12],[1,gy - 12],[-1,gy - 19],[9,gy - 5],[12,gy - 7]].map(([dx,y])=>({x:cx + dx,y,p:R() * 6}));
  }
  function trees(c,ys){
    const g = c.getContext("2d");
    g.fillStyle = C.tree;
    for (let x=2;x<c.width;x+=5 + (R() * 9 | 0)){
      const ht = 7 + (R() * 12 | 0),y = ys[x] + 1;
      for (let k=0;k<ht;k++){const hw = Math.floor((k / ht) * (ht / 3.2)) + (k % 3 === 2 ? 1 : 0);g.fillRect(x - hw,y - ht + k,hw * 2 + 1,1)}
      g.fillRect(x,y,1,2);
    }
  }
  function cloud(){
    const cw = 30 + (R() * 30 | 0),ch = 10 + (R() * 6 | 0),c = off(cw,ch),g = c.getContext("2d");
    g.fillStyle = C.cloud;
    for (let i=0;i<6;i++){
      const bx = R() * (cw - 12) + 6,by = ch * .55 + R() * 2,br = 3 + R() * 4;
      for (let y=-br;y<=br;y++) for (let x=-br;x<=br;x++) if (x * x + y * y <= br * br && by + y < ch) g.fillRect(bx + x | 0,by + y | 0,1,1);
    }
    g.fillRect(4,ch - 3,cw - 8,2);
    return c;
  }
  function build(){
    w = Math.ceil(innerWidth / S);
    h = Math.ceil(innerHeight / S);
    cv.width = w;
    cv.height = h;
    const lw = w + 40,far = off(lw,h),mid = off(lw,h),near = off(lw,h);
    ridge(far,h * .66,h * .13,C.far,C.farRim,"far");
    const mys = ridge(mid,h * .76,h * .08,C.mid2,C.midRim,"mid");
    windows = castle(mid,mys,Math.round(lw * .7));
    trees(near,ridge(near,h * .9,h * .035,C.near,null,"near"));
    layers = [[far,.25,3],[mid,.5,7],[near,1,12]];
    stars = Array.from({length:Math.round(w * h / 700)},()=>({x:R() * w | 0,y:R() * h * .62 | 0,b:R(),p:R() * 6.28,big:R() < .06}));
    clouds = Array.from({length:5},(_,i)=>({c:cloud(),x:R() * w,y:h * (.1 + i * .07),v:.02 + R() * .03}));
    flies = Array.from({length:22},()=>({x:R() * w,y:h * (.72 + R() * .26),p:R() * 6.28,v:R() * .2 + .05}));
    moon = {x:w * .82 | 0,y:h * .17 | 0,r:Math.max(7,Math.round(h * .035))};
  }
  function drawMoon(){
    const {x,y,r} = moon;
    const glow = ctx.createRadialGradient(x,y,r,x,y,r * 6);
    glow.addColorStop(0,"rgba(241,213,142,.14)");
    glow.addColorStop(1,"rgba(241,213,142,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - r * 6,y - r * 6,r * 12,r * 12);
    for (let yy=-r;yy<=r;yy++) for (let xx=-r;xx<=r;xx++){
      const d = xx * xx + yy * yy;
      if (d > r * r) continue;
      const crater = (xx + 2) ** 2 + (yy - 1) ** 2 < 5 || (xx - 3) ** 2 + (yy + 3) ** 2 < 3 || (xx + 1) ** 2 + (yy + 4) ** 2 < 2;
      ctx.fillStyle = crater ? "#cbbf98" : d > (r - 1) ** 2 ? "#d8cfa8" : "#efe6c4";
      ctx.fillRect(x + xx,y + yy,1,1);
    }
  }
  function frame(t){
    if (!still) requestAnimationFrame(frame);
    if (t - last < 33 && !still) return;
    const dt = last ? Math.min(100,t - last) : 16;
    last = t;
    const max = document.documentElement.scrollHeight - innerHeight;
    sp += ((max > 0 ? scrollY / max : 0) - sp) * .1;
    const sky = ctx.createLinearGradient(0,0,0,h);
    sky.addColorStop(0,C.top);
    sky.addColorStop(.55,C.mid);
    sky.addColorStop(.8,C.hor);
    sky.addColorStop(1,C.mid);
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,w,h);
    for (const s of stars){
      const a = .35 + .65 * (.5 + .5 * Math.sin(t / (700 + s.b * 900) + s.p)) * (.4 + s.b * .6);
      const yy = s.y - sp * 10 | 0;
      ctx.globalAlpha = a;
      ctx.fillStyle = s.b > .85 ? "#f1d58e" : "#dfe7ff";
      ctx.fillRect(s.x,yy,1,1);
      if (s.big && a > .7){ctx.globalAlpha = a * .5;ctx.fillRect(s.x - 1,yy,3,1);ctx.fillRect(s.x,yy - 1,1,3)}
    }
    ctx.globalAlpha = 1;
    drawMoon();
    if (!still){
      nextShoot -= dt;
      if (nextShoot < 0 && !shoot){shoot = {x:R() * w * .7,y:R() * h * .25,l:0};nextShoot = 7000 + R() * 9000}
      if (shoot){
        shoot.l += dt / 16;
        for (let i=0;i<10;i++){ctx.globalAlpha = (1 - i / 10) * Math.max(0,1 - shoot.l / 40);ctx.fillStyle = "#fff6dc";ctx.fillRect(shoot.x + shoot.l * 2.4 - i * 2 | 0,shoot.y + shoot.l * 1.1 - i | 0,1,1)}
        ctx.globalAlpha = 1;
        if (shoot.l > 40) shoot = null;
      }
    }
    for (const c of clouds){
      c.x += c.v * dt / 16;
      if (c.x > w + 10) c.x = -c.c.width - 10;
      ctx.globalAlpha = .55;
      ctx.drawImage(c.c,c.x | 0,c.y - sp * 14 | 0);
    }
    ctx.globalAlpha = 1;
    layers.forEach(([img,depth,mxf],i)=>{
      const ox = -20 + (.5 - mx) * mxf * 2 | 0,oy = (1 - sp) * depth * 14 - 6 | 0;
      ctx.drawImage(img,ox,oy);
      if (i === 1) for (const wn of windows){
        ctx.globalAlpha = .7 + .3 * Math.sin(t / 300 + wn.p) * Math.sin(t / 130 + wn.p * 2);
        ctx.fillStyle = C.win;
        ctx.fillRect(wn.x + ox,wn.y + oy,1,1);
      }
      ctx.globalAlpha = 1;
    });
    for (const f of flies){
      f.p += .02 * dt / 16;
      f.x += Math.cos(f.p * 1.3) * f.v;
      f.y += Math.sin(f.p) * f.v * .6;
      if (f.x < 0) f.x = w;
      if (f.x > w) f.x = 0;
      const a = .5 + .5 * Math.sin(t / 400 + f.p * 4);
      ctx.globalAlpha = a * .35;
      ctx.fillStyle = "#f1d58e";
      ctx.fillRect(f.x - 1 | 0,f.y - 1 | 0,3,3);
      ctx.globalAlpha = a;
      ctx.fillRect(f.x | 0,f.y | 0,1,1);
    }
    ctx.globalAlpha = 1;
    const fade = ctx.createLinearGradient(0,h * .55,0,h);
    fade.addColorStop(0,"rgba(6,10,23,0)");
    fade.addColorStop(1,"rgba(6,10,23,.35)");
    ctx.fillStyle = fade;
    ctx.fillRect(0,h * .55,w,h * .45);
  }
  build();
  addEventListener("resize",()=>{build();if (still) frame(0)});
  addEventListener("pointermove",e=>{mx = e.clientX / innerWidth},{passive:true});
  requestAnimationFrame(frame);
}

function idle(){
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("idle",!e.isIntersecting)),{rootMargin:"150px 0px"});
  document.querySelectorAll("main section").forEach(s=>io.observe(s));
}

renderHero();
renderPlayer();
renderFilters();
renderDeck(DATA.projects);
renderInv();
renderSide();
renderQuests();
replay();
reveal();
dust();
idle();
petLoop();
