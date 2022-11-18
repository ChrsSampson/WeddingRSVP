// mongodb connection

const mongoose = require('mongoose');

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

export default connectDB;