// mongoose user model

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
import Party from './partyModel.js';

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
    foodSelection: {
        type: String,
        required: false,
        default: null
    },
    allergies: {
        type: String,
        required: false,
        default: null
    },
    color: {
        type: String,
        default: '#fff'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

userSchema.pre('save', async function(next) {
     // generate a random color for the user on user creation
     if(this.isNew){
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

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

    if(this.isModified('party') || this.isNew){
        try {
            const party = await Party.findById(this.party);
            party.users.push(this._id);
            await party.save();
            next();
        } catch (err) {
            next(err);
        }
    }

});


userSchema.pre('deleteOne', async function(next) {
    try {
        const party = await Party.findById(this.party);
        party.users.pull(this._id);
        await party.save();
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;