const urlBase = "https://backend-lp-2.vercel.app/tipos";

/*function prepararProdutoParaEdicao(produto) {
    return {
        ...produto,
        dataNascimento: produto.dataNascimento
            ? produto.dataNascimento.split("T")[0] 
            : "",
    };
}*/

// Função para gravar um novo produto
export async function gravarTipo(tipo) {
    console.log(tipo);
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tipo),
    });
    return resposta.json();
}

export async function alterarTipo(tipo) {
    console.log(tipo)
    const resposta = await fetch(urlBase + "/" + tipo.codigo, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tipo: tipo.tipo,
            adm: tipo.adm
        }),
    })
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirTipo(tipo) {
    const resposta = await fetch(`${urlBase}/${tipo.codigo}`, {
        method: "DELETE",
    });
    return resposta.json();
}

export async function consultarTipo() {
    const resposta = await fetch(urlBase, {
        method: "GET",
    });
    return resposta.json();
}