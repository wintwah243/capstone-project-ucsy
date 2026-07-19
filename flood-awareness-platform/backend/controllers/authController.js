const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'ဒီ Email နဲ့ အကောင့်ရှိပြီးသားဖြစ်နေသည်' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်' });
    } catch (err) {
        res.status(500).json({ message: 'Server အမှားဖြစ်ပေါ်နေသည်' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေသည်' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေသည်' });

        // JWT Token 
        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server အမှားဖြစ်ပေါ်နေသည်' });
    }
};

module.exports = { registerUser, loginUser };