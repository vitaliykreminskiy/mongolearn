import Express, { Request } from 'express'
import Database from '../classes/Database'
export const CuisinesRouter = Express.Router()

type Cuisine = {
  title: string
  description: string
}

const COLLECTION = 'cuisines'

CuisinesRouter.get('/', async (req, res) => {
  const collection = Database.db.collection(COLLECTION)

  const cuisines = await collection
    .aggregate([
      {
        $lookup: {
          from: 'recipes',
          localField: '_id',
          foreignField: 'cuisineId',
          as: 'recipes',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          count: { $size: '$recipes' },
        },
      },
    ])
    .toArray()

  res.json(cuisines)
})

CuisinesRouter.post('/', async (req: Request<{}, {}, Cuisine>, res) => {
  const collection = Database.db.collection(COLLECTION)

  await collection.insertOne(req.body)

  res.send()
})
