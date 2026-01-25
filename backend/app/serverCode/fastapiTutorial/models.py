from typing import ClassVar
from pydantic import BaseModel,Field

class Product(BaseModel):
    _count: ClassVar[int] = 0
    id: int = Field(default_factory=lambda: Product._count)
    name: str
    price: float
    category: str

    def __init__(self, **data):
        super().__init__(**data)
        Product._count += 1

products=[
    Product(name='Asus',price=79999,category='Laptop'),
    Product(name='Samsung',price=40000,category='Mobile'),
    Product(name='JBL',price=2000,category='Speaker'),
    Product(name='Airdrop 201',price=1000,category='Airbud'),
    Product(name='Knife',price=200,category='Kitchen Ware')
]