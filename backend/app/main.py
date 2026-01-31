from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.serverCode.fastapiTutorial.models import products,Product
from app.tutorial.oopsTutorial import Tutorial



app= FastAPI()
router = APIRouter()

# API Configuration


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],  # Explicit origins to support credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@router.get("/")
def hello():
    return "Hello World"

@router.get("/products")
def getAllProducts():
    return products

# Dynamic Routing
@router.get("/product/{id}")
def getProductById(id:int):
    for product in products:
        if product.id== id:
            return product
    return "No Product found"


@router.post("/product")
def addProduct(product:Product):
    products.append(product)
    return products

@router.put("/product/{id}")
def updateProduct(id:int,product:Product):
    for x in range(len(products)):
        if products[x].id== id:
            products[x]=product
            return product
    return "No Product found"

@router.delete("/product/{id}")
def deleteProduct(id:int):
    for product in products:
        if product.id== id:
            products.remove(product)
            return products
    return "No Product found"


# OOPs Tutorial

@router.get("/oppsTutorial")
def oopsTutorial():
    tutorial=Tutorial()
    return tutorial.basicConcept()

@router.get("/inhertance")
def inhertance():
    tutorial=Tutorial()
    return tutorial.inhertance()

@router.get("/encapsulation")
def encapsulation():
    tutorial=Tutorial()
    return tutorial.encapsulation()

@router.get("/polymorphism")
def polymorphism():
    tutorial=Tutorial()
    return tutorial.polymorphism()


app.include_router(router, prefix="/api")
