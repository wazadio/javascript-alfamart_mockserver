const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const invalid_password = "mock_server"
const expired_password = "123"
const mobile_number = "081234566789"
const current_amount = 100000
const amount_limit = 200000
const min_amount_limit = 10000
var respon
const transaction_type = ["111", "112", "114"]
const parameter = ['login', 'pwd', 'tx_date', 'tx_type', 'terminal', 'cust_key', 'tx_amt', 'tx_id', 'name', 'rek_type']
const blacklisted = "123456789"


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/request', (req, res) => {
  req_param = req.query
  

  if (parameter.toString() != Object.keys(req_param).toString()) {
    res.status(400).send("0001:Invalid Transaction")
  }
  else if (req_param.pwd != invalid_password){
  	res.status(400).send("0004:Invalid PIN")
  }
  else if (req_param.pwd == expired_password){
    res.status(400).send("00Q1:PIN Expired")
  }
  else if (transaction_type.includes(req_param.tx_type) == false) {
    res.status(400).send("0005:Invalid Transaction Type")
  }
  else if (isNaN(Number(req_param.tx_amt))) {
    res.status(400).send("0006:Invalid Amount Field")
  }
  else if (req_param.cust_key != mobile_number) {
    res.status(400).send("00LH:Invalid Phone Number")
  }
  else if (req_param.cust_key == blacklisted) {
    res.status(400).send("00T7:Customer Blacklisted")
  }
  else if (isNaN(Number(req_param.tx_amt)) != true) {
    if (req_param.tx_type == "111") {
       if ((current_amount + req_param.tx_amt) > amount_limit) {
        res.status(400).send("0016:Reached Amount Limit")
       }
       else {
        respon = "0000"+":"+"Succes"+":"+req_param.tx_id+":"+req_param.tx_date+":"+req_param.name+":"+req_param.rek_type+":"+"1000"+":"+req_param.cust_key
        res.send(respon)
       }
    }
    else if (req_param.tx_type == "114") {
      if ((current_amount - tx_amt) < min_amount_limit) {
        res.status(400).send("0014:Exceed Withdrawal Limit")
      }
      else {
       respon = "0000"+":"+"Succes"+":"+req_param.tx_id+":"+req_param.tx_date+":"+req_param.name+":"+req_param.rek_type+":"+"1000"+":"+req_param.cust_key
       res.send(respon)
      }
    }
    else if (req_param.tx_type == "112") {
      if ((current_amount - tx_amt) < min_amount_limit) {
        res.status(400).send("0015:Exceed # Limit")
      }
      else {
       respon = "0000"+":"+"Succes"+":"+req_param.tx_id+":"+req_param.tx_date+":"+req_param.name+":"+req_param.rek_type+":"+"1000"+":"+req_param.cust_key
       res.send(respon)
      }
    }
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