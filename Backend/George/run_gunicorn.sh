#!/bin/bash
gunicorn -w 2 -b :8000 -t 300 -k uvicorn.workers.UvicornWorker --log-config log.ini --reload main:app