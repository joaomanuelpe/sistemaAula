import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormularioCategoria(props) {
    const categoriaInicial = {
        codigo: 0,
        descricao: ""
    }
    const categoriaAlterar = props.categoria;
    const [categoria, setCategoria] = useState(categoriaAlterar);
    const [formValidado, setFormValidado] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                props.setListaDeCategorias([...props.listaDeCategorias.map((aux) => {
                    return aux.codigo === categoriaAlterar.codigo ? categoria : aux
                })], categoriaAlterar);
                props.setEdicao(false);
            } else {
                props.setListaDeCategorias([...props.listaDeCategorias, categoria])
            }
            props.setExibirTabela(true);
            setCategoria(categoriaInicial);
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
        setCategoria({ ...categoria, [elemento]: valor });
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
                    <Form.Group className="mb-3" controlId="codigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            required
                            name="codigo"
                            type="text"
                            placeholder="Código da Categoria"
                            value={categoria.codigo}
                            onChange={changeControl}
                            disabled={props.edicao}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            required
                            name="descricao"
                            type="text"
                            placeholder="Descrição da Categoria"
                            value={categoria.descricao}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
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
                                    props.setCategoria(categoriaInicial);
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
