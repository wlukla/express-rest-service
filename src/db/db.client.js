const mongoose = require('mongoose');
const usersRepo = require('../resources/users/user.db.repository');

const connectToDB = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    await db.dropDatabase();
    await usersRepo.addUser({ login: 'admin', password: 'admin' });
    console.log('Database connected!');
    callback();
  });
};

module.exports = connectToDB;
