const express = require('express')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
// let MongoClient = require('mongodb').MongoClient
const User = require('./models/User')

const app = express()
app.use(express.json())

const connectDB = async () => {
  await mongoose.connect(
    // if localhost, i.e. your laptop, change mongo-container to localhost
    'mongodb://localhost:27017/techworld-user?authSource=admin',
    // 'mongodb://mongo-container:27017/techworld-user?authSource=admin', // when bring up this node app to docker, must run in same network as mongo-container
    // , mongo-container is name of the service

    {
      // user: 'admin',
      // pass: 'password',
      auth: { user: 'admin', password: 'password' },
      // dbName: 'techworld-user',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  console.log('MongoDB connected in dev env')
}

connectDB()

// Or this, originally from tutorial video
// mongoose.Promise = global.Promise
// mongoose
//   .connect('mongodb://localhost:27017', {
//       d
//     useNewUrlParser: true,
//     user: 'admin',
//     pass: 'password',
//   })
//   .then(() => {
//     console.log('successfully connected to the database')
//   })
//   .catch((err) => {
//     console.log('error connecting to the database')
//     console.log(err)
//     process.exit()
//   })

app.use(express.static(__dirname + '/images'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/get-profile', async (req, res) => {
  const user = await User.findOne({ userid: 1 })
  console.log(user)
  res.send(user)

  //   MongoClient.connect(
  //     'mongodb://admin:passwor@localhost:27017',
  //     (error, client) => {
  //       if (error) throw error

  //       console.log('mongodb connected')
  //       const db = client.db('techworld-user')
  //       const query = { userid: 1 }
  //       db.collection('users').findOne(query, (error, result) => {
  //         if (error) throw error
  //         client.close()
  //         response.send(result)
  //       })
  //     }
  //   )
})

app.post('/update-profile', async (req, res) => {
  console.log(req.body)
  const updatedProfile = await User.findOneAndUpdate({ userid: 1 }, req.body, {
    new: true,
  })
  res.send(updatedProfile)
  // let userObj = req.body;

  // MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
  //   if (err) throw err;

  //   let db = client.db(databaseName);
  //   userObj['userid'] = 1;

  //   let myquery = { userid: 1 };
  //   let newvalues = { $set: userObj };

  //   db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
  //     if (err) throw err;
  //     client.close();
  //   });

  // });
  // // Send response
  // res.send(userObj);
})

app.listen(3000, () => console.log('Server started on port 3000'))
