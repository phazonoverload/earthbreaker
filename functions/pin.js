const { MongoClient } = require('mongodb')
const mongo = new MongoClient(process.env.MONGODB_URL, {
  useUnifiedTopology: true
})

exports.handler = async (event, context) => {
  try {
    const { code, name, latlng } = JSON.parse(event.body)

    await mongo.connect()
    const rooms = await mongo
      .db(process.env.MONGODB_DB_NAME)
      .collection('rooms')

    await rooms.update({ code }, { $push: { pins: { name, latlng } } })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pin added' })
    }
  } catch (e) {
    console.error('Error', e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}
