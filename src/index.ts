import Express from 'express'
import { RecipesRouter } from './routers/recipes'
import { CuisinesRouter } from './routers/cuisines'

const PORT = 3000
const app = Express()

app.use(Express.json())
app.use('/recipes', RecipesRouter)
app.use('/cuisines', CuisinesRouter)

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`)
})
