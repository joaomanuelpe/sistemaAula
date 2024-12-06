import { Container, Spinner, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { incluirTipo, atualizarTipo } from '../../../redux/tipoReducer';
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../../redux/estados";

export default function Formulariotipo(props) {
    const tipoInicial = {
        codigo: 0,
        tipo: "",
        adm: ""
    }
    const tipoAlterar = props.tipo;
    const [tipo, setTipo] = useState(tipoAlterar);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem } = useSelector((state) => state.tipo);
    const despachante = useDispatch();

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                despachante(atualizarTipo(tipo));
                toast.success("tipo atualizado com sucesso!");
                /*props.setListatipos([...props.listaDetipos.map((aux) => { return aux.nome === tipoAlterar.nome ? tipo : aux })]);
                props.setEdicao(false);*/
            } else {
                despachante(incluirTipo(tipo));
                toast.success("tipo cadastrado com sucesso!");
                setTipo(tipoInicial);
                //props.setListatipos([...props.listaDetipos, tipo]);
            }
            props.setExibirTabela(true);
            setTipo(tipoInicial);
            setFormValidado(false);
        } else {
            setTipo(tipoInicial);
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function changeControl(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setTipo({ ...tipo, [elemento]: valor });
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
                    <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Cadastro de Tipo</h3>
                    <Form noValidate validated={formValidado} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="nome">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control
                                    required
                                    id="tipo"
                                    name='tipo'
                                    type="text"
                                    placeholder="Digite o tipo completo"
                                    onChange={changeControl}
                                    value={tipo.tipo}
                                    style={{ borderRadius: '5px' }}
                                />
                                <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="adm">
                                <Form.Label>É adm?</Form.Label>
                                <Form.Select
                                    id="adm"
                                    name="adm"
                                    onChange={changeControl}
                                    value={tipo.adm}
                                    required
                                >
                                    <option value="">
                                        Selecione uma opção
                                    </option>
                                    <option value="sim">
                                        Sim
                                    </option>
                                    <option value="nao">
                                        Não
                                    </option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className='mt-4 mb-2'>
                            <Col md={6}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    style={{ borderRadius: '5px', width: '100%' }}
                                    onClick={() => {
                                        props.setTipo(tipoInicial);
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
                                        props.setTipo(tipoInicial);
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
