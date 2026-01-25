# Backend API Documentation

This project implements a simple FastAPI application with product management and some OOP tutorial endpoints.

## Base URL
The API is served at `http://localhost:8000` (default FastAPI port).

## Data Models

### Product
Represents a product in the system.

| Field | Type | Description |
|Data Type|Data Type|Description|
|---|---|---|
| `id` | `int` | Unique identifier for the product |
| `name` | `str` | Name of the product |
| `price` | `float` | Price of the product |
| `category` | `str` | Category of the product |

## Endpoints

### General

#### `GET /`
Returns a hello world message.
- **Response**: string

### Product Management

#### `GET /products`
Retrieve all products.
- **Response**: List of `Product` objects

#### `GET /product/{id}`
Retrieve a specific product by ID.
- **Parameters**: 
    - `id` (path, int): The ID of the product
- **Response**: `Product` object or "No Product found"

#### `POST /product`
Add a new product.
- **Body**: `Product` object (JSON)
- **Response**: Updated list of `Product` objects

#### `PUT /product`
Update an existing product.
- **Parameters**:
    - `id` (query, int): The ID of the product to update
- **Body**: `Product` object (JSON) - The new data for the product
- **Response**: Updated list of `Product` objects or "No Product found"

#### `DELETE /product/{id}`
Delete a product by ID.
- **Parameters**: 
    - `id` (path, int): The ID of the product to delete
- **Response**: Updated list of `Product` objects or "No Product found"

### OOPs Tutorial Endpoints
These endpoints demonstrate Object-Oriented Programming concepts using the `Tutorial` class.

#### `GET /oppsTutorial`
Demonstrates basic OOP concepts.

#### `GET /inhertance`
Demonstrates inheritance.

#### `GET /encapsulation`
Demonstrates encapsulation.

#### `GET /polymorphism`
Demonstrates polymorphism.
