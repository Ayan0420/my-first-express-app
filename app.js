const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Blog = require('./models/blog')

//create express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://ayan:ayantech_1234@mylearningprojects.1vfhtdz.mongodb.net/first-express-app?retryWrites=true&w=majority";
mongoose.set('strictQuery', true); //for deprecation warning ver. 6.8.1
mongoose.connect(dbURI)
    .then(result => {
        console.log('Sucessfully connected to the db...')
        // it will only start listening once the db connection is established.
        app.listen(3000, () => console.log('Listening to port 3000...')) 
    })
    .catch(err => console.log('There is an error: ', err))

//listening on port 3000


//register ejs template/view engine
app.set('view engine', 'ejs');

//middleware and staticfiles//

/* Note: Middlewares a function that will have all the access for requesting 
   an object, responding to an object, and moving to the next middleware 
    function in the application request-response cycle. app.use() method is used for middlewares*/

    //static files middleware. The public folder is now accessable in our browser.
app.use(express.static('public'));
    //request middleware - this will convert the form data to an object.
app.use(express.urlencoded({ extended: true }))
    //logger middleware
app.use(morgan('dev')); 


// //mongoose mongodb sandbox - this is just for testing purposes.
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: "New blog 3",
//         snippet: "This is about the new blog",
//         body: "This is the content of the blog that is describing the new blog."
//     });
//     blog.save() // save the document/entry in the database
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// app.get('/all-blog', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });


//ROUTES

    //Home page- we are redirecting to /blogs
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

    //about page
app.get('/about', (req, res) => {
    res.render('about', { title:"About" });
});

    //blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //this is going to get all the document from the database.
        .then((result) => { //then store it in result.
            res.render('index', {title: "All Blogs", blogs: result}); //and use blogs as the context we can access to our view engine.
        })
        .catch((err) => {
            console.log(err);
        });
});

//create blogs - make sure that this route is above the routes with /:blog_id so that you will not get an error
app.get('/blogs/create', (req, res) => {
    res.render('create', { title:"Create a New Blog" });
});

    //blog post route
app.post('/blogs', (req, res) => {
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
});

    //single blog post
app.get('/blogs/:blog_id', (req, res) => {
    const id = req.params.blog_id; //this will give us access to the id of the individual blog

    //we can now retrive the blog given by id in the db.
    Blog.findById(id)
        .then((result) => {
            res.render('blog-details', { title: result.title, blog: result });
        })
        .catch((err) => {
            console.log(err);
        });
});


//delete blog
app.delete('/blogs/:blog_id', (req, res) => {
    const id = req.params.blog_id;
    
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs'} )
    })
    .catch(err => console.log(err));
    
});

//this is a catch-all middleware if there are no matching routes found above.
app.use((req, res) => {
    res.status(404).render('404', { title: "Not Found"});
});




