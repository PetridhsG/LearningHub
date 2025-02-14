# LearningHub

## Description
This project is a dynamic website that fetches data from an API and includes a backend implemented with Node.js and MongoDB for data storage. The website allows users to browse learning items based on categories and subcategories, manage a shopping cart, and log in to access personalized features. Handlebars is used for rendering most dynamic content, while React is used specifically for handling cart functionality.

## Features
- **Browse Learning Items**: Users can explore various learning materials categorized by topics and subcategories.
- **User Authentication**: A login form is provided to authenticate users.
- **Shopping Cart Management**:
  - Add items to the cart
  - Remove items from the cart
  - Retrieve cart items
- **Dynamic Rendering**:
  - Handlebars (Handlebars.js) is used for most of the frontend rendering.
  - React is used for rendering the cart items dynamically on `cart.html`.

## Technologies Used
- **Frontend:**
  - HTML, CSS, JavaScript
  - Handlebars.js (for templating)
  - React.js (for cart management)
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB (for storing user and cart data)
- **API Usage:**
  - Fetching data dynamically for learning items
