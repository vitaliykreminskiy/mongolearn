import Express, { Request } from 'express'
import { MongoClient } from 'mongodb'
import DB from './classes/DB'

const PORT = 3000
const app = Express()
const connectionString: string = 'mongodb://localhost:27017/recipes'

const mongoClient = new MongoClient(connectionString)

app.use(Express.json())

app.get('/', (_, res) => {
  res.status(200).json(['hello'])
})

app.get('/recipes', (_, res) => {
  DB.db
    .collection('recipes')
    .findOne()
    .then((result) => res.status(200).json(result))
})

app.post('/recipes', (req: Request<{}, {}, {}, { cuisine: string }>, res) => {
  if (!req.query.cuisine) {
    return res.status(400).send()
  }

  return DB.db
    .collection(req.query.cuisine)
    .insertOne(req.body)
    .then((_) => res.send())
})

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`)
})
