from fastapi import FastAPI, Request, status, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from database import db
# from sqlalchemy import Column, Integer, String
from api import models
import ultralytics
from ultralytics import YOLO
import cv2
import numpy as np
import base64

from fastapi.websockets import WebSocket
from fastapi.encoders import jsonable_encoder
from ariadne import QueryType, make_executable_schema, load_schema_from_path, snake_case_fallback_resolvers, ObjectType
from ariadne.asgi import GraphQL
from api.queries import listItems_resolver

app= FastAPI(
    title="Food App Model",
    description="Backend for Yolo model",
    version="0.0.1",
    terms_of_service=None,
    contact=None,
    licesnes_info=None
)

query = ObjectType("Query")
query.set_field("listItems", listItems_resolver)

type_defs = load_schema_from_path("schema.graphql")

# Create executable schema instance
schema = make_executable_schema(type_defs, query)

app.add_middleware(CORSMiddleware, allow_origins=['*'])
app.mount("/static",StaticFiles(directory="static/"),name="static")
# app.mount("/graphql/", GraphQL(schema, debug=True))

# class Item(Base):
#     __tablename__ = "items"

#     id = Column(Integer, primary_key=True)
#     name = Column(String)
#     description = Column(String)
#     recipe = Column(String)
#     calories = Column(String)

db.Base.metadata.create_all(db.engine)

# Create GraphQL App instance
graphql_app = GraphQL(
    schema,
    debug=True
)

async def startup_event():
    """
    Initialize FastAPI and add variables
    """

    model=YOLO("models/best.pt")
    print("Model loaded")
    app.state.model = model



app.add_event_handler("startup", startup_event)

@app.post("/create")
async def create_item(name: str, description: str, recipe: str, calories: str):
    item = models.Item(name=name, description=description, recipe=recipe, calories=calories)
    db.session.add(item)
    db.session.commit()
    return {"item added": item.name}

@app.get("/graphql/")
@app.options("/graphql/")
async def handle_graphql_explorer(request: Request):
    return await graphql_app.handle_request(request)

async def get_session():
    """
    Function to create and return a database session.
    """
    with db.SessionLocal() as session:
        yield session

# Handle POST requests to execute GraphQL queries
@app.post("/graphql/")
async def handle_graphql_query(
    request: Request,
    db = Depends(get_session),
):
    # Expose database connection to the GraphQL through request's scope
    request.scope["db"] = db
    return await graphql_app.handle_request(request)


# Handle GraphQL subscriptions over websocket
@app.websocket("/graphql")
async def graphql_subscriptions(
    websocket: WebSocket,
    db = Depends(get_session),
):
    # Expose database connection to the GraphQL through request's scope
    websocket.scope["db"] = db
    await graphql_app.handle_websocket(websocket)

# type_defs = load_schema_from_path("schema.graphql")
# schema = make_executable_schema(
#     type_defs, snake_case_fallback_resolvers
# )
# query = ObjectType("Query")
# schema = make_executable_schema(type_defs, query)

# def get_context_value(request_or_ws: Request | WebSocket, _data) -> dict:
#     return {
#         "request": request_or_ws,
#         "db": request_or_ws.scope["session"],
#     }


@app.post("/detect")
async def detect_food(file: UploadFile = File(...)):
    """
    Detect food in image
    """
    try:

        contents = await file.read()
        
        image = cv2.imdecode(np.frombuffer(contents,np.uint8),cv2.IMREAD_COLOR)

        results = app.state.model.predict(image,device='cpu')

        print(results)
        detections = []
        for result in results:
            for box in result.boxes.xyxy.tolist():
                x1, y1, x2, y2 = map(int, box)
                conf = result.boxes.conf.tolist()[0]
                cls = result.boxes.cls.tolist()[0]
                detections.append(
                    {
                        "class": result.names[int(cls)],
                        "confidence": float(conf),
                        "bbox": {"x1": x1, "y1": y1, "x2": x2, "y2": y2},
                    }
                )

        for detection in detections:
            x1, y1, x2, y2 = detection["bbox"].values()
            cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(image, detection["class"], (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)


        _, img_encoded = cv2.imencode(".jpg", image)
        base64_img = base64.b64encode(img_encoded).decode()

        return JSONResponse(
            content={"detections": detections, "image": base64_img}
        )

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.get("/")
async def root(request: Request):
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
      <title>Indian Food Detection</title>
      <link rel="stylesheet" href="/static/style.css"> 
    </head>
    <body>
      <div id="container">
        <h1>YOLOv8 Object Detection</h1>
        <input type="file" id="image-input" accept="image/*">
        <button id="detect-button">Detect Objects</button>
        <img id="image-preview" src="#" alt="Image Preview">
        <div id="results"></div>
      </div>

      <script src="/static/script.js"></script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)