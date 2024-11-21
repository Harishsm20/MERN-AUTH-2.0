const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Otp = require("../models/otp");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Email Transporter Error:', error);
    } else {
        console.log('Email Transporter is ready');
    }
});

// Function to generate random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};

// Signup with OTP
router.post('/signup', async (req, res) => {
    const { name, email, password, otp } = req.body;

    try {
        console.log("Signup Request Body:", req.body); // Log request body

        // Ensure required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ data: "Exists", message: "User already exists" });
        }

        if (otp) {
            // Verify OTP
            const otpRecord = await Otp.findOne({ email });
            if (!otpRecord) {
                return res.status(400).json({ message: "OTP not found for this email" });
            }

            if (otpRecord.otp !== otp) {
                return res.status(400).json({ message: "Invalid OTP" });
            }

            if (new Date() > otpRecord.expiresAt) {
                return res.status(400).json({ message: "OTP has expired" });
            }

            // OTP is valid, hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });

            // Save user and remove OTP
            await newUser.save();
            await Otp.deleteOne({ email });

            console.log("User signed up successfully:", newUser);
            return res.status(201).json({ message: "Signup successful" });
        } else {
            // Generate and save OTP in the database
            const otpCode = generateOTP();
            const otpExpiration = new Date(Date.now() + 2 * 60 * 1000); // OTP valid for 2 mins

            await Otp.findOneAndUpdate(
                { email },
                { otp: otpCode, expiresAt: otpExpiration },
                { upsert: true }
            );

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "OTP for Signup",
                text: `Your OTP for signup is ${otpCode}. This OTP is valid for 2 minutes.`,
            });

            console.log("OTP sent to email:", email, "OTP:", otpCode);
            return res.json({ message: "OTP sent to your email" });
        }
    } catch (error) {
        console.error("Error in /signup route:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
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

// Forget password route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate OTP and save it in DB (valid for 5 minutes)
        const otpCode = generateOTP();
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

        await Otp.findOneAndUpdate(
            { email },
            { otp: otpCode, expiresAt: otpExpiration },
            { upsert: true }
        );

        const resetToken = jwt.sign({ email: user.email }, process.env.RESET_TOKEN_SECRET, { expiresIn: '5min' });

        // Send OTP email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otpCode}. This OTP is valid for 5 minutes.`,
        });

        res.json({ message: "OTP sent to your email", resetToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
    const { token, otp, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
        const { email } = decoded;

        // Reset password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        // Remove OTP after password reset
        await Otp.deleteOne({ email });

        res.json({ message: "Password has been reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/confirm-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Verify OTP
        const otpRecord = await Otp.findOne({ email });
        if (!otpRecord || otpRecord.otp !== otp || new Date() > otpRecord.expiresAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // OTP is valid, allow the user to reset password
        res.json({ message: "OTP verified" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
