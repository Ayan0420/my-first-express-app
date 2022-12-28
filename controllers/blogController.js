/* This is the file where all the logic are stored as functions that we can access in the app.js */

const Blog = require('../models/blog');


//blog index
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //this is going to get all the document from the database.
        .then((result) => { //then store it in result.
            res.render('index', {title: "All Blogs", blogs: result}); //and use blogs as the context we can access to our view engine.
        })
        .catch((err) => {
            console.log(err);
        });
}

//create blog
const blog_create_get = (req, res) => {
    res.render('create', { title:"Create a New Blog" });
}

// post blog
const blog_create_post = (req, res) => {
    //we can now access the body of the post request because of the express.urlencoded() middleware
    console.log(req.body); //this just for debugging, you can just remove it
    
    //the actual logic - we are saving the data to the database
    const blog = new Blog(req.body); //instantiating the Blog object and passing in the req.body to create a new document/entry in the db.

    blog.save()
        .then((result) => {
            res.redirect('/blogs'); //we will redirect to /blogs after saving the data
        })
        .catch((err) => {
            console.log(err);
        });
}

//single blog post
const blog_details = (req, res) => {
    const id = req.params.blog_id; //this will give us access to the id of the individual blog

    //we can now retrive the blog given by id in the db.
    Blog.findById(id)
        .then((result) => {
            res.render('blog-details', { title: result.title, blog: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

//delete blog
const blog_delete = (req, res) => {
    const id = req.params.blog_id;
    
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs'} )
    })
    .catch(err => console.log(err));
    
}


//exporting all the functions
module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete

}

