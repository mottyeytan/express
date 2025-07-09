import express from "express"

const key = process.env.api_key



const server = express()

server.use(express.json())


server.get('/greet', (req,res)=>{
    const timestamp = new Date().toDateString()
    res.json({msg: `hi from get endpoint: ${timestamp}`})
})
server.get('/user/:id/age/:age', (req, res)=>{
    const userID = req.params.id
    const age = req.params.age
   req.
    res.send(`user id is ${userID} and age is ${age}`)
})


server.listen(3000, ()=>{
    console.log("server is running on port 3000")
})


//2

server.get('/greet/:name', (req, res)=>{
    console.log(`i got name : ${req.params.name}`)
    res.json({msg: `got name: ${req.params.name}`})
})


server.get('/test', async (req, res)=>{
    try{
        const respond = fetch('http://express-4cxm.onrender.com/greet/mottgffffgy')
        const data =  await respond.json()
        
    
        if(data.msg === 'got name: mottttt'){
            res.json({result:"ok"})
        }else{
            res.json({result:"faild"})
        }

    }catch(err){
        res.json({result:"faild"})
    }
     
})

//3

server.post('/action', async (req,res)=>{
    
    const data = req.body

    console.log("str", data)
    
    if (!data || typeof data !== 'object') {
        return res.status(400).json({
            error: "Invalid request body. Expected JSON object.",
            received: data
        });
    }
    
    if (data.action === "joke"){
        const get = await fetch("https://official-joke-api.appspot.com/random_joke")
        const data = await get.json()
        const joke = {joke: data.setup + ' ' + data.punchline}
        res.status(200).json(joke)

    }else if(data.action === "cat fact"){
        const get =  await fetch(`https://api.thecatapi.com/v1/images/search?limit=11&breed_ids=beng&api_key=${key}`)
       
        const data = await get.json();
        
        const count = data.length
        res.send(count)

    }else{
        res.status(400).json({msg: "body is malformed"})
    }
})



