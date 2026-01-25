import React, { useEffect, useMemo, useState } from 'react'
import './Home.css'
import Controls from '../components/Controls';
import TableContainer from '../components/TableContainer';
import AddForm from '../components/AddForm';


const categories = ['Fruit', 'Vegetable', 'Meat', 'Dairy', 'Bakery', 'Other'];
export default function Home() {
    const [data, setData] = useState([]);

    // Search, Filter, Sort State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Add Form State
    const [addForm, setAddForm] = useState({ name: '', category: categories[0], price: '' });

    // Edit State
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', category: '', price: '' });

    // --- API: Fetch Data ---
    useEffect(() => {
        // TODO: Fetch data from your database here

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/products');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    // --- Handlers: Sorting ---
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // --- Handlers: Add ---
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!addForm.name || !addForm.price) return;

        const newItem = {
            name: addForm.name,
            category: addForm.category,
            price: parseFloat(addForm.price),
        };

        try {
            // TODO: API Call to CREATE data

            const response = await fetch('http://localhost:4000/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });
            const savedItem = await response.json();
            setData(savedItem);

            console.log('API Create Call:', newItem);

            setAddForm({ name: '', category: categories[0], price: '' }); // Reset form
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    // --- Handlers: Delete ---
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                // TODO: API Call to DELETE data

                await fetch(`http://localhost:4000/product/${id}`, {
                    method: 'DELETE',
                });
                setData(data.filter((item) => item.id !== id));

                console.log('API Delete Call ID:', id);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    // --- Handlers: Edit ---
    const startEditing = (item) => {
        setEditingId(item.id);
        setEditForm({ name: item.name, category: item.category, price: item.price });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm({ name: '', category: '', price: '' });
    };

    const saveEdit = async (id) => {
        try {
            const updatedFields = { ...editForm, price: parseFloat(editForm.price) };

            // TODO: API Call to UPDATE data
            const response = await fetch(`http://localhost:4000/product/${id}`, {
                method: 'PUT', // or PATCH
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFields),
            });
            const updatedItem = await response.json();

            const updatedData = data.map((item) => {
                if (item.id === id) return updatedItem;
                return item;
            });
            setData(updatedData);
            console.log('API Update Call ID:', id, updatedFields);

            setEditingId(null);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    // --- Process Data (Search -> Filter -> Sort) ---
    const processedData = useMemo(() => {
        let result = [...data];

        // 1. Search (by Name)
        if (searchQuery) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Filter (by Category)
        if (selectedCategory) {
            result = result.filter(item => item.category === selectedCategory);
        }

        // 3. Sort
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [data, searchQuery, selectedCategory, sortConfig]);

    return (
        <div className="container">
            <h1>Product Manager</h1>

            {/* --- Controls Section --- */}
            <Controls
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            {/* --- Table Section --- */}
            <TableContainer
                data={processedData}
                editingId={editingId}
                editForm={editForm}
                setEditForm={setEditForm}
                saveEdit={saveEdit}
                cancelEditing={cancelEditing}
                handleDelete={handleDelete}
                requestSort={requestSort}
                sortConfig={sortConfig}
                startEditing={startEditing}
                categories={categories}
            />

            {/* --- Add Data Section --- */}
            <h2>Add New Product</h2>
            <AddForm
                addForm={addForm}
                setAddForm={setAddForm}
                handleAddSubmit={handleAddSubmit}
                categories={categories}
            />
        </div>
    )
}
