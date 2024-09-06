import Pagina from "../layouts/Pagina";

import imagem404 from "../../assets/images/imagem404.webp"
import { Container } from "react-bootstrap";
export default function Tela404(props) {
    return (
        <Pagina>
            <Container>
                <img src={imagem404} alt="imagem 404 not found" />
                <h1 className="text-center">O recurso solicitado não existe!</h1>
            </Container>
        </Pagina>
    )
}