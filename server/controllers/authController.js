const express = require('express');
const router = express.Router();
const User = require('../models/user');
require('dotenv').config();

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const newUser = new User({ name, email, password});
            await newUser.save();
            console.log("Signup successful");
            res.status(201).json({ data: "Success", message: "Signup Successful" });
        } else {
            console.log("User already exists");
            res.status(400).json({ data: "Exists", message: "User already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const payLoad = { name: user.name, email: user.email };
                const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                res.json({ accessToken: accessToken, response: "Success" });
                console.log("Login successful");
            } else {
                console.log("Password Incorrect");
                res.status(401).json({ message: "Password Incorrect" });
            }
        } else {
            console.log("User not found");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
