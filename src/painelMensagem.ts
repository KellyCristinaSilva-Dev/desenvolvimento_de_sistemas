import { Mensagem } from "./classes/mensagem.js";

document.addEventListener("DOMContentLoaded", () => {
  const logado = localStorage.getItem("usuarioLogado");
  if (!logado) {
    alert("Acesso restrito! Faça login para continuar.");
    window.location.href = "areaRestrita.html";
    return;
  }

  const tabela = document.getElementById("tabelaMensagens") as HTMLTableElement | null;
  const msgAviso = document.getElementById("msgAviso") as HTMLElement | null;
  const btnLimpar = document.getElementById("limparTudo") as HTMLButtonElement | null;

  if (!tabela || !msgAviso || !btnLimpar) {
    console.error("⚠️ Elementos da página não encontrados.");
    return;
  }

  const carregarMensagens = (): void => {
    const mensagens = Mensagem.listar();
    const corpo = tabela.querySelector("tbody");

    if (!corpo) return;
    corpo.innerHTML = "";

    if (mensagens.length === 0) {
      msgAviso.textContent = "Nenhuma mensagem encontrada.";
      msgAviso.style.display = "block";
      tabela.style.display = "none";
      return;
    }

    msgAviso.style.display = "none";
    tabela.style.display = "table";

    mensagens.forEach((msg, index) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${msg.nome}</td>
        <td>${msg.email}</td>
        <td>${msg.mensagem}</td>
        <td>${msg.data}</td>
        <td>
          <button class="excluir" data-index="${index}">🗑 Excluir</button>
        </td>
      `;
      corpo.appendChild(linha);
    });
  };

  tabela.addEventListener("click", (e) => {
    const alvo = e.target as HTMLElement;
    if (alvo.classList.contains("excluir")) {
      const index = Number(alvo.getAttribute("data-index"));
      Mensagem.excluir(index);
      carregarMensagens();
    }
  });

  btnLimpar.addEventListener("click", () => {
    if (confirm("Deseja realmente apagar todas as mensagens?")) {
      Mensagem.limparTudo();
      carregarMensagens();
    }
  });

  carregarMensagens();
});
