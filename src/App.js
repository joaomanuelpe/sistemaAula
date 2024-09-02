import { Container } from "react-bootstrap";
import Pagina from "./componentes/layouts/Pagina.jsx";
import TelaCadastro from "./componentes/layouts/TelaCadastro.jsx";

function App() {
  return (
    <div className="App">
      <Container>
        <Pagina>
          <TelaCadastro />
        </Pagina>
      </Container>
    </div>
  );
}

export default App;
