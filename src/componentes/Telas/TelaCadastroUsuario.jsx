import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import TabelaUsuario from "./Tabelas/TabelaUsuario.jsx";
import FormularioUsuario from "./Formularios/FormularioUsuario.jsx";
import { useState } from "react";
import { usuarios } from "../../dados/mockUsuarios.js"


export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaUsuarios] = useState(usuarios);
    const [edicao, setEdicao] = useState(false);
    const [usuario, setUsuario] = useState({
        nome: "",
        senha: "",
        email: "",
        dtNascimento: ""

    })


    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Usuários" : edicao ? "Alterar Usuário" : "Cadastrar Usuário"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuario listaDeUsuarios={listaDeUsuarios} setListaUsuarios={setListaUsuarios} setExibirTabela={setExibirTabela} usuario={usuario} setUsuario={setUsuario} edicao={edicao} setEdicao={setEdicao} /> : <FormularioUsuario listaDeUsuarios={listaDeUsuarios} setListaUsuarios={setListaUsuarios} setExibirTabela={setExibirTabela} usuario={usuario} setUsuario={setUsuario} edicao={edicao} setEdicao={setEdicao} />
                }
            </Pagina>
        </>
    );
}