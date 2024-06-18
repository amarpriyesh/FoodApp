# My FastAPI Project

This is a FastAPI project that provides a backend API for our web application.

## Prerequisites

- Python 3.9 or later
- Conda (or any other Python virtual environment tool of your choice)

## Setup

1. **Create a Conda Environment**:

```
conda create -n myenv python=3.9
```

2. **Activate the Environment**:

- On Windows:
  ```
  conda activate myenv
  ```

- On Unix or macOS:
  ```
  source activate myenv
  ```

3. **Install Dependencies**:

With the Conda environment activated, install the required packages by running:

```
pip install -r requirements.txt
```

This will install all the project dependencies listed in the `requirements.txt` file.

## Running the Server

To run the FastAPI server locally, use the provided `run_server.cmd` (Windows) or `run_server.sh` (Unix/macOS) script:

- On Windows:
```
run_uvicorn.bat
```

- On Unix or macOS:
```
chmod +x run_server.sh
./run_server.sh
```

The server will start running at `http://localhost:8000`.
