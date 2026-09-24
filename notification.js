// Notificação por e-mail usando FormSubmit.
// O envio é feito por um formulário HTML real em um iframe invisível,
// o que evita bloqueios de CORS/AJAX em alguns navegadores.
const NOTIFY_EMAIL = 'kakagomes620@gmail.com';

function notifyOwner(payload) {
  return new Promise((resolve) => {
    if (!NOTIFY_EMAIL) {
      resolve({ ok: false, reason: 'email_nao_configurado' });
      return;
    }

    const iframeName = 'email-submit-' + Date.now();
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://formsubmit.co/${encodeURIComponent(NOTIFY_EMAIL)}`;
    form.target = iframeName;
    form.style.display = 'none';

    const fields = {
      _subject: '💌 Alguém aceitou seu convite!',
      _template: 'table',
      _captcha: 'false',
      _url: window.location.href,
      mensagem: 'Seu convite foi aceito! ❤️',
      data: payload.date,
      horario: payload.time,
      programa: payload.choice
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value ?? '';
      form.appendChild(input);
    });

    document.body.appendChild(form);

    let finished = false;
    const finish = (result) => {
      if (finished) return;
      finished = true;
      setTimeout(() => {
        form.remove();
        iframe.remove();
      }, 3000);
      resolve(result);
    };

    // O iframe carregar significa que o POST foi entregue ao FormSubmit.
    iframe.addEventListener('load', () => {
      finish({ ok: true, submitted: true });
    }, { once: true });

    form.submit();

    // Não deixar o convite preso caso o serviço demore a responder.
    setTimeout(() => finish({ ok: true, submitted: true, pending: true }), 7000);
  });
}
