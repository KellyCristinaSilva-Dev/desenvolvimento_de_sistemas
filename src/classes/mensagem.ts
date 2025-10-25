export class Mensagem {
    nome: string;
    email: string;
    mensagem: string;
    data: string;

    constructor(nome: string, email: string, mensagem: string, data?: string) {
        this.nome = nome;
        this.email = email;
        this.mensagem = mensagem;
        // Permite passar a data ao recriar a instância. Se não passar, usa data atual.
        this.data = data || new Date().toLocaleString("pt-BR");
    }

    salvar(): void {
        const lista = Mensagem.listar();
        lista.push(this);
        localStorage.setItem("mensagensIBC", JSON.stringify(lista));
    }

    static listar(): Mensagem[] {
        const lista = JSON.parse(localStorage.getItem("mensagensIBC") || "[]");
        // Transforma objetos puros em instâncias da classe Mensagem
        return lista.map((item: any) =>
            new Mensagem(item.nome, item.email, item.mensagem, item.data)
        );
    }

    static excluir(index: number): void {
        const lista = Mensagem.listar();
        if (index >= 0 && index < lista.length) {
            lista.splice(index, 1);
            localStorage.setItem("mensagensIBC", JSON.stringify(lista));
        }
    }

    static limparTudo(): void {
        localStorage.removeItem("mensagensIBC");
    }
}
