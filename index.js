const express = require('express')
const app = express()
const port = 3000
const route = require('./Routes/route')
const {mongoose } = require('mongoose')
const bodyparser = require('body-parser')
const cors = require ('cors')

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))

app.use('/',route);
mongoose.connect('mongodb+srv://admin:admin123@cluster0.qallvfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> {console.log('MongoDB Connected :)')})
.catch((error)=> {console.log(error)})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 //app.use('/', route)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})