import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/items', { name });
      setItems([...items, res.data]);
      setName('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My React + Express + MongoDB App</h1>
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
