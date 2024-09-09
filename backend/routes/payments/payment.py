from fastapi import FastAPI,APIRouter
import razorpay

app = FastAPI()

router = APIRouter(
    tags=['Payment']
)

@router.post('/payment')
async def payment(amount: int):
    client = razorpay.Client(auth=("rzp_test_RNopBpvUbcKwIf", "g6gNZbcmtT4Phq53MOtI8cbg"))
    data = { "amount": amount*100, "currency": "USD", "receipt": "order_rcptid_11" }
    payment = client.order.create(data=data)
    return payment

app.include_router(router)
