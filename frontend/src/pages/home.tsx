import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to My Website!</h1>
            <Link to="/posts">
                <Button variant="filled" color="indigo">Go to Posts Page</Button>
            </Link>
            
        </div>
    );
};

export default Home;