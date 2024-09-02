import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormularioForn(props) {
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
            <Row>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Preço de Custo</Form.Label>
                    <Form.Control type="number" placeholder="R$ XXX.XX" required />
                    <Form.Control.Feedback type="invalid">
                        Por favor forneça este campo.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Preço de Venda</Form.Label>
                    <Form.Control type="number" placeholder="R$ XXX.XX" required />
                    <Form.Control.Feedback type="invalid">
                        Por favor forneça este campo.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom03">
                    <Form.Label>Estoque</Form.Label>
                    <Form.Control type="number" required />
                    <Form.Control.Feedback type="invalid">
                        Por favor forneça este campo.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>URL da Imagem</Form.Label>
                    <Form.Control type="text" placeholder="Cidade" required />
                    <Form.Control.Feedback type="invalid">
                        Por favor forneça uma URL válida.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Data de Validade</Form.Label>
                    <Form.Control type="date" placeholder="dd/mm/aaaa" required />
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
            <Button type="submit">Cadastrar</Button>
        </Form >
    );
}
