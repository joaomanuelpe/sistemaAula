import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormularioCLiente(props) {
    const clienteInicial = {
        nome: "",
        cpf: "",
        telefone: "",
        bairro: "",
        rua: "",
        cidade: "",
        estado: ""
    }
    const clienteAlterar = props.cliente;
    const [cliente, setCliente] = useState(clienteAlterar);
    const [formValidado, setFormValidado] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.editarTabela) {
                props.setListaClientes([...props.listaDeClientes.map((aux) => { return aux.cpf === clienteAlterar.cpf ? cliente : aux })], clienteAlterar);
                props.setEditarTabela(false);
            } else {
                props.setListaClientes([...props.listaDeClientes, cliente]);
            }
            props.setExibirTabela(true);
            setCliente(clienteInicial);
            setFormValidado(false);
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function changeControl(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setCliente({ ...cliente, [elemento]: valor });
    }

    //método render
    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={handleSubmit}>
                <Row className="mb-12">
                    <Form.Group as={Col} md="9" controlId="">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            id="nome"
                            name='nome'
                            type="text"
                            placeholder="nome"
                            value={cliente.nome}
                            onChange={changeControl}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            required
                            id='cpf'
                            name='cpf'
                            type="text"
                            placeholder="XXX.XXX.XXX-XX"
                            value={cliente.cpf}
                            onChange={changeControl}
                            disabled={props.editarTabela}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" id='telefone' name='telefone' placeholder="(XX) XXXXX-XXXX" onChange={changeControl} value={cliente.telefone} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um telefone válido.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row><Form.Group as={Col} md="5" controlId="">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id='bairro'
                        name='bairro'
                        placeholder="Bairro"
                        value={cliente.bairro}
                        onChange={changeControl}
                    />
                    <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control type="text" id='rua' name='rua' placeholder="Rua" onChange={changeControl} value={cliente.rua} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control type="text" id='cidade' name='cidade' placeholder="Cidade" onChange={changeControl} value={cliente.cidade} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um nome de cidade válida.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" id='estado' name='estado' placeholder="Estado" onChange={changeControl} value={cliente.estado} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Concordo com os termos e diretrizes."
                        feedback="Você precisa concordar para continuar."
                        onChange={changeControl}
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                            props.setEditarTabela(false);
                            props.setCliente(clienteInicial)
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form >
        </Container>
    );
}
