import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../index.css';
import Header from '../components/Header';

function Home() {
    return (
        <div>
            <div className="center" style={{ textAlign: 'center', paddingTop: '0px', padding: '20px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Welcome to The Old World Archives</h1>
                    <p style={{ fontSize: '1.2em', marginTop: '0', marginBottom: '20px' }}>
                        The Old World Archives is a project based on the game <a href="https://landfall.se/content-warning" target="_blank" rel="noopener noreferrer">Content Warning</a>, developed by Landfall games. This website serves as both a community and a wiki for the playerbase of Content Warning. Here, you can upload videos recorded by your crew so others can check them out, as well as find information about entities within the game though the entity wiki.
                    </p>
                    <p style={{ fontSize: '1.2em', marginTop: '0', marginBottom: '20px' }}>
                        This project was developed as part of the course MAC0350 by students Francisco and Mohamad.
                    </p>
                    <p style={{ fontSize: '1.2em', marginTop: '0', marginBottom: '20px' }}>
                        Entity information was taken from the <a href="https://contentwarning.fandom.com/wiki/Content_Warning_Wiki" target="_blank" rel="noopener noreferrer">Content Warning Wiki</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
