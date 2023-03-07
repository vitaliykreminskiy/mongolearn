import Express, { Request } from 'express'
import DB from '../classes/DB'

export const CuisinesRouter = Express.Router()

CuisinesRouter.get(
  '/',
  async (req: Request<{}, {}, {}, { cuisine: string }>, res) => {
    const collections = await DB.db.listCollections().toArray()

    res.json(collections.map((collection) => collection.name))
  }
)
