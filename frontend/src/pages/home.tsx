import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h1>Welcome to My Website!</h1>
                <Link to="/posts">
                    <Button variant="filled" color="indigo">Go to Posts Page</Button>
                </Link>
            </div>
            {/* outra div pra página da wiki entidades */}
            <div>
                <h1>Entity Wiki Page</h1>
                <Link to="/entities">
                    <Button variant="filled" color="indigo">Go to Entities Page</Button>
                </Link>
            </div>
        </div>
    );
};
export default Home;