import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormularioCLiente(props) {
    //método render
    return (
        <Container>
            <Form >
                <Row className="mb-12">
                    <Form.Group as={Col} md="9" controlId="">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="nome"
                            defaultValue=""
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="5" controlId="">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="XXX.XXX.XXX-XX"
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" placeholder="(XX) XXXXX-XXXX" required />
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
                        placeholder="Bairro"
                        defaultValue=""
                    />
                    <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control type="text" placeholder="Rua" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control type="text" placeholder="Cidade" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça um nome de cidade válida.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control type="text" placeholder="Estado" required />
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
                            }}>Voltar</Button>
                        </Col>
                    </Row>
            </Form >
            </Container>
            );
}
