import { MantineProvider } from '@mantine/core';

function Entities() {
    return (
        <div className="container">
            {/* Blank space to accommodate the fixed header */}
            <div style={{ height: '70px' }} />

            {/* Fixed header with black background */}
            <div className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'black', color: 'white', zIndex: 1000 }}>
                <Link to="/">
                    <img src="the_old_world_archives_logo.png" alt="Logo" className="logo" style={{ marginRight: '20px' }} />
                </Link>
                <div>
                    <Link to="/user/register">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }}>Register</Button>
                    </Link>
                    <Link to="/posts">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }}>Posts</Button>
                    </Link>
                    <Link to="/entities">
                        <Button variant="filled" color="indigo">Entity Wiki</Button>
                    </Link>
                </div>
            </div>

            {/* padding top serve pra barra de cima não ocultar os conteudos */}
            <div style={{ textAlign: 'center', paddingTop: '3000px' }}>
                {/* tabela de conteudos pra poder se guiar pela page */}
                <h1>This is the entity wiki!</h1>
                {/*aqui há conteúdo estático*/}
                <div>
                    <h2> #1 - Puffo </h2>
                    <p>Puffo is a very important entity.</p>
                    {/* aqui mostro o entity_puffo.png como teste*/}
                    <img src="entity_puffo.png" alt="This is Puffo" />
                </div>
                {/*aqui eu vou fecho a requisição para o backend*/}
            </div>
        </MantineProvider>
    );
};
export default Entities;