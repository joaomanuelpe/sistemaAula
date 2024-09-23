import React, { useState } from "react";
import FormularioForn from "../Telas/Formularios/FormularioForn.jsx"
import TabelaFornecedor from "./Tabelas/TabelaFornecedor.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import { fornecedores } from "../../dados/mockFornecedores.js"

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeFornecedores, setListaDeFornecedores] = useState(fornecedores);
    const [edicao, setEdicao] = useState(false);
    const [fornecedor, setFornecedor] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        bairro: "",
        rua: "",
        cidade: "",
        estado: ""
    });

    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Fornecedores" : edicao ? "Alterar Fornecedor" : "Cadastrar Fornecedor"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaFornecedor listaDeFornecedores={listaDeFornecedores} setListaDeFornecedores={setListaDeFornecedores} setExibirTabela={setExibirTabela} edicao={edicao} setEdicao={setEdicao} fornecedor={fornecedor} setFornecedor={setFornecedor} /> : <FormularioForn listaDeFornecedores={listaDeFornecedores} setListaDeFornecedores={setListaDeFornecedores} setExibirTabela={setExibirTabela} edicao={edicao} setEdicao={setEdicao} fornecedor={fornecedor} setFornecedor={setFornecedor} />
                }
            </Pagina>
        </>
    );
}