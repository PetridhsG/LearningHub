// App config 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); 
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 8080;
const { ObjectId } = mongoose.Types;

const runOptions = {
    reset : false,        // Reset the database to a consistent state
    displayUsers: false   // Display all the users in the database
}

// MongoDB credentials
const mongoCredentials = {
    username: "petridhs_kefalas",
    password: "qwerty12",
    cluster: "learninhub"
};

const mongoURI = `mongodb+srv://${mongoCredentials.username}:${mongoCredentials.password}@${mongoCredentials.cluster}.lupwx.mongodb.net/?retryWrites=true&w=majority&appName=learninhub`;

// Use mongoose to connect to MongoDB
mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define the User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: [
        {
            id: { type: Number, required: true }, // ID of the learning item
            type: { type: String, required: true }, // Type of item ("Book" or "Lecture")
            title: { type: String, required: true }, // Title of the learning item
            cost: { type: Number, required: true }, // Cost of the learning item
        }
    ]

});

// Create the User model
const User = mongoose.model('User', userSchema);

// Middleware for serving static content from "public" directory
app.use(express.static('public'));

// Middleware to parse URL-encoded and JSON content from the body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve index.html as content root
app.get('/', function(req, res) {
    var options = {
        root: path.join(__dirname, 'public')
    };

    res.sendFile('index.html', options, function(err) {
        if (err) {
            console.error(err);
        }
    });
});

// Route to authenticate a user
app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {    
            res.status(200).json({ok: true, sessionId: uuidv4()})   // Create new sessionId and sent it to client
        } else {
            res.status(401).json({ok: false, message:'Unauthorized'});
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Error during authentication');
    }
});

// Route to add learning item
app.post('/cart/add', async (req, res) => {
    const { username, learningItem } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            // Check if the item is already in the user's cart
            const itemExists = user.cartItems.some(item => String(item.id) === String(learningItem.id));
            if (itemExists) {
                return res.status(400).json({
                    ok: false,
                    message: "Item is already in the cart"
                });
            }
            user.cartItems.push(learningItem);
            await user.save();
            return res.status(200).json({
                ok: true,
                message: "Item added to the cart successfully"
            });
        } else {
            return res.status(401).json({ ok: false, message: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Error during authentication');
    }
});

// Route to get cart items for a user
app.get('/cart', async (req, res) => {
    const { username } = req.query;  
    try {
        const user = await User.findOne({ username });
        if (user) {
            const totalCost = user.cartItems.reduce((sum, item) => sum + item.cost, 0); // Calculate the total price
            res.status(200).json({ 
                cartItems: user.cartItems,
                totalCost: totalCost
            });
        } else {
            res.status(401).json({ ok: false, message: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).send('Error during authentication');
    }
});

// Route to remove a specific cart item for a user
app.delete('/cart/remove', async (req, res) => {
    const { username, itemId } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            user.cartItems = user.cartItems.filter(item => item.id !== itemId); // Remove the specific item
            await user.save();
            const totalCost = user.cartItems.reduce((sum, item) => sum + item.cost, 0);  // Calculate the new total price
            return res.status(200).json({ cartItems: user.cartItems, totalCost });
        } else {
            return res.status(401).json({ ok: false, message: 'Unauthorized' });
        }
    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).send("Error removing item");
    }
});

// Start the server
startApp(runOptions)

// Start the Application with the given options
function startApp(options){
    if(options.reset){
        resetDatabase() 
    }
    if(options.displayUsers){
        displayAllUsers()   
    }
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// Prints all the users in the database in the log (DEBUGGING MODE)
async function displayAllUsers(){
    const users = await User.find();
    console.log(users)
}

// Returns database to a standard instance (DEBUGGING MODE)
async function resetDatabase() {
    try {
      // Remove all records from the User collection
      await User.deleteMany({});
  
      // Insert new users with the specified data
      const petridhs = new User({
        _id: new ObjectId(),
        username: 'petridhs',
        password: 'qwerty12',
        cartItems: [
          { id: 3, type: "Lecture", title: "Data Visualization", cost: 6056 },
        ]
      });

      const kefalas = new User({
        _id: new ObjectId(),
        username: 'kefalas',
        password: 'qwerty12',
        cartItems: [

        ]
      });

      const zafeirhs = new User({
        _id: new ObjectId(),
        username: 'zafeiris',
        password: 'qwerty12',
        cartItems: [
          { id: 1, type: "Book", title: "Java in Action", cost: 42 },
          { id: 10, type: "Lecture", title: "Learn Java", cost: 100 }
        ]
      });
  
      // Save the new users to the database
      await petridhs.save();
      await kefalas.save();
      await zafeirhs.save();
  
      console.log("Database reset completed.")
    } catch (error) {
      console.error('Error resetting database and adding users:', error);
    }
}
