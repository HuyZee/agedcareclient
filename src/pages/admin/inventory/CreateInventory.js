import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/InventoryManagementSidebar';

export default function CreateInventory() {
  const [formData, setFormData] = useState({
    medication_id: '',
    category: '',
    name: '',
    supplier_name: '',
    quantity: '',
    last_restocked: '',
  });

  const [medications, setMedications] = useState([]);

  // Fetch medications when the component mounts
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/medication');
        setMedications(response.data);  // Store fetched medications in state
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/inventory', formData);
      alert('Inventory created successfully!');
      // Reset the form
      setFormData({
        medication_id: '',
        category: '',
        name: '',
        supplier_name: '',
        quantity: '',
        last_restocked: '',
      });
    } catch (error) {
      console.error('Error creating inventory:', error);
      alert('Failed to create inventory. Please try again.');
    }
  };

  return (
    <div className='CreateMember'>
      <AdminNavbar />
      <div className='adminhub-content'>
        <AdminSidebar />
        <div className="create-user-container">
          <h2>Create Inventory</h2>
          <form className="create-user-form" onSubmit={handleSubmit}>
            <input type="text" name='category' placeholder='Category' value={formData.category} onChange={handleChange} required />
            {
              (formData.category === 'medication' ? (
                <select name='medication_id' value={formData.medication_id} onChange={handleChange} required>
                  <option value=''>Select Medication</option>
                  {medications.map((medication) => (
                    <option key={medication.medication_id} value={medication.medication_id}>
                      {medication.medication_name}
                    </option>
                  ))}
                </select>
               ) :  (
                <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} required />
               ))
            }
            <input type="text" name="supplier_name" placeholder='supplier name' value={formData.supplier_name} onChange={handleChange} />
            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
            <label htmlFor="last_restocked">Date last restocked:</label>
            <input type="date" name="last_restocked" placeholder="Last Restocked" value={formData.last_restocked} onChange={handleChange} required />
            <button type="submit">Add Inventory</button>
          </form>
        </div>
      </div>
    </div>
  );
}
