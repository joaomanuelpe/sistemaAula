import { Alert, Card, Button } from "react-bootstrap";
import Menu from "../layouts/Menu";
import { Link } from "react-router-dom";

export default function TelaSobre(props) {
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
                padding: '20px',  // Adicionando padding ao redor da div principal
            }}>
                <Card style={{ 
                    width: '36rem', 
                    padding: '20px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', 
                    margin: '20px 0',  // Margin superior e inferior para afastar do topo e do fundo
                }}>
                    <Card.Img variant="top" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEUAAAD////p6elHR0dPT0/v7+8bGxuhoaHa2towMDD7+/s9PT3S0tKysrJjY2MeHh67u7tbW1vIyMg4ODiQkJAoKCj19fUSEhIJCQl9fX21tbXg4OCFhYWcnJx3d3epqamenp5eXl5LS0tubm5UVFTDw8OUlJQkJCQzMzNpaWmxZkGXAAAEp0lEQVR4nO2djULaMBSF20oRSh2ICPKj1Ymg7/+CA3HDYc1J2pO0bOd7AA8fNLk3txWiSAghhBBCCCGEEEKcE/00aRfpBdswbhsylKEMm0eGMpRh88hQhjJsHhnKUIbNI0MZyrB5ZChDGTaPDGV4ymvTQl9gG87WncBcp2ENwzP75w27Mmz6BdZGhjJsPzKUYfuRIduwu5mccn9Johi0wfDWHFePt3/e8IcMZShDGcpQhjKUoQxlaIfX+xYylKEMZShDGcpQhjKUoQxl+L8Ypr0aLNdnYFiQ46LWGV6R4yIZytAdGZLjIhnK0B0ZkuMiGaprc+fGHDfqDzCzczaMM0x8fdaGNshQhjKUoQxlKEMZylCGMpShDGUoQxnKUIYylKEMZdgGwwsZWvDklLgFhjdkw4E5bsm/93Q7NUf2yYZDYEiO2/GamSO35Ly74IZoXdADgxuu22WY3NEDf7TLMGWviihamRMzeiBY9+y9O4oKcyB/XSzNgR164NgcmNMDc3Ng6Rew1AK8pSN64Is5cEIPNOd5eILnKvBbisrhnB0YTcyB9GWxAYb8hQ/K05SdB1YFvS2FrTc9EVQnDy3GEESuuHGoZ+MXi9C79yUw9PC4J6rA5IWYAMMHbtw7aHP7yQxDFyk37YM3kHnJDAPVN06ZYb9BZ+6EmNUFE4x4TAw7gpZG6X8RVgO0Fz6axD3oynnhRYExm6+v9pyjWFrRB4dfDx3UgRnKXbCS0Cr0Ug33gJofx7ecHFTtXWfL9jyiYM4ONwCbtreL1OYXICjbaQ/G8M/3v4GXaeo2uC8FX6OOt3hcuIfZ9SsGGpPG3N7iBHRGjOuX4le4j8bxI0HlO8DAbU+9pTiEtT6Os1eSTRkPOL/WTt5FneEeYu9Ugs1bXP1T3NoIejk4HbHY6KqfTgcW718c96hCX7F5DRWbKtj3HvBXKg6A+yUfLN2vpNnCTtD3Rxht7V6H89D92WoJxtRT6DfYfYi73tGlMg4sytABH1PEE4YWJfnDcWN5YFyj+fYnQvyqBZwwHMnGz7BR7c5xp33E18Hwb2D//ZnpeGK4PXw3H8Oj0l9/LYhg1HF5Te/kV6t1/+TTHF6sFra7yx+ewxjCkVQ5uwusyPP7KNrk+RV6Aqkcv/3aJ+6c3/sPw/x9DDDa74hVDNNhKMPoqaLhuJ6h/1J4BE5sfBhSbxtArCs0zzBArf8M+oFJvmHARXgAj/y4hlnpb0J5xWJixDQs/WpFz1ge5ziGPm75YuD9E54h+TEIT4o1DJsSdFSsbsh/wMue5wCGGf+xRxc61ufhqobTpn/JcWh9fq1m2CPc66mL7VmqkmGYMz3iwa69qWCYNVMGvzK06sPdDXvdps2OrCw2HFfDaXNVsIwtnlg7Go5Ijz3wuECbqpPh0vfdiUo8mR0dDJNQMzVn3kxbjrXhsskuDdIZ1TXMQ86bKjGbfDMTtzGcFj7v0fMYXJYNVKFhOmq2x3bj5yY/LZFmw+XinPQObK+LPLMyTF5W4edMLPrzYpwePBclU/0sGd23fmex4eZtNSl2NWCRJDvPIklGUbeYzJ/4/9kjhBBCCCGEEEIIIVrLL+cZgbYZ1Y2LAAAAAElFTkSuQmCC" />
                    <Card.Body style={{
                        textAlign: 'center'
                    }}>
                        <Card.Title>Informações da Aplicação:</Card.Title>
                        <Card.Text style={{
                            textAlign: 'justify'
                        }}>
                            Este site foi desenvolvido pelo aluno João Manuel Oliveira Pereira, estudante de Ciência da Computação na Faculdade de Informática de Presidente Prudente (FIPP), com o intuito de possibilitar o gerenciamento de clientes, fornecedores, produtos, categorias, usuários e entregadores. Esta aplicação foi desenvolvida utilizando Javascript com frameworks como ReactJs, Bootstrap, Node e entre outras que complementaram para finalizar o projeto.
                        </Card.Text>
                        <Button as={Link} to={"https://github.com/joaomanuelpe/sistemaAula"} variant="primary">Saiba mais</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
