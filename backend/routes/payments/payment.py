from fastapi import FastAPI,APIRouter
import razorpay
from dotenv import load_dotenv
import os

app = FastAPI()

router = APIRouter(
    tags=['Payment']
)

load_dotenv(dotenv_path='./process.env')

KEY_ID = os.getenv('KEY_ID')
KEY_SECRET = os.getenv('KEY_SECRET')

@router.post('/payment')
async def payment(amount: int):
    client = razorpay.Client(auth=(KEY_ID,KEY_SECRET))
    data = { "amount": amount | 0, "currency": "INR", "receipt": "order_rcptid_11" }
    payment = client.order.create(data=data)
    return payment

app.include_router(router)
