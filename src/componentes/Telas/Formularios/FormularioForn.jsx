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
            if (props.editarTabela) {
                props.setListaDeFornecedores([...props.listaDeFornecedores.map((aux) => { return aux.cpf === fornecedorAlterar.cpf ? fornecedor : aux })], fornecedorAlterar);
                props.setEditarTabela(false);
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
        setFornecedor({ ...fornecedor, [elemento] : valor });
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
                            id='nome'
                            name='nome'
                            type="text"
                            placeholder="nome"
                            value={fornecedor.nome}
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
                            value={fornecedor.cpf}
                            onChange={changeControl}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control id='telefone' name='telefone' type="text" placeholder="(XX) XXXXX-XXXX" required value={fornecedor.telefone} onChange={changeControl} />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um telefone válido.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row><Form.Group as={Col} md="5" controlId="">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                        required
                        id='bairro'
                        name='bairro'
                        type="text"
                        placeholder="Bairro"
                        value={fornecedor.bairro}
                        onChange={changeControl}
                    />
                    <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control id='rua' name='rua' type="text" placeholder="Rua" required value={fornecedor.rua} onChange={changeControl}/>
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control id='cidade' name='cidade' type="text" placeholder="Cidade" required value={fornecedor.cidade}
                        onChange={changeControl}/>
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um nome de cidade válida.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control id='estado' name='estado' type="text" placeholder="Estado" required value={fornecedor.estado}
                        onChange={changeControl}/>
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
                                props.setFornecedor(fornecedorInicial)
                            }}>Voltar</Button>
                        </Col>
                    </Row>
            </Form >
            </Container>
            );
}
