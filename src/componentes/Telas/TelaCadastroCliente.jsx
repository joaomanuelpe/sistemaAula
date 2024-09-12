import React, { useState } from "react";
import FormularioCliente from "../Telas/Formularios/FormularioCliente.jsx"
import TabelaClientes from "./Tabelas/TabelaClientes.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import { clientes } from "../../dados/mockClientes.js"

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>Cadastro de Cliente</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaClientes listaDeClientes={clientes} setExibirTabela={setExibirTabela}/> : <FormularioCliente setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
    );
}