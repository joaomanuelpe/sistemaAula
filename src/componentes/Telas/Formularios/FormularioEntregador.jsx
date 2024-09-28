import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormularioEntregador(props) {
    const entregadorInicial = {
        id: 0,
        nome: "",
        cnh: "",
        veiculo: "",
        placa: "",
        capacidadeMax: 0,
    };
    const entregadorAlterar = props.entregador;
    const [entregador, setEntregador] = useState(entregadorAlterar);
    const [formValidado, setFormValidado] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                props.setListaEntregadores([...props.listaDeEntregadores.map((aux) => { return aux.id === entregadorAlterar.id ? entregador : aux })], entregadorAlterar);
                props.setEdicao(false);
            } else {
                props.setListaEntregadores([...props.listaDeEntregadores, entregador]);
            }
            props.setExibirTabela(true);
            setEntregador(entregadorInicial);
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
        setEntregador({ ...entregador, [elemento]: valor });
    }

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
                <Form noValidate validated={formValidado} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="id">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            required
                            id="id"
                            name='id'
                            type="number"
                            placeholder="ID"
                            value={entregador.id}
                            onChange={changeControl}
                            disabled={props.edicao}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            id='nome'
                            name='nome'
                            type="text"
                            placeholder="Nome"
                            value={entregador.nome}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cnh">
                        <Form.Label>CNH</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id='cnh'
                            name='cnh'
                            placeholder="CNH"
                            value={entregador.cnh}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça uma CNH válida.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="veiculo">
                        <Form.Label>Modelo do Veículo</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id='veiculo'
                            name='veiculo'
                            placeholder="ex: Volkswagen Polo"
                            value={entregador.veiculo}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="placa">
                        <Form.Label>Placa do Veículo</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id='placa'
                            name='placa'
                            placeholder="LLLNLNN"
                            value={entregador.placa}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça uma placa válida.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="capacidadeMax">
                        <Form.Label>Capacidade Máxima de Carga</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            id='capacidadeMax'
                            name='capacidadeMax'
                            placeholder="0"
                            value={entregador.capacidadeMax}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça uma capacidade válida.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="Concordo com os termos e diretrizes."
                            feedback="Você precisa concordar para continuar."
                            feedbackType="invalid"
                        />
                    </Form.Group>

                    <Row className="mt-4 mb-2">
                        <Col xs={6}>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ borderRadius: '5px', width: '100%' }}
                            >
                                {props.edicao ? "Alterar" : "Confirmar"}
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    props.setExibirTabela(true);
                                    props.setEdicao(false);
                                    props.setEntregador(entregadorInicial);
                                }}
                                style={{ borderRadius: '5px', width: '100%' }}
                            >
                                Voltar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    );
}
