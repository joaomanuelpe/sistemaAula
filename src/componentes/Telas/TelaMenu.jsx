import Pagina from "../layouts/Pagina";
import { Image, Alert, Card } from "react-bootstrap";
import logoTrab from '../../assets/images/logoTrab.webp';
import Loader from "../Loader";
import Menu from "../layouts/Menu";

export default function TelaMenu(props) {
    return (
        <>
            <Alert className="text-center" variant="primary" style={{ fontSize: "42px", fontWeight: "bolder", marginBottom: "20px" }}>
                <h1>Tela Sobre</h1>
            </Alert>
            <Menu />
            <div style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1663970206579-c157cba7edda?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZWwlMjBkZSUyMHBhcmVkZSUyMHBhcmElMjBwY3xlbnwwfHwwfHx8MA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}>
                <Card style={{
                    backgroundColor: "#83a6ce",
                    width: '36rem',
                    border: '3px solid black',
                    padding: '20px',
                    boxShadow: '0 4px 20px rgba(128, 0, 128, 0.3)',  // Sombras roxas
                    margin: '20px 0',
                    position: 'relative',
                    transition: 'box-shadow 0.3s ease',  // Transição suave na sombra
                }} 
                className="card-hover">
                    <Card.Body style={{
                        textAlign: 'center',
                        position: 'relative',
                    }}>
                        {/* Colocando o Loader acima do conteúdo, fora da área do texto */}
                        <div>
                            <Loader />
                        </div>

                        <Card.Title style={{
                            fontSize: '2rem',
                            fontWeight: '600'
                        }}>Informações da Aplicação:</Card.Title>
                        <Card.Text style={{
                            textAlign: 'justify'
                        }}>
                            Este site foi desenvolvido pelo aluno João Manuel Oliveira Pereira, estudante de Ciência da Computação na Faculdade de Informática de Presidente Prudente (FIPP), com o intuito de possibilitar o gerenciamento de clientes, fornecedores, produtos, categorias, usuários e entregadores. Esta aplicação foi desenvolvida utilizando Javascript com frameworks como ReactJs, Bootstrap, Node e entre outras que complementaram para finalizar o projeto.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            {/* Estilizando o efeito de hover para o card */}
            <style jsx>{`
                .card-hover:hover {
                    box-shadow: 0 8px 40px rgba(128, 0, 128, 0.4);  /* Sombra roxa mais intensa no hover */
                    transform: translateY(-5px);  /* Pequena elevação do card no hover */
                }
            `}</style>
        </>
    );
}
