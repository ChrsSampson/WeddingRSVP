// party mongoose model - users can be part of a pary and each party has the same invite code

const mongoose = require('mongoose');

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
    } catch (err) {
        next(err);
    }
    next();
});


const Party = mongoose.models.Party || mongoose.model('Party', partySchema);

module.exports = Party;