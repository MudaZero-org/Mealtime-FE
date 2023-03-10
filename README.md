# Mealtime

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contributors](#contributors)

# Introduction  
[Mealtime](https://mealtime-web.com) gives businesses the ability to generate ready-to-cook meal packs to sell to their customers. Meal packs are a collection of the ingredients and instructions required to make a meal. The businesses can add the ingredients they have available in their stores, and then choose from our list of generated meal pack options. Businesses can use our app to increase the amount of appealing products in their store and provide convenience for their customers.

<br>
<a href="https://mealtime-web.com">Mealtime</a> uses JavaScript and React for the structure of the frontend, and Sass, Bulma, and Bootstrap for the styling. For the backend, we used Node.js, Express.js, JWT, and PostgreSQL. We also used <a href="https://spoonacular.com/food-api">Spoonacular</a> as an external api to get our meal pack data from. Finally, our backend is containerized with Docker and is deployed using AWS (ECS, Cloudfront, and S3).

# Features
* Uses Spoonacular API for access to thousands of delicious meal packs
* Accepts user-generated ingredient input and generates relevant meal packs
* Favoriting system to easily find popular meal packs
* Users can save their meal packs to their profile for easier access
* Downloadable PDF of meal packs for users to attach to products to sell with QR code, ingredients, and instructions
* Profile customizability

# Getting Started
### ‼️ Things you will need:
* Clone the <a href="https://github.com/MudaZero-org/Mealtime-BE">Mealtime-BE</a> repo and follow setup instructions

# Setup
Just start by running the following command in the root folder to install dependencies  
```
npm install
```  
You can then run the frontend in it's development mode by using:
```
npm start
```

# Contributors
Feel free to check out our github pages and see what other projects we have worked on! 😎
<table>
  <tr>
    <td align="center"><a href="https://github.com/faceless5879"><img src="https://avatars.githubusercontent.com/u/82570618?v=4" width="200px;" alt=""/><br /><sub><b>Dat Pham</b></sub></a></td>
    <td align="center"><a href="https://github.com/brian-walvoord"><img src="https://avatars.githubusercontent.com/u/84251599?v=4" width="200px;" alt=""/><br /><sub><b>Brian Walvoord</b></sub></a></td>
    <td align="center"><a href="https://github.com/iAmKenKinoshita"><img src="https://avatars.githubusercontent.com/u/89846582?v=4" width="200px;" alt=""/><br /><sub><b>Ken Kinoshita</b></sub></a></td>
    <td align="center"><a href="https://github.com/Ricccck"><img src="https://avatars.githubusercontent.com/u/99594245?v=4" width="200px;" alt=""/><br /><sub><b>Riku Usui</b></sub></a></td>
  </tr>
</table>
