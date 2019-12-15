import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => console.log('Connected to Database successfully'));

export async function createMongoDBConnection(mongodbURI: string): Promise<void> {
  try {
    await mongoose.connect(mongodbURI, {
      autoReconnect: true,
      useNewUrlParser: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000,
    });
  } catch (err) {
    await new Promise(resolve => {
      setTimeout(async () => {
        console.log('Error by connection to the Database');
        await createMongoDBConnection(mongodbURI);
        resolve();
      }, 20000);
    });
  }
}
