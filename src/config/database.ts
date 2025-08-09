import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
      console.log('⚠️  MONGODB_URI not set, skipping database connection')
      return
    }

    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    console.log(`✅ MongoDB connected: ${conn.connection.host}`)

    mongoose.connection.on('error', (err: Error) => {
      console.error('❌ MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('📦 MongoDB disconnected')
    })

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close()
        console.log('📦 MongoDB connection closed through app termination')
      } catch (err) {
        console.error('❌ Error closing MongoDB connection:', err)
      } finally {
        process.exit(0)
      }
    })
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    console.log('⚠️  Continuing without database connection')
  }
}
