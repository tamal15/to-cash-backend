const express= require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const { v4: uuidv4 } = require("uuid");
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();
const cors = require("cors");

const app=express();
const port = process.env.PORT || 5000;
// app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())


  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q45my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
      const homeCollection = database.collection('homes');
      const homebannerCollection = database.collection('homebanner');
      const homeaboutCollection = database.collection('homeabout');
      const homeserviceCollection = database.collection('HomeService');
      const homeProjectCollection = database.collection('HomeProject');
      const homeawardCollection = database.collection('HomeAward');
      const homeTestimonialCollection = database.collection('HomeTestimonial');
      const servicebannerCollection = database.collection('ServiceBanner');
      const serviceHrCollection = database.collection('ServiceHr');
      const serviceadminCollection = database.collection('ServiceAdmin');
      const serviceEmployeeCollection = database.collection('ServiceEmployee');
      const serviceManagementCollection = database.collection('ServiceManagement');
      const CareerBannerCollection = database.collection('CareerBanner');
      const CareerworkCollection = database.collection('postCareerWork');
      const CareerglobalCollection = database.collection('postCareerGlobal');
      const ContactaddressCollection = database.collection('AddressContact');
      const ContactteamCollection = database.collection('TeamContact');
      const eventwecareCollection = database.collection('eventwecare');
      const eventvideocare = database.collection('addvideo');
      const eventmediaCollcetion = database.collection('Eventmediabanner');
      const mediagalleryCollection = database.collection('addmediagallery');
      const blogpartCollection = database.collection('addblogpart');
      const recruitmentbannerCollection = database.collection('recruitmentbanner');
      const recruitmentprocessCollection = database.collection('recruitmentprocess');
      const testimonialbannersCollection = database.collection('testimonialbanner');
      const testimonialgroupCollection = database.collection('testimonialgroup');
      const testimonialclientCollection = database.collection('testimonialclient');
      const aboutwhyusCollection = database.collection('aboutwhyus');
      const aboutboardmember = database.collection('aboutboardmember');
      const aboutTeamMemberCollection = database.collection('aboutTeamMember');
      const awardcardCollection = database.collection('awardcard');
      const awardclientsCollection = database.collection('awardclients');
      const awardstatusCollection = database.collection('AwardStatus');
      const clientetecategoriesCollection = database.collection('clientetecategories');
      const clientetedatasCollection = database.collection('clientetedata');
      const clientuaeCollection = database.collection('clienteteUAE');
      const clientcategoryuaeCollection = database.collection('postcategoryUAE');
      const clientqatarCollection = database.collection('clienteteQatar');
      const clientcategoryqatarCollection = database.collection('postcategoryQatar');
      const clientcategoryKuwaitsCollection = database.collection('postcategorykuwaits');
      const userCollection = database.collection('users');
      const homesclientsCollection = database.collection('homeClients');
      const homesCategoryclientCollection = database.collection('categoryhomeClients');
      const postrecruitmentCollection = database.collection('postRecruitment');
      const postcareerdataCollection = database.collection('postcareerdata');
      const homecontactpostCollection = database.collection('homecontactpost');
      const awardbannersCollection = database.collection('AwardBanners');



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

