from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db, event

app = FastAPI()
router = APIRouter(
    tags=['events'],
    prefix='/events'
)

@router.get('/specificEvent')
async def specificEvent(category: str | None, db: Session = Depends(get_db)):
        fetchedEvents = db.query(event).filter(event.category == category).all()
        return [event.__dict__ for event in fetchedEvents]

app.include_router(router)