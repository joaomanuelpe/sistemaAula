import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function FormularioForn(props) {
    const produtoInicial = {
        codigo:0,
        descricao:"",
        precoCusto:0,
        precoVenda:0,
        estoque:0,
        urlImagem:"",
        dtValidade:""
    };
    const produtoAlterar = props.produto;
    const [produto, setProduto] = useState(produtoAlterar);
    const [formValidado, setFormValidado] = useState(false);

    function handleSubmit(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.edicao) {
                props.setListaProdutos([...props.listaDeProdutos.map((item) => {
                    return item.codigo === produtoAlterar.codigo ? produto : item;
                })], produtoAlterar);
                props.setEdicao(false);
            } else {            //cadastrar o produto
                props.setListaProdutos([...props.listaDeProdutos, produto]);
                //exibir tabela com o produto incluído
            }
            props.setExibirTabela(true);
            setProduto(produtoInicial);
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
        setProduto({ ...produto, [elemento] : valor });
    }

    //método render
    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            required
                            type="codigo"
                            id='codigo'
                            name='codigo'
                            value={produto.codigo}
                            placeholder="Código do Produto"
                            onChange={changeControl}
                            disabled={props.edicao}
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="5">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            required
                            id='descricao'
                            name='descricao'
                            type="text"
                            value={produto.descricao}
                            onChange={changeControl}
                            placeholder="Descrição do Produto"
                        />
                        <Form.Control.Feedback>Muito bem!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="3">
                        <Form.Label>Preço de Custo</Form.Label>
                        <Form.Control id='precoCusto' name='precoCusto' onChange={changeControl} value={produto.precoCusto} type="number" placeholder="R$ XXX.XX" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" >
                        <Form.Label>Preço de Venda</Form.Label>
                        <Form.Control id='precoVenda' name='precoVenda' onChange={changeControl} value={produto.precoVenda} type="number" placeholder="R$ XXX.XX" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Form.Label>Estoque</Form.Label>
                        <Form.Control id='estoque' name='estoque' onChange={changeControl} value={produto.estoque} type="number" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça este campo.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" >
                        <Form.Label>URL da Imagem</Form.Label>
                        <Form.Control id='urlImagem' name='urlImagem' onChange={changeControl} value={produto.urlImagem} type="text" placeholder="urlImagem" required />
                        <Form.Control.Feedback type="invalid">
                            Por favor forneça uma URL válida.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" >
                        <Form.Label>Data de Validade</Form.Label>
                        <Form.Control id='dtValidade' name='dtValidade' onChange={changeControl} value={produto.dtValidade} type="date" placeholder="dd/mm/aaaa" required />
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
                        <Button type="submit">{props.edicao ? "Alterar" : "Confirmar"}</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                            props.setEdicao(false);
                            props.setProduto(produtoInicial);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form >
        </Container>
    );
}
