document.addEventListener('DOMContentLoaded', function () {
  const formMensagem = document.getElementById('formMensagem');
  const resultado = document.getElementById('resultado');

  $('#numeroTelefone').mask("+55 (99) 99999-9999");

  formMensagem.addEventListener('submit', function (event) {
      event.preventDefault();

      const nomeRemetente = document.getElementById('nomeRemetente').value;
      const mensagem = document.getElementById('mensagem').value;
      const dataHoraAgendamento = document.getElementById('dataHoraAgendamento').value;
      const numeroTelefone = formatarNumeroTelefone(document.getElementById('numeroTelefone').value);

      const dataHoraAgendamentoObj = new Date(dataHoraAgendamento);
      const tempoAteAgendamento = dataHoraAgendamentoObj.getTime() - Date.now();

      setTimeout(function () {
          const assinatura = gerarAssinatura(nomeRemetente, mensagem);
          resultado.innerHTML = `<pre>${assinatura}</pre>`;
          enviarMensagemWhatsapp(numeroTelefone, mensagem);
      }, tempoAteAgendamento);
  });

  function formatarNumeroTelefone(input) {
    const numerosApenas = input.replace(/\D/g, '');

    const regex = /^(\d{2})(\d{2})(\d{5})(\d{4})$/;
    const match = numerosApenas.match(regex);

    if (match) {
        return `+${match[1]}${match[2]}${match[3]}${match[4]}`;
    }

    return input;
  }

  function gerarAssinatura(nomeRemetente, mensagem) {
      const hash = Math.random().toString(36).substring(7);
      const dataHoraAtual = new Date().toLocaleString();
      const emojiCoração = '❤️';

      const assinatura = `# Assinatura de Código de Amor\n# Remetente: ${nomeRemetente} ${emojiCoração}\n# Mensagem: ${mensagem}\n# Data e Hora: ${dataHoraAtual}\n# Assinatura: ${hash}`;

      return assinatura;
  }

  function enviarMensagemWhatsapp(numeroTelefone, mensagem) {
    const mensagemEncoded = encodeURIComponent(mensagem);
    const urlWhatsapp = `https://wa.me/${numeroTelefone}?text=${mensagemEncoded}`;
    
    const link = document.createElement('a');
    link.href = urlWhatsapp;
    link.target = '_blank';
    link.click();
  }
});