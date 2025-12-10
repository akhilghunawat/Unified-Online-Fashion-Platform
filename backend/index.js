require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcryptjs');


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

// MongoDB connection function
const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        // console.log("URL:", process.env.MONGODB_URL); // Debug if needed
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB");

        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });

    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        if (err.code === 'ENOTFOUND') {
            console.error("👉 checks suggest your MONGODB_URL in the .env file is incorrect or you have no internet connection.");
            console.error("👉 Please verify the domain (e.g., cluster0.xxxxx.mongodb.net) in your connection string.");
        }
        process.exit(1);
    }
};

connectDB();


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
    },
    stock: {
        type: Number,
        default: 20 // Default stock for existing items
    }
});

/*Add Product Endpoint (Commented out previous version) */
// ...

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
            category: req.body.category.toLowerCase(),
            new_Price: req.body.new_Price,
            old_Price: req.body.old_Price,
            stock: req.body.stock ? Number(req.body.stock) : 1 // Default to 1 for new manually added products if not specified
        });

        await newProduct.save();
        console.log("✅ Product saved:", newProduct.name, " | Category:", newProduct.category, " | Stock:", newProduct.stock);
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
// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products fetched");
    res.send(products);
});

// Schema creting for user model
const userSchema = new mongoose.Schema({
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

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);

// Creating API for user registration
app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: 'Email already exists' });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    // Password will be hashed by the pre-save hook
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

    const token = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true,
        token
    })
});

// Creating API for user login
app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, error: 'Invalid Password' });
        }
    }
    else {
        res.json({ success: false, error: 'User not found' });
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
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("popular in women fetched"); // Get last
    res.send(popular_in_women);
})


// creating middleware for authentication
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    else {
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
// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("Adding to cart:", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });

        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (!userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] = 0;
        }

        userData.cartData[req.body.itemId] += 1;

        // Helper for Mongoose Modified paths with Mixed types
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { cartData: userData.cartData }
        );

        res.send({ message: "Added", success: true });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Error adding to cart");
    }
});

// Creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

// Creating endpoint to remove from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        console.log("Removing from cart:", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });

        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (userData.cartData[req.body.itemId] && userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }

        await User.findOneAndUpdate(
            { _id: req.user.id },
            { cartData: userData.cartData }
        );

        res.send({ message: "Removed", success: true });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).send("Error removing from cart");
    }
});


// Creating endpoint for placing an order
app.post('/placeorder', fetchUser, async (req, res) => {
    try {
        const { cartItems } = req.body;
        // Validation: Check stock for all items first
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const product = await Product.findOne({ id: Number(itemId) });
                if (!product) continue;
                if (product.stock < cartItems[itemId]) {
                    return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
                }
            }
        }

        // Deduct stock
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                await Product.findOneAndUpdate(
                    { id: Number(itemId) },
                    { $inc: { stock: -cartItems[itemId] } }
                );
            }
        }

        // Clear user cart after order (optional but good practice)
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { cartData: Array(300).fill(0).reduce((acc, v, i) => ({ ...acc, [i]: 0 }), {}) } // Reset cart
        );

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Failed to place order" });
    }
});



// Inventory Management Endpoints

// Update product stock
app.post('/updatestock', async (req, res) => {
    try {
        const { id, stock } = req.body;
        const product = await Product.findOneAndUpdate(
            { id: Number(id) },
            { stock: Number(stock) },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        console.log(`✅ Stock updated for ${product.name}: ${stock}`);
        res.json({ success: true, product });
    } catch (error) {
        console.error('❌ Error updating stock:', error);
        res.status(500).json({ success: false, message: 'Failed to update stock' });
    }
});

// Get low stock products (stock < 5)
app.get('/lowstock', async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 5 } });
        console.log(`Found ${lowStockProducts.length} low stock products`);
        res.json(lowStockProducts);
    } catch (error) {
        console.error('❌ Error fetching low stock products:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch low stock products' });
    }
});

// Update product availability
app.post('/updateavailability', async (req, res) => {
    try {
        const { id, available } = req.body;
        const product = await Product.findOneAndUpdate(
            { id: Number(id) },
            { available: Boolean(available) },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        console.log(`✅ Availability updated for ${product.name}: ${available}`);
        res.json({ success: true, product });
    } catch (error) {
        console.error('❌ Error updating availability:', error);
        res.status(500).json({ success: false, message: 'Failed to update availability' });
    }
});

// Get product by ID
app.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: Number(req.params.id) });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('❌ Error fetching product:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch product' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to ClickKart API');
});

// Start Server
// Server started in connectDB
