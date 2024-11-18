import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { gravarCategoria, alterarCategoria } from '../../../services/servicoCategoria';
import toast, { Toaster } from 'react-hot-toast';

export default function FormularioCategoria(props) {
    const categoriaInicial = {
        codigo: 0,
        descricao: ""
    };

    const categoriaAlterar = props.categoria || categoriaInicial;
    const [categoria, setCategoria] = useState(categoriaAlterar);
    const [formValidado, setFormValidado] = useState(false);

    useEffect(() => {
        if (props.edicao && props.categoria) {
            setCategoria(props.categoria);
        } else {
            setCategoria(categoriaInicial);
        }
    }, [props.edicao, props.categoria]);

    function handleSubmit(evento) {
        const form = evento.currentTarget;

        if (form.checkValidity()) {
            if (props.edicao) {
                alterarCategoria(categoria)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setListaDeCategorias((prevLista) =>
                                prevLista.map((item) =>
                                    item.codigo === categoria.codigo ? categoria : item
                                )
                            );
                            props.setEdicao(false);
                            props.setExibirTabela(true);
                        } else {
                            toast.error("Erro ao alterar a categoria: " + resultado.mensagem);
                        }
                    })
                    .catch((erro) =>
                        toast.error("Erro ao atualizar a categoria: " + erro.message)
                    );
            } else {
                gravarCategoria(categoria)
                    .then((resultado) => {
                        if (resultado.status) {
                            props.setListaDeCategorias((prevLista) => [
                                ...prevLista,
                                categoria,
                            ]);
                            props.setExibirTabela(true);
                        } else {
                            toast.error("Erro ao salvar a categoria: " + resultado.mensagem);
                        }
                    })
                    .catch((erro) =>
                        toast.error("Erro ao gravar a categoria: " + erro.message)
                    );
            }

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

        setCategoria((prevCategoria) => ({
            ...prevCategoria,
            [elemento]: valor,
        }));
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
                    <Form.Group className="mb-3">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            required
                            name="codigo"
                            type="number"
                            placeholder="Código da Categoria"
                            value={categoria.codigo}
                            onChange={changeControl}
                            disabled={props.edicao}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
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

                    <Row className="mt-4">
                        <Col>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ borderRadius: '8px', width: '100%' }}
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
                                    setCategoria(categoriaInicial);
                                }}
                                style={{ borderRadius: '8px', width: '100%' }}
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
