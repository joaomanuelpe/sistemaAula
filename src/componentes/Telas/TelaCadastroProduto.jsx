import FormularioProduto from "./Formularios/FormularioProduto"
import { Alert } from "react-bootstrap";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { useState } from "react";
import Pagina from "../../componentes/layouts/Pagina"
import { produtos } from "../../dados/mockProdutos"

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaProdutos, setListaProdutos] = useState(produtos);
    const [edicao, setEdicao] = useState(false);
    const [produto, setProduto] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        estoque: 0,
        urlImagem: "",
        dtValidade: ""
    });
    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Produtos" : edicao ? "Alterar Produto" : "Cadastrar Produto"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaDeProdutos={listaProdutos} setListaProdutos={setListaProdutos} setExibirTabela={setExibirTabela} edicao={edicao} setEdicao={setEdicao} produto={produto} setProduto={setProduto} /> : <FormularioProduto listaDeProdutos={listaProdutos} setListaProdutos={setListaProdutos} setExibirTabela={setExibirTabela} edicao={edicao} setEdicao={setEdicao} produto={produto} setProduto={setProduto} />
                }
            </Pagina>
        </>
    );
}