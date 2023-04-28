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
router.post('/', authMiddleware, (req, res) => {
    // Perform any actions that require authorization
    db.Landmark.create({
        ...req.body,
        // The auth middleware validated the JWT token 
        // and added the decoded payload to the req.user object
        userId: req.user.id
    })
        .then(landmark => res.json(landmark))
})

// show route GET /api/landmarks/:id
router.get('/:id', function (req, res) {
    db.Landmark.findById(req.params.id)
        .then(landmark => res.json(landmark))
})

// update route PUT /api/landmarks/:id
router.put('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the update request is the same user who created the comment
    const userLandmark = await db.Landmark.findById(req.params.id)
    if (userLandmark.userId.toString() === req.user.id) {
        // If it is the original author, update the comment
        const newLandmark = await db.Landmark.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(newLandmark)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// destroy route DELETE /api/landmarks/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the delete request is the same user who created the comment
    const userLandmark = await db.Landmark.findById(req.params.id)
    if (userLandmark.userId.toString() === req.user.id) {
        const deletedLandmark = await db.Landmark.findByIdAndRemove(req.params.id)
        res.send('You deleted landmark ' + deletedLandmark._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

module.exports = router
