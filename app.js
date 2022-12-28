require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')

//create express app
const app = express();

//connect to mongodb
<<<<<<< HEAD
const dbURI = process.env.DB_URI;
=======
const dbURI = "mongodb+srv://<user>:<password>@mylearningprojects.1vfhtdz.mongodb.net/first-express-app?retryWrites=true&w=majority";
>>>>>>> a9beb79d7ef3421a5c579c5e113fa05ec258fae3
mongoose.set('strictQuery', true); //for deprecation warning ver. 6.8.1
mongoose.connect(dbURI)
    .then(result => {
        console.log('Sucessfully connected to the db...')
        // it will only start listening once the db connection is established.
        app.listen(process.env.PORT || 3000, () => console.log('Listening to port 3000...')) 
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
app.use('/blogs', blogRoutes);

//this is a catch-all middleware if there are no matching routes found above.
app.use((req, res) => {
    res.status(404).render('404', { title: "Not Found"});
});




