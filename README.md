# List.ly ✏️

A comprehensive and secure task tracking application, to maximise productivity and get things done.

## Features

### User Authentication
* Register with email
* Secured login using hashed passwords with bcrypt
* Protected routes using JWT-based authentication

### Task Management 
* Create tasks with a simple title
* Edit tasks to modify title, descriptions, or due date (optional)
* Mark tasks as completed

### User Interface
* Responsive design for desktop/mobile
* Clean layout utilising Bootstrap
* Form validation and error messages

### Tech Stack
This is a MERN project using:
* React with ContextAPI, React Router and Fetch API
* Bootstrap for responsive design
* Node.js with Express.js server, JWT and bcrypt for authentication
* MongoDB database hosted by MongoDB Atlas with Mongoose for schema validation
* RESTful API implementation with error handling, validation and CORS configuration

## Setup

Clone this repository on your local machine
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Install dependencies for the frontend and backend, run 
```npm install``
in server/ and client/

Set up your .env following the .sample.env provided

To start the server
```
cd client
npm start
```

To launch the react-app
```
cd client
npm start
```

## API 

For API documentation consult this repository's wiki tab.


### Some Info

This repository currently has some known issues regarding latency, due to API response speeds.

This project has been completed as part of my application for Genyses Lab @ FAST NUCES, and approx. 10-12 hours were spent on building and documenting this application.



