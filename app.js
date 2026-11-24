const AREAS = [{name:'Espiritualidade',score:4,task:'Leitura bíblica e reflexão por 10 minutos.'},{name:'Saúde mental e emocional',score:6,task:'Pausa consciente de 10 minutos.'},{name:'Carreira e trabalho',score:9,task:'Concluir uma prioridade profissional.'},{name:'Finanças e dinheiro',score:2,task:'Registrar gastos e revisar uma ação financeira.'},{name:'Saúde e fitness',score:4,task:'Treinar ou movimentar o corpo.'},{name:'Família',score:7,task:'Um gesto de atenção à família.'},{name:'Amor e romance',score:8,task:'Conversar com Marcelo sem distrações.'},{name:'Vida social e amizades',score:7,task:'Cultivar uma amizade.'},{name:'Crescimento pessoal',score:6,task:'Ler ou estudar por 15 minutos.'},{name:'Recreação e diversão',score:1,task:'Fazer algo prazeroso sem finalidade produtiva.'},{name:'Ambiente físico',score:2,task:'Organizar um pequeno espaço por 10 minutos.'},{name:'Contribuição e impacto',score:4,task:'Realizar um gesto de ajuda ou contribuição.'}];
const KEY='viva12-data-v1';
const defaults={days:{},weekly:{},areas:AREAS.map(a=>a.score),debtTotal:'',debtReserve:'',extraHours:2};
let data=load();
function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}}
function persist(){localStorage.setItem(KEY,JSON.stringify(data))}
const $=s=>document.querySelector(s);
const todayISO=()=>new Date().toLocaleDateString('en-CA');
const date=$('#dayDate');date.value=todayISO();$('#today').textContent=new Date().toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short'});
function dayData(d=date.value){return data.days[d]||{done:[],rating:5,reflection:''}}
function renderDay(){let d=dayData();$('#dailyTasks').innerHTML=AREAS.map((a,i)=>`<label class="task"><input type="checkbox" data-i="${i}" ${d.done.includes(i)?'checked':''}><span><strong>${a.name}</strong><small>${a.task}</small><span class="pts">+2 pontos</span></span></label>`).join('');$('#rating').value=d.rating;$('#ratingOut').textContent=d.rating;$('#reflection').value=d.reflection;updateScore()}
function updateScore(){let d=dayData(),pts=d.done.length*2;$('#todayPoints').textContent=pts;$('#todayPercent').textContent=Math.round(d.done.length/12*100)+'% das ações concluídas';$('#progressBar').style.width=(d.done.length/12*100)+'%';$('#progressLabel').textContent=d.done.length+' de 12 ações concluídas';}
$('#dailyTasks').addEventListener('change',e=>{if(!e.target.matches('input[type=checkbox]'))return;let d=dayData();let i=+e.target.dataset.i;d.done=e.target.checked?[...new Set([...d.done,i])]:d.done.filter(x=>x!==i);data.days[date.value]=d;persist();updateScore()});
date.addEventListener('change',renderDay);$('#rating').addEventListener('input',()=>$('#ratingOut').textContent=$('#rating').value);
$('#saveDay').onclick=()=>{let d=dayData();d.rating=+$('#rating').value;d.reflection=$('#reflection').value;data.days[date.value]=d;persist();$('#saveMsg').textContent='Avaliação salva neste dispositivo.';};
function renderAreas(){$('#areasGrid').innerHTML=AREAS.map((a,i)=>`<div class="area"><div class="areahead"><span>${String(i+1).padStart(2,'0')}. ${a.name}</span><span id="val${i}">${data.areas[i]}/10</span></div><input type="range" min="0" max="10" step="1" value="${data.areas[i]}" data-area="${i}"><small>Nota atual • inicial ${a.score}/10</small></div>`).join('')}
$('#areasGrid').addEventListener('input',e=>{if(e.target.dataset.area===undefined)return;let i=+e.target.dataset.area;data.areas[i]=+e.target.value;$('#val'+i).textContent=e.target.value+'/10';persist()});
const week=[
['Segunda',[['05:30–06:30','Rotina tranquila / autocuidado'],['08:00–17:00','Trabalho IFSertãoPE'],['17:30–18:00','Conferir apartamentos'],['19:30–21:30','Estudos bíblicos dirigidos']]],
['Terça',[['08:00–17:00','Trabalho IFSertãoPE'],['17:30–18:30','Airbnb e finanças'],['19:30–21:00','Mestrado e artigo']]],
['Quarta',[['08:00–17:00','Trabalho IFSertãoPE'],['17:30–18:30','Família / descanso'],['19:30','Reunião congregacional']]],
['Quinta',[['05:30–06:30','Academia'],['08:00–17:00','Trabalho IFSertãoPE'],['19:30–20:30','Estudos bíblicos dirigidos']]],
['Sexta',[['08:00–17:00','Trabalho IFSertãoPE'],['17:30–18:30','Gestão HIGIS'],['19:30 em diante','Relacionamento e lazer']]],
['Sábado',[['05:30–06:30','Academia'],['08:00–10:00','Mestrado / escrita'],['Tarde','Estudos bíblicos dirigidos'],['19:00','Reunião congregacional']]],
['Domingo',[['Manhã','Espiritualidade, família e lazer'],['Tarde','Estudos bíblicos dirigidos'],['17:30–18:00','Revisão semanal'],['18:00–19:00','Planejamento da semana']]]
];
$('#schedule').innerHTML=week.map(([d,ev])=>`<div class="day"><h3>${d}</h3>${ev.map(([t,n])=>`<div class="event"><time>${t}</time><span>${n}</span></div>`).join('')}</div>`).join('');
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#panel-'+b.dataset.tab).classList.add('active')});
$('#debtTotal').value=data.debtTotal||'';$('#debtReserve').value=data.debtReserve||'';$('#extraHours').value=data.extraHours??2;
['debtTotal','debtReserve','extraHours'].forEach(id=>$('#'+id).addEventListener('change',e=>{data[id]=e.target.value;persist()}));
$('#saveWeekly').onclick=()=>{data.weekly[todayISO()]={good:$('#weeklyGood').value,adjust:$('#weeklyAdjust').value,priority:$('#weeklyPriority').value};persist();alert('Revisão semanal salva neste dispositivo.')};
function download(name,content,type){let a=document.createElement('a'),u=URL.createObjectURL(new Blob([content],{type}));a.href=u;a.download=name;a.click();URL.revokeObjectURL(u)}
$('#exportData').onclick=()=>download('viva12-backup.json',JSON.stringify(data,null,2),'application/json');
$('#importData').onchange=async e=>{try{data={...defaults,...JSON.parse(await e.target.files[0].text())};persist();renderDay();renderAreas();alert('Backup restaurado.')}catch{alert('Não foi possível ler esse arquivo.')}};
$('#monthlyReport').onclick=()=>{let lines=['VIVA 12 — RELATÓRIO MENSAL',new Date().toLocaleDateString('pt-BR'),'','NOTAS DAS 12 ÁREAS',...AREAS.map((a,i)=>`${a.name}: ${data.areas[i]}/10`),'','DIAS REGISTRADOS',...Object.entries(data.days).map(([d,v])=>`${d}: ${v.done.length}/12 ações; nota ${v.rating}/10; ${v.reflection||''}`)];download('viva12-relatorio.txt',lines.join('\n'),'text/plain')};
$('#icsBtn').onclick=()=>{
const events=[
['Academia','20261126T053000','20261126T063000','FREQ=WEEKLY;BYDAY=TH','Treino de quinta-feira'],
['Academia','20261128T053000','20261128T063000','FREQ=WEEKLY;BYDAY=SA','Treino de sábado'],
['Academia','20261130T053000','20261130T063000','FREQ=WEEKLY;BYDAY=MO','Treino de segunda-feira'],
['Trabalho IFSertãoPE','20261124T080000','20261124T170000','FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR','Expediente de segunda a sexta'],
['Estudos bíblicos dirigidos','20261130T193000','20261130T213000','FREQ=WEEKLY;BYDAY=MO','Segunda-feira'],
['Reunião congregacional','20261125T193000','20261125T203000','FREQ=WEEKLY;BYDAY=WE','Quarta-feira'],
['Estudos bíblicos dirigidos','20261126T193000','20261126T203000','FREQ=WEEKLY;BYDAY=TH','Quinta-feira'],
['Reunião congregacional','20261128T190000','20261128T200000','FREQ=WEEKLY;BYDAY=SA','Sábado']
];
let ics='BEGIN:VCALENDAR\\r\\nVERSION:2.0\\r\\nPRODID:-//VIVA12//PT-BR\\r\\nCALSCALE:GREGORIAN\\r\\n'+events.map(e=>`BEGIN:VEVENT\\r\\nUID:${e[0].replace(/\\s/g,'')}-${e[1]}@viva12\\r\\nDTSTAMP:20261124T120000Z\\r\\nSUMMARY:${e[0]}\\r\\nDTSTART:${e[1]}\\r\\nDTEND:${e[2]}\\r\\nRRULE:${e[3]}\\r\\nDESCRIPTION:${e[4]} — horário local; confirme o fuso após importar.\\r\\nEND:VEVENT\\r\\n`).join('')+'END:VCALENDAR\\r\\n';
download('agenda-viva12.ics',ics,'text/calendar');
};
$('#notifyBtn').onclick=async()=>{if(!('Notification'in window)){$('#notifyStatus').textContent='Notificações não suportadas neste navegador.';return}let p=await Notification.requestPermission();$('#notifyStatus').textContent=p==='granted'?'Notificações autorizadas neste dispositivo. O navegador ainda precisa estar ativo para lembretes locais.':'Permissão não concedida.';if(p==='granted')new Notification('VIVA 12',{body:'Seu painel está pronto para acompanhar seu dia.'})};
let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#installBtn').hidden=false});$('#installBtn').onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null}else alert('Use o menu do navegador e escolha “Instalar aplicativo” ou “Adicionar à tela inicial”.')};
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.error));
renderDay();renderAreas();
