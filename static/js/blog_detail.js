var templateComment = function(comment) {
    var id = comment.id
    var author = comment.author
    var content = comment.content

    var t = `
        <div class="blog-comments">
            <div class="new-comment" data-id=${id}>
                <p>作者: ${author}</p>
                <div>${content}</div>
            </div>
        </div>
    `
    return t
}

var templateBlog = function(blog) {
    var id = blog.id
    var title = blog.title
    var content = blog.content
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
        <div class="geassu-blog-cell">
            <div class="">
                <a class="blog-title" href="/blog/${id}" data-id="${id}">
                    ${title}
                </a>
            </div>
            <div class="">
                <span>${author}</span> @ <time>${time}</time>
            </div>
            <div class="">
                ${content}
            </div>
            <div class="">
                <p>评论</p>
                <div id="id-div-blog-comments"></div>
            </div>
        </div>
    `
    return t
}

var insertComments = function(comments) {
    var div = e('#id-div-blog-comments')
    for (var i = 0; i < comments.length; i++) {
        var c = comments[i]
        var t = templateComment(c)
        appendHtml(div, t)
    }
}

var insertBlog = function(blog) {
    var div = e('#id-div-blog-detail')
    var t = templateBlog(blog)
    div.innerHTML = t

    var comments = blog.comments
    insertComments(comments)
}

var blogOne = function(id) {
    var request = {
        method: 'GET',
        url: '/api/blog/' + id,
        contentType: 'application/json',
        callback: function(response) {
            var b = JSON.parse(response)
            insertBlog(b)
        }
    }
    ajax(request)
}

var __main = function() {
    var blogId = document.body.dataset.id
    blogOne(blogId)
}

__main()
