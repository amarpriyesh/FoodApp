import ultralytics
ultralytics.checks()
from ultralytics import YOLO
import cv2

model=YOLO("models/best.pt")

img= cv2.imread("test_imgs/test.jpeg")
cv2.imshow("Image",img)
cv2.waitKey(0)
cv2.destroyAllWindows()

results = model(img,device="cpu")


for result in results:
    boxes = result.boxes.cpu().numpy()  # Get boxes on CPU in numpy format
    for box in boxes:  # Iterate over boxes
        r = box.xyxy[0].astype(int)  # Get corner points as int
        class_id = int(box.cls[0])  # Get class ID
        class_name = model.names[class_id]  # Get class name using the class ID
        print(f"Class: {class_name}, Box: {r}")  # Print class name and box coordinates
        cv2.rectangle(img, r[:2], r[2:], (0, 255, 0), 2)  # Draw boxes on the image

cv2.imshow("Image",img)
cv2.waitKey(0)
cv2.destroyAllWindows()