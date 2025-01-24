const express= require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const { v4: uuidv4 } = require("uuid");
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app=express();
const port = process.env.PORT || 5000;
// app.use(express.json({ limit: '50mb' }));
const server = http.createServer(app);
const io = new Server(server);
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())


  // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q45my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fqcn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {

  try{
      await client.connect();
      console.log("connected to database");
      const database = client.db('Overseas');
      const homeProjectCollection = database.collection('HomeProject');     
      const userCollection = database.collection('users');
      const cashcategoryCollection = database.collection('cashcategory');
      const chatsCollection = database.collection('chats');
      const searchCollection = database.collection('searchlist');
      const lovelistCollection = database.collection('productlike');

      

    // Fetch chat history
 // Fetch chat history

  app.get("/api/chats", async (req, res) => {
  const { productId, userEmail } = req.query;

  try {
    const messages = await chatsCollection
      .find({
        productId,
        $or: [
          { senderEmail: userEmail },
          { receiverEmail: userEmail },
        ],
      })
      .sort({ timestamp: 1 })
      .toArray();

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});



// Save a message
app.post("/api/chats", async (req, res) => {
  const { productId, senderEmail, receiverEmail, message,productimage,productmodel,productprice,productbrand,productcondition,productdistrict,productupazila } = req.body;

  if (!productId || !senderEmail || !receiverEmail || !message) {
    return res.status(400).json({ error: "Incomplete message data." });
  }

  try {
    const chat = {
      productId,
      senderEmail,
      receiverEmail,
      message,
      timestamp: new Date(),
      productimage,
      productmodel,
      productprice,
      productbrand,
      productcondition,
      productdistrict,
      productupazila
    };

    // Save the chat message to the database
    const result = await chatsCollection.insertOne(chat);

    // Return the saved message with its ID
    res.status(201).json({ ...chat, _id: result.insertedId });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Failed to save chat message." });
  }
});





// Socket.IO for real-time messaging
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async (chat) => {
    const { productId, senderEmail, receiverEmail, message } = chat;

    try {
      if (!productId || !senderEmail || !receiverEmail || !message) {
        throw new Error("Incomplete message data.");
      }

      const newChat = {
        productId,
        senderEmail,
        receiverEmail,
        message,
        timestamp: new Date(),
      };

      // Save the chat message to the database
      const result = await chatsCollection.insertOne(newChat);

      const savedMessage = { ...newChat, _id: result.insertedId };

      // Emit the message to both participants
      io.to(senderEmail).emit("receiveMessage", savedMessage);
      io.to(receiverEmail).emit("receiveMessage", savedMessage);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });
});





// chat list show 

