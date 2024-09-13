import { Container, Button, Table } from "react-bootstrap";

export default function TabelaFornecedor(props) {
    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={() => {
                    props.setExibirTabela(false);
                }}>Adicionar</Button>
            <Table className="mt-4" striped bordered hover>
            <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                            <th>Bairro</th>
                            <th>Rua</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaDeFornecedores?.map((cliente) => {
                                return (
                                    <tr>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.bairro}</td>
                                        <td>{cliente.rua}</td>
                                        <td>{cliente.cidade}</td>
                                        <td>{cliente.estado}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </Table>
            </Container>
        </>
    );
}