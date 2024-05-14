import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminSidebar from '../../../components/admin/InventoryManagementSidebar';

export default function RecordInventory() {
    const [inventoryItem, setInventoryItem] = useState(null);
    const [medications, setMedications] = useState([]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        medication_id: '',
        category: '',
        name: '',
        supplier_name: '',
        quantity: '',
        last_restocked: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventoryItem();
        fetchMedications();
    }, [id]);

    const fetchInventoryItem = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/inventory/${id}`);
            setInventoryItem(response.data);
            setFormData({
                medication_id: response.data.medication_id || '',
                category: response.data.category,
                name: response.data.name || '',
                supplier_name: response.data.supplier_name || '',
                quantity: response.data.quantity,
                last_restocked: response.data.last_restocked,
            });
        } catch (error) {
            console.error('Error fetching inventory item:', error);
        }
    };

    const fetchMedications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/medication');
            setMedications(response.data);
        } catch (error) {
            console.error('Error fetching medications:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patchData = {
            category: formData.category,
            name: formData.name,
            supplier_name: formData.supplier_name,
            quantity: parseInt(formData.quantity),
            last_restocked: formData.last_restocked
        };

        if (formData.medication_id) {
            patchData.medication_id = parseInt(formData.medication_id);
        }

        try {
            await axios.patch(`http://localhost:5000/api/inventory/${id}`, patchData);
            alert('Inventory item updated successfully!');
            setEditing(false);
            navigate('/admin/inventory-list');
        } catch (error) {
            console.error('Error updating inventory item:', error);
            alert('Failed to update inventory item.');
        }
    };
    const getMedicationName = (medicationId) => {
        const medication = medications.find(med => med.medication_id === medicationId);
        return medication ? medication.medication_name : 'Unknown';
      };
    const deleteInventoryItem = async () => {
        if (window.confirm("Are you sure you want to delete this inventory item?")) {
            try {
                await axios.delete(`http://localhost:5000/api/inventory/${id}`);
                alert('Inventory item deleted successfully!');
                navigate('/admin/inventory-list');
            } catch (error) {
                console.error('Error deleting inventory item:', error);
                alert('Failed to delete inventory item. Please try again.');
            }
        }
    };

    if (!inventoryItem) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AdminNavbar />
            <div className='adminhub-content'>
                <AdminSidebar />
                <div className="create-user-container">
                    <div className='create-user-container-top-div'>
                        <h2>Inventory Details</h2>
                        <button className='back-button' onClick={() => editing ? setEditing(false) : navigate("/admin/inventory-list")}>Back</button>
                    </div>
                    {!editing ? (
                        <>
                            <table className="list-table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Supplier Name</th>
                                        <th>Quantity</th>
                                        <th>Last Restocked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{inventoryItem.category}</td>
                                        <td>{inventoryItem.medication_id ? getMedicationName(inventoryItem.medication_id) : inventoryItem.name}</td>
                                        <td>{inventoryItem.supplier_name}</td>
                                        <td>{inventoryItem.quantity}</td>
                                        <td>{new Date(inventoryItem.last_restocked).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='edit-button-div'>
                                <button onClick={() => setEditing(true)}>Edit Inventory</button>
                                <button onClick={deleteInventoryItem}>Delete Inventory</button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className='create-user-form'>
                            <label>Category:</label>
                            <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
                            {formData.category === 'medication' ? (
                                <>
                                    <label>Medication:</label>
                                    <select name="medication_id" value={formData.medication_id} onChange={handleInputChange}>
                                        <option value="">Select Medication</option>
                                        {medications.map(medication => (
                                            <option key={medication.medication_id} value={medication.medication_id}>
                                                {medication.medication_name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <>
                                    <label>Item Name:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                </>
                            )}
                            <label>Supplier Name:</label>
                            <input type="text" name="supplier_name" value={formData.supplier_name} onChange={handleInputChange} />
                            <label>Quantity:</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                            <label>Last Restocked:</label>
                            <input type="date" name="last_restocked" value={formData.last_restocked} onChange={handleInputChange} />
                            <button className='confirm-btn' type="submit">Confirm Update</button>
                            <button className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
