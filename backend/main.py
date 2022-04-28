from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from motor.motor_asyncio import AsyncIOMotorClient


app = FastAPI()
origins = [
    "*"
]

PASSWORD = "online-clipboard"
cluster = AsyncIOMotorClient(f"mongodb+srv://killshot:{PASSWORD}@cluster0.hgrij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
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
    ret_id = 0
    resp = await retrive_id.find_one({"retrive_id": "ret_id"})
    while True:
        ret_id = random.randint(100000, 999999)
        if resp is None:
            break
        if resp["retrive_id"] == ret_id:
            continue
        else:
            break
    await retrive_id.insert_one({"retrive_id": ret_id})
    await clipboard.insert_one({"retrive_id": ret_id, "data": data["data"]})
    return {
        "msg": "success",
        "id": ret_id
    }

@app.post("/retrive")
async def retrive(data: dict) -> dict:
    resp = await clipboard.find_one({
        "retrive_id": int(data["retrive_id"])
        })
    # print(resp)
    if resp is None:
        return {
            "msg": "error",
            "data": "not found"
        }
    return {
        "msg": "success",
        "data": resp["data"]
    }