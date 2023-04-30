/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/comments`
---------------------------------------------------------------------------------------
*/
// this has the CRUD 
// react will render routes for us 

/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple');

const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')

/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')


/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};

/* Routes
--------------------------------------------------------------- */
// index route 
// GET /api/comments
router.get('/', function (req, res) {
    db.Comment.find({})
        .then(comments => res.json(comments))
})

// index route for specific detail pages' comments
router.get('/country/:countryName', function (req, res) {
    db.Comment.find({countryName: req.params.countryName})
        .then(comments => res.json(comments) )
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new comment document using the form data, 
// and redirects the user to the new comment's show page
// POST /api/comments
router.post('/', authMiddleware, (req, res) => {
    // Perform any actions that require authorization
    // console.log(req.body)
    db.Comment.create({
        ...req.body,
        // The auth middleware validated the JWT token 
        // and added the decoded payload to the req.user object
        userId: req.user.id
    })
        .then(comment => res.json(comment))
})



// Show Route (GET/Read): Will display an individual comment document
// using the URL parameter (which is the document _id)
// GET /api/comments/:id
router.get('/:id', function (req, res) {
    db.Comment.findById(req.params.id)
        .then(comment => res.json(comment))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified comment document using the form data,
// and redirects the user back to the show page with the updated info.
// PUT /api/comments/:id
router.put('/:id', authMiddleware, async (req, res) => {
    // console.log(req.body)
    // Check if the user who sent the update request is the same user who created the comment
    const userComment = await db.Comment.findById(req.params.id)
    // console.log(req.params.id)
    // console.log(userComment)
    console.log(userComment.userId)
    if (userComment.userId.toString() === req.user.id) {
        console.log('inside of if statement')
        // If it is the original author, update the comment
        const newComment = await db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(newComment)
    } else {
        console.log('inside of else statement')
        res.status(401).json({ message: 'Invalid user or token' });
    }
})


// Destroy Route (DELETE/Delete): This route deletes a comment document 
// using the URL parameter (which will always be the comment document's ID)
router.delete('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the delete request is the same user who created the comment
    const userComment = await db.Comment.findById(req.params.id)
    if (userComment.userId.toString() === req.user.id) {
        const deletedComment = await db.Comment.findByIdAndRemove(req.params.id)
        res.send('You deleted comment ' + deletedComment._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router