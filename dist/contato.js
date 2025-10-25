import { Mensagem } from "./classes/mensagem.js";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contato");
    const msgAviso = document.getElementById("mensagemAviso");
    if (!form || !msgAviso) {
        console.error("⚠️ Elementos do formulário de contato não encontrados.");
        return;
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagemTexto = document.getElementById("mensagem").value.trim();
        if (!nome || !email || !mensagemTexto) {
            alert("Por favor, preencha todos os campos antes de enviar.");
            return;
        }
        try {
            // Cria e salva a mensagem
            const novaMensagem = new Mensagem(nome, email, mensagemTexto);
            novaMensagem.salvar();
            // Exibe confirmação
            msgAviso.textContent = "✅ Mensagem enviada com sucesso!";
            msgAviso.focus();
            msgAviso.classList.remove("oculto");
            // Limpa os campos
            form.reset();
            // Oculta a mensagem após 4 segundos
            setTimeout(() => {
                msgAviso.textContent = "";
                msgAviso.classList.add("oculto");
            }, 4000);
        }
        catch (erro) {
            console.error("❌ Erro ao salvar mensagem:", erro);
            alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
        }
    });
});
