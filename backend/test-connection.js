require('dotenv').config();
const mongoose = require('mongoose');

console.log('========================================');
console.log('  Testing MongoDB Connection');
console.log('========================================\n');

// Hide password in URL for security
const urlForDisplay = process.env.MONGODB_URL
      ? process.env.MONGODB_URL.replace(/:[^:]*@/, ':****@')
      : 'NOT SET';

console.log('Connection URL:', urlForDisplay);
console.log('Attempting to connect...\n');

if (!process.env.MONGODB_URL) {
      console.error('❌ ERROR: MONGODB_URL not found in .env file!');
      console.log('\nPlease create a .env file in the backend folder with:');
      console.log('MONGODB_URL=your_mongodb_connection_string');
      process.exit(1);
}

mongoose.connect(process.env.MONGODB_URL)
      .then(() => {
            console.log('✅ SUCCESS! MongoDB connected successfully');
            console.log('✅ Database is ready to use');
            console.log('\nYou can now:');
            console.log('1. Run: node seed.js (to populate database)');
            console.log('2. Run: npm start (to start the server)');
            mongoose.connection.close();
            process.exit(0);
      })
      .catch((err) => {
            console.error('❌ FAILED! Could not connect to MongoDB');
            console.error('\nError Details:', err.message);
            console.log('\n📖 Common Solutions:');
            console.log('1. Check your internet connection');
            console.log('2. Verify MongoDB URL in .env file');
            console.log('3. Ensure IP is whitelisted in MongoDB Atlas');
            console.log('4. Check username and password are correct');
            console.log('\n📚 See MONGODB_SETUP.md for detailed help');
            process.exit(1);
      });
