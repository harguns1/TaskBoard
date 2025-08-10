import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get("/api/boards", async (_req, res) => {
  const boards = await prisma.board.findMany({
    include: { lists: { include: { cards: true } } }
  })
  res.json(boards)
})

app.post("/api/boards", async (req, res) => {
  const board = await prisma.board.create({ data: { name: req.body.name } })
  res.json(board)
})

app.post("/api/lists", async (req, res) => {
  const list = await prisma.list.create({
    data: { name: req.body.name, boardId: req.body.boardId }
  })
  res.json(list)
})

app.post("/api/cards", async (req, res) => {
  const card = await prisma.card.create({
    data: { title: req.body.title, listId: req.body.listId }
  })
  res.json(card)
})

const port = process.env.PORT || 8080
app.listen(port, async () => {
  await prisma.$connect()
})

