const { MongoClient } = require('mongodb')
const mongo = new MongoClient(process.env.MONGODB_URL, {
  useUnifiedTopology: true
})

exports.handler = async (event, context) => {
  try {
    const { code } = event.queryStringParameters
    await mongo.connect()
    const rooms = await mongo
      .db(process.env.MONGODB_DB_NAME)
      .collection('rooms')
    let room = await rooms.findOne({ code })
    if (!room) {
      await rooms.insertOne({ code, pins: [], created: new Date() })
      room = { code, pins: [], created: new Date() }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        doc: room,
        message: room ? 'Room exists' : 'Room created',
        username: process.env.MAPBOX_USERNAME,
        token: process.env.MAPBOX_TOKEN
      })
    }
  } catch (e) {
    console.error('Error', e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}
