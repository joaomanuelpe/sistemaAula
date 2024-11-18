import FormularioProduto from "./Formularios/FormularioProduto"
import { Alert } from "react-bootstrap";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { useEffect, useState } from "react";
import Pagina from "../../componentes/layouts/Pagina";

export default function TelaCadastroProduto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [edicao, setEdicao] = useState(false);
    const [produto, setProduto] = useState({
        codigo: 0,
        descricao: "",
        precoCusto: 0,
        precoVenda: 0,
        qtdEstoque: 0,
        urlImagem: "",
        dataValidade: "",
        categoria: {}
    });

    useEffect(()=>{
        consultarProduto().then((lista)=>{
            setListaProdutos(lista);
        });
    },[]); //listaVazia -> didMount

    return (
        <>
            <Pagina>
                <Alert className="mt-2 mb-2 text-center" variant="success">
                    <h2>{exibirTabela ? "Produtos" : edicao ? "Alterar Produto" : "Cadastrar Produto"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos setExibirTabela={setExibirTabela} edicao={edicao} setEdicao={setEdicao} produto={produto} setProduto={setProduto} /> : <FormularioProduto setExibirTabela={setExibirTabela} edicao={edicao} setEdicao={setEdicao} produto={produto} setProduto={setProduto} />
                }
            </Pagina>
        </>
    );
}