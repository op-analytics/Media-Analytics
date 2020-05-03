const mongoose = require('mongoose');

module.exports = {
  mongoose,
  connect: async database => {
    try {
      const conn = await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      //eslint-disable-next-line
      console.log(`MongoDb Connected`);
      return conn;
    } catch (err) {
      //eslint-disable-next-line
      console.log('Error connecting to mongo');
      throw err;
    }
  },
  disconnect: async () => await mongoose.connection.close(),
};
