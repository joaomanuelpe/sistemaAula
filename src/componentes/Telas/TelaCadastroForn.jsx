import React, { useState } from "react";
import FormularioForn from "../Telas/Formularios/FormularioForn.jsx"
import TabelaFornecedor from "./Tabelas/TabelaFornecedor.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import { fornecedores } from "../../dados/mockFornecedores.js"

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>Cadastro de Fornecedor</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaFornecedor listaDeFornecedores={fornecedores} setExibirTabela={setExibirTabela}/> : <FormularioForn setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
    );
}