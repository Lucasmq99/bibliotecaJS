class EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.codigo = codigo;
        this.emprestado = false;
        this.usuarioEmprestimo = null;
    }

    emprestar(usuario) {
        if (!this.emprestado) {
            this.emprestado = true;
            this.usuarioEmprestimo = usuario;
            console.log(`"${this.titulo}" foi emprestado para ${usuario.nome}`);
        } else {
            console.log(`"${this.titulo}"  ja está emprestado. `);
        }
    }

    devolver() {
        if (this.emprestado) {
            this.emprestado = false;
            this.usuarioEmprestimo = null;
            console.log(`"${this.titulo}" foi devolvido. `);
        } else {
            console.log(`"${this.titulo}" ja está disponível. `);
        }
    }
}

class Livro extends EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo, genero) {
        super(titulo, autor, anoPublicacao, codigo);
            this.genero = genero;
          }

    informacoes() {
        console.log(`Livro: ${this.titulo}, Autor: ${this.autor}, Ano ${this.anoPublicacao}, Gênero: ${this.genero}`);

    }
}

class Revista extends EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo, edicao) {
        super(titulo, autor, anoPublicacao, codigo);
        this.edicao = edicao;
    }

    informacoes() {
        console.log(`Revista: ${this.titulo}, Autor: ${this.autor}, Ano: ${this.anoPublicacao}, Edição: ${this.edicao}`);
    }
}

class Usuario {
    constructor(nome, registroAcademico, dataNascimento) {
        this.nome = nome;
        this.registroAcademico = registroAcademico;
        this.dataNascimento = dataNascimento;
    }
}

class Biblioteca {

    constructor() {
        this.acervo = [];
        this.usuarios = [];
    }

    popularAcervo(acervo) {
        acervo.forEach(item => {
            if (item.EntidadeBibliografica === "Livro") {
                this.acervo.push(new Livro(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.genero))
            } else if (item.EntidadeBibliografica === "Revista") {
                this.acervo.push(new Revista(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.edicao))
            }
        })
    }

    adicionarItem(item) {
        this.acervo.push(item);
        console.log(`"${item.titulo}" foi adicionado ao acervo. `);
    }

    listarAcervo() {
        console.log("Acervo da Biblioteca: ");
        if (this.acervo.length == 0) {
            console.log(`Acervo vazio.`);
        }
        else {
            this.acervo.forEach(item => {
                const infoUsuario = item.usuarioEmprestimo
                    ? `Emprestado para: ${item.usuarioEmprestimo.nome}` : `Disponivel`;
                console.log(`-> ${item.titulo} (Código: ${item.codigo})`)
            });
        }
    }

    adicionarUsuario(usuario) {
        this.usuarios.push(usuario);
        console.log(`Usuário "${usuario.nome}" foi adicionado à Biblioteca. `);
    }

    emprestarItem(codigo, registroAcademico) {
        const item = this.acervo.find(item => item.codigo === codigo);

        if (item) {
            const usuarioEmprestimo = this.usuarios.find(usuario => usuario.registroAcademico === registroAcademico);

            if (usuarioEmprestimo) {
                item.emprestar(usuarioEmprestimo);
                console.log("Livro emprestado com sucesso!");
            } else {
                console.log(`Usuário com registro acadêmico ${registroAcademico} não encontrado.`);
            }
        } else {
            console.log(`Item com código ${codigo} não encontrado no acervo.`);
        }
    }

    devolverItem(codigo) {
        const item = this.acervo.find(item => item.codigo === codigo);

        if (item) {
            item.devolver();
            console.log("Livro devolvido com sucesso!");
            confirm("O item foi devolvido.");
        } else {
            console.log(`Item com código ${codigo} não encontrado no acervo. `)
        }
    }
}

