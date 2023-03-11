import Express, { Request } from 'express'
import { ObjectId } from 'mongodb'

import Database from '../classes/Database'

enum Units {
  tsp = 'tsp',
  tbsp = 'tbsp',
  pieces = 'pieces',
  grams = 'grams',
  miligrams = 'miligrams',
  kilograms = 'kilograms',
}

type IngredientAmount = {
  amount: number
  unit: keyof Units
}

type Ingredient = {
  name: string
  amount: IngredientAmount
}

type Recipe = {
  title: string
  cookingTime: string
  cookingsteps: string[]
  ingredients: Ingredient[]

  cuisineId: string
}

const COLLECTION = 'recipes'

export const RecipesRouter = Express.Router()

RecipesRouter.post('/', (req: Request<{}, {}, Recipe>, res) => {
  Database.db
    .collection(COLLECTION)
    .insertOne({ ...req.body, cuisineId: new ObjectId(req.body.cuisineId) })
    .then((_) => res.send())
})

RecipesRouter.get('/', async (req, res) => {
  const collection = Database.db.collection(COLLECTION)

  const cuisines = await collection.find().toArray()

  res.json(cuisines)
})
