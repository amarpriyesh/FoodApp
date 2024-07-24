from database.db import Base
from sqlalchemy import Column, Integer, String

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    recipe = Column(String)
    calories = Column(String)
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "recipe": self.recipe,
            "calories": self.calories
        }