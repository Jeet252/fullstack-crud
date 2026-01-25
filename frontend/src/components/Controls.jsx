import React from 'react'

export default function Controls({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories
}) {
    return (
        <div className="controls">
            <div className="control-group">
                <label htmlFor="search">Search by Name</label>
                <input
                    id="search"
                    type="text"
                    placeholder="e.g. Apple"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="control-group">
                <label htmlFor="filter">Filter Category</label>
                <select
                    id="filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
