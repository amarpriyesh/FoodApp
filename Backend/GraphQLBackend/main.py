import strawberry
from fastapi import FastAPI
from strawberry.asgi import GraphQL
from typing import List


@strawberry.type
class Food:
    name: str
    description: str

@strawberry.type
class Query:
    @strawberry.field
    def food(self) -> List[Food]:
        foodData = [Food(name="PaniPuri", description="Made with chickpea and potatoes"),
                    Food(name="Paratha", description="Flat dough with potatoes")]

        return foodData

schema = strawberry.Schema(query=Query)

app  = FastAPI()

@app.get("/")
def index():
    return {"message" : "Welcome"}
app.add_route("/query", GraphQL(schema, debug=True))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

