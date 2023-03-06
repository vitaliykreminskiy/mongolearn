import { MongoClient, Db } from 'mongodb'

class DB {
  private static instance: DB
  private client!: MongoClient
  public db!: Db

  private constructor() {}

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB()
      DB.instance.connect()
    }

    return DB.instance
  }

  private async connect() {
    try {
      this.client = await MongoClient.connect('mongodb://localhost:27017')
      this.db = this.client.db('recipes')
      console.log('Connected to MongoDB')
    } catch (err) {
      console.error(err)
    }
  }

  public async disconnect() {
    try {
      await this.client.close()
      console.log('Disconnected from MongoDB')
    } catch (err) {
      console.error(err)
    }
  }
}

export default DB.getInstance()
