const urlBase = "https://backend-lp-2.vercel.app/produtos";

export async function gravarProduto(categoria) {
    const resposta = await fetch(urlBase, {
        "method":"POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body":JSON.stringify(categoria)
    });
    const resultado = await resposta.json();
    return resultado;
}

export function alterarProduto(produto) {
    return fetch(`https://backend-lp-2.vercel.app/produtos/${produto.codigo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            descricao: produto.descricao,
            precoCusto: produto.precoCusto,
            precoVenda: produto.precoVenda,
            qtdEstoque: produto.qtdEstoque,
            urlImagem: produto.urlImagem,
            dataValidade: produto.dataValidade,
            categoria: { codigo: produto.categoria.codigo }
        }),
    })
    .then((resposta) => resposta.json())
    .catch((erro) => {
        throw new Error("Erro ao atualizar o produto: " + erro.message);
    });
}


export async function excluirProduto(categoria) {
    const resposta = await fetch(urlBase + "/" + categoria.codigo, {
        "method":"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarProduto() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}