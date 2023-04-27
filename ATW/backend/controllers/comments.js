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
router.post('/', (req, res) => {
    db.Comment.create(req.body)
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
router.put('/:id', (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(comment => res.json(comment))
})

// Destroy Route (DELETE/Delete): This route deletes a comment document 
// using the URL parameter (which will always be the comment document's ID)
router.delete('/:id', (req, res) => {
    // find document by id and delete it 
    db.Comment.findByIdAndRemove(req.params.id)
        .then(() => res.send('You deleted comment ' + req.params.id))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router