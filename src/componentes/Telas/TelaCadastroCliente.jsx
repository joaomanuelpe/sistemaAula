import React, { useState } from "react";
import FormularioCliente from "../Telas/Formularios/FormularioCliente.jsx"
import TabelaClientes from "./Tabelas/TabelaClientes.jsx";
import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import { clientes } from "../../dados/mockClientes.js"

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeClientes, setListaClientes] = useState(clientes);
    const [edicao, setEdicao] = useState(false);
    const [cliente, setCliente] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        bairro: "",
        rua: "",
        cidade: "",
        estado: ""

    })
    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Clientes" : edicao ? "Alterar Cliente" : "Cadastro de Cliente"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaClientes listaDeClientes={listaDeClientes} setListaClientes={setListaClientes} setExibirTabela={setExibirTabela} cliente={cliente} setCliente={setCliente} edicao={edicao} setEdicao={setEdicao}/> : <FormularioCliente listaDeClientes={listaDeClientes} setListaClientes={setListaClientes} setExibirTabela={setExibirTabela} cliente={cliente} setCliente={setCliente} edicao={edicao} setEdicao={setEdicao}/>
                }
            </Pagina>
        </>
    );
}