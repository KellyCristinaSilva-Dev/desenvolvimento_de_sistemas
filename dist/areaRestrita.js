"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    const campoEmail = document.getElementById("email");
    const campoSenha = document.getElementById("senha");
    const botaoMostrarSenha = document.getElementById("mostrar-senha");
    const mensagem = document.getElementById("mensagem");
    if (!formLogin || !campoEmail || !campoSenha || !mensagem) {
        console.error("⚠️ Elementos do formulário não encontrados.");
        return;
    }
    // 🔹 Função para mostrar/ocultar a senha
    if (botaoMostrarSenha && campoSenha) {
        botaoMostrarSenha.addEventListener("click", () => {
            const senhaVisivel = campoSenha.type === "text";
            campoSenha.type = senhaVisivel ? "password" : "text";
            botaoMostrarSenha.setAttribute("aria-pressed", senhaVisivel ? "false" : "true");
            botaoMostrarSenha.textContent = senhaVisivel ? "👁" : "🙈"; // Alterna ícone visual
        });
    }
    // 🔹 Validação e login
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = campoEmail.value.trim();
        const senha = campoSenha.value.trim();
        // Limpa mensagem anterior
        mensagem.textContent = "";
        mensagem.classList.remove("sucesso", "erro");
        // ✅ Login simples de teste: admin / 123
        if (usuario === "admin" && senha === "123") {
            localStorage.setItem("usuarioLogado", "true");
            // Mensagem acessível ao NVDA
            mensagem.textContent = "✅ Login realizado com sucesso! Redirecionando...";
            mensagem.classList.add("sucesso");
            mensagem.focus();
            // Aguarda 1,5s e redireciona automaticamente
            setTimeout(() => {
                window.location.href = "painelMensagem.html";
            }, 1500);
        }
        else {
            // Mensagem de erro também acessível
            mensagem.textContent = "❌ Usuário ou senha incorretos. Tente novamente.";
            mensagem.classList.add("erro");
            mensagem.focus();
        }
    });
});
