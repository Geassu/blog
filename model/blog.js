const fs = require('fs')

const blogFilePath = 'db/blog.json'

class ModelBlog {
    constructor(form) {
        this.title = form.title || ''
        this.author = form.author || ''
        this.content = form.content || ''
        this.created_time = Math.floor(new Date() / 1000)
    }
}

const loadBlogs = () => {
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}

var b = {
    data: loadBlogs(),
}

b.all = function() {
    var blogs = this.data
    var comment = require('./comment')
    var comments = comment.all()
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        var cs = []
        for (var j = 0; j < comments.length; j++) {
            var c = comments[j]
            if (blog.id == c.blog_id) {
                cs.push(c)
            }
        }
        blog.comments = cs
    }
    return blogs
}

b.new = function(form) {
    var m = new ModelBlog(form)
    console.log('m', m, this)
    var d = this.data[this.data.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    this.data.push(m)
    this.save()
    return m
}

b.delete = function(id) {
    var blogs = this.data
    var found = false
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if (blog.id == id) {
            found = true
            break
        }
    }
    blogs.splice(i, 1)
    return found
}

b.get = function(id) {
    var blogs = this.data
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if (blog.id == id) {
            var comment = require('./comment')
            var comments = comment.all()
            var cs = []
            for (var j = 0; j < comments.length; j++) {
                var c = comments[j]
                if (blog.id == c.blog_id) {
                    cs.push(c)
                }
            }
            blog.comments = cs
            return blog
        }
    }
    return {}
}

b.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    console.log('s', s)
    fs.writeFile(blogFilePath, s, (error) => {
        if (error != null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}

module.exports = b
