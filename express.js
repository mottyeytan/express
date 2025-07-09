import express from "express"


const port = 3004

function logger(req ,res ,next){
    console.log(`${req.method} ${req.url}`)
    next()
}

const server = express()

server.use(logger)

server.use(express.json())

server.get('/', (req ,res) => {
    res.send("hi from home nxjj");
});

server.get('/home', (req ,res) => {
    res.send("hi from home");
});

server.get('/greet', (req, res) => {
    const timestamp = new Date().toISOString();
    res.json({ "msg": `hi from get endpoint ${timestamp}` });
});

server.post('/', (req ,res) => {
    const name = req.body
    res.send(JSON.stringify(name))
});





server.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})