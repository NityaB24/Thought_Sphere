
# Thought-Sphere

Welcome to Thought-Sphere, a platform designed to foster connections and meaningful interactions among users.

## Introduction

Thought-Sphere is a project aimed at creating a vibrant online community where users can share their thoughts, ideas, and experiences. Whether you're looking to engage with others' content or share your own, Thought-Sphere provides the tools and features to facilitate seamless interaction.

## Features

- **User Authentication**: Secure login using JWT (JSON Web Tokens) and bcrypt ensures the protection of user accounts and data.
- **Profile Management**: Customize your profile by uploading a profile picture, create posts, and navigate effortlessly through the platform.
- **Home Feed**: Discover a diverse range of content from other users on your home feed. Engage with posts that resonate with you and contribute to the conversation.
- **Interactivity**: Like and interact with others' content to show appreciation and foster connections within the community.

## Technologies Used

Thought-Sphere is built using modern technologies and frameworks, including:

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- bcrypt
- multer
- cookie-parser

## Getting Started

To get started with Thought-Sphere, follow these steps:

1. Clone this repository to your local machine.
   ```
   git clone https://github.com/NityaB24/Thought_Sphere.git
   ```
3. Install the necessary dependencies using
   ```
   npm init -y
   npm i express jsonwebtoken bcrypt cookie-parser ejs mongoose multer 
   ```
4. Set up your MongoDB database and configure the connection in the project (Go to models, user_project.js there you will find mongoose.connect their change 

  ```
  mongodb://Your_address/Database_name
  ```
  
5. Run the application using `npm start`.
6. Access the application through your preferred web browser.

## Future Plans

We're continuously working on enhancing the Thought-Sphere platform. Some of our future plans include:

- Implementing additional features to improve user experience.
- Enhancing security measures to safeguard user data.
- Expanding the community and fostering collaboration among users.

---

Feel free to customize this README file further based on your specific project details and preferences.
