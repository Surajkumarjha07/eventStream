from fastapi import FastAPI, APIRouter,HTTPException,status,Depends, File, UploadFile, Form
from models import EventModel
from sqlalchemy.orm import Session
from database import get_db, event, eventBooked
import os 
from typing import Optional

app = FastAPI()
router = APIRouter(
    prefix='/events',
    tags=['events']
)

userImages = 'uploads'
if not os.path.exists(userImages):
    os.mkdir(userImages)

Path = os.path.join(os.getcwd(), userImages)
print(Path)

@router.post('/createEvent')
async def create_event(
    event_creator: str = Form(...),
    title: str = Form(...),
    category: str = Form(...),
    date: Optional[str] = Form(None),
    start_time: Optional[str] = Form(None),
    end_time: Optional[str] = Form(None),
    type: str = Form(...),
    location: Optional[str] = Form(None),
    building: Optional[str] = Form(None),
    region: Optional[str] = Form(None),
    venue: Optional[str] = Form(None),
    price: Optional[int] = Form(0),
    capacity: int = Form(...),

    event_img: UploadFile = File(...),
    db: Session = Depends(get_db)
):
        ImageFile = await event_img.read()
        print(ImageFile)
        FileName = title.replace(" ", "") + event_img.filename
        print(FileName)

        ImagePath = os.path.join(userImages,FileName)
        print(ImagePath)

        with open(ImagePath, 'wb') as uploadFolder:
            uploadFolder.write(ImageFile)
            
        print(f"File created and path written to: {ImagePath}")

        CreatedEvent = event(event_creator=event_creator, title=title, category=category, date=date, start_time=start_time, end_time=end_time, type=type, location=location, building=building, region=region, venue=venue, price=price, capacity=capacity, event_img=FileName) 

        db.add(CreatedEvent)
        db.commit()
        db.refresh(CreatedEvent)
        return {'user': CreatedEvent, 'filename': event_img.filename}  

@router.get('/allEvents')
async def getEvents(db: Session = Depends(get_db)):
    allEvents = list(db.query(event).all())
    print(allEvents)
    return allEvents

@router.get('/specificEvent')
async def specificEvent(category: str | None, db: Session = Depends(get_db)):
        fetchedEvents = db.query(event).filter(event.category == category).all()
        return [event.__dict__ for event in fetchedEvents]

@router.get('/CreatedEvents')
async def createdEventsByUser(email: str, db: Session = Depends(get_db)):
       if(email):
            eventsCreated = list(db.query(event).filter(event.event_creator == email).all())
            return eventsCreated
       
@router.delete('/deleteEventCreated')
async def delete(email: str, title: str, db: Session = Depends(get_db)):
    if email and title:
        eventsList = list(db.query(event).filter(event.event_creator == email).all())
        for e in eventsList:
            if(e.title == title):
                db.delete(e)
                db.commit()
                return 'Event Deleted'          

@router.delete('/deleteEventBooked')
async def delete(email: str, title: str, db: Session = Depends(get_db)):
    eventsList = list(db.query(eventBooked).filter(event.event_creator == email).all())
    for e in eventsList:
          if(e.event_booked == title):
                db.delete(e)
                db.commit()
                return 'Event Deleted'
          
@router.get('/geteventBytitle')
async def getEvent(title: str, db: Session = Depends(get_db)):
      fetchedEvents = db.query(event).filter(event.title == title).first()
      if fetchedEvents:
            return fetchedEvents
      return 'Not found'               
       
app.include_router(router)