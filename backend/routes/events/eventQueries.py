from fastapi import FastAPI, APIRouter,HTTPException,status,Depends, File, UploadFile, Form
from models import EventModel
from sqlalchemy.orm import Session
from database import get_db, event, eventBooked
import os 
from fastapi.responses import JSONResponse

app = FastAPI()
router = APIRouter(
    prefix='/events',
    tags=['events']
)

@router.post('/createEvent')
async def create_event(
    evt: EventModel = Depends(),
    # evt: EventModel,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
        
        userImages = 'uploads'
        if not os.path.exists(userImages):
              os.mkdir(userImages)

        ImageFile = await file.read()
        print(ImageFile)
        FileName = evt.title + file.filename
        print(FileName)

        ImagePath = os.path.join(userImages,FileName)
        print(ImagePath)

        with open(ImagePath, 'wb') as uploadFolder:
            uploadFolder.write(ImageFile)
            
        print(f"File created and path written to: {ImagePath}")

        CreatedEvent = event(event_creator=evt.event_creator, title=evt.title, category=evt.category, date=evt.date, start_time=evt.start_time, end_time=evt.end_time, type=evt.type, location=evt.location, building=evt.building, region=evt.region, venue=evt.venue, price=evt.price, capacity=evt.capacity, event_img=FileName) 

        # CreatedEvent = event(event_creator=evt.event_creator, title=evt.title, category=evt.category, date=evt.date, start_time=evt.start_time, end_time=evt.end_time, type=evt.type, location=evt.location, building=evt.building, region=evt.region, venue=evt.venue, price=evt.price, capacity=evt.capacity) 

        db.add(CreatedEvent)
        db.commit()
        db.refresh(CreatedEvent)
        return {'user': CreatedEvent, 'filename': file.filename}  
        # return {'event': CreatedEvent}    

@router.get('/allEvents')
async def getEvents(db: Session = Depends(get_db)):
      allEvents = db.query(event).all()
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