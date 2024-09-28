import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria.jsx";
import TelaMenu from "./componentes/Telas/TelaMenu.jsx";
import Tela404 from "./componentes/Telas/Tela404.jsx";
import TelaCadastroCliente from "./componentes/Telas/TelaCadastroCliente.jsx";
import TelaCadastroForn from "./componentes/Telas/TelaCadastroForn.jsx";
import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto.jsx";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario.jsx";
import TelaCadastroEntregador from "./componentes/Telas/TelaCadastroEntregador.jsx";
import TelaSobre from "./componentes/Telas/TelaSobre.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {
          //A ordem das rotas é importante
        }
        <Routes>
          <Route path="/cliente" element={<TelaCadastroCliente />} />
          <Route path="/fornecedor" element={<TelaCadastroForn />} />
          <Route path="/produto" element={<TelaCadastroProduto />} />
          <Route path="/categoria" element={<TelaCadastroCategoria />} />
          <Route path="/usuario" element={<TelaCadastroUsuario />}/>
          <Route path="/entregador" element={<TelaCadastroEntregador />}/>
          <Route path="/sobre" element={<TelaSobre />}/>
          <Route path="/" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
