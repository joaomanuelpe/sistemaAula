import Pagina from "../layouts/Pagina";
import imagem404 from "../../assets/images/imagem404.webp"
import { Container } from "react-bootstrap";

export default function Tela404(props) {
    return (
        <Pagina>
            <Container>
                <img width={500} height={300} src={imagem404} alt="imagem 404 not found" />
                <h2 className="text-center">O recurso solicitado não existe!</h2>
            </Container>
        </Pagina>
    )
}