import mongoose from 'mongoose';
import dotenv from 'dotenv'

function connectDB() {
  try {
    dotenv.config()
    mongoose.connect(
      process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  } catch (err) {
    console.log(err)
  }
}

export { connectDB }