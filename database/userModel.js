// mongoose user model

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

userSchema.pre('save', async function(next) {
    // hash the password before save on creation and update
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            next();
        } catch (err) {
            next(err);
        }
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;