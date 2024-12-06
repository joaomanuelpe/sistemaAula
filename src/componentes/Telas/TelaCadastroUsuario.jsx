import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import TabelaUsuario from "./Tabelas/TabelaUsuario.jsx";
import FormularioUsuario from "./Formularios/FormularioUsuario.jsx";
import { useState } from "react";
import { usuarios } from "../../dados/mockUsuarios.js";

export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeUsuarios, setListaUsuarios] = useState(usuarios);
    const [edicao, setEdicao] = useState(false);
    const [usuario, setUsuario] = useState({
        codigo: 0,
        nome: "",
        senha: "",
        email: "",
        dataNascimento: "",
        tipo: ""
    });

    const usuarioAdm = props.usuAdm;
    console.log(usuarioAdm);

    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Usuários" : edicao ? "Alterar Usuário" : "Cadastrar Usuário"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuario usuarioAdm = {usuarioAdm} listaDeUsuarios={listaDeUsuarios} setListaUsuarios={setListaUsuarios} setExibirTabela={setExibirTabela} usuario={usuario} setUsuario={setUsuario} edicao={edicao} setEdicao={setEdicao} /> : <FormularioUsuario listaDeUsuarios={listaDeUsuarios} setListaUsuarios={setListaUsuarios} setExibirTabela={setExibirTabela} usuario={usuario} setUsuario={setUsuario} edicao={edicao} setEdicao={setEdicao} />
                }
            </Pagina>
        </>
    );
}