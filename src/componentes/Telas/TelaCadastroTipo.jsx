import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap";
import TabelaTipo from "./Tabelas/TabelaTipo.jsx";
import FormularioTipo from "./Formularios/FormularioTipo.jsx";
import { useState } from "react";

export default function TelaCadastroTipo(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [edicao, setEdicao] = useState(false);
    const [tipo, setTipo] = useState({
        codigo: 0,
        tipo: "",
        adm:""
    });

    const usuarioAdm = props.usuAdm;
    console.log(usuarioAdm);

    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Tipos" : edicao ? "Alterar Tipo" : "Cadastrar Tipo"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaTipo usuarioAdm={usuarioAdm} setExibirTabela={setExibirTabela} tipo={tipo} setTipo={setTipo} edicao={edicao} setEdicao={setEdicao} /> :
                        <FormularioTipo setExibirTabela={setExibirTabela} tipo={tipo} setTipo={setTipo} edicao={edicao} setEdicao={setEdicao} />
                }
            </Pagina>
        </>
    );
}