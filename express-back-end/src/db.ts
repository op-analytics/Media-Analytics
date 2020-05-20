import mongoose from 'mongoose';

export default {
  mongoose,
  connect: async (database: string): Promise<typeof mongoose> => {
    try {
      const conn = await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      // eslint-disable-next-line
      console.log(`MongoDb Connected`);
      return conn;
    } catch (err) {
      // eslint-disable-next-line
      console.log('Error to connect on mongo', err);
      throw err;
    }
  },
  disconnect: async (): Promise<void> => mongoose.connection.close(),
};
