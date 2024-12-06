const urlBase = "https://backend-lp-2.vercel.app/usuarios";

/*function prepararProdutoParaEdicao(produto) {
    return {
        ...produto,
        dataNascimento: produto.dataNascimento
            ? produto.dataNascimento.split("T")[0] 
            : "",
    };
}*/

// Função para gravar um novo produto
export async function gravarUsuario(usuario) {
    console.log(usuario);
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
    });
    console.log(usuario);
    return resposta.json();
}

export async function alterarUsuario(usuario) {
    console.log(usuario)
    const resposta = await fetch(urlBase + "/" + usuario.codigo, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: usuario.nome,
            senha: usuario.senha,
            email: usuario.email,
            dataNascimento: usuario.dataNascimento.split("T")[0],
            tipo: {codigo: usuario.tipo.codigo}
        }),
    })
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirUsuario(usuario) {
    const resposta = await fetch(`${urlBase}/${usuario.codigo}`, {
        method: "DELETE",
    });
    return resposta.json();
}

export async function consultarUsuario() {
    const resposta = await fetch(urlBase, {
        method: "GET",
    });
    return resposta.json();
}