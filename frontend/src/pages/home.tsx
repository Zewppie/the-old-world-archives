import { Button } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
    return (
        <div className="container">
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
            <div className="center" style={{ textAlign: 'center', paddingTop: '0px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Welcome to The Old World Archives</h1>
                    <p style={{ fontSize: '1.2em', marginTop: '0' }}>The Old World Archives is a project based on the game Content Warning, developed by Landfall games. This website serves as both a community and a wiki for the playerbase of Content Warning. Here, you can upload videos recorded by your crew so others can check them out, as well as find information about entities within the game though the entity wiki.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
