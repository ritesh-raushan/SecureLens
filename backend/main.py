from io import BytesIO

import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from ultralytics import YOLO

app = FastAPI(title="SecureLens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# COCO classes: 0=person, 2=car, 3=motorcycle, 5=bus, 7=truck
TARGET_CLASSES = {0, 2, 3, 5, 7}

model = YOLO("yolov8n.pt")


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/anonymize")
async def anonymize(file: UploadFile = File(...)):
    contents = await file.read()
    np_arr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    results = model(img, verbose=False)

    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0])
            if cls_id not in TARGET_CLASSES:
                continue

            x1, y1, x2, y2 = map(int, box.xyxy[0])
            roi = img[y1:y2, x1:x2]

            ksize = max(51, (min(roi.shape[:2]) // 3) | 1)
            blurred = cv2.GaussianBlur(roi, (ksize, ksize), 30)
            img[y1:y2, x1:x2] = blurred

    _, encoded = cv2.imencode(".jpg", img)
    return StreamingResponse(BytesIO(encoded.tobytes()), media_type="image/jpeg")
