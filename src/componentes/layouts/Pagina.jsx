import Cabecalho from "./Cabecalho.jsx";
import Menu from "./Menu.jsx";
import TelaCadastro from "../Telas/TelaCadastroCategoria.jsx";
import { Alert } from "react-bootstrap";

export default function Pagina(props) {
    //método render
    return (
        <>
            <Alert className="text-center" variant="primary" style={{fontSize: "42px", fontWeight: "bolder"}}>
                <Cabecalho titulo="Sistema de Controle Gerencial" />
            </Alert>
            <Menu />
            {
                props.children
            }
        </>
    );
}