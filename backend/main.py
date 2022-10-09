from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = FastAPI()
origins = [
    "*"
]

USERNAME = os.getenv("USERNAME", None)
PASSWORD = os.getenv("PASSWORD", None)
cluster = AsyncIOMotorClient(f"mongodb+srv://{USERNAME}:{PASSWORD}@cluster0.z1daado.mongodb.net/?retryWrites=true&w=majority")
db = cluster["clipboard"]
retrive_id = db["retrive_id"]
clipboard = db["clipboard"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Hello World"}


@app.post("/paste")
async def paste(data: dict) -> dict:
    ret_id = random.randint(1000, 9999)
    print(data)
    resp = await retrive_id.find_one({"retrive_id": ret_id})
    while resp is not None:
        ret_id = random.randint(1000, 9999)
        resp = await retrive_id.find_one({"retrive_id": ret_id})
    await retrive_id.insert_one({"retrive_id": ret_id})
    await clipboard.insert_one({"retrive_id": ret_id, "data": data["data"], "meta": data['meta']})
    return {
        "msg": "success",
        "id": ret_id
    }

@app.post("/retrive")
async def retrive(data: dict) -> dict:
    print(f"incomming data: {data['retrive_id']}")
    resp = await clipboard.find_one({
        "retrive_id": int(data["retrive_id"])
        })
    print(f"resp from db: {resp}")
    if resp is None:
        return {
            "msg": "error",
            "data": "not found"
        }
    return {
        "msg": "success",
        "data": resp["data"],
        "meta": resp["meta"]
    }