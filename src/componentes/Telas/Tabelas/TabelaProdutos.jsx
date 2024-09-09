import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

export default function TabelaProdutos(props) {
    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={() => {
                    props.setExibirTabela(false);
                }}>Adicionar</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th>Preço de Custo</th>
                            <th>Preço de Venda</th>
                            <th>Estoque</th>
                            <th>Imagem</th>
                            <th>Data Validade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaDeProdutos?.map((produto) => {
                                return (
                                    <tr>
                                        <td>{produto.codigo}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.precoCusto}</td>
                                        <td>{produto.precoVenda}</td>
                                        <td>{produto.estoque}</td>
                                        <td><img src={produto.urlImagem} alt="foto do produto" /></td>
                                        <td>{produto.dtValidade}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
