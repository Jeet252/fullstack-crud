

export default function TableContainer({
    data,
    editingId,
    editForm,
    setEditForm,
    saveEdit,
    cancelEditing,
    handleDelete,
    requestSort,
    sortConfig,
    startEditing,
    categories,

}) {

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>
                            ID {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => requestSort('name')}>
                            Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => requestSort('category')}>
                            Category {sortConfig.key === 'category' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => requestSort('price')}>
                            Price {sortConfig.key === 'price' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id}>
                                {editingId === item.id ? (
                                    // Edit Mode Row
                                    <>
                                        <td>{item.id}</td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={editForm.category}
                                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={editForm.price}
                                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn-save" onClick={() => saveEdit(item.id)}>Save</button>
                                            <button className="btn-cancel" onClick={cancelEditing}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    // View Mode Row
                                    <>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td className="price-cell">Rs.{item.price.toFixed(2)}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => startEditing(item)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="empty-state">No products found matching your criteria.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
