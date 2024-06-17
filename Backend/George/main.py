from fastapi import FastAPI, Request, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
import ultralytics
from ultralytics import YOLO
import cv2
import numpy as np
import base64


app= FastAPI(
    title="Food App Model",
    description="Backend for Yolo model",
    version="0.0.1",
    terms_of_service=None,
    contact=None,
    licesnes_info=None
)

app.add_middleware(CORSMiddleware, allow_origins=['*'])
app.mount("/static",StaticFiles(directory="static/"),name="static")


async def startup_event():
    """
    Initialize FastAPI and add variables
    """

    model=YOLO("models/best.pt")
    print("Model loaded")
    app.state.model = model



app.add_event_handler("startup", startup_event)

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

