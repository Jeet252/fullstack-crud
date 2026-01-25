

export default function AddForm({
    addForm,
    setAddForm,
    handleAddSubmit,
    categories
}) {
    return (
        <form className="add-form" onSubmit={handleAddSubmit}>
            <div className="input-group">
                <label>Name</label>
                <input
                    type="text"
                    required
                    placeholder="Product Name"
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                />
            </div>
            <div className="input-group">
                <label>Category</label>
                <select
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="input-group">
                <label>Price</label>
                <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={addForm.price}
                    onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                />
            </div>
            <div className="input-group">
                <label>&nbsp;</label> {/* Spacer label to align button */}
                <button type="submit" className="btn-add">Add Product</button>
            </div>
        </form>
    )
}
