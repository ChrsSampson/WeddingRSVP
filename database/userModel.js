// mongoose user model

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
import Party from './partyModel.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        default: null
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
        required: false
    },
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party'
    },
    attending:{
        type: Boolean,
        default: false
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
    songRequests: {
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
    if ( (this.isModified('password') || this.isNew) && (this.password && this.password.length) ) {
        try {
            // hash user password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            next();
        } catch (err) {
            next(err);
        }
    }

    // add user to party
    if(this.isModified('party') || this.isNew && this.party && this.party.length) {
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

userSchema.pre(['updateOne', 'findOneAndUpdate'], async function(next) {
    try{
        if (this._update.password && this._update.password.length > 0) {
            // hash user password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this._update.password, salt);
            this._update.password = hash;
            next();
        }

    } catch (err) {
        next(err);
    }
});

userSchema.post(['updateOne', 'findOneAndUpdate'], async function(doc, next) {
    // add user to party

    // get the user id 
    const partyId = doc.party
    const userId = doc._id;

    try{
        const party = await Party.findOne({_id: partyId});
        // add the user to the party if the user is not already in the party
        if(party && party.users.indexOf(userId) === -1){
            party.users.push(userId);
            await party.save();
        } else if (party && party.users.indexOf(userId) > -1) {
            // remove the user from the party if the user is already in the party
            party.users = party.users.filter(user => user != userId);
            await party.save();
        }    
    } catch (err) {
        next(err);
    }
    next();
});

// remove user from party on user deletion
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