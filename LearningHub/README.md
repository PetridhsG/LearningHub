
# Project Setup Instructions

First, make sure Node.js is installed on your PC.

Once it’s installed, run the following command to create the necessary node_modules directory for the app:

```bash
npm install
```

To run the app, navigate to the root project directory and execute the following command:

```bash
node index.js
```

If you want to test live changes in the code, run the app using:

```bash
nodemon index.js
```

If you need to run the server with different options, modify the `options` JSON in `index.js`. The available options are:

- **reset**: Resets the database to a consistent state.
- **displayUsers**: Displays all the users in the database.

### Login to `category.html` using one of the following users:

- **username**: `zafeiris` — 2 learning items already in the cart
- **username**: `petridis` — 1 learning item already in the cart
- **username**: `kefalas` — 0 learning items in the cart

**Password**: `qwerty12` for all users.

---

## Notes:

- The app uses a MongoDB database to store user data, including login details and items in the cart. Sometimes, UI updates may be slow because MongoDB can enter a sleep mode when not used for a long time, causing delays when querying data again.

- The app uses the Session Storage API to maintain the session ID. This ensures that a logged-in user's information is kept while the session remains active
