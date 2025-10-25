import { Mensagem } from "./classes/mensagem.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato") as HTMLFormElement | null;
  const msgAviso = document.getElementById("msgAviso") as HTMLElement | null;

  if (!form || !msgAviso) {
    console.error("⚠️ Elementos do formulário de contato não encontrados.");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = (document.getElementById("nome") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const mensagemTexto = (document.getElementById("mensagem") as HTMLTextAreaElement).value.trim();

    if (!nome || !email || !mensagemTexto) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    try {
      const novaMensagem = new Mensagem(nome, email, mensagemTexto);
      novaMensagem.salvar();

      msgAviso.textContent = "✅ Mensagem enviada com sucesso!";
      msgAviso.focus();
      msgAviso.classList.remove("oculto");

      form.reset();

      setTimeout(() => {
        msgAviso.textContent = "";
        msgAviso.classList.add("oculto");
      }, 4000);
    } catch (erro) {
      console.error("❌ Erro ao salvar mensagem:", erro);
      alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
    }
  });
});
