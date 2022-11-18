// mongoose user model

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


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




const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;