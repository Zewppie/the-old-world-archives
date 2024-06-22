import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mantine/core";

function Posts() {
    return (
        <div>
            <h1>This is the post page!</h1>
            {/* Add your content here */}
            <Link to="/">
                <Button variant="filled" color="indigo">Return to Home Page</Button>
            </Link>
        </div>
    );
}

export default Posts;