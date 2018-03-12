const fs            = require('fs')
    , path          = require('path')
    , http          = require('http')

const express       = require('express')
    , cookieParser  = require('cookie-parser')
    , bodyParser    = require('body-parser')
    , nunjucks      = require('nunjucks')
    , logger        = require('morgan')
    , compression   = require('compression')
    , colors        = require('colors')
    , favicon       = require('serve-favicon')

const routes    = require('./routes')

let app = express()

app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded 
app.use(bodyParser.json()) // parse application/json 
app.use(cookieParser())
app.use(favicon("public/favicon.ico"))
app.use(express.static("public/"))
app.set('view engine', 'html')
nunjucks.configure("src/views/" , {
    express:app,
    trimBlocks : true,
    lstripBlocks: true 
})

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// apis.
app.use('/', routes)

// catch 404
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'resource not found.'})
})

// error handler
app.use((err, req, res, next) => {
    console.error(err)
    return res.status(500).send({ success:false,  message: err.message  })
})

// Start server
let port = process.env.PORT || 8000

app.listen(port, "0.0.0.0", (err) => {
    if(err) {
        console.error(err)
    } else {
        console.log("Server started")
    }
})