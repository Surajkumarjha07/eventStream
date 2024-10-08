from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.users.userQueries import router
from routes.events.eventQueries import router as eventRouter, Path
from routes.payments.payment import router as paymentRouter
from routes.events.bookTickets import router as tickets
from routes.events.getTicketByUser import router as getTickets
from routes.events.likes import router as likeRouter
from routes.events.searchEvents import router as searchRouter
from fastapi.staticfiles import StaticFiles

app = FastAPI()

origins = [
    "http://localhost:4200",
    "http://localhost:4200/login",
    "http://localhost:4200/signUp",
    "http://localhost:4200/eventInfo",
    "http://localhost:4200/manageEvents",
    "http://localhost:4200/accountSettings"
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
app.include_router(tickets)
app.include_router(getTickets)
app.include_router(likeRouter)
app.include_router(searchRouter)
app.mount('/uploads', StaticFiles(directory= Path),name="uploads")