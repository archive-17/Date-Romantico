const $=id=>document.getElementById(id),screens=[...document.querySelectorAll('.screen')];
function show(id){screens.forEach(x=>x.classList.remove('active'));$(id).classList.add('active');window.scrollTo(0,0)}
function heart(){let h=document.createElement('span');h.className='heart';h.textContent=['❤️','💕','💗','💖'][Math.floor(Math.random()*4)];h.style.left=Math.random()*100+'%';h.style.fontSize=12+Math.random()*20+'px';h.style.animationDuration=6+Math.random()*6+'s';document.getElementById('hearts').appendChild(h);setTimeout(()=>h.remove(),13000)}
setInterval(heart,500);for(let i=0;i<10;i++)setTimeout(heart,i*200);
function addBubble(text,who='them',image=false){const wrap=document.createElement('div');wrap.className='bubble-row '+who;const b=document.createElement('div');b.className='bubble';if(image){const img=document.createElement('img');img.src='convite.svg';img.alt='Imagem do convite';b.appendChild(img)}else b.innerHTML=text;wrap.appendChild(b);$('chat').appendChild(wrap);$('chat').scrollTop=$('chat').scrollHeight}
function browserNotify(){if(!('Notification' in window))return;if(Notification.permission==='granted'){new Notification('💌 Convite aceito!',{body:'Alguém aceitou seu convite ❤️'});}else if(Notification.permission!=='denied'){Notification.requestPermission().then(p=>{if(p==='granted')new Notification('💌 Convite aceito!',{body:'Alguém aceitou seu convite ❤️'})})}}
$('open').onclick=()=>{show('invite');setTimeout(()=>addBubble('O convite foi aberto 💌','me',true),250)};
$('yes').onclick=()=>{addBubble('SIM ❤️','them');show('date');browserNotify()};
let attempts=0;const msgs=['Tem certeza? 👀','Pensa bem... 😭','Essa opção parece suspeita... 😂','O botão NÃO está fugindo! 🏃‍♂️','Você realmente vai tentar isso? 🥺','Acho que você deveria clicar em SIM ❤️'];
function escapeNo(e){if(e)e.preventDefault();attempts++;$('msg').textContent=msgs[Math.min(attempts-1,msgs.length-1)];if(attempts<7)$('no').style.transform=`translate(${Math.random()*160-80}px,${Math.random()*70-35}px)`;else $('no').style.display='none'}
['pointerenter','pointerdown','touchstart'].forEach(e=>$('no').addEventListener(e,escapeNo));
$('continue').onclick=()=>{if(!$('dateInput').value||!$('timeInput').value)return alert('Escolha a data e o horário ❤️');addBubble(`Quero te ver em <strong>${new Date($('dateInput').value+'T00:00:00').toLocaleDateString('pt-BR')}</strong>, às <strong>${$('timeInput').value}</strong>.`,'them');show('food')};
let finalPayload=null;
document.querySelectorAll('.choice').forEach(b=>b.onclick=async()=>{let d=new Date($('dateInput').value+'T00:00:00');finalPayload={date:d.toLocaleDateString('pt-BR'),time:$('timeInput').value,choice:b.dataset.x};addBubble(b.dataset.x,'them');show('final');$('summary').innerHTML=`Nosso date ficou marcado para <strong>${finalPayload.date}</strong>, às <strong>${finalPayload.time}</strong>.<br><br>${finalPayload.choice}<br><br>Agora é só preparar o sorriso. ❤️`;
  const status=await notifyOwner(finalPayload); $('notifyStatus').textContent=status.ok?'Aviso enviado para você. 🔔':'Convite confirmado. ❤️'; browserNotify();
});
$('again').onclick=()=>{attempts=0;$('no').style.display='';$('no').style.transform='';$('msg').textContent='Escolha com carinho... 👀';$('chat').innerHTML='';show('landing')};
