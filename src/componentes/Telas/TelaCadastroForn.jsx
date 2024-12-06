import React, { useState } from "react";
import FormularioForn from "../Telas/Formularios/FormularioForn.jsx"
import TabelaFornecedor from "./Tabelas/TabelaFornecedor.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import { fornecedores } from "../../dados/mockFornecedores.js";
import TabelaProdForn from "./Tabelas/TabelaProdForn.jsx";

export default function TelaCadastroForn(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeFornecedores, setListaDeFornecedores] = useState(fornecedores);
    const [edicao, setEdicao] = useState(false);
    const [fornecedor, setFornecedor] = useState({
        nome: "",
        cnpj: "",
        telefone: "",
        bairro: "",
        rua: "",
        cidade: "",
        estado: "",
        cep:""
    });
    const [exibirTabelaProdForn, setExibirTabelaProdForn] = useState(false);
    const [produtosDesteFornecedor, setProdutosDesteFornecedor] = useState([]);
    const usuarioAdm = props.usuAdm;
    console.log(usuarioAdm);

    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Fornecedores" : edicao ? "Alterar Fornecedor" : "Cadastrar Fornecedor"}</h2>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaFornecedor 
                    usuarioAdm ={usuarioAdm}
                    listaDeFornecedores={listaDeFornecedores} 
                    setListaDeFornecedores={setListaDeFornecedores} 
                    setExibirTabela={setExibirTabela} 
                    edicao={edicao} 
                    setEdicao={setEdicao} 
                    fornecedor={fornecedor} 
                    setFornecedor={setFornecedor} 
                    produtosDesteFornecedor={produtosDesteFornecedor} 
                    setProdutosDesteFornecedor={setProdutosDesteFornecedor} 
                    setExibirTabelaProdForn={setExibirTabelaProdForn} 
                  /> : exibirTabelaProdForn ? <TabelaProdForn edicao={edicao} setEdicao={setEdicao} setExibirTabela={setExibirTabela} exibirTabelaProdForn = {exibirTabelaProdForn} setExibirTabelaProdForn={setExibirTabelaProdForn} produtosDesteFornecedor = {produtosDesteFornecedor} setProdutosDesteFornecedor={setProdutosDesteFornecedor} fornecedor={fornecedor} setFornecedor={setFornecedor}/> : <FormularioForn listaDeFornecedores={listaDeFornecedores} setListaDeFornecedores={setListaDeFornecedores} setExibirTabela={setExibirTabela} edicao={edicao} setEdicao={setEdicao} fornecedor={fornecedor} setFornecedor={setFornecedor} produtosDesteFornecedor = {produtosDesteFornecedor} setProdutosDesteFornecedor={setProdutosDesteFornecedor}
                  setExibirTabelaProdForn={setExibirTabelaProdForn}/>
                }
            </Pagina>
        </>
    );
}