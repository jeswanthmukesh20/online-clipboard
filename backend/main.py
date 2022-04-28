from fastapi import FastAPI
import random

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Hello World"}


@app.post("/paste")
def paste(data: str) -> dict:
    data = {
        "msg": "success",
        "id": "".join(random.choice("0123456789abcdef") for _ in range(8))
    }
    print(data)
    return data