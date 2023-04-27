// all routes prefaced with /api/landmarks
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
/* Routes */ 

// index route GET /api/landmarks
router.get('/country/:countryName', function (req, res) {
    db.Landmark.find({countryName: req.params.countryName})
        .then(landmarks => res.json(landmarks) )
})

// create route POST /api/landmarks
router.post('/', (req, res) => {
    db.Landmark.create(req.body)
        .then(landmark => res.json(landmark))
})

// show route GET /api/landmarks/:id
router.get('/:id', function (req, res) {
    db.Landmark.findById(req.params.id)
        .then(landmark => res.json(landmark))
})

// update route PUT /api/landmarks/:id
router.put('/:id', (req, res) => {
    db.Landmark.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(landmark => res.json(landmark))
})

// destroy route DELETE /api/landmarks/:id
router.delete('/:id', (req, res) => {
    db.Landmark.findByIdAndRemove(req.params.id)
        .then(() => res.send('You deleted landmark ' + req.params.id))
})

module.exports = router
