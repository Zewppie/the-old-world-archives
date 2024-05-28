<#-- @ftlvariable name="post" type="com.theoldworldarchives.models.Post" -->
<#import "_layout.ftl" as layout />
<@layout.header>
    <div>
        <h3>
            ${post.title}
        </h3>
        <video controls>
            <source src="${post.videoFilepath}" type="video/webm">
        </video>
        <p>
            ${post.description}
        </p>
        <hr>
        <p>
            <a href="/posts/${post.id}/edit">Edit post</a>
        </p>
    </div>
</@layout.header>