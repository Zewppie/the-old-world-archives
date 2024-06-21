import React from 'react';
import { Button } from '@mantine/core';

function Posts() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>This is the post page!</h1>
            {/*aqui eu vou fazer uma requisição para o backend*/}
            <Button variant="filled" color="indigo">Get a web post</Button>
            {/*aqui eu vou fecho a requisição para o backend*/}
        </div>
    );
};
export default Posts;
