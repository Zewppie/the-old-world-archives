<#-- @ftlvariable name="post" type="com.theoldworldarchives.models.Post" -->
<#import "_layout.ftl" as layout />
<@layout.header>
    <div>
        <h3>Edit post</h3>
        <form action="/posts/${post.id}" method="post">
            <p>
                <input type="text" name="title" value="${post.title}">
            </p>
            <p>
                <textarea name="video file path">${post.videoFilepath}</textarea>
            </p>
            <p>
                <textarea name="description">${post.description}</textarea>
            </p>
            <p>
                <input type="submit" name="_action" value="update">
            </p>
        </form>
    </div>
    <div>
        <form action="/posts/${post.id}" method="post">
            <p>
                <input type="submit" name="_action" value="delete">
            </p>
        </form>
    </div>
</@layout.header>