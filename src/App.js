import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria.jsx";
import TelaMenu from "./componentes/Telas/TelaMenu.jsx";
import TelaCadastroCliente from "./componentes/Telas/TelaCadastroCliente.jsx";
import TelaCadastroForn from "./componentes/Telas/TelaCadastroForn.jsx";
import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto.jsx";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario.jsx";
import TelaCadastroEntregador from "./componentes/Telas/TelaCadastroEntregador.jsx";
import TelaSobre from "./componentes/Telas/TelaSobre.jsx";
import TelaLogin from "./componentes/Telas/TelaLogin.jsx";
import { useState, createContext } from "react";
import store from "./redux/store.js";
import { Provider } from "react-redux";

export const ContextoUsuario = createContext();

function App() {

  const [usuario, setUsuario] = useState({
    "usuario": "",
    "logado": false
  });

  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <TelaLogin />
      </ContextoUsuario.Provider>
    );
  } else {
    return (
      <div className="App">
        <Provider store={store}>
          <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
            <BrowserRouter>
              {
                //A ordem das rotas é importante
              }
              <Routes>
                <Route path="/cliente" element={<TelaCadastroCliente />} />
                <Route path="/fornecedor" element={<TelaCadastroForn />} />
                <Route path="/produto" element={<TelaCadastroProduto />} />
                <Route path="/categoria" element={<TelaCadastroCategoria />} />
                <Route path="/login" element={<TelaLogin />} />
                <Route path="/usuario" element={<TelaCadastroUsuario />} />
                <Route path="/entregador" element={<TelaCadastroEntregador />} />
                <Route path="/sobre" element={<TelaSobre />} />
                <Route path="*" element={<TelaMenu />} />
                {/* <Route path="*" element={<Tela404 />} /> */}
              </Routes>
            </BrowserRouter>
          </ContextoUsuario.Provider>
        </Provider>
      </div>
    );
  }


}

export default App;
