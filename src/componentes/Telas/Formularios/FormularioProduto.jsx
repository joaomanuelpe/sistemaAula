import {
  Container,
  Spinner,
  Button,
  Col,
  Form,
  Row,
  Alert,
} from "react-bootstrap";
import { consultarCategoria } from "../../../services/servicoCategoria.js";
import { useState, useEffect } from "react";
import { incluirProduto , atualizarProduto } from "../../../redux/produtoReducer.js";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../../redux/estados.js";

export default function FormularioProduto(props) {
  const [categorias, setCategorias] = useState([]);
  const [temCategorias, setTemCategorias] = useState(false);
  const { estado, mensagem } = useSelector((state) => state.produto);
  const despachante = useDispatch();

  const produtoInicial = {
    codigo: 0,
    descricao: "",
    precoCusto: 0,
    precoVenda: 0,
    qtdEstoque: 0,
    urlImagem: "",
    dataValidade: "",
    categoria: {},
  };
  const produtoAlterar = props.edicao ? props.produto : produtoInicial;
  const [produto, setProduto] = useState(produtoAlterar);
  const [formValidado, setFormValidado] = useState(false);

  useEffect(() => {
    consultarCategoria()
      .then((resultado) => {
        if (Array.isArray(resultado)) {
          setCategorias(resultado);
          setTemCategorias(true);
        } else {
          toast.error("Não foi possível carregar as categorias");
        }
      })
      .catch((erro) => {
        setTemCategorias(false);
        toast.error(erro.message);
      });
  }, []);

  function selecionarCategoria(event) {
    setProduto({
      ...produto,
      categoria: { codigo: event.currentTarget.value },
    });
  }

  function handleSubmit(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        despachante(atualizarProduto(produto));
        toast.success("Produto atualizado com sucesso!");
      } else {
        despachante(incluirProduto(produto));
        toast.success("Produto cadastrado com sucesso!");
      }
      props.setExibirTabela(true);
      setProduto(produtoInicial);
      setFormValidado(false);
    } else {
      setFormValidado(true);
    }

    evento.preventDefault();
    evento.stopPropagation();
}


function changeControl(evento) {
    const elemento = evento.target.id;
    const valor = evento.target.value;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [elemento]: valor,
    }));
  }
  

  if (estado === ESTADO.PENDENTE) {
    return (
      <div>
        <Spinner animation="border" role="status"></Spinner>
        <Alert variant="primary">{mensagem}</Alert>
      </div>
    );
  } else if (estado === ESTADO.ERRO) {
    return (
      <div>
        <Alert variant="danger">{mensagem}</Alert>
        <Button
          onClick={() => {
            props.setExibirTabela(true);
            props.setEdicao(false);
          }}
        >
          Voltar
        </Button>
      </div>
    );
  } else {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "linear-gradient(to top, #F5BFAE, #F5EDBF)",
        }}
      >
        <Container
          style={{
            padding: "30px",
            backgroundColor: "#FFFFFF",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <Form noValidate validated={formValidado} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                required
                type="number"
                id="codigo"
                name="codigo"
                value={produto.codigo}
                placeholder="Código do Produto"
                onChange={changeControl}
                disabled={props.edicao}
                style={{ borderRadius: "8px" }}
              />
              <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                required
                id="descricao"
                name="descricao"
                type="text"
                value={produto.descricao}
                onChange={changeControl}
                placeholder="Descrição do Produto"
                style={{ borderRadius: "8px" }}
              />
              <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Preço de Custo</Form.Label>
                  <Form.Control
                    id="precoCusto"
                    name="precoCusto"
                    onChange={changeControl}
                    value={produto.precoCusto}
                    type="number"
                    placeholder="R$ XXX.XX"
                    required
                    style={{ borderRadius: "8px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor forneça este campo.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Preço de Venda</Form.Label>
                  <Form.Control
                    id="precoVenda"
                    name="precoVenda"
                    onChange={changeControl}
                    value={produto.precoVenda}
                    type="number"
                    placeholder="R$ XXX.XX"
                    required
                    style={{ borderRadius: "8px" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor forneça este campo.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Estoque</Form.Label>
              <Form.Control
                id="qtdEstoque"
                name="qtdEstoque"
                onChange={changeControl}
                value={produto.qtdEstoque}
                type="number"
                required
                style={{ borderRadius: "8px" }}
              />
              <Form.Control.Feedback type="invalid">
                Por favor forneça este campo.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL da Imagem</Form.Label>
              <Form.Control
                id="urlImagem"
                name="urlImagem"
                onChange={changeControl}
                value={produto.urlImagem}
                type="text"
                placeholder="URL da Imagem"
                required
                style={{ borderRadius: "8px" }}
              />
              <Form.Control.Feedback type="invalid">
                Por favor forneça uma URL válida.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de Validade</Form.Label>
              <Form.Control
                id="dataValidade"
                name="dataValidade"
                onChange={changeControl}
                value={produto.dataValidade.split("T")[0]}
                type="date"
                required
                style={{ borderRadius: "8px" }}
              />
              <Form.Control.Feedback type="invalid">
                Por favor forneça este campo.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Categoria:</Form.Label>
              <Form.Select
                id="categoria"
                name="categoria"
                onChange={selecionarCategoria}
                value={produto.categoria?.codigo || ""} // Mantém o valor selecionado corretamente
              >
                <option value={""} disabled>
                  Selecione uma categoria
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria.codigo} value={categoria.codigo}>
                    {categoria.descricao}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row className="mt-4">
              <Col>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ borderRadius: "8px", width: "100%" }}
                  disabled={!temCategorias}
                >
                  {props.edicao ? "Alterar" : "Confirmar"}
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => {
                    props.setExibirTabela(true);
                    props.setEdicao(false);
                    setProduto(produtoInicial);
                  }}
                  style={{ borderRadius: "8px", width: "100%" }}
                >
                  Voltar
                </Button>
              </Col>
            </Row>
            <Toaster position="top-center" />
          </Form>
        </Container>
      </Container>
    );
  }
}
