import { MongoClient, Db } from 'mongodb'

class Database {
  private static instance: Database
  private client!: MongoClient
  public db!: Db

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
      Database.instance.connect()
    }

    return Database.instance
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

export default Database.getInstance()
