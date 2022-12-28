const express = require('express');
const router = express.Router();

const blogControllers = require('../controllers/blogController')

/* We are going to attach all the handlers(.get(), .post(), etc.) to the "router" instead of 
the "app" */

    //blogs
router.get('/', blogControllers.blog_index);

    //create blogs - make sure that this route is above the routes with /:blog_id so that you will not get an error
router.get('/create', blogControllers.blog_create_get);

    //blog post route
router.post('/', blogControllers.blog_create_post);

    //single blog post
router.get('/:blog_id', blogControllers.blog_details);


//delete blog
router.delete('/:blog_id', blogControllers.blog_delete);

module.exports = router;