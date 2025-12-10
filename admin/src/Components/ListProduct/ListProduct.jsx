import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then(res => res.json())
      .then(data => { setAllProducts(data); });
  }

  useEffect(() => { fetchInfo(); }, []);

  const remove_Product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    })
    await fetchInfo();
  }

  const updateStock = async (id, newStock) => {
    await fetch("http://localhost:4000/updatestock", {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, stock: newStock })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Stock updated successfully');
          fetchInfo();
        }
      });
  }

  const handleStockChange = (id, currentStock) => {
    const newStock = prompt(`Enter new stock quantity (current: ${currentStock}):`, currentStock);
    if (newStock !== null && !isNaN(newStock) && newStock >= 0) {
      updateStock(id, parseInt(newStock));
    }
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Stock</p>
        <p>Remove</p>
      </div>
      <div className="listproducts-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return <>
            <div key={index} className="listproduct-format-main listproduct-format">
              <img className='listproduct-producticon' src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.old_Price}</p>
              <p>${product.new_Price}</p>
              <p>{product.category}</p>
              <p
                onClick={() => handleStockChange(product.id, product.stock)}
                style={{ cursor: 'pointer', color: product.stock < 5 ? 'red' : 'green', fontWeight: 'bold' }}
                title="Click to update stock"
              >
                {product.stock || 0}
              </p>
              <img onClick={() => remove_Product(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct;