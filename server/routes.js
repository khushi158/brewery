const express=require("express");
const {objectId, ObjectId}=require('mongodb');
const router=express.Router();


const port=process.env.PORT||4000;
const {getConnectedClient}=require("./database");


const getCollection=(collectionName)=>{
    const client=getConnectedClient();
    const collection=client.db("TODO").collection(`${collectionName}`);
    return collection;
}

//get
router.get('/todos',async (req,res)=>{

    const collection=getCollection("todos");
    const todos=await collection.find({}).toArray();

    res.status(200).json(todos)
});


//post

router.post('/todos',async (req,res)=>{

    const collection=getCollection("todos");
   
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
    const collection=getCollection("todos");
    const _id=new ObjectId(req.params.id);


    const deleteTodo=await collection.deleteOne({_id});

    res.status(200).json(deleteTodo);
})

//put

router.put('/todos/:id', async (req, res) => {
    const collection = getCollection("todos");
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


router.get('/auth', async (req, res) => {
    try {
        const collection = getCollection('auth');
        const users = await collection.find({}).toArray();
        return res.status(200).json(users);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
    
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const collection = getCollection('auth');
  
      // Check if the user already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
    
    
  
      // Insert the new user into the database
      const result = await collection.insertOne({ email, password });
  
      return res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });




  router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const collection = getCollection('auth');
  
      // Find the user by email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
     
      return res.status(200).json({ message: 'Sign-in successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  


module.exports =router;