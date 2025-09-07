// server.js

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');


const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads folder if it doesn't exist
const uploadPath = './uploads/images';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Connect to MongoDB
mongoose.connect('mongodb+srv://akhilghunawat22:Akhil3148@cluster0.nvsz1z1.mongodb.net/ClickKart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Serve static images
app.use('/images', express.static(uploadPath));

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Image Upload Endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Product Schema
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_Price: {
        type: Number,
        required: true
    },
    old_Price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
});

/*Add Product Endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_Price: req.body.new_Price,
    old_Price: req.body.old_Price
});


        await newProduct.save();
        console.log("✅ Product saved:", newProduct.name);
        res.json({ success: true, name: newProduct.name });
    } catch (error) {
        console.error('❌ Error saving product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});*/
//
// Add Product Endpoint with category in lowercase

app.post('/addproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = new Product({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category.toLowerCase(),  // 👈 Force lowercase
            new_Price: req.body.new_Price,
            old_Price: req.body.old_Price
        });

        await newProduct.save();
        console.log("✅ Product saved:", newProduct.name, " | Category:", newProduct.category);
        res.json({ success: true, name: newProduct.name });
    } catch (error) {
        console.error('❌ Error saving product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// Creating API for deleting a product
app.post('/removeproduct', async (req, res) => {
   await Product.findOneAndDelete({ id: req.body.id });
   console.log("Removed");
   res.json({
      success: true,
      name: req.body.name
   });
});


 // Creating API for getting all products
app.get('/allproducts', async (req, res) => {
   let products = await Product.find({});
   console.log("All Products fetched");
   res.send(products);
});

  
// Schema creting for user model
const User = mongoose.model("User", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cartData: {
        type: Object,
    }
});


// Creating API for user registration
app.post('/signup', async (req, res) => {
   let check = await User.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({ success: false, error: 'Email already exists' });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
  const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
};

    const token = jwt.sign(data,'secret_ecom');
    res.json({
        success: true,
        token})
});


// Creating API for user login
app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
       const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
            }
            else{
                res.json({success:false, error: 'Invalid Password'});
            }
        }
    else { 
        res.json({success:false, error: 'User not found'});
    }
});



// Creating endpoint for newcollections
app.get('/newcollections', async (req, res) => {
    try {
        let products = await Product.find({});
        let newCollection = products.slice(-8);  // Get last 8 products
        console.log("New Collections fetched");
        res.json(newCollection);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// creating endpoint for popular in women 
app.get('/popularinwomen', async (req, res) => {
        let products = await Product.find({ category:"women"});
        let popular_in_women = products.slice(0,4);
        console.log("popular in women fetched") ; // Get last
        res.send(popular_in_women);
})


// creating middleware for authentication
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    else{
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ error: "Please authenticate using a valid token" });
        }
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser,async (req, res) => {
     let userData = await User.findById({_id: req.user.id })
      userData.cartData[req.body.itemId] += 1;
      await User.findByIdAndUpdate({_id: req.user.id},
         {cartData: userData.cartData});
         res.send("Added")});



// Default route
app.get('/', (req, res) => {
    res.send('Welcome to ClickKart API');
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
