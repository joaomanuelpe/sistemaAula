import FormularioProduto from "./Formularios/FormularioProduto"
import { Alert } from "react-bootstrap";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { useState } from "react";
import Pagina from "../../componentes/layouts/Pagina"
import { produtos } from "../../dados/mockProdutos"

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>Cadastro de Produto</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaDeProdutos={produtos} setExibirTabela={setExibirTabela}/> : <FormularioProduto setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
    );
}