// Get Chat List
// Get Chat List
app.get("/chatlist", async (req, res) => {
  const { userEmail } = req.query;

  try {
    // Get all users with which the logged-in user has communicated
    const users = await chatsCollection.aggregate([
      {
        $match: {
          $or: [
            { senderEmail: userEmail },
            { receiverEmail: userEmail }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $ne: ["$senderEmail", userEmail] },
              "$senderEmail",
              "$receiverEmail"
            ]
          }
        }
      }
    ]).toArray(); // Using .toArray() to convert the cursor into an array

    // Filter out the logged-in user themselves
    const filteredUsers = users.map(user => user._id);
    res.json(filteredUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get One-to-One Conversation
app.get("/conversation", async (req, res) => {
  const { userEmail, otherUserEmail } = req.query;

  try {

    const messages = await chatsCollection
      .find({
        $or: [
          { senderEmail: userEmail, receiverEmail: otherUserEmail },
          { senderEmail: otherUserEmail, receiverEmail: userEmail },
        ],
      })
      .sort({ timestamp: 1 })
      .toArray();

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a Message
app.post("/send", async (req, res) => {
  const { productId, senderEmail, receiverEmail, message } = req.body;

  try {

    const newMessage = {
      productId,
      senderEmail,
      receiverEmail,
      message,
      timestamp: new Date(),
    };

    await chatsCollection.insertOne(newMessage);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





      app.post("/api/form-submit", async (req, res) => {
        console.log(req.body)
        try {
          
          const result = await cashcategoryCollection.insertOne(req.body);
          res.status(200).json({ message: "Data submitted successfully!", result });
        } catch (error) {
          console.error("Error saving data:", error);
          res.status(500).json({ message: "Failed to submit data" });
        } 
      });

      app.get("/getcategoryparts", async (req, res) => {
        const result = await cashcategoryCollection.find({}).toArray();
        res.json(result);
      });

 // add database user collection 
 app.post('/users', async(req,res)=>{
  const user=req.body;
  console.log(user)
  const result=await userCollection.insertOne(user);
  // console.log(body)
  res.json(result);
 
})
 app.post('/postdatarecruitment', async(req,res)=>{
  const user=req.body;
  console.log(req.body)
  const result=await postrecruitmentCollection.insertOne(user);
  res.json(result);
 
})



//  pending all product and approved product 
app.get('/products', async (req, res) => {
  try {
    const pendingProducts = await cashcategoryCollection.find({ productStatus: 'pending' }).toArray();
    res.status(200).json(pendingProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
});


// approved product 
// Update product status to approved
app.patch('/approvedproducts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await cashcategoryCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { productStatus: 'approved' } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product status', error });
  }
});



  // adds show account user portal data show 
  app.get("/api/addsproducts", async (req, res) => {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "User email is required" });
    }
    try {
      const products = await cashcategoryCollection.find({ email }).toArray();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  });
  

  // top up ads 
  app.put("/api/updateBoost", async (req, res) => {
    const { productId, packageName, amount, boostingDays, boostingDate, boostingTime, bkashNumber } = req.body;
  
    if (!productId || !packageName || !amount || !boostingDays || !boostingDate || !boostingTime || !bkashNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      
      // Update the ad with boosting details
      const result = await cashcategoryCollection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $set: {
            boostingDetails: {
              packageName,
              amount,
              boostingDays,
              boostingDate,
              boostingTime,
              bkashNumber,
              boostedAt: new Date(),
            },
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Ad boosted successfully." });
      } else {
        res.status(404).json({ message: "Ad not found or could not be updated." });
      }
    } catch (error) {
      console.error("Error boosting ad:", error);
      res.status(500).json({ message: "Failed to boost the ad." });
    }
  });
 



  // get the data admin update packge name database 
  app.get("/api/products", async (req, res) => {
    try {
      const products = await cashcategoryCollection.find().toArray();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  
  // 2. Update packageName
  app.put("/api/products/update-package/:id", async (req, res) => {
    const { id } = req.params;
    const { packageName } = req.body;
  
    if (!packageName) {
      return res.status(400).json({ error: "packageName is required" });
    }
  
    try {
      const result = cashcategoryCollection
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { "boostingDetails.packageName": packageName } }
        );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({ message: "Package name updated successfully" });
    } catch (error) {
      console.error("Error updating package name:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  


  // database searching check admin 
  app.get('/userLogin/:email', async(req,res)=>{
    const email=req.params.email;
    const query={email:email}
    const user=await userCollection.findOne(query)
    let isAdmin=false;
    if(user?.role==='admin'){
      isAdmin=true;
    }
    res.json({admin:isAdmin})
});


app.get("/getuserdats", async (req, res) => {
  try {
    const { email } = req.query; // Use query parameters to get the email

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const userData = await userCollection.findOne({ email }); // Find one user by email

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(userData); // Return the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



app.put("/api/update-user", async (req, res) => {
  try {
    const { email, name, phone, district, upazila } = req.body;

    // Validate required fields
    if (!email || !name || !phone || !district || !upazila) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Update user data in the database
    const updatedUser = await userCollection.findOneAndUpdate(
      { email }, // Find user by email
      { $set: { displayName: name, phone, district, upazila } }, // Update fields
      { returnDocument: "after", returnOriginal: false } // Return the updated document
    );

    

    res.json({
      message: "User updated successfully.",
      user: updatedUser.value, // Send the updated user details
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// admin list 
app.get("/getadminlist", async (req, res) => {
  const result = await userCollection.find({}).toArray();
  res.json(result);
});

// block user 
app.patch("/blockuser/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const result = await userCollection.updateOne(
      { email: userEmail },
      { $set: { status: "blocked" } }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "User blocked successfully." });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// unblock user 
// Unblock user
app.patch("/unblockuser/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const result = await userCollection.updateOne(
      { email: userEmail },
      { $set: { status: "active" } }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "User unblocked successfully." });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// chck the database block check 
app.get('/usersblock/:email', async (req, res) => {
  const { email } = req.params;
  const user = await userCollection.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

 // database admin create the new admin
 app.put('/userLogin/admin', async(req,res)=>{
  const user=req.body;
  console.log('put',user)
  const filter={email:user.email}
  const updateDoc={$set:{role:'admin'}}
  const result=await userCollection.updateOne(filter,updateDoc)
  res.json(result)
});

// post pproject home 
app.post('/postproject', async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // Insert the data into the MongoDB collection
    const result = await homeProjectCollection.insertOne({
      title,
      description,
      image,
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          title,
          description,
          image,
          createdAt: new Date(),
        },
      });
    } else {
      res.status(500).json({ message: 'Error adding banner' });
    }
  } catch (error) {
    console.error('Error adding banner:', error);
    res.status(500).json({ message: 'Error adding banner' });
  }
});

app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  // console.log(query)
  const user = await userCollection.findOne(query);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

















      
      app.get("/getcareerwork", async (req, res) => {
        const result = await CareerworkCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcareerglobal", async (req, res) => {
        const result = await CareerglobalCollection.find({}).toArray();
        res.json(result);
      });
     
      


      app.get("/getcitydetails/:countryId/:cityName", async (req, res) => {
        const { countryId, cityName } = req.params;
      
        try {
          // Ensure countryId is treated as an ObjectId
          const country = await contactpartaddressCollection.findOne({ _id: new ObjectId(countryId) });
      
          if (!country) {
            return res.status(404).send("Country not found");
          }
      
          // Find city with case-insensitive match for cityName
          const city = country.cities.find(
            (c) => c.name.toLowerCase() === cityName.toLowerCase()
          );
      
          if (!city) {
            return res.status(404).send("City not found");
          }
      
          // Include country flag in the response
          res.json({
            ...city,
            countryFlag: country.flag, // Add the flag of the country to the response
            country: country.country // Include the country name
          });
        } catch (error) {
          console.error("Error fetching city details:", error);
          res.status(500).send("Internal server error");
        }
      });
      
      


      

    // update data
    app.put("/bannerupdate/:id", async (req, res) => {
      
      const { id } = req.params;
      const { heading, description, media } = req.body;
  
      const updateResult = await homebannerCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { heading, description, media } }
      );
   res.json(updateResult);
  }); 

  


  
  

  app.delete("/awardsclientsdelete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await awardclientsCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Award not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting award", error });
    }
  });

  // API to save a search term
app.post("/api/save-search", async (req, res) => {
  const { searchTerm,email } = req.body;
  console.log(req.body)

  if (!searchTerm || !email || searchTerm.trim() === "") {
    return res.status(400).json({ error: "Search term is required." });
  }

  try {
    
    const newSearch = { searchTerm,email, createdAt: new Date() };
    await searchCollection.insertOne(newSearch);
    res.status(201).json({ message: "Search term saved successfully!" });
  } catch (error) {
    console.error("Error saving search term:", error);
    res.status(500).json({ error: "Failed to save search term." });
  }
});

// 1. Fetch all search terms
app.get("/api/search-terms", async (req, res) => {
  try {
    const { email } = req.query; 

      const searchTerms = await searchCollection.find({ email }).toArray();

    res.status(200).json(searchTerms);
  } catch (error) {
    console.error("Error fetching search terms:", error);
    res.status(500).json({ error: "Failed to fetch search terms" });
  }
});

  
app.delete("/api/search-terms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await searchCollection
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Search term deleted successfully" });
    } else {
      res.status(404).json({ error: "Search term not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete search term" });
  }
});


app.post("/api/saved-products", async (req, res) => {
  const productData = req.body;

  if (!productData.model || !productData.image || !productData.price) {
    return res.status(400).json({ error: "Missing required product fields" });
  }

  try {
  

    // Insert the product into the "savedProducts" collection
    const result = await lovelistCollection.insertOne(productData);

    res.status(201).json({
      message: "Product saved successfully",
      productId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to save product" });
  }
});

app.get("/api/lovelistproduct", async (req, res) => {
  const { email } = req.query;
  console.log(req.query)

  
  try {
    const products = await lovelistCollection.find({userEmail:email }).toArray();
    console.log(products)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

  }

  finally{
      // await client.close();
  }
}

run().catch(console.dir)

   app.get('/', (req,res)=>{
    res.send("online shopping");
   });
  
 app.listen(port, ()=>{
    console.log("runnning online on port", port);
  }); 
