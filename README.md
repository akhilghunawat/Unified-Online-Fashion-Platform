# 🛍️ ClickKart - Unified Online Fashion Platform

A complete e-commerce platform built with MERN stack, featuring secure authentication, inventory management, and a modern admin panel.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-production%20ready-success)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- ✅ **Secure Authentication** - JWT & Bcrypt password hashing
- ✅ **Inventory Management** - Real-time stock tracking & updates
- ✅ **Shopping Cart** - Full cart functionality with persistence
- ✅ **Stock Validation** - Prevents over-ordering with styled notifications
- ✅ **Admin Panel** - Modern interface for product & inventory management
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **36 Products** - Pre-seeded with product images

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (Atlas or Local)
- npm or yarn

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd ClickKart

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install

# 3. Configure MongoDB
# Create backend/.env file (see .env.example)

# 4. Seed database
cd backend
node seed.js

# 5. Start all services
cd ..
start-all.bat
```

### Access Points
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Admin Panel:** http://localhost:5173

## 📚 Documentation

For complete documentation, see:
- **[COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md)** - Full guide with setup, features, APIs, troubleshooting
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical implementation details

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt Password Hashing
- Multer (File Upload)

### Frontend
- React 19.1.1
- React Router DOM
- Context API

### Admin
- React + Vite
- Modern UI Components

## 📦 Project Structure

```
ClickKart/
├── backend/          # Express API
├── frontend/         # React customer app
├── admin/            # Vite admin panel
├── start-all.bat     # Start all services
└── check-setup.bat   # Setup verification
```

## 🔧 Environment Variables

Create `backend/.env`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

See `backend/.env.example` for reference.

## 🎯 Key Features

### For Customers
- Browse products by category
- Secure signup/login
- Add to cart (with login protection)
- Stock limit notifications
- Order placement with validation

### For Admins
- Add/remove products
- Update stock quantities
- Low stock alerts (visual)
- Product image upload
- Real-time inventory management

## 📖 API Endpoints

### Authentication
- `POST /signup` - Register user
- `POST /login` - Login user

### Products
- `GET /allproducts` - Get all products
- `POST /addproduct` - Add product
- `GET /product/:id` - Get single product

### Cart (Auth Required)
- `POST /addtocart` - Add to cart
- `POST /removefromcart` - Remove from cart
- `POST /placeorder` - Place order

### Inventory
- `POST /updatestock` - Update stock
- `GET /lowstock` - Get low stock items

See [COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md) for full API reference.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `.env` file configuration
- Verify MongoDB URL and credentials
- Run `node test-connection.js`

### Port Already in Use
```bash
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Images Not Loading
```bash
# Copy product images
Copy-Item -Path "frontend\src\Components\Assets\product_*.png" -Destination "backend\uploads\images\" -Force
```

For more troubleshooting, see [COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md)

## ✅ Testing Checklist

- [ ] Backend running on port 4000
- [ ] Frontend running on port 3000
- [ ] Admin panel running on port 5173
- [ ] MongoDB connected
- [ ] Products seeded
- [ ] Login/signup working
- [ ] Cart functionality working
- [ ] Stock updates working

## 🎉 What's New

### Latest Updates (v1.0.0)
- ✨ Added styled login modal
- ✨ Stock limit notifications
- ✨ Enhanced inventory management
- ✨ Complete documentation
- 🐛 Fixed all known bugs
- 🎨 Improved UI/UX
- 📚 Comprehensive guides

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

This is a learning project. Feel free to fork and customize!

## 📧 Support

For detailed setup and troubleshooting, refer to:
- [COMPLETE_DOCUMENTATION.md](COMPLETE_DOCUMENTATION.md)

---

**Made with ❤️ | ClickKart E-Commerce Platform**

**Status:** ✅ Production Ready | All Features Working | Fully Documented
