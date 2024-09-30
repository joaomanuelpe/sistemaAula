import Pagina from "../layouts/Pagina";
import { Image } from "react-bootstrap";
import logoTrab from '../../assets/images/logoTrab.webp';

export default function TelaMenu(props) {
    return (
        <>
            <Pagina />
            <div style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1663970206579-c157cba7edda?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZWwlMjBkZSUyMHBhcmVkZSUyMHBhcmElMjBwY3xlbnwwfHwwfHx8MA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '65vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                overflow: 'hidden', 
            }}>
                <div>
                    <Image
                        width={450}
                        height={400}
                        src={logoTrab}
                        alt="logo da empresa"
                        style={{ maxWidth: '100%', height: 'auto' }} 
                    />
                </div>
            </div>
        </>
    )
}