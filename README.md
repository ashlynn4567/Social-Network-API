# Social-Network-API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table-of-Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Technologies](#technologies)
- [Future Development](#future-development)
- [Credits](#credits)

## Description

This is my sixteenth challenge assignment for the University of Oregon Coding Bootcamp 2022. In this project, I use MongoDB, a NoSQL database, and Mongoose.js, an Object-Document Mapper (ODM), to create a RESTful API for a social networking application.

This application allows CRUD methods to be performed on users, friends, thoughts (posts made by users), and reactions (replies to thoughts). By navigating to specified routes defined by the API, users can make GET, PUT, POST, or DELETE requests to perform these operations.

## Features

This application is run using the user's terminal. Before running this application, please see the [Installation](#installation) section.

This application can be invoked using the command `npm start`, which starts the server. If users wish to test the back-end routes without a front-end user interface available, they can use [Insomnia](https://insomnia.rest/), a free application that allows you to test and validate results of RESTful applications. Once the server is started, users can test the following routes:

1. Get Users:
   - Using a GET request to the api endpoint `localhost:3001/api/users` will return all users in the database.
   - Users can also navigate to `localhost:3001/api/users/[user_id]` and use a GET request in order to retrieve the user specified by the id provided.

<p align="center">
<img alt="A demonstration gif that shows the user navigating to 'localhost:3001/api/users' to retrieve all the users from the database. Users can also navigate to 'localhost:3001/api/users/[user_id]' to retrieve the user specified by the id provided." src="./assets/images/social-network-demo.gif"/>
<br>Here's a <a href="https://drive.google.com/file/d/1K8UI3zWRLZpC5L3iQfeOtkIoDNwqa8Wu/view" target="_blank">link</a> to the video version of the above gif.
</p>

2. Manage Users:
   - Using a POST request to the api endpoint `localhost:3001/api/users` will create a new user, as long as they have provided the necessary information. Follow the JSON data structure below for creating users:
   ```
   {
      "username": "[user-name]",
      "email": "[email]"
   }
   ```
   - Users can also navigate to `localhost:3001/api/users/[user_id]` and use a PUT request in order to update the user specified by the id provided.
   - Using the same URL as above, users can use a DELETE request to delete the user at the specified ID.

<p align="center">
<img alt="A demonstration gif that shows the user navigating to 'localhost:3001/api/users'  and using a POST request to create a new user in the database. Users can also navigate to 'localhost:3001/api/users/[user_id]' and use a PUT request to update the user of the specified id. They can use a delete request at the same URL to delete that user." src="./assets/images/social-network-demo-2.gif"/>
<br>Here's a <a href="https://drive.google.com/file/d/1Pa_IrYMPtGk-VVL0n0wJmbMfcW61-oN0/view" target="_blank">link</a> to the video version of the above gif.
</p>

3. Manage Friends:
   - Using a POST request to the api endpoint `localhost:3001/api/users/[user_id]/friends/[friend_id]` will add a new friend to the specified user, where friend id is the id of the user you want to add to the first specified user's friend list. For this post request, you do not need to include JSON data, just the id's of the two people you wish to join as friends.
   - Users can also navigate to the same URL as above and use a DELETE request to delete the specified friend from the specified user.

<p align="center">
<img alt="A demonstration gif using a POST request to the api endpoint `localhost:3001/api/users/[user_id]/friends/[friend_id]` to add a new friend to the specified user. At the same URL with a DELETE request deletes the friend from the user." src="./assets/images/social-network-demo-3.gif"/>
<br>Here's a <a href="https://drive.google.com/file/d/1lFS-3ORZYnVGgV1nAMe2rIg7Y3_VU8-z/view" target="_blank">link</a> to the video version of the above gif.
</p>

4. Get Thoughts:
   - Using a GET request to the api endpoint `localhost:3001/api/thoughts` will return all thoughts in the database.
   - Users can also navigate to `localhost:3001/api/thoughts/[thought_id]` and use a GET request in order to retrieve the thought specified by the id provided.

<p align="center">
<img alt="A demonstration gif that shows the user navigating to 'localhost:3001/api/thoughts' to retrieve all the thoughts from the database. Users can also navigate to 'localhost:3001/api/thoughts/[thought_id]' to retrieve the thought specified by the id provided." src="./assets/images/social-network-demo-4.gif"/>
<br>Here's a <a href="https://drive.google.com/file/d/1cinjaTmP7dK0oP59TKlWy4X6uopDk4Yl/view" target="_blank">link</a> to the video version of the above gif.
</p>

5. Manage Thoughts:
   - Using a POST request to the api endpoint `localhost:3001/api/thoughts` will create a new thought, as long as they have provided the necessary information. Follow the JSON data structure below for creating thoughts:
   ```
   {
      "thoughtText": "[thought_text]",
      "userId": "[user_id]"
      "username": "[username]"
   }
   ```
   - Users can also navigate to `localhost:3001/api/thoughts/[thought_id]` and use a PUT request in order to update the thought specified by the id provided.
   - Using the same URL as above, users can use a DELETE request to delete the thought at the specified ID.

<p align="center">
<img alt="A demonstration gif that shows a user using a POST request to the api endpoint `localhost:3001/api/thoughts` to create a new thought. Navigating to `localhost:3001/api/thoughts/[thought_id]` with a PUT request will update the thought specified by the id provided. Using a DELETE request to the same URL will delete the specified thought." src="./assets/images/social-network-demo-5.gif"/>
<br>Here's a <a href="https://drive.google.com/file/d/1ELGBQV9BqsxKKvbMxeuncbKcnc4-mvHQ/view" target="_blank">link</a> to the video version of the above gif.
</p>

6. Manage Reactions:
   - Using a POST request to the api endpoint `localhost:3001/api/thoughts/[thought_id]/reactions` will create a new reaction associated with the thought provided, as long as they have provided the necessary information. Follow the JSON data structure below for creating reactions:
   ```
   {
      "reactionBody": "[reaction_text]",
      "userId": "[user_id]"
      "username": "[user-name]"
   }
   ```
   - Users can also navigate to `localhost:3001/api/thoughts/[thought_id]/reactions/[reaction_id]` and use a DELETE request in order to delete the reaction specified at the thought specified by the id provided.

<p align="center">
<img alt="A demonstration gif of a user using a POST request to the api endpoint `localhost:3001/api/thoughts/[thought_id]/reactions` too create a new reaction associated with the thought provided. Users can also navigate to `localhost:3001/api/thoughts/[thought_id]/reactions/[reaction_id]` and use a DELETE request in order to delete the reaction specified." src="./assets/images/social-network-demo-6.gif"/>
<br>Here's a <a href="https://drive.google.com/file/d/1ujbeQ8HfbvEbaoxvDomjFOrN6iLqw44m/view" target="_blank">link</a> to the video version of the above gif.
</p>

## Installation

In order to use this application, you will need to install it on your local computer.

1. Open the command line interface.
2. Clone the repository onto your local machine using the `git clone` command.
3. Once the repository has been cloned, navigate into the root directory of the application using the command `cd Social-Network-API`.
4. Run the command `npm install` to install necessary packages and dependencies.
5. Once the dependencies have been properly installed, enter the command `npm start` to initiate the application and start the connection to the database.

For further help with installation, please refer to the below demonstration video.

<p align="center">
<img alt="A demonstration gif showing how to clone the repository to your local machine, install all necessary dependencies, and start the server." src="./assets/images/social-network-demo-7.gif"/>
<br>Here's a <a href="https://drive.google.com/file/d/1iRR5uPejoJflHy-VNW_as2M_jMB9MziZ/view" target="_blank">link</a> to the video version of the above gif.
</p>

## Technologies

- JavaScript
- Node.js
- npm
- Express.js
- MongoDB
- [Mongoose.js](https://mongoosejs.com/)

## Future Development

In the future, I would like to add the following improvements:

- This application focused on building the back-end for a potential website, but it's all ready to go for a user friendly front-end interface!
- The front-end of this website could use some filtering. It might be nice to be able to search for thoughts by keywords, or even search for users in order to add them as a friend.

I'm always interested in refactoring code to improve it's functionality. If you would like to suggest your own improvements, you can reach our development team at the links below.

- <a href="mailto:ashlynn4567@gmail.com">Email</a>
- <a href="https://github.com/ashlynn4567">GitHub</a>
- <a href="www.linkedin.com/in/Ashley-Lynn-Smith">LinkedIn</a>

## Credits

This project was built with the help of the University of Oregon's Coding Boot Camp.

## Licensing

The application is covered under the following license: [MIT](https://opensource.org/licenses/MIT)
