import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to My Website!</h1>
            <Link to="/posts">
                <Button variant="filled" color="indigo">Go to Posts Page</Button>
            </Link>
            <Link to="/posts/upload">
                <Button variant="filled" color="indigo">Upload a Post</Button>
            </Link>
            <Link to="/user/login">
                <Button variant="filled" color="indigo">Login</Button>
            </Link>
        </div>
    );
};

export default Home;