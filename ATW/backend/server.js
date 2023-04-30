/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const commentsCtrl = require('./controllers/comments')
const landmarksCtrl = require('./controllers/landmarks')
const usersCtrl = require('./controllers/users')


/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Middleware (app.use)
--------------------------------------------------------------- */
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))
// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});



/* Mount routes
--------------------------------------------------------------- */
// This tells our app to look at the `controllers/comments.js` file 
// to handle all routes that begin with `localhost:3000/api/applications`
app.use('/api/comments', commentsCtrl)
app.use('/api/landmarks', landmarksCtrl)
app.use('/api/users', usersCtrl)


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});