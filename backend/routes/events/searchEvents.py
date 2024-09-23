from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, event

app =FastAPI()
router = APIRouter(
    prefix= '/events',
    tags= ['events']
)

@router.get('/searchEvent')
async def bookTicket(word: str, db: Session = Depends(get_db)):
    allEvents = db.query(event).filter(event.title.like(f"%{word}%")).all()
    return allEvents

app.include_router(router)
