import { Button, Container, Table } from "react-bootstrap";

export default function TabelaCategorias(props) {
    return (
        <>
            <Container>
                <Button className="mb-3" variant="primary" onClick={() => {props.setExibirTabela(false);}}>Adicionar</Button>
                <Table className="mt-4" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaDeCategorias?.map((categoria) => {
                                return (
                                <tr>
                                    <td>{categoria.codigo}</td>
                                    <td>{categoria.descricao}</td>
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