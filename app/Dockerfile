FROM python:3.12-slim

LABEL version="1.0.2"

WORKDIR /code

COPY requirements.txt /code/requirements.txt
RUN python3 -m venv venv && \
     . venv/bin/activate && \
     pip install --no-cache-dir -r /code/requirements.txt

COPY . /code/app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    GEMINI_API_KEY=fake_api_token


CMD ["venv/bin/uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]