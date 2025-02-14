const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    sport: {
        type: String,
        required: true,
        enum: ['Skier', 'Snowboarder', 'Both'],
    },
    skillLevel: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
    }
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

module.exports = mongoose.model('User', userSchema);