from fastapi import FastAPI, APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from database import get_db, eventBooked

app = FastAPI()
router = APIRouter(
    prefix='/events',
    tags=['events']
)

@router.get('/getTickets')
async def getTicket(email: str, db: Session = Depends(get_db)):
    if(email):
        user = list(db.query(eventBooked).filter(eventBooked.email == email).all())
        return user
    
app.include_router(router)
