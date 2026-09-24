// Notificação por e-mail (opcional): coloque seu e-mail na constante abaixo.
// Para funcionar remotamente no GitHub Pages, usamos FormSubmit (sem servidor próprio).
// Depois do primeiro envio, o FormSubmit pode pedir confirmação do endereço.
const NOTIFY_EMAIL = 'kakagomes620@gmail.com';

async function notifyOwner(payload) {
  if (!NOTIFY_EMAIL || NOTIFY_EMAIL === 'SEU_EMAIL_AQUI') return {ok:false, reason:'email_nao_configurado'};
  try {
    const body = new URLSearchParams({
      _subject: '💌 Alguém aceitou seu convite!',
      _captcha: 'false',
      _template: 'table',
      mensagem: 'Seu convite foi aceito! ❤️',
      data: payload.date,
      horario: payload.time,
      programa: payload.choice
    });
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
      method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body
    });
    return {ok:res.ok};
  } catch(e) { return {ok:false, reason:'erro_rede'}; }
}
