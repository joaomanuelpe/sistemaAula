import FormularioCategoria from "./Formularios/FormularioCategoria.jsx"
import Pagina from "../layouts/Pagina.jsx"
import TabelaCategorias from "./Tabelas/TabelaCategorias.jsx"
import { useState } from "react"
import { Alert } from "react-bootstrap"
import { categorias } from "../../dados/mockCategorias.js"


export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeCategorias, setListaDeCategorias] = useState(categorias);
    const [editarTabela, setEditarTabela] = useState(false);
    const [categoria, setCategoria] = useState({
        codigo: 0,
        descricao: ""
    });

    //método render
    return (
        <>
            <Pagina>
                <Alert className="text-center">
                    <h2>{exibirTabela ? "Categorias" : editarTabela ? "Alterar Categoria" : "Cadastrar Categoria"}</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias listaDeCategorias={listaDeCategorias} setListaDeCategorias={setListaDeCategorias} setExibirTabela={setExibirTabela} editarTabela={editarTabela} setEditarTabela={setEditarTabela} categoria={categoria} setCategoria={setCategoria} /> : <FormularioCategoria listaDeCategorias={listaDeCategorias} setListaDeCategorias={setListaDeCategorias} setExibirTabela={setExibirTabela} editarTabela={editarTabela} setEditarTabela={setEditarTabela} categoria={categoria} setCategoria={setCategoria} />
                }
            </Pagina>
        </>

    )
}