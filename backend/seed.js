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
      stock: { type: Number, default: 20 }
});

const products = [
      { id: 1, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_1.png", new_Price: 50.0, old_Price: 80.5 },
      { id: 2, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_2.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 3, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_3.png", new_Price: 60.0, old_Price: 100.5 },
      { id: 4, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_4.png", new_Price: 100.0, old_Price: 150.0 },
      { id: 5, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_5.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 6, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_6.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 7, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_7.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 8, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_8.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 9, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_9.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 10, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_10.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 11, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_11.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 12, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", image: "product_12.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 13, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_13.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 14, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_14.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 15, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_15.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 16, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_16.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 17, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_17.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 18, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_18.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 19, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_19.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 20, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_20.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 21, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_21.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 22, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_22.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 23, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_23.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 24, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", image: "product_24.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 25, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_25.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 26, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_26.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 27, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_27.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 28, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_28.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 29, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_29.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 30, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_30.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 31, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_31.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 32, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_32.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 33, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_33.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 34, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_34.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 35, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_35.png", new_Price: 85.0, old_Price: 120.5 },
      { id: 36, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", image: "product_36.png", new_Price: 85.0, old_Price: 120.5 },
];

async function seed() {
      try {
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("Connected to DB");

            await Product.deleteMany({});
            console.log("Cleared Products");

            const data = products.map(p => ({
                  ...p,
                  stock: 20, // Default stock as requested
                  image: `http://localhost:4000/images/${p.image}`
            }));

            await Product.insertMany(data);
            console.log(`Seeded ${data.length} products`);
            process.exit(0);
      } catch (err) {
            console.error(err);
            process.exit(1);
      }
}

seed();
