const express=require("express");
const {objectId, ObjectId}=require('mongodb');
const router=express.Router();


const port=process.env.PORT||4000;
const {getConnectedClient}=require("./database");


const getCollection=()=>{
    const client=getConnectedClient();
    const collection=client.db("TODO").collection("todos");
    return collection;
}

//get
router.get('/todos',async (req,res)=>{

    const collection=getCollection();
    const todos=await collection.find({}).toArray();

    res.status(200).json(todos)
});


//post

router.post('/todos',async (req,res)=>{

    const collection=getCollection();
   
    const{todo,reviews=[]}=req.body;

    if(!todo){
       return res.status(400).json({mssg:"No todo found"})
    }
    

    console.log(req.body);
    const newTodo=await collection.insertOne({todo,status:false,reviews});
        
    res.status(201).json({todo,status:false,_id:newTodo.insertedId,reviews});
})


//del

router.delete('/todos/:id',async(req,res)=>{
    res.status(200).json({mssg:"del req to /api/todo/:id"})
    const collection=getCollection();
    const _id=new ObjectId(req.params.id);


    const deleteTodo=await collection.deleteOne({_id});

    res.status(200).json(deleteTodo);
})

//put

router.put('/todos/:id', async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    // Destructure the 'reviews' property from the request body
    const { reviews } = req.body;

    // Check if 'reviews' is present in the request body
    if (!Array.isArray(reviews)) {
        return res.status(400).json({ mssg: "Invalid reviews format" });
    }

    // Use '$set' to update the 'reviews' property
    const updatedTodo = await collection.updateOne({ _id }, { $set: { reviews } });

    res.status(200).json(updatedTodo);
});



module.exports =router;