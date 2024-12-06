const urlBase = "https://backend-lp-2.vercel.app/produtos";

function prepararProdutoParaEdicao(produto) {
    return {
        ...produto,
        dataValidade: produto.dataValidade
            ? produto.dataValidade.split("T")[0] 
            : "",
    };
}

// Função para gravar um novo produto
export async function gravarProduto(produto) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    });
    return resposta.json();
}

export async function alterarProduto(produto) {
    const resposta = await fetch(urlBase + "/" + produto.codigo, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            descricao: produto.descricao,
            precoCusto: produto.precoCusto,
            precoVenda: produto.precoVenda,
            qtdEstoque: produto.qtdEstoque,
            urlImagem: produto.urlImagem,
            dataValidade: produto.dataValidade.split("T")[0],
            categoria: { codigo: produto.categoria.codigo },
            fornecedor: { cnpj: produto.fornecedor.cnpj},
        }),
    })
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirProduto(produto) {
    const resposta = await fetch(`${urlBase}/${produto.codigo}`, {
        method: "DELETE",
    });
    return resposta.json();
}

export async function consultarProduto() {
    const resposta = await fetch(urlBase, {
        method: "GET",
    });
    return resposta.json();
}