import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormularioCategoria(props) {
    //método render
    return (
        <Form >
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="codigo"
                        placeholder="Código do Produto"
                        defaultValue=""
                    />
                    <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Descrição do Produto"
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
            <Button type="submit">Cadastrar</Button>
        </Form >
    );
}
