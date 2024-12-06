import { Container , Button , Col , Form , Row , Spinner , Alert} from 'react-bootstrap';
import { useState , useEffect} from 'react';
import { incluirCliente , atualizarCliente } from '../../../redux/clienteReducer';
import toast from 'react-hot-toast';
import { useDispatch , useSelector } from 'react-redux';
import ESTADO from '../../../redux/estados';

export default function FormularioCliente(props) {
    const clienteInicial = {
        nome: "",
        cpf: "",
        telefone: "",
        bairro: "",
        rua: "",
        cidade: "",
        estado: ""
    };
    const clienteAlterar = props.cliente;
    const [cliente, setCliente] = useState(clienteAlterar);
    const [formValidado, setFormValidado] = useState(false);
    const { estado , mensagem } = useSelector((state) => state.cliente);
    const despachante = useDispatch();

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                despachante(atualizarCliente(cliente));
                toast.success("Cliente atualizado com sucesso!");
            } else {
                despachante(incluirCliente(cliente));
                toast.success("Cliente cadastrado com sucesso!");
            }
            props.setExibirTabela(true);
            setCliente(clienteInicial);
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
        setCliente({ ...cliente, [elemento]: valor });
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
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            name="nome"
                            type="text"
                            placeholder="Digite o nome completo"
                            value={cliente.nome}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cpf">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            required
                            name="cpf"
                            type="text"
                            placeholder="XXX.XXX.XXX-XX"
                            value={cliente.cpf}
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
                            name="telefone"
                            type="text"
                            placeholder="(XX) XXXXX-XXXX"
                            value={cliente.telefone}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, forneça um telefone válido.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="bairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                            required
                            name="bairro"
                            type="text"
                            placeholder="Digite o bairro"
                            value={cliente.bairro}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="rua">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control
                            required
                            name="rua"
                            type="text"
                            placeholder="Digite a rua"
                            value={cliente.rua}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cidade">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            required
                            name="cidade"
                            type="text"
                            placeholder="Digite a cidade"
                            value={cliente.cidade}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, forneça uma cidade válida.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="estado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            required
                            name="estado"
                            type="text"
                            placeholder="Estado"
                            value={cliente.estado}
                            onChange={changeControl}
                            style={{ borderRadius: '5px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, forneça este campo.
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
                                    props.setCliente(clienteInicial)
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
                                    props.setCliente(clienteInicial);
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
