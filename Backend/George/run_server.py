import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, workers=2, reload=True, log_config="log.ini")