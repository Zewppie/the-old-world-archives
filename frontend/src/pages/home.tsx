import { Button } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../index.css'; // Import the index.css file

function Home() {
    return (
        <MantineProvider defaultColorScheme="dark">
            <div className="container">
                <div className="header">
                    <img src="the_old_world_archives_logo.png" alt="Logo" className="logo"  />
                </div>
                <div className="center">
                    <Link to="/posts">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }}>Go to Posts Page</Button>
                    </Link>
                    <Link to="/entities">
                        <Button variant="filled" color="indigo">Go to Entities Page</Button>
                    </Link>
                </div>
            </div>
        </MantineProvider>
    );
}
export default Home;
