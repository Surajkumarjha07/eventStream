from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.users.userQueries import router
from routes.events.eventQueries import router as eventRouter
from routes.payments.payment import router as paymentRouter

app = FastAPI()

origins = [
    "http://localhost:4200",
    "http://localhost:4200/login",
    "http://localhost:4200/signUp"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get('/')
def root():
    return 'hello'

app.include_router(router)
app.include_router(eventRouter)
app.include_router(paymentRouter)