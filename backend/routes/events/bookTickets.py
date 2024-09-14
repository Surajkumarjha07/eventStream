from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, dbUser, eventBooked

app =FastAPI()
router = APIRouter(
    prefix= '/events',
    tags= ['events']
)

@router.post('/bookTicket')
async def bookTicket(email: str, eventName: str, date: str, db: Session = Depends(get_db)):
    user = db.query(dbUser).filter(dbUser.email == email).first()
    if user: 
        BookedEvent = eventBooked(email = email, event_booked = eventName, date = date )
        db.add(BookedEvent)
        db.commit()
        db.refresh(BookedEvent)
        return 'event booked'

app.include_router(router)
