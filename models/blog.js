const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating the blog schema by instantating the Schema object

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }

}, { timestamps: true })

//create the database model

const Blog = mongoose.model('Blog', blogSchema) //first arg: name of the collection, pluralized second arg: the schema to use
// we can now access this Blog model and all sorts of operations with it e.g. get, edit, delete 


module.exports = Blog //to make Blog model object accessable in the app.js


