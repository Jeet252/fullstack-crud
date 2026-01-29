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
]