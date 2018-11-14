const process  = require("process")

const express = require("express")
const helmet = require("helmet")
const redis = require("redis")

const app = express()
const PORT = 8080

// config networking for redis-server
const client = redis.createClient({
  // connection url or docker service. default port for redis is 6379
  host: "redis-server"
  , port: 6379 // default port number for redi-server
})

app.use(helmet())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())

// set visits upon entry into app
client.set("visits", 0)

app.get("/", (req, res, next) => {
  // 0: exit process with status "OK"
  // process.exit(0)

  client.get("visits", (err, visits) => {
    res.send(`<h2>VISITS: ${visits}</h2>`)
    client.set("visits", parseInt(visits) + 1)
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})
