const mongoose = require('mongoose');
require('dotenv').config();

const Product = mongoose.model("Product", {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      new_Price: { type: Number, required: true },
      old_Price: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      available: { type: Boolean, default: true },
      stock: { type: Number }
});

async function checkData() {
      try {
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("Connected");
            const products = await Product.find({}).limit(5);
            console.log("Products Sample:");
            products.forEach(p => {
                  console.log(`ID: ${p.id}, Stock: ${p.stock}`);
            });
            process.exit(0);
      } catch (error) {
            console.error(error);
            process.exit(1);
      }
}

checkData();
