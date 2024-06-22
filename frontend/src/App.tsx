import React from 'react';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import axios from  'axios'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { UserProvider } from './components/UserContext';
import Layout from './components/Layout';
import Home from './pages/home'
import Posts from './pages/posts'
import Entities from './pages/entities';


axios.defaults.baseURL = 'http://localhost:8080' // de onde a requisição vai ser feita

function App() {
    // o routes vai servir de hub pra mudar de páginas, a única coisa que eu preciso fazer no App.tsx é colocar as páginas
    return (
        <MantineProvider>
            <BrowserRouter> 
                <Routes> 
                    <Route index element={<Home />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="entities" element={<Entities />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
};


const PostWrapper = () => {
    const { postId } = useParams<{ postId: string }>();
    return <Post postId={parseInt(postId!)} />;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

export default App