app.post("/homecontactpost", async (req, res) => {
  try {
    const contactData = req.body;
    console.log(contactData);

    // Save to database (assuming MongoDB)
    const result = await homecontactpostCollection.insertOne(contactData);

    res.status(200).json({ message: "Contact data submitted successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit contact data" });
  }
});

 
app.post("/postscareersdatas", async (req, res) => {
  try {
    const user = req.body; // Data received from frontend
    console.log("Received data:", user);

    if (!user.name || !user.email || !user.mobile || !user.link) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await postcareerdataCollection.insertOne(user);
    res.status(200).json({ message: "Data saved successfully", data: result });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error" });
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


app.post('/postclienttestimonial', async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // Insert the data into the MongoDB collection
    const result = await testimonialclientCollection.insertOne({
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

app.post('/postboardmember', async (req, res) => {
  try {
    const { title, name, image } = req.body;

    // Insert the data into the MongoDB collection
    const result = await aboutboardmember.insertOne({
      title,
      name,
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
          name,
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

app.post('/postteammember', async (req, res) => {
  try {
    const { title, name, image } = req.body;

    // Insert the data into the MongoDB collection
    const result = await aboutTeamMemberCollection.insertOne({
      title,
      name,
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
          name,
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


// award recognitaion 
app.post('/postawrdcard', async (req, res) => {
  try {
    const { title, alignText, image } = req.body;

    // Insert the data into the MongoDB collection
    const result = await awardcardCollection.insertOne({
      title,
      alignText,
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
          alignText,
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


// award client 
app.post('/postawardclient', async (req, res) => {
  try {
    const { region, awards } = req.body;

    // Validate input
    if (!region || !Array.isArray(awards) || awards.length === 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Insert the award data into the database
    const result = await awardclientsCollection.insertOne({
      region,
      awards,
      createdAt: new Date(),
    });

    // Response to the client
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Award data added successfully',
        data: {
          _id: result.insertedId,
          region,
          awards,
          createdAt: new Date(),
        },
      });
    } else {
      res.status(500).json({ message: 'Failed to add award data' });
    }
  } catch (error) {
    console.error('Error adding award data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/postaboutwhyus', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Insert the data into the MongoDB collection
    const result = await aboutwhyusCollection.insertOne({
      title,
      description,
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


app.post('/postmediagalllery', async (req, res) => {
  try {
    const {  image } = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await mediagalleryCollection.insertOne({
      
      image,
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
         
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


app.post('/postvideocare', async (req, res) => {
  try {
    const { title, videoSrc } = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await eventvideocare.insertOne({
      title,
      videoSrc,
     
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          title,
          videoSrc,
          
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

// post career work 
app.post('/postcareer', async (req, res) => {
  try {
    const { title, description, image ,details} = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await CareerworkCollection.insertOne({
      title,
      description,
      image,
      details,
     
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
          details,
          
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
app.post('/postteamcontact', async (req, res) => {
  try {
    const { name, country,email, image ,flag} = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await ContactteamCollection.insertOne({
      name,
      country,
      email,
      image,
      flag,
     
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          name,
          country,
          email,
          image,
          flag,
          
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
app.post('/postglobalcareer', async (req, res) => {
  try {
    const { title, image ,details} = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await CareerglobalCollection.insertOne({
      title,
      image,
      details,
     
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          title,
          image,
          details,
          
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


app.post('/postblogpart', async (req, res) => {
  try {
    const { title, image ,details,date} = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await blogpartCollection.insertOne({
      title,
      image,
      details,
      date,
     
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          title,
          image,
          details,
          date,
          
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


app.post('/postclientetedatas', async (req, res) => {
  try {
    const { category, image } = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await clientetedatasCollection.insertOne({
      category,
      image,
    
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          category,
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


// category qatar post 

app.post('/postclientqatars', async (req, res) => {
  try {
    const { category, image } = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await clientcategoryqatarCollection.insertOne({
      category,
      image,
    
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          category,
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


// post home client category 

app.post('/posthomesclintsdata', async (req, res) => {
  try {
    const { category, image } = req.body;
    console.log(req.body)
    const result = await homesCategoryclientCollection.insertOne({
      category,
      image,
    
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          category,
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

// category kuwaits 

app.post('/postscategoryskuwaits', async (req, res) => {
  try {
    const { category, image } = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await clientcategoryKuwaitsCollection.insertOne({
      category,
      image,
    
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          category,
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


// category use post 

app.post('/postclientcategoryUAE', async (req, res) => {
  try {
    const { category, image } = req.body;
    console.log(req.body)

    // Insert the data into the MongoDB collection
    const result = await clientcategoryuaeCollection.insertOne({
      category,
      image,
    
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Banner added successfully',
        data: {
          _id: result.insertedId,
          category,
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


app.post('/postaward', async (req, res) => {
  try {
    const { title,  image } = req.body;

    // Insert the data into the MongoDB collection
    const result = await homeawardCollection.insertOne({
      title,
      image,
      createdAt: new Date(),
    });

    // Check if insert was successful and return the inserted data
    if (result.acknowledged) {
      res.status(201).json({
        message: 'Award added successfully',
        data: {
          _id: result.insertedId,
          title,
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


// recruitmnet process timeline 
app.post('/postrecruitmentprocess', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Insert the data into the MongoDB collection
    const result = await recruitmentprocessCollection.insertOne({
      title,
      description,
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







      app.get("/getbanner", async (req, res) => {
        const result = await homebannerCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/gethomeabout", async (req, res) => {
        const result = await homeaboutCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/gethomeservice", async (req, res) => {
        const result = await homeserviceCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getprojecthome", async (req, res) => {
        const result = await homeProjectCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getawardhome", async (req, res) => {
        const result = await homeawardCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/gethometestimonial", async (req, res) => {
        const result = await homeTestimonialCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getservicebanner", async (req, res) => {
        const result = await servicebannerCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getserviceHr", async (req, res) => {
        const result = await serviceHrCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getserviceadmin", async (req, res) => {
        const result = await serviceadminCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getserviceemployee", async (req, res) => {
        const result = await serviceEmployeeCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getservicemanagement", async (req, res) => {
        const result = await serviceManagementCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcareerbanner", async (req, res) => {
        const result = await CareerBannerCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcareerwork", async (req, res) => {
        const result = await CareerworkCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcareerglobal", async (req, res) => {
        const result = await CareerglobalCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcontactaddress", async (req, res) => {
        const result = await ContactaddressCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcontactteam", async (req, res) => {
        const result = await ContactteamCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/geteventwecare", async (req, res) => {
        const result = await eventwecareCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/geteventvideo", async (req, res) => {
        const result = await eventvideocare.find({}).toArray();
        res.json(result);
      });
      app.get("/geteventmedia", async (req, res) => {
        const result = await eventmediaCollcetion.find({}).toArray();
        res.json(result);
      });
      app.get("/getmediagallery", async (req, res) => {
        const result = await mediagalleryCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getblogpart", async (req, res) => {
        const result = await blogpartCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getrecruitmentbanner", async (req, res) => {
        const result = await recruitmentbannerCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getrecruitmentprocess", async (req, res) => {
        const result = await recruitmentprocessCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/gettestimonialbanners", async (req, res) => {
        const result = await testimonialbannersCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/gettestimonialgroup", async (req, res) => {
        const result = await testimonialgroupCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/gettestimonialclient", async (req, res) => {
        const result = await testimonialclientCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getaboutwhyus", async (req, res) => {
        const result = await aboutwhyusCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getaboutboardmember", async (req, res) => {
        const result = await aboutboardmember.find({}).toArray();
        res.json(result);
      });
      app.get("/getaboutteam", async (req, res) => {
        const result = await aboutTeamMemberCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getawardcard", async (req, res) => {
        const result = await awardcardCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getawardstatus", async (req, res) => {
        const result = await awardstatusCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getclientcategories", async (req, res) => {
        const result = await clientetecategoriesCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getclientetedatas", async (req, res) => {
        const result = await clientetedatasCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getclientUSE", async (req, res) => {
        const result = await clientuaeCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcategoryUSE", async (req, res) => {
        const result = await clientcategoryuaeCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getclientdataqatar", async (req, res) => {
        const result = await clientqatarCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcategorysdataqatar", async (req, res) => {
        const result = await clientcategoryqatarCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcategorysdataskuwaits", async (req, res) => {
        const result = await clientcategoryKuwaitsCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/gethomesclients", async (req, res) => {
        const result = await homesclientsCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcategoryhomesclients", async (req, res) => {
        const result = await homesCategoryclientCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getrecruitmentform", async (req, res) => {
        const result = await postrecruitmentCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcareerdata", async (req, res) => {
        const result = await postcareerdataCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getcontacthomesdata", async (req, res) => {
        const result = await homecontactpostCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getawardbannerss", async (req, res) => {
        const result = await awardbannersCollection.find({}).toArray();
        res.json(result);
      });
      app.get("/getawardsclients", async (req, res) => {
        try {
          const awards = await awardclientsCollection.find({}).toArray();
          res.status(200).json(awards);
        } catch (error) {
          res.status(500).json({ message: "Error fetching awards", error });
        }
      });
      


       // edit data show
    app.get("/editbannerHome/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await homebannerCollection.findOne(query);
      res.json(user);
    });
    app.get("/editmedia/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await eventmediaCollcetion.findOne(query);
      res.json(user);
    });

    app.get("/editaboutusHome/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await homeaboutCollection.findOne(query);
      res.json(user);
    });

    app.get("/editserviceHome/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await homeserviceCollection.findOne(query);
      res.json(user);
    });
    app.get("/editProjectHome/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await homeProjectCollection.findOne(query);
      res.json(user);
    });
    app.get("/edittestimonialgroup/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await testimonialgroupCollection.findOne(query);
      res.json(user);
    });
    app.get("/editmediagallery/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await mediagalleryCollection.findOne(query);
      res.json(user);
    });
    app.get("/editcontactTeam/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await ContactteamCollection.findOne(query);
      res.json(user);
    });
    app.get("/editCareerwork/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await CareerworkCollection.findOne(query);
      res.json(user);
    });
    app.get("/editCareerglobal/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await CareerglobalCollection.findOne(query);
      res.json(user);
    });
    app.get("/editblogpart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await blogpartCollection.findOne(query);
      res.json(user);
    });
    app.get("/editawardckient/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await homeawardCollection.findOne(query);
      res.json(user);
    });
    app.get("/editTestimonail/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await homeTestimonialCollection.findOne(query);
      res.json(user);
    });
    app.get("/editservicebanner/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await servicebannerCollection.findOne(query);
      res.json(user);
    });
    app.get("/editserviceHr/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await serviceHrCollection.findOne(query);
      res.json(user);
    });
    app.get("/editserviceadmin/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await serviceadminCollection.findOne(query);
      res.json(user);
    });
    app.get("/editserviceemployee/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await serviceEmployeeCollection.findOne(query);
      res.json(user);
    });
    app.get("/editservicemanagement/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await serviceManagementCollection.findOne(query);
      res.json(user);
    });

    // career start 
    app.get("/editcareerbanner/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await CareerBannerCollection.findOne(query);
      res.json(user);
    });

    // recruitment banner 
    app.get("/editrecruitmentbanner/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await recruitmentbannerCollection.findOne(query);
      res.json(user);
    });


    // event care banner 
    app.get("/editeventcarebanner/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await eventwecareCollection.findOne(query);
      res.json(user);
    });

      // edit data show
      app.get("/editvideocare/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await eventvideocare.findOne(query);
        res.json(user);
      });

      // edit recruitmnet process 
      app.get("/editrecruitmentprocess/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await recruitmentprocessCollection.findOne(query);
        res.json(user);
      });

      // banner testimonial 
      app.get("/edittestimonailbanner/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await testimonialbannersCollection.findOne(query);
        res.json(user);
      });
      app.get("/edittestimonailclient/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await testimonialclientCollection.findOne(query);
        res.json(user);
      });
      app.get("/editaboutwhyus/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await aboutwhyusCollection.findOne(query);
        res.json(user);
      });
      app.get("/editaboutboard/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await aboutboardmember.findOne(query);
        res.json(user);
      });
      app.get("/editaboutteam/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await aboutTeamMemberCollection.findOne(query);
        res.json(user);
      });
      app.get("/editawrdcard/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await awardcardCollection.findOne(query);
        res.json(user);
      });
      app.get("/editawrdsclients/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await awardclientsCollection.findOne(query);
        res.json(user);
      });
      app.get("/editawrdsstatus/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await awardstatusCollection.findOne(query);
        res.json(user);
      });
      app.get("/editsclientksa/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await clientetecategoriesCollection.findOne(query);
        res.json(user);
      });
      app.get("/editclienteteabout/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await clientetedatasCollection.findOne(query);
        res.json(user);
      });
      app.get("/editclienteteaboutuae/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await clientuaeCollection.findOne(query);
        res.json(user);
      });
      app.get("/editclienteteaboutsqatar/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await clientqatarCollection.findOne(query);
        res.json(user);
      });
      app.get("/editscategorysuae/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await clientcategoryuaeCollection.findOne(query);
        res.json(user);
      });
      app.get("/editscategorysqatars/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await clientcategoryqatarCollection.findOne(query);
        res.json(user);
      });
      app.get("/editscategorysquwaitss/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await clientcategoryKuwaitsCollection.findOne(query);
        res.json(user);
      });
      app.get("/editshomescleints/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await homesclientsCollection.findOne(query);
        res.json(user);
      });
  
      app.get("/editshomescategoryclients/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await homesCategoryclientCollection.findOne(query);
        res.json(user);
      });
      app.get("/editsawardbanners/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await awardbannersCollection.findOne(query);
        res.json(user);
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

  app.put("/awardaboutsbannersupdate/:id", async (req, res) => {
      
    const { id } = req.params;
    const { title, media } = req.body;

    const updateResult = await awardbannersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, media } }
    );
 res.json(updateResult);
}); 


    app.put("/homeaboutsupdate/:id", async (req, res) => {
      
      const { id } = req.params;
      const { numberYear,description,yearTitle,numberLocation,locationTitle,numberClient,clientTitle,numberCandidate
        ,candidateTitle } = req.body;
  
      const updateResult = await homeaboutCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { numberYear,description,yearTitle,numberLocation,locationTitle,numberClient,clientTitle,numberCandidate
          ,candidateTitle } }
      );
   res.json(updateResult);
  }); 


  app.put("/statusawrdupdate/:id", async (req, res) => {
      
    const { id } = req.params;
    const { title1,number1,title2,number2,title3,number3 } = req.body;

    const updateResult = await awardstatusCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title1,number1,title2,number2,title3,number3 } }
    );
 res.json(updateResult);
}); 

  // service home 
  app.put('/serviceshomeupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, backgroundImage } = req.body;
  
      const objectId = new ObjectId(id);
        const result = await homeserviceCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            backgroundImage,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  app.put('/projecthomeupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await homeProjectCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/mediagalleryupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {  image } = req.body;
      console.log(req.body)
      
  
      const objectId = new ObjectId(id);
        const result = await mediagalleryCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  app.put('/contactteamupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, image,flag } = req.body;
      console.log(req.body)
      
  
      const objectId = new ObjectId(id);
        const result = await ContactteamCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
            flag
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/awardclientupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await homeawardCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  app.put('/servicebannerupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await servicebannerCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  app.put('/servicehrupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,description,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await serviceHrCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  app.put('/serviceadminupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,description,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await serviceadminCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/serviceemployeeupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,description,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await serviceEmployeeCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/servicemanagementupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,description,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await serviceManagementCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/testimonialupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { text,company,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await homeTestimonialCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            text,
            company,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Testimonial updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // career start 
  app.put('/careerbannerupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await CareerBannerCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // recruitmnt banner 
  app.put('/recruitmentbannerupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await recruitmentbannerCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // banner testimonial 
  app.put('/banertestimonialupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await testimonialbannersCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  app.put('/carrerworkupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, image,details } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await CareerworkCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
            details
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  app.put('/carrerglobalupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, image,details } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await CareerglobalCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            description,
            image,
            details
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/blogpartupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, date, image,details } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await blogpartCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            date,
            image,
            details
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // clientete abouts 

  app.put('/clienteteaboutupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category, image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await clientetedatasCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            category,
            image,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // clint uae 

  app.put('/clientcategorysuaeupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category, image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await clientcategoryuaeCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            category,
            image,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // clinet qatar 
  app.put('/clientcategorysqatarsupdates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category, image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await clientcategoryqatarCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            category,
            image,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/homecategoryclientsupdates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category, image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await homesCategoryclientCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            category,
            image,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // kuwaits 

  app.put('/clientcategoryskuwaitsupdates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category, image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await clientcategoryKuwaitsCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            category,
            image,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });



  app.put('/clientaksaupdates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { key, label } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await clientetecategoriesCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            key,
            label,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // uae clint 

  app.put('/clientauaepdates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { key, label } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await clientuaeCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            key,
            label,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.put('/clientsqatarsdates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { key, label } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await clientqatarCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            key,
            label,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // home clients 

  app.put('/clientshomessdates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { key, label } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await homesclientsCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            key,
            label,
            
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  // event we care 
  app.put('/eventwecareupdate/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title,  image } = req.body;
      
  
      const objectId = new ObjectId(id);
        const result = await eventwecareCollection.updateOne(
        { _id: objectId }, 
        {
          $set: {
            title,
            image,
          },
        }
      );
  
      if (result.modifiedCount > 0) {
        res.json({ message: 'Award updated successfully', modifiedCount: result.modifiedCount });
      } else {
        res.status(404).json({ message: 'Banner not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

   // update video care
   app.put("/videocareupdate/:id", async (req, res) => {
      
    const { id } = req.params;
    const { title, videoSrc } = req.body;

    const updateResult = await eventvideocare.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title,  videoSrc } }
    );
 res.json(updateResult);
}); 


app.put("/eventmediaupdate/:id", async (req, res) => {
      
  const { id } = req.params;
  const { title, media } = req.body;

  const updateResult = await eventmediaCollcetion.updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, media } }
  );
res.json(updateResult);
}); 


// recruitment process 

app.put('/recruitmentprocessupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    

    const objectId = new ObjectId(id);
      const result = await recruitmentprocessCollection.updateOne(
      { _id: objectId }, 
      {
        $set: {
          title,
          description
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Banner not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// group testimonial 

app.put('/grouptestimonialupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    

    const objectId = new ObjectId(id);
      const result = await testimonialgroupCollection.updateOne(
      { _id: objectId }, 
      {
        $set: {
          title,
          description,
          image,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Banner not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/testimonialclientupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    

    const objectId = new ObjectId(id);
      const result = await testimonialclientCollection.updateOne(
      { _id: objectId }, 
      {
        $set: {
          title,
          description,
          image
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Banner not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/aboutboardmemberupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, name, image } = req.body;
    

    const objectId = new ObjectId(id);
      const result = await aboutboardmember.updateOne(
      { _id: objectId }, 
      {
        $set: {
          title,
          name,
          image
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Banner not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/aboutteammembersupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, name, image } = req.body;
    

    const objectId = new ObjectId(id);
      const result = await aboutTeamMemberCollection.updateOne(
      { _id: objectId }, 
      {
        $set: {
          title,
          name,
          image
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Banner not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// awrd card 

app.put('/awardcardupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, alignText, image } = req.body;
    

    const objectId = new ObjectId(id);
      const result = await awardcardCollection.updateOne(
      { _id: objectId }, 
      {
        $set: {
          title,
          alignText,
          image
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Banner not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// awad client 

app.put('/awardsclientsupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { region, awards } = req.body;

    const objectId = new ObjectId(id);
    const result = await awardclientsCollection.updateOne(
      { _id: objectId },
      {
        $set: {
          region,
          awards,  // Update the entire awards array
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Award client updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Award client not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating award client:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



// about why us 

app.put('/aboutwhyusupdate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    

    const objectId = new ObjectId(id);
      const result = await aboutwhyusCollection.updateOne(
      { _id: objectId }, 
      {
        $set: {
          title,
          description,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ message: 'Banner updated successfully', modifiedCount: result.modifiedCount });
    } else {
      res.status(404).json({ message: 'Banner not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



  app.delete("/bannersdelete/:id", async (req, res) => {
    const result = await homebannerCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });

  app.delete("/homeaboutdelete/:id", async (req, res) => {
    const result = await homeaboutCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/homeprojectdelete/:id", async (req, res) => {
    const result = await homeProjectCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/contactteamdelete/:id", async (req, res) => {
    const result = await ContactteamCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/awardclientdelete/:id", async (req, res) => {
    const result = await homeawardCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });

  // career start 
  app.delete("/careerworkdelete/:id", async (req, res) => {
    const result = await CareerworkCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/careerglobaldelete/:id", async (req, res) => {
    const result = await CareerglobalCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/eventvideodelete/:id", async (req, res) => {
    const result = await eventvideocare.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/mediagallerydelete/:id", async (req, res) => {
    const result = await mediagalleryCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/blogpartdelete/:id", async (req, res) => {
    const result = await blogpartCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/recruitmentprocessdelete/:id", async (req, res) => {
    const result = await recruitmentprocessCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/clienttestimonialdelete/:id", async (req, res) => {
    const result = await testimonialclientCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/abotwhyusdelete/:id", async (req, res) => {
    const result = await aboutwhyusCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/aboutmemberdelete/:id", async (req, res) => {
    const result = await aboutboardmember.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/aboutteamdelete/:id", async (req, res) => {
    const result = await aboutTeamMemberCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/awardcarddelete/:id", async (req, res) => {
    const result = await awardcardCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/clientetedatasdelete/:id", async (req, res) => {
    const result = await clientetedatasCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/clientcategoryuaedelete/:id", async (req, res) => {
    const result = await clientcategoryuaeCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/clientscategorysqatardelete/:id", async (req, res) => {
    const result = await clientcategoryqatarCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/clientscategoryskuwaitsdelete/:id", async (req, res) => {
    const result = await clientcategoryKuwaitsCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/clientscategoryshomesdelete/:id", async (req, res) => {
    const result = await homesCategoryclientCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/postdatarecruitmentdelete/:id", async (req, res) => {
    const result = await postrecruitmentCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  });
  app.delete("/postdatacareersdelete/:id", async (req, res) => {
    const result = await postcareerdataCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
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
