<#-- @ftlvariable name="posts" type="kotlin.collections.List<com.theoldworldarchives.models.Post>" -->
<#import "_layout.ftl" as layout />
<@layout.header>
    <#list posts?reverse as post>
        <div>
            <h3>
                <a href="/posts/${post.id}">${post.title}</a>
            </h3>
            <video controls>
                <source src="${post.videoFilepath}" type="video/webm">
            </video>
            <p>
                ${post.description}
            </p>
        </div>
    </#list>
    <hr>
    <p>
        <a href="/posts/new">Create post</a>
    </p>
</@layout.header>