const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use(cors());

// 1. Registration Route
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // TODO: Insert into your MySQL/Supabase 'users' table here
        // INSERT INTO users (name, email, password) VALUES (name, email, hashedPassword)
        
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // TODO: Fetch user from database by email and compare password with bcrypt.compare()

        res.status(200).json({ message: "Login successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Logout Route
app.post('/api/logout', (req, res) => {
    // Clear token/session state handler
    res.status(200).json({ message: "Logged out successfully!" });
});

// 4. Password Reset Route
app.post('/api/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
        // TODO: Update user password in database where email matches

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));