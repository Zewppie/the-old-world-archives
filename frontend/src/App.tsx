import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import axios from  'axios'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Home from './pages/home'
import Posts from './pages/posts'
import Register from './pages/register'
import PostCreation from './pages/post-creation';
import Post from './pages/post';


axios.defaults.baseURL = 'http://localhost:8080' // de onde a requisição vai ser feita
function App() {
    // o routes vai servir de hub pra mudar de páginas, a única coisa que eu preciso fazer no App.tsx é colocar as páginas
    return (
        <MantineProvider>
            <BrowserRouter> 
                <Routes> 
                    <Route index element={<Home />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="user/register" element={<Register />} />
                    <Route path="posts/upload" element={<PostCreation userName="test user" />} />
                    <Route path="posts/:postId" element={<PostWrapper />} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
};


const PostWrapper = () => {
    const { postId } = useParams<{ postId: string }>();
    return <Post postId={parseInt(postId!)} />;
};


export default App
