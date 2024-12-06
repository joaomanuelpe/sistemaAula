import { Container, Form } from "react-bootstrap";
import { useContext, useRef } from "react";
import { ContextoUsuario } from "../../App";
import imagemFundo from "../../assets/images/imagemFundo.webp";
import Button from "../Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarUsuarios } from "../../redux/usuarioReducer";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function TelaLogin() {
  const { listaDeUsuarios } = useSelector((state) => state.usuario);
  const despachante = useDispatch();

  useEffect(() => {
    despachante(buscarUsuarios());
  }, [despachante]);

  const { usuario, setUsuario } = useContext(ContextoUsuario);
  const nomeUsuario = useRef();
  const senha = useRef();

  // function buscarEmListaUsuarios(listaDeUsuarios, usuario, senha) {
  //   for (let i = 0; i < listaDeUsuarios.length; i++) {
  //     if (
  //       listaDeUsuarios[i].nome === usuario &&
  //       listaDeUsuarios[i].senha === senha
  //     )
  //       return true;
  //   }
  //   return false;
  // }

  function buscarEmListaUsuarios(listaDeUsuarios, usuario, senha) {
    for (let i = 0; i < listaDeUsuarios.length; i++) {
      if (
        listaDeUsuarios[i].nome === usuario &&
        listaDeUsuarios[i].senha === senha
      ) {
        return listaDeUsuarios[i]; // Retorna o objeto completo do usuário
      }
    }
    return null; // Retorna null se não encontrar
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
  
    const usuarioDigitado = nomeUsuario.current.value;
    const senhaDigitada = senha.current.value;
    const usuarioEncontrado = buscarEmListaUsuarios(
      listaDeUsuarios,
      usuarioDigitado,
      senhaDigitada
    );
  
    console.log(usuarioEncontrado)
    if (usuarioEncontrado) {
      setUsuario({
        usuario: usuarioEncontrado.nome, // Nome do usuário
        logado: true,
        tipo: usuarioEncontrado.tipo, // Tipo completo, incluindo adm
      });
    } else {
      toast.error("Usuário inválido!");
    }
  }
  

  return (
    <div
      className="vh-100 vw-100 position-fixed top-0 start-0"
      style={{
        backgroundImage: `url(${imagemFundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <div
          className="rounded-3 p-4 bg-light border shadow-lg"
          style={{
            width: "400px",
            maxWidth: "90%",
            backgroundColor: "rgba(255, 255, 255, 0.95) !important",
          }}
        >
          <div className="text-center mb-4">
            <h1 className="display-6 fw-bold mb-4">LOGIN</h1>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Usuário:</Form.Label>
              <Form.Control
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Informe o nome de usuário"
                ref={nomeUsuario}
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Senha:</Form.Label>
              <Form.Control
                type="password"
                id="senha"
                name="senha"
                placeholder="Informe a senha"
                ref={senha}
                className="py-2"
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button>Confirmar</Button>
            </div>
          </Form>
        </div>
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
