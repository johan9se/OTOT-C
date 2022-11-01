const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./model/user');
const db = require("./database");
db.connectDatabase();

const auth = require("./auth/auth")
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    return res.json({
        status: 'API is Working',
        message: 'Hello world'
    });
});

app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { username, email, password } = req.body;
        const role = "user";
        // Validate complete input
        if (!(username && email && password)) {
            return res.status(400).send("Please provide all details [username, email, password]!");
        }

        // Check if user already exists
        const foundUser = await User.findOne({ email: email.toLowerCase() });
        console.log(foundUser);
        if (foundUser) {
            return res.status(409).send("This user already exists in the system.");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in database
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role,
            token: null
        });

        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).send(`An error occurred: ${err}`);
    }
});

app.post("/register/admin", async (req, res) => {
    try {
        // Get user input
        const { username, email, password } = req.body;
        const role = "admin"
        
        // Validate complete input
        if (!(username && email && password)) {
            return res.status(400).send("Please provide all details [username, email, password]!");
        }

        // Check if user already exists
        const foundUser = await User.findOne({ email: email.toLowerCase() });

        if (foundUser) {
            return res.status(409).send("This user already exists in the system.");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in database
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role,
            token: null
        });

        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).send(`An error occurred: ${err}`);
    }
});

app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          return res.status(400).send("Email and/or password missing!");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create and save token if credentials match
            const token = jwt.sign(
                { user_id: user._id, email, role: user.role, date: Date.now() },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                }
            );    
            user.token = token;
            console.log(user);
            return res.status(200).json(user);
        }
        return res.status(400).send("Credentials are invalid");
    } catch (err) {
        return res.status(500).send(`An error occurred: ${err}`);
    }
});

app.get("/welcome", auth, (req, res) => {
    return res.status(200).send('Hi, you are authenticated to view this page!');
});

app.get("/admin", auth, (req, res) => {
    if (req.user && req.user.role != "admin") {
        return res.status(403).send("You are not authorized to access this page!");
    } else {
        return res.status(200).send('Hi, you are authorized to view this page!');
    }
})

module.exports = app;