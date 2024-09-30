import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function FormularioForn(props) {

    const fornecedorInicial = {
        nome: "",
        cpf: "",
        telefone: "",
        bairro: "",
        rua: "",
        cidade: "",
        estado: ""
    };
    const fornecedorAlterar = props.fornecedor;
    const [fornecedor, setFornecedor] = useState(fornecedorAlterar);
    const [formValidado, setFormValidado] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                props.setListaDeFornecedores([...props.listaDeFornecedores.map((aux) => { return aux.cpf === fornecedorAlterar.cpf ? fornecedor : aux })], fornecedorAlterar);
                props.setEdicao(false);
            } else {
                props.setListaDeFornecedores([...props.listaDeFornecedores, fornecedor]);
            }
            props.setExibirTabela(true);
            setFornecedor(fornecedorInicial);
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
        setFornecedor({ ...fornecedor, [elemento]: valor });
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
                <Form
                    noValidate
                    validated={formValidado}
                    onSubmit={handleSubmit}
                    style={{ margin: '20px' }}  // Adiciona margens para evitar encostar nas bordas
                >
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            id='nome'
                            name='nome'
                            type="text"
                            placeholder="Nome"
                            value={fornecedor.nome}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cpf">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            required
                            id='cpf'
                            name='cpf'
                            type="text"
                            placeholder="XXX.XXX.XXX-XX"
                            value={fornecedor.cpf}
                            onChange={changeControl}
                            disabled={props.edicao}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            required
                            id='telefone'
                            name='telefone'
                            type="text"
                            placeholder="(XX) XXXXX-XXXX"
                            value={fornecedor.telefone}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um telefone válido.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                            required
                            id='bairro'
                            name='bairro'
                            type="text"
                            placeholder="Bairro"
                            value={fornecedor.bairro}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="rua">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control
                            required
                            id='rua'
                            name='rua'
                            type="text"
                            placeholder="Rua"
                            value={fornecedor.rua}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            required
                            id='cidade'
                            name='cidade'
                            type="text"
                            placeholder="Cidade"
                            value={fornecedor.cidade}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um nome de cidade válida.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="estado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            required
                            id='estado'
                            name='estado'
                            type="text"
                            placeholder="Estado"
                            value={fornecedor.estado}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
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
                                onClick={() => {
                                    props.setFornecedor(fornecedorInicial);
                                }}
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
                                    props.setFornecedor(fornecedorInicial);
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
