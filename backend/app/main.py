from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.serverCode.fastapiTutorial.models import products,Product
from app.tutorial.oopsTutorial import Tutorial

app= FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],  # Explicit origins to support credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def hello():
    return "Hello World"

@app.get("/products")
def getAllProducts():
    return products

# Dynamic Routing
@app.get("/product/{id}")
def getProductById(id:int):
    for product in products:
        if product.id== id:
            return product
    return "No Product found"


@app.post("/product")
def addProduct(product:Product):
    products.append(product)
    return products

@app.put("/product/{id}")
def updateProduct(id:int,product:Product):
    for x in range(len(products)):
        if products[x].id== id:
            products[x]=product
            return product
    return "No Product found"

@app.delete("/product/{id}")
def deleteProduct(id:int):
    for product in products:
        if product.id== id:
            products.remove(product)
            return products
    return "No Product found"


# OOPs Tutorial

@app.get("/oppsTutorial")
def oopsTutorial():
    tutorial=Tutorial()
    return tutorial.basicConcept()

@app.get("/inhertance")
def inhertance():
    tutorial=Tutorial()
    return tutorial.inhertance()

@app.get("/encapsulation")
def encapsulation():
    tutorial=Tutorial()
    return tutorial.encapsulation()

@app.get("/polymorphism")
def polymorphism():
    tutorial=Tutorial()
    return tutorial.polymorphism()
