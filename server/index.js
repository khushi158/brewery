require("dotenv").config()
const {connectToMongoDB}=require("./database");
const cors = require('cors'); // Import the cors package
const express=require("express");
const path=require("path");

// Use CORS middleware with options


const app=express();
app.use(cors({
    origin: 'http://localhost:3001', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
    credentials: true,  // If you need to send cookies or authorization headers
}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"build")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build/index.html"));
})

const router=require("./routes");
app.use('/api',router);

const port=process.env.PORT||5000;


async function startServer(){
    await connectToMongoDB();
    app.listen(port,()=>{
        console.log(`server is listening on port 😃 ${port}`);
    })
}


startServer();