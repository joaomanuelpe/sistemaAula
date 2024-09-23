import { useState } from "react";
import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina"
import TabelaEntregador from "./Tabelas/TabelaEntregador"
import FormularioEntregador from "./Formularios/FormularioEntregador";
import { entregadores } from "../../dados/mockEntregadores";


export default function TelaCadastroEntregador(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeEntregadores, setListaEntregadores] = useState(entregadores);
    const [edicao, setEdicao] = useState(false);
    const [entregador, setEntregador] = useState(
        {
            id: 0,
            nome: "",
            cnh:"",
            veiculo:"",
            placa:"",
            capacidadeMax:0,
        }
    )


    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Entregadores" : edicao ? "Alterar Entregador" : "Cadastro de Entregador"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaEntregador listaDeEntregadores={listaDeEntregadores} setListaEntregadores={setListaEntregadores} setExibirTabela={setExibirTabela} entregador={entregador} setEntregador={setEntregador} edicao={edicao} setEdicao={setEdicao}/> : <FormularioEntregador listaDeEntregadores={listaDeEntregadores} setListaEntregadores={setListaEntregadores} setExibirTabela={setExibirTabela} entregador={entregador} setEntregador={setEntregador} edicao={edicao} setEdicao={setEdicao}/>
                }
            </Pagina>
        </>
    );
}