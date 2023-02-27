const express = require('express')
const cors = require('cors')
const fs = require('fs')
const requestIp = require('request-ip')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile('public/index.html', {root: __dirname})
}) 

app.post('/log', (req, res) => {
  let str = JSON.stringify({
    timestamp: (new Date(Date.now())).toString(),
    IP: requestIp.getClientIp(req),
    ...req.body
  }) + "\n"
  fs.appendFile('./log.txt', str, console.log)
  res.send({status: 200})
})

console.log(process.env.PORT)
app.listen(process.env.PORT | 5000)