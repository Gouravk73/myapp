import React, { useEffect, useState } from 'react';

const OrderBooking = () => {
  const [id, setId] = useState('');
  const [price, setPrice] = useState(0);
  const [dish, setDish] = useState('');
  const [table, setTable] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders'));
 
    if (storedOrders) {
      setOrders(storedOrders);
    }
  }, []);

  useEffect(() => {
    if(orders?.length)
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders,id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'UniqueID') setId(value);
    if (name === 'Price') setPrice(value);
    if (name === 'Dish') setDish(value);
    if (name === 'table') setTable(value);
  };

  const handleAddToBill = () => {
    const newOrder = {
      id,
      price,
      dish,
      table,
    };
    setOrders([...orders, newOrder]);
    setId('');
    setDish('');
    setPrice(0);
    setTable('');
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.removeItem(orderId)
  };

  return (
    <div>
      <label>Unique Order ID:</label>
      <input type="text" name="UniqueID" onChange={handleChange} value={id} />

      <label>Choose Price:</label>
      <input type="number" name="Price" min="0" onChange={handleChange} value={price} />

      <label>Choose Dish:</label>
      <input type="text" name="Dish" onChange={handleChange} value={dish} />

      <label>Choose a Table:</label>
      <select name="table" onChange={handleChange} value={table}>
        <option value="">Select a table</option>
        <option value="table1">Table1</option>
        <option value="table2">Table2</option>
        <option value="table3">Table3</option>
      </select>
      <button onClick={handleAddToBill}>Add to bill</button>

      <h1>Orders</h1>
      <h2>Table 1</h2>
      {orders.map((order) => {
        if (order.table === 'table1') {
          return (
            <ul key={order.id}>
              <li>
                {order.price} - {order.table} - {order.dish}
                <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </li>
            </ul>
          );
        }
        return null;
      })}
      <h2>Table 2</h2>
      {orders.map((order) => {
        if (order.table === 'table2') {
          return (
            <ul key={order.id}>
              <li>
                {order.price} - {order.table} - {order.dish}
                <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </li>
            </ul>
          );
        }
        return null;
      })}
      <h2>Table 3</h2>
      {orders.map((order) => {
        if (order.table === 'table3') {
          return (
            <ul key={order.id}>
              <li>
                {order.price} - {order.table} - {order.dish}
                <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </li>
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
};

export default OrderBooking;
