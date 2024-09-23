import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormularioUsuario(props) {
    const usuarioInicial = {
        nome: "",
        senha: "",
        email: "",
        dtNascimento: ""
    }
    const usuarioAlterar = props.usuario;
    const [usuario, setUsuario] = useState(usuarioAlterar);
    const [formValidado, setFormValidado] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                props.setListaUsuarios([...props.listaDeUsuarios.map((aux) => { return aux.nome === usuarioAlterar.nome ? usuario : aux })], usuarioAlterar);
                props.setEdicao(false);
            } else {
                props.setListaUsuarios([...props.listaDeUsuarios, usuario]);
            }
            props.setExibirTabela(true);
            setUsuario(usuarioInicial);
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
        setUsuario({ ...usuario, [elemento]: valor });
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
                            id="nome"
                            name='nome'
                            type="text"
                            placeholder="nome"
                            value={usuario.nome}
                            onChange={changeControl}
                            disabled={props.edicao}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row><Form.Group as={Col} md="5" controlId="">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        id='senha'
                        name='senha'
                        placeholder="senha"
                        value={usuario.senha}
                        onChange={changeControl}
                    />
                    <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" id='email' name='email' placeholder="nomeusuario@gmail.com" onChange={changeControl} value={usuario.email} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control type="text" id='dtNascimento' name='dtNascimento' placeholder="00/00/0000" onChange={changeControl} value={usuario.dtNascimento} required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça uma data válida.
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
                        <Button type="submit">Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                            props.setEdicao(false);
                            props.setUsuario(usuarioInicial)
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form >
        </Container>
    );
}
