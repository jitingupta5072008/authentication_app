const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router();
// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const exitUserByEmail =await User.findOne({email})
        if(exitUserByEmail){
            res.status(404).json({ message: 'username or email Already Exit Please Login.' });
        }else{
            const user = new User({ username, email, password });
            await user.save();
            res.status(201).json({ message: 'User Registered Successfully' });
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "This account doesn't exit. Please register again or check this email " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successfully!', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify Token
// router.get('/verify', (req, res) => {
//     const token = req.headers['x_auth_token'];
//     if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         res.status(200).json({ id: verified.id });
//     } catch (err) {
//         res.status(400).json({ message: 'Token is not valid' });
//     }
// });
router.get('/profile',async(req, res) => {
    const token = req.headers['x_auth_token'];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        // console.log('user--',user)
        res.json({ user });
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
});

module.exports = router;
