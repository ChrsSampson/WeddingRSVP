// this is a script to create a admin user

// this requires the dotenv package to be installed and an .env.local file to be created

require('dotenv').config({ path: '.env.local'})

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const connectDB = async () => {
    try {
        mongoose.connection.once('open', () => {
            console.log('MongoDB connection established');
        });
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

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


const username = process.env.ADMIN_USERNAME || 'admin@me.com';
const password = process.env.ADMIN_PASSWORD || '12345';

const adminUser = new User({
    email:username,
    password,
    firstName: 'Admin',
    lastName: 'User',
    party: null,
    role: 'admin'
});

const createAdmin = async () => {
    try {
        await connectDB();
        await adminUser.save();
        return 
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

createAdmin()
    .then(() => {
        console.log('Admin user created');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
    