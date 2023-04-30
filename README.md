# Around the World...

Around the World is a web application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to explore countries from around the world and learn information about them including the capital, population, official languages and related movies (and live news COMING SOON)!

https://user-images.githubusercontent.com/120285721/235375858-097db1d9-faf7-490b-8bda-46cba7dfaff5.mp4

## Getting Started

This app has been deployed via Heroku. You can view it at https://international-insight.herokuapp.com/
---It is live as of May 1, 2023---

<br/>

### If you'd like to build off of this app:

- fork and clone this repo to your local machine

THEN

- run `npm run frontend` for frontend architecture
- run `npm run backend` for backend development

OR

- run `npm run start` to test both back and front ends simultaneously

## Technologies Used

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/> <img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white'/> <img src='https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink'/>

- Javascript
- MongoDB: a NoSQL database used to store data about countries and related movies
- Express: a lightweight web application framework for Node.js used to build the backend server
- React: a JavaScript library used to build the frontend client
- Node.js: a JavaScript runtime used to build the backend server
- Axios: a promise-based HTTP client used to make API requests
- React Router: a routing library used to handle navigation between pages
- Tailwind: a CSS framework used to style the application
- JSON Web Tokens
- APIs:
  - RESTful API
  - The Movie Database (TMDB)

## API

The application uses the RESTful API architecture to handle requests and responses between the frontend and backend. The backend server is built using Node.js and Express and connects to a MongoDB database to store data about countries and related movies.

## Original Wireframes

![image](https://user-images.githubusercontent.com/120285721/235376418-43606fea-7a28-4b20-84e9-f9f30f0e5b86.png)
![image](https://user-images.githubusercontent.com/120285721/235376427-f2cfb510-94df-44d3-aa06-c10093a3fdb5.png)
![image](https://user-images.githubusercontent.com/120285721/235376434-612da758-32af-4547-aae4-162cdc71dfd9.png)
![image](https://user-images.githubusercontent.com/120285721/235376438-709fb81e-49fa-40a8-afe3-53f015032f27.png)

## User Stories

- As a language learner I want to be able to find movies (and recipes and news articles) in different languages so that I can practice my language learning skills.
- As a person who likes to know what is going on in the world, I want to be able to read the news about countries
- As a part of this world I want to give feedback to those who may want to visit different countries: so I can comment and add landmarks to the countries

### Breakthroughs

#### I had to figure out the conversion between the official language codes ISO-639-1 and ISO-639-2 codes because I was trying to connect the APIs via their language fields in the JSON objects, and each API used a different ISO code. Thanks to Chat GPT and a well-crafted prompt, it didn't take very long figure out, but it certainly was a brain twister for little bit.

## Future Plans for the App

- I will be dynamically updating the movie section to be filterable for any of the official languages of that country (compared to now, it is only movies whose original language is the first official language of the country)
- I will be implementing newscatcher API and connecting relevant news about each country to their respective country details page
- I will be implementing a recipe API
