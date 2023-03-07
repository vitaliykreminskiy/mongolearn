import Express, { Request } from 'express'
import DB from '../classes/DB'

export const RecipesRouter = Express.Router()

RecipesRouter.get(
  '/fast',
  (req: Request<{}, {}, {}, { cuisine: string }>, res) =>
    DB.db
      .collection(req.query.cuisine)
      .find({ cookingTime: { $lt: 30 } })
      .toArray()
      .then((result) => res.json(result))
)

RecipesRouter.get(
  '/cheesy',
  (req: Request<{}, {}, {}, { cuisine: string }>, res) =>
    DB.db
      .collection(req.query.cuisine)
      .find({ ingredients: { $in: ['cheese'] } })
      .toArray()
      .then((result) => res.json(result))
)

RecipesRouter.get(
  '/',
  async (req: Request<{}, {}, {}, { cuisine: string }>, res) => {
    const cursor = await DB.db.collection(req.query.cuisine).find().toArray()

    return res.json(cursor)
  }
)

RecipesRouter.post(
  '/',
  (req: Request<{}, {}, {}, { cuisine: string }>, res) => {
    if (!req.query.cuisine) {
      return res.status(400).send()
    }

    return DB.db
      .collection(req.query.cuisine)
      .insertOne(req.body)
      .then((_) => res.send())
  }
)
