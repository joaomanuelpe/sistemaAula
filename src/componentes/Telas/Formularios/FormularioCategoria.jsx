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

    //método render
    return (
        <Container>
            <Form noValidate validated = {formValidado} onSubmit={handleSubmit} >
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            required
                            id='codigo'
                            name='codigo'
                            type="codigo"
                            placeholder="Código do Produto"
                            value={categoria.codigo}
                            onChange={changeControl}
                            disabled={props.edicao}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="5" controlId="">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            required
                            id='descricao'
                            name='descricao'
                            type="text"
                            placeholder="Descrição do Produto"
                            value={categoria.descricao}
                            onChange={changeControl}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Concordo com os termos e diretrizes."
                        feedback="Você precisa concordar para continuar."
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
                            props.setEdicaoTabela(false);
                            props.setCategoria(categoriaInicial)
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form >
        </Container>
    );
}
