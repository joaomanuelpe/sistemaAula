import { Container, Spinner, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { incluirUsuario, atualizarUsuario } from '../../../redux/usuarioReducer';
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../../redux/estados";
import { consultarTipo } from '../../../services/servicoTipo';

export default function FormularioUsuario(props) {
    const usuarioInicial = {
        codigo: 0,
        nome: "",
        senha: "",
        email: "",
        dataNascimento: "",
        tipo: {}
    }
    const [tipos, setTipos] = useState([]);
    const [temTipos, setTemTipos] = useState(false);
    const usuarioAlterar = props.usuario;
    const [usuario, setUsuario] = useState(usuarioAlterar);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem } = useSelector((state) => state.usuario);
    const despachante = useDispatch();

    useEffect(() => {
        consultarTipo()
            .then((resultado) => {
                if (Array.isArray(resultado)) {
                    setTipos(resultado);
                    setTemTipos(true);
                } else {
                    toast.error("Não foi possível carregar as categorias");
                }
            })
            .catch((erro) => {
                setTemTipos(false);
                toast.error(erro.message);
            });
    }, []);

    function selecionarTipo(event) {
        setUsuario({
          ...usuario,
          tipo: { codigo: event.currentTarget.value },
        });
      }

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                despachante(atualizarUsuario(usuario));
                toast.success("Usuario atualizado com sucesso!");
                /*props.setListaUsuarios([...props.listaDeUsuarios.map((aux) => { return aux.nome === usuarioAlterar.nome ? usuario : aux })]);
                props.setEdicao(false);*/
            } else {
                despachante(incluirUsuario(usuario));
                toast.success("Usuario cadastrado com sucesso!");
                setUsuario(usuarioInicial);
                //props.setListaUsuarios([...props.listaDeUsuarios, usuario]);
            }
            props.setExibirTabela(true);
            setUsuario(usuarioInicial);
            setFormValidado(false);
        } else {
            setUsuario(usuarioInicial);
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function changeControl(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
    }

    if (estado === ESTADO.PENDENTE) {
        return (
            <div>
                <Spinner animation='border' role='status'></Spinner>
                <Alert variant='primary'>{mensagem}</Alert>
            </div>
        );
    }
    else if (estado === ESTADO.ERRO) {
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
    }
    else {
        return (
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh', background: 'linear-gradient(to top, #F5BFAE, #F5EDBF)' }}
            >
                <Container
                    style={{
                        padding: '30px',
                        backgroundColor: '#F4EED3',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '600px',
                        width: '100%',
                    }}
                >
                    <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Cadastro de Usuário</h3>
                    <Form noValidate validated={formValidado} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    id="nome"
                                    name='nome'
                                    type="text"
                                    placeholder="Digite o nome completo"
                                    value={usuario.nome}
                                    onChange={changeControl}
                                    style={{ borderRadius: '5px' }}
                                />
                                <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="senha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    id='senha'
                                    name='senha'
                                    placeholder="Digite a senha"
                                    value={usuario.senha}
                                    onChange={changeControl}
                                    style={{ borderRadius: '5px' }}
                                />
                                <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="dtNascimento">
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control
                                    type="date"
                                    id='dataNascimento'
                                    name='dataNascimento'
                                    placeholder="DD/MM/AAAA"
                                    onChange={changeControl}
                                    value={usuario.dataNascimento.split("T")[0]}
                                    required
                                    style={{ borderRadius: '5px' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, forneça uma data válida.
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    id='email'
                                    name='email'
                                    placeholder="nomeusuario@gmail.com"
                                    onChange={changeControl}
                                    value={usuario.email}
                                    required
                                    style={{ borderRadius: '5px' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, forneça um email válido.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="email">

                                <Form.Label>Tipo:</Form.Label>
                                <Form.Select
                                    id="tipo"
                                    name="tipo"
                                    onChange={selecionarTipo}
                                    value={usuario.tipo?.codigo || ""} // Mantém o valor selecionado corretamente
                                >
                                    <option value={""} disabled>
                                        Selecione um tipo
                                    </option>
                                    {tipos.map((tipo) => (
                                        <option key={tipo.codigo} value={tipo.codigo}>
                                            {tipo.tipo}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Concordo com os termos e diretrizes."
                                feedback="Você precisa concordar para continuar."
                                feedbackType="invalid"
                                style={{ marginLeft: '10px' }}
                            />
                        </Form.Group>
                        <Row className='mt-4 mb-2'>
                            <Col md={6}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{ borderRadius: '5px', width: '100%' }}
                                    onClick={() => {
                                        props.setUsuario(usuarioInicial);
                                    }}
                                >
                                    {props.edicao ? "Alterar" : "Confirmar"}
                                </Button>
                            </Col>
                            <Col md={6}>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        props.setExibirTabela(true);
                                        props.setEdicao(false);
                                        props.setUsuario(usuarioInicial);
                                    }}
                                    style={{ borderRadius: '5px', width: '100%' }}
                                >
                                    Voltar
                                </Button>
                            </Col>
                        </Row>
                        <Toaster position='top-center' />
                    </Form>
                </Container>
            </Container>
        );
    }
}
