// party mongoose model - users can be part of a pary and each party has the same invite code

const mongoose = require('mongoose');
import User from './userModel.js';

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    inviteCode: {
        type: Number,
        required: true,
        default: 123456,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

partySchema.pre('save', async function (next) {
    try{
        // generate 6 digit invite code, numbers only
        if(this.isNew){
            this.inviteCode = Math.floor(100000 + Math.random() * 900000);
            console.log(this.inviteCode)
        }

        // if party has users, add party to each user's party array
        if(this.users.length > 0) {
            this.users.forEach(async (user, index) => {
                const User = require('./userModel');
                const foundUser = await User.findById(user);
                foundUser.parties.push(this._id);
                await foundUser.save();
            });
        }
    } catch (err) {
        next(err);
    }
    next();
});


partySchema.post(['update', 'updateOne', 'findByIdAndUpdate'], async function (next) {
    console.log('party update')
});


partySchema.pre(['remove', 'findByIdAndDelete'], async function (next) {
    try {
        // remove party from each user's party array
        this.users.forEach(async (user, index) => {
            const User = require('./userModel');
            const foundUser = await User.findById(user);
            foundUser.parties.remove(this._id);
            await foundUser.save();
        });
    } catch (err) {
        next(err);
    }
    next();
});


const Party = mongoose.models.Party || mongoose.model('Party', partySchema);

module.exports = Party;