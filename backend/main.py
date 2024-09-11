from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.users.userQueries import router
from routes.events.eventQueries import router as eventRouter
from routes.payments.payment import router as paymentRouter
from routes.events.specificEvent import router as specificEvent

app = FastAPI()

origins = [
    "http://localhost:4200",
    "http://localhost:4200/login",
    "http://localhost:4200/signUp",
    "http://localhost:4200/eventInfo"
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
app.include_router(specificEvent)