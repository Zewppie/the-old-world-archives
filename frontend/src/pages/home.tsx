import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../index.css';
import Header from '../components/Header'

function Home() {
    return (
        <div>
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
