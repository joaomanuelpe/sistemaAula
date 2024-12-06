import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaCadastroCategoria from "./componentes/Telas/TelaCadastroCategoria.jsx";
import TelaMenu from "./componentes/Telas/TelaMenu.jsx";
import TelaCadastroCliente from "./componentes/Telas/TelaCadastroCliente.jsx";
import TelaCadastroForn from "./componentes/Telas/TelaCadastroForn.jsx";
import TelaCadastroProduto from "./componentes/Telas/TelaCadastroProduto.jsx";
import TelaCadastroUsuario from "./componentes/Telas/TelaCadastroUsuario.jsx";
import TelaCadastroEntregador from "./componentes/Telas/TelaCadastroEntregador.jsx";
import TelaCadastroTipo from "./componentes/Telas/TelaCadastroTipo.jsx";
import TelaSobre from "./componentes/Telas/TelaSobre.jsx";
import TelaLogin from "./componentes/Telas/TelaLogin.jsx";
import { useState, createContext , useEffect } from "react";
import store from "./redux/store.js";
import { Provider } from "react-redux";

export const ContextoUsuario = createContext();
function App() {
  const [usuAdm, setUsuAdm] = useState(false);
  const [usuario, setUsuario] = useState({
    usuario: "",
    logado: false,
    tipo:""
  });

  useEffect(() => {
    if (usuario.tipo.adm === 'sim') {
      setUsuAdm(true);
    } else {
      setUsuAdm(false);
    }
  }, [usuario]);
  
  return (
    <Provider store={store}>
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        {usuario.logado ? (
          <BrowserRouter>
            <Routes>
              <Route path="/cliente" element={<TelaCadastroCliente usuAdm={usuAdm}/>} />
              <Route path="/fornecedor" element={<TelaCadastroForn usuAdm={usuAdm}/>} />
              <Route path="/produto" element={<TelaCadastroProduto usuAdm={usuAdm}/>} />
              <Route path="/categoria" element={<TelaCadastroCategoria usuAdm={usuAdm}/>} />
              <Route path="/login" element={<TelaLogin />} />
              <Route path="/usuario" element={<TelaCadastroUsuario usuAdm={usuAdm}/>} />
              <Route path="/entregador" element={<TelaCadastroEntregador usuAdm={usuAdm}/>} />
              <Route path="/tipo" element={<TelaCadastroTipo usuAdm={usuAdm}/>} />
              <Route path="/sobre" element={<TelaSobre />} />
              <Route path="*" element={<TelaMenu />} />
              {/* <Route path="*" element={<Tela404 />} /> */}
            </Routes>
          </BrowserRouter>
        ) : (
          <TelaLogin />
        )}
      </ContextoUsuario.Provider>
    </Provider>
  );
}

export default App;
