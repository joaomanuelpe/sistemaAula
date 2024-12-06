import { Container, Button, Table, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  apagarFornecedor,
  buscarFornecedores,
} from "../../../redux/fornecedorReducer";
import ESTADO from "../../../redux/estados";
import { useEffect } from "react";

export default function TabelaFornecedor(props) {
  const { listaDeProdutos } = useSelector((state) => state.produto);

  const { estado, mensagem, listaDeFornecedores } = useSelector(
    (state) => state.fornecedor
  );
  const despachante = useDispatch();
  useEffect(() => {
    despachante(buscarFornecedores());
  }, [despachante]);

  function buscaQtdProdutos(listaDeProdutos, cnpj) {
    let i = 0;
    for (let pos = 0; pos < listaDeProdutos.length; pos++) {
      if (listaDeProdutos[pos].fornecedor.nome === cnpj) i++;
    }
    return i;
  }

  function deleteProvider(fornecedor) {
    console.log(fornecedor);
    if (
      window.confirm(
        "Deseja realmente excluir o fornecedor: " + fornecedor.nome + "?"
      )
    ) {
      despachante(apagarFornecedor(fornecedor));
    }
  }

  function changeProvider(fornecedor) {
    props.setExibirTabela(false);
    props.setEdicao(true);
    props.setFornecedor({
      nome: fornecedor.nome,
      cnpj: fornecedor.cnpj,
      telefone: fornecedor.telefone,
      bairro: fornecedor.bairro,
      rua: fornecedor.rua,
      cidade: fornecedor.cidade,
      estado: fornecedor.estado,
      cep: fornecedor.cep,
    });
  }

  function buscaProdutosDesteForn(listaDeProdutos, fornecedor) {
    let array = [];
    for (let i = 0; i < listaDeProdutos.length; i++) {
      if (listaDeProdutos[i].fornecedor.nome === fornecedor.cnpj) {
        array.push(listaDeProdutos[i]);
      }
    }
    return array;
  }

  function showProducts(fornecedor) {
    props.setExibirTabela(false);
    props.setFornecedor(fornecedor);
    const prodThisForn = buscaProdutosDesteForn(listaDeProdutos, fornecedor);
    props.setProdutosDesteFornecedor(prodThisForn);
    props.setExibirTabelaProdForn(true);
  }

  if (estado === ESTADO.PENDENTE) {
    return (
      <div>
        <Spinner animation="border" role="status"></Spinner>
        <Alert variant="primary">{mensagem}</Alert>
      </div>
    );
  } else if (estado === ESTADO.ERRO) {
    return (
      <div>
        <Alert variant="danger">{mensagem}</Alert>
      </div>
    );
  } else {
    return (
      <>
        <Container>
          {props.usuarioAdm && (
            <Button
              className="mb-3"
              variant="primary"
              onClick={() => {
                props.setExibirTabela(false);
              }}
            >
              Adicionar
            </Button>
          )}
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Telefone</th>
                <th>Bairro</th>
                <th>Rua</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>CEP</th>
                <th>Produtos</th>
                {props.usuarioAdm ? (<th>Ações</th>) : (<th>Produtos do Forn.</th>)}
              </tr>
            </thead>
            <tbody>
              {listaDeFornecedores?.map((fornecedor) => {
                return (
                  <tr>
                    <td>{fornecedor.nome}</td>
                    <td>{fornecedor.cnpj}</td>
                    <td>{fornecedor.telefone}</td>
                    <td>{fornecedor.bairro}</td>
                    <td>{fornecedor.rua}</td>
                    <td>{fornecedor.cidade}</td>
                    <td>{fornecedor.estado}</td>
                    <td>{fornecedor.cep}</td>
                    <td>
                      {buscaQtdProdutos(listaDeProdutos, fornecedor.cnpj)}
                    </td>
                    <td>
                      {props.usuarioAdm && (
                        <>
                          <Button
                            variant="warning"
                            onClick={() => {
                              changeProvider(fornecedor);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            </svg>
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              deleteProvider(fornecedor);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </Button>
                        </>
                      )}

                      <Button
                        variant="success"
                        onClick={() => {
                          showProducts(fornecedor);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                          />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <p>
            Quantidade de fornecedores cadastrados: {listaDeFornecedores.length}
          </p>
        </Container>
      </>
    );
  }
}
