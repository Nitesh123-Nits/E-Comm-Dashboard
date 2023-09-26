const express = require('express');
const app = express();
app.use(express.json())
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'
require('./db/config')

const cors = require('cors')
app.use(cors())

const Product = require('./db/Product')

const User = require('./db/User')

app.post("/signup", async (req, resp) => {
  let user = new User(req.body)
  let result = await user.save()
  result = result.toObject()

  delete result.password
  if(!result.email || !result.password || !result.name){
    resp.send({result:"Enter the detail"})
  }
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "Something went wrong try again" })
    }
    resp.send({ result, auth: token })
  })
})

app.post("/login", async (req, resp) => {
  console.log(req.body)
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "Something went wrong try again" })
        }
        resp.send({ user, auth: token })
      })

    }
    else {
      resp.send({ result: "No User Found!" })
    }
  }
  else {
    resp.send({ result: "No User Found!" })
  }
})

app.post('/add-product', async (req, resp) => {
  let product = new Product(req.body)
  if(product.name){
    let result = await product.save()
    resp.send(result)
  }
  else{
    resp.send("Enter product")
  }
 
})

app.get('/products', async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products)
  }
  else {
    resp.send({ result: "No product Found" })
  }
})
// model returns promise so use async and await
app.delete(("/product/:id"), async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  resp.send(result)
})

app.get('/product/:id', async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id })
  if (result) {
    resp.send(result)
  }

  else {
    resp.send("No record found")
  }

})

app.put('/product/:id', async (req, resp) => {
  let result = await Product.updateOne(
    {
      _id: req.params.id
    },
    {
      $set: req.body
    }
  )
  resp.send(result)
})

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }
    ]
  })
  resp.send(result)
})

// next parameter 
function verifyToken(req, resp, next) {
  let token = req.headers['authorization']
  if (token) {
    token = token.split(' ')[1]
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide token with header" })
      }
      else {
        next();
      }
    })
  }
  else {
    resp.status(403).send({ result: "Please add token with header" })
  }
}


app.listen(5000)