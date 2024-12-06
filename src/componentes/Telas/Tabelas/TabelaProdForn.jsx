import { Container, Table, Alert , Button} from "react-bootstrap";

export default function TabelaProdForn(props) {
  return (
    <>
      <Alert
        className="text-center"
        variant="danger"
        style={{ fontSize: "42px", fontWeight: "bolder" }}
      >
        <h3>Fornecedor: {props.fornecedor.nome}</h3>
      </Alert>
      <Container>
        <Table className="mt-4" striped bordered hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Preço de Custo</th>
              <th>Preço de Venda</th>
              <th>Estoque</th>
              <th>Imagem</th>
              <th>Data Validade</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {props.produtosDesteFornecedor?.map((produto) => {
              return (
                <tr>
                  <td>{produto.codigo}</td>
                  <td>{produto.descricao}</td>
                  <td>{produto.precoCusto}</td>
                  <td>{produto.precoVenda}</td>
                  <td>{produto.qtdEstoque}</td>
                  <td>
                    <img
                      src={produto.urlImagem}
                      alt="foto do produto"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{new Date(produto.dataValidade).toLocaleDateString()}</td>
                  <td>
                    {produto.categoria
                      ? produto.categoria.descricao
                      : "Sem categoria"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button
                  variant="secondary"
                  onClick={() => {
                    props.setExibirTabelaProdForn(false);
                    props.setExibirTabela(true);
                    props.setEdicao(false);
                  }}
                  style={{ borderRadius: "8px", width: "100%" }}
                >
                  Voltar
                </Button>
      </Container>
    </>
  );
}
