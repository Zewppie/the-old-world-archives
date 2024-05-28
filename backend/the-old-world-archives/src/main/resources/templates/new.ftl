<#import "_layout.ftl" as layout />
<@layout.header>
    <div>
        <h3>Create post</h3>
        <form action="/posts" method="post">
            <p>
                <input type="text" name="title">
            </p>
            <p>
                <textarea name="video file path"></textarea>
            </p>
            <p>
                <textarea name="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    </div>
</@layout.header>