const http = require ("http")
const express = require ('express')
const { application } = require("express")
const app = express ()
app.use(express.json())

let persons = [
  {
    'id': 1,
    'name': 'john smith',
    'number': '234-456-2344'
  },
  {
    'id': 2,
    'name': 'funny lookin',
    'number': '345-345-3456'
  },
  {
    'id': 3,
    'name': 'not much',
    'number': '237-455-2345'
  },
  {
  'id': 4,
  'name': 'jimmy waits',
  'number': '230-456-6788'
  }
]
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId + 1
}

app.post('/api/persons',(request, response) => {
    const body = request.body
    if(!body.name){
      return response.status(400).json({
        error: 'name missing'
      })
    }
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number || false,
      date: new Date()
    }

    persons = persons.concat(person)
    response.json(person)
})
let person = persons.length
let date = new Date()
app.get('/', (request, response) => {
  response.send('<h1>HELLO IN THERE</h1>')
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
  response.send(`Phonebook has records for ${person} people ${date}`)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const ind = persons.find(ind => ind.id === id)
  if(ind){
    response.json(ind)
  } else{
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(ind => ind.id !== id)
  response.status(204).end()
})
app.use(morgan)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)