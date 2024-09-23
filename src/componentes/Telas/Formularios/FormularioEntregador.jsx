import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export default function FormularioEntregador(props) {
    const entregadorInicial = 
            {
                id: 0,
                nome: "",
                cnh:"",
                veiculo:"",
                placa:"",
                capacidadeMax:0,
            }
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
        <Container>
            <Form noValidate validated={formValidado} onSubmit={handleSubmit}>
                <Row className="mb-12">
                    <Form.Group as={Col} md="9" controlId="">
                        <Form.Label>id</Form.Label>
                        <Form.Control
                            required
                            id="id"
                            name='id'
                            type="number"
                            placeholder="id"
                            value={entregador.id}
                            onChange={changeControl}
                            disabled={props.edicao}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            id='nome'
                            name='nome'
                            type="text"
                            placeholder="nome"
                            value={entregador.nome}
                            onChange={changeControl}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>CNH</Form.Label>
                        <Form.Control type="text" id='cnh' name='cnh' placeholder="imagem CNH" onChange={changeControl} value={entregador.cnh} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um telefone válido.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row><Form.Group as={Col} md="5" controlId="">
                    <Form.Label>Modelo do Veículo</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id='veiculo'
                        name='veiculo'
                        placeholder="ex: Volkswagen Polo"
                        value={entregador.veiculo}
                        onChange={changeControl}
                    />
                    <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Placa do Veículo</Form.Label>
                        <Form.Control type="text" id='placa' name='placa' placeholder="LLLNLNN" onChange={changeControl} value={entregador.placa} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Capacidade Máxima de Carga</Form.Label>
                        <Form.Control type="number" id='capacidadeMax' name='capacidadeMax' placeholder="0" onChange={changeControl} value={entregador.capacidadeMax} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um nome de cidade válida.
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
                        <Button type="submit">{props.edicao ? "Alterar" : "Confirmar"}</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                            props.setEdicao(false);
                            props.setEntregador(entregadorInicial)
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form >
        </Container>
    );
}