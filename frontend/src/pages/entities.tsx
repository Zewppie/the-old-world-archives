import React from 'react';

function Entities() {
    return (
        <div style={{ textAlign: 'center' }}>
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
    );
};
export default Entities;