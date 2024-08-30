import Cabecalho from "./Cabecalho.jsx";
import Menu from "./Menu.jsx";

export default function Pagina(props) {
    //método render
    return (
        <>
            <Cabecalho titulo="Sistema de Controle Gerencial" />
            <Menu />
            {
                props.children
            }
        </>
    );
}