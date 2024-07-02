import React from 'react';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import axios from  'axios'
import ReactDOM from 'react-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { UserProvider } from './components/UserContext';
import Layout from './components/Layout';
import Home from './pages/home'
import Posts from './pages/posts'
import Post from './pages/post';
import Register from './pages/register'
import Entities from './pages/entities';
import Login from "./pages/login.tsx";
import PostCreation from "./pages/post-creation.tsx";
import './index.css'


axios.defaults.baseURL = 'http://localhost:8080' // de onde a requisição vai ser feita

function App() {
    // o routes vai servir de hub pra mudar de páginas, a única coisa que eu preciso fazer no App.tsx é colocar as páginas
    return (
        <MantineProvider defaultColorScheme="dark">
            <UserProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/entities" element={<Entities />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/upload" element={<PostCreation />} />
                            <Route path="posts/:postId" element={<PostWrapper />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </UserProvider>
        </MantineProvider>
    );
};

const PostWrapper = () => {
    const { postId } = useParams<{ postId: string }>();
    return <Post postId={parseInt(postId!)} />;
};

//const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//root.render(
//    <React.StrictMode>
//        <App />
//    </React.StrictMode>
//);

export default App
