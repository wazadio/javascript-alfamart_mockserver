const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const invalid_password = "mock_server"
var respon
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/request', (req, res) => {
  if (req.query.pwd == invalid_password){
  	req_param = req.query
  	respon = "0000"+":"+"Succes"+":"+req_param.tx_id+":"+req_param.tx_date+":"+req_param.name+":"+req_param.rek_type+":"+"1000"+":"+req_param.cust_key
  	res.send(respon)
  }
  else {
  	res.status(400).send("0004:Invalid PIN")
  }
  
  /*
  req_param = req.query
  console.log(req_param)
  console.log(typeof req_param)
  //console.log(req.query)
  //console.log(typeof req.query)
  res.header('Content-Type', 'text/plain; charset=utf-8')
  //console.log(req.query.id)
  //console.log(typeof req.query.id)*/	
  
})
/*
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
*/
// Use default router
//server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})