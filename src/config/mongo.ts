import mongoose from 'mongoose'

const isAtlas = () => process.env.MONGO_PROTOCOL !== 'mongodb'
const generateAtlasUrl = () => 
  `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`
const generateLocalUrl = () => 
  `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`


const connect = async () => {
  try {
    const connectionURL = isAtlas() ? generateAtlasUrl() : generateLocalUrl()
    return mongoose.connect(connectionURL)
  } catch (e) {
    console.log(e)
    return e
  }
}

export default connect