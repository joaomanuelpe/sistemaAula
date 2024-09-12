import FormularioCategoria from "./Formularios/FormularioCategoria.jsx"
import Pagina from "../layouts/Pagina.jsx"
import TabelaCategorias from "./Tabelas/TabelaCategorias.jsx"
import { useState } from "react"
import { Alert } from "react-bootstrap"
import { categorias } from "../../dados/mockCategorias.js"


export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    //método render
    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>Cadastro de Categoria</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias listaDeCategorias={categorias} setExibirTabela={setExibirTabela}/> : <FormularioCategoria setExibirTabela={setExibirTabela}/>
                }
            </Pagina>
        </>
        
    )
}